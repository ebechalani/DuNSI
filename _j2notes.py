# -*- coding: utf-8 -*-
import sys, urllib.request, json
sys.stdout.reconfigure(encoding='utf-8')
URL='https://tnkwbcevfyslpetuuxlu.supabase.co'
KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRua3diY2V2ZnlzbHBldHV1eGx1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkxOTkzMjMsImV4cCI6MjA5NDc3NTMyM30.bMQJwMVioi6OSYWYqXFEwGA89AompDtnr-eDg6movWw'
H={'apikey':KEY,'Authorization':'Bearer '+KEY,'Content-Type':'application/json'}

# ── 1. Enrichir la fiche HTML : FAQ + checklist de révision ──
FID='360b5cec-07ba-4a3e-9508-dde2aceebf21'
req=urllib.request.Request(URL+'/rest/v1/fiches?id=eq.'+FID+'&select=content',headers=H)
content=json.load(urllib.request.urlopen(req))[0]['content']

addon = """

10. Points délicats (FAQ)
| Question | Réponse |
|---|---|
| Pourquoi `<!DOCTYPE html>` **sans** numéro de version ? | Avant, il fallait préciser la version (HTML 3.2, 4, XHTML 1.1…). Depuis **HTML5** (standard « vivant »), il n'y a plus qu'une version → on écrit juste `<!DOCTYPE html>`. On le met **toujours** pour éviter qu'un vieux navigateur n'interprète mal la page. |
| `<strong>` vs `<b>`, `<em>` vs `<i>` ? | `<b>`/`<i>` = **présentation** (comment afficher). `<strong>`/`<em>` = **sémantique** (pourquoi c'est important / en emphase). Le rendu par défaut est gras/italique, mais le **CSS peut le changer** — d'où l'intérêt de la séparation fond/forme. |
| Pourquoi préférer les **URLs relatives** ? | Une URL **absolue** (`/…`) ou complète casse si le site est déplacé dans un **sous-répertoire**, ou si on change de domaine ou passe de HTTP à HTTPS. Une URL **relative** (`./`, `../`) suit la position du fichier → **portable**. |
| `<p>` vs `<br>` ? | `<p>` crée un **nouveau paragraphe** (unité sémantique, espacement avant/après). `<br>` est un simple **saut de ligne visuel** dans un même paragraphe. Enchaîner des `<br>` pour espacer = **mauvaise pratique** (utiliser `<p>`). |
| Le **fragment** `#` dans une URL ? | Il pointe vers l'élément ayant cet `id` (`page.html#contact` défile jusqu'à `<… id="contact">`). D'anciens frameworks JS l'utilisaient pour le **routage** côté client (moins courant aujourd'hui). |

11. À réviser (points clés pour l'examen)
- **Hiérarchie des titres** : `h1`→`h6` = hiérarchie **sémantique**, pas une taille ; pas de `h2` sans `h1` avant.
- **Structure obligatoire** : `<!DOCTYPE html>` → `<html lang="…">` → `<head>` (`charset`, `title`) → `<body>` (visible).
- **Bloc vs inline** : les blocs prennent toute la largeur et s'empilent ; les inline restent dans le flux ; **un bloc ne peut pas être enfant d'un inline**.
- **Attributs essentiels** : `href` (`<a>`), `src` + `alt` (`<img>`), `id` (unique), `class` (réutilisable), `target="_blank"`.
- **Caractères à échapper** : `<` → `&lt;`, `>` → `&gt;`, `&` → `&amp;` (les trois obligatoires).
- **Balises auto-fermantes** : `<br/>`, `<hr/>`, `<img/>`, `<input/>`, `<meta/>`, `<link/>`.
- **Sémantique vs présentation** : `<strong>` plutôt que `<b>`, `<em>` plutôt que `<i>` ; ne pas choisir `<h4>` au lieu de `<h1>` juste pour un texte plus petit.
- **Tableau** : `<table>` → `<thead>`/`<tbody>`/`<tfoot>` → `<tr>` → `<th>` ou `<td>`.
- **URL** : `protocole://domaine:port/chemin?paramètres#fragment` ; relative recommandée (`./` même dossier, `../` parent, `/` racine).
- **Rôle du `<head>`** : infos pour le navigateur (charset, titre, CSS, JS, méta) — rien de visible.
- **`div` + `class`** : créer une sémantique personnalisée quand aucune balise standard ne convient (`<div class="recette">`).
- **Imbrication** : fermer dans l'ordre **inverse** de l'ouverture (poupées russes), pas de chevauchement.
- **`lang` sur `<html>`** : langue principale (traduction auto, lecteurs d'écran)."""

if 'Points délicats (FAQ)' not in content:
    body=json.dumps({'content':content.rstrip()+addon}).encode('utf-8')
    req=urllib.request.Request(URL+'/rest/v1/fiches?id=eq.'+FID,data=body,method='PATCH',headers={**H,'Prefer':'return=minimal'})
    urllib.request.urlopen(req); print('FICHE HTML enrichie (FAQ + révision)')
else:
    print('FICHE déjà enrichie, skip')

# ── 2. Entrée de journal du 23 juin ──
def entry_exists(date,title):
    q=URL+'/rest/v1/entries?date=eq.'+date+'&select=title'
    req=urllib.request.Request(q,headers=H)
    return any(e['title']==title for e in json.load(urllib.request.urlopen(req)))

entry={
 'date':'2026-06-23',
 'title':'Jour 2 (matin) — Web : HTML',
 'bloc':'bloc1',
 'topic':'Web — HTML, CSS, client/serveur',
 'mood':'💡',
 'tasks':"""Séance en ligne (J.-M. Barbier) sur les fondamentaux du Web.
- Concept du Web : HTML, CSS, JavaScript, HTTP, URLs, DNS — séparation fond / forme.
- HTML : histoire (Tim Berners-Lee, 1989 ; GML → SGML → HTML5), balisage sémantique.
- Structure d'une page, principales balises, attributs globaux, blocs vs inline.
- Les URLs (structure, absolues vs relatives), div/class pour une sémantique locale.""",
 'learned':"""- Le balisage est SÉMANTIQUE : on dit ce qu'EST le contenu, pas comment il s'affiche (analogie style « Titre 1 » d'un traitement de texte → table des matières auto).
- Préférer <strong>/<em> à <b>/<i> ; les titres h1→h6 = hiérarchie, pas taille.
- HTML5 = standard « vivant » → <!DOCTYPE html> sans numéro de version.
- Un bloc ne peut pas être enfant d'un inline ; fermer les balises en poupées russes.
- Les URLs relatives sont portables (résistent au déplacement / changement de domaine).""",
 'notes':"""Questions que je me posais — maintenant résolues (détaillées dans la fiche « HTML : structure et balises » → section FAQ) :
- pourquoi <!DOCTYPE html> sans version ;
- <strong> vs <b> et <em> vs <i> (sémantique vs présentation) ;
- pourquoi préférer les URLs relatives ;
- <p> vs <br> ; le fragment # dans une URL.
Voir aussi les fiches : Le DOM, CSS, Client/serveur. Checklist de révision en fin de fiche HTML.""",
}
if entry_exists(entry['date'],entry['title']):
    print('ENTREE journal déjà présente, skip')
else:
    body=json.dumps(entry).encode('utf-8')
    req=urllib.request.Request(URL+'/rest/v1/entries',data=body,method='POST',headers={**H,'Prefer':'return=minimal'})
    urllib.request.urlopen(req); print('ENTREE journal du 23 juin créée')
