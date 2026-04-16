const searchData = [
  { name: 'iPhone 16 Pro Max', brand: 'Apple', price: 'RD$ 89,999', link: 'iphone.html', img: 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=100&q=80', status: 'NUEVO' },
  { name: 'iPhone 15', brand: 'Apple', price: 'RD$ 57,999', link: 'iphone.html', img: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=100&q=80', status: 'OFERTA' },
  { name: 'Galaxy S25 Ultra', brand: 'Samsung', price: 'RD$ 94,500', link: 'samsung.html', img: 'https://images.unsplash.com/photo-1610945264803-c22b62d2a7b3?w=100&q=80', status: 'NUEVO' },
  { name: 'Galaxy A55 5G', brand: 'Samsung', price: 'RD$ 27,500', link: 'samsung.html', img: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=100&q=80', status: 'OFERTA' },
  { name: 'Xiaomi 14 Ultra', brand: 'Xiaomi', price: 'RD$ 72,000', link: 'xiaomi.html', img: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=100&q=80', status: 'NUEVO' },
  { name: 'AirPods Pro 2', brand: 'Apple', price: 'RD$ 13,900', link: 'accesorios.html', img: 'https://images.unsplash.com/photo-1588423771073-b8903fead85b?w=100&q=80', status: 'NUEVO' },
  { name: 'iPad Air M2', brand: 'Apple', price: 'RD$ 52,000', link: 'ipad.html', img: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=100&q=80', status: 'NUEVO' },
  { name: 'Galaxy Watch 7', brand: 'Samsung', price: 'RD$ 21,000', link: 'accesorios.html', img: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=100&q=80', status: 'NUEVO' },
  { name: 'Motorola Edge 40', brand: 'Motorola', price: 'RD$ 32,000', link: 'motorola.html', img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=100&q=80', status: 'NUEVO' }
];

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('modern-search-input');
  const searchDropdown = document.getElementById('search-dropdown');
  
  if(!searchInput || !searchDropdown) return;

  // Render results
  const renderResults = (results) => {
    searchDropdown.innerHTML = '';
    
    if (results.length === 0) {
      searchDropdown.innerHTML = '<div style="padding:16px;text-align:center;color:#9E9E9E;font-size:0.85rem">No se encontraron resultados</div>';
      return;
    }

    results.forEach(item => {
      const resultEl = document.createElement('a');
      resultEl.href = item.link;
      resultEl.style.cssText = 'display:flex;align-items:center;gap:12px;padding:12px;text-decoration:none;border-bottom:1px solid #1E1E1E;transition:background 0.2s';
      
      // Hover effect
      resultEl.addEventListener('mouseenter', () => resultEl.style.background = 'rgba(76,175,80,0.1)');
      resultEl.addEventListener('mouseleave', () => resultEl.style.background = 'transparent');
      
      const statusColor = item.status === 'OFERTA' ? '#E53935' : '#4CAF50';
      const statusText = item.status === 'OFERTA' ? 'OFERTA' : 'NUEVO';

      resultEl.innerHTML = `
        <img src="${item.img}" style="width:40px;height:40px;border-radius:6px;object-fit:cover;border:1px solid #2C2C2C;background:#000" alt="${item.name}">
        <div style="flex:1">
          <div style="color:#E8E8E8;font-size:0.85rem;font-weight:600;margin-bottom:2px">${item.name}</div>
          <div style="color:#9E9E9E;font-size:0.75rem">${item.brand}</div>
        </div>
        <div style="text-align:right">
          <div style="color:#E8E8E8;font-size:0.85rem;font-family:\\'Barlow Condensed\\',sans-serif;font-weight:700">${item.price}</div>
          <div style="color:${statusColor};font-size:0.65rem;font-weight:700;letter-spacing:0.05em">${statusText}</div>
        </div>
      `;
      searchDropdown.appendChild(resultEl);
    });
  };

  // Handle Input logic
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.trim().toLowerCase();
    
    if (query.length > 0) {
      // Show dropdown with animation
      searchDropdown.style.display = 'flex';
      setTimeout(() => {
        searchDropdown.style.opacity = '1';
        searchDropdown.style.transform = 'translateY(0)';
      }, 10);
      
      // Highlight Border
      searchInput.style.borderColor = '#4CAF50';
      
      // Filter Logic
      const filtered = searchData.filter(item => 
        item.name.toLowerCase().includes(query) || 
        item.brand.toLowerCase().includes(query)
      );
      renderResults(filtered);
    } else {
      hideDropdown();
    }
  });

  const hideDropdown = () => {
      searchDropdown.style.opacity = '0';
      searchDropdown.style.transform = 'translateY(-10px)';
      searchInput.style.borderColor = '#2C2C2C';
      setTimeout(() => {
        searchDropdown.style.display = 'none';
      }, 200);
  };

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('#search-container')) {
      hideDropdown();
    }
  });
  
  // Close when pressing Escape key
  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape') {
      hideDropdown();
    }
  });
  
  // --- INVENTORY TABLE FILTER LOGIC ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const tableRows = document.querySelectorAll('.inv-table tbody tr');

  if (filterBtns.length > 0 && tableRows.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Reset ALL opacity to 0.6 and remove border
        filterBtns.forEach(b => {
          b.style.opacity = '0.6';
          b.style.border = 'none';
        });
        // Set clicked to active
        btn.style.opacity = '1';
        btn.style.border = '1px solid #4CAF50';

        const filter = btn.getAttribute('data-filter').toLowerCase();

        tableRows.forEach(row => {
          const statusSpan = row.querySelector('td:nth-child(3) span');
          if (!statusSpan) return;
          
          const status = statusSpan.textContent.trim().toLowerCase();
          
          if (filter === 'all' || status === filter) {
            row.style.display = '';
          } else {
            row.style.display = 'none';
          }
        });
      });
    });
  }
});
