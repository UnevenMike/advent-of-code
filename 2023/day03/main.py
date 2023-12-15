#####
f = open("input.txt", "r")
lines = f.read().split("\n")

numbers_start = {}
numbers_end = {}
symbols = {}

chars = [[c for c in line] for line in lines]

num_id = 0

for i, line in enumerate(lines):
    currentNumStr = ''
    for j, chr in enumerate(line):
        if chr.isdigit():
            currentNumStr += chr
        else:
            if currentNumStr != '':
                num_id += 1
                numbers_end.update({(i, j-1): (num_id, int(currentNumStr))})
                numbers_start.update({(i, j-len(currentNumStr)): (num_id, int(currentNumStr))})
                currentNumStr = ''
            if chr == '*':
                symbols.update({(i, j): chr})
    
    if currentNumStr:
        numbers_end.update({(i, len(line)-1): (num_id, int(currentNumStr))})
        numbers_start.update({(i, j-len(currentNumStr)+1): (num_id, int(currentNumStr))})



print('Numbers')
for k, v in numbers_start.items():
    print(k, v)

for k, v in numbers_end.items():
    print(k, v)

print('Symbols')
for k, v in symbols.items():
    print(k, v)

gear_ratios = []
for k, v in symbols.items():
    #Left
    nums = []

    # Top
    if numbers_end.get((k[0]-1, k[1]-1), None) is not None:
        nums.append(numbers_end.get((k[0]-1, k[1]-1)))
    
    if numbers_end.get((k[0]-1, k[1]), None) is not None:
        nums.append(numbers_end.get((k[0]-1, k[1])))
    
    if numbers_end.get((k[0]-1, k[1]+1), None) is not None:
        nums.append(numbers_end.get((k[0]-1, k[1]+1)))

    if numbers_start.get((k[0]-1, k[1]-1), None) is not None:
        nums.append(numbers_start.get((k[0]-1, k[1]-1)))
    
    if numbers_start.get((k[0]-1, k[1]), None) is not None:
        nums.append(numbers_start.get((k[0]-1, k[1])))
    
    if numbers_start.get((k[0]-1, k[1]+1), None) is not None:
        nums.append(numbers_start.get((k[0]-1, k[1]+1)))

    # Left
    if numbers_end.get((k[0], k[1]-1), None) is not None:
        nums.append(numbers_end.get((k[0], k[1]-1)))
              
    #Right
    if numbers_start.get((k[0], k[1]+1), None) is not None:
        nums.append(numbers_start.get((k[0], k[1]+1)))

    # Bottom
    if numbers_end.get((k[0]+1, k[1]-1), None) is not None:
        nums.append(numbers_end.get((k[0]+1, k[1]-1)))
    
    if numbers_end.get((k[0]+1, k[1]), None) is not None:
        nums.append(numbers_end.get((k[0]+1, k[1])))
    
    if numbers_end.get((k[0]+1, k[1]+1), None) is not None:
        nums.append(numbers_end.get((k[0]+1, k[1]+1)))

    if numbers_start.get((k[0]+1, k[1]-1), None) is not None:
        nums.append(numbers_start.get((k[0]+1, k[1]-1)))
    
    if numbers_start.get((k[0]+1, k[1]), None) is not None:
        nums.append(numbers_start.get((k[0]+1, k[1])))
    
    if numbers_start.get((k[0]+1, k[1]+1), None) is not None:
        nums.append(numbers_start.get((k[0]+1, k[1]+1)))

    nums_set = set(nums)
    nums_set_list = list(nums_set)
    if len(nums_set_list) == 2:
        print(k, v, nums_set_list)
        gear_ratios.append(nums_set_list[0][1] * nums_set_list[1][1])

print(gear_ratios)
print(sum(gear_ratios))

# part_numbers = {}
# for k, v in numbers.items():

#     num_length = len(str(v))
#     x_range = range(k[1] - num_length, k[1] + 1 + 1)
#     # Above
#     for x in x_range:
#         if symbols.get((k[0]-1, x), None) is not None:
#             part_numbers.update({k: v})
#             break
#     # Below
#     for x in x_range:
#         if symbols.get((k[0]+1, x), None) is not None:
#             part_numbers.update({k: v})
#             break

#     # Left
#     if symbols.get((k[0], (k[1] - num_length)), None) is not None:
#         part_numbers.update({k: v})

#     # Right
#     if symbols.get((k[0], (k[1] + 1)), None) is not None:
#         part_numbers.update({k: v})


# for k, v in part_numbers.items():
#     print(k, v)
# print(len(part_numbers.items()))
# print(sum(part_numbers.values()))
