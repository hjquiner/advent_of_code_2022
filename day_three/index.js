const readinput = require("../lib/readinput");

const elfPacks = readinput(process.argv[2]);

function findTotalPriority() { 
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

function findTotalBadgePriority() {
    let priorityTotal = 0;
    const remainingElfPacks = [...elfPacks];
    while(remainingElfPacks.length > 0 && remainingElfPacks.length >= 3) {
        const packs = [remainingElfPacks.shift(), remainingElfPacks.shift(), remainingElfPacks.shift()];
        let matchArr = packs[0].split('');
        for(let pack of packs.slice(1)) {
            for (let charIndex = 0; charIndex < pack.length; charIndex++) {
                const searchLetter = pack[charIndex];
                if(matchArr.indexOf(searchLetter) === -1){
                    matchArr = matchArr.filter(e => e !== searchLetter);
                }
            }
            if(matchArr.length === 1){
                const letterPriority = prioritization(matchArr[0]);
                priorityTotal += letterPriority;
                break;
            }
        }
    }
    return priorityTotal;
}

//console.log(findTotalPriority());
console.log(findTotalBadgePriority());



function prioritization(letter) {
    const charNum = letter.charCodeAt(0);
    const offset = charNum > 90 ? 96 : 38;
    return charNum - offset;
}

