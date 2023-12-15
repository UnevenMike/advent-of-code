#####

f = open("input.txt", "r")
lines = f.read().split("\n")

grid = [[c for c in l] for l in lines]

print(grid)

width = len(grid[0])
height = len(grid)

new_cols = []
for col in range(width):
    hasGalaxy = False
    for row in range(height):
        if grid[row][col] == '#':
            hasGalaxy = True

    if not hasGalaxy:
        new_cols.append(col)

new_rows = []
for row in range(height):
    hasGalaxy = False
    for col in range(width):
        if grid[row][col] == '#':
            hasGalaxy = True

    if not hasGalaxy:
        new_rows.append(row)

# for col in reversed(new_cols):
#     for row in grid:
#         row.insert(col, '.')

# for row in grid:
#     print(row)

# width = width + len(new_cols)

# for row in reversed(new_rows):
#     data = [ '.' for i in range(width)]
#     grid.insert(row, data )

# for row in grid:
#     print(row)

# height = height + len(new_rows)


galaxys = []
for y in range(height):
    for x in range(width):
        if grid[y][x] == "#":
            galaxys.append((x, y))


distances = []
for i in range(len(galaxys) - 1):
    for j in range(i+1, len(galaxys)):
        first = galaxys[i]
        second = galaxys[j]

        num_x_jumps = 0
        low_x = min(first[0], second[0])
        high_x = max(first[0], second[0])

        for x in range(low_x, high_x):
            if x in new_cols:
                num_x_jumps += 1
        
        num_y_jumps = 0
        low_y = min(first[1], second[1])
        high_y = max(first[1], second[1])

        for y in range(low_y, high_y):
            if y in new_rows:
                num_y_jumps += 1
        
        x_dist = high_x - low_x + (1000000 - 1) * num_x_jumps
        y_dist = high_y - low_y + (1000000 - 1) * num_y_jumps
        dist = x_dist + y_dist
        distances.append(dist)
        # print(i, j, first, second, num_x_jumps, num_y_jumps, x_dist, y_dist, dist)



# print(galaxys)
# print(distances)
print(sum(distances))


