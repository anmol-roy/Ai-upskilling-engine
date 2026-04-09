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

module.exports = interviewRouter;