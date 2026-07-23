export function initTabs(containerSelector) {
  const container = document.querySelector(containerSelector)
  if (!container) return

  const tabs = container.querySelectorAll('[role="tab"]')
  const panels = container.querySelectorAll('[role="tabpanel"]')

  function activate(tab) {
    tabs.forEach(t => { t.setAttribute('aria-selected', 'false'); t.classList.remove('active') })
    panels.forEach(p => p.hidden = true)
    tab.setAttribute('aria-selected', 'true')
    tab.classList.add('active')
    const panel = container.querySelector(`#${tab.getAttribute('aria-controls')}`)
    if (panel) panel.hidden = false
    history.replaceState(null, '', `#${tab.dataset.tab}`)
  }

  tabs.forEach(tab => tab.addEventListener('click', () => activate(tab)))

  const hash = location.hash.slice(1)
  const initial = hash ? container.querySelector(`[data-tab="${hash}"]`) : tabs[0]
  if (initial) activate(initial)
}
