// deno-lint-ignore-file prefer-const
// Read file
import { readLines } from 'https://deno.land/std@0.167.0/io/buffer.ts';
import { logger } from "../../logger/logger.ts";

const f = await Deno.open('./input.txt');
const lines: string[] = [];
for await (const l of readLines(f)) {
    lines.push(l);
}

// Begin Problem solving
logger.logLevel = 3;

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


const screen = ['', '', '', '', '', ''];
instructions.forEach(instruction => {
    for (let i = 0; i < (instruction.cycles); i++) {
        const row = Math.floor(clock / 40) % 6;
        const charIdx = clock % 40;

        clock += 1;

        const char = Math.abs(charIdx - regX) <= 1 ? '#' : '.'
        screen[row] += char;
        logger.debug(`During cycle ${clock}: CRT draws pixel in position (${row}, ${charIdx}). Sprite Location: ${regX}`);
        logger.debug(`Current CRT row: ${screen[row]}`);
        logger.debug('')
    }

    if (instruction.ins == 'addx') {
        regX += instruction.arg!;
        logger.debug(`End of cycle: ${clock}: finish executing addx ${instruction.arg}. Register X is now ${regX}`)
    }
    logger.debug('---------------------------------------')
});

screen.forEach(line => {
    logger.info(line);
})
// Set solution and print

const solution = 0;
console.log('Solution:', solution);