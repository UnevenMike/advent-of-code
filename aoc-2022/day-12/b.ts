// deno-lint-ignore-file prefer-const
// Read file
import { readLines } from 'https://deno.land/std@0.167.0/io/buffer.ts';
const f = await Deno.open('./input.txt');
const lines: string[] = [];
for await (const l of readLines(f)) {
    lines.push(l);
}

type point = { x: number, y: number};
// Begin Problem solving
let start = { x: 0, y: 0}
let end = { x: 0, y: 0  }

for (let i = 0; i < lines.length; i++) {
    let j = lines[i].indexOf('S');
    let k = lines[i].indexOf('E');
    if ( j > -1 ) { 
        start = { x: i, y: j };
    } if (k > -1 ) {
        end = { x: i, y: k }
    }
}

const data = lines.map(line => line.split(""));
data[start.x][start.y] = 'a';
data[end.x][end.y] = 'z';

const height = data.length;
const width = data[0].length;

const heights = data.map(line => line.map(point => point.charCodeAt(0) - 97));

function computeStepsToEnd(pos: point, steps: number[][], heights: number[][]) {
    let currentLevel = heights[pos.x][pos.y];
    let currentSteps = steps[pos.x][pos.y];

    if (currentSteps > -1) {
        return;
    }
    
    let upData = { height: -1, steps: -1};
    let downData = { height: -1, steps: -1};
    let leftData = { height: -1, steps: -1};
    let rightData = { height: -1, steps: -1};

    let up = { x: pos.x - 1, y: pos.y }
    if (up.x >= 0 && up.x < height) {
        upData = {
            steps: steps[up.x][up.y],
            height: heights[up.x][up.y]
        }
    }
    let down = { x: pos.x + 1, y: pos.y }
    if (down.x >= 0 && down.x < height) {
        downData = {
            steps: steps[down.x][down.y],
            height: heights[down.x][down.y]
        }
    }    
    let left = { x: pos.x, y: pos.y - 1}
    if (left.y >= 0 && left.y < width) {
        leftData = {
            steps: steps[left.x][left.y],
            height: heights[left.x][left.y]
        }
    } 
    let right = { x: pos.x, y: pos.y + 1 }
    if (right.y >= 0 && right.y < width) {
        rightData = {
            steps: steps[right.x][right.y],
            height: heights[right.x][right.y]
        }
    }

    let allData = [upData, downData, leftData, rightData];
    allData = allData.filter(x => ((currentLevel - x.height <= 1))  && x.steps > -1);
    allData.sort((a, b) =>  a.steps - b.steps);
    if (allData.length > 0) {
        let val = allData[0].steps + 1;
        steps[pos.x][pos.y] = val;
    }
}



let starts: point[] = []
let minSteps = height*width;

for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
        if (heights[i][j] == 0) {
            starts.push({ x: i, y: j })
        }
    }
}

starts.forEach(start => {
    const steps: number[][] = [];
    for (let i = 0; i < height; i++) {
        let arr = [];
        for (let j = 0; j < width; j++) {
            arr.push(-1);
        }
        steps.push(arr);
    }
    steps[start.x][start.y] = 0;
    
    for (let times = 0; times < height * width; times++) {
        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                computeStepsToEnd({x: i, y: j}, steps, heights);
            }
        }
    }
    
    let endingSteps = steps[end.x][end.y];

    
    if (endingSteps > -1 && endingSteps < minSteps) {
        minSteps = endingSteps;
    }
});

const solution = minSteps;
console.log('Solution:', solution);