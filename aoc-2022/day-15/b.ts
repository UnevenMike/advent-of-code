// deno-lint-ignore-file prefer-const
// Read file
import { readLines } from 'https://deno.land/std@0.167.0/io/buffer.ts';
const f = await Deno.open('./input.txt');
const lines: string[] = [];
for await (const l of readLines(f)) {
    lines.push(l);
}

type point = { x: number, y: number };
type data = { sensor: point, beacon: point, distance: number };
// Begin Problem solving

let data = lines.map(l => {
    let split = l.split('at ');
    let sensorData = split[1].split(':')[0].split(',');
    let beaconData = split[2].split(',');
    
    let sensor = {x: parseInt(sensorData[0].split("=")[1]), y: parseInt(sensorData[1].split("=")[1])};
    let beacon = {x: parseInt(beaconData[0].split("=")[1]), y: parseInt(beaconData[1].split("=")[1])};

    return {
        sensor: sensor,
        beacon: beacon,
        distance: Math.abs(sensor.x - beacon.x) + Math.abs(sensor.y - beacon.y)
    }
});

let yMax = 4000000; // RUNS in about 20-25s with the full input. Not sure how to speed this up more.

for(let i = 0; i < yMax; i++) { 
    let yRanges: number[][] = [];

    data.forEach(d => {
        let yDistance = Math.abs(d.sensor.y - i);
        let yRemainingDistance = d.distance - yDistance;
        if (yRemainingDistance >= 0) {
            yRanges.push([d.sensor.x - yRemainingDistance, d.sensor.x + yRemainingDistance]);
        }
    });
    let yTotalRange = yRanges.reduce((prev: number[][], current) => rangeCollapse(prev, current), []);

    let gaps = findGaps(yTotalRange);
    if (gaps.length > 0) {
        let freq = 4000000 * gaps[0] + i;
        console.log(`x: ${gaps[0]}, y: ${i}, value: ${freq}`);
    }
}

// Set solution and print
const solution = 0;
console.log('Solution:', solution);

function rangeCollapse(prev: number[][], next: number[]): number[][]{
    let i = 0;
    let overlaps = [];
    for (i = 0; i < prev.length; i++) {
        if ((prev[i][0] <= next[1] && prev[i][1] >= next[0]) || (next[0] <= prev[i][1] && next[1] >= prev[i][0])) {
            overlaps.push(i);
        }      
    }

    if (overlaps.length == 0) {
        prev.push(next);
    } else {
        let minIndex = Math.min(...overlaps);
        let maxIndex = Math.max(...overlaps);
        let newRange = [Math.min(prev[minIndex][0], next[0]), Math.max(prev[maxIndex][1], next[1])];
        overlaps.sort((a, b) => b - a).forEach(idx => prev.splice(idx, 1));
        prev.push(newRange);
    }

    prev.sort((a, b) => a[0] < b[0] ? -1 : 1);
    return prev;
}

function findGaps(ranges: number[][]): number[] {
    let gaps = []
    for(let i = 1; i < ranges.length; i++) {
        if ((ranges[i][0] - ranges[i-1][1]) >= 2) {
            gaps.push(ranges[i][0] - 1);
        }
    }
    return gaps;
}
