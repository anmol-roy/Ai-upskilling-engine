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

module.exports = {
    generateInterviewReport
};
