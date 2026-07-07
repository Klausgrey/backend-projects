const path = require("path");
const fs = require("fs");

let projectName = process.argv[2];

if (!projectName) {
	console.error("this was no project name provided...");
	process.exit(1);
}

