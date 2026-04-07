const mongoose = require('mongoose');

const technicalQuestionSchema = new mongoose.Schema({
    question: { type: String, required: [true, "technical question is required"] },
    intention: { type: String, required: [true, "intention is required"] },
    answer: { type: String, required: [true, "answer is required"] },
}, { _id: false });

const behavioralQuestionSchema = new mongoose.Schema({
    question: { type: String, required: [true, "behavioral question is required"] },
    intention: { type: String, required: [true, "intention is required"] },
    answer: { type: String, required: [true, "answer is required"] },
}, { _id: false });

const preparationPlanSchema = new mongoose.Schema({
    day: { type: Number, required: [true, "day is required"] },
    focus: { type: String, required: [true, "focus is required"] },
    tasks: [{ type: String, required: [true, "tasks are required"] }],
}, { _id: false });


/*
 * - job description : string
 * - resume text : string
 * - Self description : string
 * 
 * - match score : number
 * - Technical questions : [{
        * question: "",
        * intention : "",
        * answer : ""
 * }]
 * - Behavioral questions : [ {
        * question: "",
        * intention : "",
        * answer : ""
 * 
 * }]
 * - Skill gaps : [{
 *           skils: "",
 *           severity: "
 *           type: "string",
 *           enum: ["low", "medium", "high"],
 * 
 * }]
 * - preparation plans: [{
 *      day: "",
 *      focus: "",
 *     tasks: [string]
    
 *  }]
 * 
 */

const interviewReportSchema = new mongoose.Schema({
    jobDescription: { type: String, required: true },
    resume: { type: String, required: optional },
    selfDescription: { type: String, },
    matchScore: { type: Number, min: 0, max: 100 },

});

const InterviewReportModel = mongoose.model('InterviewReport', interviewReportSchema);

model.exports = InterviewReportModel;