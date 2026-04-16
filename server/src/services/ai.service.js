import { GoogleGenerativeAI } from "@google/generative-ai";
import { z } from "zod";

// 🔐 Init
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENAI_API_KEY);

// ================= SCHEMA =================
const interviewReportSchema = z.object({
    matchScore: z.number().min(0).max(100),

    technicalQuestions: z.array(
        z.object({
            question: z.string(),
            intention: z.string(),
            answer: z.string()
        })
    ),

    behavioralQuestions: z.array(
        z.object({
            question: z.string(),
            intention: z.string(),
            answer: z.string()
        })
    ),

    skillGaps: z.array(
        z.object({
            skill: z.string(),
            severity: z.enum(["low", "medium", "high"])
        })
    ),

    preparationPlan: z.array(
        z.object({
            day: z.number(),
            focus: z.string(),
            tasks: z.array(z.string())
        })
    ),
    title: z.string().describe("Title of the interview report for which interview is being conducted"),
});


// ================= FIX FUNCTION =================

function fixArray(arr, type) {
    if (!Array.isArray(arr)) return [];

    return arr.map((item, index) => {
        if (typeof item === "string") {

            if (type === "tech") {
                return {
                    question: item,
                    intention: "Evaluate technical understanding",
                    answer: "Explain concept with examples and complexity"
                };
            }

            if (type === "behavior") {
                return {
                    question: item,
                    intention: "Assess behavior and decision making",
                    answer: "Use STAR method"
                };
            }

            if (type === "skill") {
                return {
                    skill: item,
                    severity: "medium"
                };
            }

            if (type === "plan") {
                return {
                    day: index + 1,
                    focus: item,
                    tasks: ["Study concepts", "Solve problems"]
                };
            }
        }

        return item;
    });
}


// ================= MAIN FUNCTION =================

async function generateInterviewReport({ jobdescribe, resume, selfdescribe }) {
    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash"
        });

        const prompt = `
You are an expert interviewer AI.

Return STRICT JSON ONLY.

IMPORTANT:
- Do NOT return strings inside arrays
- Arrays must contain OBJECTS
- Do NOT skip fields

Format:

{
  "matchScore": number,
  "technicalQuestions": [
    {
      "question": string,
      "intention": string,
      "answer": string
    }
  ],
  "behavioralQuestions": [
    {
      "question": string,
      "intention": string,
      "answer": string
    }
  ],
  "skillGaps": [
    {
      "skill": string,
      "severity": "low" | "medium" | "high"
    }
  ],
  "preparationPlan": [
    {
      "day": number,
      "focus": string,
      "tasks": string[]
    }
  ]
}

Job Description:
${jobdescribe}

Resume:
${resume}

Self Description:
${selfdescribe}
`;

        const result = await model.generateContent({
            contents: [
                {
                    role: "user",
                    parts: [{ text: prompt }]
                }
            ],
            generationConfig: {
                responseMimeType: "application/json"
            }
        });

        const text = result.response.text();

        console.log("\n🔥 RAW AI RESPONSE:\n", text);

        let parsed = {};

        try {
            parsed = JSON.parse(text);
        } catch (err) {
            console.error("❌ JSON Parse Failed");
        }

        // 🔥 AUTO FIX (IMPORTANT)
        parsed.technicalQuestions = fixArray(parsed.technicalQuestions, "tech");
        parsed.behavioralQuestions = fixArray(parsed.behavioralQuestions, "behavior");
        parsed.skillGaps = fixArray(parsed.skillGaps, "skill");
        parsed.preparationPlan = fixArray(parsed.preparationPlan, "plan");

        // 🔥 FALLBACK DEFAULTS
        parsed.matchScore = parsed.matchScore || 50;

        // ✅ VALIDATION
        const validated = interviewReportSchema.parse(parsed);

        return validated;

    } catch (error) {
        console.error("❌ AI Service Error:", error);
        throw error;
    }
}

async function generatePdfFromHtml(htmlContent) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage({});
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

    const pdfBuffer = await page.pdf({ format: 'A4', margin: { top: '15mm', bottom: '15mm', left: '15mm', right: '15mm' } });
    await browser.close();
    return pdfBuffer;


    // Fetch the interview report data
    if (!interviewReport) {
        throw new Error("Interview report not found");
    }
}

async function generateResumePdf({ resume , jobDescription, selfDescription }) {
    const resumepdfSchema = z.object({
        html : z.string().describe("the html content for the resume which can be converted to pdf using any library like puppeteer or jsPDF")

    })
    const prompt = ` generate a html content for a candidate which includes the following sections:
            Resume: ${resume}
            Job Description: ${jobDescription}
            Self Description: ${selfDescription}
            the response should be a json object with a single field 
            the resume should be tailored for the given job descriptioon and should highlights the candidate's strengths and skills that are relevant to the job description and also includes a section for self description which should be concise and highlights the candidate's personality and work ethic. the html content should be well formatted and can be directly converted to pdf using any library like puppeteer or jsPDF. the response should be in json format with a single field html which contains the html content for the resume.
            the content of resume should be not sound like ai generated and should be in a human tone. the html content should be structured with clear sections, headings, and bullet points to enhance readability and presentation. the resume should effectively showcase the candidate's qualifications and suitability for the job while maintaining a professional and engaging tone.`
            you can highlights the candidate strength and relevant experience in the resume and also include a section for self description which should be concise and highlights the candidate's personality and work ethic. the html content should be well formatted and can be directly converted to pdf using any library like puppeteer or jsPDF. the response should be in json format with a single field html which contains the html content for the resume.
            it should be  1 page long and should be in a human tone and should not sound like ai generated. the html content should be structured with clear sections, headings, and bullet points to enhance readability and presentation. the resume should effectively showcase the candidate's qualifications and suitability for the job while maintaining a professional and engaging tone.
            the content should be ats friendly and should include relevant keywords from the job description to increase the chances of passing through applicant tracking systems. the resume should be tailored for the given job description and should highlights the candidate's strengths and skills that are relevant to the job description and also includes a section for self description which should be concise and highlights the candidate's personality and work ethic. the html content should be well formatted and can be directly converted to pdf using any library like puppeteer or jsPDF. the response should be in json format with a single field html which contains the html content for the resume.
            the seme should be so lengthy and detailed as to provide a comprehensive and compelling resume that effectively showcases the candidate's qualifications and suitability for the job while maintaining a professional and engaging tone. the content should be ats friendly and should include relevant keywords from the job description to increase the chances of passing through applicant tracking systems. the resume should be tailored for the given job description and should highlights the candidate's strengths and skills that are relevant to the job description and also includes a section for self description which should be concise and highlights the candidate's personality and work ethic. the html content should be well formatted and can be directly converted to pdf using any library like puppeteer or jsPDF. the response should be in json format with a single field html which contains the html content for the resume.
 `   
const response = await genAI.getGenerativeModel({
        model: "gemini-2.5-flash"
        consens: prompt,
    }).generateContent({
        contents: [
        response : application/json
        ]

        const jsoncontent =  json.parse(response.response.text())

    })
}
export {
    generateInterviewReport
};