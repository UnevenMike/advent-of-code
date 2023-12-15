#####
f = open("input.txt", "r")
lines = f.read().split("\n")

times = [ x for x in lines[0].split(' ') if x != ''][1:]
records = [x for x in lines[1].split(' ') if x != ''][1:]

realTime = int(''.join(times))
realRecord = int(''.join(records))

print(realTime, realRecord)


def calculate_distances(max_time, record):
    count = 0
    for i in range(0, max_time + 1):
        distance = i * (max_time - i)
        if distance > record:
            count += 1
    return count

val = calculate_distances(realTime, realRecord)
print(val)