import './style.css'

// Mobile nav toggle
const navToggle = document.getElementById('navToggle')
const mobileNav = document.getElementById('mobileNav')

if (navToggle && mobileNav) {
  navToggle.addEventListener('click', () => {
    const isHidden = mobileNav.hasAttribute('hidden')
    if (isHidden) mobileNav.removeAttribute('hidden')
    else mobileNav.setAttribute('hidden', '')
    navToggle.setAttribute('aria-expanded', String(isHidden))
  })

  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobileNav.setAttribute('hidden', '')
      navToggle.setAttribute('aria-expanded', 'false')
    })
  })
}

// Footer year
document.getElementById('year').textContent = new Date().getFullYear()

// Lightbox for collage
const shots = Array.from(document.querySelectorAll('.shot'))
const lightbox = document.getElementById('lightbox')
const lightboxImg = document.getElementById('lightboxImg')
const lightboxClose = document.getElementById('lightboxClose')

shots.forEach(shot => {
  shot.addEventListener('click', () => {
    const full = shot.dataset.full
    lightboxImg.src = full
    lightbox.showModal()
  })
})

if (lightboxClose) lightboxClose.addEventListener('click', () => lightbox.close())

// Contact -> mailto (zero cost)
const form = document.getElementById('contactForm')
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault()

    const data = new FormData(form)
    const name = String(data.get('name') || '')
    const email = String(data.get('email') || '')
    const type = String(data.get('type') || '')
    const date = String(data.get('date') || '')
    const message = String(data.get('message') || '')

    const subject = encodeURIComponent(`Photography Inquiry: ${type}`)
    const body = encodeURIComponent(
`Name: ${name}
Email: ${email}
Shoot type: ${type}
Preferred date: ${date}

Message:
${message}
`
    )

    // Replace this later with your real email (we'll do it next)
    const to = 'your-email@example.com'

    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`
  })
}

// Gallery filtering
const chips = Array.from(document.querySelectorAll('.chip'))
const shotsAll = Array.from(document.querySelectorAll('.shot'))

function setActiveChip(filter){
  chips.forEach(c => c.classList.toggle('is-active', c.dataset.filter === filter))
}

function applyFilter(filter){
  shotsAll.forEach(shot => {
    const cat = shot.dataset.category || 'all'
    const show = (filter === 'all') || (cat === filter)
    shot.style.display = show ? '' : 'none'
  })
}

chips.forEach(chip => {
  chip.addEventListener('click', () => {
    const filter = chip.dataset.filter
    setActiveChip(filter)
    applyFilter(filter)
  })
})

// default
setActiveChip('all')
applyFilter('all')


// Services toggle behavior
const serviceButtons = Array.from(document.querySelectorAll('.toggle'))
const panes = Array.from(document.querySelectorAll('.servicePane'))

function activateService(key){
  serviceButtons.forEach(btn => {
    const active = btn.dataset.service === key
    btn.classList.toggle('is-active', active)
    btn.setAttribute('aria-selected', String(active))
  })
  panes.forEach(pane => {
    pane.classList.toggle('is-active', pane.dataset.pane === key)
  })
}

serviceButtons.forEach(btn => {
  btn.addEventListener('click', () => activateService(btn.dataset.service))
})

// default
activateService('photo')


// Year in hero note
const yearEl = document.getElementById('yearNow')
if (yearEl) yearEl.textContent = new Date().getFullYear()



/* ===== Gallery filtering (All = Individual + Events) ===== */
document.addEventListener("DOMContentLoaded", () => {
  const filtersBar = document.querySelector(".filters");
  const grid = document.querySelector("#galleryGrid");
  if (!filtersBar || !grid) return;

  const chips = Array.from(filtersBar.querySelectorAll(".chip"));

  function setActive(filter){
    chips.forEach((c) => c.classList.toggle("is-active", c.dataset.filter === filter));
  }

  function applyFilter(filter){
    const shots = Array.from(grid.querySelectorAll(".shot"));
    shots.forEach((shot) => {
      const cat = (shot.dataset.category || "").toLowerCase();

      let show = false;
      if (filter === "all") {
        // All shows ONLY individual + events (per your requirement)
        show = (cat === "individual" || cat === "events");
      } else {
        show = (cat === filter);
      }

      shot.style.display = show ? "" : "none";
    });
  }

  filtersBar.addEventListener("click", (e) => {
    const btn = e.target.closest(".chip");
    if (!btn) return;

    const filter = (btn.dataset.filter || "all").toLowerCase();
    setActive(filter);
    applyFilter(filter);
  });

  // Default
  setActive("all");
  applyFilter("all");
});

/* ===== Gallery filtering FIX (direct chip listeners) ===== */
(() => {
  const grid = document.getElementById("galleryGrid");
  const chips = Array.from(document.querySelectorAll(".filters .chip"));

  if (!grid || chips.length === 0) return;

  const getShots = () => Array.from(grid.querySelectorAll(".shot"));

  const apply = (filter) => {
    const shots = getShots();

    shots.forEach((shot) => {
      const cat = (shot.dataset.category || "").toLowerCase();

      let show = false;
      if (filter === "all") {
        // per your rule: All shows only individual + events
        show = (cat === "individual" || cat === "events");
      } else {
        show = (cat === filter);
      }

      shot.hidden = !show;
    });
  };

  const setActive = (filter) => {
    chips.forEach((c) => c.classList.toggle("is-active", (c.dataset.filter || "").toLowerCase() === filter));
  };

  chips.forEach((chip) => {
    chip.addEventListener("click", (e) => {
      // make sure button clicks behave like buttons
      e.preventDefault();

      const filter = (chip.dataset.filter || "all").toLowerCase();
      setActive(filter);
      apply(filter);
    });
  });

  // default state
  setActive("all");
  apply("all");
})();
