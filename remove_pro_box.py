import os
import glob
import re

workspace_dir = r"c:\Users\mehme\OneDrive\Desktop\lms-demo"
html_files = glob.glob(os.path.join(workspace_dir, '*.html'))

pattern = re.compile(
    r'<div\s+class="bg-blue-50[^>]*>.*?<p[^>]*>Pro\s*Plan</p>.*?<a[^>]*>Upgrade\s*to\s*Pro</a>\s*</div>',
    re.IGNORECASE | re.DOTALL
)

count = 0
for file_path in html_files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    new_content, num_subs = pattern.subn('', content)
    
    if num_subs > 0:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        count += 1
        print(f"Removed from {os.path.basename(file_path)}")

print(f"Total files updated: {count}")
