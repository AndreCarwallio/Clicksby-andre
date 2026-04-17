// Force homepage to open at the top
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual'
}

window.addEventListener('load', () => {
  if (window.location.hash === '#gallery') {
    history.replaceState(null, '', window.location.pathname)
  }
  window.scrollTo(0, 0)
})

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
const year = document.getElementById('year')
if (year) year.textContent = new Date().getFullYear()

// Lightbox for collage
const shots = Array.from(document.querySelectorAll('.shot'))
const lightbox = document.getElementById('lightbox')
const lightboxImg = document.getElementById('lightboxImg')
const lightboxClose = document.getElementById('lightboxClose')

if (lightbox && lightboxImg) {
  shots.forEach(shot => {
    shot.addEventListener('click', () => {
      const full = shot.dataset.full
      if (!full) return
      lightboxImg.src = full
      lightbox.showModal()
    })
  })
}

if (lightboxClose && lightbox) {
  lightboxClose.addEventListener('click', () => lightbox.close())
}

// Contact -> mailto
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

    const to = 'your-email@example.com'
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`
  })
}

// Gallery filtering
const galleryGrid = document.getElementById('galleryGrid')
const chips = Array.from(document.querySelectorAll('.filters .chip'))

if (galleryGrid && chips.length) {
  const getShots = () => Array.from(galleryGrid.querySelectorAll('.shot'))

  const setActiveChip = (filter) => {
    chips.forEach((chip) => {
      chip.classList.toggle(
        'is-active',
        (chip.dataset.filter || '').toLowerCase() === filter
      )
    })
  }

  const applyFilter = (filter) => {
    getShots().forEach((shot) => {
      const category = (shot.dataset.category || '').toLowerCase()
      const show = filter === 'all' ? true : category === filter
      shot.hidden = !show
    })
  }

  chips.forEach((chip) => {
    chip.addEventListener('click', (e) => {
      e.preventDefault()
      const filter = (chip.dataset.filter || 'all').toLowerCase()
      setActiveChip(filter)
      applyFilter(filter)
    })
  })

  setActiveChip('all')
  applyFilter('all')
}

// Services toggle behavior
const serviceButtons = Array.from(document.querySelectorAll('.toggle'))
const panes = Array.from(document.querySelectorAll('.servicePane'))

function activateService(key) {
  serviceButtons.forEach(btn => {
    const active = btn.dataset.service === key
    btn.classList.toggle('is-active', active)
    btn.setAttribute('aria-selected', String(active))
  })

  panes.forEach(pane => {
    pane.classList.toggle('is-active', pane.dataset.pane === key)
  })
}

if (serviceButtons.length && panes.length) {
  serviceButtons.forEach(btn => {
    btn.addEventListener('click', () => activateService(btn.dataset.service))
  })

  activateService('photo')
}

// Optional year in hero note if present
const yearNow = document.getElementById('yearNow')
if (yearNow) yearNow.textContent = new Date().getFullYear()