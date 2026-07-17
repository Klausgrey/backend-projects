#!/usr/bin/env node
const path = require("path");
const fs = require("fs");

let projectName = process.argv[2];

if (!projectName) {
	console.error("this was no project name provided...");
	process.exit(1);
}
fs.mkdirSync(path.join(process.cwd(), projectName));

const folders = ["models", "controllers", "config", "routers", "middleware"];

const rootFolder = ["src"];
for (let i of rootFolder) {
	const rootPath = path.join(process.cwd(), projectName, i)
	fs.mkdirSync(rootPath)

	for (let j of folders) {
		const folderPath = path.join(rootPath, j);
		 fs.mkdirSync(folderPath)
	}
}

fs.writeFileSync(
	path.join(process.cwd(), projectName, ".gitignore"),
	"node_modules/\n.env\npackage.lock.json",
);

fs.writeFileSync(
	path.join(process.cwd(), projectName, "app.js"),
	"import express from 'express'\nconst app = express()\r\nexport default app",
);

fs.writeFileSync(
	path.join(process.cwd(), projectName, "server.js"),
	"import app from './app.js'\napp.listen(3000, () => {console.log('server is running...')})",
);
