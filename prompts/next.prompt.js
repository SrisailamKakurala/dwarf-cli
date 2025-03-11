const nextPrompt = `
# NextJS Full-Stack Boilerplate

Generate a **production-grade** Next.js full-stack application with the following:

## 🔹 **Requirements**
- Next.js with **App Router** (Server Components & API Routes)
- Tailwind CSS for styling
- Authentication with **NextAuth.js** (JWT-based, Google/GitHub provider)
- Database integration with **Prisma + PostgreSQL**
- API Routes for CRUD operations ('/api/user')
- State management with Zustand
- Security best practices: CSRF protection, input validation (Zod), and rate limiting
- Logging with Winston
- **Env configuration** for secrets management ('.env.local')
- Deployment-ready with **Docker + Vercel config**

example structure of project:
/
  /app
    /api
      /auth
        route.js        # NextAuth.js API route
      /users
        route.js        # CRUD operations
    /dashboard
      page.js          # Protected dashboard page
    /login
      page.js          # Login page
    layout.js          # Root layout
    page.js           # Home page
  /components
    Navbar.js         # Navigation bar
    ProtectedRoute.js # HOC for authentication
  /lib
    prisma.js         # Prisma client setup
    auth.js           # NextAuth.js config
  /styles
    globals.css       # Tailwind global styles
  /utils
    api.js            # API fetch utilities
  /prisma
    schema.prisma     # Database schema
  .env.local.example # Environment variables
  next.config.js     # Next.js configuration
  package.json       # Dependencies
  README.md          # Documentation

# ** response structure: ** SHOULD BE STRICTLY FOLLOWED **

{
  "paths": {
    "app/layout.js": "/app/layout.js",
    "app/page.js": "/app/page.js",
    "app/dashboard/page.js": "/app/dashboard/page.js",
    "app/login/page.js": "/app/login/page.js",
    "app/api/auth/route.js": "/app/api/auth/route.js",
    "app/api/users/route.js": "/app/api/users/route.js",
    "components/Navbar.js": "/components/Navbar.js",
    "components/ProtectedRoute.js": "/components/ProtectedRoute.js",
    "lib/prisma.js": "/lib/prisma.js",
    "lib/auth.js": "/lib/auth.js",
    "styles/globals.css": "/styles/globals.css",
    "utils/api.js": "/utils/api.js",
    "prisma/schema.prisma": "/prisma/schema.prisma",
    "next.config.js": "/next.config.js",
    "package.json": "/package.json"
  },
  "code": {
    "app/layout.js": "import '../styles/globals.css';\\nexport default function RootLayout({ children }) {\\n  return <html><body>{children}</body></html>;\\n}",
    
    "app/page.js": "'use client';\\nexport default function HomePage() {\\n  return <div className='text-center text-2xl'>Welcome to Next.js</div>;\\n}",

    "app/dashboard/page.js": "'use client';\\nimport ProtectedRoute from '@/components/ProtectedRoute';\\nexport default function Dashboard() {\\n  return <ProtectedRoute><div>Dashboard Page</div></ProtectedRoute>;\\n}",

    "app/api/auth/route.js": "import NextAuth from 'next-auth';\\nimport GoogleProvider from 'next-auth/providers/google';\\nexport default NextAuth({ providers: [GoogleProvider({ clientId: process.env.GOOGLE_ID, clientSecret: process.env.GOOGLE_SECRET })] });",

    "app/api/users/route.js": "import prisma from '@/lib/prisma';\\nexport async function GET(req) {\\n  const users = await prisma.user.findMany();\\n  return Response.json(users);\\n}",

    "components/Navbar.js": "export default function Navbar() {\\n  return <nav className='bg-blue-500 p-4 text-white'>Navbar</nav>;\\n}",

    "components/ProtectedRoute.js": "'use client';\\nimport { useSession } from 'next-auth/react';\\nexport default function ProtectedRoute({ children }) {\\n  const { data: session } = useSession();\\n  return session ? children : <div>Please log in</div>;\\n}",

    "lib/prisma.js": "import { PrismaClient } from '@prisma/client';\\nconst prisma = new PrismaClient();\\nexport default prisma;",

    "lib/auth.js": "import { getSession } from 'next-auth/react';\\nexport async function getUserSession() { return await getSession(); }",

    "prisma/schema.prisma": "model User {\\n  id String @id @default(uuid())\\n  name String\\n  email String @unique\\n}",

    "styles/globals.css": "@tailwind base; @tailwind components; @tailwind utilities;",

    "utils/api.js": "export async function fetchData(url) {\\n  const res = await fetch(url);\\n  return res.json();\\n}",

    "next.config.js": "module.exports = { reactStrictMode: true };",

    "package.json": "{ 'dependencies': { 'next': 'latest', 'react': 'latest', 'react-dom': 'latest', 'next-auth': 'latest', 'prisma': 'latest', '@prisma/client': 'latest', 'tailwindcss': 'latest', 'zustand': 'latest' } }"
  },
  "dependencies": "npm install next react react-dom next-auth prisma @prisma/client tailwindcss zustand zod"
}
`;

module.exports = {nextPrompt}
