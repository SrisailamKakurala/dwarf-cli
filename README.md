# dwarf-cli 


alright shall we make ours now!!


dwarf-cli
├─ .dwarf
│  ├─ content.json
│  ├─ paths.json
│  └─ state.json
├─ bin
│  ├─ dwarf.js
│  ├─ generate.js
│  ├─ help.js
│  ├─ index.js
│  └─ init.js
├─ lib
│  ├─ commands
│  │  └─ makeProject.js
│  └─ utils
│     ├─ contentGenerator.js
│     ├─ fileGenerator.js
│     ├─ logger.js
│     ├─ prompts.js
│     └─ stateManager.js
├─ LICENSE
├─ package-lock.json
├─ package.json
├─ prompts
│  └─ react.prompt.js
├─ README.md
├─ scripts
├─ structure.bat
├─ tech.md
├─ templates
│  ├─ angular
│  ├─ html+css+js
│  ├─ node
│  ├─ reactjs
│  ├─ reactnative
│  └─ vue
├─ test.js
└─ __mock__

```

this is the structure alright 

first command would be 
1. dwarf forge [after npm i -g dwarf]

2. select among following: 
   * Frontend
    Backaned
    Full Stack

3. select Tech stack:
   * ReactJs
    Angular
    HTML+CSS+JS
    Vue

4. What do u want the dwarf to Forge for you:
   >>> a portfolio website for a software engineer 
   // in a while loop/shell until "exit" is encountered.

        under the hood:

        I. clone the react boilerplate from github which does not contain the src dir [--depth 1]

        II. take the prompt and send request to openai asking for response in below format
        '''
        {
            srcDirStructure: {
                .bat file code for src directory [we'll make a temp.bat file to create the structure and clean it up later]
            }
            paths: {
                // paths to every file in the src directory from root for travelling among different files
                App.jsx: /src/App.jsx,
                App.css: /src/App.css
                .... so on 
            }
            code: {
                // code for every file
                App.jsx: "import React from 'react' const App = () => { return <div>hello world</div> } export default App;",
                ... all files
            }
            dependencies: "npm i x y z"
        }

        III. now generate the files with temp.bat, use paths to move from one file to another and insert respective code!!

        IV. clean up the temp.bat file

        V. install dependencies and start the app

        VI. store this state in some state.js as history for ai 

5. (still in a shell)
>>> what changes do u want: make it red and black theme

// same under the hood process again

6. exit
>>> exit