// deno-lint-ignore-file prefer-const
// Read file
import { readLines } from 'https://deno.land/std@0.167.0/io/buffer.ts';
const f = await Deno.open('./input.txt');
const lines: string[] = [];
for await (const l of readLines(f)) {
    lines.push(l);
}

// Begin Problem solving

function drawString(knots: { x: number, y: number}[]) {
    console.log('-------------------------------------------------------')
    let strs = knots.map(knot => `${knot.x}:${knot.y}`);
    for(let i = 6; i >= 0; i--) {
        let str = '';
        for (let j = 0; j < 6; j++) {
            let idx = strs.indexOf(`${j}:${i}`);
            if (idx > -1) {
                str += idx ? idx : 'H';
            } else {
                str += '.';
            }
        }
        console.log(str);
    }
}

const instructions = lines.map(line => {
    const split = line.split(" ");
    return {
        dir: split[0] as 'R' | 'L' | 'U' | 'D',
        num: parseInt(split[1])
    }
});


let knots = [{x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}] ;

const tailLocations = new Set();
tailLocations.add(`${knots[9].x}:${knots[9].y}`);

drawString(knots);

instructions.forEach(instruction => {
    for(let i = 0; i < instruction.num; i++) {
        if (instruction.dir === 'R') {
            knots[0].x += 1;
        } else if (instruction.dir === 'L') {
            knots[0].x -= 1;
        } else if (instruction.dir === 'U') {
            knots[0].y += 1;
        } else if (instruction.dir === 'D') {
            knots[0].y -= 1;
        }

        for(let ki = 1; ki < knots.length; ki++) {
            if ((knots[ki-1].x - knots[ki].x) >= 2) {
                knots[ki].x += 1; 
                if (knots[ki].y !== knots[ki-1].y) {
                    knots[ki].y += (knots[ki-1].y - knots[ki].y) > 0 ? 1 : -1;
                }
            } else if ((knots[ki].x - knots[ki-1].x) >= 2) {
                knots[ki].x -= 1;
                if (knots[ki].y !== knots[ki-1].y) {
                    knots[ki].y += (knots[ki-1].y - knots[ki].y) > 0 ? 1 : -1;
                }
            } else if ((knots[ki-1].y - knots[ki].y) >= 2) {
                knots[ki].y += 1;
                if (knots[ki].x !== knots[ki-1].x) {
                    knots[ki].x += (knots[ki-1].x - knots[ki].x) > 0 ? 1 : -1;
                }
            } else if ((knots[ki].y - knots[ki-1].y) >= 2) {
                knots[ki].y -= 1;
                if (knots[ki].x !== knots[ki-1].x) {
                    knots[ki].x += (knots[ki-1].x - knots[ki].x) > 0 ? 1 : -1;
                }
            }
        }
        tailLocations.add(`${knots[9].x}:${knots[9].y}`);
    }
    
    //drawString(knots);

})

// console.log(tailLocations)

// Set solution and print

const solution = tailLocations.size;
console.log('Solution:', solution);
