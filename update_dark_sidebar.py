import os
import glob
import re

workspace_dir = r"c:\Users\mehme\OneDrive\Desktop\lms-demo"
html_files = glob.glob(os.path.join(workspace_dir, '*.html'))

# We want to replace the block:
# html.dark .side-link.active,
# html.dark a.side-link.active {
#     background-color: #1e3a5f !important;
#     color: #e2e8f0 !important;
# }
# html.dark .side-link:hover {
#     background-color: #1e293b !important;
#     color: #f1f5f9 !important;
# }

replacement = """html.dark .side-link.active,
html.dark a.side-link.active {
    background: linear-gradient(135deg, rgba(71, 104, 154, 0.25) 0%, rgba(31, 52, 86, 0.5) 100%) !important;
    border: 1px solid rgba(71, 104, 154, 0.3) !important;
    color: #f1f5f9 !important;
    border-radius: 9999px !important;
    box-shadow: 0 4px 20px -5px rgba(31,52,86, 0.5), inset 0 1px 0 rgba(255,255,255,0.05) !important;
    padding-left: 20px !important;
}
html.dark .side-link:hover {
    background: rgba(30, 41, 59, 0.7) !important;
    color: #f1f5f9 !important;
    border-radius: 9999px !important;
}"""

pattern = re.compile(
    r'html\.dark \.side-link\.active,\s*html\.dark a\.side-link\.active\s*\{[^}]+\}\s*html\.dark \.side-link:hover\s*\{[^}]+\}',
    re.MULTILINE
)

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
