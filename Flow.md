### **User Flow & Architecture (CLI Perspective)**  

- **Install Package:** `npm install -g dwarf`  
- **Initialize Project:** `dwarf init`  
  - Select framework (React, Vue, Angular, etc.)  
  - Runs corresponding framework setup command (`npx create-vite@latest .`)  
  - Starts the Application
- **Configure & Generate MVP:** `dwarf MakeProject`  
  - Enter project description & features  
  - Removes default files of the framework  
  - Generates new files with AI-generated content
    - bat script for files to be generated
    - Map/Json of Path to each File from Root Dir
    - Json for content of each file
  - Adds the Content to Each File using these 3 objects [state will be stored in .dwarf file]
  - Starts the Project!!
- **Modify & Edit Project:**  
  - Do the Same but by keeping the Prev State in mind (we'll have chatgpt remember this state)
- **Finalize & Deploy:**  
  - Project ready with AI-generated boilerplate  
  - User can start coding immediately  

Would you like me to design a folder structure for this? 🚀