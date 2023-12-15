#####
f = open("input.txt", "r")
lines = f.read().split("\n")

games = []
for line in lines:
    s = line.split(': ')
    game_num = int(s[0].split(' ')[1])
    game_pulls = s[1].split('; ')
    balls = []
    for pulls in game_pulls:
        bs = pulls.split(', ')
        b_dict = {}
        for b in bs:
            a = b.split(' ')
            b_colr = a[1]
            b_num = int(a[0])
            b_dict[b_colr] = b_num
        balls.append(b_dict)

    games.append({
        'game': game_num,
        'balls': balls
    })

print(games)

vals = []
for game in games:
    max_red = 0
    max_green = 0
    max_blue = 0
    for sample in game['balls']:
        blue = sample.get('blue', 0)
        green = sample.get('green', 0)
        red = sample.get('red', 0)

        if blue > max_blue:
            max_blue = blue
        if green > max_green:
            max_green = green
        if red > max_red:
            max_red = red

    pwr = max_red * max_green * max_blue
    vals.append(pwr)

print(sum(vals))

# Part 1
