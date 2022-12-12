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
    let topElf = Math.max.apply(null, elfCal)
    let topThree = elfCal.sort((a, b) => a < b ? 1 : -1 ).slice(0,3);
    //console.log(topElves.slice(0, 3));
    console.log(topThree.reduce((sum, value) => {
        return sum + value;
    }))
    return topElf;
};
console.log(main());

