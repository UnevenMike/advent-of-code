// Read file
import { readLines } from 'https://deno.land/std@0.167.0/io/buffer.ts';
const f = await Deno.open('./input.txt');
const lines: string[] = [];
for await (const l of readLines(f)) {
    lines.push(l);
}

// Begin Problem solving
type oppPlay = 'A' | 'B' | 'C';
type youPlay = 'X' | 'Y' | 'Z';
type status = 'win' | 'lose' | 'tie' 

function playGame(game:{ opp: oppPlay, you: youPlay}): number {
    const status: status = game.you == 'X' ? 'lose' : (game.you == 'Y' ? 'tie' : 'win');

    let actualPlay = 'A';
    if (game.opp == 'A' && status == 'lose' ) {
        actualPlay = 'C';
    } else if (game.opp == 'A' && status == 'tie' ) {
        actualPlay = 'A';
    } else if (game.opp == 'A' && status == 'win' ) {
        actualPlay = 'B';
    } else if (game.opp == 'B' && status == 'lose' ) {
        actualPlay = 'A';
    } else if (game.opp == 'B' && status == 'tie' ) {
        actualPlay = 'B';
    } else if (game.opp == 'B' && status == 'win' ) {
        actualPlay = 'C';
    } else  if (game.opp == 'C' && status == 'lose' ) {
        actualPlay = 'B';
    } else if (game.opp == 'C' && status == 'tie' ) {
        actualPlay = 'C';
    } else if (game.opp == 'C' && status == 'win' ) {
        actualPlay = 'A';
    }

    const winScore = status == 'win' ? 6 : (status == 'lose' ? 0 : 3);
    const playScore = actualPlay == 'A' ? 1 : (actualPlay == 'B' ? 2 : 3);

    return winScore + playScore;    
}

const games = lines.map(line => { 
    const split = line.split(" ")
    return {
        opp: split[0] as oppPlay,
        you: split[1] as youPlay
    }
});
console.log(games)

let total = 0;
games.forEach(game => {
    const gameScore = playGame(game);
    total += gameScore
})


// Set solution and print

const solution = total;
console.log('Solution:', solution);