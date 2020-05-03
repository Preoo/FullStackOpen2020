# About
This repository contains my efforts to work through FullStackOpen MOOC course material. It attempts to follow recommended file structure

> part\_1
>	courseinfo
>	unicafe
>	anecdotes
> part\_2
>	exercise\_app
> ...
> part\_n
>	part\_n\_app

## Notes, Problems and Workarounds!
_Problem_: After initializing react-app with `npx create-react-app app`, running `npm start` seems to do nothing useful.
_Workaround_: run build scripts direct with command `node /node_modules/react-scripts/scripts/start.js` in project root directory.

## Bootstrapping new project
Go to corresponding Part\_n folder. Run command

	npm init react-app  app-name-here --template typescript

which will create a folder with supplied app-name in working directory and initilize the project. 

