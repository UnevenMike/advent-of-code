#####
import functools
from math import lcm


f = open("input.txt", "r")
lines = f.read().split("\n\n")

steps = [ c for c in lines[0]]
maps = lines[1].split("\n")

data = {}
for m in maps:
    d = m.split(' = ')
    key = d[0]
    left = d[1][1:-1].split(", ")[0]
    right = d[1][1:-1].split(", ")[1]
    data.update({ key: { 'L': left, 'R': right}})


positions = []
for key in data.keys():
    if key[-1] == 'A':
        positions.append(key)

print(positions)

counts = []
for position in positions:
    count = 0
    p = position
    while p[-1] != 'Z':
        next_step = steps[count % len(steps)]
        p = data[p][next_step]
        count += 1
    counts.append(count)

print(counts)
print(lcm(*counts))