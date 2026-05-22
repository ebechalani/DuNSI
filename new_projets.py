# -*- coding: utf-8 -*-
import json, time, urllib.request, urllib.error

URL = 'https://tnkwbcevfyslpetuuxlu.supabase.co'
ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRua3diY2V2ZnlzbHBldHV1eGx1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkxOTkzMjMsImV4cCI6MjA5NDc3NTMyM30.bMQJwMVioi6OSYWYqXFEwGA89AompDtnr-eDg6movWw'
H = {"apikey": ANON, "Authorization": "Bearer " + ANON, "Content-Type": "application/json", "Prefer": "return=minimal"}

ALG = 'Projet · Algorithmique & maths'
JEU = 'Projet · Jeux'
CRY = 'Projet · Cryptographie'
STR = 'Projet · Structures de données'
GRA = 'Projet · Graphique & simulation'

# (categorie, titre, summary, objectifs, content, exercices)  -- content en texte brut (``` = bloc code)
P = []

P.append((ALG, "Projet — Crible d'Ératosthène",
 "Trouver tous les nombres premiers jusqu'à n en éliminant les multiples.",
 "- Manipuler une liste de booléens.\n- Comprendre une optimisation (s'arrêter à la racine de n).",
 """1) OBJECTIF
Lister tous les nombres premiers inférieurs ou égaux à n. Un nombre premier n'a que deux diviseurs : 1 et lui-même.

2) SOLUTION COMMENTÉE
On part du principe que tous les nombres sont premiers, puis on barre les multiples de chaque premier trouvé.
```
def crible(n):
    est_premier = [True] * (n + 1)
    est_premier[0] = est_premier[1] = False
    for i in range(2, int(n ** 0.5) + 1):
        if est_premier[i]:
            for multiple in range(i * i, n + 1, i):
                est_premier[multiple] = False
    return [i for i in range(n + 1) if est_premier[i]]

print(crible(30))   # [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]
```

3) CE QU'IL FAUT COMPRENDRE
On ne teste les diviseurs que jusqu'à la racine de n (au-delà, les multiples ont déjà été barrés). On commence à barrer à i*i car les multiples plus petits l'ont déjà été par des premiers inférieurs.

4) POUR ALLER PLUS LOIN
Compter combien il y a de premiers inférieurs à 10000 et mesurer le temps.""",
 "Extension 1 — Afficher uniquement le nombre de premiers ≤ n.\nExtension 2 — Comparer le temps avec une méthode naïve (tester chaque nombre)."))

P.append((ALG, "Projet — Tri rapide et tri fusion",
 "Implémenter deux tris récursifs efficaces (diviser pour régner) en O(n log n).",
 "- Écrire un algorithme récursif.\n- Comprendre le principe « diviser pour régner ».",
 """1) OBJECTIF
Trier une liste avec deux algorithmes récursifs plus efficaces que les tris quadratiques : le tri rapide (quicksort) et le tri fusion (mergesort).

2) SOLUTION COMMENTÉE
Tri rapide : on choisit un pivot, on range les plus petits à gauche, les plus grands à droite, puis on recommence sur chaque côté.
```
def tri_rapide(lst):
    if len(lst) <= 1:
        return lst
    pivot = lst[0]
    petits = [x for x in lst[1:] if x < pivot]
    grands = [x for x in lst[1:] if x >= pivot]
    return tri_rapide(petits) + [pivot] + tri_rapide(grands)
```
Tri fusion : on coupe la liste en deux, on trie chaque moitié, puis on fusionne les deux listes triées.
```
def fusion(a, b):
    res = []
    i = j = 0
    while i < len(a) and j < len(b):
        if a[i] <= b[j]:
            res.append(a[i]); i += 1
        else:
            res.append(b[j]); j += 1
    return res + a[i:] + b[j:]

def tri_fusion(lst):
    if len(lst) <= 1:
        return lst
    m = len(lst) // 2
    return fusion(tri_fusion(lst[:m]), tri_fusion(lst[m:]))
```

3) CE QU'IL FAUT COMPRENDRE
Les deux sont en O(n log n) : bien plus rapides que les tris par sélection/insertion en O(n²). Le tri fusion garantit toujours O(n log n) ; le tri rapide est très rapide en moyenne mais dépend du choix du pivot.

4) POUR ALLER PLUS LOIN
Comparer les temps des 4 tris (sélection, insertion, rapide, fusion) sur de grandes listes.""",
 "Extension 1 — Chronométrer tri_rapide et tri_fusion sur une liste de 10000 éléments.\nExtension 2 — Que se passe-t-il pour tri_rapide sur une liste déjà triée ? (pivot mal choisi)"))

P.append((ALG, "Projet — Conversion de bases",
 "Convertir un nombre entre base 10, base 2 (binaire) et base 16 (hexadécimal).",
 "- Utiliser le modulo et la division entière.\n- Construire une chaîne caractère par caractère.",
 """1) OBJECTIF
Écrire un programme qui convertit un entier de la base 10 vers le binaire, et inversement. Comprendre comment l'ordinateur représente les nombres.

2) SOLUTION COMMENTÉE
Pour passer en binaire, on prend les restes des divisions successives par 2, dans l'ordre inverse.
```
def decimal_vers_binaire(n):
    if n == 0:
        return "0"
    bits = ""
    while n > 0:
        bits = str(n % 2) + bits   # on ajoute le reste DEVANT
        n = n // 2
    return bits

print(decimal_vers_binaire(13))   # 1101
print(int("1101", 2))             # 13   (binaire -> décimal)
print(bin(13), hex(255))          # 0b1101 0xff (fonctions intégrées)
```

3) CE QU'IL FAUT COMPRENDRE
n % 2 donne le bit de poids faible, n // 2 « décale » vers la droite. On reconstruit la chaîne en ajoutant chaque reste devant. Python fournit aussi bin(), hex() et int(s, base) tout faits.

4) POUR ALLER PLUS LOIN
Écrire la conversion vers l'hexadécimal (base 16, chiffres 0-9 puis A-F).""",
 "Extension 1 — Écrire decimal_vers_base(n, b) pour une base quelconque (2 à 16).\nExtension 2 — Écrire la conversion binaire -> décimal à la main (sans int)."))

P.append((ALG, "Projet — Approximation de π (Monte-Carlo)",
 "Estimer le nombre π par une méthode probabiliste (tir aléatoire dans un carré).",
 "- Utiliser le hasard (random).\n- Relier une proportion géométrique à π.",
 """1) OBJECTIF
Estimer π en tirant des points au hasard dans un carré et en comptant ceux qui tombent dans le quart de cercle inscrit.

2) SOLUTION COMMENTÉE
La proportion de points dans le quart de cercle vaut π/4. On multiplie donc par 4.
```
import random

def estimer_pi(n):
    dedans = 0
    for _ in range(n):
        x, y = random.random(), random.random()   # entre 0 et 1
        if x * x + y * y <= 1:                     # dans le quart de cercle
            dedans += 1
    return 4 * dedans / n

print(estimer_pi(100000))   # ≈ 3.14...
```

3) CE QU'IL FAUT COMPRENDRE
Aire du quart de cercle = π/4 ; aire du carré = 1. Le rapport des points (dedans / total) approche ce rapport d'aires. Plus n est grand, plus l'estimation est précise : c'est une méthode de Monte-Carlo.

4) POUR ALLER PLUS LOIN
Afficher l'erreur (écart avec math.pi) pour n = 100, 1000, 100000.""",
 "Extension 1 — Tracer les points (dedans en bleu, dehors en rouge) avec matplotlib.\nExtension 2 — Observer comment l'erreur diminue quand n augmente."))

P.append((ALG, "Projet — PGCD (algorithme d'Euclide)",
 "Calculer le plus grand commun diviseur de deux entiers, version itérative et récursive.",
 "- Comprendre l'algorithme d'Euclide.\n- Écrire la même fonction de deux façons.",
 """1) OBJECTIF
Calculer le PGCD de deux entiers avec l'algorithme d'Euclide : le PGCD de a et b est le même que celui de b et du reste de a par b.

2) SOLUTION COMMENTÉE
```
def pgcd(a, b):
    while b != 0:
        a, b = b, a % b      # on remplace (a, b) par (b, reste)
    return a

def pgcd_rec(a, b):
    return a if b == 0 else pgcd_rec(b, a % b)

print(pgcd(36, 24))      # 12
print(pgcd_rec(36, 24))  # 12
```

3) CE QU'IL FAUT COMPRENDRE
À chaque étape, on remplace le couple (a, b) par (b, a % b) ; le reste diminue strictement, donc on finit par atteindre b = 0, et la réponse est alors a. La version récursive traduit directement cette égalité.

4) POUR ALLER PLUS LOIN
En déduire le PPCM : ppcm(a, b) = a * b // pgcd(a, b).""",
 "Extension 1 — Écrire ppcm(a, b) à partir de pgcd.\nExtension 2 — Compter le nombre d'étapes de l'algorithme pour deux grands nombres."))

# ── JEUX ──
P.append((JEU, "Projet — Le Pendu",
 "Deviner un mot lettre par lettre, avec un nombre d'essais limité.",
 "- Manipuler chaînes et ensembles.\n- Gérer une boucle de jeu avec condition de fin.",
 """1) OBJECTIF
L'ordinateur choisit un mot ; le joueur propose des lettres. Chaque erreur coûte un essai. Le joueur gagne s'il complète le mot avant d'épuiser ses essais.

2) SOLUTION COMMENTÉE
```
import random

def pendu():
    mots = ["python", "ordinateur", "algorithme", "variable"]
    mot = random.choice(mots)
    trouvees = set()
    essais = 6
    while essais > 0:
        affichage = "".join(c if c in trouvees else "_" for c in mot)
        print(affichage, "  essais restants :", essais)
        if "_" not in affichage:
            print("Gagné !"); return
        lettre = input("Propose une lettre : ").lower()
        if lettre in mot:
            trouvees.add(lettre)
        else:
            essais -= 1
    print("Perdu ! Le mot était :", mot)

pendu()
```

3) CE QU'IL FAUT COMPRENDRE
L'ensemble trouvees mémorise les bonnes lettres. L'affichage se reconstruit à chaque tour avec une compréhension : chaque lettre du mot devient elle-même si trouvée, sinon « _ ». La partie s'arrête quand il n'y a plus de « _ » (gagné) ou plus d'essais (perdu).

4) POUR ALLER PLUS LOIN
Charger les mots depuis un fichier et dessiner le pendu au fil des erreurs.""",
 "Extension 1 — Lire la liste de mots depuis un fichier .txt.\nExtension 2 — Afficher un dessin ASCII du pendu selon le nombre d'erreurs."))

P.append((JEU, "Projet — Morpion (Tic-Tac-Toe)",
 "Jeu du morpion à deux joueurs sur une grille 3×3, avec détection du gagnant.",
 "- Représenter et afficher une grille 2D.\n- Tester toutes les conditions de victoire.",
 """1) OBJECTIF
Deux joueurs (X et O) jouent à tour de rôle sur une grille 3×3. Le premier à aligner trois symboles (ligne, colonne ou diagonale) gagne.

2) SOLUTION COMMENTÉE
```
def afficher(g):
    for ligne in g:
        print(" | ".join(ligne))

def gagnant(g):
    lignes = [list(l) for l in g]                 # lignes
    lignes += [list(col) for col in zip(*g)]      # colonnes
    lignes.append([g[i][i] for i in range(3)])    # diagonale \\
    lignes.append([g[i][2 - i] for i in range(3)])# diagonale /
    for l in lignes:
        if l[0] != " " and l[0] == l[1] == l[2]:
            return l[0]
    return None

g = [[" "] * 3 for _ in range(3)]
g[0][0] = g[1][1] = g[2][2] = "X"
afficher(g)
print("Gagnant :", gagnant(g))   # X
```

3) CE QU'IL FAUT COMPRENDRE
zip(*g) transpose la grille (les colonnes deviennent des lignes). On rassemble lignes, colonnes et les deux diagonales, puis on teste si l'une est composée de trois symboles identiques (et non vides).

4) POUR ALLER PLUS LOIN
Ajouter la boucle de jeu (saisie des coups, alternance des joueurs, match nul).""",
 "Extension 1 — Écrire la boucle de jeu complète à deux joueurs.\nExtension 2 — Étendre à un Puissance 4 (grille 6×7, alignement de 4)."))

P.append((JEU, "Projet — Mastermind",
 "Deviner une combinaison de chiffres avec des indices « bien / mal placés ».",
 "- Comparer deux listes terme à terme.\n- Compter des occurrences.",
 """1) OBJECTIF
L'ordinateur tire une combinaison secrète de 4 chiffres (1 à 6). À chaque essai, on indique combien de chiffres sont BIEN placés et combien sont présents mais MAL placés.

2) SOLUTION COMMENTÉE
```
import random

def mastermind():
    code = [random.randint(1, 6) for _ in range(4)]
    for tour in range(10):
        prop = [int(c) for c in input("4 chiffres (1-6) : ")]
        bien = sum(1 for i in range(4) if prop[i] == code[i])
        communs = sum(min(prop.count(d), code.count(d)) for d in set(prop))
        mal = communs - bien
        print(bien, "bien placés,", mal, "mal placés")
        if bien == 4:
            print("Gagné en", tour + 1, "coups !"); return
    print("Perdu ! Code :", code)

mastermind()
```

3) CE QU'IL FAUT COMPRENDRE
« bien placés » = mêmes chiffres aux mêmes positions. « communs » compte, pour chaque chiffre, le minimum entre sa présence dans la proposition et dans le code. « mal placés » = communs − bien.

4) POUR ALLER PLUS LOIN
Faire jouer l'ORDINATEUR : proposer des combinaisons et utiliser les indices pour deviner.""",
 "Extension 1 — Autoriser le joueur à choisir le nombre de chiffres et la longueur.\nExtension 2 — Vérifier la validité de la saisie (4 chiffres entre 1 et 6)."))

# ── CRYPTO ──
P.append((CRY, "Projet — Chiffre de César",
 "Chiffrer et déchiffrer un texte par décalage des lettres de l'alphabet.",
 "- Utiliser ord() et chr() et le modulo 26.\n- Comprendre un chiffrement par décalage.",
 """1) OBJECTIF
Le chiffre de César décale chaque lettre d'un nombre fixe de positions dans l'alphabet (décalage de 3 : A→D, B→E…). On veut chiffrer puis déchiffrer.

2) SOLUTION COMMENTÉE
```
def cesar(texte, decalage):
    res = ""
    for c in texte:
        if c.isalpha():
            base = ord("A") if c.isupper() else ord("a")
            res += chr((ord(c) - base + decalage) % 26 + base)
        else:
            res += c          # on laisse les espaces, ponctuation
    return res

print(cesar("BONJOUR NSI", 3))    # ERQMRXU QVL
print(cesar("ERQMRXU QVL", -3))   # BONJOUR NSI (déchiffrement)
```

3) CE QU'IL FAUT COMPRENDRE
ord(c) donne le code du caractère, chr() fait l'inverse. On ramène la lettre entre 0 et 25 (ord(c) - base), on ajoute le décalage, le modulo 26 gère le « repli » (Z revient à A). Déchiffrer = décaler en sens inverse.

4) POUR ALLER PLUS LOIN
Casser le code par force brute en testant les 26 décalages.""",
 "Extension 1 — Tester les 26 décalages possibles pour décoder un message sans connaître la clé.\nExtension 2 — Adapter pour conserver les minuscules/majuscules d'origine."))

P.append((CRY, "Projet — Chiffre de Vigenère",
 "Chiffrement poly-alphabétique : un décalage variable donné par une clé.",
 "- Réutiliser une clé de façon cyclique (modulo).\n- Généraliser le chiffre de César.",
 """1) OBJECTIF
Vigenère améliore César : le décalage change à chaque lettre selon une CLÉ répétée. Bien plus difficile à casser qu'un simple décalage.

2) SOLUTION COMMENTÉE
```
def vigenere(texte, cle, sens=1):
    res = ""
    j = 0
    for c in texte:
        if c.isalpha():
            d = (ord(cle[j % len(cle)].lower()) - ord("a")) * sens
            base = ord("A") if c.isupper() else ord("a")
            res += chr((ord(c) - base + d) % 26 + base)
            j += 1          # on n'avance dans la clé que sur les lettres
        else:
            res += c
    return res

chiffre = vigenere("BONJOUR", "CLE")
print(chiffre)
print(vigenere(chiffre, "CLE", -1))   # déchiffrement (sens = -1)
```

3) CE QU'IL FAUT COMPRENDRE
La clé donne une suite de décalages. cle[j % len(cle)] répète la clé en boucle. Le compteur j n'avance que sur les lettres (pas sur les espaces). Pour déchiffrer, on applique le décalage opposé (sens = -1).

4) POUR ALLER PLUS LOIN
Comparer la robustesse de César et Vigenère face à une analyse de fréquences.""",
 "Extension 1 — Gérer une clé contenant des espaces ou des accents.\nExtension 2 — Expliquer pourquoi l'analyse de fréquences échoue sur Vigenère."))

# ── STRUCTURES ──
P.append((STR, "Projet — Pile, File et parenthésage",
 "Découvrir les structures pile (LIFO) et file (FIFO), et vérifier un parenthésage équilibré.",
 "- Comprendre LIFO (pile) et FIFO (file).\n- Appliquer une pile à un problème concret.",
 """1) OBJECTIF
La PILE fonctionne en « dernier entré, premier sorti » (LIFO) ; la FILE en « premier entré, premier sorti » (FIFO). On les utilise pour vérifier qu'une expression est bien parenthésée.

2) SOLUTION COMMENTÉE
```
# Pile : on empile et dépile au sommet
pile = []
pile.append(1); pile.append(2)
print(pile.pop())       # 2  (le dernier entré)

# File : on ajoute à la fin, on retire au début
from collections import deque
file = deque()
file.append(1); file.append(2)
print(file.popleft())   # 1  (le premier entré)

# Application : parenthésage équilibré avec une pile
def equilibre(expr):
    pile = []
    paires = {")": "(", "]": "[", "}": "{"}
    for c in expr:
        if c in "([{":
            pile.append(c)
        elif c in ")]}":
            if not pile or pile.pop() != paires[c]:
                return False
    return len(pile) == 0

print(equilibre("(a[b]{c})"))   # True
print(equilibre("(a[b)"))       # False
```

3) CE QU'IL FAUT COMPRENDRE
À chaque parenthèse ouvrante, on empile ; à chaque fermante, on vérifie qu'elle correspond au sommet de la pile. À la fin, la pile doit être vide. C'est l'usage typique d'une pile.

4) POUR ALLER PLUS LOIN
Évaluer une expression en notation polonaise inversée (postfixée) avec une pile.""",
 "Extension 1 — Vérifier le parenthésage d'un vrai fichier de code.\nExtension 2 — Évaluer une expression postfixée comme « 3 4 + 5 * » avec une pile."))

P.append((STR, "Projet — Arbre binaire de recherche",
 "Construire un arbre binaire de recherche et le parcourir pour obtenir des valeurs triées.",
 "- Définir une classe (nœud).\n- Écrire des fonctions récursives sur un arbre.",
 """1) OBJECTIF
Un arbre binaire de recherche (ABR) range les valeurs : à gauche d'un nœud, les plus petites ; à droite, les plus grandes. Le parcours « infixe » ressort les valeurs triées.

2) SOLUTION COMMENTÉE
```
class Noeud:
    def __init__(self, valeur):
        self.valeur = valeur
        self.gauche = None
        self.droite = None

def inserer(racine, v):
    if racine is None:
        return Noeud(v)
    if v < racine.valeur:
        racine.gauche = inserer(racine.gauche, v)
    else:
        racine.droite = inserer(racine.droite, v)
    return racine

def infixe(racine):
    if racine is not None:
        infixe(racine.gauche)
        print(racine.valeur, end=" ")
        infixe(racine.droite)

racine = None
for v in [5, 3, 8, 1, 4, 7]:
    racine = inserer(racine, v)
infixe(racine)        # 1 3 4 5 7 8  (trié !)
```

3) CE QU'IL FAUT COMPRENDRE
Chaque nœud a deux enfants (gauche/droite). L'insertion descend récursivement à gauche ou à droite selon la comparaison. Le parcours infixe (gauche → nœud → droite) visite les valeurs dans l'ordre croissant.

4) POUR ALLER PLUS LOIN
Écrire une fonction de recherche dans l'ABR (en O(log n) si l'arbre est équilibré).""",
 "Extension 1 — Écrire rechercher(racine, v) qui renvoie True/False.\nExtension 2 — Compter la hauteur de l'arbre (profondeur maximale)."))

P.append((STR, "Projet — Sortie d'un labyrinthe (backtracking)",
 "Trouver un chemin dans un labyrinthe par retour sur trace (backtracking récursif).",
 "- Représenter un labyrinthe par une grille 2D.\n- Comprendre le backtracking.",
 """1) OBJECTIF
Trouver un chemin de l'entrée (en haut à gauche) à la sortie (en bas à droite) d'un labyrinthe, en explorant et en revenant en arrière quand on est bloqué.

2) SOLUTION COMMENTÉE
```
laby = [
    [0, 1, 0, 0],
    [0, 1, 0, 1],
    [0, 0, 0, 1],
    [1, 1, 0, 0],
]   # 0 = libre, 1 = mur

def resoudre(laby, x, y, chemin):
    n, m = len(laby), len(laby[0])
    if not (0 <= x < n and 0 <= y < m) or laby[x][y] == 1 or (x, y) in chemin:
        return False
    chemin.append((x, y))
    if (x, y) == (n - 1, m - 1):
        return True
    for dx, dy in [(1, 0), (-1, 0), (0, 1), (0, -1)]:
        if resoudre(laby, x + dx, y + dy, chemin):
            return True
    chemin.pop()         # impasse : on revient en arrière
    return False

chemin = []
resoudre(laby, 0, 0, chemin)
print(chemin)
```

3) CE QU'IL FAUT COMPRENDRE
On tente une direction ; si elle mène à la sortie, on garde. Sinon, on retire la case (chemin.pop) et on essaie une autre direction : c'est le BACKTRACKING. Le test (x, y) in chemin évite de tourner en rond.

4) POUR ALLER PLUS LOIN
Afficher le labyrinthe avec le chemin trouvé.""",
 "Extension 1 — Afficher le labyrinthe avec le chemin marqué par des '*'.\nExtension 2 — Générer un labyrinthe aléatoire."))

# ── GRAPHIQUE ──
P.append((GRA, "Projet — Fractale de Mandelbrot",
 "Calculer et afficher l'ensemble de Mandelbrot avec numpy et matplotlib.",
 "- Utiliser les nombres complexes.\n- Colorer une image selon une vitesse de divergence.",
 """1) OBJECTIF
Dessiner la célèbre fractale de Mandelbrot : pour chaque point c du plan complexe, on regarde si la suite z = z² + c reste bornée.

2) SOLUTION COMMENTÉE
```
import numpy as np
import matplotlib.pyplot as plt

largeur, hauteur, maxiter = 400, 400, 50
img = np.zeros((hauteur, largeur))
for i in range(hauteur):
    for j in range(largeur):
        c = complex(-2 + 3 * j / largeur, -1.5 + 3 * i / hauteur)
        z, n = 0, 0
        while abs(z) <= 2 and n < maxiter:
            z = z * z + c
            n += 1
        img[i, j] = n          # vitesse de divergence
plt.imshow(img, cmap="hot")
plt.show()
```

3) CE QU'IL FAUT COMPRENDRE
Python gère nativement les nombres complexes (complex(re, im)). On compte combien d'itérations avant que |z| dépasse 2. La couleur de chaque pixel dépend de ce nombre : on obtient les contours fractals.

4) POUR ALLER PLUS LOIN
Permettre de zoomer en changeant la zone du plan complexe.""",
 "Extension 1 — Augmenter maxiter et la résolution pour plus de détails.\nExtension 2 — Zoomer sur une zone (changer les bornes du plan complexe)."))

P.append((GRA, "Projet — Dessins avec Turtle",
 "Dessiner des figures géométriques et des rosaces avec le module turtle.",
 "- Piloter un « stylo » (avancer, tourner).\n- Combiner des boucles pour créer des motifs.",
 """1) OBJECTIF
Le module turtle déplace un crayon à l'écran. En combinant avancées et rotations dans des boucles, on dessine carrés, polygones et rosaces.

2) SOLUTION COMMENTÉE
```
import turtle
t = turtle.Turtle()
t.speed(0)

# un carré
for _ in range(4):
    t.forward(100)
    t.left(90)

# une rosace : un carré tourné 36 fois
for _ in range(36):
    for _ in range(4):
        t.forward(100)
        t.left(90)
    t.left(10)

turtle.done()
```

3) CE QU'IL FAUT COMPRENDRE
forward(d) avance de d pixels, left(a) tourne de a degrés. Un polygone régulier à n côtés se trace en répétant « avancer ; tourner de 360/n ». La rosace superpose un motif tourné régulièrement.

4) POUR ALLER PLUS LOIN
Dessiner un flocon de Koch (figure récursive).""",
 "Extension 1 — Écrire polygone(n, cote) pour un polygone à n côtés.\nExtension 2 — Dessiner un flocon de Koch par récursivité."))

P.append((GRA, "Projet — Marche aléatoire",
 "Simuler le déplacement aléatoire d'un point et tracer sa trajectoire.",
 "- Utiliser le hasard pour une simulation.\n- Tracer une trajectoire avec matplotlib.",
 """1) OBJECTIF
Un point part de l'origine et fait, à chaque étape, un pas dans une direction tirée au hasard. On trace sa trajectoire (modèle utilisé en physique, finance…).

2) SOLUTION COMMENTÉE
```
import random
import matplotlib.pyplot as plt

x, y = 0, 0
xs, ys = [x], [y]
for _ in range(1000):
    dx, dy = random.choice([(1, 0), (-1, 0), (0, 1), (0, -1)])
    x += dx
    y += dy
    xs.append(x)
    ys.append(y)

plt.plot(xs, ys)
plt.title("Marche aléatoire (1000 pas)")
plt.axis("equal")
plt.show()
```

3) CE QU'IL FAUT COMPRENDRE
random.choice tire un déplacement parmi les 4 directions. On accumule les positions dans deux listes xs et ys, qu'on trace ensuite. Chaque exécution donne une trajectoire différente.

4) POUR ALLER PLUS LOIN
Lancer plusieurs marches et mesurer la distance moyenne à l'origine après N pas.""",
 "Extension 1 — Calculer la distance finale à l'origine (sqrt(x²+y²)).\nExtension 2 — Simuler 100 marches et tracer la distance moyenne en fonction du nombre de pas."))

# ── Insertion ──
for i, (cat, title, summary, objectifs, content, exercices) in enumerate(P):
    row = {"bloc": "bloc0", "topic": cat, "title": title, "summary": summary,
           "objectifs": objectifs, "content": content, "code_example": "",
           "exercices": exercices, "created_at": f"2026-05-21T13:{i:02d}:00+00:00"}
    data = json.dumps([row]).encode("utf-8")
    req = urllib.request.Request(URL + "/rest/v1/fiches", data=data, method="POST", headers=H)
    try:
        with urllib.request.urlopen(req) as r:
            print("OK", cat.split('·')[1].strip()[:18], "|", title[:42])
    except urllib.error.HTTPError as e:
        print("ERR", e.code, title, e.read().decode())
    time.sleep(0.04)
print("TERMINÉ :", len(P), "projets")
