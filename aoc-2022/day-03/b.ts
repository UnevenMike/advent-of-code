// deno-lint-ignore-file prefer-const
// Read file
import { readLines } from 'https://deno.land/std@0.167.0/io/buffer.ts';
const f = await Deno.open('./input.txt');
const lines: string[] = [];
for await (const l of readLines(f)) {
    lines.push(l);
}

// Begin Problem solving

function letterToPriority(char: string): number {
    let code = char.charCodeAt(0);
    if (code < 91) {
        return code - 65 + 27
    } else {
        return code - 97 + 1
    }
}

let sum = 0;

for (let i = 0; i < lines.length; i+=3) {
    let firstSet = new Set(lines[i]);
    let secondSet = new Set(lines[i+1]);
    let thirdSet = new Set(lines[i+2]);

    let duped = [...firstSet].filter(x => secondSet.has(x)).filter(x => thirdSet.has(x));
    let value = letterToPriority(duped[0])
    sum += value;
}

// Set solution and print

const solution = sum;
console.log('Solution:', solution);