import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const SUPABASE_URL = 'https://tnkwbcevfyslpetuuxlu.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRua3diY2V2ZnlzbHBldHV1eGx1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkxOTkzMjMsImV4cCI6MjA5NDc3NTMyM30.bMQJwMVioi6OSYWYqXFEwGA89AompDtnr-eDg6movWw'
const db = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// ── Programme complet du DIU ─────────────────────────────
const BLOCS = {
  bloc0: { label: 'Bloc 0 — Rappels et mise à niveau',               short: 'Bloc 0', color: '#6366f1', dates: '19-22 mai 2026',       lieu: 'Le Havre',  mode: 'présentiel' },
  bloc1: { label: 'Bloc 1 — Représentation des données et prog.',     short: 'Bloc 1', color: '#0ea5e9', dates: '22-25 juin 2026',      lieu: 'Le Havre',  mode: 'distanciel' },
  bloc2: { label: 'Bloc 2 — Algorithmique',                           short: 'Bloc 2', color: '#10b981', dates: 'sept.–oct. 2026',      lieu: 'Le Havre',  mode: 'distanciel' },
  bloc3: { label: 'Bloc 3 — Architectures, systèmes et réseaux',      short: 'Bloc 3', color: '#f59e0b', dates: '26-29 mai 2026',       lieu: 'Rouen',     mode: 'présentiel' },
  bloc4: { label: 'Bloc 4 — Programmation avancée et BDD',            short: 'Bloc 4', color: '#ef4444', dates: 'oct.–nov. 2026',       lieu: 'Le Havre',  mode: 'distanciel' },
  bloc5: { label: 'Bloc 5 — Algorithmique avancée',                   short: 'Bloc 5', color: '#8b5cf6', dates: 'nov.–déc. 2026',       lieu: 'Caen',      mode: 'distanciel' },
}

const EVAL_RAPPORT_GENERAL = [
  { id: 'ev_pos',    label: 'Positionnement du sujet dans le programme' },
  { id: 'ev_not',    label: 'Notions à faire passer' },
  { id: 'ev_prog',   label: 'Progression envisagée' },
  { id: 'ev_heure',  label: "Nombre d'heures envisagées" },
  { id: 'ev_eval',   label: "Éléments d'évaluation" },
]
const EVAL_RAPPORT_SEANCE = [
  { id: 'ev_spos',   label: 'Positionnement de la séance' },
  { id: 'ev_scours', label: 'Support de cours' },
  { id: 'ev_sex',    label: 'Exercices envisagés' },
  { id: 'ev_smode',  label: 'Mode de travail (inversé, débranché, standard, projet…)' },
  { id: 'ev_sdev',   label: "Exemples de parties de devoir pour évaluer l'élève" },
]
const EVAL_PRESENTATION = [
  { id: 'ev_p1', label: '5 min — Présentation de l'approche générale' },
  { id: 'ev_p2', label: '5 min — Présentation générale de la séance' },
  { id: 'ev_p3', label: '5 min — Présentation d'une partie du cours' },
  { id: 'ev_p4', label: "5 min — Présentation d'un exercice ou d'une famille d'exercices" },
  { id: 'ev_p5', label: '5 min — Conclusion' },
]

const RESSOURCES_MERMET = [
  { icon: '🧠', title: 'Bloc 1 — Didactique de l'informatique', desc: 'Pensée informatique, approche instrumentale, didactique', url: 'https://mermet.users.greyc.fr/Enseignement/EnseignementInformatiqueLycee/Havre/Didactique/index.html' },
  { icon: '🌐', title: 'Bloc 1 — Web côté client (JavaScript)', desc: 'HTML, CSS, JavaScript, événements, interfaces web',        url: 'https://mermet.users.greyc.fr/Enseignement/EnseignementInformatiqueLycee/Havre/Javascript/index.html' },
  { icon: '⚙️', title: 'Bloc 2 — Algorithmique',                 desc: 'Algorithmes classiques, correction, complexité',           url: 'https://mermet.users.greyc.fr/Enseignement/EnseignementInformatiqueLycee/Havre/Algorithmique/index.html' },
  { icon: '🗄️', title: 'Bloc 4 — Programmation avancée et BDD', desc: 'SQL, paradigmes, structures de données',                   url: 'https://mermet.users.greyc.fr/Enseignement/EnseignementInformatiqueLycee/Havre/Bloc4/index.html' },
]
const RESSOURCES_OFFICIEL = [
  { icon: '📚', title: 'Eduscol NSI',      desc: 'Programmes et ressources officielles Numérique et Sciences Informatiques', url: 'https://eduscol.education.gouv.fr/5823/programmes-et-ressources-en-numerique-et-sciences-informatiques-voie-g' },
  { icon: '💬', title: 'Forum MOOC NSI',   desc: 'Échanges et ressources de la communauté NSI (INRIA)',                      url: 'https://mooc-forums.inria.fr/moocnsi' },
]

const CALENDAR = [
  { bloc: 'bloc0', label: 'Bloc 0 — Rappels et mise à niveau',          dates: '19-22 mai 2026',   lieu: 'Le Havre', mode: 'présentiel', isoStart: '2026-05-19' },
  { bloc: 'bloc3', label: 'Bloc 3 — Architectures, systèmes, réseaux',  dates: '26-29 mai 2026',   lieu: 'Rouen',    mode: 'présentiel', isoStart: '2026-05-26' },
  { bloc: 'bloc1', label: 'Bloc 1 — Données et programmation',           dates: '22-25 juin 2026',  lieu: 'Le Havre', mode: 'distanciel', isoStart: '2026-06-22' },
  { bloc: 'bloc2', label: 'Bloc 2 — Algorithmique',                      dates: 'sept.–oct. 2026',  lieu: 'Le Havre', mode: 'distanciel', isoStart: '2026-09-01' },
  { bloc: 'bloc4', label: 'Bloc 4 — Prog. avancée et BDD',               dates: 'oct.–nov. 2026',   lieu: 'Le Havre', mode: 'distanciel', isoStart: '2026-10-01' },
  { bloc: 'bloc5', label: 'Bloc 5 — Algorithmique avancée',              dates: 'nov.–déc. 2026',   lieu: 'Caen',     mode: 'distanciel', isoStart: '2026-11-01' },
]

const PROGRAMME = [
  { id: 'bloc0', topics: [
    { id: 'b0_archi',     label: 'Architecture des ordinateurs' },
    { id: 'b0_os',        label: "Système d'exploitation et Linux" },
    { id: 'b0_imperatif', label: 'Paradigme impératif' },
    { id: 'b0_python',    label: 'Bases de la programmation Python' },
  ]},
  { id: 'bloc1', topics: [
    { id: 'b1_flottants',  label: 'Codage des nombres flottants' },
    { id: 'b1_fichiers',   label: 'Fichiers, formats, compression et archivage' },
    { id: 'b1_types',      label: 'Types structurés, p-uplets, tableaux, dictionnaires' },
    { id: 'b1_tables',     label: 'Traitement de données en tables (recherche, tris, fusion)' },
    { id: 'b1_modularite', label: 'Modularité et bibliothèques' },
    { id: 'b1_langages',   label: 'Diversité des langages de programmation' },
    { id: 'b1_html',       label: 'HTML et CSS' },
    { id: 'b1_js',         label: 'JavaScript côté client' },
    { id: 'b1_events',     label: 'Gestion des événements dans une interface web' },
    { id: 'b1_tests',      label: 'Spécification, prototypage et tests' },
    { id: 'b1_didactique', label: 'Pensée informatique et didactique' },
    { id: 'b1_psycho',     label: 'Approche instrumentale et psychologie de la programmation' },
    { id: 'b1_maths',      label: 'Liens avec les didactiques des mathématiques' },
  ]},
  { id: 'bloc2', topics: [
    { id: 'b2_gloutons',    label: 'Algorithmes gloutons (sac à dos, rendu de monnaie)' },
    { id: 'b2_diviser',     label: 'Diviser pour régner' },
    { id: 'b2_knn',         label: 'Algorithme des k plus proches voisins' },
    { id: 'b2_predicats',   label: 'Prédicats et invariants' },
    { id: 'b2_correction',  label: 'Preuve de correction partielle' },
    { id: 'b2_terminaison', label: 'Preuve de terminaison' },
    { id: 'b2_complexite',  label: 'Notion de complexité (temps et mémoire)' },
  ]},
  { id: 'bloc3', topics: [
    { id: 'b3_circuits',    label: 'Circuits séquentiels et automates' },
    { id: 'b3_vonneumann',  label: 'Architecture de Von Neumann' },
    { id: 'b3_machine',     label: "Jeu d'instruction et langage machine" },
    { id: 'b3_robotique',   label: 'Robotique et systèmes embarqués' },
    { id: 'b3_signaux',     label: 'Acquisition et conversion des signaux analogiques' },
    { id: 'b3_os',          label: "Systèmes d'exploitation" },
    { id: 'b3_reseaux',     label: 'Réseaux et protocoles Internet (modèle OSI)' },
    { id: 'b3_chiffrement', label: 'Sécurité des communications (chiffrement)' },
  ]},
  { id: 'bloc4', topics: [
    { id: 'b4_sgbd',         label: 'SGBD et bases de données relationnelles' },
    { id: 'b4_sql',          label: 'Langage SQL' },
    { id: 'b4_web_serveur',  label: 'Programmation web côté serveur' },
    { id: 'b4_imperatif',    label: 'Programmation impérative' },
    { id: 'b4_fonctionnel',  label: 'Programmation fonctionnelle' },
    { id: 'b4_objet',        label: 'Programmation objet' },
    { id: 'b4_evenementiel', label: 'Programmation événementielle' },
    { id: 'b4_parallele',    label: 'Programmation parallèle' },
    { id: 'b4_logique',      label: 'Programmation logique' },
    { id: 'b4_listes',       label: 'Listes, piles, files' },
  ]},
  { id: 'bloc5', topics: [
    { id: 'b5_arbres',         label: 'Arbres binaires et arbres binaires de recherche' },
    { id: 'b5_graphes',        label: 'Graphes (parcours en profondeur et en largeur)' },
    { id: 'b5_dynamique',      label: 'Programmation dynamique' },
    { id: 'b5_randomise',      label: 'Algorithmes randomisés' },
    { id: 'b5_textuel',        label: 'Recherche textuelle' },
    { id: 'b5_calculabilite',  label: 'Complexité, calculabilité et machines de Turing' },
  ]},
]

const STATUS_LABELS = {
  not_started: '⚪ Non vu',
  in_progress: '🟡 En cours',
  mastered:    '🟢 Maîtrisé',
}
const STATUS_NEXT = { not_started: 'in_progress', in_progress: 'mastered', mastered: 'not_started' }

// ── State ────────────────────────────────────────────────
let allEntries    = []
let allFiches     = []
let topicStatuses = {}   // { topicId: 'not_started'|'in_progress'|'mastered' }
let selectedMood  = ''
let currentJournalId = null
let currentFicheId   = null
let ficheFilter   = 'all'
let currentView   = 'dashboard'

// ── Supabase helpers ─────────────────────────────────────
async function loadAll() {
  const [entriesRes, fichesRes, statusRes] = await Promise.all([
    db.from('entries').select('*').order('date', { ascending: false }),
    db.from('fiches').select('*').order('created_at', { ascending: false }),
    db.from('topic_status').select('*'),
  ])
  allEntries    = entriesRes.data  || []
  allFiches     = fichesRes.data   || []
  topicStatuses = Object.fromEntries((statusRes.data || []).map(r => [r.topic_key, r.status]))
}

async function upsertTopicStatus(topicKey, status) {
  await db.from('topic_status').upsert({ topic_key: topicKey, status }, { onConflict: 'topic_key' })
  topicStatuses[topicKey] = status
}

// ── Navigation ───────────────────────────────────────────
function showView(id) {
  document.querySelectorAll('.content > section').forEach(s => s.classList.add('hidden'))
  document.getElementById('view-' + id).classList.remove('hidden')
  document.querySelectorAll('.nav-item').forEach(b => b.classList.toggle('active', b.dataset.view === id))
  currentView = id
}

function navigate(view) {
  showView(view)
  if (view === 'dashboard')   renderDashboard()
  else if (view === 'programme')  renderProgramme()
  else if (view === 'fiches')     renderFiches()
  else if (view === 'journal')    renderJournal()
  else if (view === 'eval')       renderEval()
  else if (view === 'ressources') renderRessources()
}

// ── Helpers ──────────────────────────────────────────────
function fmt(iso) {
  if (!iso) return ''
  const [y, m, d] = iso.split('-')
  return `${d}/${m}/${y}`
}
function today() { return new Date().toISOString().slice(0, 10) }

function blocBadge(bloc) {
  if (!bloc || !BLOCS[bloc]) return ''
  return `<span class="bloc-badge ${bloc}">${BLOCS[bloc].short}</span>`
}

// ── Dashboard ────────────────────────────────────────────
function renderDashboard() {
  const totalTopics   = PROGRAMME.reduce((n, b) => n + b.topics.length, 0)
  const mastered      = Object.values(topicStatuses).filter(s => s === 'mastered').length
  const inProgress    = Object.values(topicStatuses).filter(s => s === 'in_progress').length

  // Prochaine deadline
  const daysRapport = daysUntil('2026-11-30')
  const daysPresent = daysUntil('2026-12-17')

  document.getElementById('dash-stats').innerHTML = `
    <div class="stat-card"><div class="stat-value">${mastered}</div><div class="stat-label">Thèmes maîtrisés / ${totalTopics}</div></div>
    <div class="stat-card"><div class="stat-value">${allFiches.length}</div><div class="stat-label">Fiches de cours</div></div>
    <div class="stat-card"><div class="stat-value">${allEntries.length}</div><div class="stat-label">Entrées journal</div></div>
    <div class="stat-card deadline-card ${daysRapport < 14 ? 'urgent' : ''}">
      <div class="deadline-label">📄 Rapport papier</div>
      <div class="deadline-date">30 nov. 2026</div>
      <div class="deadline-days">J-${daysRapport}</div>
    </div>
    <div class="stat-card deadline-card ${daysPresent < 14 ? 'urgent' : ''}">
      <div class="deadline-label">🎤 Présentation orale</div>
      <div class="deadline-date">17 déc. 2026</div>
      <div class="deadline-days">J-${daysPresent}</div>
    </div>
  `

  document.getElementById('dash-blocs').innerHTML = PROGRAMME.map(bloc => {
    const total    = bloc.topics.length
    const done     = bloc.topics.filter(t => topicStatuses[t.id] === 'mastered').length
    const ongoing  = bloc.topics.filter(t => topicStatuses[t.id] === 'in_progress').length
    const pct      = Math.round((done / total) * 100)
    const color    = BLOCS[bloc.id].color
    return `
      <div class="bloc-progress">
        <div class="bloc-progress-header">
          <span>${BLOCS[bloc.id].short} — ${BLOCS[bloc.id].label.split('—')[1].trim()}</span>
          <span style="color:var(--muted);font-weight:400">${done}/${total} maîtrisés${ongoing ? ` · ${ongoing} en cours` : ''}</span>
        </div>
        <div class="progress-track">
          <div class="progress-fill" style="width:${pct}%;background:${color}"></div>
        </div>
      </div>`
  }).join('')

  const recent = allEntries.slice(0, 3)
  document.getElementById('dash-recent').innerHTML = recent.length
    ? recent.map(e => `
        <div class="recent-card" data-id="${e.id}">
          <div class="recent-card-title">${e.mood || '📄'} ${e.title || '(Sans titre)'}</div>
          <div class="recent-card-meta">${fmt(e.date)}${e.topic ? ' · ' + e.topic : ''} ${blocBadge(e.bloc)}</div>
        </div>`).join('')
    : '<p class="empty-msg">Aucune entrée journal.</p>'

  document.querySelectorAll('.recent-card[data-id]').forEach(card => {
    card.addEventListener('click', () => {
      const entry = allEntries.find(e => e.id === card.dataset.id)
      if (entry) { navigate('journal'); showJournalEdit(entry) }
    })
  })
}

// ── Programme ────────────────────────────────────────────
function renderProgramme() {
  document.getElementById('programme-list').innerHTML = PROGRAMME.map(bloc => `
    <div class="bloc-section" id="bs-${bloc.id}">
      <div class="bloc-header" data-bloc="${bloc.id}">
        <div class="bloc-dot" style="background:${BLOCS[bloc.id].color}"></div>
        ${BLOCS[bloc.id].label}
        <span class="bloc-chevron">▶</span>
      </div>
      <div class="topic-list">
        ${bloc.topics.map(t => {
          const status = topicStatuses[t.id] || 'not_started'
          return `
            <div class="topic-row">
              <span class="topic-label">${t.label}</span>
              <button class="status-btn ${status}" data-topic="${t.id}" data-status="${status}">
                ${STATUS_LABELS[status]}
              </button>
            </div>`
        }).join('')}
      </div>
    </div>
  `).join('')

  document.querySelectorAll('.bloc-header').forEach(h => {
    h.addEventListener('click', () => {
      const section = document.getElementById('bs-' + h.dataset.bloc)
      section.classList.toggle('open')
    })
  })

  document.querySelectorAll('.status-btn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation()
      const topicId = btn.dataset.topic
      const current = btn.dataset.status
      const next    = STATUS_NEXT[current]
      btn.dataset.status = next
      btn.className = 'status-btn ' + next
      btn.textContent = STATUS_LABELS[next]
      await upsertTopicStatus(topicId, next)
    })
  })
}

// ── Fiches ───────────────────────────────────────────────
function renderFiches() {
  const tabs = document.getElementById('fiche-tabs')
  tabs.innerHTML = `<button class="tab-btn ${ficheFilter === 'all' ? 'active' : ''}" style="${ficheFilter === 'all' ? 'background:#1e293b' : ''}" data-filter="all">Tous</button>` +
    PROGRAMME.map(b => `
      <button class="tab-btn ${ficheFilter === b.id ? 'active' : ''}"
        style="${ficheFilter === b.id ? `background:${BLOCS[b.id].color}` : ''}"
        data-filter="${b.id}">${BLOCS[b.id].short}</button>
    `).join('')

  tabs.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      ficheFilter = btn.dataset.filter
      renderFiches()
    })
  })

  const list = document.getElementById('fiche-list')
  const empty = document.getElementById('fiche-empty')
  const filtered = ficheFilter === 'all' ? allFiches : allFiches.filter(f => f.bloc === ficheFilter)

  list.innerHTML = ''
  empty.classList.toggle('hidden', filtered.length > 0)

  filtered.forEach(fiche => {
    const card = document.createElement('div')
    card.className = 'fiche-card'
    card.innerHTML = `
      <div>${blocBadge(fiche.bloc)}${fiche.topic ? `<span style="font-size:.8rem;color:var(--muted);margin-left:8px">${fiche.topic}</span>` : ''}</div>
      <div class="fiche-card-title">${fiche.title || '(Sans titre)'}</div>
      ${fiche.summary ? `<div class="fiche-card-summary">${fiche.summary}</div>` : ''}
      ${fiche.code_example ? '<div class="fiche-has-code">💻 Contient un exemple de code</div>' : ''}
    `
    card.addEventListener('click', () => showFicheEdit(fiche))
    list.appendChild(card)
  })
}

function showFicheEdit(fiche) {
  showView('fiche-edit')
  if (!fiche) {
    currentFicheId = null
    document.getElementById('fiche-bloc').value    = ficheFilter !== 'all' ? ficheFilter : ''
    document.getElementById('fiche-topic').value   = ''
    document.getElementById('fiche-title').value   = ''
    document.getElementById('fiche-summary').value = ''
    document.getElementById('fiche-content').value = ''
    document.getElementById('fiche-code').value    = ''
  } else {
    currentFicheId = fiche.id
    document.getElementById('fiche-bloc').value    = fiche.bloc         || ''
    document.getElementById('fiche-topic').value   = fiche.topic        || ''
    document.getElementById('fiche-title').value   = fiche.title        || ''
    document.getElementById('fiche-summary').value = fiche.summary      || ''
    document.getElementById('fiche-content').value = fiche.content      || ''
    document.getElementById('fiche-code').value    = fiche.code_example || ''
  }
}

async function saveFiche() {
  const payload = {
    bloc:         document.getElementById('fiche-bloc').value    || null,
    topic:        document.getElementById('fiche-topic').value.trim(),
    title:        document.getElementById('fiche-title').value.trim(),
    summary:      document.getElementById('fiche-summary').value.trim(),
    content:      document.getElementById('fiche-content').value.trim(),
    code_example: document.getElementById('fiche-code').value.trim(),
  }
  if (!payload.title && !payload.summary && !payload.content) { toast('Remplis au moins un champ.'); return }

  const btn = document.getElementById('btn-fiche-save')
  btn.disabled = true; btn.textContent = 'Sauvegarde…'
  try {
    if (currentFicheId) {
      await db.from('fiches').update(payload).eq('id', currentFicheId)
      const idx = allFiches.findIndex(f => f.id === currentFicheId)
      if (idx !== -1) allFiches[idx] = { ...allFiches[idx], ...payload }
    } else {
      const { data } = await db.from('fiches').insert([payload]).select().single()
      allFiches.unshift(data)
    }
    toast('Fiche sauvegardée ✓')
    setTimeout(() => { navigate('fiches') }, 600)
  } catch (err) {
    toast('Erreur : ' + err.message)
    btn.disabled = false; btn.textContent = 'Sauvegarder'
  }
}

async function deleteFiche() {
  if (!currentFicheId) { navigate('fiches'); return }
  if (!confirm('Supprimer cette fiche ?')) return
  await db.from('fiches').delete().eq('id', currentFicheId)
  allFiches = allFiches.filter(f => f.id !== currentFicheId)
  navigate('fiches')
}

// ── Journal ──────────────────────────────────────────────
function renderJournal(filter = '') {
  const term     = filter.toLowerCase()
  const filtered = term
    ? allEntries.filter(e => [e.title, e.tasks, e.learned, e.notes, e.topic].some(f => (f || '').toLowerCase().includes(term)))
    : allEntries

  document.getElementById('empty-msg').classList.toggle('hidden', filtered.length > 0)
  const list = document.getElementById('day-list')
  list.innerHTML = ''
  filtered.forEach(entry => {
    const card = document.createElement('div')
    card.className = 'day-card'
    card.innerHTML = `
      <div class="day-mood">${entry.mood || '📄'}</div>
      <div class="day-info">
        <div class="day-title">${entry.title || '(Sans titre)'}</div>
        <div class="day-date">${fmt(entry.date)}${entry.topic ? ' · ' + entry.topic : ''}</div>
        ${blocBadge(entry.bloc)}
        ${entry.tasks ? `<div class="day-preview">${entry.tasks.split('\n')[0]}</div>` : ''}
      </div>
    `
    card.addEventListener('click', () => showJournalEdit(entry))
    list.appendChild(card)
  })
}

function showJournalEdit(entry) {
  showView('journal-edit')
  if (!entry) {
    currentJournalId = null
    document.getElementById('entry-date').value    = today()
    document.getElementById('entry-title').value   = ''
    document.getElementById('entry-bloc').value    = ''
    document.getElementById('entry-topic').value   = ''
    document.getElementById('entry-tasks').value   = ''
    document.getElementById('entry-learned').value = ''
    document.getElementById('entry-notes').value   = ''
    setMood('')
  } else {
    currentJournalId = entry.id
    document.getElementById('entry-date').value    = entry.date    || ''
    document.getElementById('entry-title').value   = entry.title   || ''
    document.getElementById('entry-bloc').value    = entry.bloc    || ''
    document.getElementById('entry-topic').value   = entry.topic   || ''
    document.getElementById('entry-tasks').value   = entry.tasks   || ''
    document.getElementById('entry-learned').value = entry.learned || ''
    document.getElementById('entry-notes').value   = entry.notes   || ''
    setMood(entry.mood || '')
  }
}

function setMood(mood) {
  selectedMood = mood
  document.querySelectorAll('.mood-btn').forEach(b => b.classList.toggle('selected', b.dataset.mood === mood))
}

async function saveJournal() {
  const payload = {
    date:    document.getElementById('entry-date').value    || null,
    title:   document.getElementById('entry-title').value.trim(),
    bloc:    document.getElementById('entry-bloc').value    || null,
    topic:   document.getElementById('entry-topic').value.trim(),
    tasks:   document.getElementById('entry-tasks').value.trim(),
    learned: document.getElementById('entry-learned').value.trim(),
    notes:   document.getElementById('entry-notes').value.trim(),
    mood:    selectedMood,
  }
  if (!payload.date && !payload.title && !payload.tasks) { toast('Remplis au moins un champ.'); return }

  const btn = document.getElementById('btn-save')
  btn.disabled = true; btn.textContent = 'Sauvegarde…'
  try {
    if (currentJournalId) {
      await db.from('entries').update(payload).eq('id', currentJournalId)
      const idx = allEntries.findIndex(e => e.id === currentJournalId)
      if (idx !== -1) allEntries[idx] = { ...allEntries[idx], ...payload }
    } else {
      const { data } = await db.from('entries').insert([payload]).select().single()
      allEntries.unshift(data)
      allEntries.sort((a, b) => (b.date || '').localeCompare(a.date || ''))
    }
    toast('Entrée sauvegardée ✓')
    setTimeout(() => { navigate('journal') }, 600)
  } catch (err) {
    toast('Erreur : ' + err.message)
    btn.disabled = false; btn.textContent = 'Sauvegarder'
  }
}

async function deleteJournal() {
  if (!currentJournalId) { navigate('journal'); return }
  if (!confirm('Supprimer cette entrée ?')) return
  await db.from('entries').delete().eq('id', currentJournalId)
  allEntries = allEntries.filter(e => e.id !== currentJournalId)
  navigate('journal')
}

// ── Toast ────────────────────────────────────────────────
function toast(msg) {
  const el = document.getElementById('toast')
  el.textContent = msg; el.classList.add('show')
  clearTimeout(el._t); el._t = setTimeout(() => el.classList.remove('show'), 2800)
}

// ── Évaluation ───────────────────────────────────────────

function daysUntil(isoDate) {
  const diff = new Date(isoDate) - new Date(today())
  return Math.ceil(diff / 86400000)
}

function renderEval() {
  // Deadlines
  const deadlines = [
    { label: 'Sujet donné', date: 'Fin octobre 2026', iso: '2026-10-31', icon: '📋' },
    { label: 'Rapport papier', date: '30 novembre 2026', iso: '2026-11-30', icon: '📄' },
    { label: 'Présentation orale', date: '17 décembre 2026', iso: '2026-12-17', icon: '🎤' },
  ]
  document.getElementById('eval-deadlines').innerHTML = deadlines.map(d => {
    const days = daysUntil(d.iso)
    const cls  = days < 0 ? 'done' : days < 14 ? 'urgent' : ''
    const txt  = days < 0 ? 'Passé' : days === 0 ? "Aujourd'hui !" : `J-${days}`
    return `
      <div class="deadline-card ${cls}">
        <div class="deadline-label">${d.icon} ${d.label}</div>
        <div class="deadline-date">${d.date}</div>
        <div class="deadline-days">${txt}</div>
      </div>`
  }).join('')

  renderChecklist('eval-rapport-general',  EVAL_RAPPORT_GENERAL)
  renderChecklist('eval-rapport-seance',   EVAL_RAPPORT_SEANCE)
  renderChecklist('eval-presentation',     EVAL_PRESENTATION)

  // Sujet / trinôme (stored in topic_status as text via a hack — use a separate field)
  const evalMeta = topicStatuses['_eval_meta'] ? JSON.parse(topicStatuses['_eval_meta']) : {}
  document.getElementById('eval-sujet').value   = evalMeta.sujet   || ''
  document.getElementById('eval-trinome').value = evalMeta.trinome || ''
  document.getElementById('eval-notes').value   = evalMeta.notes   || ''
}

function renderChecklist(containerId, items) {
  const el = document.getElementById(containerId)
  el.innerHTML = items.map(item => {
    const checked = topicStatuses[item.id] === 'mastered'
    return `
      <div class="checklist-item ${checked ? 'checked' : ''}" data-eval="${item.id}">
        <div class="checklist-box">${checked ? '✓' : ''}</div>
        <span class="checklist-label">${item.label}</span>
      </div>`
  }).join('')

  el.querySelectorAll('.checklist-item').forEach(row => {
    row.addEventListener('click', async () => {
      const id      = row.dataset.eval
      const current = topicStatuses[id] || 'not_started'
      const next    = current === 'mastered' ? 'not_started' : 'mastered'
      await upsertTopicStatus(id, next)
      renderEval()
    })
  })
}

async function saveEvalMeta() {
  const meta = {
    sujet:   document.getElementById('eval-sujet').value.trim(),
    trinome: document.getElementById('eval-trinome').value.trim(),
    notes:   document.getElementById('eval-notes').value.trim(),
  }
  await upsertTopicStatus('_eval_meta', JSON.stringify(meta))
  toast('Sauvegardé ✓')
}

// ── Ressources ───────────────────────────────────────────

function renderRessources() {
  const makeCard = r => `
    <a class="resource-card" href="${r.url}" target="_blank" rel="noopener">
      <div class="resource-card-icon">${r.icon}</div>
      <div>
        <div class="resource-card-title">${r.title}</div>
        <div class="resource-card-desc">${r.desc}</div>
      </div>
      <div class="resource-card-arrow">↗</div>
    </a>`

  document.getElementById('res-mermet').innerHTML   = RESSOURCES_MERMET.map(makeCard).join('')
  document.getElementById('res-officiel').innerHTML = RESSOURCES_OFFICIEL.map(makeCard).join('')

  const now = today()
  document.getElementById('res-calendar').innerHTML = `<div class="calendar-list">` +
    CALENDAR.map(c => {
      const isPast    = c.isoStart < now
      const isCurrent = !isPast && daysUntil(c.isoStart) <= 4
      return `
        <div class="calendar-row">
          <div class="calendar-dot" style="background:${BLOCS[c.bloc].color}"></div>
          <div class="calendar-info">
            <div class="calendar-bloc">${c.label}</div>
            <div class="calendar-dates">${c.dates} — ${c.lieu}</div>
          </div>
          <span class="calendar-badge ${c.mode === 'présentiel' ? 'presentiel' : ''}">
            ${c.mode}${isCurrent ? ' 🔴 En cours' : isPast ? ' ✓' : ''}
          </span>
        </div>`
    }).join('') + `</div>`
}

// ── Event listeners ──────────────────────────────────────
document.querySelectorAll('.nav-item[data-view]').forEach(btn => {
  btn.addEventListener('click', () => navigate(btn.dataset.view))
})

document.getElementById('btn-new-day').addEventListener('click',   () => showJournalEdit(null))
document.getElementById('btn-back').addEventListener('click',      () => navigate('journal'))
document.getElementById('btn-save').addEventListener('click',      saveJournal)
document.getElementById('btn-delete').addEventListener('click',    deleteJournal)
document.getElementById('search').addEventListener('input',        e => renderJournal(e.target.value))
document.querySelectorAll('.mood-btn').forEach(btn => {
  btn.addEventListener('click', () => setMood(btn.dataset.mood))
})

document.getElementById('btn-eval-save').addEventListener('click', saveEvalMeta)

document.getElementById('btn-new-fiche').addEventListener('click',   () => showFicheEdit(null))
document.getElementById('btn-fiche-back').addEventListener('click',   () => navigate('fiches'))
document.getElementById('btn-fiche-save').addEventListener('click',   saveFiche)
document.getElementById('btn-fiche-delete').addEventListener('click', deleteFiche)

// ── Init ─────────────────────────────────────────────────
;(async () => {
  await loadAll()
  navigate('dashboard')
})()
