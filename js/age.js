export function calcAge(geburtsdatum) {
  const birth = new Date(geburtsdatum)
  const now = new Date()
  let years = now.getFullYear() - birth.getFullYear()
  let months = now.getMonth() - birth.getMonth()
  if (months < 0) { years--; months += 12 }
  if (years >= 2) return `${years} J.`
  if (years === 1) return months > 0 ? `1 J. ${months} Mo.` : '1 J.'
  return months <= 1 ? `${Math.floor((now - birth) / 86400000)} Tage` : `${months} Mo.`
}
