# About
This repository contains my efforts to work through FullStackOpen MOOC course material. It attempts to follow recommended file structure

1. part\_1
	* courseinfo
	* unicafe
	* anecdotes
2. part\_2
	* exercise\_app
	* ...
3. part\_n
	* part\_n\_app

As such it more of a journey. Therefore first parts may contain WTFs.

## Notes, Problems and Workarounds!
_Problem_: After initializing react-app with `npx create-react-app app`, running `npm start` seems to do nothing useful.
_Workaround_: run build scripts direct with command `node /node_modules/react-scripts/scripts/start.js` in project root directory. Or create a .npmrc config file in project root with following content `ignore-scripts=false`
_Root cause_: using config switch `--ignore-scripts` to mitigate security issues with malicious postinstall scripts will ignore all scripts in package.json. This includes "start", "build", "test", .. and friends.

## Bootstrapping new project
Go to corresponding Part\_n folder. Run command

	npm init react-app  app-name-here --template typescript

which will create a folder with supplied app-name in working directory and initilize the project. 

## MongoDB
Diverging from course material, I will use self-hosted Docker container named `fullstack_mongo` to house database.
Start it from Powershell with command:

	docker start fullstack_mongo

and start using it. Further tips and commands are located in `Part_3/phonebook-server/README.md`, reminder on how to access mongo shell.
