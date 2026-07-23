import { supabase } from './supabase-client.js'
import { calcAge } from './age.js'
import { loadPartials } from './partials.js'
import { initTabs } from './tabs.js'

const id = new URLSearchParams(location.search).get('id')

function parentLabel(dog, prefix) {
  if (dog[`${prefix}_id`]) return `<a href="hund.html?id=${dog[`${prefix}_id`]}" class="parent-link">${dog[`${prefix}_name`] ?? '—'}</a>`
  const name = dog[`${prefix}_extern_name`]
  const zwinger = dog[`${prefix}_extern_zwinger`]
  if (name) return `${name}${zwinger ? ` <span class="muted">v. ${zwinger}</span>` : ''}`
  return '<span class="muted">unbekannt</span>'
}

function renderUebersicht(dog) {
  const rows = [
    ['Geburtsdatum', new Date(dog.geburtsdatum).toLocaleDateString('de-DE')],
    ['Geschlecht', dog.geschlecht],
    ['Alter', calcAge(dog.geburtsdatum)],
    ['Mutter', parentLabel(dog, 'mutter')],
    ['Vater', parentLabel(dog, 'vater')],
  ]
  return rows.map(([label, value]) => `
    <div class="fact-row">
      <dt class="fact-label">${label}</dt>
      <dd class="fact-value">${value}</dd>
    </div>
  `).join('')
}

function renderGesundheit(checks) {
  if (!checks.length) return '<p class="muted">Keine Gesundheitseinträge vorhanden.</p>'
  return checks.map(c => `
    <div class="card card-outlined health-card">
      <div class="health-header">
        <strong>${c.kategorie}</strong>
        <time class="muted">${new Date(c.datum).toLocaleDateString('de-DE')}</time>
      </div>
      <p class="health-ergebnis">${c.ergebnis}</p>
      ${c.tierarzt ? `<p class="muted small">Tierarzt: ${c.tierarzt}</p>` : ''}
      ${c.notiz ? `<p class="muted small">${c.notiz}</p>` : ''}
    </div>
  `).join('')
}

function renderPruefungen(pruefungen) {
  if (!pruefungen.length) return '<p class="muted">Keine Prüfungen vorhanden.</p>'
  return pruefungen.map(p => `
    <div class="card card-outlined health-card">
      <div class="health-header">
        <strong>${p.art}</strong>
        <time class="muted">${new Date(p.datum).toLocaleDateString('de-DE')}</time>
      </div>
      <p class="health-ergebnis">${p.ergebnis}</p>
      ${p.ort ? `<p class="muted small">Ort: ${p.ort}</p>` : ''}
      ${p.notiz ? `<p class="muted small">${p.notiz}</p>` : ''}
    </div>
  `).join('')
}

async function init() {
  await loadPartials()

  if (!id) {
    document.getElementById('hund-content').innerHTML = '<p>Kein Hund angegeben.</p>'
    return
  }

  const [dogRes, healthRes, pruefRes] = await Promise.all([
    supabase
      .from('hunde')
      .select('*, mutter:mutter_id(name), vater:vater_id(name)')
      .eq('id', id)
      .eq('veroeffentlicht', true)
      .is('deleted_at', null)
      .single(),
    supabase
      .from('gesundheitschecks')
      .select('*')
      .eq('hund_id', id)
      .is('deleted_at', null)
      .order('datum', { ascending: false }),
    supabase
      .from('pruefungen')
      .select('*')
      .eq('hund_id', id)
      .is('deleted_at', null)
      .order('datum', { ascending: false }),
  ])

  const dog = dogRes.data
  if (!dog) {
    document.getElementById('hund-content').innerHTML = '<p class="muted">Hund nicht gefunden.</p>'
    return
  }

  // resolve parent names from joined data
  if (dog.mutter) dog.mutter_name = dog.mutter.name
  if (dog.vater) dog.vater_name = dog.vater.name

  document.title = `${dog.name} — Boxer vom Hause Tabitha`

  const foto = dog.foto_url
    ? `<img src="${dog.foto_url}" alt="${dog.name}" class="hund-foto">`
    : `<div class="hund-avatar-fallback">${dog.name.split(' ').slice(0,2).map(w=>w[0]).join('').toUpperCase()}</div>`

  document.getElementById('hund-foto').innerHTML = foto
  document.getElementById('hund-name').textContent = dog.name
  document.getElementById('hund-meta').textContent = `${calcAge(dog.geburtsdatum)} · ${dog.geschlecht}`
  document.getElementById('tab-uebersicht-content').innerHTML = `<dl class="fact-list">${renderUebersicht(dog)}</dl>`
  document.getElementById('tab-gesundheit-content').innerHTML = renderGesundheit(healthRes.data ?? [])
  document.getElementById('tab-pruefungen-content').innerHTML = renderPruefungen(pruefRes.data ?? [])

  initTabs('#hund-tabs')
}

init()
