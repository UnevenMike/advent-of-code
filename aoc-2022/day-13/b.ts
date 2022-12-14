// deno-lint-ignore-file prefer-const
// Read file
import { readLines } from 'https://deno.land/std@0.167.0/io/buffer.ts';
const f = await Deno.open('./input.txt');
const lines: string[] = [];
for await (const l of readLines(f)) {
    lines.push(l);
}

// Begin Problem solving
function compareLists(first: any, second: any): boolean | null{
    let isFirstArray = Array.isArray(first);
    let isSecondArray = Array.isArray(second);
    let isCorrect = null;

    if (!isFirstArray && !isSecondArray) {
        isCorrect = first < second ? true : first > second ? false : null;
    }
    else if (isFirstArray && !isSecondArray) {
        isCorrect = compareLists(first, [second]);
    }
    else if (!isFirstArray && isSecondArray) {
        isCorrect = compareLists([first], second);
    }
    else {
        let minLength = Math.min(first.length, second.length);
        for(let i = 0; i < minLength; i++) {
            isCorrect = compareLists(first[i], second[i]);
            if (isCorrect != null) {
                return isCorrect;
            }
        } 
        if(isCorrect == null) {
            isCorrect = first.length < second.length ? true : first.length > second.length ? false : null;
        }
    }
    return isCorrect;
}

let data = [];
for(let i = 0; i<lines.length; i++) {
    if (lines[i]) {
        data.push(JSON.parse(lines[i]));
    }
}

const data2 = [[2]];
const data6 = [[6]];
data.push(data2);
data.push(data6);

data.sort((a, b) => compareLists(a,b) ? -1 : 1);

let idx2 = data.indexOf(data2) + 1;
let idx6 = data.indexOf(data6) + 1;

// Set solution and print

const solution = idx2 * idx6;
console.log('Solution:', solution);
