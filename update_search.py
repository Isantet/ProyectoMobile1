import os
import glob

old_block = """    <div class="hidden md:flex flex-1 max-w-xs" style="position:relative">
      <i class="fas fa-search" style="position:absolute;left:12px;top:50%;transform:translateY(-50%);color:#555;font-size:.8rem;pointer-events:none"></i>
      <input type="text" placeholder="Buscar modelo…" style="background:#1A1A1A;border:1px solid #2C2C2C;border-radius:999px;color:#E8E8E8;padding:8px 16px 8px 34px;font-size:.82rem;width:100%;outline:none"/>
    </div>"""

new_block = """    <div class="hidden md:flex flex-1 max-w-xs" style="position:relative" id="search-container">
      <i class="fas fa-search" style="position:absolute;left:12px;top:50%;transform:translateY(-50%);color:#555;font-size:.8rem;pointer-events:none"></i>
      <input type="text" id="modern-search-input" placeholder="Buscar modelo…" autocomplete="off" style="background:#1A1A1A;border:1px solid #2C2C2C;border-radius:999px;color:#E8E8E8;padding:8px 16px 8px 34px;font-size:.82rem;width:100%;outline:none;transition:border-color 0.2s"/>
      <div id="search-dropdown" style="position:absolute;top:calc(100% + 8px);left:0;right:0;background:#111;border:1px solid #4CAF50;border-radius:12px;box-shadow:0 8px 32px rgba(0,0,0,0.8);max-height:350px;overflow-y:auto;z-index:1000;display:none;flex-direction:column;opacity:0;transform:translateY(-10px);transition:opacity 0.2s, transform 0.2s;scrollbar-width:thin;scrollbar-color:#4CAF50 #111;">
      </div>
    </div>"""

script_tag = '<script src="search.js"></script>\n</body>'

files = glob.glob("*.html")
modified_files = []

for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    modified = False
    
    # Replace search bar component
    if old_block in content:
        content = content.replace(old_block, new_block)
        modified = True
    
    # Check if exact block wasn't found but input exists, we might need to be less strict
    
    # Add JS script
    if '<script src="search.js"></script>' not in content and '</body>' in content:
        content = content.replace('</body>', script_tag)
        modified = True
        
    if modified:
        with open(f, 'w', encoding='utf-8') as file:
            file.write(content)
        modified_files.append(f)

print(f"Updated {len(modified_files)} files: {', '.join(modified_files)}")
