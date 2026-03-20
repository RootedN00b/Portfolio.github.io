/* ── RootedN00b Portfolio — Shared Script ── */
document.addEventListener('DOMContentLoaded', () => {

  // ── Custom Cursor ──
  const cur = document.getElementById('cursor');
  const crg = document.getElementById('cursor-ring');
  if (cur && crg) {
    document.addEventListener('mousemove', e => {
      cur.style.left  = e.clientX + 'px';
      cur.style.top   = e.clientY + 'px';
      setTimeout(() => {
        crg.style.left = e.clientX + 'px';
        crg.style.top  = e.clientY + 'px';
      }, 90);
    });
  }

  // ── Matrix Rain ──
  const canvas = document.getElementById('matrix-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    function resizeCanvas() {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    const chars = '01ABCDEFアイウエオカキ<>{}[]/\\';
    let drops = Array(Math.floor(window.innerWidth / 18)).fill(1);
    setInterval(() => {
      ctx.fillStyle = 'rgba(5,10,14,.06)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#00e5ff';
      ctx.font = '11px Share Tech Mono';
      drops.forEach((y, i) => {
        ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * 18, y * 18);
        if (y * 18 > canvas.height && Math.random() > .975) drops[i] = 0;
        drops[i]++;
      });
    }, 65);
  }

  // ── Mobile Menu ──
  const mobileBtn  = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => mobileMenu.classList.toggle('open'));
    document.addEventListener('click', e => {
      if (!mobileMenu.contains(e.target) && !mobileBtn.contains(e.target)) {
        mobileMenu.classList.remove('open');
      }
    });
  }

  // ── Active nav link ──
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, #mobile-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.includes(currentPage)) {
      link.classList.add('active');
    }
  });

  // ── Scroll reveal ──
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('revealed');
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => obs.observe(el));
  }

});
