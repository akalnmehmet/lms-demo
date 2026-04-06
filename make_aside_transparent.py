import os
import glob
import re

workspace_dir = r"c:\Users\mehme\OneDrive\Desktop\lms-demo"
html_files = glob.glob(os.path.join(workspace_dir, '*.html'))

pattern = re.compile(
    r'html\.dark aside\s*\{\s*background-color:\s*#[0-9a-fA-F]+\s*!important;\s*border-color:\s*[^\}]+\s*\}',
    re.MULTILINE
)

replacement = """html.dark aside {
    background-color: transparent !important;
    border-color: rgba(255,255,255,0.05) !important;
}"""

count = 0
for file_path in html_files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    new_content, n = pattern.subn(replacement, content)
    
    if n > 0:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        count += 1
        print(f"Updated {os.path.basename(file_path)}")

print(f"Total files updated: {count}")
