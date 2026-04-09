const { GoogleGenerativeAI } = require("@google/generative-ai");
const { z } = require("zod");

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

module.exports = {
    generateInterviewReport
};