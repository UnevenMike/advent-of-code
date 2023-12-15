#####
f = open("input.txt", "r")
lines = f.read().split("\n")


cards = {}
for line in lines:
    s = line.split(": ")
    card_num = int(s[0].split(' ')[-1])
    nums = s[1].split(" | ")
    win_nums = [int(x) for x in nums[0].split(' ') if x]
    card_nums = [int(x) for x in nums[1].split(' ') if x]
    cards.update({ card_num: { 'win': win_nums, 'nums': card_nums, 'copies': 1} })


for k, v in cards.items():
    winning_nums = set(v['win'])
    card_nums = v['nums']
    copies = v['copies']
    count = 0
    for card_num in card_nums:
        if card_num in winning_nums:
            count += 1

    if count > 0:
        for i in range(k+1, k+1+count):
            current_item = cards[i]
            current_item['copies'] += copies

total = 0
for k,v in cards.items():
    total += v['copies']
print(total)