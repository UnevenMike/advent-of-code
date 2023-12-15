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

let pairs = [];
for (let i = 0; i < lines.length; i += 3) {
    pairs.push({ first: JSON.parse(lines[i]), second: JSON.parse(lines[i+1]) });
}

let indexes: number[] = []
pairs.forEach((pair, index) => {
    let res = compareLists(pair.first, pair.second);
    if (res) {
        indexes.push(index + 1);
    }
});

// Set solution and print
const sum = indexes.reduce((prev, curr) => prev + curr, 0);
const solution = sum;
console.log('Solution:', solution);
