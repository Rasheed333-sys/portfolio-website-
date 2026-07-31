document.getElementById('year').textContent = new Date().getFullYear();

/* ---------------- scroll progress + header state ---------------- */
const progress = document.getElementById('scroll-progress');
const header = document.getElementById('siteHeader');
window.addEventListener('scroll', () => {
  const h = document.documentElement;
  const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
  progress.style.width = scrolled + '%';
  header.classList.toggle('scrolled', h.scrollTop > 40);
}, { passive:true });

/* ---------------- mouse glow ---------------- */
const glow = document.getElementById('mouseGlow');
window.addEventListener('mousemove', (e) => {
  glow.style.setProperty('--mx', e.clientX + 'px');
  glow.style.setProperty('--my', e.clientY + 'px');
});

/* ---------------- overlay menu ---------------- */
const menuBtn = document.getElementById('menuBtn');
const overlay = document.getElementById('overlay-menu');
menuBtn.addEventListener('click', () => {
  const open = overlay.classList.toggle('open');
  menuBtn.classList.toggle('open', open);
  menuBtn.setAttribute('aria-expanded', open);
});
overlay.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  overlay.classList.remove('open'); menuBtn.classList.remove('open');
}));

/* ---------------- back to top ---------------- */
document.getElementById('back-to-top').addEventListener('click', () => {
  window.scrollTo({ top:0, behavior:'smooth' });
});

/* ---------------- typing effect ---------------- */
const roles = [
  'Electronics & Communication Engineer',
  'AI / ML Enthusiast',
  'Full-Stack Developer',
  'Future Startup Founder'
];
const typeEl = document.getElementById('typeRole');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let ri = 0, ci = 0, deleting = false;

function typeLoop(){
  const word = roles[ri];
  if (!deleting){
    ci++;
    if (ci > word.length){ deleting = true; setTimeout(typeLoop, 1400); return; }
  } else {
    ci--;
    if (ci === 0){ deleting = false; ri = (ri + 1) % roles.length; }
  }
  typeEl.innerHTML = word.slice(0, ci) + '<span class="cursor">&nbsp;</span>';
  setTimeout(typeLoop, deleting ? 35 : 65);
}
if (reduceMotion){ typeEl.textContent = roles[0]; } else { typeLoop(); }

/* ---------------- reveal on scroll ---------------- */
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting){ entry.target.classList.add('in'); io.unobserve(entry.target); }
  });
}, { threshold:0.15 });
document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => io.observe(el));

/* ---------------- skill bars fill on view ---------------- */
const barIo = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      entry.target.querySelectorAll('.skill-fill').forEach(f => f.classList.add('in'));
      barIo.unobserve(entry.target);
    }
  });
}, { threshold:0.2 });
document.querySelectorAll('.skill-card').forEach(el => barIo.observe(el));

/* ---------------- magnetic buttons ---------------- */
document.querySelectorAll('.magnetic').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const r = btn.getBoundingClientRect();
    const x = e.clientX - r.left - r.width/2;
    const y = e.clientY - r.top - r.height/2;
    btn.style.transform = `translate(${x*0.25}px, ${y*0.35}px)`;
  });
  btn.addEventListener('mouseleave', () => { btn.style.transform = 'translate(0,0)'; });
});

/* ---------------- contact form (static — mailto fallback) ---------------- */
document.getElementById('contactForm').addEventListener('submit', function(e){
  e.preventDefault();
  const name = this.name.value, email = this.email.value, message = this.message.value;
  const subject = encodeURIComponent('Portfolio contact from ' + name);
  const body = encodeURIComponent(message + '\n\n— ' + name + ' (' + email + ')');
  window.location.href = `mailto:haroon@example.com?subject=${subject}&body=${body}`;
});

/* ---------------- particle canvas ---------------- */
(function(){
  const canvas = document.getElementById('particle-canvas');
  const ctx = canvas.getContext('2d');
  let w, h, particles = [];
  const COUNT = 70;

  function resize(){
    w = canvas.width = canvas.offsetWidth;
    h = canvas.height = canvas.offsetHeight;
  }
  window.addEventListener('resize', resize);

  function init(){
    resize();
    particles = Array.from({length:COUNT}, () => ({
      x: Math.random()*w, y: Math.random()*h,
      vx: (Math.random()-0.5)*0.25, vy: (Math.random()-0.5)*0.25,
      r: Math.random()*1.6 + 0.4
    }));
  }
  init();

  function draw(){
    ctx.clearRect(0,0,w,h);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fillStyle = 'rgba(52,211,153,0.55)';
      ctx.fill();
    });
    // connecting lines for nearby particles
    for (let i=0; i<particles.length; i++){
      for (let j=i+1; j<particles.length; j++){
        const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 120){
          ctx.strokeStyle = `rgba(34,211,238,${0.12 * (1 - dist/120)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
    if (!reduceMotion) requestAnimationFrame(draw);
  }
  draw();
})();