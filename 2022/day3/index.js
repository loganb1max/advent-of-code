import { promises as fs } from "fs";

async function readInput() {
  const input = await fs.readFile("input.txt", "utf-8");
  return input.split("\r\n");
}

function divideInTwo(input) {
  const half = input.length / 2;
  const firstHalf = input.slice(0, half);
  const secondHalf = input.slice(half);
  return [firstHalf, secondHalf];
}

function findOverlapping(...sets) {
  return [...new Set(sets.reduce((a, b) => [...a].filter((letter) => b.includes(letter))))];
}

// assign a-z to 1-26 and A-Z to 27-52
function getNumberFromLetter(letter) {
  const letterCode = letter.charCodeAt(0);
  if (letterCode >= 65 && letterCode <= 90) {
    return letterCode - 38;
  } else if (letterCode >= 97 && letterCode <= 122) {
    return letterCode - 96;
  }
}

(async () => {
    const rugsacks = await readInput();

    const sums = rugsacks.map((rugsack) => {
      const [firstHalf, secondHalf] = divideInTwo(rugsack);
      const overlapping = findOverlapping(firstHalf, secondHalf);
      return overlapping.map((letter) => getNumberFromLetter(letter)).reduce((a, b) => a + b, 0);
    }).reduce((a, b) => a + b, 0);

    console.log(`Part 1: the sum of the properties of the items are: ${sums}`);

    const rugsacksInGroupsOfThree = [];
    for (let i = 0; i < rugsacks.length; i += 3) {
      rugsacksInGroupsOfThree.push(rugsacks.slice(i, i + 3));
    }

    const sum = rugsacksInGroupsOfThree.map((rugsackGroup) => {
      const overlapping = findOverlapping(...rugsackGroup);
      return overlapping.map((letter) => getNumberFromLetter(letter)).reduce((a, b) => a + b, 0);
    }).reduce((a, b) => a + b, 0);

    console.log(`Part 2: the sum of the properties of the items are: ${sum}`);

})();
