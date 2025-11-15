// scripts.js
// Small interactions: typing effect, reveal on scroll, hover tilt, smooth nav
document.addEventListener('DOMContentLoaded', ()=> {
  // Typing effect for roles
  const roles = ['Front-end Developer','UI/UX Enthusiast','Web Animator','Accessibility Advocate'];
  let i = 0, j = 0, current = '', isDeleting = false;
  const typingEl = document.getElementById('typing');
  const speed = 80;

  function type(){
    const full = roles[i];
    if(!isDeleting){
      current = full.slice(0, ++j);
      typingEl.textContent = current;
      if(current === full){
        isDeleting = true;
        setTimeout(type, 900);
        return;
      }
    } else {
      current = full.slice(0, --j);
      typingEl.textContent = current;
      if(current === ''){
        isDeleting = false;
        i = (i + 1) % roles.length;
      }
    }
    setTimeout(type, isDeleting ? speed/2 : speed);
  }
  if(typingEl) type();

  // reveal on scroll via IntersectionObserver
  const reveals = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries, obs)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add('show');
        obs.unobserve(e.target);
      }
    });
  }, {threshold: 0.12});

  reveals.forEach(r => io.observe(r));

  // subtle tilt effect on project cards
  const tiltEls = document.querySelectorAll('.hover-tilt');
  tiltEls.forEach(el=>{
    el.addEventListener('mousemove', (ev)=>{
      const rect = el.getBoundingClientRect();
      const x = (ev.clientX - rect.left) / rect.width;
      const y = (ev.clientY - rect.top) / rect.height;
      const rx = (y - 0.5) * 6; // rotateX
      const ry = (x - 0.5) * -6; // rotateY
      el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
      el.style.transition = 'transform 0.08s linear';
    });
    el.addEventListener('mouseleave', ()=>{
      el.style.transform = '';
      el.style.transition = 'transform 0.4s cubic-bezier(.2,.9,.3,1)';
    });
  });

  // set current year
  const y = new Date().getFullYear();
  document.getElementById('year').textContent = y;

  // smooth scroll behavior for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      const href = a.getAttribute('href');
      if(href.length > 1){
        e.preventDefault();
        const el = document.querySelector(href);
        if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  });
});