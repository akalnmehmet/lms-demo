import os
import glob
import re

workspace_dir = r"c:\Users\mehme\OneDrive\Desktop\lms-demo"
file_pattern = os.path.join(workspace_dir, 'course_*.html')

for file_path in glob.glob(file_pattern):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # The block looks like this:
    # <a href="course_player.html?course=..." class="cta-btn kinetic-gradient ...">...Start Course Now</a>
    # <button class="w-full ...">...Add to Wishlist</button>
    
    # We will use regex to find and replace both buttons at once.
    
    replacement = """<a href="admin_upload_course.html" class="cta-btn kinetic-gradient text-white w-full py-4 rounded-xl text-sm font-black uppercase tracking-widest shadow-lg flex items-center justify-center gap-2 block text-center"><span class="material-symbols-outlined text-[20px]" style="font-variation-settings:'FILL' 1">edit_square</span>Edit Course</a>
          <a href="admin_courses.html" class="w-full py-3 border-2 border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:border-orange-300 hover:text-blue-600 transition-colors flex items-center justify-center gap-2" style="text-decoration:none;"><span class="material-symbols-outlined text-[18px]">query_stats</span>Course Statistics</a>"""

    # Regex target 1 (Start Course Now)
    content = re.sub(
        r'<a href="course_player[^>]*>.*?Start Course Now</a>',
        """<a href="admin_upload_course.html" class="cta-btn kinetic-gradient text-white w-full py-4 rounded-xl text-sm font-black uppercase tracking-widest shadow-lg flex items-center justify-center gap-2 block text-center"><span class="material-symbols-outlined text-[20px]" style="font-variation-settings:'FILL' 1">edit_square</span>Edit Course</a>""",
        content,
        flags=re.IGNORECASE | re.DOTALL
    )

    # Regex target 2 (Add to Wishlist button)
    content = re.sub(
        r'<button[^>]*>.*?Add to Wishlist</button>',
        """<a href="admin_courses.html" class="w-full py-3 border-2 border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:border-orange-300 hover:text-blue-600 transition-colors flex items-center justify-center gap-2" style="text-decoration:none;"><span class="material-symbols-outlined text-[18px]">query_stats</span>Course Statistics</a>""",
        content,
        flags=re.IGNORECASE | re.DOTALL
    )

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

print("Updated buttons in all course detail files.")
