// Effet machine à écrire dans le hero
const phrases = [
  "je conçois des sites web modernes",
  "des interfaces rapides et responsives",
  "du design à la mise en ligne"
];
const typedEl = document.getElementById('typed');
let pIndex = 0, cIndex = 0, deleting = false;

function typeLoop(){
  const current = phrases[pIndex];
  if(!deleting){
    cIndex++;
    typedEl.textContent = current.slice(0, cIndex);
    if(cIndex === current.length){ deleting = true; setTimeout(typeLoop, 1400); return; }
  } else {
    cIndex--;
    typedEl.textContent = current.slice(0, cIndex);
    if(cIndex === 0){ deleting = false; pIndex = (pIndex + 1) % phrases.length; }
  }
  setTimeout(typeLoop, deleting ? 35 : 55);
}
typeLoop();

// Onglets actifs selon la section visible
const tabs = document.querySelectorAll('.tab');
const sections = document.querySelectorAll('section[id]');
const navObserver = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      tabs.forEach(t=>t.classList.remove('active'));
      const match = document.querySelector(`.tab[href="#${entry.target.id}"]`);
      if(match) match.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -50% 0px' });
sections.forEach(s=>navObserver.observe(s));

// Apparition au scroll
const revealObserver = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){ entry.target.classList.add('in'); revealObserver.unobserve(entry.target); }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));

// Formulaire de contact -> ouverture directe sur WhatsApp
const WHATSAPP_NUMBER = "22879932819";
document.getElementById('contactForm').addEventListener('submit', function(e){
  e.preventDefault();
  const nom = document.getElementById('nom').value.trim();
  const email = document.getElementById('email').value.trim();
  const sujet = document.getElementById('sujet').value.trim();
  const message = document.getElementById('message').value.trim();

  const texte =
`Bonjour Rayane, je m'appelle ${nom}.
Email : ${email}
Sujet : ${sujet}
Message : ${message}`;

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(texte)}`;
  window.open(url, '_blank');
});