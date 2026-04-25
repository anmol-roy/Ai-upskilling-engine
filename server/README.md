# AI Upskilling Engine - Server

A Node.js/Express backend server for the AI-powered skill gap analyzer application. This server provides authentication, interview report generation using Google Generative AI, and PDF resume creation.

## Features

- **User Authentication**: Secure registration, login, logout with JWT tokens and cookie-based sessions
- **Interview Report Generation**: AI-powered analysis of resumes, self-descriptions, and job descriptions to generate comprehensive interview reports
- **Skill Gap Analysis**: Identifies technical and behavioral skill gaps with recommendations
- **PDF Resume Generation**: Creates optimized resumes based on interview reports
- **File Upload**: Supports PDF resume uploads for analysis
- **MongoDB Integration**: Persistent data storage for users and interview reports

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens) with bcryptjs for password hashing
- **AI**: Google Generative AI (@google/genai)
- **File Processing**: Multer for uploads, pdf-parse for PDF text extraction, Puppeteer for PDF generation
- **Validation**: Zod for schema validation
- **Other**: Cookie-parser, CORS, Dotenv

## Installation

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the server directory with the following variables:
   ```env
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/ai-upskilling-engine
   GOOGLE_GENAI_API_KEY=your_google_genai_api_key
   JWT_SECRET=your_jwt_secret_key
   ```

## Running the Server

Start the development server with:
```bash
npm run dev
```

The server will run on `http://localhost:3000` (or the port specified in `.env`).

## API Endpoints

### Authentication Routes (`/api/auth`)

All routes are prefixed with `/api/auth`.

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/register` | Register a new user | Public |
| POST | `/login` | Login with email and password | Public |
| GET | `/logout` | Logout and blacklist token | Public |
| GET | `/get-me` | Get current user details | Private (requires auth) |

### Interview Routes (`/api/interview`)

All routes are prefixed with `/api/interview` and require authentication.

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/` | Generate interview report from resume PDF, self-description, and job description | Private |
| GET | `/report/:interviewId` | Get specific interview report by ID | Private |
| GET | `/` | Get all interview reports for the logged-in user | Private |
| POST | `/resume/pdf/:interviewReportId` | Generate and download PDF resume based on interview report | Private |

## Authentication

The server uses JWT-based authentication with HTTP-only cookies for security:

1. **Registration/Login**: Users provide email and password. Passwords are hashed with bcryptjs.
2. **Token Generation**: Upon successful login, a JWT token is generated and stored in an HTTP-only cookie.
3. **Protected Routes**: Routes marked as "Private" require the JWT token in the cookie.
4. **Logout**: Clears the cookie and adds the token to a blacklist to prevent reuse.
5. **Token Blacklisting**: Prevents token reuse after logout.

## AI Integration

The server integrates Google Generative AI for intelligent analysis:

- **Interview Report Generation**: Analyzes user resume, self-description, and job description to create structured reports including:
  - Job match score (0-100)
  - Technical interview questions with answers
  - Behavioral questions using STAR format
  - Skill gap analysis with severity levels and recommendations
  - 7-14 day preparation plan

- **Structured Output**: Uses Zod schemas to ensure consistent, parseable AI responses.

- **Resume PDF Generation**: Uses Puppeteer to create formatted PDF resumes optimized for the target job.

## Database Schema

### User Model
- `email`: String (unique, required)
- `password`: String (hashed, required)
- `createdAt`: Date

### Interview Report Model
- `userId`: ObjectId (reference to User)
- `title`: String (job title)
- `matchScore`: Number
- `technicalQuestions`: Array
- `behavioralQuestions`: Array
- `skillGaps`: Array
- `preparationPlan`: Array
- `createdAt`: Date

### Blacklist Model
- `token`: String (blacklisted JWT tokens)

## File Upload

- Supports PDF resume uploads via Multer middleware
- Files are processed using pdf-parse to extract text content
- Temporary files are handled securely

## Error Handling

The server includes comprehensive error handling for:
- Database connection failures
- Invalid authentication
- File upload errors
- AI service failures
- Validation errors

## Security Features

- Password hashing with bcryptjs
- JWT token blacklisting on logout
- CORS configuration for client-server communication
- HTTP-only cookies for token storage
- Input validation with Zod schemas

## Development

- Uses Nodemon for automatic server restarts during development
- Environment-based configuration with dotenv
- Modular structure with separate controllers, services, and middlewares

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

ISC