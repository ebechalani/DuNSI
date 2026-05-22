# -*- coding: utf-8 -*-
import sys, json, urllib.request, urllib.error
sys.stdout.reconfigure(encoding='utf-8')

URL = 'https://tnkwbcevfyslpetuuxlu.supabase.co'
ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRua3diY2V2ZnlzbHBldHV1eGx1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkxOTkzMjMsImV4cCI6MjA5NDc3NTMyM30.bMQJwMVioi6OSYWYqXFEwGA89AompDtnr-eDg6movWw'
H = {"apikey": ANON, "Authorization": "Bearer " + ANON, "Content-Type": "application/json", "Prefer": "return=minimal"}

content = """1) OBJECTIF
Lire un fichier de données data.csv contenant des points (x, y) — une paire par ligne, séparée par une virgule, sans en-tête — et tracer la courbe correspondante.

2) LES DONNÉES (data.csv)
```
1,0
2,3
3,5
5,9
6,10
7,11
8,15
9,16
```

3) SOLUTION AVEC pandas (comme dans l'énoncé)
```
import pandas as pd
import matplotlib.pyplot as plt

# header=None : pas de ligne d'en-tête ; names : on nomme les colonnes
df = pd.read_csv('data.csv', header=None, names=['x', 'y'])
print(df.head())          # aperçu

x = df['x']
y = df['y']

plt.figure(figsize=(10, 6))
plt.plot(x, y, marker='o', linestyle='-', color='blue')
plt.title('Courbe à partir du fichier CSV')
plt.xlabel('Axe X'); plt.ylabel('Axe Y')
plt.grid(True, linestyle='--', alpha=0.7)
plt.tight_layout()
plt.show()
```

4) VARIANTE SANS pandas (plus proche du programme NSI)
pandas n'est pas indispensable : le module csv suffit pour lire le fichier en deux listes.
```
import csv
import matplotlib.pyplot as plt

xs, ys = [], []
with open('data.csv', newline='', encoding='utf-8') as f:
    for ligne in csv.reader(f):
        xs.append(float(ligne[0]))
        ys.append(float(ligne[1]))

plt.plot(xs, ys, marker='o', color='blue')
plt.title('Courbe à partir du CSV (sans pandas)')
plt.xlabel('x'); plt.ylabel('y'); plt.grid(True)
plt.show()
```

5) POUR EXÉCUTER EN LIGNE (Basthon)
Comme Basthon n'a pas accès à tes fichiers, crée d'abord data.csv en mémoire :
```
contenu = "1,0\\n2,3\\n3,5\\n5,9\\n6,10\\n7,11\\n8,15\\n9,16"
with open('data.csv', 'w', encoding='utf-8') as f:
    f.write(contenu)
```

6) CE QU'IL FAUT COMPRENDRE
Un CSV est un simple fichier texte : chaque ligne « x,y » est découpée sur la virgule. ATTENTION : les valeurs lues sont des CHAÎNES, il faut les convertir en float pour tracer et calculer. pandas automatise lecture et conversion ; le module csv (au programme NSI) fait la même chose « à la main ». Le marqueur 'o' affiche les points, la ligne '-' les relie.

7) POUR ALLER PLUS LOIN
Ces points sont presque alignés : calcule et trace la droite de régression par-dessus (voir le projet « Droite de régression »)."""

row = {
    "bloc": "bloc0",
    "topic": "Projet · Graphique & simulation",
    "title": "Projet — Tracer une courbe depuis un fichier CSV",
    "summary": ("Lire un fichier data.csv de points (x, y) et tracer la courbe avec matplotlib. "
                "Deux versions : avec pandas (read_csv) et sans pandas (module csv, plus proche du "
                "programme NSI). Conversion des valeurs texte en nombres et exécution dans Basthon."),
    "objectifs": ("- Lire un fichier CSV (avec pandas et avec le module csv).\n"
                  "- Convertir des données texte en nombres.\n"
                  "- Tracer une courbe (points + ligne) avec matplotlib.\n"
                  "- Savoir exécuter le projet en ligne (créer le fichier en mémoire)."),
    "content": content,
    "code_example": "",
    "exercices": ("Extension 1 — Ajouter la droite de régression (np.polyfit) par-dessus le nuage.\n"
                  "Extension 2 — Calculer et afficher la moyenne des y, le min et le max.\n"
                  "Extension 3 — Gérer un CSV avec une ligne d'en-tête (sauter la première ligne)."),
    "created_at": "2026-05-21T13:50:00+00:00",
}

data = json.dumps([row]).encode("utf-8")
req = urllib.request.Request(URL + "/rest/v1/fiches", data=data, method="POST", headers=H)
try:
    with urllib.request.urlopen(req) as r:
        print("INSERT OK", r.status)
except urllib.error.HTTPError as e:
    print("ERR", e.code, e.read().decode())
