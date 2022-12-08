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

const totalDiskSpace = 70_000_000;
const totalNeededDiskSpace = 30_000_000;

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

const remainingDiskSpace = totalDiskSpace - sizeMap.get("//")!;
const neededDiskSpace = totalNeededDiskSpace - remainingDiskSpace;
const smallestToRemove = Array.from(sizeMap.values())
    .filter(x => x >= neededDiskSpace)
    .sort((a,b) => a-b)[0];

// Set solution and print

const solution = smallestToRemove;
console.log('Solution:', solution);