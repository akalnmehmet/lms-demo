import os
import glob
import re

workspace_dir = r"c:\Users\mehme\OneDrive\Desktop\lms-demo"
html_files = glob.glob(os.path.join(workspace_dir, '*.html'))

pattern1 = re.compile(
    r'html\.dark aside\s*\{\s*background-color:\s*#[0-9a-fA-F]+\s*!important;\s*border-color:\s*#[0-9a-fA-F]+\s*!important;\s*\}',
    re.MULTILINE
)

replacement1 = """html.dark aside {
    background-color: transparent !important;
    border-color: rgba(255,255,255,0.05) !important;
}"""

count = 0
for file_path in html_files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    new_content, n = pattern1.subn(replacement1, content)
    
    # Also fix any inline admin dashboard css that I missed!
    pattern2 = re.compile(r'html\.dark \.side-link\.active\s*\{\s*background:\s*#1e3a5f;\s*color:\s*#e2e8f0;\s*\}')
    new_content, n2 = pattern2.subn(
        r'html.dark .side-link.active { background: linear-gradient(135deg, rgba(71, 104, 154, 0.25) 0%, rgba(31, 52, 86, 0.5) 100%) !important; border: 1px solid rgba(71, 104, 154, 0.3) !important; color: #f1f5f9 !important; border-radius: 9999px !important; box-shadow: 0 4px 20px -5px rgba(31,52,86, 0.5), inset 0 1px 0 rgba(255,255,255,0.05) !important; padding-left: 20px !important; }',
        new_content
    )
    
    if n > 0 or n2 > 0:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        count += 1
        print(f"Updated {os.path.basename(file_path)}")

print(f"Total files updated: {count}")
