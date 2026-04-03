require('dotenv').config();
const app = require('./src/app.js');
const PORT = process.env.PORT || 3000;
const connectDB = require('./src/config/database.js');

connectDB();


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});