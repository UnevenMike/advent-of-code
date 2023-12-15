#####
f = open("input.txt", "r")
lines = f.read().split("\n")

# Part 1
# def getNum(line: str):
#     numChars = [ c for c in line if c.isdigit() ]
#     number = int(numChars[0] + numChars[-1])
#     return number

# nums = [ getNum(l) for l in lines]

# answer = sum(nums)

# print(answer)


# Part 2

def getNum(line: str):
    digits = []
    for i in range(len(line)):
        if line[i].isdigit():
            digits.append(line[i])
        elif line[i:i+3] == "one":
            digits.append(1)
        elif line[i:i+3] == "two":
            digits.append(2)
        elif line[i:i+5] == "three":
            digits.append(3)
        elif line[i:i+4] == "four":
            digits.append(4)
        elif line[i:i+4] == "five":
            digits.append(5)
        elif line[i:i+3] == "six":
            digits.append(6)
        elif line[i:i+5] == "seven":
            digits.append(7)
        elif line[i:i+5] == "eight":
            digits.append(8)
        elif line[i:i+4] == "nine":
            digits.append(9)

    number = int(str(digits[0]) + str(digits[-1]))
    return number


nums = [getNum(l) for l in lines]
answer = sum(nums)
print(answer)
