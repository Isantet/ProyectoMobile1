import os
import re

files_to_update = ['index.html', 'iphone.html', 'samsung.html', 'xiaomi.html', 'ipad.html', 'accesorios.html']

new_header_logo = """    <a href="index.html" class="flex-shrink-0" style="text-decoration:none">
      <span style="font-family:'Barlow Condensed',sans-serif;font-weight:900;font-size:1.8rem;color:#E8E8E8;letter-spacing:1px;display:flex;align-items:center;line-height:1">HULK<span style="color:#4CAF50;margin-left:4px">CELL</span></span>
    </a>"""

new_footer = """<footer id="contacto">
  <div class="glow-line"></div>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 py-12">
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
      <div>
        <a href="index.html" style="text-decoration:none">
          <span style="font-family:'Barlow Condensed',sans-serif;font-weight:900;font-size:2.2rem;color:#E8E8E8;letter-spacing:1px;display:inline-block;margin-bottom:12px;line-height:1">HULK <span style="color:#4CAF50">CELL</span></span>
        </a>
        <p style="color:#555;font-size:.85rem;line-height:1.6;margin-bottom:16px">Tu tienda de tecnología de confianza. Garantía oficial, envíos a todo el país.</p>
        <div class="flex gap-2">
          <a href="https://instagram.com/hulkcell" class="si" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
          <a href="https://facebook.com/hulkcell" class="si" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
          <a href="https://tiktok.com/@hulkcell" class="si" aria-label="TikTok"><i class="fab fa-tiktok"></i></a>
          <a href="https://wa.me/18095550000" class="si" aria-label="WhatsApp"><i class="fab fa-whatsapp"></i></a>
        </div>
      </div>
      <div>
        <h5 style="color:#E8E8E8;font-size:.85rem;font-weight:600;text-transform:uppercase;letter-spacing:.08em;margin-bottom:16px">Productos</h5>
        <ul style="list-style:none;display:flex;flex-direction:column;gap:10px">
          <li><a href="iphone.html" class="fl" style="font-size:.85rem">iPhone</a></li>
          <li><a href="samsung.html" class="fl" style="font-size:.85rem">Samsung</a></li>
          <li><a href="xiaomi.html" class="fl" style="font-size:.85rem">Xiaomi</a></li>
          <li><a href="ipad.html" class="fl" style="font-size:.85rem">iPad</a></li>
          <li><a href="accesorios.html" class="fl" style="font-size:.85rem">Accesorios</a></li>
        </ul>
      </div>
      <div>
        <h5 style="color:#E8E8E8;font-size:.85rem;font-weight:600;text-transform:uppercase;letter-spacing:.08em;margin-bottom:16px">Contacto</h5>
        <ul style="list-style:none;display:flex;flex-direction:column;gap:12px">
          <li style="display:flex;align-items:flex-start;gap:10px"><i class="fas fa-map-marker-alt" style="color:#4CAF50;margin-top:3px;font-size:.8rem"></i><span style="color:#555;font-size:.85rem">C/ Duarte 123, Santo Domingo, RD</span></li>
          <li style="display:flex;align-items:center;gap:10px"><i class="fas fa-phone" style="color:#4CAF50;font-size:.8rem"></i><a href="tel:+18095550000" class="fl" style="font-size:.85rem">+1 (809) 555-0000</a></li>
          <li style="display:flex;align-items:center;gap:10px"><i class="fab fa-whatsapp" style="color:#25D366;font-size:.8rem"></i><a href="https://wa.me/18095550000" class="fl" style="font-size:.85rem">WhatsApp directo</a></li>
          <li style="display:flex;align-items:center;gap:10px"><i class="fas fa-clock" style="color:#4CAF50;font-size:.8rem"></i><span style="color:#555;font-size:.85rem">Lun–Sáb: 9am–7pm</span></li>
        </ul>
      </div>
    </div>
    <div style="border-top:1px solid #1A1A1A;margin-top:40px;padding-top:20px;text-align:center">
      <p style="color:#444;font-size:.75rem">© 2025 HULK CELL Technology. Todos los derechos reservados.</p>
    </div>
  </div>
</footer>"""

for fname in files_to_update:
    path = os.path.join(r"C:\Users\isaac\.gemini\antigravity\scratch", fname)
    if not os.path.exists(path):
        continue
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace header logo
    # Regex to find <a href="index.html" class="flex-shrink-0"><img ... /></a>
    content = re.sub(r'    <a href="index\.html" class="flex-shrink-0"><img.*?/></a>', new_header_logo, content, count=1, flags=re.DOTALL)

    # Replace footer in all files EXCEPT index.html (already done there)
    if fname != 'index.html':
        content = re.sub(r'<footer id="contacto">.*</footer>', new_footer, content, flags=re.DOTALL)

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Updated {fname}")
