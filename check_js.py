import sys

content = open(r'C:\Users\PC\Documents\GitHub\DuNSI\app.js', encoding='utf-8').read()
lines = content.split('\n')

# Simple state machine to find unescaped ${ inside template literals
state = 'normal'
depth = 0
issues = []
i = 0
while i < len(content):
    c = content[i]
    if state == 'normal':
        if c == '`':
            state = 'template'
            depth = 0
        elif c == "'":
            state = 'sq'
        elif c == '"':
            state = 'dq'
        elif c == '/' and i+1 < len(content) and content[i+1] == '/':
            while i < len(content) and content[i] != '\n':
                i += 1
            i -= 1
    elif state == 'sq':
        if c == '\\':
            i += 1
        elif c == "'":
            state = 'normal'
    elif state == 'dq':
        if c == '\\':
            i += 1
        elif c == '"':
            state = 'normal'
    elif state == 'template':
        if c == '\\':
            i += 1  # skip next char (handles \` and \${)
        elif c == '`':
            if depth == 0:
                state = 'normal'
            else:
                depth -= 1
        elif c == '$' and i+1 < len(content) and content[i+1] == '{':
            line_num = content[:i].count('\n') + 1
            snippet = content[max(0,i-30):i+40].replace('\n','\\n')
            issues.append(f'  Line {line_num}: ...{snippet}...')
            depth += 1
            i += 1  # skip {
    i += 1

print(f'Final parser state: {state} (should be "normal")')
print(f'Unescaped ${{ inside template literals: {len(issues)}')
for iss in issues:
    print(iss)
