# Extrait et exécute tout le code Python des fiches, pour qu'aucun exemple faux
# ne parte en ligne.
#
#   python _check_code.py _fiches_algo.json        # un fichier local
#   python _check_code.py                          # toutes les fiches en ligne
#   python _check_code.py _fiches_algo.json -v     # affiche la sortie de chaque bloc
#
# Trois verdicts par bloc :
#   OK        le bloc s'exécute sans erreur
#   PARTIEL   il s'appuie sur un bloc précédent (NameError) : syntaxe vérifiée seulement
#   ÉCHEC     erreur réelle, à corriger
# Les blocs qui ne sont pas du Python (pseudo-code, formules logiques, sorties de
# programme) sont reconnus et ignorés.
import ast
import json
import os
import re
import subprocess
import sys
import urllib.request

URL = 'https://tnkwbcevfyslpetuuxlu.supabase.co'
ANON = ('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRua3diY2V2ZnlzbHBldHV1eGx1Iiwi'
        'cm9sZSI6ImFub24iLCJpYXQiOjE3NzkxOTkzMjMsImV4cCI6MjA5NDc3NTMyM30.bMQJwMVioi6OSYWYqXFEwGA89AompDtnr-eDg6movWw')

# Modules absents de cet environnement : on vérifie la syntaxe sans exécuter.
ABSENTS = ('sklearn', 'pandas', 'numpy', 'pytest', 'matplotlib')
# Un bloc doit ressembler à du Python pour qu'un échec de syntaxe compte comme un défaut.
PYTHONESQUE = re.compile(r'^\s*(def |class |import |from |for |while |if |print\(|assert |\w+\s*=[^=])', re.M)


def fiches():
    if len(sys.argv) > 1 and not sys.argv[1].startswith('-'):
        return json.load(open(sys.argv[1], encoding='utf-8'))
    req = urllib.request.Request(f'{URL}/rest/v1/fiches?select=title,content,exercices',
                                 headers={'apikey': ANON})
    with urllib.request.urlopen(req, timeout=60) as r:
        return json.load(r)


def executer(code):
    """Renvoie (verdict, détail)."""
    try:
        ast.parse(code)
    except SyntaxError as e:
        if PYTHONESQUE.search(code):
            return 'ÉCHEC', f'syntaxe ligne {e.lineno} : {e.msg}'
        return 'IGNORÉ', 'pas du Python (pseudo-code, formule ou sortie de programme)'
    if any(m in code for m in ABSENTS) or 'input(' in code:
        return 'IGNORÉ', 'dépend d\'un module absent ici, ou attend une saisie'
    enrichi = ('import math, random\n' + code) if re.search(r'\b(math|random)\.', code) else code
    try:
        r = subprocess.run([sys.executable, '-c', enrichi], capture_output=True, text=True,
                           timeout=60, env={'PATH': '/usr/bin:/bin', 'MPLBACKEND': 'Agg'})
    except subprocess.TimeoutExpired:
        return 'ÉCHEC', 'dépassement du temps imparti (boucle infinie ?)'
    if r.returncode == 0:
        return 'OK', (r.stdout or '').strip()
    derniere = (r.stderr.strip().splitlines() or [''])[-1]
    if derniere.startswith(('NameError', 'IndentationError')):
        return 'PARTIEL', derniere
    return 'ÉCHEC', derniere


def main():
    verbeux = '-v' in sys.argv
    compte = {'OK': 0, 'PARTIEL': 0, 'IGNORÉ': 0, 'ÉCHEC': 0}
    echecs = []
    for f in fiches():
        for champ in ('content', 'exercices'):
            for n, bloc in enumerate(re.findall(r'```\n(.*?)```', f.get(champ) or '', re.S), 1):
                verdict, detail = executer(bloc)
                compte[verdict] += 1
                ou = f"{f['title'][:46]} / {champ} #{n}"
                if verdict == 'ÉCHEC':
                    echecs.append((ou, detail))
                elif verbeux:
                    print(f'  {verdict:8} {ou} {detail[:70]}')
    total = sum(compte.values())
    print(f"\n{total} blocs de code : {compte['OK']} exécutés, {compte['PARTIEL']} partiels "
          f"(suite d'un bloc précédent), {compte['IGNORÉ']} non exécutables ici, "
          f"{compte['ÉCHEC']} en échec.")
    if echecs:
        print('\nÉCHECS :')
        for ou, detail in echecs:
            print(f'  • {ou}\n      {detail[:160]}')
    sys.exit(1 if echecs else 0)


if __name__ == '__main__':
    main()
