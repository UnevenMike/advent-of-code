// Read file
import { logger as l } from "../../lib/logger/logger.ts";

import { readLines } from 'https://deno.land/std@0.167.0/io/buffer.ts';
const f = await Deno.open('./input.txt');
const lines: string[] = [];
for await (const l of readLines(f)) {
    lines.push(l);
}

// Begin Problem solving
type Monkey = {
    id: number,
    items: number[],
    op: {
        opr: '+' | '*' | '^',
        val: number,
    },
    test: {
        div: number,
        pass: number,
        fail: number,
    },
    metrics: {
        numInspections: number,
    },
}

const monkeys: Monkey[] = [];
for(let i = 0; i < lines.length; i +=7) {
    const opsItems = lines[i + 2].split("=")[1].trim().split(" ");

    monkeys.push({
        id: parseInt(lines[i + 0].split(" ")[1].split(":")[0]),
        items: lines[i + 1].split(":")[1].split(", ").map(s => parseInt(s)),
        op: {
            opr: opsItems[2] == 'old' ? '^' : opsItems[1] as '+' | '*' | '^',
            val: opsItems[2] == 'old' ? 2 : parseInt(opsItems[2]),
        },
        test: {
            div: parseInt(lines[i + 3].split("by ")[1]),
            pass: parseInt(lines[i + 4].split("monkey ")[1]),
            fail: parseInt(lines[i + 5].split("monkey ")[1]),
        },
        metrics: {
            numInspections: 0,
        }
    });
}

l.logLevel = 3;
const modLevel = monkeys.map(m => m.test.div).reduce((prev, curr) => prev * curr);

const rounds = 10000;
for(let round = 0; round < rounds; round++) {
    for(let i = 0; i < monkeys.length; i++) {
        const monkey = monkeys[i];

        // Inspect Items
        monkey.items = monkey.items.map(item => {
            if (monkey.op.opr == '+') {
                return item + monkey.op.val;
            } else if (monkey.op.opr == '*') {
                return item * monkey.op.val;
            } else if (monkey.op.opr == '^') {
                return item ** monkey.op.val;
            }
            return 0;
        });

        monkey.metrics.numInspections += monkey.items.length;

        // No Relief
        // monkey.items = monkey.items.map(item => {
        //     return Math.floor(item / 3)
        // })

        // Test Items
        const evals = monkey.items.map(item => {
            return item % monkey.test.div == 0;
        });

        // Throw Items
        evals.forEach((test, idx) => {
            const val = monkey.items[idx] % modLevel; // Pass modded number to other monkeys
            const monkeyIdx = test ? monkey.test.pass : monkey.test.fail;
            monkeys[monkeyIdx].items.push(val);
        });

        monkey.items = [];    
    }

    l.debug(`Round: ${round} ------------------------`);
    l.debug(monkeys.map(m=> m.metrics));
}

const inspections = monkeys.map(m => m.metrics.numInspections).sort((a, b) => b-a);
l.info(inspections);
// Set solution and print

const solution = inspections[0] * inspections[1];
console.log('Solution:', solution);
