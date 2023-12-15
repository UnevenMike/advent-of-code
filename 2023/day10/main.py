#####
from math import ceil


f = open("input.txt", "r")
lines = f.read().split("\n")

grid = [ [ c for c in l] for l in lines]

dirs = ["N", "E", "S", "W"]


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
        return ['E', 'S']
    elif chr == '7':
        return ['S', 'W']
    elif chr == 'S':
        return None
    
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
    
def getInsideDir(dir):
    if dir == 'N':
        return 'E'
    elif dir == 'S':   
        return 'W'
    elif dir == 'E':  
        return 'S'
    elif dir == 'W': 
        return 'N'

def getOutsideDir(dir):
    if dir == 'N':
        return 'W'
    elif dir == 'S':   
        return 'E'
    elif dir == 'E':  
        return 'N'
    elif dir == 'W': 
        return 'S'
    


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

value_grid = []
for i in range(height):
    vals = []
    for j in range(width):
        vals.append(('.', 0))
    value_grid.append(vals)

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
if 'W' in lDirs:
    startConnections.append((*left, lChar))
    startDirections.append('E')
if 'N' in bDirs:
    startConnections.append((*below, bChar))
    startDirections.append('S')
if 'E' in rDirs:
    startConnections.append((*right, rChar))
    startDirections.append('W')

count = 1
start_position = loop[0]
value_grid[start_position[1]][start_position[0]] = 'P'

position = startConnections[0]
direction = startDirections[0]
value_grid[position[1]][position[0]] = 'P'
loop.append(position)

def fill_valgrid(pos, trav_dir):
    inside_dir = getInsideDir(trav_dir)
    inside_offset = getOffset(inside_dir)

    outside_dir = getOutsideDir(trav_dir)
    outside_offset = getOffset(outside_dir)


    step = (pos[0] + inside_offset[0], pos[1] + inside_offset[1])
    while step[0] >= 0 and step[0] < width and step[1] >= 0 and step[1] < height:
        cell = value_grid[step[1]][step[0]]
        if cell == "P":
            break
        value_grid[step[1]][step[0]] = "i"
        step = (step[0] + inside_offset[0], step[1] + inside_offset[1])


    step = (pos[0] + outside_offset[0], pos[1] + outside_offset[1])
    while step[0] >= 0 and step[0] < width and step[1] >= 0 and step[1] < height:
        cell = value_grid[step[1]][step[0]]
        if cell == "P":
            break
        value_grid[step[1]][step[0]] = "o"
        step = (step[0] + outside_offset[0], step[1] + outside_offset[1])

count = 0
while True:
    value_grid[position[1]][position[0]] = "P"
    fill_valgrid(position, direction)

    opp_dir = getOppositeDir(direction)
    current_pipe_connections = getConnections(position[2])

    if current_pipe_connections is None:
        break

    current_pipe_connections.remove(opp_dir)
    next_direction = current_pipe_connections[0]

    if direction != next_direction:
        fill_valgrid(position, next_direction)



    next_offset = getOffset(next_direction)
    next_position = (position[0] + next_offset[0], position[1] + next_offset[1])
    next_char = getCharacter(next_position)

    direction = next_direction
    position = (next_position[0], next_position[1], next_char)
    loop.append(position)
    count += 1


for row in value_grid:
    print("".join([r[0] for r in row]))


count = 0
for j, row in enumerate(value_grid):
    for i, c in enumerate(row):
        if c[0] == 'i':
            count += 1

print(count)

count = 0
for j, row in enumerate(value_grid):
    for i, c in enumerate(row):
        if c[0] == 'o':
            count += 1

print(count)