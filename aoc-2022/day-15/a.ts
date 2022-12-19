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

let ranges: number[][] = [];
let yLoc = 2000000;
data.forEach(d => {
    let y10 = Math.abs(d.sensor.y - yLoc);
    let remainingDistance = d.distance - y10;
    if (remainingDistance >= 0) {
        ranges.push([d.sensor.x - remainingDistance, d.sensor.x + remainingDistance]);
    }
})

let filledPoints = new Set<number>();
ranges.forEach(range => {
    for(let i = range[0]; i <= range[1]; i++) {
        filledPoints.add(i);
    }
});

let lineBeaconXs = data.filter(x => x.beacon.y == yLoc).map(x => x.beacon.x);
lineBeaconXs.forEach(x => filledPoints.delete(x));

// Set solution and print
const solution = filledPoints.size;
console.log('Solution:', solution);
