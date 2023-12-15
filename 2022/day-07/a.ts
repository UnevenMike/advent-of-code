// deno-lint-ignore-file prefer-const
// Read file
import { readLines } from 'https://deno.land/std@0.167.0/io/buffer.ts';
const f = await Deno.open('./input.txt');
const lines: string[] = [];
for await (const l of readLines(f)) {
    lines.push(l);
}

// Begin Problem solving

const cwd: string[] = [];
const sizeMap = new  Map<string, number>();

lines.forEach(line => {

    const tokens = line.split(" ");

    switch(tokens[0]) {
        case '$':
            if (tokens[1] == 'cd') {
                if (tokens[2] == '..') {
                    cwd.pop();
                } else {
                    cwd.push(tokens[2]);
                }
            } else if (tokens[1] == 'ls') {
                break;
            }
            break;
        case 'dir':
            break;
        default: {
            const fileSize = parseInt(tokens[0]);
            let fqdir = '';

            cwd.forEach(dir => {
                fqdir += `/${dir}`;
                if (sizeMap.has(fqdir)) {
                    sizeMap.set(fqdir, sizeMap.get(fqdir)! + fileSize);
                }
                else {
                    sizeMap.set(fqdir, fileSize);
                }
            });
        }
    }
});


let total = Array.from(sizeMap.values()).filter(x => x <= 100_000).reduce((prev, curr) => prev + curr);

// Set solution and print

const solution = total;
console.log('Solution:', solution);