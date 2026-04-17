const { GoogleGenAI } = require("@google/genai")
const { z } = require("zod")
const { zodToJsonSchema } = require("zod-to-json-schema")
const puppeteer = require("puppeteer")

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY })

// --- Schemas ---

const interviewReportSchema = z.object({
    title: z.string().describe("Exact job title from the job description"),
    matchScore: z.number().min(0).max(100).describe("Calibrated fit score: 70+ strong, 50-70 moderate, <50 significant gaps"),
    technicalQuestions: z.array(z.object({
        question: z.string(),
        intention: z.string().describe("Why an interviewer asks this"),
        answer: z.string().describe("Key points, approach, and what to cover in the answer")
    })).min(8).max(10),
    behavioralQuestions: z.array(z.object({
        question: z.string(),
        intention: z.string(),
        answer: z.string().describe("STAR format guidance with pointers from the candidate's own resume")
    })).min(5).max(6),
    skillGaps: z.array(z.object({
        skill: z.string(),
        severity: z.enum(["low", "medium", "high"]),
        recommendation: z.string().describe("Specific action to close this gap")
    })),
    preparationPlan: z.array(z.object({
        day: z.number(),
        focus: z.string(),
        tasks: z.array(z.string()).min(3).max(5)
    })).min(7).max(14),
})

// --- Helpers ---

async function withRetry(fn, maxRetries = 3) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            return await fn()
        } catch (err) {
            if (attempt === maxRetries) throw err
            await new Promise(res => setTimeout(res, Math.pow(2, attempt) * 500))
        }
    }
}

// --- Core Functions ---

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {
    const prompt = `You are an expert technical recruiter and interview coach with 10+ years at top tech companies.

Analyze the candidate profile against the job description and generate a comprehensive, actionable interview prep report.

<candidate_resume>${resume}</candidate_resume>
<self_description>${selfDescription}</self_description>
<job_description>${jobDescription}</job_description>

Instructions:
- matchScore: Be honest. 70+ = strong fit, 50-69 = moderate, <50 = significant gaps
- technicalQuestions: 8-10 questions tailored to the SPECIFIC tech stack in the JD. Include system design if applicable.
- behavioralQuestions: 5-6 STAR-format questions referencing the candidate's actual resume experiences
- skillGaps: Specific technical/domain gaps only. Include a concrete recommendation per gap.
- preparationPlan: 7-14 day plan. Each day: 3-5 tasks with real resource names (book chapters, LeetCode tags, specific docs).
- title: Exact job title from the JD`

    return await withRetry(async () => {
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: zodToJsonSchema(interviewReportSchema),
                temperature: 0.4, // Lower = more focused, less hallucination
            }
        })

        const raw = JSON.parse(response.text)
        const result = interviewReportSchema.safeParse(raw)
        if (!result.success) throw new Error(`Validation failed: ${JSON.stringify(result.error.flatten())}`)
        return result.data
    })
}

async function generatePdfFromHtml(htmlContent) {
    const browser = await puppeteer.launch({ args: ["--no-sandbox"] })
    try {
        const page = await browser.newPage()
        await page.setContent(htmlContent, { waitUntil: "networkidle0" })
        const pdfBuffer = await page.pdf({
            format: "A4",
            printBackground: true, // needed for background colors
            margin: { top: "20mm", bottom: "20mm", left: "15mm", right: "15mm" }
        })
        return pdfBuffer
    } finally {
        await browser.close() // always close even on error
    }
}

async function generateResumePdf({ resume, selfDescription, jobDescription }) {
    const resumePdfSchema = z.object({
        html: z.string().describe("Self-contained HTML with inline CSS for the resume")
    })

    const prompt = `You are a professional resume writer and frontend developer.

Create an ATS-optimized, polished resume in HTML tailored to this job.

<resume>${resume}</resume>
<self_description>${selfDescription}</self_description>
<job_description>${jobDescription}</job_description>

STRICT RULES:
1. Inline CSS only — no external stylesheets, no scripts
2. Single-column layout — no tables or multi-column (ATS requirement)
3. Max 2 A4 pages — be concise, cut filler
4. Clean design: white background, #2563EB accent, 10pt body font
5. Keyword-match naturally to JD — no stuffing
6. Do NOT invent experience — only use what's provided
7. Quantify achievements where data supports it
8. Output JSON with exactly one key: "html"`

    return await withRetry(async () => {
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: zodToJsonSchema(resumePdfSchema),
                temperature: 0.3,
            }
        })

        const { html } = JSON.parse(response.text)
        return await generatePdfFromHtml(html)
    })
}

module.exports = { generateInterviewReport, generateResumePdf }