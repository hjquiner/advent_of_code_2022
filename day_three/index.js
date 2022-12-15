const readinput = require("../lib/readinput");

function main() {
    const elfPacks = readinput(process.argv[2]);
    let priorityTotal = 0;
    for (let line of elfPacks) {
        const divIndex = line.length / 2;
        const firstHalf = line.substring(0, divIndex);
        const secondHalf = line.substring(divIndex);
        for (let charIndex = 0; charIndex < firstHalf.length; charIndex++) {
            const searchLetter = firstHalf[charIndex];
            if(secondHalf.indexOf(searchLetter) >= 0) {
                // we found a character in the second half from the first half
                const letterPriority = prioritization(searchLetter);
                priorityTotal += letterPriority;
                break;
            }
        }
    }
    return priorityTotal;
}

console.log(main());

function prioritization(letter) {
    const charNum = letter.charCodeAt(0);
    const offset = charNum > 90 ? 96 : 69;
    return charNum - offset;
}

