import re
import os

workspace_dir = r"c:\Users\mehme\OneDrive\Desktop\lms-demo"
index_file = os.path.join(workspace_dir, 'index.html')

with open(index_file, 'r', encoding='utf-8') as f:
    content = f.read()

# Make sure password input has id="password-input"
# Originally it was: <input type="password" value="12345678" placeholder="••••••••" class="w-full ...
content = re.sub(r'(<input type="password")(?![^>]*id="password-input")', r'\1 id="password-input"', content)

# Change onsubmit of the form
form_pattern = r'<form onsubmit="event\.preventDefault\(\); window\.location\.href=\'[^\']+\';" class="space-y-6">'
content = re.sub(form_pattern, '<form onsubmit="handleLogin(event)" class="space-y-6">', content)

# Update switchTab function and append handleLogin
js_replacement = """
  window.switchTab = function(tab) {
    const btnAdmin = document.getElementById('btn-admin');
    const btnStudent = document.getElementById('btn-student');
    const emailInput = document.getElementById('email-input');
    const passwordInput = document.getElementById('password-input');
    
    // Active states
    const activeClasses = ['bg-white', 'dark:bg-slate-700', 'shadow-[0_2px_12px_rgba(0,0,0,0.06)]', 'text-slate-900', 'dark:text-white', 'scale-[1.02]'];
    const inactiveClasses = ['text-slate-500', 'dark:text-slate-400', 'hover:text-slate-700', 'dark:hover:text-slate-200'];
    
    if (tab === 'admin') {
       btnAdmin.classList.add(...activeClasses);
       btnAdmin.classList.remove(...inactiveClasses);
       btnStudent.classList.add(...inactiveClasses);
       btnStudent.classList.remove(...activeClasses);
       emailInput.value = "admin@company.com";
       passwordInput.value = "admin123";
    } else {
       btnStudent.classList.add(...activeClasses);
       btnStudent.classList.remove(...inactiveClasses);
       btnAdmin.classList.add(...inactiveClasses);
       btnAdmin.classList.remove(...activeClasses);
       emailInput.value = "demo@student.com";
       passwordInput.value = "student123";
    }
  }

  window.handleLogin = function(event) {
      event.preventDefault();
      const email = document.getElementById('email-input').value;
      const pw = document.getElementById('password-input').value;

      if (email === 'admin@company.com' && pw === 'admin123') {
          localStorage.setItem('userRole', 'admin');
          window.location.href = 'admin_dashboard.html';
      } else if (email === 'demo@student.com' && pw === 'student123') {
          localStorage.setItem('userRole', 'student');
          window.location.href = 'landing.html';
      } else {
          alert('Incorrect email or password. Use demo@student.com / student123 or admin@company.com / admin123');
      }
  }
"""

content = re.sub(r'window\.switchTab = function\(tab\) \{.*?(?=const tBtn = document\.getElementById)', js_replacement, content, flags=re.DOTALL)

with open(index_file, 'w', encoding='utf-8') as f:
    f.write(content)
print("index.html updated successfully!")
