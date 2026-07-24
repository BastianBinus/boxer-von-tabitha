import { loadPartials } from './partials.js'

async function loadPosts() {
  const res = await fetch('/data/posts.json')
  return res.json()
}

function getEmbedUrl(url) {
  try {
    const u = new URL(url)
    if (u.hostname === 'www.youtube.com' || u.hostname === 'youtube.com') {
      const id = u.searchParams.get('v')
      if (id) return `https://www.youtube-nocookie.com/embed/${id}`
    }
    if (u.hostname === 'youtu.be') {
      const id = u.pathname.slice(1)
      if (id) return `https://www.youtube-nocookie.com/embed/${id}`
    }
    if (u.hostname === 'vimeo.com' || u.hostname === 'www.vimeo.com') {
      const id = u.pathname.replace(/^\//, '')
      if (id) return `https://player.vimeo.com/video/${id}`
    }
    return null
  } catch {
    return null
  }
}

function renderPost(post) {
  const mediaParts = []

  if (post.images?.length) {
    const imgs = post.images
      .map(src => `<img src="${src}" alt="" class="post-media-img" loading="lazy">`)
      .join('')
    mediaParts.push(`<div class="post-media">${imgs}</div>`)
  }

  if (post.video_url) {
    const embedUrl = getEmbedUrl(post.video_url)
    if (embedUrl) {
      mediaParts.push(
        `<div class="video-embed"><iframe src="${embedUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen title="Video"></iframe></div>`
      )
    }
  }

  return `
    <article class="card card-elevated post-card">
      <time class="post-date">${new Date(post.date).toLocaleDateString('de-DE', { day: 'numeric', month: 'long', year: 'numeric' })}</time>
      <h2 class="post-title">${post.title}</h2>
      <p class="post-excerpt">${post.excerpt}</p>
      ${mediaParts.join('')}
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
