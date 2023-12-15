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

const width = maxX - minX;
const height = maxY;

const pit = [] as state[][];
for(let i = 0; i <= height; i++) {
    let arr: state[] = [];
    for (let j = 0; j < width; j ++) {
        arr.push(".")
    }
    pit.push(arr);
}

initializePit(pit, data);
let startingPoint = { x: 500-minX, y: 0};
pit[startingPoint.y][startingPoint.x] = '+';

printPit(pit);

let i = 0;
let isOverflow = false;
while (!isOverflow) {
    isOverflow = !addSand(pit);
    i++
}

printPit(pit)


// Set solution and print

const solution = i -1;
console.log('Solution:', solution);


function addSand(pit: state[][]): boolean {
    let sandPoint = { x: 500 - minX, y: 0 };

    while(sandPoint.x < width && sandPoint.y < height) {
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
                    return true;
                }
            }

        }
    }
    return false;
}

function initializePit(pit: state[][], rocks: point[][]) {
    rocks.forEach(line => {
        for (let i = 0; i < line.length - 1; i++) {
            let start = line[i];
            let end = line[i+1];

            let currentPt = { x: start.x, y: start.y };
            if (start.x < end.x) {
                while(currentPt.x <= end.x) {
                    pit[currentPt.y][currentPt.x - minX] = '#';
                    currentPt.x = currentPt.x + 1;
                }
            } else if (start.x > end.x) {
                while(currentPt.x >= end.x) {
                    pit[currentPt.y][currentPt.x - minX] = '#';
                    currentPt.x = currentPt.x - 1;
                }
            } else if (start.y < end.y) {
                while(currentPt.y <= end.y) {
                    pit[currentPt.y][currentPt.x - minX] = '#';
                    currentPt.y += 1;
                }            
            } else if (start.y > end.y) {
                while(currentPt.y >= end.y) {
                    pit[currentPt.y][currentPt.x - minX] = '#';
                    currentPt.y -= 1;
                }     
            }
        }
    })
}

function printPit(pit: state[][]) {
    let length = pit.length;
    let width = pit[0].length;
    console.log("=============================")
    for(let i = 0; i < length; i++) {
        let str = `${i}: `;
        for (let j = 0; j < width; j ++) {
            str += pit[i][j];
        }
        console.log(str);
    }
}