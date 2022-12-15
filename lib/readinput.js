const fs = require('fs');

module.exports = function readinput(inputPath) {
    const fileContents = fs.readFileSync(inputPath);
    const fileAsString = fileContents.toString();
    const inputArr = fileAsString.split('\n');

    return inputArr;
}