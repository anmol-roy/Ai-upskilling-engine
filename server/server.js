require('dotenv').config();

const app = require('./src/app.js');
const PORT = process.env.PORT || 3000;

const connectDB = require('./src/config/database.js');

// Connect DB
connectDB();

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});