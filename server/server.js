require('dotenv').config();

const app = require('./src/app.js');
const PORT = process.env.PORT || 3000;

const connectDB = require('./src/config/database.js');

// ✅ Correct import
const { generateInterviewReport } = require('./src/services/ai.service.js');

// ✅ Correct data import
const { jobDescription, resume, selfDescription } = require('./src/services/temp.js');

// Connect DB
connectDB();

// Call AI service
generateInterviewReport({
    jobdescribe: jobDescription,
    resume: resume,
    selfdescribe: selfDescription
})
.then(report => {
    console.log('===== GENERATED INTERVIEW REPORT =====');
    console.log(report);
})
.catch(err => {
    console.error('Error generating interview report:', err);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});