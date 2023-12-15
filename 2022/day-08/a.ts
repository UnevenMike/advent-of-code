// deno-lint-ignore-file prefer-const
// Read file
import { readLines } from 'https://deno.land/std@0.167.0/io/buffer.ts';
const f = await Deno.open('./input.txt');
const lines: string[] = [];
for await (const l of readLines(f)) {
    lines.push(l);
}

// Begin Problem solving

function isVisible(d: number[][], height: number, row: number, column: number) : boolean {
    let top = []
    for (let i = 0; i < row; i++) {
        top.push(d[i][column]);
    }

    let bottom = [];
    for (let i = row+1; i < d.length; i++) {
        bottom.push(d[i][column]);
    }

    let left = [];
    for (let j = 0; j < column; j++) {
        left.push(d[row][j]);
    }

    let right = [];
    for (let j = column+1; j < d[0].length; j++) {
        right.push(d[row][j]);
    }

    return Math.max(...top) < height || Math.max(...bottom) < height || Math.max(...left) < height || Math.max(...right) < height;
}

const data = lines.map(line => line.split("").map(x => parseInt(x)));
const numOutsideTrees = 2 * data.length + 2*(data[0].length-2);

let numVisibleInideTrees = 0;
for (let i = 1; i < data.length-1; i++) {
    for (let j = 1; j < data[i].length-1; j++) {
        const treeHeight = data[i][j];
        if (isVisible(data, treeHeight, i, j)) {
            numVisibleInideTrees += 1;
        }
    }
}


// Set solution and print

const solution = numOutsideTrees + numVisibleInideTrees;
console.log('Solution:', solution);