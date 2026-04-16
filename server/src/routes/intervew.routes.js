import express from 'express';
import authMiddleware from '../middleware/auth.middleware.js';
import { generateInterviewReport, getInterviewReportByIdController, getAllInterviewReportsController, generateResumePdfController } from '../controllers/interview.controller.js';
import { upload } from '../middleware/file.middleware.js';


const interviewRouter = express.Router();

/**
 * @route POST /api/interview/report
 * @desc Generate new  interview report based on job description, resume, and self-description
 * @access Private
 */

interviewRouter.post('/', authMiddleware, upload.single("resume"), generateInterviewReport);

/**
 * @route GET /api/interview/report/:interviewId
 * @desc Get interview report by ID
 * @access Private
 */
interviewRouter.get('/report/:interviewId', authMiddleware, getInterviewReportByIdController);

/**
 * @route GET /api/interview/
 * @desc Get all interview reports for the authenticated user
 * @access Private
 */
interviewRouter.get('/', authMiddleware, getAllInterviewReportsController);

/**
 * @route GET /api/interview/pdf/:interviewId
 * @desc Generate PDF for interview report
 * @access Private
 */
interviewRouter.get('/pdf/:interviewId', authMiddleware, generateResumePdfController);
interviewRouter.get('/resume/pdf/:interviewReportId', authMiddleware, generateResumePdfController);
/**
 * @route service to get interview report by interviewId
 */
export async function getInterviewReportById(interviewId) {
    try {
        const interviewReport = await InterviewReport.findOne({ _id: interviewId, user: interviewId }).sort({ createdAt: -1 }).select("-resume -selfDescription -jobDescription -__v");
        if (!interviewReport) {
            throw new Error("Interview report not found");
        }t
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

export default interviewRouter;