import { promises as fs } from "fs";

async function readInput() {
  const input = await fs.readFile("input.txt", "utf-8");
  const groups = input.split('\r\n\r\n');
  const nums = groups.map(group => group.split('\r\n').map(num => parseInt(num)));
  return nums;
}

(async () => {
  const groups = await readInput();
  const groupSums = groups.map(group => group.reduce((acc, num) => acc + num, 0));
  const sortedSums = groupSums.sort((a, b) => b - a);

  const topElf = sortedSums[0];
  const topElfIndex = groupSums.indexOf(topElf);
  console.log(`Part 1: the elf with the most calories is: ${topElfIndex + 1} with ${topElf} calories.`);

  const topThree = sortedSums.slice(0, 3);
  const topThreeSum = topThree.reduce((acc, num) => acc + num, 0);
  console.log(`Part 2: the sum of the top three elves is: ${topThreeSum} calories.`);
})();
