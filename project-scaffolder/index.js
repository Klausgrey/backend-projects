#!/usr/bin/env node
const path = require("path");
const fs = require("fs");

let projectName = process.argv[2];

if (!projectName) {
	console.error("this was no project name provided...");
	process.exit(1);
}

const folders = ["models", "controllers", "config", "routers", "middleware"];

fs.mkdirSync(path.join(__dirname, projectName));
for (let i of folders) {
	fs.mkdirSync(path.join(__dirname, projectName, i));
}

fs.writeFileSync(
	path.join(__dirname, projectName, ".gitignore"),
	"node_modules/\n.env\npackage.lock.json",
);

fs.writeFileSync(
	path.join(__dirname, projectName, "app.js"),
	"import express from 'express'\nconst app = express()\r\nexport default app",
);

fs.writeFileSync(
	path.join(__dirname, projectName, "server.js"),
	"import app from './app.js'\napp.listen(3000, () => {console.log('server is running...')})",
);
