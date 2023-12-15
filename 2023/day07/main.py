#####
import functools


f = open("input.txt", "r")
lines = f.read().split("\n")

data = []
for line in lines:
    ls = line.split(' ')
    hand = ls[0]
    bid = ls[1]
    data.append({ "hand": hand, "bid": int(bid)})

hand_types = {
    'H': [],
    '1': [],
    '2': [],
    '3': [],
    'F': [],
    '4': [],
    '5': []
}

cards = ['J', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'Q', 'K', 'A']

for entry in data:
    isDone = False

    if not isDone:
        for c in cards[1:]:
            if (entry['hand'].count(c) + entry['hand'].count('J'))== 5:
                hand_types['5'].append(entry)
                isDone = True
                break

    if not isDone:
        for c in cards[1:]:
            if (entry['hand'].count(c) + entry['hand'].count('J')) == 4:
                hand_types['4'].append(entry)
                isDone = True
                break

    if not isDone:
        for c in cards[1:]:
            if (entry['hand'].count(c) + entry['hand'].count('J')) == 3:
                for c2 in cards[1:]:
                    if not isDone and entry['hand'].count(c2) == 2 and c != c2:
                        hand_types['F'].append(entry)
                        isDone = True
                        break
                
                if not isDone:
                    hand_types['3'].append(entry)
                    isDone = True
                    break
    
    if not isDone:
        for c in cards[1:]:
            if (entry['hand'].count(c) + entry['hand'].count('J'))== 2:
                for c2 in cards[1:]:
                    if not isDone and entry['hand'].count(c2) == 2 and c != c2:
                        hand_types['2'].append(entry)
                        isDone = True
                        break
                
                if not isDone:
                    hand_types['1'].append(entry)
                    isDone = True
                    break

    if not isDone:
        hand_types['H'].append(entry)
        isDone = True


def compare(entry1, entry2):
    for i in range(5):
        v1 = cards.index(entry1['hand'][i])
        v2 = cards.index(entry2['hand'][i])
        if v1 > v2:
            return 1
        elif v1 < v2:
            return -1
    return 0


rank = 1
value = 0
for (k, v) in hand_types.items():
    v.sort(key=functools.cmp_to_key(compare))

    for item in v:
        value += rank * item['bid']
        rank += 1
    print(k, v)

print(value)

