// Génère l'entrée TPS (JavaScript) d'un TP à partir de sa description JSON,
// pour l'insérer dans app.js sans échapper le texte à la main.
//
//   node _gen_tp.js _tp_knn.json > /tmp/entree_tp.js
//
// Le JSON attendu : { id, bloc, jour, theme, title, intro, steps: [...] }
// où chaque étape est { num, title, intro?, code, note?, questions[], correction[] }
// et chaque élément de correction est { text? , code? } (ou une simple chaîne).
const fs = require('fs')

const IND = '  '

// Chaîne sur une ligne : JSON.stringify gère guillemets, apostrophes et accents.
const s = v => JSON.stringify(v ?? '')

// Bloc multiligne : littéral gabarit, en neutralisant ce qui l'interromprait.
const tpl = v => '`' + String(v ?? '')
  .replace(/\\/g, '\\\\')
  .replace(/`/g, '\\`')
  .replace(/\$\{/g, '\\${') + '`'

function correction(items) {
  const parts = (items || []).map(c => {
    if (typeof c === 'string') return `${s(c)}`
    const champs = []
    if (c.text && c.text.trim()) champs.push(`text: ${s(c.text)}`)
    if (c.code && c.code.trim()) champs.push(`code: ${tpl(c.code)}`)
    return `{ ${champs.join(', ')} }`
  }).filter(p => p !== '{  }')
  if (!parts.length) return ''
  return `\n${IND.repeat(4)}correction: [\n` +
         parts.map(p => `${IND.repeat(5)}${p}`).join(',\n') +
         `\n${IND.repeat(4)}]`
}

function etape(st) {
  const lignes = [`${IND.repeat(4)}num: ${s(st.num)}, title: ${s(st.title)}`]
  if (st.intro && st.intro.trim()) lignes.push(`${IND.repeat(4)}intro: ${s(st.intro)}`)
  lignes.push(`${IND.repeat(4)}code: ${tpl(st.code)}`)
  if (st.note && st.note.trim()) lignes.push(`${IND.repeat(4)}note: ${s(st.note)}`)
  if (st.questions && st.questions.length) {
    lignes.push(`${IND.repeat(4)}questions: [\n` +
      st.questions.map(q => `${IND.repeat(5)}${s(q)}`).join(',\n') +
      `\n${IND.repeat(4)}]`)
  }
  const corr = correction(st.correction)
  return `${IND.repeat(3)}{\n` + lignes.join(',\n') + (corr ? ',' + corr : '') + `\n${IND.repeat(3)}}`
}

const tp = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'))
const sortie = `${IND}// ── ${tp.commentaire || tp.title} ──
${IND}{
${IND.repeat(2)}id: ${s(tp.id)}, bloc: ${s(tp.bloc)}, jour: ${s(tp.jour)},
${IND.repeat(2)}theme: ${s(tp.theme)},
${IND.repeat(2)}title: ${s(tp.title)},
${IND.repeat(2)}type: 'tp',
${IND.repeat(2)}intro: ${s(tp.intro)},
${IND.repeat(2)}steps: [
${tp.steps.map(etape).join(',\n')}
${IND.repeat(2)}]
${IND}},`

// Contrôle : le résultat doit être du JavaScript valide et redonner le même objet.
const relu = new Function(`return [\n${sortie}\n]`)()[0]
const memes = JSON.stringify(relu.steps.map(x => [x.num, x.title, x.code, x.questions || []])) ===
              JSON.stringify(tp.steps.map(x => [x.num, x.title, x.code, x.questions || []]))
if (!memes) {
  console.error('ÉCHEC : le JavaScript produit ne redonne pas les étapes d’origine.')
  process.exit(1)
}
console.error(`OK — ${relu.steps.length} étapes, ` +
  `${relu.steps.reduce((n, e) => n + (e.questions || []).length, 0)} questions, ` +
  `${relu.steps.reduce((n, e) => n + (e.correction || []).length, 0)} éléments de correction.`)
console.log(sortie)
