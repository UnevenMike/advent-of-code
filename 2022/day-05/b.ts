// deno-lint-ignore-file prefer-const
// Read file
import { readLines } from 'https://deno.land/std@0.167.0/io/buffer.ts';
const f = await Deno.open('./input.txt');
const lines: string[] = [];
for await (const l of readLines(f)) {
    lines.push(l);
}

// Begin Problem solving

type instruction = {
    numMoves: number,
    start: number,
    end: number
};

const split = lines.indexOf("");
const setup = lines.slice(0, split).reverse();
const moves = lines.slice(split + 1);

const stacks= new Map<number, string[]>();

for (let i = 0; i < setup[0].length; i+=4) {
    stacks.set(parseInt(setup[0].charAt(i+1)), []);
}

const boxes = setup.slice(1, setup.length);
boxes.forEach(boxRow => {
    let column = 1;
    for (let i = 0; i < boxRow.length; i+=4) {
        let stack = stacks.get(column);
        let boxName = boxRow.charAt(i+1);
        if (boxName != " ") {
            stack?.push(boxName);
        }
        column += 1;
    }
});

const instructions: instruction[] = moves.map(m => {
    const data = m.split(" ");
    return {
        numMoves:  parseInt(data[1]),
        start: parseInt(data[3]),
        end: parseInt(data[5])
    }
});

instructions.forEach(instruction => {
    let ministack : string[] = []
    for(let i = 0; i < instruction.numMoves; i++) {
        const box = stacks.get(instruction.start)?.pop();
        ministack.push(box!);
    }
    ministack.reverse();
    stacks.set(instruction.end, stacks.get(instruction.end)!.concat(ministack));
});

let sln = "";
stacks.forEach(x => sln += x[x.length - 1]);

// Set solution and print
const solution = sln;
console.log('Solution:', solution);