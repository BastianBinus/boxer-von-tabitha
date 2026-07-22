# Boxer vom Haus Tabitha

Website + Datenbank + Admin-Dashboard für einen Boxer-Zwinger. Monorepo aus
drei Teilen: statische Marketing-/Zuchtbuch-Website, Supabase-Datenbank für
Zuchtdaten, React-Dashboard für die Züchterin und ihre Familie zur Pflege
der Daten ohne SQL-Kenntnisse.

## Struktur

```
boxer-von-tabitha/
├── index.html, hunde.html, hund.html, ...   # statische Website (Repo-Root)
├── partials/                                # Header/Footer/Siegel-Fragmente
├── css/                                     # tokens, fonts, base, components
├── js/                                      # Supabase-Client, Rendering-Logik
├── data/posts.json                          # News-Feed, von Hand gepflegt
├── fonts/                                   # self-hosted .woff2 (Sora, Manrope, IBM Plex Mono)
├── supabase/migrations/                     # SQL-Migrationen (Schema, RLS, Trash-Purge, Storage)
└── dashboard/                               # eigenständige Vite+React+TS-App
```

Website und Dashboard sind zwei getrennte Vercel-Projekte im selben Repo
(`Root Directory` `.` bzw. `dashboard/`).

## Tech-Stack

- **Website**: reines HTML/CSS/JS, kein Build-Step, `supabase-js` via
  `esm.sh`-CDN-Import
- **Datenbank**: Supabase (Postgres) mit Row Level Security
- **Dashboard**: Vite, React, TypeScript, React Router
- **Styling**: CSS Custom Properties (`oklch()`-Farben), self-hosted Fonts
  (keine Google-Fonts-CDN, DSGVO-Gründe)
- **Linting**: Stylelint (kebab-case für CSS-Klassen/-IDs)

## Setup (Website)

```bash
npm install
npm run lint:css     # CSS-Linting
npx serve            # lokaler Server (nötig für ES-Module-Imports)
```

## Setup (Dashboard)

```bash
cd dashboard
npm install
cp .env.example .env   # VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY eintragen
npm run dev
```

## Status

- [x] Phase 0 — Statisches Grundgerüst (Design-Tokens, Fonts, alle HTML-Seiten)
- [ ] Phase 1 — Datenbank (Supabase-Projekt, Migrationen)
- [ ] Phase 3 — Dashboard-App
- [ ] Phase 2 — Website-Live-Daten-Anbindung
- [ ] Phase 4 — Feinschliff (Barrierefreiheit, echte Inhalte)

Details zu allen Phasen, Datenbank-Schema und Design-Entscheidungen:
siehe internes Planungsdokument (nicht Teil des öffentlichen Repos).

## Umgebungsvariablen

| Variable | Wo | Zweck |
|---|---|---|
| `SUPABASE_URL` / `SUPABASE_ANON_KEY` | `js/config.js` | Website → Supabase |
| `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` | `dashboard/.env` | Dashboard → Supabase |

Der Anon-Key ist bewusst öffentlich einsehbar — Zugriffskontrolle läuft über
Row Level Security in der Datenbank, nicht über Geheimhaltung des Keys.

## Lizenz / Rechtliches

Privates Projekt für einen realen Zuchtbetrieb. Impressum und
Datenschutzerklärung enthalten Platzhalter für Identitätsdaten, die vor
Veröffentlichung durch die Betreiberin final ausgefüllt werden müssen.
