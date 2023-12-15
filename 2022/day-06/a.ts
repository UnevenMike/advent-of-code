// deno-lint-ignore-file prefer-const
// Read file
import { readLines } from 'https://deno.land/std@0.167.0/io/buffer.ts';
const f = await Deno.open('./input.txt');
const lines: string[] = [];
for await (const l of readLines(f)) {
    lines.push(l);
}

// Begin Problem solving

const chars = lines[0].split("");

const window = [];
let i = 0;

for(i = 0; i < 3; i++) {
    window.unshift(chars[i]);
}

for(i = 3; i < chars.length; i++) {
    window.unshift(chars[i]);

    const set = new Set(window);
    if (set.size == 4) {
        break;
    }
    
    window.pop();
}


// Set solution and print

const solution = i + 1;
console.log('Solution:', solution);