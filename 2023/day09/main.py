#####
f = open("input.txt", "r")
lines = f.read().split("\n")

readings = []
for line in lines:
    readings.append([int(x) for x in line.split(' ')])


def isAllZeros(lst):
    for item in lst:
        if item != 0:
            return False
    return True

predictions = []
for seq in readings:
    differences = []
    current_diffs = list.copy(seq)
    while not isAllZeros(current_diffs):
        next_diffs = []
        differences.append(current_diffs)
        for i in range(1, len(current_diffs)):
            next_diffs.append(current_diffs[i] - current_diffs[i-1])
        current_diffs = next_diffs
    differences.append(current_diffs)
                       

    list.reverse(differences)                
    pred = 0
    for d in differences:
        pred = d[0] - pred
    predictions.append(pred)

print(predictions)
print(sum(predictions))