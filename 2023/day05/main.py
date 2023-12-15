#####
f = open("input.txt", "r")
lines = f.read().split("\n\n")

seed_list = [int(x) for x in lines[0].split(' ')[1:]] 
seed_ranges = []
for i in range(0, len(seed_list), 2):
    seed_ranges.append({ 'start': seed_list[i], 'range': seed_list[i+1]})


def find_in_map(map, input):
    for entry in map:
        if input >= entry['src'] and input < (entry['src'] + entry['range']):
            return input - entry['src'] + entry['dst']
    return input

maps = {}
for map in lines[1:]:
    map_lines = map.split("\n")
    map_title = map_lines[0].split(" ")[0]
    src_name = map_title.split("-to-")[0]
    dst_name = map_title.split("-to-")[1]

    entries = []
    for entry in map_lines[1:]:
        vals = [int(x) for x in entry.split(" ")]
        entries.append({ 'dst': vals[0], 'src': vals[1], 'range': vals[2]})

    maps.update({ src_name: { 'source_name': src_name, 'dst_name': dst_name, 'map': entries} })


min_location = None
for seed_range in seed_ranges:
    for i in range(seed_range['start'], seed_range['start'] + seed_range['range']):
        current_map = 'seed'
        current_val = i
        # print(current_map, current_val)
        while current_map != 'location':
            current_val = find_in_map(maps[current_map]['map'], current_val)
            current_map = maps[current_map]['dst_name']
            # print(current_map, current_val)

        if min_location is None:
            min_location = current_val
        elif current_val < min_location:
            min_location = current_val
        # print('')

print(min_location)