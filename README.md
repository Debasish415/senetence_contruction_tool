# 🛠️ Sentence Construction Tool

A simple and interactive tool for learning and practicing sentence construction in English. Built using modern frontend technologies.

### 🔧 Tech Stack
- ⚡ Vite – Fast and lightweight frontend build tool  
- ⚛️ ReactJS – Component-based UI library  
- 🎨 TailwindCSS – Utility-first CSS framework  

### 🚀 Deployed Link
🔗 https://senetence-contruction-tool.vercel.app/

---

## 📦 How to Run Locally

Make sure you have Git and Node.js installed on your machine.

1. Clone the repository:
   git clone https://github.com/Debasish415/senetence_contruction_tool.git

2. Install dependencies:
   npm install

3. Start the development server:
   npm run dev

---

## 📁 Project Structure & File Overview

📁 node_modules/  
Contains all installed dependencies and packages.  
Auto-generated when you run `npm install`.

📁 public/sample.json  
Contains sample data used within the project.  
It's placed in the public directory to allow direct access without importing or bundling.  

📝 Note:  
I included `sample.json` in the public folder to avoid using external APIs or storing data elsewhere.  
Normally, I wouldn’t share this file, but for now, it’s included for reference and testing purposes.

📄 vite.svg  
Static SVG image, likely the Vite logo.

---

📁 src/  
Main source folder for all React components and styles.

📁 assets/  
🔹 react.svg – SVG logo/image used in the UI.

📄 App.css – Styles for the App component.  
📄 App.jsx – Root component of the React app.  
📄 index.css – Global styles applied throughout the app.  
📄 IntroPage.jsx – Likely the introductory or landing page component.  
📄 main.jsx – Entry point of the React app; renders App into the DOM.  
📄 QuizApp.jsx – Component that handles quiz logic and UI.

---

📄 .gitignore  
Specifies files/folders to ignore in Git (e.g., node_modules, .env).

📄 eslint.config.js  
Configuration for ESLint to maintain code quality and consistency.

📄 index.html  
Main HTML file. React injects the app into `<div id="root">`.

📄 package.json  
Project metadata: scripts, dependencies, and configurations.

📄 package-lock.json  
Locks dependency versions for consistent installs across machines.

📄 README.md  
Project documentation (this file).

⚡ vite.config.js  
Configuration file for Vite. Defines how the project builds and serves.
