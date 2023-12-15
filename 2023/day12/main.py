#####

f = open("input.txt", "r")
lines = f.read().split("\n")

grid = [[c for c in l] for l in lines]

print(grid)
