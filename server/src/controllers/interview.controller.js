const pdfparse = require('pdf-parse');
// Rename the imported service to avoid conflict
const aiService = require('../services/ai.service.js');
const InterviewReport = require('../models/InterviewReport.js');

async function generateInterviewReport(req, res) {
    try {
        const resumeFile = req.file;
        
        // 1. MUST await pdfparse
        const resumeData = await pdfparse(resumeFile.buffer);
        const resumeText = resumeData.text;

        const { selfDescription, jobDescription } = req.body;

        // 2. Use the renamed service call
        const aiResponse = await aiService.generateInterviewReport({
            resume: resumeText,
            selfDescription,
            jobDescription
        });

        // 3. Rename the result variable to avoid overwriting the Model
        const savedReport = await InterviewReport.create({
            user: req.user._id,
            resume: resumeText,
            selfDescription,
            jobDescription,
            ...aiResponse
        });

        res.status(201).json(savedReport);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

async function getInterviewReportByIdController(req, res) {
    try {
        const { interviewId } = req.params;
        const interviewReport = await InterviewReport.findOne({ _id: req.user._id, user: req.user._id }).sort({ createdAt: -1 }).select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan");
        if (!interviewReport) {
            return res.status(404).json({ message: "Interview report not found" });
        }
        res.json(interviewReport);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = {
    generateInterviewReport
};
