content = open(r'C:\Users\PC\Documents\GitHub\DuNSI\app.js', encoding='utf-8').read()
lines = content.split('\n')
print(f'Total lines: {len(lines)}')

# Find all backtick positions in lines 716-1060 (TPS data block)
# and show what kind of backtick it is (opening code: or closing ,)
for i in range(715, 1060):
    line = lines[i]
    bt_count = line.count('`')
    if bt_count > 0:
        print(f'  L{i+1} ({bt_count} bt): {repr(line[:100])}')
