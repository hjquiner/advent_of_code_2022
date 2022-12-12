const fs = require('fs');

// constants
const ROCK_SCORE = 1;
const PAPER_SCORE = 2;
const SCISSORS_SCORE = 3;
const LOSE_SCORE = 0;
const DRAW_SCORE = 3;
const WIN_SCORE = 6;

const OPP_ROCK = 'A';
const OPP_PAPER = 'B';
const OPP_SCISSORS = 'C';

const PLAYER_ROCK = 'X';
const PLAYER_PAPER = 'Y';
const PLAYER_SCISSORS = 'Z';

const result = main();
console.log(result);

function main() {
    const inputPath = process.argv[2];
    const fileContents = fs.readFileSync(inputPath);
    const fileAsString = fileContents.toString();
    const inputArr = fileAsString.split('\n');

    return inputArr.reduce((sum, gameString) => {
        if (!/[ABC] [XYZ]/.test(gameString)) {
            return sum;
        }
        const [oppShape, playerShape] = gameString.split(' ');
        const outcome = playRound(oppShape, playerShape);
        return sum + scoreRound(playerShape, outcome);
    }, 0);
}

function playRound(opponentShape, playerShape) {
    if (translateShapeToPlayerShape(opponentShape) === playerShape) {
        return 'draw';
    }
    if (opponentShape === OPP_ROCK) {
        return playerShape === PLAYER_PAPER ? 'win' : 'lose';
    }
    if (opponentShape === OPP_PAPER) {
        return playerShape === PLAYER_SCISSORS ? 'win' : 'lose';
    }
    if (opponentShape === OPP_SCISSORS) {
        return playerShape === PLAYER_ROCK ? 'win' : 'lose';
    }
}

function translateShapeToPlayerShape(shape) {
    switch (shape) {
        case OPP_ROCK:
            return PLAYER_ROCK;
        case OPP_PAPER:
            return PLAYER_PAPER;
        case OPP_SCISSORS:
            return PLAYER_SCISSORS;
    }
}

function translateShape(shape) {
    switch (shape) {
        case PLAYER_ROCK:
        case OPP_ROCK:
            return 'rock';
        case PLAYER_PAPER:
        case OPP_PAPER:
            return 'paper';
        case PLAYER_SCISSORS:
        case OPP_SCISSORS:
            return 'scissors';
    }
}

function scoreRound(shape, outcome) {
    let score = 0;
    switch (translateShape(shape)) {
        case 'rock':
            score += ROCK_SCORE;
            break;
        case 'paper':
            score += PAPER_SCORE;
            break;
        case 'scissors':
            score += SCISSORS_SCORE;
            break;
    }
    switch (outcome) {
        case 'lose':
            score += LOSE_SCORE;
            break;
        case 'draw':
            score += DRAW_SCORE;
            break;
        case 'win':
            score += WIN_SCORE;
            break;
    }
    return score;
}