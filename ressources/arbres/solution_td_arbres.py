"""Corrigé complet du TD « Arbres binaires » (L2 Algorithmique et structures de données,
Université de Caen Normandie, adapté pour la formation NSI) — séance DIU du 19 novembre 2026.

Toutes les fonctions corrigées, avec la classe Noeud d'Arbre.py. Le script construit
l'arbre A de la figure 1, vérifie tous les résultats (assert et doctests) et affiche
« Tout est vérifié. » à la fin.

    python3 solution_td_arbres.py         # exécute tout
    python3 solution_td_arbres.py -v      # détail des doctests
"""




# ════════════════════════════════════════════════════════════════════════════
# Étape 1.1 — L'arbre A et ses quatre parcours, à la main
# ════════════════════════════════════════════════════════════════════════════

# Réponses de la question 1 (vérifiées par programme à l'étape 1.3)
prefixe  = "a b d f c e g i j h"   # racine, puis sous-arbre gauche, puis sous-arbre droit
infixe   = "d f b a c i g j e h"   # sous-arbre gauche, puis racine, puis sous-arbre droit
postfixe = "f d b i j g h e c a"   # sous-arbre gauche, puis sous-arbre droit, puis racine
largeur  = "a b c d e f g h i j"   # niveau 0, puis niveau 1, ... chaque niveau de gauche à droite



# ════════════════════════════════════════════════════════════════════════════
# Étape 1.2 — Représentation chaînée de A en Python
# ════════════════════════════════════════════════════════════════════════════

#  A
#  |
#  v
# [*|a|*]-----------------------+
#  |                            |
#  v                            v
# [*|b|∅]                      [∅|c|*]
#  |                                |
#  v                                v
# [∅|d|*]                          [*|e|*]-----------+
#      |                            |                |
#      v                            v                v
#     [∅|f|∅]                      [*|g|*]-----+    [∅|h|∅]
#                                   |          |
#                                   v          v
#                                  [∅|i|∅]    [∅|j|∅]

class Noeud:
    def __init__(self, valeur, gauche=None, droite=None):
        self.valeur = valeur      # Contenu du nœud
        self.gauche = gauche      # Sous-arbre gauche
        self.droite = droite      # Sous-arbre droit


# Construction de bas en haut : chaque nœud est créé après ses fils.
f = Noeud('f')
d = Noeud('d', None, f)
b = Noeud('b', d, None)
i = Noeud('i')
j = Noeud('j')
g = Noeud('g', i, j)
h = Noeud('h')
e = Noeud('e', g, h)
c = Noeud('c', None, e)
A = Noeud('a', b, c)

# La même chose en une seule expression (l'indentation suit la forme de l'arbre) :
A = Noeud('a',
          Noeud('b',
                Noeud('d', None, Noeud('f')),
                None),
          Noeud('c',
                None,
                Noeud('e',
                      Noeud('g', Noeud('i'), Noeud('j')),
                      Noeud('h'))))


def parenthese(B):
    """Notation parenthésée de l'arbre B (∅ pour l'arbre vide).

    >>> parenthese(Noeud('x', None, Noeud('y')))
    'x(∅,y)'
    >>> parenthese(None)
    '∅'
    """
    if B is None:
        return '∅'
    if B.gauche is None and B.droite is None:      # une feuille : sa valeur seule
        return str(B.valeur)
    return f"{B.valeur}({parenthese(B.gauche)},{parenthese(B.droite)})"


print(parenthese(A))      # a(b(d(∅,f),∅),c(∅,e(g(i,j),h)))
assert parenthese(A) == "a(b(d(∅,f),∅),c(∅,e(g(i,j),h)))"
assert A.droite.droite.gauche.droite.valeur == 'j'    # A->droit->droit->gauche->droit



# ════════════════════════════════════════════════════════════════════════════
# Étape 1.3 — Une procédure par parcours
# ════════════════════════════════════════════════════════════════════════════

from collections import deque


def affichePrefixe(A):
    """Affiche les nœuds de A dans l'ordre préfixe (racine, gauche, droite).

    >>> affichePrefixe(A)               # doctest: +NORMALIZE_WHITESPACE
    a b d f c e g i j h
    >>> affichePrefixe(None)            # arbre vide : rien à afficher
    """
    if A is not None:
        print(A.valeur, end=" ")        # 1re visite
        affichePrefixe(A.gauche)
        affichePrefixe(A.droite)


def afficheInfixe(A):
    """Affiche les nœuds de A dans l'ordre infixe (gauche, racine, droite).

    >>> afficheInfixe(A)                # doctest: +NORMALIZE_WHITESPACE
    d f b a c i g j e h
    """
    if A is not None:
        afficheInfixe(A.gauche)
        print(A.valeur, end=" ")        # 2e visite
        afficheInfixe(A.droite)


def affichePostfixe(A):
    """Affiche les nœuds de A dans l'ordre postfixe (gauche, droite, racine).

    >>> affichePostfixe(A)              # doctest: +NORMALIZE_WHITESPACE
    f d b i j g h e c a
    """
    if A is not None:
        affichePostfixe(A.gauche)
        affichePostfixe(A.droite)
        print(A.valeur, end=" ")        # 3e visite


def afficheLargeur(A):
    """Affiche les nœuds de A niveau par niveau, chaque niveau de gauche à droite.

    >>> afficheLargeur(A)               # doctest: +NORMALIZE_WHITESPACE
    a b c d e f g h i j
    """
    if A is None:
        return
    file = deque([A])                   # file des nœuds en attente
    while file:
        n = file.popleft()              # on défile le plus ancien
        print(n.valeur, end=" ")
        if n.gauche is not None:
            file.append(n.gauche)       # on enfile ses fils, le gauche d'abord
        if n.droite is not None:
            file.append(n.droite)

import contextlib
import io


def sortie(procedure, *args):
    """Exécute procedure(*args) et renvoie ce qu'elle a affiché, espaces normalisés."""
    tampon = io.StringIO()
    with contextlib.redirect_stdout(tampon):
        procedure(*args)
    return " ".join(tampon.getvalue().split())


for nom, procedure, attendu in [("préfixe", affichePrefixe, prefixe),
                                ("infixe", afficheInfixe, infixe),
                                ("postfixe", affichePostfixe, postfixe),
                                ("largeur", afficheLargeur, largeur)]:
    obtenu = sortie(procedure, A)
    print(f"{nom:9} {obtenu}")
    assert obtenu == attendu          # les réponses de l'étape 1.1 sont justes
# préfixe   a b d f c e g i j h
# infixe    d f b a c i g j e h
# postfixe  f d b i j g h e c a
# largeur   a b c d e f g h i j

def afficheTroisVisites(A):
    if A is not None:
        print(A.valeur, end=" ")        # 1re visite
        afficheTroisVisites(A.gauche)
        print(A.valeur, end=" ")        # 2e visite
        afficheTroisVisites(A.droite)
        print(A.valeur, end=" ")        # 3e visite


print(sortie(afficheTroisVisites, A))
# a b d d f f f d b b a c c e g i i i g j j j g e h h h e c a
assert sortie(afficheTroisVisites, A) == "a b d d f f f d b b a c c e g i i i g j j j g e h h h e c a"



# ════════════════════════════════════════════════════════════════════════════
# Étape 1.4 — nombreFeuilles1 : combien d’appels récursifs ?
# ════════════════════════════════════════════════════════════════════════════

def nombreFeuilles1(A):
    """Nombre de feuilles de l'arbre binaire A (traduction directe de l'énoncé).

    >>> nombreFeuilles1(A)
    4
    >>> nombreFeuilles1(None)
    0
    """
    if A is None:
        return 0
    else:
        if A.gauche is None and A.droite is None:
            return 1
        else:
            return nombreFeuilles1(A.gauche) + nombreFeuilles1(A.droite)


compteur = {"appels": 0, "vides": 0}


def nombreFeuilles1Compte(A):
    """Comme nombreFeuilles1, mais compte ses appels dans compteur["appels"].

    >>> compteur["appels"] = 0
    >>> nombreFeuilles1Compte(A)
    4
    >>> compteur["appels"] - 1           # appels récursifs (sans l'appel initial)
    12
    """
    compteur["appels"] += 1
    if A is None:
        compteur["vides"] += 1
        return 0
    else:
        if A.gauche is None and A.droite is None:
            return 1
        else:
            return nombreFeuilles1Compte(A.gauche) + nombreFeuilles1Compte(A.droite)


def appelsRecursifs(procedure, B):
    """Nombre d'appels récursifs déclenchés par procedure(B), appel initial exclu."""
    compteur["appels"] = 0
    compteur["vides"] = 0
    procedure(B)
    return compteur["appels"] - 1


# Taille et nombre de nœuds internes, sur le modèle des définitions inductives de N et Nf (cours, diapositive 16)
def taille(B):
    if B is None:
        return 0
    return 1 + taille(B.gauche) + taille(B.droite)


def nbInternes(B):
    if B is None or (B.gauche is None and B.droite is None):
        return 0
    return 1 + nbInternes(B.gauche) + nbInternes(B.droite)


print(taille(A), nbInternes(A), nombreFeuilles1(A))     # 10 6 4
print(appelsRecursifs(nombreFeuilles1Compte, A), compteur["vides"])   # 12 3
assert appelsRecursifs(nombreFeuilles1Compte, A) == 2 * nbInternes(A) == 12
assert compteur["vides"] == nbInternes(A) - nombreFeuilles1(A) + 1 == 3

import random


def peigne(n):
    """Arbre filiforme à n nœuds : chaque nœud n'a qu'un fils, à gauche."""
    B = None
    for k in range(n, 0, -1):
        B = Noeud(k, B, None)
    return B


def parfait(h, valeur=1):
    """Arbre parfait de hauteur h (2**(h+1) - 1 nœuds) ; parfait(-1) est l'arbre vide."""
    if h < 0:
        return None
    return Noeud(valeur, parfait(h - 1, 2 * valeur), parfait(h - 1, 2 * valeur + 1))


def aleatoire(n, rng):
    """Arbre binaire aléatoire à n nœuds."""
    if n == 0:
        return None
    k = rng.randrange(n)                 # taille du sous-arbre gauche, entre 0 et n - 1
    return Noeud(n, aleatoire(k, rng), aleatoire(n - 1 - k, rng))


rng = random.Random(2026)
for B in [peigne(1), peigne(10), parfait(3), aleatoire(20, rng), aleatoire(200, rng)]:
    assert appelsRecursifs(nombreFeuilles1Compte, B) == 2 * nbInternes(B)
print("2 × Ni vérifié sur tous les arbres testés")



# ════════════════════════════════════════════════════════════════════════════
# Étape 1.5 — nombreFeuilles2 : quatre cas, le moins de tests possible
# ════════════════════════════════════════════════════════════════════════════

def nombreFeuilles2(A):
    """Nombre de feuilles de l'arbre binaire A, supposé NON VIDE.

    >>> nombreFeuilles2(A)
    4
    >>> nombreFeuilles2(Noeud('x'))
    1
    """
    if A.gauche is None:
        if A.droite is None:
            return 1                                    # a) une feuille
        else:
            return nombreFeuilles2(A.droite)            # b) seul le droit est non vide
    else:
        if A.droite is None:
            return nombreFeuilles2(A.gauche)            # c) seul le gauche est non vide
        else:
            return nombreFeuilles2(A.gauche) + nombreFeuilles2(A.droite)   # d)


def nombreFeuilles(A):
    """Version utilisable sur tout arbre, y compris l'arbre vide."""
    return 0 if A is None else nombreFeuilles2(A)


assert nombreFeuilles2(A) == nombreFeuilles1(A) == 4
assert nombreFeuilles(None) == 0



# ════════════════════════════════════════════════════════════════════════════
# Étape 1.6 — Nombre d’appels de nombreFeuilles2 et comparaison
# ════════════════════════════════════════════════════════════════════════════

def nombreFeuilles2Compte(A):
    """Comme nombreFeuilles2, mais compte ses appels dans compteur["appels"].

    >>> compteur["appels"] = 0
    >>> nombreFeuilles2Compte(A)
    4
    >>> compteur["appels"] - 1           # appels récursifs (sans l'appel initial)
    9
    """
    compteur["appels"] += 1
    if A.gauche is None:
        if A.droite is None:
            return 1
        else:
            return nombreFeuilles2Compte(A.droite)
    else:
        if A.droite is None:
            return nombreFeuilles2Compte(A.gauche)
        else:
            return nombreFeuilles2Compte(A.gauche) + nombreFeuilles2Compte(A.droite)


rng = random.Random(19)
arbres = [("arbre A", A), ("peigne(10)", peigne(10)), ("parfait(3)", parfait(3)),
          ("aléatoire(20)", aleatoire(20, rng)), ("aléatoire(100)", aleatoire(100, rng)),
          ("aléatoire(1000)", aleatoire(1000, rng))]

print(f"{'arbre':16}{'N':>6}{'Ni':>6}{'Nf':>6}{'nf1':>7}{'nf2':>7}")
for nom, B in arbres:
    N, Ni = taille(B), nbInternes(B)
    Nf = N - Ni
    a1 = appelsRecursifs(nombreFeuilles1Compte, B)
    a2 = appelsRecursifs(nombreFeuilles2Compte, B)
    print(f"{nom:16}{N:>6}{Ni:>6}{Nf:>6}{a1:>7}{a2:>7}")
    assert a1 == 2 * Ni and a2 == N - 1
    assert a1 - a2 == Ni - Nf + 1 >= 0

# Sortie obtenue :
# arbre                N    Ni    Nf    nf1    nf2
# arbre A             10     6     4     12      9
# peigne(10)          10     9     1     18      9
# parfait(3)          15     7     8     14     14
# aléatoire(20)       20    11     9     22     19
# aléatoire(100)     100    67    33    134     99
# aléatoire(1000)   1000   661   339   1322    999



# ════════════════════════════════════════════════════════════════════════════
# Étape 1.7 — copieArbre : une copie sans nœud commun
# ════════════════════════════════════════════════════════════════════════════

def copieArbre(A):
    """Renvoie une copie de A : même forme, mêmes valeurs, aucun nœud commun.

    >>> B = copieArbre(A)
    >>> parenthese(B) == parenthese(A)
    True
    >>> B is A
    False
    >>> copieArbre(None) is None
    True
    """
    if A is None:
        return None
    return Noeud(A.valeur, copieArbre(A.gauche), copieArbre(A.droite))


def noeuds(A):
    """Liste des nœuds (des objets Noeud) de A, en ordre préfixe."""
    if A is None:
        return []
    return [A] + noeuds(A.gauche) + noeuds(A.droite)


def aucunNoeudCommun(A, B):
    """True si aucun objet Noeud n'appartient à la fois à A et à B (test avec is)."""
    for x in noeuds(A):
        for y in noeuds(B):
            if x is y:
                return False
    return True


B = copieArbre(A)
assert parenthese(B) == parenthese(A)             # même arbre...
assert aucunNoeudCommun(A, B)                     # ... mais aucun nœud partagé
assert len(noeuds(B)) == 10

alias = A                                         # pas une copie : un second nom
assert alias is A and not aucunNoeudCommun(A, alias)

fausse = Noeud(A.valeur, A.gauche, A.droite)      # copie de la racine seulement
assert fausse is not A                            # la racine est neuve...
assert fausse.gauche is A.gauche                  # ... mais les sous-arbres sont partagés
assert not aucunNoeudCommun(A, fausse)

B.gauche.valeur = 'B'                             # modifier la copie...
assert A.gauche.valeur == 'b'                     # ... ne modifie pas A
fausse.gauche.valeur = 'X'                        # modifier la fausse copie...
print(A.gauche.valeur)                            # X : A a été modifié !
A.gauche.valeur = 'b'                             # on remet A en état
assert parenthese(A) == "a(b(d(∅,f),∅),c(∅,e(g(i,j),h)))"



# ════════════════════════════════════════════════════════════════════════════
# Étape 1.8 — affichePrefixeIteratif : le parcours préfixe avec une pile
# ════════════════════════════════════════════════════════════════════════════

# Exécution à la main sur le sous-arbre de racine e (sommet de la pile à droite) :
#
#            e
#          /   \
#         g     h
#        / \
#       i   j
#
# tour  pile avant      on dépile   on affiche   on empile (droit puis gauche)
#  1    [e]             e           e            h, g
#  2    [h, g]          g           g            j, i
#  3    [h, j, i]       i           i            -
#  4    [h, j]          j           j            -
#  5    [h]             h           h            -
#       []              fin                      affichage : e g i j h

def affichePrefixeIteratif(A, trace=False):
    """Affiche les nœuds de A dans l'ordre préfixe, sans récursivité, avec une pile.
    Si trace vaut True, affiche aussi le contenu de la pile à chaque tour.

    >>> affichePrefixeIteratif(A)        # doctest: +NORMALIZE_WHITESPACE
    a b d f c e g i j h
    >>> affichePrefixeIteratif(None)
    """
    if A is None:
        return
    pile = [A]                            # sommet = fin de la liste
    while pile:
        if trace:
            print("pile :", [n.valeur for n in pile], end=" -> ")
        n = pile.pop()                    # on dépile le sommet
        print(n.valeur, end=" ")
        if trace:
            print()
        if n.droite is not None:          # le droit d'abord...
            pile.append(n.droite)
        if n.gauche is not None:          # ... pour que le gauche soit au sommet
            pile.append(n.gauche)


affichePrefixeIteratif(A.droite.droite, trace=True)     # le sous-arbre de racine e
# pile : ['e'] -> e
# pile : ['h', 'g'] -> g
# pile : ['h', 'j', 'i'] -> i
# pile : ['h', 'j'] -> j
# pile : ['h'] -> h
assert sortie(affichePrefixeIteratif, A) == sortie(affichePrefixe, A) == prefixe
rng = random.Random(8)
for _ in range(20):
    B = aleatoire(rng.randrange(60), rng)
    assert sortie(affichePrefixeIteratif, B) == sortie(affichePrefixe, B)


def affichePrefixeMauvaisOrdre(A):        # le gauche empilé en premier : l'erreur classique
    pile = [A] if A is not None else []
    while pile:
        n = pile.pop()
        print(n.valeur, end=" ")
        for fils in (n.gauche, n.droite):
            if fils is not None:
                pile.append(fils)


print(sortie(affichePrefixeMauvaisOrdre, A))     # a c e h g j i b d f
assert sortie(affichePrefixeMauvaisOrdre, A) == "a c e h g j i b d f"



# ════════════════════════════════════════════════════════════════════════════
# Étape 2.1 — Profondeur et niveaux des nœuds de A
# ════════════════════════════════════════════════════════════════════════════

niveaux = {0: "a",
           1: "b c",
           2: "d e",
           3: "f g h",
           4: "i j",
           5: ""}          # aucun nœud de profondeur 5


def hauteur(B):
    """Hauteur de B, avec la convention du cours : l'arbre vide a pour hauteur -1.

    >>> hauteur(A)
    4
    >>> hauteur(Noeud('x')), hauteur(None)
    (0, -1)
    """
    if B is None:
        return -1
    return 1 + max(hauteur(B.gauche), hauteur(B.droite))



# ════════════════════════════════════════════════════════════════════════════
# Étape 2.2 — afficheNiveau(A, k) : les nœuds d’un niveau donné
# ════════════════════════════════════════════════════════════════════════════

def afficheNiveau(A, k):
    """Affiche, de gauche à droite, les nœuds de profondeur k de l'arbre A.

    >>> afficheNiveau(A, 3)              # doctest: +NORMALIZE_WHITESPACE
    f g h
    >>> afficheNiveau(A, 5)              # niveau vide : rien n'est affiché
    """
    if A is None:
        return
    if k == 0:
        print(A.valeur, end=" ")
    else:
        afficheNiveau(A.gauche, k - 1)       # un pas de moins à faire
        afficheNiveau(A.droite, k - 1)


for k in range(6):
    print(f"niveau {k} :", sortie(afficheNiveau, A, k))
    assert sortie(afficheNiveau, A, k) == niveaux[k]
# niveau 0 : a
# niveau 1 : b c
# niveau 2 : d e
# niveau 3 : f g h
# niveau 4 : i j
# niveau 5 :

def largeurParNiveaux(A):
    for k in range(hauteur(A) + 1):
        afficheNiveau(A, k)


assert sortie(largeurParNiveaux, A) == sortie(afficheLargeur, A) == largeur



# ════════════════════════════════════════════════════════════════════════════
# Étape 2.3 — Longueur de cheminement de A, à la main
# ════════════════════════════════════════════════════════════════════════════

#  niveau k   nœuds      nombre   contribution k × nombre
#     0       a            1         0
#     1       b c          2         2
#     2       d e          2         4
#     3       f g h        3         9
#     4       i j          2         8
#                                  ----
#                          LC(A) =  23
LC_A = 0 * 1 + 1 * 2 + 2 * 2 + 3 * 3 + 4 * 2
assert LC_A == 23

def compteNiveau(A, k):
    """Nombre de nœuds de profondeur k dans A."""
    if A is None:
        return 0
    if k == 0:
        return 1
    return compteNiveau(A.gauche, k - 1) + compteNiveau(A.droite, k - 1)


def LCparNiveaux(A):
    return sum(k * compteNiveau(A, k) for k in range(hauteur(A) + 1))


print([compteNiveau(A, k) for k in range(6)], LCparNiveaux(A))    # [1, 2, 2, 3, 2, 0] 23
assert LCparNiveaux(A) == LC_A == 23



# ════════════════════════════════════════════════════════════════════════════
# Étape 2.4 — LC(A) avec la procédure auxiliaire LCaux
# ════════════════════════════════════════════════════════════════════════════

def LCaux(B, p):
    """Somme des profondeurs des nœuds de B, sachant que la racine de B
    est à la profondeur p.

    >>> LCaux(A.droite, 1)               # c, e, g, h, i, j : 1+2+3+3+4+4
    17
    """
    if B is None:
        return 0
    return p + LCaux(B.gauche, p + 1) + LCaux(B.droite, p + 1)


def LC(A):
    """Longueur de cheminement de A : somme des profondeurs de tous ses nœuds.

    >>> LC(A)
    23
    >>> LC(None), LC(Noeud('x'))
    (0, 0)
    """
    return LCaux(A, 0)                    # la racine de A est à la profondeur 0


assert LC(A) == LC_A == 23

def LCetTaille(A):
    """Renvoie le couple (LC(A), N(A)), en un seul parcours."""
    if A is None:
        return 0, 0
    lg, ng = LCetTaille(A.gauche)
    ld, nd = LCetTaille(A.droite)
    n = ng + nd + 1
    return lg + ld + n - 1, n


assert LCetTaille(A) == (23, 10)
rng = random.Random(4)
for _ in range(30):
    B = aleatoire(rng.randrange(80), rng)
    assert LC(B) == LCparNiveaux(B) == LCetTaille(B)[0]



# ════════════════════════════════════════════════════════════════════════════
# Étape 2.5 — Longueur de cheminement externe de A, à la main
# ════════════════════════════════════════════════════════════════════════════

#  branche (racine -> feuille)   longueur = profondeur de la feuille
#  a b d f                          3
#  a c e g i                        4
#  a c e g j                        4
#  a c e h                          3
#                                  ---
#                       LCE(A) =   14
LCE_A = 3 + 4 + 4 + 3
assert LCE_A == 14



# ════════════════════════════════════════════════════════════════════════════
# Étape 2.6 — LCE(A) récursive avec LCEaux ; sommes et appels
# ════════════════════════════════════════════════════════════════════════════

def LCEaux(B, p):
    """Somme des profondeurs des feuilles de B, la racine de B étant à la profondeur p.

    >>> LCEaux(A.droite, 1)              # feuilles i, j, h : 4 + 4 + 3
    11
    """
    if B is None:
        return 0
    if B.gauche is None and B.droite is None:      # une feuille
        return p
    return LCEaux(B.gauche, p + 1) + LCEaux(B.droite, p + 1)


def LCE(A):
    """Longueur de cheminement externe de A : somme des profondeurs de ses feuilles.

    >>> LCE(A)
    14
    >>> LCE(None), LCE(Noeud('x'))
    (0, 0)
    """
    return LCEaux(A, 0)


assert LCE(A) == LCE_A == 14

compteLCE = {"appels": 0, "sommes": 0}


def LCEauxCompte(B, p):
    compteLCE["appels"] += 1
    if B is None:
        return 0
    if B.gauche is None and B.droite is None:
        return p
    compteLCE["sommes"] += 1
    return LCEauxCompte(B.gauche, p + 1) + LCEauxCompte(B.droite, p + 1)


def mesureLCE(B):
    compteLCE["appels"] = compteLCE["sommes"] = 0
    resultat = LCEauxCompte(B, 0)
    return resultat, compteLCE["appels"] - 1, compteLCE["sommes"]   # appels récursifs


print(mesureLCE(A))          # (14, 12, 6) : LCE, appels récursifs, sommes
rng = random.Random(6)
for B in [A, peigne(15), parfait(4)] + [aleatoire(rng.randrange(1, 90), rng) for _ in range(20)]:
    valeur, appels, sommes = mesureLCE(B)
    Ni = nbInternes(B)
    assert valeur == LCE(B) and appels == 2 * Ni and sommes == Ni



# ════════════════════════════════════════════════════════════════════════════
# Étape 2.7 — LCEIt : version itérative avec une file de couples
# ════════════════════════════════════════════════════════════════════════════

from collections import deque


def LCEIt(A):
    """Longueur de cheminement externe de A, sans récursivité :
    parcours en largeur avec une file de couples (nœud, profondeur).

    >>> LCEIt(A)
    14
    >>> LCEIt(None)
    0
    """
    if A is None:
        return 0
    total = 0
    file = deque([(A, 0)])                # la racine, à la profondeur 0
    while file:
        n, p = file.popleft()
        if n.gauche is None and n.droite is None:
            total += p                    # une feuille : on ajoute sa profondeur
        else:
            if n.gauche is not None:
                file.append((n.gauche, p + 1))
            if n.droite is not None:
                file.append((n.droite, p + 1))
    return total


assert LCEIt(A) == LCE(A) == 14
rng = random.Random(7)
for _ in range(30):
    B = aleatoire(rng.randrange(120), rng)
    assert LCEIt(B) == LCE(B)



# ════════════════════════════════════════════════════════════════════════════
# Étape 3.1 — L’arbre de l’expression (((a ∗ c) + (d ∗ b)) ∗ (b + a))
# ════════════════════════════════════════════════════════════════════════════

#                  *
#              /       \
#            +           +
#          /   \        / \
#         *     *      b   a
#        / \   / \
#       a   c d   b
E = Noeud('*',
          Noeud('+',
                Noeud('*', Noeud('a'), Noeud('c')),
                Noeud('*', Noeud('d'), Noeud('b'))),
          Noeud('+', Noeud('b'), Noeud('a')))


def estLocalementComplet(B):
    """True si chaque nœud de B qui n'est pas une feuille a deux fils.

    >>> estLocalementComplet(E)
    True
    >>> estLocalementComplet(A)
    False
    """
    if B is None:
        return True
    if (B.gauche is None) != (B.droite is None):    # exactement un fils vide
        return False
    return estLocalementComplet(B.gauche) and estLocalementComplet(B.droite)


print(sortie(affichePrefixe, E))     # * + * a c * d b + b a     (notation polonaise)
print(sortie(afficheInfixe, E))      # a * c + d * b * b + a     (parenthèses perdues !)
print(sortie(affichePostfixe, E))    # a c * d b * + b a + *     (notation polonaise inverse)
assert sortie(affichePostfixe, E) == "a c * d b * + b a + *"
assert taille(E) == 11 and nbInternes(E) == 5 and nombreFeuilles2(E) == 6
assert appelsRecursifs(nombreFeuilles1Compte, E) == appelsRecursifs(nombreFeuilles2Compte, E) == 10



# ════════════════════════════════════════════════════════════════════════════
# Étape 3.2 — valeurExp(E, V) : évaluer l’expression
# ════════════════════════════════════════════════════════════════════════════

def valeurExp(E, V):
    """Valeur de l'expression d'arbre E pour la valuation V.
    V est un dictionnaire {lettre: entier} ou une fonction lettre -> entier.

    >>> valeurExp(E, {'a': 1, 'b': 2, 'c': 3, 'd': 4})
    33
    >>> valeurExp(E, lambda lettre: 2)
    32
    """
    if E.gauche is None and E.droite is None:      # une feuille : une lettre
        return V(E.valeur) if callable(V) else V[E.valeur]
    g = valeurExp(E.gauche, V)                     # arbre localement complet :
    d = valeurExp(E.droite, V)                     # les deux fils existent
    if E.valeur == '+':
        return g + d
    if E.valeur == '*':
        return g * d
    raise ValueError(f"opérateur inconnu : {E.valeur!r}")


V = {'a': 1, 'b': 2, 'c': 3, 'd': 4}
assert valeurExp(E, V) == ((1 * 3) + (4 * 2)) * (2 + 1) == 33
assert valeurExp(E, lambda lettre: ord(lettre) - ord('a') + 1) == 33   # a=1, b=2, c=3, d=4
assert valeurExp(E, lambda lettre: 2) == 32
assert valeurExp(Noeud('z'), {'z': 7}) == 7



# ════════════════════════════════════════════════════════════════════════════
# Étape 3.3 — arbreExp : construire l’arbre en lisant l’expression caractère par caractère
# ════════════════════════════════════════════════════════════════════════════

LETTRES = "abcdefghijklmnopqrstuvwxyz"


def lireCar(source):
    """Prochain caractère de l'itérateur source, en sautant les espaces ;
    renvoie '' quand il n'y a plus rien à lire."""
    for car in source:
        if car != ' ':
            return car
    return ''


def arbreExp(source):
    """Lit une expression arithmétique dans l'itérateur de caractères source
    et renvoie son arbre. Lève ValueError si l'expression est incorrecte.

    >>> parenthese(arbreExp(iter("((a*c)+b)")))
    '+(*(a,c),b)'
    """
    car = lireCar(source)
    if car != '' and car in LETTRES:          # cas (a) : une lettre, c'est une feuille
        return Noeud(car)
    if car == '(':                            # cas (b) : (E1 op E2)
        gauche = arbreExp(source)
        op = lireCar(source)
        if op not in ('+', '*'):
            raise ValueError(f"opérateur + ou * attendu, lu : {op!r}")
        droite = arbreExp(source)
        fin = lireCar(source)
        if fin != ')':
            raise ValueError(f"parenthèse fermante attendue, lu : {fin!r}")
        return Noeud(op, gauche, droite)
    raise ValueError(f"lettre ou parenthèse ouvrante attendue, lu : {car!r}")


def arbreExpChaine(texte):
    """Arbre de l'expression contenue dans la chaîne texte (rien ne doit rester après).

    >>> valeurExp(arbreExpChaine("(((a*c)+(d*b))*(b+a))"), {'a': 1, 'b': 2, 'c': 3, 'd': 4})
    33
    >>> arbreExpChaine("(a+b))")
    Traceback (most recent call last):
    ...
    ValueError: caractères en trop après l'expression : ')'
    """
    source = iter(texte)
    arbre = arbreExp(source)
    reste = lireCar(source)
    if reste != '':
        raise ValueError(f"caractères en trop après l'expression : {reste!r}")
    return arbre


def chaineExp(E):
    """Réciproque : l'expression complètement parenthésée de l'arbre E."""
    if E.gauche is None and E.droite is None:
        return E.valeur
    return "(" + chaineExp(E.gauche) + E.valeur + chaineExp(E.droite) + ")"


s = "(((a*c)+(d*b))*(b+a))"
F = arbreExpChaine(s)
assert parenthese(F) == parenthese(E) == "*(+(*(a,c),*(d,b)),+(b,a))"
assert chaineExp(F) == s
assert valeurExp(arbreExpChaine("(((a * c) + (d * b)) * (b + a))"), V) == 33   # espaces tolérés
assert parenthese(arbreExpChaine("x")) == "x"

for mauvaise in ["", "a+b", "(a+b", "(a-b)", "(a+b))", "(A+b)", "((a+b)", "(a+)", "()"]:
    try:
        arbreExpChaine(mauvaise)
    except ValueError as erreur:
        print(f"{mauvaise!r:10} refusée : {erreur}")
    else:
        raise AssertionError(f"{mauvaise!r} aurait dû être refusée")
# ''         refusée : lettre ou parenthèse ouvrante attendue, lu : ''
# 'a+b'      refusée : caractères en trop après l'expression : '+'
# '(a+b'     refusée : parenthèse fermante attendue, lu : ''
# '(a-b)'    refusée : opérateur + ou * attendu, lu : '-'
# '(a+b))'   refusée : caractères en trop après l'expression : ')'
# '(A+b)'    refusée : lettre ou parenthèse ouvrante attendue, lu : 'A'
# '((a+b)'   refusée : opérateur + ou * attendu, lu : ''
# '(a+)'     refusée : lettre ou parenthèse ouvrante attendue, lu : ')'
# '()'       refusée : lettre ou parenthèse ouvrante attendue, lu : ')'

# ════════════════════════════════════════════════════════════════════════════
# Vérifications finales
# ════════════════════════════════════════════════════════════════════════════
if __name__ == "__main__":
    import doctest
    import sys

    # Récapitulatif des résultats sur l'arbre A de la figure 1
    assert parenthese(A) == "a(b(d(∅,f),∅),c(∅,e(g(i,j),h)))"
    assert (sortie(affichePrefixe, A), sortie(afficheInfixe, A),
            sortie(affichePostfixe, A), sortie(afficheLargeur, A)) == (prefixe, infixe, postfixe, largeur)
    assert sortie(affichePrefixeIteratif, A) == prefixe
    assert (taille(A), nbInternes(A), nombreFeuilles1(A), nombreFeuilles2(A)) == (10, 6, 4, 4)
    assert appelsRecursifs(nombreFeuilles1Compte, A) == 12
    assert appelsRecursifs(nombreFeuilles2Compte, A) == 9
    assert aucunNoeudCommun(A, copieArbre(A))
    assert hauteur(A) == 4 and [sortie(afficheNiveau, A, k) for k in range(6)] == list(niveaux.values())
    assert LC(A) == 23 and LCE(A) == 14 and LCEIt(A) == 14 and mesureLCE(A) == (14, 12, 6)
    assert valeurExp(E, V) == 33 and chaineExp(arbreExpChaine(s)) == s

    echecs, essais = doctest.testmod(verbose="-v" in sys.argv)
    assert echecs == 0, f"{echecs} doctest(s) en échec"
    print(f"\n{essais} doctests passés.")
    print("Tout est vérifié.")
