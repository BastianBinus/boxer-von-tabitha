import { loadPartials } from './partials.js'

async function loadPosts() {
  const res = await fetch('/data/posts.json')
  return res.json()
}

function renderPost(post) {
  return `
    <article class="card card-elevated post-card">
      <time class="post-date">${new Date(post.date).toLocaleDateString('de-DE', { day: 'numeric', month: 'long', year: 'numeric' })}</time>
      <h2 class="post-title">${post.title}</h2>
      <p class="post-excerpt">${post.excerpt}</p>
    </article>
  `
}

async function init() {
  await loadPartials()
  const feed = document.getElementById('posts-feed')
  if (!feed) return

  try {
    const posts = await loadPosts()
    posts.sort((a, b) => new Date(b.date) - new Date(a.date))
    feed.innerHTML = posts.map(renderPost).join('')
  } catch {
    feed.innerHTML = '<p class="error-text">Beiträge konnten nicht geladen werden.</p>'
  }
}

init()
