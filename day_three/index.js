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
        const packs = [stringToSet(remainingElfPacks.shift()), stringToSet(remainingElfPacks.shift()), stringToSet(remainingElfPacks.shift())];
        const allChars = packs.reduce((all, pack) => {
            for (const char of pack.values()) {
                all.add(char);
            }
            return all;
        }, new Set());
        const uniqueSharedLetters = Array.from(allChars.values()).filter((char) => {
            return packs.every((pack) => pack.has(char));
        });
        if (uniqueSharedLetters.length !== 1) {
            throw new Error(`More than one (or zero) unique char ${uniqueSharedLetters.join(',')}`);
        }
        priorityTotal += prioritization(uniqueSharedLetters[0]);
    }
    return priorityTotal;
}

function stringToSet(str) {
    const set = new Set();
    for (let char of str) {
        set.add(char);
    }
    return set;
}

//console.log(findTotalPriority());
console.log(findTotalBadgePriority());



function prioritization(letter) {
    const charNum = letter.charCodeAt(0);
    const offset = charNum > 90 ? 96 : 38;
    return charNum - offset;
}

