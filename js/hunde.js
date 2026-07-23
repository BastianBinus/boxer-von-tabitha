import { supabase } from './supabase-client.js'
import { calcAge } from './age.js'
import { loadPartials } from './partials.js'

function initials(name) {
  return name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase()
}

function renderDog(dog) {
  const age = calcAge(dog.geburtsdatum)
  const geschlecht = dog.geschlecht === 'Hündin' ? 'Hündin' : 'Rüde'
  const foto = dog.foto_url
    ? `<img src="${dog.foto_url}" alt="${dog.name}" class="dog-foto">`
    : `<div class="dog-avatar-fallback">${initials(dog.name)}</div>`

  return `
    <a href="hund.html?id=${dog.id}" class="card card-elevated dog-card">
      <div class="dog-foto-wrap">${foto}</div>
      <div class="dog-info">
        <h2 class="dog-name">${dog.name}</h2>
        <p class="dog-meta">${age} · ${geschlecht}</p>
      </div>
    </a>
  `
}

async function init() {
  await loadPartials()
  const grid = document.getElementById('hunde-grid')
  const empty = document.getElementById('hunde-empty')
  if (!grid) return

  const { data, error } = await supabase
    .from('hunde')
    .select('id, name, geburtsdatum, geschlecht, foto_url')
    .eq('veroeffentlicht', true)
    .is('deleted_at', null)
    .order('geburtsdatum', { ascending: false })

  if (error || !data?.length) {
    grid.hidden = true
    if (empty) empty.hidden = false
    return
  }

  grid.innerHTML = data.map(renderDog).join('')
}

init()
