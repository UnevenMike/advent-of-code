// Read file
import { readLines } from 'https://deno.land/std@0.167.0/io/buffer.ts';
const f = await Deno.open('./input.txt');
const lines: string[] = [];
for await (const l of readLines(f)) {
    lines.push(l);
}

// Begin Problem solving

const calories: number[] = [];
let currentSum = 0;
lines.forEach(entry => {
    const num = Number.parseInt(entry)
    if (Number.isNaN(num)) {
        calories.push(currentSum);
        currentSum = 0;
    } else {
        currentSum += num;
    }
});

calories.sort((a, b) => a > b ? -1 : 1);
const topSum = calories.slice(0, 3).reduce((sum, val) => sum = sum + val, 0)
console.log(topSum)