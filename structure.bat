@echo off
echo Setting up a professional React.js SRC directory...

:: Create main folders
mkdir src
cd src
mkdir assets components constants contexts hooks layouts pages redux zustand services styles utils tests config

:: Create nested directories
mkdir assets\icons assets\images
mkdir components\ui components\forms components\layout
mkdir hooks
mkdir layouts
mkdir pages\auth pages\dashboard
mkdir redux\slices
mkdir zustand\stores
mkdir services
mkdir styles
mkdir utils
mkdir tests\components tests\utils

:: Create core files
echo // Root entry point > main.tsx
echo // Main App Component > App.tsx
echo // Centralized route definitions > routes.tsx

:: Create Redux boilerplate (if used)
echo // Redux store > redux\store.ts
echo // Example slice > redux\slices\exampleSlice.ts

:: Create Zustand store (if used)
echo // Zustand store > zustand\stores\exampleStore.ts

:: Create Context API (if used)
echo // Example Context API > contexts\ExampleContext.tsx

:: Create hooks
echo // Authentication hook > hooks\useAuth.ts
echo // Theme hook > hooks\useTheme.ts

:: Create services & API calls
echo // API requests > services\api.ts
echo // Auth API calls > services\authService.ts

:: Create utility functions
echo // Utility functions > utils\formatDate.ts
echo // Local storage utils > utils\localStorage.ts

:: Create Tailwind styles
echo @tailwind base; @tailwind components; @tailwind utilities; > styles\global.css

echo Setup complete! 🚀 Your React.js SRC folder is now production-ready.
exit
