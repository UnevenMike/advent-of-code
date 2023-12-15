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
type status = 'win' | 'lose' | 'tie' | null

function playGame(game:{ opp: oppPlay, you: youPlay}): number {
    let status: status = null;
    if (game.opp == 'A' && game.you == 'X' ) {
        status = 'tie';
    } else if (game.opp == 'A' && game.you == 'Y' ) {
        status = 'win';
    } else if (game.opp == 'A' && game.you == 'Z' ) {
        status = 'lose';
    } else if (game.opp == 'B' && game.you == 'X' ) {
        status = 'lose';
    } else if (game.opp == 'B' && game.you == 'Y' ) {
        status = 'tie';
    } else if (game.opp == 'B' && game.you == 'Z' ) {
        status = 'win';
    } else  if (game.opp == 'C' && game.you == 'X' ) {
        status = 'win';
    } else if (game.opp == 'C' && game.you == 'Y' ) {
        status = 'lose';
    } else if (game.opp == 'C' && game.you == 'Z' ) {
        status = 'tie';
    }

    const winScore = status == 'win' ? 6 : (status == 'lose' ? 0 : 3);
    const playScore = game.you == 'X' ? 1 : (game.you == 'Y' ? 2 : 3);

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
    console.log(gameScore)
    total += gameScore
})


// Set solution and print

const solution = total;
console.log('Solution:', solution);