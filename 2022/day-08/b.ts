// deno-lint-ignore-file prefer-const
// Read file
import { readLines } from 'https://deno.land/std@0.167.0/io/buffer.ts';
const f = await Deno.open('./input.txt');
const lines: string[] = [];
for await (const l of readLines(f)) {
    lines.push(l);
}

// Begin Problem solving

function viewIngScore(d: number[][], height: number, row: number, column: number) : number {
    let top = 0;
    for (let i = row - 1; i >= 0 ; i--) {
        top += 1;
        if(d[i][column] >= height) break;
    }

    let bottom = 0;
    for (let i = row+1; i < d.length; i++) {
        bottom += 1;
        if(d[i][column] >= height) break;
    }

    let left = 0;
    for (let j = column - 1; j >= 0; j--) {
        left += 1;
        if(d[row][j] >= height) break;
    }

    let right = 0;
    for (let j = column+1; j < d[0].length; j++) {
        right += 1;
        if(d[row][j] >= height) break;
    }

    return top * bottom * right * left;
}

const data = lines.map(line => line.split("").map(x => parseInt(x)));

let maxViewingScore = 0;
for (let i = 1; i < data.length-1; i++) {
    for (let j = 1; j < data[i].length-1; j++) {
        const treeHeight = data[i][j];
        let score = viewIngScore(data, treeHeight, i, j);
        maxViewingScore = Math.max(maxViewingScore, score);
    }
}

// Set solution and print
const solution = maxViewingScore;
console.log('Solution:', solution);