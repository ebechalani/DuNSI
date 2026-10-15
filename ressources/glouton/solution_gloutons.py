"""Solutions complètes du TP « Les algorithmes gloutons » (FDIU, LANSIG/NSI).
Toutes les fonctions laissées à trous dans le notebook, plus les vérifications.
"""

# ══════════════════════════════════════════════════════════════════
# 1. CHANGEMENT DE BASE : DÉCIMAL -> BINAIRE (stratégie gloutonne)
# ══════════════════════════════════════════════════════════════════
def dec_vers_bin_16b(n):
    """n entier de 0 à 65535 -> chaîne de 16 caractères '0'/'1'."""
    resultat = ""
    for i in range(15, -1, -1):      # du poids fort (2^15) au poids faible (2^0)
        poids = 2 ** i
        if n >= poids:
            resultat += "1"
            n -= poids
        else:
            resultat += "0"
    return resultat


def dec_vers_bin(n):
    """Même stratégie, sans limite supérieure."""
    if n == 0:
        return "0"
    poids = 1
    while poids * 2 <= n:            # on cherche d'abord le plus grand poids utile
        poids *= 2
    resultat = ""
    while poids >= 1:
        if n >= poids:
            resultat += "1"
            n -= poids
        else:
            resultat += "0"
        poids //= 2
    return resultat


def dec_vers_bin_while(n):
    """Version par divisions successives : on construit le résultat à l'envers."""
    if n == 0:
        return "0"
    resultat = ""
    while n > 0:
        resultat = str(n % 2) + resultat
        n = n // 2
    return resultat


# ══════════════════════════════════════════════════════════════════
# 2. LE RENDU DE MONNAIE
# ══════════════════════════════════════════════════════════════════
def rendu_glouton(rst, lst_piece):
    """Rend la monnaie en prenant toujours la plus grande pièce possible."""
    lst_rendu = []
    i = 0
    while rst > 0 and i < len(lst_piece):
        if lst_piece[i] <= rst:
            lst_rendu.append(lst_piece[i])
            rst -= lst_piece[i]
        else:
            i += 1               # cette pièce est trop grosse : on passe à la suivante
    return lst_rendu


def rendu_optimal(rst, lst_piece):
    """Référence exhaustive (programmation dynamique) : le nombre minimal de pièces."""
    INF = float("inf")
    mini = [0] + [INF] * rst
    choix = [None] * (rst + 1)
    for somme in range(1, rst + 1):
        for p in lst_piece:
            if p <= somme and mini[somme - p] + 1 < mini[somme]:
                mini[somme] = mini[somme - p] + 1
                choix[somme] = p
    if mini[rst] == INF:
        return None              # somme impossible à rendre
    pieces = []
    while rst > 0:
        pieces.append(choix[rst])
        rst -= choix[rst]
    return sorted(pieces, reverse=True)


# ══════════════════════════════════════════════════════════════════
# 3. LE PROBLÈME DU SAC À DOS
# ══════════════════════════════════════════════════════════════════
def masse(liste_objet):
    """Masse totale d'une liste d'objets (valeur, masse)."""
    total = 0
    for objet in liste_objet:
        total += objet[1]
    return total


def valeur(liste_objet):
    """Valeur totale d'une liste d'objets (valeur, masse)."""
    total = 0
    for objet in liste_objet:
        total += objet[0]
    return total


def sac_a_dos_1(masse_max, liste_objet):
    """Critère local : l'objet de plus grande VALEUR d'abord."""
    tries = sorted(liste_objet, reverse=True)        # tri sur le 1er élément : la valeur
    sac = []
    for objet in tries:
        if masse(sac) + objet[1] <= masse_max:
            sac.append(objet)
    return sac


def sac_a_dos_2(masse_max, liste_objet):
    """Critère local : le meilleur RAPPORT valeur/masse d'abord."""
    avec_ratio = [(v, m, v / m) for (v, m) in liste_objet]
    tries = sorted(avec_ratio, key=lambda x: x[2], reverse=True)
    sac = []
    for (v, m, _) in tries:
        if masse(sac) + m <= masse_max:
            sac.append((v, m))
    return sac


def sac_a_dos_optimal(masse_max, liste_objet):
    """Référence exhaustive : la meilleure valeur atteignable (sac à dos 0/1)."""
    meilleurs = {0: []}                              # masse -> meilleur sac de cette masse
    for (v, m) in liste_objet:
        nouveaux = dict(meilleurs)
        for mm, sac in meilleurs.items():
            if mm + m <= masse_max:
                cand = sac + [(v, m)]
                if valeur(cand) > valeur(nouveaux.get(mm + m, [])):
                    nouveaux[mm + m] = cand
        meilleurs = nouveaux
    return max(meilleurs.values(), key=valeur)


# ══════════════════════════════════════════════════════════════════
# 4. PLANNING DE CONFÉRENCIERS
# ══════════════════════════════════════════════════════════════════
def planning1(tab_inter):
    """Glouton : on retient toujours la conférence qui se TERMINE le plus tôt."""
    tries = sorted(tab_inter, key=lambda c: c[1])    # tri sur l'heure de fin
    planning = []
    fin_courante = 0
    for conf in tries:
        if conf[0] >= fin_courante:
            planning.append(conf)
            fin_courante = conf[1]
    return planning


def planning2(tab_inter, debut=0, i=0):
    """Recherche exhaustive récursive : le meilleur planning à partir de `debut`."""
    if i >= len(tab_inter):
        return []
    if tab_inter[i][0] < debut:                      # conférence déjà commencée
        return planning2(tab_inter, debut, i + 1)
    avec = [tab_inter[i]] + planning2(tab_inter, tab_inter[i][1], i + 1)
    sans = planning2(tab_inter, debut, i + 1)
    return avec if len(avec) >= len(sans) else sans


def duree_occupee(planning):
    return sum(fin - deb for (deb, fin, _) in planning)


def planning3(tab_inter, debut=0, i=0):
    """Comme planning2, mais à nombre égal on garde le planning le plus « serré »."""
    if i >= len(tab_inter):
        return []
    if tab_inter[i][0] < debut:
        return planning3(tab_inter, debut, i + 1)
    avec = [tab_inter[i]] + planning3(tab_inter, tab_inter[i][1], i + 1)
    sans = planning3(tab_inter, debut, i + 1)
    if len(avec) != len(sans):
        return avec if len(avec) > len(sans) else sans
    return avec if duree_occupee(avec) >= duree_occupee(sans) else sans


# ══════════════════════════════════════════════════════════════════
# 5. COMPLEXITÉ : FIBONACCI RÉCURSIF PUIS DYNAMIQUE
# ══════════════════════════════════════════════════════════════════
def fiboR(n):
    if n < 2:
        return n
    return fiboR(n - 1) + fiboR(n - 2)


dicFibo = {0: 0, 1: 1}


def fiboD(n):
    if n not in dicFibo:
        dicFibo[n] = fiboD(n - 1) + fiboD(n - 2)
    return dicFibo[n]


# ══════════════════════════════════════════════════════════════════
# VÉRIFICATIONS
# ══════════════════════════════════════════════════════════════════
if __name__ == "__main__":
    print("=" * 66)
    print("1. DÉCIMAL -> BINAIRE")
    for n in (0, 1, 5, 42, 255, 1000, 65535):
        a, b, c = dec_vers_bin_16b(n), dec_vers_bin(n), dec_vers_bin_while(n)
        ref = format(n, "016b")
        assert a == ref, (n, a, ref)
        assert b == c == format(n, "b"), (n, b, c)
        print(f"   {n:>6} -> 16 bits {a}   sans limite {b}")

    print("\n2. RENDU DE MONNAIE")
    euro = [200, 100, 50, 20, 10, 5, 2, 1]
    for somme, attendu in ((11, [10, 1]), (48, [20, 20, 5, 2, 1]), (52, [50, 2])):
        rd = rendu_glouton(somme, euro)
        print(f"   {somme:>3} cts -> {rd}   attendu {attendu}   {rd == attendu}")
        assert rd == attendu

    print("\n   Système NON canonique (30, 24, 12, 6, 3, 1) :")
    uk = [30, 24, 12, 6, 3, 1]
    for somme in (48, 52):
        g, o = rendu_glouton(somme, uk), rendu_optimal(somme, uk)
        print(f"   {somme:>3} : glouton {g} ({len(g)} pièces)  |  optimal {o} ({len(o)} pièces)")

    print("\n   Sans pièce de 1 ct :")
    sans1 = [200, 100, 50, 20, 10, 5, 2]
    g = rendu_glouton(11, sans1)
    print(f"   11 : glouton {g} -> total rendu {sum(g)} cts : il manque {11 - sum(g)} ct !")
    print(f"        optimal   {rendu_optimal(11, sans1)}")

    print("\n3. SAC À DOS")
    objets = [(5, 13), (4, 8), (3, 10), (7, 12)]
    print(f"   masse totale {masse(objets)} kg, valeur totale {valeur(objets)} €")
    for mx, attendu in ((15, [(7, 12)]), (21, [(7, 12), (4, 8)]), (30, [(7, 12), (5, 13)])):
        sad = sac_a_dos_1(mx, objets)
        print(f"   critère valeur, max {mx:>2} kg -> {sad}  {masse(sad)} kg  {valeur(sad)} €  "
              f"attendu {attendu}  {sad == attendu}")
        assert sad == attendu
    for mx in (15, 21, 30):
        s1, s2 = sac_a_dos_1(mx, objets), sac_a_dos_2(mx, objets)
        opt = sac_a_dos_optimal(mx, objets)
        print(f"   max {mx:>2} kg : v1 {valeur(s1)} €  |  v2 {valeur(s2)} €  |  optimal {valeur(opt)} € {opt}")

    print("\n   Sur la grande liste :")
    grande = [(35, 120), (30, 30), (26, 50), (21, 20), (18, 40), (17, 60), (15, 30),
              (14, 10), (13, 14), (11, 36), (10, 72), (9, 86), (8, 5), (7, 3), (6, 7),
              (5, 23), (4, 49), (3, 57), (2, 69), (1, 12)]
    print(f"   total {valeur(grande)} € pour {masse(grande)} kg")
    for mx in (205, 420):
        s1, s2 = sac_a_dos_1(mx, grande), sac_a_dos_2(mx, grande)
        opt = sac_a_dos_optimal(mx, grande)
        print(f"   max {mx} kg : v1 {valeur(s1):>3} € ({masse(s1)} kg) | "
              f"v2 {valeur(s2):>3} € ({masse(s2)} kg) | optimal {valeur(opt)} € ({masse(opt)} kg)")

    print("\n4. PLANNING DES CONFÉRENCIERS")
    tab_conf_1 = [(3, 4, 'C1'), (0, 1, 'C2'), (2, 3, 'C3'), (1, 2, 'C4')]
    tab_conf_2 = [(2, 4, 'C1'), (0, 1, 'C2'), (1, 3, 'C3'), (0, 2, 'C4')]
    tab_conf_3 = [(0, 3, 'C1'), (1, 2, 'C2'), (2, 3, 'C3')]
    tab_conf_4 = [(0, 7, 'C1'), (2, 5, 'C2'), (6, 8, 'C3'), (1, 2, 'C4'), (5, 6, 'C5'),
                  (0, 2, 'C6'), (4, 7, 'C7'), (0, 1, 'C8'), (3, 6, 'C9'), (1, 3, 'C10'),
                  (4, 5, 'C11'), (6, 8, 'C12'), (0, 2, 'C13'), (5, 7, 'C14'), (1, 4, 'C15')]
    for nom, tab in (('cas 1', tab_conf_1), ('cas 2', tab_conf_2),
                     ('cas 3', tab_conf_3), ('cas 4', tab_conf_4)):
        g = planning1(tab)
        e = planning2(sorted(tab))
        s = planning3(sorted(tab))
        noms = lambda p: [c[2] for c in p]
        print(f"   {nom} : glouton {len(g)} -> {noms(g)}")
        print(f"          exhaustif {len(e)} -> {noms(e)} | serré {len(s)} -> {noms(s)} "
              f"(occupe {duree_occupee(s)} h)")
        assert len(g) == len(e), f"{nom} : le glouton n'est pas optimal !"

    print("\n5. FIBONACCI")
    print("   fiboR(6) =", fiboR(6), " fiboD(60) =", fiboD(60))
    assert [fiboR(i) for i in range(10)] == [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
    assert fiboD(30) == fiboR(30)

    print("\n" + "=" * 66)
    print("Toutes les vérifications passent.")
