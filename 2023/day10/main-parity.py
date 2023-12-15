#####
from math import ceil


f = open("input.txt", "r")
lines = f.read().split("\n")

grid = [ [ c for c in l] for l in lines]

def getCharacter(point):
    return grid[point[1]][point[0]]

def getConnections(chr):
    if chr == '.':
        return []
    elif chr == '|':
        return ['N', 'S']
    elif chr == '-':
        return ['E', 'W']
    elif chr == 'L':
        return ['N', 'E']
    elif chr == 'J':
        return ['N', 'W']
    elif chr == 'F':
        return ['S', 'E']
    elif chr == '7':
        return ['S', 'W']
    elif chr == 'S':
        return None
    
def getConnectionsReverse(chr):
    if chr == []:
        return '.'
    elif chr == ['N', 'S']:
        return '|'
    elif chr == ['E', 'W']:
        return '-'
    elif chr == ['N', 'E']:
        return 'L'
    elif chr == ['N', 'W']:
        return 'J'
    elif chr == ['S', 'E']:
        return 'F'
    elif chr == ['S', 'W']:
        return '7'

def getOffset(dir):
    if dir == 'N':
        return (0, -1)  
    elif dir == 'S':   
        return (0, 1)  
    elif dir == 'E':  
        return (1, 0)  
    elif dir == 'W': 
        return (-1, 0)


def getTravelingDir(dir):
    if dir == (0, -1):
        return 'N'
    elif dir == (0, 1):   
        return 'S' 
    elif dir == (1, 0):  
        return 'E'
    elif dir == (-1, 0): 
        return 'W'


def getOppositeDir(dir):
    if dir == 'N':
        return 'S'
    elif dir == 'S':   
        return 'N'
    elif dir == 'E':  
        return 'W'
    elif dir == 'W': 
        return 'E'


width = len(grid[0])
height = len(grid)

start = None
loop = []



for x in range(width):
    for y in range(height):
        character = grid[y][x]
        if character == 'S':
            start = (x,y)
            loop.append((x, y, character))

x = start[0]
y = start[1]
count = 0

above = (start[0], start[1] - 1)
left = (start[0] + 1, start[1])
below = (start[0], start[1] + 1)
right = (start[0] - 1, start[1])

aChar = getCharacter(above)
aDirs = getConnections(aChar)

lChar = getCharacter(left)
lDirs = getConnections(lChar)

bChar = getCharacter(below)
bDirs = getConnections(bChar)

rChar = getCharacter(right)
rDirs = getConnections(rChar)

startConnections = []
startDirections = []
if 'S' in aDirs:
    startConnections.append((*above, aChar))
    startDirections.append('N')
if 'N' in bDirs:
    startConnections.append((*below, bChar))
    startDirections.append('S')
if 'W' in lDirs:
    startConnections.append((*left, lChar))
    startDirections.append('E')
if 'E' in rDirs:
    startConnections.append((*right, rChar))
    startDirections.append('W')

count = 1
start_position = loop[0]
position = startConnections[1]
print(loop)
loop.append(position)

direction = startDirections[1]
print(position, direction)
print()

while True:
    flip_dir = getOppositeDir(direction)
    next_connections = getConnections(position[2])
    next_connections.remove(flip_dir)
    next_direction = next_connections[0]

    next_offset = getOffset(next_direction)
    next_position = (position[0] + next_offset[0], position[1] + next_offset[1])
    next_char = getCharacter(next_position)

    if next_char == 'S':
       break

    direction = next_direction
    position = (next_position[0], next_position[1], next_char)
    loop.append(position)
    count += 1

start_piece = getConnectionsReverse(startDirections)
start = loop[0]
loop[0] = (start[0], start[1], start_piece)

print(loop)

# Start part 2

pipe_chars = ["|", '-', 'L', 'J', '7', 'F']
hor_chars = ['-', 'L', 'J', '7', 'F']
ver_chars = ["|", 'L', 'J', '7', 'F']

value_grid = []
for i in range(height):
    vals = []
    for j in range(width):
        vals.append('.')
    value_grid.append(vals)

for row in value_grid:
    print([r[0] for r in row])

print('')

for p in loop:
    value_grid[p[1]][p[0]] = p[2]

for row in value_grid:
    print("".join([r[0] for r in row]))
print('')


# for x in range(width):
#     withInPipe = False
#     isOutside = True
#     for y in range(height):
#         cell = value_grid[y][x]
#         if cell in pipe_chars:
#             withInPipe = True

#         if not withInPipe:
#             value_grid[y][x] = "0"
#         else:
#             if cell not in pipe_chars and not isOutside:
#                 if cell != "0":
#                     value_grid[y][x] = "I"
#             else:
#                 if cell in hor_chars:
#                     isOutside = not  isOutside


# for x in range(width):
#     withInPipe = False
#     isOutside = True
#     for y in reversed(range(height)):
#         cell = value_grid[y][x]
#         if cell in pipe_chars:
#             withInPipe = True

#         if not withInPipe:
#             value_grid[y][x] = "0"
#         else:
#             if cell not in pipe_chars and not isOutside:
#                 if cell != "0":
#                     value_grid[y][x] = "I"
#             else:
#                 if cell in hor_chars:
#                     isOutside = not  isOutside


for y in range(height):
    withInPipe = False
    isOutside = True
    for x in range(width):
        cell = value_grid[y][x]
        if cell in pipe_chars:
            withInPipe = True

        if not withInPipe:
            value_grid[y][x] = "0"
        else:
            if cell not in pipe_chars and not isOutside:
                if cell != "0":
                    value_grid[y][x] = "I"
            if cell not in pipe_chars and isOutside:
                    value_grid[y][x] = "x"
            else:
                if cell in ver_chars:
                    isOutside = not isOutside

    for row in value_grid:
        print("".join([r[0] for r in row]))
    print('')
    

for y in range(height):
    withInPipe = False
    isOutside = True
    for x in reversed(range(width)):
        cell = value_grid[y][x]
        if cell in pipe_chars:
            withInPipe = True

        if not withInPipe:
            value_grid[y][x] = "0"
        else:
            if cell not in pipe_chars and not isOutside:
                if cell != "0":
                    value_grid[y][x] = "I"
            else:
                if cell in ver_chars:
                    isOutside = not isOutside


for row in value_grid:
    print("".join([r[0] for r in row]))
print('')
    
count = 0
for j, row in enumerate(value_grid):
    for i, c in enumerate(row):
        if c == 'I':
            count += 1
print(count)


# for i in range(1, len(loop)):
#     current = loop[i]
#     previous = loop[i-1]
#     direction = (current[0] - previous[0], current[1] - previous[1])

#     trav_dir = getTravelingDir(direction)
#     if clock == True:
#         if trav_dir == 'N':
#             inside_dir = 'W'
#         elif trav_dir == 'E':
#             inside_dir = 'N'
#         elif trav_dir == 'S':
#             inside_dir = 'E'
#         elif trav_dir == 'W':
#             inside_dir = 'S'
#     else:
#         if trav_dir == 'N':
#             inside_dir = 'E'
#         elif trav_dir == 'E':
#             inside_dir = 'S'
#         elif trav_dir == 'S':
#             inside_dir = 'W'
#         elif trav_dir == 'W':
#             inside_dir = 'N'

#     inside_offset = getOffset(inside_dir)


#     hasPipeAlongDir = False
#     step = (current[0], current[1])
#     step_count = 0
#     while step[0] >= 0 and step[0] < width and step[1] >= 0 and step[1] < height:
#         if step_count > 0:
#             c = value_grid[step[1]][step[0]]
#             if c[0] == 'P':
#                 hasPipeAlongDir = True
#                 break
#         step_count += 1
#         step = (step[0] + inside_offset[0], step[1] + inside_offset[1])

#     if hasPipeAlongDir:
#         step = (current[0], current[1])
#         step_count = 0
#         while step[0] >= 0 and step[0] < width and step[1] >= 0 and step[1] < height:

#             if step_count > 0:
#                 c = value_grid[step[1]][step[0]]
#                 if c[0] == 'P':
#                     break
#                 value_grid[step[1]][step[0]] = ('I', 0)
#                 # for row in value_grid:
#                 #     print("".join([r[0] for r in row]))
#                 # print('')

#             step_count += 1
#             step = (step[0] + inside_offset[0], step[1] + inside_offset[1])



# out = open("output.txt", "w")
# for l in [ "".join([r[0] for r in row]) for row in value_grid]:
#     out.write(l)
#     out.write('\n')

# for row in value_grid:
#     print([r[0] for r in row])

# print('')

# # for row in value_grid:
# #     print([r[1] for r in row])

# # print('')

# count = 0
# for j, row in enumerate(value_grid):
#     for i, c in enumerate(row):
#         if c[0] == 'I':
#             count += 1

# print(count)

# # value_grid = []
# # for i in range(height):
# #     vals = []
# #     for j in range(width):
# #         vals.append(('.', 0))
# #     value_grid.append(vals)

# # print(loop)

# # for row in value_grid:
# #     print([r[0] for r in row])

# # print('')

# # for row in value_grid:
# #     print([r[1] for r in row])

# # print('')

# # value_grid[loop[0][1]][loop[0][0]] = ('P', 0)
# # for i in range(1, len(loop)):
# #     current = loop[i]
# #     previous = loop[i-1]
# #     direction = (current[0] - previous[0], current[1]- previous[1])

# #     trav_dir = getTravelingDir(direction)
# #     # if trav_dir == 'N':
# #     #     inside_dir = 'W'
# #     # elif trav_dir == 'E':
# #     #     inside_dir = 'N'
# #     # elif trav_dir == 'S':
# #     #     inside_dir = 'E'
# #     # elif trav_dir == 'W':
# #     #     inside_dir = 'S'

# #     if trav_dir == 'N':
# #         inside_dir = 'E'
# #     elif trav_dir == 'E':
# #         inside_dir = 'S'
# #     elif trav_dir == 'S':
# #         inside_dir = 'W'
# #     elif trav_dir == 'W':
# #         inside_dir = 'N'

# #     inside_offset = getOffset(inside_dir)


# #     hasPipeAlongDir = False
# #     step = (current[0], current[1])
# #     while step[0] >= 0 and step[0] < width and step[1] >= 0 and step[1] < height:
# #         c = value_grid[step[1]][step[0]]
# #         if c[0] == 'P':
# #             hasPipeAlongDir = True
# #         step = (step[0] + inside_offset[0], step[1] + inside_offset[1])

# #     print(current, previous, direction, trav_dir, inside_offset, inside_dir, inside_offset, hasPipeAlongDir)

# #     if hasPipeAlongDir:
# #         step = (current[0], current[1])
# #         while value_grid[step[1]][step[0]][0] != 'P':
# #             cell_count = value_grid[step[1]][step[0]][1]
# #             value_grid[step[1]][step[0]] = ('I', cell_count)
# #             step = (step[0] + inside_offset[0], step[1] + inside_offset[1])


# #     value_grid[current[1]][current[0]] = ('P', 0)


# # # Clean up outside visible cells
# # for i in range(1, len(loop)):
# #     current = loop[i]
# #     previous = loop[i-1]
# #     direction = (current[0] - previous[0], current[1]- previous[1])

# #     trav_dir = getTravelingDir(direction)
# #     if trav_dir == 'N':
# #         outside_dir = 'W'
# #     elif trav_dir == 'E':
# #         outside_dir = 'N'
# #     elif trav_dir == 'S':
# #         outside_dir = 'E'
# #     elif trav_dir == 'W':
# #         outside_dir = 'S'

# #     # if trav_dir == 'N':
# #     #     outside_dir = 'E'
# #     # elif trav_dir == 'E':
# #     #     outside_dir = 'S'
# #     # elif trav_dir == 'S':
# #     #     outside_dir = 'W'
# #     # elif trav_dir == 'W':
# #     #     outside_dir = 'N'

# #     outside_offset = getOffset(outside_dir)

# #     hasPipeAlongDir = False
# #     step = (current[0], current[1])
# #     step_count = 0
# #     while step[0] >= 0 and step[0] < width and step[1] >= 0 and step[1] < height:
# #         if step_count > 0:
# #             c = value_grid[step[1]][step[0]]
# #             if c[0] == 'P':
# #                 break
# #             c = value_grid[step[1]][step[0]] = ('.', 0)

# #         step = (step[0] + outside_offset[0], step[1] + outside_offset[1])
# #         step_count += 1




# # count = 0
# # for j, row in enumerate(value_grid):
# #     for i, c in enumerate(row):
# #         if c[0] == 'I':
# #             count += 1
# #             # hasMissingPipe = False

# #             # for dir in [(0, 1), (0, -1), (1, 0), (-1, 0)]:            
# #             #     hasPipeAlongDir = False
# #             #     step = (i, j)
# #             #     while step[0] >= 0 and step[0] < width and step[1] >= 0 and step[1] < height:
# #             #         c = value_grid[step[1]][step[0]]
# #             #         if c[0] == 'P':
# #             #             hasPipeAlongDir = True
# #             #         step = (step[0] + dir[0], step[1] + dir[1])
# #             #     if not hasPipeAlongDir:
# #             #         hasMissingPipe = True

# #             # if not hasMissingPipe:
# #             #     count += 1
# #             # else:
# #             #     value_grid[j][i] = ('O', 0)


# # for pipe in loop:
# #     value_grid[pipe[1]][pipe[0]] = (pipe[2], 0)

# # out = open("output.txt", "w")
# # for l in [ "".join([r[0] for r in row]) for row in value_grid]:
# #     out.write(l)
# #     out.write('\n')

# # for row in value_grid:
# #     print([r[0] for r in row])

# # print('')

# # print(count)