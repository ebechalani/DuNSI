# Insère les fiches « Algorithmes gloutons » (TP FDIU, Bloc 2) dans la table Supabase `fiches`, et enregistre les deux
# ressources du jour (PDF du cours, script de solution du TP) servies depuis le dépôt.
#
#   python _add_fiches_gloutons.py            # insère fiches + ressources
#   python _add_fiches_gloutons.py --check    # vérifie le JSON sans rien envoyer
#
# Le contenu des fiches vit dans _fiches_gloutons.json (à côté de ce fichier) : du JSON
# plutôt que du Python, pour que les blocs de code des fiches n'aient pas à être échappés.
import sys, json, os, urllib.request, urllib.error
sys.stdout.reconfigure(encoding='utf-8')

URL = 'https://tnkwbcevfyslpetuuxlu.supabase.co'
ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRua3diY2V2ZnlzbHBldHV1eGx1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkxOTkzMjMsImV4cCI6MjA5NDc3NTMyM30.bMQJwMVioi6OSYWYqXFEwGA89AompDtnr-eDg6movWw'

HERE = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(HERE, '_fiches_gloutons.json')

BLOC = 'bloc2'
TOPIC = 'Algorithmes gloutons'

# Fichiers servis directement depuis le dépôt (file_path relatif → aucun egress Supabase)
RESSOURCES = [
    {'title': 'TP — Les algorithmes gloutons (notebook FDIU)',
     'bloc': BLOC, 'topic': TOPIC,
     'description': "Notebook original du TP : problèmes d'optimisation, conversion décimal/binaire, rendu de "
                    "monnaie et systèmes canoniques, sac à dos avec deux critères, planning de conférenciers, "
                    "recherche exhaustive récursive et programmation dynamique. Ouvrable dans Basthon.",
     'file_path': 'ressources/glouton/FDIU_algorithmes_gloutons.ipynb',
     'file_name': 'FDIU_algorithmes_gloutons.ipynb', 'file_type': 'application/x-ipynb+json'},
    {'title': 'TP gloutons — solutions complètes commentées',
     'bloc': BLOC, 'topic': TOPIC,
     'description': "Script Python autonome : toutes les fonctions laissées à trous dans le notebook, plus les "
                    "références exhaustives (rendu de monnaie et sac à dos optimaux) qui permettent de vérifier "
                    "quand le glouton se trompe. S'exécute de bout en bout et vérifie ses propres résultats.",
     'file_path': 'ressources/glouton/solution_gloutons.py',
     'file_name': 'solution_gloutons.py', 'file_type': 'text/x-python'},
]


def post(table, rows):
    req = urllib.request.Request(
        f"{URL}/rest/v1/{table}",
        data=json.dumps(rows, ensure_ascii=False).encode('utf-8'),
        method='POST',
        headers={'apikey': ANON, 'Authorization': 'Bearer ' + ANON,
                 'Content-Type': 'application/json', 'Prefer': 'return=minimal'})
    try:
        with urllib.request.urlopen(req, timeout=60) as r:
            print(f"INSERT {table}", r.status, f"— {len(rows)} ligne(s)")
            return True
    except urllib.error.HTTPError as e:
        print(f"ERR {table}", e.code, e.read().decode())
        return False


def charger():
    fiches = json.load(open(DATA, encoding='utf-8'))
    rows = []
    for i, f in enumerate(fiches):
        rows.append({
            'title': f['title'],
            'bloc': BLOC,
            'topic': TOPIC,
            # Ordre du cours : une minute d'écart suffit, le site trie par created_at
            'created_at': f"2026-09-25T09:{i:02d}:00+00:00",
            'summary': f['summary'],
            'objectifs': f['objectifs'],
            'content': f['content'],
            'exercices': f['exercices'],
            'code_example': None,   # le code est intercalé dans content (blocs ```)
        })
    return rows


def verifier(rows):
    ok = True
    for r in rows:
        fences = r['content'].count('```') + (r['exercices'] or '').count('```')
        pair = fences % 2 == 0
        ok = ok and pair
        print(f"{r['title'][:58]:58} fences={fences:3} {'OK' if pair else '!! IMPAIR'}")
    return ok


def main():
    rows = charger()
    if not verifier(rows):
        print("Blocs de code déséquilibrés — insertion annulée.")
        return
    if '--check' in sys.argv:
        for r in RESSOURCES:
            chemin = os.path.join(HERE, r['file_path'])
            print(f"{r['file_name']:24} {'présent' if os.path.exists(chemin) else 'ABSENT'}")
        return
    if not post('fiches', rows):
        return
    ressources = []
    for r in RESSOURCES:
        chemin = os.path.join(HERE, r['file_path'])
        if not os.path.exists(chemin):
            print(f"ATTENTION : {r['file_path']} absent du dépôt, ressource ignorée")
            continue
        ressources.append({**r, 'file_size': os.path.getsize(chemin)})
    if ressources:
        post('ressources', ressources)


if __name__ == '__main__':
    main()
