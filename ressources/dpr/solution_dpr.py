"""Corrigés des trois TP « Diviser pour régner » (FDIU, DU Normandie, octobre 2026).

  TP 1 : tp-dpr-fusion     occurrences en DPR, tri fusion, fusion et fusion_2
  TP 2 : tp-dpr-karatsuba  multiplication de grands nombres (Karatsuba / naïve)
  TP 3 : tp-dpr-rotation   rotation d'image d'un quart de tour par DPR

Lancement :  python3 solution_dpr.py
depuis un dossier qui contient _fusion.py, triClassique_V2.py et perroquet_256_cc.jpg.

Les cellules rcviz / tutor des notebooks ne fonctionnent que dans Basthon :
elles ne sont pas reprises ici. Si le module PIL (Pillow) est absent, la partie
rotation est vérifiée sur une petite image de synthèse (classe _MiniImage) qui
imite les seules méthodes utilisées : new, size, getpixel, putpixel, crop, paste.
"""
import doctest
import os
import sys
from random import Random, randint, shuffle
from timeit import timeit

ICI = os.path.dirname(os.path.abspath(__file__))
os.chdir(ICI)            # pour trouver perroquet_256_cc.jpg
sys.path.insert(0, ICI)  # pour importer _fusion et triClassique_V2

from _fusion import _fusion                                    # module fourni
from triClassique_V2 import triSelection, triInsertion, triBulle  # module fourni


# ═══════════════════════════════════════════════════════════════════════════
#  TP 1 — DIVISER POUR RÉGNER : OCCURRENCES ET TRI FUSION
# ═══════════════════════════════════════════════════════════════════════════

def nb_occurence(chaine, x):
    """Nombre d'occurrences du caractère x dans chaine, par diviser pour régner.

    >>> nb_occurence('abracadabra', 'a')
    5
    >>> nb_occurence('abracadabra', 'A')
    0
    >>> nb_occurence('à la mer, à la plage', 'à')
    2
    >>> nb_occurence('', 'a')
    0
    """
    # RÉGNER : chaîne vide ou d'un seul caractère, la réponse est immédiate
    if len(chaine) <= 1:
        if chaine == x:
            return 1
        return 0
    # DIVISER : on coupe la chaîne en deux moitiés
    k = len(chaine) // 2
    # COMBINER : on additionne les deux sous-résultats
    return nb_occurence(chaine[:k], x) + nb_occurence(chaine[k:], x)


def nb_occurence_i(chaine, x):
    """Version itérative.

    >>> nb_occurence_i('abracadabra', 'a')
    5
    """
    c = 0
    for u in chaine:
        if u == x:
            c += 1
    return c


def nb_occurence_2(chaine, x):
    """Variante « réduire » du corrigé du formateur : un seul sous-problème,
    de taille n - 1 (profondeur de récursion n, RecursionError vers 1 000 caractères).

    >>> nb_occurence_2('abracadabra', 'a')
    5
    >>> nb_occurence_2('', 'a')
    0
    """
    if not chaine:
        return 0
    c = 1 if chaine[-1] == x else 0
    return c + nb_occurence_2(chaine[:-1], x)


# Compteur d'appels, pour vérifier que la version DPR fait 2n - 1 appels
_appels = 0


def nb_occurence_compte(chaine, x):
    global _appels
    _appels += 1
    if len(chaine) <= 1:
        return 1 if chaine == x else 0
    k = len(chaine) // 2
    return nb_occurence_compte(chaine[:k], x) + nb_occurence_compte(chaine[k:], x)


def tri_fusion(lst):
    """ Tri une liste suivant un algorithme de tri-fusion
    Ne modifie pas la liste de départ

    Tests automatiques :
    >>> tri_fusion([39, 19, 13, 25, 29, 37, 18, 23, 17, 28, 14, 15, 6, 16, 10, 20, 3, 35, 1, 24, 5, 32, 33, 30, 21, 4, 38, 0, 11, 36, 8, 7, 34, 9, 27, 22, 26, 31, 2, 12])
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39]
    >>> tri_fusion([-2, -12, 4, 78])
    [-12, -2, 4, 78]
    >>> tri_fusion([-2, -12, 4, 78, -15])
    [-15, -12, -2, 4, 78]
    >>> tri_fusion([])
    []
    """
    # RÉGNER : une liste de 0 ou 1 élément est déjà triée
    if len(lst) <= 1:
        return lst[:]            # une copie : la liste de départ reste intacte
    # DIVISER
    milieu = len(lst) // 2
    gauche = tri_fusion(lst[:milieu])
    droite = tri_fusion(lst[milieu:])
    # COMBINER
    return _fusion(gauche, droite)


def fusion(lst_a, lst_b):
    """ réalise la fusion de deux listes triées
    en une grande liste trieé.

    Tests automatiques :
    >>> fusion([], [])
    []
    >>> fusion([1, 2], [])
    [1, 2]
    >>> fusion([], [1, 2])
    [1, 2]
    >>> fusion([1, 3, 4, 5], [6, 7, 8, 9])
    [1, 3, 4, 5, 6, 7, 8, 9]
    >>> fusion([6, 7, 8, 9], [1, 3, 4, 5])
    [1, 3, 4, 5, 6, 7, 8, 9]
    >>> fusion(list(range(0, 20, 2)), list(range(1, 20, 2)))
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
    >>> fusion(list(range(1, 20, 2)), list(range(0, 20, 2)))
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
    >>> a, b = [1, 2, 3, 4], [1, 2, 3, 4]
    >>> fusion(a, b)
    [1, 1, 2, 2, 3, 3, 4, 4]
    >>> a
    [1, 2, 3, 4]
    >>> b
    [1, 2, 3, 4]
    """
    resultat = []
    i, j = 0, 0                      # i parcourt lst_a, j parcourt lst_b
    while i < len(lst_a) and j < len(lst_b):
        if lst_a[i] <= lst_b[j]:     # <= : à égalité on prend dans lst_a (tri stable)
            resultat.append(lst_a[i])
            i += 1
        else:
            resultat.append(lst_b[j])
            j += 1
    # l'une des deux listes est épuisée : on recopie la fin de l'autre
    resultat.extend(lst_a[i:])
    resultat.extend(lst_b[j:])
    return resultat


def fusion_2(lst_a, lst_b):
    """ réalise la fusion de deux listes triées
    en une grande liste trieé.

    Tests automatiques :
    >>> fusion_2([], [])
    []
    >>> fusion_2([1, 2], [])
    [1, 2]
    >>> fusion_2([], [1, 2])
    [1, 2]
    >>> fusion_2([1, 3, 4, 5], [6, 7, 8, 9])
    [1, 3, 4, 5, 6, 7, 8, 9]
    >>> fusion_2([6, 7, 8, 9], [1, 3, 4, 5])
    [1, 3, 4, 5, 6, 7, 8, 9]
    >>> fusion_2(list(range(0, 20, 2)), list(range(1, 20, 2)))
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
    >>> fusion_2(list(range(1, 20, 2)), list(range(0, 20, 2)))
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
    >>> a, b = [1, 2, 3, 4], [1, 2, 3, 4]
    >>> fusion_2(a, b)
    [1, 1, 2, 2, 3, 3, 4, 4]
    >>> a
    [1, 2, 3, 4]
    >>> b
    [1, 2, 3, 4]
    """
    na, nb = len(lst_a), len(lst_b)
    resultat = [0] * (na + nb)       # liste réservée d'avance, remplie case par case
    i, j = 0, 0
    for k in range(na + nb):
        # on prend dans lst_a si lst_b est épuisée, ou si lst_a[i] est le plus petit
        if j >= nb or (i < na and lst_a[i] <= lst_b[j]):
            resultat[k] = lst_a[i]
            i += 1
        else:
            resultat[k] = lst_b[j]
            j += 1
    return resultat


def tri_fusion_avec(lst, fus):
    """Même tri fusion, avec la fonction de fusion passée en paramètre."""
    if len(lst) <= 1:
        return lst[:]
    milieu = len(lst) // 2
    return fus(tri_fusion_avec(lst[:milieu], fus), tri_fusion_avec(lst[milieu:], fus))


# ═══════════════════════════════════════════════════════════════════════════
#  TP 2 — KARATSUBA
# ═══════════════════════════════════════════════════════════════════════════

def conv(x):
    """
    Conversion d'un entier x de n chiffre en décimal
    vers une liste de n élément. Chaque élément étant un chiffre de 0 à 9.
    La liste est remplie Poids faible en tête

    Tests automatiques:
    >>> conv(12345)
    [5, 4, 3, 2, 1]
    >>> conv(0)
    [0]
    >>> conv(1000)
    [0, 0, 0, 1]
    """
    if x < 10:                       # un seul chiffre : cas de base
        return [x]
    return [x % 10] + conv(x // 10)  # chiffre des unités, puis le reste


def conv_inv(lst):
    """
    Conversion d'une liste de n élément. Chaque élément étant un chiffre de 0 à 9.
    vers un entier x de n chiffre en décimal.
    La liste est remplie Poids faible en tête

    Tests automatiques:
    >>> conv_inv([5, 4, 3, 2, 1])
    12345
    >>> conv_inv([0])
    0
    >>> conv_inv([0, 0, 0, 1])
    1000
    """
    if len(lst) == 1:                # un seul chiffre : cas de base
        return lst[0]
    return lst[0] + 10 * conv_inv(lst[1:])


def meme_len(l1, l2):
    """
    Compare la longueur des deux listes l1 et l2.
    Ajoute des zéros (en poids fort donc sans changer la valeur du nombre global
    a l'une ou l'autre des listes pour que les deux aient la même longueur.

    tests automatiques
    >>> a = [5, 4, 3, 2, 1]
    >>> b = [1]
    >>> meme_len(a, b)
    >>> a
    [5, 4, 3, 2, 1]
    >>> b
    [1, 0, 0, 0, 0]
    >>> b = [0, 0, 0, 0, 0, 0, 0, 1]
    >>> meme_len(a,b)
    >>> a
    [5, 4, 3, 2, 1, 0, 0, 0]
    >>> b
    [0, 0, 0, 0, 0, 0, 0, 1]
    """
    while len(l1) < len(l2):
        l1.append(0)
    while len(l2) < len(l1):
        l2.append(0)


def supp_zero(lst):
    """
    Suppression des 0 en poids fort
    dans la liste lst qui est modifiée par cette fonction
    tests automatiques
    >>> a = [5, 4, 3, 2, 1, 0, 0, 0]
    >>> supp_zero(a)
    >>> a
    [5, 4, 3, 2, 1]
    >>> b = [1, 0, 0, 0, 0]
    >>> supp_zero(b)
    >>> b
    [1]
    >>> c = [0, 0, 0, 0, 0]
    >>> supp_zero(c)
    >>> c
    [0]
    """
    while len(lst) > 1 and lst[-1] == 0:   # on garde toujours au moins un chiffre
        lst.pop()


def add(lst1, lst2):
    """
    Addition des deux nombres lstA et lstB sous forme de liste de chiffre, poids faible en tête.
    lstA et lstB ne sont pas modifiées par la fonction
    retourne le résultat sous forme d'une liste

    Tests automatiques
    >>> a = [2, 5]
    >>> b = [9, 2]
    >>> add(a,b)
    [1, 8]
    >>> a = [8, 9, 9, 9]
    >>> b = [1]
    >>> add(a,b)
    [9, 9, 9, 9]
    >>> a
    [8, 9, 9, 9]
    >>> b
    [1]
    >>> a = [9, 9, 9, 9]
    >>> b = [1]
    >>> add(a,b)
    [0, 0, 0, 0, 1]
    >>> a
    [9, 9, 9, 9]
    >>> b
    [1]
    >>> a = [5, 4, 3, 2, 1]
    >>> b = [5, 6, 7, 8, 9]
    >>> add(a,b)
    [0, 1, 1, 1, 1, 1]
    >>> a
    [5, 4, 3, 2, 1]
    >>> b
    [5, 6, 7, 8, 9]
    """
    l1 = lst1[:]                     # copies : lst1 et lst2 ne sont pas modifiées
    l2 = lst2[:]
    meme_len(l1, l2)
    retenue = 0
    result = []
    for i in range(len(l1)):
        s = l1[i] + l2[i] + retenue
        result.append(s % 10)        # chiffre des unités
        retenue = s // 10            # chiffre des dizaines : retenue
    if retenue != 0:                 # retenue finale : un chiffre de plus
        result.append(retenue)
    return result


def plus_grand(lst1, lst2):
    """
    Compare les valeurs de lst1 et lst2
    si lst1 >= lst2 retourne True
    sinon, retourne False

    Tests automatiques
    >>> a = [1, 2, 3, 4, 5]
    >>> b = [1, 2, 3, 4, 5]
    >>> plus_grand(a, b)
    True
    >>> b = [2, 2, 3, 4, 5]
    >>> plus_grand(a, b)
    False
    >>> plus_grand(b, a)
    True
    >>> a = [7, 7, 3, 1, 3]
    >>> b = [3, 0, 4, 3, 9]
    >>> plus_grand(b, a)
    True
    """
    l1 = lst1[:]
    l2 = lst2[:]
    meme_len(l1, l2)                 # mêmes longueurs : on compare chiffre à chiffre
    for i in range(len(l1) - 1, -1, -1):   # du poids fort vers le poids faible
        if l1[i] > l2[i]:
            return True
        if l1[i] < l2[i]:
            return False
    return True                      # tous les chiffres sont égaux


def sub(lst1, lst2):
    """Renvoie lst1 - lst2 sans modifier lst1 et lst2.
    La méthode utilisée est celle des soustractions posées comme a l'école primaire

    Tests automatiques
    >>> a = [2, 2, 3, 4, 5]
    >>> b = [1, 2, 3, 4, 5]
    >>> sub(a, b)
    [1]
    >>> b = [1]
    >>> a = [0, 0, 0, 0, 0, 0, 0, 0, 0, 1]
    >>> sub(a, b)
    [9, 9, 9, 9, 9, 9, 9, 9, 9]
    """
    l1 = lst1[:]
    l2 = lst2[:]
    meme_len(l1, l2)
    retenue = 0
    result = []

    for i in range(len(l1)):
        chiffre = l1[i] - l2[i] - retenue
        if chiffre < 0:              # on « emprunte » une dizaine au rang suivant
            chiffre += 10
            retenue = 1
        else:
            retenue = 0
        result.append(chiffre)
    supp_zero(result)
    return result


compt_mul = 0


def mul_Kara(lst1, lst2):
    """Multiplication des deux listes lst1 et lst2 avec la méthode de KARATSUBA
    Fonctions récursive qui ne modifie pas lst1 et lst2.

    >>> conv_inv(mul_Kara(conv(1234), conv(5678)))
    7006652
    >>> mul_Kara([9], [9])
    [1, 8]
    """
    global compt_mul
    # copie les listes pour ne pas les modifier
    l1 = lst1[:]
    l2 = lst2[:]
    # ajuste les longueurs des listes éventuellement
    meme_len(l1, l2)

    # condition d'arrêt
    # les listes ont un seul éléments
    if len(l1) == 1:
        compt_mul += 1                       # une multiplication élémentaire
        return conv(l1[0] * l2[0])           # 0 à 81 : un ou deux chiffres

    # les listes ont plus que 1 élément
    # on les coupe en deux
    k = len(l1) // 2
    b, a = l1[:k], l1[k:]    # M = a * 10^k + b  (b = poids faibles, en tête)
    d, c = l2[:k], l2[k:]    # N = c * 10^k + d
    for part in (a, b, c, d):
        supp_zero(part)

    # on applique ensuite Karatsuba sur les 4 parties
    t1 = mul_Kara(a, c)
    t2 = mul_Kara(b, d)

    # t3 = (a - b) * (c - d) = t31 * t32
    # attention au signe, le résultat peut être négatif
    sign = 1 # on démarre avec un signe +
    if plus_grand(a, b):
        t31 = sub(a, b)
    else:
        t31 = sub(b, a)
        sign = -sign
    if plus_grand(c, d):
        t32 = sub(c, d)
    else:
        t32 = sub(d, c)
        sign = -sign

    t3 = mul_Kara(t31, t32)

    # t = t1 + t2 - t3
    # selon signe de t3
    if sign > 0:
        t = sub(add(t1, t2), t3)
    else:
        t = add(add(t1, t2), t3)
    # t1 * 10^2k + t * 10^k + t2 : multiplier par 10^k = ajouter k zéros en tête
    res = add(add([0] * (2 * k) + t1, [0] * k + t), t2)

    supp_zero(res)

    return res


def mul_naive(lA, lB):
    """Multiplication naive (comme a l'école primaire) entre les deux listes lA et lB.
    Renvoi le résultat et ne modifie pas les les listes lA et lB

    >>> conv_inv(mul_naive(conv(1234), conv(5678)))
    7006652
    """
    l1 = lA[:]
    l2 = lB[:]
    #pour compter le nombre de multiplication élémentaire
    global compt_mul

    res = []   # matrice des multiplications chiffre par chiffre
    for i in range(len(l1)):
        r = 0   # retenue nulle au début
        res.append([0] * i)    # on décale d'un cran a chaque chiffre de l1
        for j in range(len(l2)):
            compt_mul += 1
            result = l1[i] * l2[j] + r
            res[i].append(result % 10)    # le chiffre des unité va au résultat
            r = result // 10    # celui des dizaine part en retenue
        if r != 0:
            res[i].append(r)

    result = []    # resultat final
    for i in range(len(res)):
        result = add(result, res[i])

    return result


# ═══════════════════════════════════════════════════════════════════════════
#  TP 3 — ROTATION D'IMAGE
# ═══════════════════════════════════════════════════════════════════════════

try:
    from PIL import Image
    PIL_OK = True
except ImportError:
    PIL_OK = False

    class _MiniImage:
        """Image RVB minimale (repli quand Pillow est absent)."""
        def __init__(self, size, color=(0, 0, 0)):
            self.size = size
            larg, haut = size
            self._px = [[color] * larg for _ in range(haut)]

        def getpixel(self, xy):
            return self._px[xy[1]][xy[0]]

        def putpixel(self, xy, couleur):
            self._px[xy[1]][xy[0]] = couleur

        def crop(self, box):
            x1, y1, x2, y2 = box
            im = _MiniImage((x2 - x1, y2 - y1))
            im._px = [ligne[x1:x2] for ligne in self._px[y1:y2]]
            return im

        def paste(self, im, pos=(0, 0)):
            x0, y0 = pos
            for y, ligne in enumerate(im._px):
                self._px[y0 + y][x0:x0 + len(ligne)] = ligne

        def copy(self):
            return self.crop((0, 0) + self.size)

        def tobytes(self):
            return bytes(c for ligne in self._px for px in ligne for c in px)

    class Image:                       # espace de noms qui imite PIL.Image
        @staticmethod
        def new(mode, size, color=(0, 0, 0)):
            return _MiniImage(size, color)


def rotation_naive(img):
    """Rotation d'un quart de tour dans le sens horaire, pixel par pixel."""
    largeur, hauteur = img.size
    assert largeur == hauteur, "Cette fonction ne traite que les images carrées"
    n = largeur

    imNew = Image.new('RGB', (n, n))

    for x in range(n):
        for y in range(n):
            # (x, y) part en (n - 1 - y, x)
            imNew.putpixel((n - 1 - y, x), img.getpixel((x, y)))

    return imNew


def un_niveau(img):
    """Une seule étape : découpe en quatre carrés et permutation circulaire."""
    n, hauteur = img.size
    m = n // 2

    #Découpe en quatre carrés
    carreA = img.crop((0, 0, m, m))     # haut gauche
    carreB = img.crop((m, 0, n, m))     # haut droite
    carreC = img.crop((0, m, m, n))     # bas gauche
    carreD = img.crop((m, m, n, n))     # bas droite

    #recombine l'image en faisant tourner les carrés
    imNew = Image.new('RGB', (n, n))

    imNew.paste(carreA, (m, 0))         # A : haut gauche  -> haut droite
    imNew.paste(carreB, (m, m))         # B : haut droite  -> bas droite
    imNew.paste(carreD, (0, m))         # D : bas droite   -> bas gauche
    imNew.paste(carreC, (0, 0))         # C : bas gauche   -> haut gauche

    return imNew


def rotation_dpr(img):
    """Rotation d'un quart de tour (sens horaire) par diviser pour régner.
    Hypothèse : image carrée dont le côté est une puissance de 2."""
    n, hauteur = img.size
    assert n == hauteur, "Cette fonction ne traite que les images carrées"

    # RÉGNER : un carré de 1 pixel est sa propre rotation
    if n == 1:
        return img.copy()

    m = n // 2

    # Découpe en quatre carrés
    carre_A = img.crop((0, 0, m, m))
    carre_B = img.crop((m, 0, n, m))
    carre_C = img.crop((0, m, m, n))
    carre_D = img.crop((m, m, n, n))

    # On relance la fonction sur les 4 morceaux
    carre_A = rotation_dpr(carre_A)
    carre_B = rotation_dpr(carre_B)
    carre_C = rotation_dpr(carre_C)
    carre_D = rotation_dpr(carre_D)

    # Recombine l'image en faisant tourner les carrés
    im_new = Image.new('RGB', (n, n))
    im_new.paste(carre_A, (m, 0))
    im_new.paste(carre_B, (m, m))
    im_new.paste(carre_D, (0, m))
    im_new.paste(carre_C, (0, 0))

    return im_new


def rotation_dpr_2(img, reverse=False):
    """Comme rotation_dpr ; si reverse vaut True, rotation dans le sens anti-horaire."""
    n, hauteur = img.size
    assert n == hauteur, "Cette fonction ne traite que les images carrées"

    if n == 1:
        return img.copy()

    m = n // 2

    carre_A = rotation_dpr_2(img.crop((0, 0, m, m)), reverse)
    carre_B = rotation_dpr_2(img.crop((m, 0, n, m)), reverse)
    carre_C = rotation_dpr_2(img.crop((0, m, m, n)), reverse)
    carre_D = rotation_dpr_2(img.crop((m, m, n, n)), reverse)

    im_new = Image.new('RGB', (n, n))
    if not reverse:                     # sens horaire : A -> B -> D -> C -> A
        im_new.paste(carre_A, (m, 0))
        im_new.paste(carre_B, (m, m))
        im_new.paste(carre_D, (0, m))
        im_new.paste(carre_C, (0, 0))
    else:                               # sens anti-horaire : A -> C -> D -> B -> A
        im_new.paste(carre_A, (0, m))
        im_new.paste(carre_C, (m, m))
        im_new.paste(carre_D, (m, 0))
        im_new.paste(carre_B, (0, 0))
    return im_new


# ═══════════════════════════════════════════════════════════════════════════
#  VÉRIFICATIONS
# ═══════════════════════════════════════════════════════════════════════════

def verifier_tp1():
    global _appels
    print('── TP 1 : occurrences et tri fusion')
    for s in ['', 'a', 'abracadabra', 'Été à Évreux, été à Caen', 'x' * 1000]:
        for c in 'aàxÉé,':
            assert nb_occurence(s, c) == s.count(c) == nb_occurence_i(s, c)
            if len(s) < 900:
                assert nb_occurence_2(s, c) == s.count(c)
    assert nb_occurence('a' * 100000, 'a') == 100000     # profondeur ~17 seulement
    try:
        nb_occurence_2('a' * 1000, 'a')
        raise AssertionError('RecursionError attendue')
    except RecursionError:
        pass                                            # profondeur n : la pile déborde
    _appels = 0
    nb_occurence_compte('abracadabra', 'a')
    assert _appels == 2 * 11 - 1 == 21
    print('   nb_occurence : identique à str.count ; 21 appels pour "abracadabra" (2n - 1)')
    t_rec = timeit("nb_occurence('abracadabra', 'a')", number=100000, globals=globals())
    t_ite = timeit("nb_occurence_i('abracadabra', 'a')", number=100000, globals=globals())
    print('   Version récursive : %.3f s   Version itérative : %.3f s   (100 000 appels)' % (t_rec, t_ite))

    assert _fusion([1, 4, 8], [2, 3, 12]) == [1, 2, 3, 4, 8, 12]
    assert _fusion([], []) == [] and _fusion([], [1, 2]) == [1, 2] and _fusion([3], []) == [3]
    assert _fusion([1, 1, 2], [1, 2, 2]) == [1, 1, 1, 2, 2, 2]
    assert _fusion([-5, 0], [-7, 10]) == [-7, -5, 0, 10]
    assert tri_fusion([45, 6, 78, 45, 33, 1, 0]) == [0, 1, 6, 33, 45, 45, 78]
    a = [-1, 1, 1, 4, 8, 15, 142, 143]
    b = [1, 2, 3, 12, 15, 46, 48, 78, 125]
    assert fusion_2(a, b) == [-1, 1, 1, 1, 2, 3, 4, 8, 12, 15, 15, 46, 48, 78, 125, 142, 143]
    assert fusion([1, 1, 4, 8, 15, 101, 103], [1, 2, 3, 12, 15, 46, 48, 78, 85]) == \
        [1, 1, 1, 2, 3, 4, 8, 12, 15, 15, 46, 48, 78, 85, 101, 103]
    for _ in range(300):
        lst = [randint(-50, 50) for _ in range(randint(0, 60))]
        copie = lst[:]
        attendu = sorted(lst)
        assert tri_fusion(lst) == attendu and lst == copie
        assert tri_fusion_avec(lst, fusion) == attendu
        assert tri_fusion_avec(lst, fusion_2) == attendu
        x, y = sorted(lst[:len(lst) // 3]), sorted(lst[len(lst) // 3:])
        assert fusion(x, y) == fusion_2(x, y) == _fusion(x, y) == sorted(x + y)
    # stabilité : on trie des couples sur leur première composante
    class Cle:
        def __init__(self, v, nom):
            self.v, self.nom = v, nom
        def __lt__(self, autre):
            return self.v < autre.v
        def __le__(self, autre):
            return self.v <= autre.v
    cartes = [Cle(2, 'a'), Cle(1, 'b'), Cle(2, 'c'), Cle(1, 'd')]
    assert [c.nom for c in tri_fusion_avec(cartes, fusion)] == ['b', 'd', 'a', 'c']
    print('   _fusion, tri_fusion, fusion, fusion_2 : 300 listes aléatoires triées correctement')

    print('   Comparaison des tris (temps en s) :')
    for n in [100, 1000, 10000]:
        a = [x for x in range(n)]
        shuffle(a)
        a1 = a.copy()
        t_sel = timeit('triSelection(a1)', number=1, globals={'triSelection': triSelection, 'a1': a1})
        a1 = a.copy()
        t_ins = timeit('triInsertion(a1)', number=1, globals={'triInsertion': triInsertion, 'a1': a1})
        a1 = a.copy()
        t_fus = timeit('tri_fusion(a1)', number=1, globals={'tri_fusion': tri_fusion, 'a1': a1})
        print('     n = %6d   sélection %8.4f   insertion %8.4f   fusion %8.4f' % (n, t_sel, t_ins, t_fus))
    for n in [100000, 1000000]:
        a = [x for x in range(n)]
        shuffle(a)
        t_fus = timeit('tri_fusion(a)', number=1, globals={'tri_fusion': tri_fusion, 'a': a})
        t_sor = timeit('sorted(a)', number=1, globals={'a': a})
        print('     n = %7d   tri_fusion %7.3f   sorted %7.4f' % (n, t_fus, t_sor))


def verifier_tp2():
    global compt_mul
    print('── TP 2 : Karatsuba')
    a = 1234567890123456789012345678909999999912659845589961469813613131313131361368874655441588556585
    b = 9876543210987654321098765432100000000000002256622541258562555855654555215254438542435435435435
    res = a * b
    assert conv_inv(conv(a)) == a
    assert sub([1], [1]) == [0] and plus_grand([5, 4], [0]) and not plus_grand([1, 7, 3, 1, 3], [2, 7, 3, 1, 3])
    print('   n vaut', max(len(str(a)), len(str(b))))

    compt_mul = 0
    res1 = mul_Kara(conv(a), conv(b))
    assert conv_inv(res1) == res, "Résultat faux"
    kara = compt_mul
    print('  ', kara, 'multiplications élémentaires (Karatsuba)')

    compt_mul = 0
    res2 = mul_naive(conv(a), conv(b))
    assert conv_inv(res2) == res, "Résultat faux"
    naive = compt_mul
    print('  ', naive, 'multiplications élémentaires (naïve)')
    assert (kara, naive) == (1631, 8836)     # chiffres annoncés en séance le 15 octobre

    compt_mul = 0
    mul_Kara(conv(1234), conv(5678))
    assert compt_mul == 9                    # exemple du notebook : 9 au lieu de 16

    # produits aléatoires, y compris avec des zéros et des longueurs différentes
    for _ in range(300):
        x = randint(0, 10 ** randint(1, 40))
        y = randint(0, 10 ** randint(1, 40))
        assert conv_inv(mul_Kara(conv(x), conv(y))) == x * y
        assert conv_inv(mul_naive(conv(x), conv(y))) == x * y
        assert conv_inv(add(conv(x), conv(y))) == x + y
        assert plus_grand(conv(x), conv(y)) == (x >= y)
        if x >= y:
            assert conv_inv(sub(conv(x), conv(y))) == x - y
    print('   300 produits aléatoires vérifiés ; 1234 x 5678 : 9 multiplications')

    # Attention : avec x = 99...9, a - b = 0 et Karatsuba ne fait que 2n - 1 multiplications.
    compt_mul = 0
    mul_Kara(conv(10 ** 64 - 1), conv(10 ** 64 - 1))
    assert compt_mul == 2 * 64 - 1
    print('   Nombre de multiplications selon n (deux nombres aléatoires de n chiffres) :')
    hasard = Random(2026)
    for n in [2, 4, 8, 16, 32, 64, 128, 256]:
        x = conv(hasard.randint(10 ** (n - 1), 10 ** n - 1))
        y = conv(hasard.randint(10 ** (n - 1), 10 ** n - 1))
        compt_mul = 0
        mul_Kara(x, y)
        print('     n = %3d   Karatsuba %6d   naïve %6d   3^log2(n) = n^1,585 : %6.0f' % (n, compt_mul, n * n, n ** 1.585))


def verifier_tp3():
    print('── TP 3 : rotation d\'image' + ('' if PIL_OK else ' (Pillow absent : image de synthèse)'))
    # petite image de test 8 x 8 : chaque pixel a une couleur unique
    test = Image.new('RGB', (8, 8))
    for x in range(8):
        for y in range(8):
            test.putpixel((x, y), (x * 30, y * 30, 7))
    r = rotation_naive(test)
    assert r.getpixel((6, 1)) == test.getpixel((1, 1))     # exemples du notebook
    assert r.getpixel((3, 7)) == test.getpixel((7, 4))
    assert r.getpixel((0, 4)) == test.getpixel((4, 7))
    assert rotation_dpr(test).tobytes() == r.tobytes()
    assert rotation_dpr_2(test).tobytes() == r.tobytes()
    gauche = rotation_dpr_2(test, reverse=True)
    assert rotation_dpr_2(gauche).tobytes() == test.tobytes()       # retour au départ
    quatre = test
    for _ in range(4):
        quatre = rotation_dpr(quatre)
    assert quatre.tobytes() == test.tobytes()                       # 4 quarts de tour
    print('   image 8 x 8 : naïve = DPR ; horaire puis anti-horaire = identité ; 4 quarts de tour = identité')

    if PIL_OK and os.path.exists('perroquet_256_cc.jpg'):
        im2 = Image.open('perroquet_256_cc.jpg').convert('RGB')
        assert im2.size == (256, 256)
        reference = im2.transpose(Image.Transpose.ROTATE_270)      # 90° sens horaire
        assert rotation_naive(im2).tobytes() == reference.tobytes()
        assert rotation_dpr(im2).tobytes() == reference.tobytes()
        assert rotation_dpr_2(im2, reverse=True).tobytes() == im2.transpose(Image.Transpose.ROTATE_90).tobytes()
        un = un_niveau(im2)
        assert un.crop((128, 0, 256, 128)).tobytes() == im2.crop((0, 0, 128, 128)).tobytes()
        t_naive = timeit('rotation_naive(im2)', number=1, globals={'rotation_naive': rotation_naive, 'im2': im2})
        t_dpr = timeit('rotation_dpr(im2)', number=1, globals={'rotation_dpr': rotation_dpr, 'im2': im2})
        t_pil = timeit('im2.transpose(T)', number=1, globals={'im2': im2, 'T': Image.Transpose.ROTATE_270})
        print('   perroquet 256 x 256 : identique à transpose(ROTATE_270) ; anti-horaire = ROTATE_90')
        print('   temps : naïve %.3f s   DPR %.3f s   transpose (C) %.5f s' % (t_naive, t_dpr, t_pil))
    elif PIL_OK:
        print('   perroquet_256_cc.jpg absent : test sur l\'image réelle sauté')


if __name__ == '__main__':
    resultat = doctest.testmod()
    print('doctest :', resultat)
    assert resultat.failed == 0
    verifier_tp1()
    verifier_tp2()
    verifier_tp3()
    print('Tout est vérifié.')
