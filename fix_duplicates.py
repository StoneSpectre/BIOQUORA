import re

with open('src/data/pathwaysData.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# We need to find the blocks for "copd": {, "glaucoma": {, and "cataract": {
# and remove their SECOND occurrence.

for key in ["copd", "glaucoma", "cataract"]:
    pattern = re.compile(r'^\s*"' + key + r'": \{.*?(?=\n\s*"[a-zA-Z0-9_-]+": \{|\n\};)', re.MULTILINE | re.DOTALL)
    matches = list(pattern.finditer(content))
    if len(matches) > 1:
        # Keep the first, remove the others
        for match in matches[1:]:
            # replace the match with empty string
            content = content[:match.start()] + content[match.end():]

# Clean up any trailing commas before }
content = re.sub(r',\s*\}', '\n}', content)
# Clean up multiple blank lines
content = re.sub(r'\n{3,}', '\n\n', content)

with open('src/data/pathwaysData.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("Duplicates removed.")
