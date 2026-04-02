import os
import glob
import re

workspace_dir = r"c:\Users\mehme\OneDrive\Desktop\lms-demo"
html_files = glob.glob(os.path.join(workspace_dir, '*.html'))

admin_js = """
<!-- ROLE BASED UI SCRIPT INJECTED -->
<script>
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('userRole') === 'admin') {
        // Hide specific buttons in nav for admins
        const adminLinksToHide = ['contact', 'support', 'progress'];
        document.querySelectorAll('nav a, header a').forEach(a => {
            const text = a.textContent.toLowerCase().trim();
            const hasMatch = adminLinksToHide.some(t => text.includes(t));
            if (hasMatch) {
                a.style.display = 'none';
            }
        });
        
        // Redirect any dashboard link to admin_dashboard.html
        document.querySelectorAll('a').forEach(a => {
            const href = a.getAttribute('href');
            if (href && (href.includes('dashboard_skill_school_elite.html') || href.includes('learner_dashboard.html'))) {
                a.href = 'admin_dashboard.html';
            }
        });
    }
});
</script>
<!-- END ROLE BASED UI SCRIPT -->
"""

for file_path in html_files:
    if os.path.basename(file_path) == "index.html":
        continue
        
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Remove previous if exists
    content = re.sub(r'<!-- ROLE BASED UI SCRIPT INJECTED -->.*?<!-- END ROLE BASED UI SCRIPT -->', '', content, flags=re.DOTALL)

    # Insert right before </body>
    if '</body>' in content:
        new_content = content.replace('</body>', admin_js + '\n</body>')
        
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
print("Role based scripts injected into all HTML files successfully.")
