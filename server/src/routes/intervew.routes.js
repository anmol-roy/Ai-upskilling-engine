const express = require('express');
const authMiddleware = require('../middleware/auth.middleware.js');
const interviewController = require('../controllers/interview.controller.js');
const { upload } = require('../middleware/file.middleware.js');


const interviewRouter = express.Router();

/**
 * @route POST /api/interview/report
 * @desc Generate new  interview report based on job description, resume, and self-description
 * @access Private
 */

interviewRouter.post('/', authMiddleware, upload.single("resume"), interviewController.generateInterviewReport);

/**
 * @route GET /api/interview/report/:interviewId
 * @desc Get interview report by ID
 * @access Private
 */
interviewRouter.get('/report/:interviewId', authMiddleware, interviewController.generateInterviewReport);

/**
 * @route GET /api/interview/
 * @desc Get all interview reports for the authenticated user
 * @access Private
 */
async function getAllInterviewReportsController(req, res) {
    try {
        const interviewReports = await InterviewReport.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(interviewReports);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

/**
 * @route service to get interview report by interviewId
 */
export async function getInterviewReportById(interviewId) {
    try {
        const interviewReport = await InterviewReport.findOne({ _id: interviewId, user: interviewId }).sort({ createdAt: -1 }).select("-resume -selfDescription -jobDescription -__v");
        if (!interviewReport) {
            throw new Error("Interview report not found");
        }
        return interviewReport;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

/**
 * @route service to get all interview reports for the authenticated user
 */
export async function getAllInterviewReports(userId) {
    try {
        const interviewReports = await InterviewReport.find({ user: userId }).sort({ createdAt: -1 });
        return interviewReports;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = interviewRouter;