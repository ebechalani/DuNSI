// Vérifie qu'un contenu de fiche s'affichera correctement, en exécutant le VRAI
// moteur de rendu du site (les fonctions de app.js) plutôt qu'en devinant.
//
//   node _check_rendu.js _fiches_knn.json
//   node _check_rendu.js          (contrôle toutes les fiches déjà en ligne)
//
// Sort en code 1 si un problème bloquant est détecté.
const fs = require('fs')
const path = require('path')

// ── On extrait de app.js les fonctions de rendu, sans exécuter le reste
// (app.js est un module ES qui importe Supabase : impossible à charger tel quel).
const src = fs.readFileSync(path.join(__dirname, 'app.js'), 'utf8')
function extraire(nom) {
  const debut = src.indexOf(`function ${nom}(`)
  if (debut < 0) throw new Error(`fonction ${nom} introuvable dans app.js`)
  // On avance jusqu'à l'accolade fermante de même niveau
  let i = src.indexOf('{', debut), profondeur = 0
  for (; i < src.length; i++) {
    if (src[i] === '{') profondeur++
    else if (src[i] === '}') { profondeur--; if (profondeur === 0) return src.slice(debut, i + 1) }
  }
  throw new Error(`fin de ${nom} introuvable`)
}
const MOTEUR = ['escapeHtml', 'inlineFmt', 'mdTable', 'renderProseChunk', 'renderBlock', 'formatProse']
  .map(extraire).join('\n')
const formatProse = new Function(`${MOTEUR}; return formatProse`)()

// ── Contrôles ────────────────────────────────────────────────────────────
// BLOQUANT   : le contenu s'affiche mal ou disparaît.
// STYLE      : s'affiche correctement (.doc-para est en white-space: pre-wrap)
//              mais s'écarte de la mise en forme retenue pour les fiches récentes.
function controler(champ, texte) {
  const bloquants = [], styles = []
  if (!texte || !texte.trim()) return { bloquants, styles }

  const fences = (texte.match(/```/g) || []).length
  if (fences % 2 !== 0) bloquants.push(`délimiteurs de code impairs (${fences}) : la suite de la fiche est avalée`)

  const html = formatProse(texte)

  // Ligne de séparation d'un VRAI tableau markdown : uniquement des tirets (et des
  // deux-points d'alignement) entre les barres, au moins deux colonnes. Cela écarte
  // les schémas ASCII du type « |---------> » qui vivent légitimement dans du code.
  const SEPARATEUR = /^\s*\|(?:\s*:?-{2,}:?\s*\|){2,}\s*$/m

  // Un tableau markdown tombé dans un bloc de code = fence mal placée
  const codes = [...html.matchAll(/<pre class="doc-code">([\s\S]*?)<\/pre>/g)].map(m => m[1])
  codes.forEach(c => {
    if (SEPARATEUR.test(c)) bloquants.push('un tableau markdown se retrouve dans un bloc de code')
  })

  const proses = [...html.matchAll(/<p class="doc-(?:para|subheading)">([\s\S]*?)<\/p>/g)].map(m => m[1])
  proses.forEach(p => {
    if (p.includes('```')) bloquants.push('délimiteur de code resté dans la prose')
    // Uniquement de vraies commandes LaTeX : « $$ » est la variable bash du PID,
    // pas une formule, et le shell est omniprésent dans ces fiches.
    if (/\\(frac|sqrt|sum|int|begin\{|end\{|mathrm|cdot)/.test(p)) {
      bloquants.push('formule LaTeX non rendue, affichée telle quelle')
    }
    // « # » en début de ligne : commentaire shell le plus souvent, pas un titre
    // markdown. Rendu lisible grâce à white-space: pre-wrap → simple écart de style.
    if (/^#{1,6}\s/m.test(p)) styles.push('lignes commençant par "#" (commentaire shell ou titre markdown) hors bloc de code')
    if (/^\s*[-*]\s+\S/m.test(p)) styles.push('puces markdown (rendues comme lignes de texte)')
  })

  // Une ligne de tableau qui n'a pas produit de <table> = ligne de séparation manquante
  const lignesTableau = texte.split('\n').filter(l => /^\s*\|.*\|\s*$/.test(l)).length
  const tableaux = (html.match(/<table/g) || []).length
  if (lignesTableau > 0 && tableaux === 0 && !codes.some(c => c.includes('|'))) {
    bloquants.push(`${lignesTableau} ligne(s) de tableau sans séparation |---|---| : aucun tableau produit`)
  }

  if (champ === 'content' && !/^\d+\)\s+\S/m.test(texte)) {
    styles.push('pas de section "1) TITRE" (mise en forme des fiches antérieures)')
  }
  return { bloquants, styles: [...new Set(styles)] }
}

function stats(texte) {
  const html = formatProse(texte || '')
  return {
    blocsCode: (html.match(/<pre class="doc-code">/g) || []).length,
    tableaux: (html.match(/<table/g) || []).length,
    sections: (html.match(/doc-subheading/g) || []).length,
    paragraphes: (html.match(/doc-para/g) || []).length,
  }
}

// ── Entrée ───────────────────────────────────────────────────────────────
async function fiches() {
  const arg = process.argv[2]
  if (arg) return JSON.parse(fs.readFileSync(path.resolve(arg), 'utf8'))
  const URL = 'https://tnkwbcevfyslpetuuxlu.supabase.co'
  const ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRua3diY2V2ZnlzbHBldHV1eGx1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkxOTkzMjMsImV4cCI6MjA5NDc3NTMyM30.bMQJwMVioi6OSYWYqXFEwGA89AompDtnr-eDg6movWw'
  const r = await fetch(`${URL}/rest/v1/fiches?select=title,content,exercices,objectifs`, { headers: { apikey: ANON } })
  return r.json()
}

fiches().then(liste => {
  let nbBloquants = 0, nbStyle = 0
  const verbeux = process.argv.includes('--tout')
  for (const f of liste) {
    const c = controler('content', f.content)
    const e = controler('exercices', f.exercices)
    const bloquants = [...c.bloquants.map(p => ['content', p]), ...e.bloquants.map(p => ['exercices', p])]
    const styles = [...new Set([...c.styles, ...e.styles])]
    const s = stats(f.content)
    const resume = `${s.sections} sections · ${s.blocsCode} code · ${s.tableaux} tableaux · ${s.paragraphes} §`
    nbBloquants += bloquants.length
    nbStyle += styles.length ? 1 : 0
    if (bloquants.length) {
      console.log(`\n✗ ${f.title}\n   ${resume}`)
      bloquants.forEach(([champ, p]) => console.log(`   [${champ}] ${p}`))
    } else if (verbeux || !styles.length) {
      const marque = styles.length ? '~' : '✓'
      console.log(`${marque} ${f.title.slice(0, 60).padEnd(60)} ${resume}` +
                  (styles.length ? `\n     style : ${styles.join(' ; ')}` : ''))
    }
  }
  console.log(`\n${liste.length} fiche(s) contrôlée(s) : ${nbBloquants} défaut(s) d'affichage bloquant(s), ` +
              `${nbStyle} fiche(s) au format antérieur (affichage correct).`)
  if (!verbeux) console.log('(--tout pour lister aussi les fiches au format antérieur)')
  process.exit(nbBloquants ? 1 : 0)
})
