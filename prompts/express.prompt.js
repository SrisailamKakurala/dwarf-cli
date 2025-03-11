const expressPrompt = `
# NodeExpress Architect

Generate a production-grade Node/Express server with RESTful API from scratch.

Requirements:
- Modern JavaScript (ES6+) with proper error handling
- MVC architecture with clean separation of concerns
- Authentication (JWT) with role-based access control
- Database integration (MongoDB/Mongoose)
- Input validation, rate limiting, and security best practices
- Comprehensive error handling and logging
- Environment configuration and secrets management
- API documentation with Swagger/OpenAPI
- Deployment configuration (Docker, PM2)

Standard Structure:
/
  /config - App configuration
  /controllers - Request handlers
  /middlewares - Custom middleware
  /models - Data models
  /routes - API endpoints
  /utils - Helper functions
  app.js - Express application setup
  server.js - Entry point

Response format (JSON only):
{
  "paths": {
    "server.js": "/server.js",
    "app.js": "/app.js",
    "config/db.js": "/config/db.js",
    "routes/userRoutes.js": "/routes/userRoutes.js",
    ...
  },
  "code": {
    "server.js": "const app = require('./app');\\nconst port = process.env.PORT || 3000;\\n\\napp.listen(port, () => {\\n  console.log(\`Server running on port \${port}\`);\\n});",
    
    "app.js": "const express = require('express');\\nconst cors = require('cors');\\nconst helmet = require('helmet');\\nconst morgan = require('morgan');\\nconst errorHandler = require('./middlewares/errorHandler');\\nconst connectDB = require('./config/db');\\nrequire('dotenv').config();\\n\\n// Initialize express\\nconst app = express();\\n\\n// Connect to database\\nconnectDB();\\n\\n// Middleware\\napp.use(express.json());\\napp.use(cors());\\napp.use(helmet());\\napp.use(morgan('dev'));\\n\\n// Routes\\napp.use('/api/users', require('./routes/userRoutes'));\\napp.use('/api/auth', require('./routes/authRoutes'));\\n\\n// Error handler middleware\\napp.use(errorHandler);\\n\\nmodule.exports = app;",
    
    "config/db.js": "const mongoose = require('mongoose');\\n\\nconst connectDB = async () => {\\n  try {\\n    await mongoose.connect(process.env.MONGODB_URI);\\n    console.log('MongoDB connected');\\n  } catch (err) {\\n    console.error('Database connection error:', err.message);\\n    process.exit(1);\\n  }\\n};\\n\\nmodule.exports = connectDB;",
    
    ... and other files would follow in the same format ...
  },
  "dependencies": "npm install express mongoose jsonwebtoken bcrypt cors helmet morgan dotenv joi winston mongoose-unique-validator express-rate-limit jest supertest",
}

** the above structure should be strictly followed. **
** nothing before and nothing after **

Ensure code follows best practices for scalability, security, and maintainability.
`;

module.exports = { expressPrompt };