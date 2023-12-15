 
// deno-lint-ignore-file prefer-const
// Read file
import { readLines } from 'https://deno.land/std@0.167.0/io/buffer.ts';
const f = await Deno.open('./input.txt');
const lines: string[] = [];
for await (const l of readLines(f)) {
    lines.push(l);
}

// Begin Problem solving

const data = lines.map(line => {
    const pairs = line.split(",");
    const ranges = pairs.map(range => {
        const rangeSplit = range.split("-");
        return { 
            min: Number.parseInt(rangeSplit[0]), 
            max: Number.parseInt(rangeSplit[1]) 
        };
    });
    return ranges;
});

let count = 0;
data.forEach(pair => {
    if (pair[0].min <= pair[1].min && pair[0].max >= pair[1].max ) {
        count += 1;
    } else if (pair[1].min <= pair[0].min && pair[1].max >= pair[0].max) {
        count += 1;
    }
});

// Set solution and print

const solution = count;
console.log('Solution:', solution);