import json
from pathlib import Path
from zephyrus_sc2_parser import parse_replay

replays = Path('replays')
total_files = 0
non_files = 0
for f in replays.iterdir():
    if f.is_file():
        total_files += 1
    else:
        non_files += 1

print(f'{total_files} files, {non_files} other')

replay_data = []
exceptions = []
for count, replay in enumerate(replays.iterdir()):
    print(f'At {count + 1}/{total_files + non_files} object in directory')
    if replay.is_file():
        print(f'Found file: {replay.name}')
        try:
            players, timeline, engagements, summary, meta = parse_replay(replay.resolve(), local=True)
            replay_data.append([
                players[1],
                players[2],
                {
                    'name': players[meta['winner']].name,
                    'race': players[meta['winner']].race,
                },
            ])
            print('Successfully parsed replay file\n')
        except Exception as e:
            exceptions.append(e)
            print(f'An error occured during parsing: {e}\n')
    else:
        print('Skipped non-file object\n')


print(len(replay_data))

serialized_data = []
for p1, p2, winner in replay_data:
    races = sorted([p1.race[0], p2.race[0]])
    matchup = 'v'.join(races)

    def clean_name(name):
        if 'lllllllllll' in name:
            return 'sOs'
        else:
            return name.split('>')[::-1][0]

    winner['name'] = clean_name(winner['name'])

    players = {}
    for p in [p1, p2]:
        players[(clean_name(p.name))] = p.race

    serialized_data.append({
        'matchup': matchup,
        'players': players,
        'winner': winner,
    })

with open('wctl_matches.json', 'w', encoding='utf-8') as wctl_data:
    json.dump({'data': serialized_data}, wctl_data, indent=4, ensure_ascii=True)

for e in exceptions:
    print(e)
