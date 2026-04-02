import os
import glob
import re

workspace_dir = r"c:\Users\mehme\OneDrive\Desktop\lms-demo"
html_files = glob.glob(os.path.join(workspace_dir, '*.html'))

for file_path in html_files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    original_content = content
    
    # Remove Sign In button
    content = re.sub(r'<a\s+[^>]*>Sign In</a>', '', content, flags=re.IGNORECASE)
    
    # Remove Get Started button in navbar context
    # Be careful not to remove "Get Started" from headers or main content if it's there.
    # The prompt explicitly said "nav bardaki sign in ve get started butonlarını":
    # Let's locate the <nav> element first to be safe, then remove it inside <nav>.
    
    def process_nav(match):
        nav_content = match.group(0)
        nav_content = re.sub(r'<a\s+[^>]*>\s*Sign In\s*</a>', '', nav_content, flags=re.IGNORECASE)
        nav_content = re.sub(r'<a\s+[^>]*>\s*Get Started\s*</a>', '', nav_content, flags=re.IGNORECASE)
        # Handle cases where the text might have a span inside? Usually just "Get Started"
        return nav_content

    # Sub <nav> ... </nav> block
    new_content = re.sub(r'<nav.*?</nav>', process_nav, content, flags=re.IGNORECASE | re.DOTALL)
    
    if new_content != original_content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Removed nav buttons from: {os.path.basename(file_path)}")

print("Done removing Sign In and Get Started from navbars.")
