# Publie un lot de contenus dans Supabase : fiches nouvelles, ressources servies depuis le dépôt,
# et correctifs ciblés de fiches déjà en ligne. Tout est décrit dans un manifeste JSON.
#
#   python3 _publier_lot.py _lot_2026-11.json            # vérifie puis publie
#   python3 _publier_lot.py _lot_2026-11.json --check    # vérifie sans rien envoyer
#
# Le script est rejouable : une fiche dont le titre existe déjà n'est pas réinsérée, une ressource
# dont le file_path existe déjà non plus, et un correctif déjà appliqué est sauté.
#
# Manifeste :
# {
#   "fiches":     [ { "file": "_fiches_x.json", "bloc": "bloc2", "topic": "…", "date": "2026-10-01T09" } ],
#   "ressources": [ { "title", "bloc", "topic", "description", "file_path", "file_name", "file_type" } ],
#   "patches":    [ { "fiche_id", "field", "old", "new", "why" } ]
# }
# Dans un fichier de fiches, l'ordre du tableau est l'ordre du cours : la fiche i reçoit
# created_at = <date>:<i minutes>, et le site trie par created_at.
import sys, json, os, urllib.request, urllib.error, urllib.parse
sys.stdout.reconfigure(encoding='utf-8')

URL = 'https://tnkwbcevfyslpetuuxlu.supabase.co'
ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRua3diY2V2ZnlzbHBldHV1eGx1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkxOTkzMjMsImV4cCI6MjA5NDc3NTMyM30.bMQJwMVioi6OSYWYqXFEwGA89AompDtnr-eDg6movWw'
HERE = os.path.dirname(os.path.abspath(__file__))
CHAMPS = ('summary', 'objectifs', 'content', 'exercices')


def requete(methode, chemin, corps=None, prefer='return=minimal'):
    data = json.dumps(corps).encode('utf-8') if corps is not None else None
    req = urllib.request.Request(f'{URL}/rest/v1/{chemin}', data=data, method=methode, headers={
        'apikey': ANON, 'Authorization': 'Bearer ' + ANON,
        'Content-Type': 'application/json', 'Prefer': prefer})
    with urllib.request.urlopen(req, timeout=60) as r:
        texte = r.read().decode('utf-8')
        return r.status, (json.loads(texte) if texte.strip() else None)


def lire(table, select, **filtres):
    q = '&'.join([f'select={select}'] + [f'{k}=eq.{urllib.parse.quote(str(v))}' for k, v in filtres.items()])
    return requete('GET', f'{table}?{q}')[1]


def fiches_du_manifeste(m):
    lignes = []
    for lot in m.get('fiches', []):
        donnees = json.load(open(os.path.join(HERE, lot['file']), encoding='utf-8'))
        for i, f in enumerate(donnees):
            lignes.append({
                'title': f['title'], 'bloc': lot['bloc'], 'topic': lot['topic'],
                'created_at': f"{lot['date']}:{i:02d}:00+00:00",
                **{c: f.get(c) or '' for c in CHAMPS},
                'code_example': None,   # le code est intercalé dans content (blocs ```)
            })
    return lignes


def verifier(m, fiches):
    ok = True
    titres = [f['title'] for f in fiches]
    for t in set(titres):
        if titres.count(t) > 1:
            print(f'!! titre en double dans le lot : {t}'); ok = False
    for f in fiches:
        fences = f['content'].count('```') + f['exercices'].count('```')
        if fences % 2:
            print(f"!! blocs de code impairs : {f['title']}"); ok = False
        if not f['content'].lstrip().startswith('1)'):
            print(f"!! le contenu ne commence pas par « 1) » : {f['title']}"); ok = False
    for r in m.get('ressources', []):
        if not os.path.exists(os.path.join(HERE, r['file_path'])):
            print(f"!! ressource absente du dépôt : {r['file_path']}"); ok = False
    for p in m.get('patches', []):
        if p['field'] not in CHAMPS:
            print(f"!! champ non modifiable : {p['field']}"); ok = False
    print(f"{len(fiches)} fiche(s), {len(m.get('ressources', []))} ressource(s), "
          f"{len(m.get('patches', []))} correctif(s) — {'OK' if ok else 'ERREURS'}")
    return ok


def publier_fiches(fiches):
    existantes = {f['title'] for f in requete('GET', 'fiches?select=title')[1]}
    nouvelles = [f for f in fiches if f['title'] not in existantes]
    for f in fiches:
        if f['title'] in existantes:
            print(f"  déjà en ligne : {f['title']}")
    if nouvelles:
        st, _ = requete('POST', 'fiches', nouvelles)
        print(f'INSERT fiches {st} — {len(nouvelles)} fiche(s)')


def publier_ressources(ressources):
    existantes = {r['file_path'] for r in requete('GET', 'ressources?select=file_path')[1]}
    nouvelles = []
    for r in ressources:
        if r['file_path'] in existantes:
            print(f"  déjà enregistrée : {r['file_path']}"); continue
        nouvelles.append({**r, 'file_size': os.path.getsize(os.path.join(HERE, r['file_path']))})
    if nouvelles:
        st, _ = requete('POST', 'ressources', nouvelles)
        print(f'INSERT ressources {st} — {len(nouvelles)} ressource(s)')


def appliquer_patches(patches):
    for p in patches:
        lignes = lire('fiches', f"id,title,{p['field']}", id=p['fiche_id'])
        if not lignes:
            print(f"!! fiche introuvable : {p['fiche_id']}"); continue
        actuel = lignes[0][p['field']] or ''
        n = actuel.count(p['old'])
        if n == 0 and p['new'] in actuel:
            print(f"  déjà appliqué : {lignes[0]['title']} / {p['field']}"); continue
        if n != 1:
            print(f"!! « old » trouvé {n} fois dans {lignes[0]['title']} / {p['field']} — correctif sauté"); continue
        st, rep = requete('PATCH', f"fiches?id=eq.{p['fiche_id']}",
                          {p['field']: actuel.replace(p['old'], p['new'])}, prefer='return=representation')
        if not rep:
            print(f"!! PATCH {st} sans effet (droits ?) : {lignes[0]['title']}"); continue
        print(f"PATCH {st} — {lignes[0]['title']} / {p['field']} : {p.get('why', '')[:70]}")


def main():
    if len(sys.argv) < 2:
        print(__doc__ or 'usage : python3 _publier_lot.py manifeste.json [--check]'); return
    m = json.load(open(sys.argv[1], encoding='utf-8'))
    fiches = fiches_du_manifeste(m)
    if not verifier(m, fiches) or '--check' in sys.argv:
        return
    try:
        publier_fiches(fiches)
        publier_ressources(m.get('ressources', []))
        appliquer_patches(m.get('patches', []))
    except urllib.error.HTTPError as e:
        print('ERREUR HTTP', e.code, e.read().decode())


if __name__ == '__main__':
    main()
