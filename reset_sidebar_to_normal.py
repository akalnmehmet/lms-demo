import os
import glob
import re

workspace_dir = r"c:\Users\mehme\OneDrive\Desktop\lms-demo"
html_files = glob.glob(os.path.join(workspace_dir, '*.html'))

# We will remove the previous custom dark side-link blocks completely
# and replace them with the standard clean ones.

pattern1 = re.compile(
    r'html\.dark \.side-link\.active,\s*html\.dark a\.side-link\.active\s*\{.*?\}\s*html\.dark \.side-link:hover\s*\{.*?\}',
    re.MULTILINE | re.DOTALL
)

replacement1 = """html.dark .side-link.active,
html.dark a.side-link.active {
    background-color: #1e293b !important;
    color: #93c5fd !important;
    box-shadow: 0 2px 12px rgba(0,0,0,0.3) !important;
}
html.dark .side-link:hover {
    background-color: #334155 !important;
    color: #f1f5f9 !important;
}"""

# We must also fix aside background behavior! 
# We previously set it to transparent. Let's revert aside to #1e293b matching bg-white.
pattern2 = re.compile(
    r'html\.dark aside\s*\{.*?\}',
    re.MULTILINE | re.DOTALL
)
replacement2 = """html.dark aside {
    background-color: #1e293b !important;
    border-color: #334155 !important;
}"""

# Re-check for any missed inline side-links:
pattern3 = re.compile(
    r'html\.dark \.side-link\.active\s*\{\s*background:\s*linear-gradient.*?\s*\}', 
    re.MULTILINE | re.DOTALL
)

count = 0
for file_path in html_files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    new_content, n1 = pattern1.subn(replacement1, content)
    new_content, n2 = pattern2.subn(replacement2, new_content)
    new_content, n3 = pattern3.subn(
        r'html.dark .side-link.active { background-color: #1e293b !important; color: #93c5fd !important; box-shadow: 0 2px 12px rgba(0,0,0,0.3) !important; }',
        new_content
    )
    
    if n1 > 0 or n2 > 0 or n3 > 0:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        count += 1
        print(f"Updated {os.path.basename(file_path)}")

print(f"Total files updated: {count}")
