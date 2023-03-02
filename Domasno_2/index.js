const fs = require("fs");
const path = require("path");

fs.writeFileSync("homework.txt", "Homework 02 in Basic Node");
fs.appendFileSync("homework.txt", "\nFINISHED");

let pathToSave = path.join(__dirname, "homework.txt");

// console.log(pathToSave);

let homeworkPathContent = fs.readFileSync(pathToSave, { encoding: "utf-8" });
console.log(homeworkPathContent);
