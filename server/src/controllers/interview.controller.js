import * as pdfparse from 'pdf-parse';
// Rename the imported service to avoid conflict
import { generateInterviewReport as aiGenerateInterviewReport } from '../services/ai.service.js';
import InterviewReport from '../models/InterviewReport.js';

async function generateInterviewReport(req, res) {
    try {
        const resumeFile = req.file;
        
        // 1. MUST await pdfparse
        const resumeData = await pdfparse(resumeFile.buffer);
        const resumeText = resumeData.text;

        const { selfDescription, jobDescription } = req.body;

        // 2. Use the renamed service call
        const aiResponse = await aiGenerateInterviewReport({
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
        const interviewReport = await InterviewReport.findOne({ _id: interviewId, user: req.user._id }).sort({ createdAt: -1 }).select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan");
        if (!interviewReport) {
            return res.status(404).json({ message: "Interview report not found" });
        }
        res.json(interviewReport);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

async function getAllInterviewReportsController(req, res) {
    try {
        const interviewReports = await InterviewReport.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(interviewReports);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

async function generateResumePdfController(req, res) {
    try {
        const { interviewId } = req.params;
        const interviewReport = await InterviewReport.findOne({ _id: interviewId, user: req.user._id });
        if (!interviewReport) {
            return res.status(404).json({ message: "Interview report not found" });
        }
        // TODO: Generate PDF from interviewReport
        // For now, return a placeholder
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=resume_${interviewId}.pdf`);
        // Placeholder PDF content
        const pdfContent = Buffer.from('%PDF-1.4\n1 0 obj\n<<\n/Type /Catalog\n/Pages 2 0 R\n>>\nendobj\n2 0 obj\n<<\n/Type /Pages\n/Kids [3 0 R]\n/Count 1\n>>\nendobj\n3 0 obj\n<<\n/Type /Page\n/Parent 2 0 R\n/MediaBox [0 0 612 792]\n/Contents 4 0 R\n>>\nendobj\n4 0 obj\n<<\n/Length 44\n>>\nstream\nBT\n/F1 12 Tf\n100 700 Td\n(Resume) Tj\nET\nendstream\nendobj\nxref\n0 5\n0000000000 65535 f \n0000000009 00000 n \n0000000058 00000 n \n0000000115 00000 n \n0000000200 00000 n \ntrailer\n<<\n/Size 5\n/Root 1 0 R\n>>\nstartxref\n284\n%%EOF', 'binary');
        res.send(pdfContent);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

/**
 * @description controller to generate resume pdf based on user self description, resume and job description using ai service and return the pdf file as response
 */

async function generateResumePdfController(req, res) {
    const { interviewReportId } = req.params;
    const interviewReport = await InterviewReport.findOne({ _id: interviewReportId, user: req.user._id });
    if (!interviewReport) {
        return res.status(404).json({ message: "Interview report not found" });
    }
    const { resume, jobDescription, selfDescription } = interviewReport;
    const pdfBuffer = await generateResumePdf({ resume, jobDescription, selfDescription });
    res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename=resume_${interviewReportId}.pdf`,
        'Content-Length': pdfBuffer.length
    });
    res.send(pdfBuffer);

    
}

export {
    generateInterviewReport,
    getInterviewReportByIdController,
    getAllInterviewReportsController,
    generateResumePdfController
};
