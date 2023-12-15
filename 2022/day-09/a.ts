// deno-lint-ignore-file prefer-const
// Read file
import { readLines } from 'https://deno.land/std@0.167.0/io/buffer.ts';
const f = await Deno.open('./input.txt');
const lines: string[] = [];
for await (const l of readLines(f)) {
    lines.push(l);
}

// Begin Problem solving
const instructions = lines.map(line => {
    const split = line.split(" ");
    return {
        dir: split[0] as 'R' | 'L' | 'U' | 'D',
        num: parseInt(split[1])
    }
});

let head = {x: 0, y: 0};
let tail = {x: 0, y: 0};

const tailLocations = new Set();
tailLocations.add(`${tail.x}:${tail.y}`);

instructions.forEach(instruction => {
    for(let i = 0; i < instruction.num; i++) {
        if (instruction.dir === 'R') {
            head.x += 1;
        } else if (instruction.dir === 'L') {
            head.x -= 1;
        } else if (instruction.dir === 'U') {
            head.y += 1;
        } else if (instruction.dir === 'D') {
            head.y -= 1;
        }

        if ((head.x - tail.x) >= 2) {
            tail.x += 1; 
            if (tail.y !== head.y) {
                tail.y += (head.y - tail.y);
            }
        } else if ((tail.x - head.x) >= 2) {
            tail.x -= 1;
            if (tail.y !== head.y) {
                tail.y += (head.y - tail.y);
            }
        } else if ((head.y - tail.y) >= 2) {
            tail.y += 1;
            if (tail.x !== head.x) {
                tail.x += (head.x - tail.x);
            }
        } else if ((tail.y - head.y) >= 2) {
            tail.y -= 1;
            if (tail.x !== head.x) {
                tail.x += (head.x - tail.x);
            }
        }

        tailLocations.add(`${tail.x}:${tail.y}`);
    }
})

console.log(tailLocations)

// Set solution and print

const solution = tailLocations.size;
console.log('Solution:', solution);
