import { promises as fs } from "fs";

async function readInput() {
  const input = await fs.readFile("input.txt", "utf-8");
  
}

(async () => {
    const input = await readInput();


})();
