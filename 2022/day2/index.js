import { promises as fs } from "fs";

async function readInput() {
  const input = await fs.readFile("input.txt", "utf-8");
  const rounds = input.split('\r\n');
  return rounds;
}

const choiceValues = {
    'A': 1, // Rock
    'B': 2, // Paper
    'C': 3, // Scissors
    'X': 1, // Rock
    'Y': 2, // Paper
    'Z': 3, // Scissors
};

const desiredResultMap = {
    'Y': 0, // Draw
    'X': 2, // they lose
    'Z': 1 // they win
};

// your value -> (opponent value for outcome) tie, lose, win
const resultMap = {
    1: [1, 2, 3],
    2: [2, 3, 1],
    3: [3, 1, 2],
};

const resultWorths = [3, 0, 6];

const getValue = (opponentValue, myValue) => {
    const result = resultMap[myValue].indexOf(opponentValue);
    return resultWorths[result] + myValue;
};

(async () => {
    const rounds = await readInput();

    const scores = rounds.map(round => {
        const [opponentChoice, myChoice] = round;
        return getValue(
            choiceValues[opponentChoice],
            choiceValues[myChoice]
        );
    });

    const totalScore = scores.reduce((a, b) => a + b, 0);

    console.log(`Part 1: Your total score is ${totalScore}`);

    const desiredResults = rounds.map(round => {
        const [, myChoice] = round;
        return desiredResultMap[myChoice];
    });

    const desiredScores = desiredResults.map((desiredResult, index) => {
        const opponentChoice = choiceValues[rounds[index][0]];
        const myChoice = resultMap[opponentChoice][desiredResult];
        return getValue(
            opponentChoice,
            myChoice
        );
    });

    const totalDesiredScore = desiredScores.reduce((a, b) => a + b, 0);

    console.log(`Part 2: Your total score is ${totalDesiredScore}`);

})();
