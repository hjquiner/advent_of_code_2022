const fs = require('fs');
function main() {
    const inputPath = process.argv[2];
    const fileContents = fs.readFileSync(inputPath);
    const fileAsString = fileContents.toString();
    const inputArr = fileAsString.split('\n');
    let elfCal = [];
    let currentElf = 0;
    for (let line = 0; line < inputArr.length; line++) {
        const nString = inputArr[line];
        const n = parseInt(nString);
        if(isNaN(n)){
            elfCal.push(currentElf);
            currentElf = 0;
            continue;
        };
        currentElf += n;
    };
    return Math.max.apply(null, elfCal);
};
console.log(main());

