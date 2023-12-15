// deno-lint-ignore-file prefer-const
// Read file
import { readLines } from 'https://deno.land/std@0.167.0/io/buffer.ts';
const f = await Deno.open('./input.txt');
const lines: string[] = [];
for await (const l of readLines(f)) {
    lines.push(l);
}

// Begin Problem solving
type state = '.' | '#' | '+' | 'o';
type point = { x: number, y: number };

let data = lines.map(line => {
    let splt = line.split(" -> ");
    let points = splt.map(x => {
        let pointSply = x.split(',');
        return { x: parseInt(pointSply[0]), y: parseInt(pointSply[1]) }
    })
    return points.flat();
});

let xCoors = data.flat().map(d => d.x);
let yCoors = data.flat().map(d => d.y);
let minX = Math.min(...xCoors);
let maxX = Math.max(...xCoors);
let maxY = Math.max(...yCoors);

const height = maxY + 2;
const width = maxX - minX;
let totalWidth = Math.ceil(height * 3);
if ((totalWidth % 2) != (width % 2)) {
    totalWidth += 1;
}

const columnDiff = (totalWidth - width)/2;
const sandOffset = minX - columnDiff;

const pit: state[][] = [];
for (let i = 0; i <= height; i++) {
    let arr: state[] = [];
    for(let j=0; j < totalWidth; j++) {
        arr.push(".")
    }
    pit.push(arr);
}

initializePit(pit, data);
let startingPoint = { x: 500 - sandOffset, y: 0};
pit[startingPoint.y][startingPoint.x] = '+';

let i = 0;
let isDone = false;
while (!isDone) {
    let newPoint = addSand(pit);
    isDone = newPoint.x == startingPoint.x && newPoint.y == startingPoint.y
    i++;
}

// Set solution and print

const solution = i;
console.log('Solution:', solution);


function addSand(pit: state[][]): point {
    let startingPoint = { x: 500 - sandOffset, y: 0 };
    let sandPoint = { x: 500 - sandOffset, y: 0 };

    while(sandPoint.x < totalWidth && sandPoint.y < height) {
        let newPoint = { x: sandPoint.x, y: sandPoint.y + 1 };
        if (pit[newPoint.y][newPoint.x] == '.' || pit[newPoint.y][newPoint.x] == undefined) {
            sandPoint = newPoint; // Moves Down
        } else {
            let newPoint = { x: sandPoint.x - 1, y: sandPoint.y + 1 }; // Move down left
            if (pit[newPoint.y][newPoint.x] == '.' || pit[newPoint.y][newPoint.x] == undefined) {
                sandPoint = newPoint;
            } else {
                let newPoint = { x: sandPoint.x + 1, y: sandPoint.y + 1 }; // Move down right
                if (pit[newPoint.y][newPoint.x] == '.' || pit[newPoint.y][newPoint.x] == undefined) {
                    sandPoint = newPoint;
                } else {
                    // console.log(`added Sand at ${sandPoint.x}, ${sandPoint.y}`)
                    pit[sandPoint.y][sandPoint.x] = 'o';
                    return sandPoint;
                }
            }
        }
    }
    return startingPoint;
}

function initializePit(pit: state[][], rocks: point[][]) {
    rocks.forEach(line => {
        for (let i = 0; i < line.length - 1; i++) {
            let start = line[i];
            let end = line[i+1];

            let currentPt = { x: start.x, y: start.y };
            if (start.x < end.x) {
                while(currentPt.x <= end.x) {
                    pit[currentPt.y][currentPt.x - sandOffset] = '#';
                    currentPt.x = currentPt.x + 1;
                }
            } else if (start.x > end.x) {
                while(currentPt.x >= end.x) {
                    pit[currentPt.y][currentPt.x - sandOffset] = '#';
                    currentPt.x = currentPt.x - 1;
                }
            } else if (start.y < end.y) {
                while(currentPt.y <= end.y) {
                    pit[currentPt.y][currentPt.x - sandOffset] = '#';
                    currentPt.y += 1;
                }            
            } else if (start.y > end.y) {
                while(currentPt.y >= end.y) {
                    pit[currentPt.y][currentPt.x - sandOffset] = '#';
                    currentPt.y -= 1;
                }     
            }
        }
    });

    for (let i = 0; i < totalWidth; i++) {
        pit[height][i] = '#';
    }
}

function printPit(pit: state[][]) {
    console.log("=============================")
    for(let i = 0; i <= height; i++) {
        let str = `${i.toString().padStart(3, " ")}: `;
        for (let j = 0; j < totalWidth; j ++) {
            str += pit[i][j];
        }
        console.log(str);
    }
}