// deno-lint-ignore-file prefer-const
// Read file
import { readLines } from 'https://deno.land/std@0.167.0/io/buffer.ts';
const f = await Deno.open('./input.txt');
const lines: string[] = [];
for await (const l of readLines(f)) {
    lines.push(l);
}

// Begin Problem solving
type instruction = 'noop' | 'addx';

function getInstructionCycles(ins: instruction): number{
    if (ins === 'noop') {
        return 1;
    } else if (ins === 'addx') {
        return 2;
    }
    return 0;
}

const instructions = lines.map(line => {
    const splits = line.split(" ");
    return {
        ins: splits[0] as instruction,
        arg: splits[1] ? parseInt(splits[1]) : null,
        cycles: getInstructionCycles(splits[0] as instruction)
    }
});

let regX = 1;
let clock = 0;

const signals: number[] = [];

instructions.forEach(instruction => {
    for (let i = 0; i < (instruction.cycles); i++) {
        clock += 1;
        if (clock % 40 == 20) {
            signals.push(clock * regX);
        }
    }

    if (instruction.ins == 'addx') {
        regX += instruction.arg!;
    }
});

const total = signals.reduce((prev, curr) => prev + curr);
// Set solution and print

const solution = total;
console.log('Solution:', solution);