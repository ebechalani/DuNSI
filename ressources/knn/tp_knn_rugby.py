"""
TP — Classer des rugbymen avec les k plus proches voisins (k-NN)
DIU NSI — Bloc 2 (Algorithmique) — séance en ligne du 10 septembre 2026
D'après le cours « K plus proches voisins » de Laurent Amanton.

Objectif : prédire le poste d'un joueur de rugby (Avant ou Arrière) à partir de
sa taille et de son poids, en implémentant k-NN entièrement à la main.

Aucune bibliothèque d'apprentissage automatique : uniquement `math` (bibliothèque
standard) et `matplotlib` pour la visualisation finale. C'est l'approche du
programme de NSI, où scikit-learn n'est pas exigible.

Exécution :  python3 tp_knn_rugby.py
"""

import math
import matplotlib.pyplot as plt

# ══════════════════════════════════════════════════════════════════════════
# 1. LE JEU DE DONNÉES : [Nom, Taille (cm), Poids (kg), Poste]
#    30 joueurs (16 Avants, 14 Arrières)
# ══════════════════════════════════════════════════════════════════════════
joueurs = [
    # --- Avants ---
    ["Atonio", 196, 145, "Avant"], ["Baille", 182, 115, "Avant"],
    ["Marchand", 181, 108, "Avant"], ["Flament", 203, 116, "Avant"],
    ["Meafou", 203, 145, "Avant"], ["Alldritt", 191, 114, "Avant"],
    ["Ollivon", 199, 113, "Avant"], ["Cros", 190, 110, "Avant"],
    ["Wardi", 185, 110, "Avant"], ["Mauvaka", 183, 105, "Avant"],
    ["Aldegheri", 181, 115, "Avant"], ["Taofifenua", 200, 135, "Avant"],
    ["Woki", 196, 109, "Avant"], ["Boudehent", 192, 106, "Avant"],
    ["Jelonch", 193, 106, "Avant"], ["Bamba", 185, 117, "Avant"],
    # --- Arrières ---
    ["Dupont", 174, 85, "Arrière"], ["Ntamack", 186, 86, "Arrière"],
    ["Penaud", 192, 97, "Arrière"], ["Fickou", 190, 100, "Arrière"],
    ["Danty", 181, 106, "Arrière"], ["Bielle-Biarrey", 184, 82, "Arrière"],
    ["Ramos", 178, 81, "Arrière"], ["Lucu", 177, 84, "Arrière"],
    ["Jalibert", 189, 86, "Arrière"], ["Moefana", 183, 98, "Arrière"],
    ["Depoortère", 194, 94, "Arrière"], ["Lebel", 185, 93, "Arrière"],
    ["Gailleton", 185, 89, "Arrière"], ["Barré", 188, 88, "Arrière"]
]

# Les indices, pour lire le code sans compter sur ses doigts
NOM, TAILLE, POIDS, POSTE = 0, 1, 2, 3


# ══════════════════════════════════════════════════════════════════════════
# 2. SÉPARATION ENTRAÎNEMENT / TEST (environ 75 % / 25 %)
#
#    On sépare STATIQUEMENT (pas de `random`) pour que tout le monde obtienne
#    exactement les mêmes résultats.
#
#    PIÈGE : la liste est rangée par poste (16 Avants PUIS 14 Arrières). Prendre
#    « les 22 premiers » pour l'entraînement mettrait 16 avants et seulement
#    6 arrières à l'entraînement, et 8 arrières — et aucun avant — dans le test.
#    On prend donc des joueurs DE CHAQUE POSTE : c'est un découpage *stratifié*.
# ══════════════════════════════════════════════════════════════════════════
avants = [j for j in joueurs if j[POSTE] == "Avant"]
arrieres = [j for j in joueurs if j[POSTE] == "Arrière"]

# Test : les 4 premiers de chaque poste. Entraînement : tous les autres.
test = avants[:4] + arrieres[:4]
entrainement = avants[4:] + arrieres[4:]


# ══════════════════════════════════════════════════════════════════════════
# 3. LA DISTANCE EUCLIDIENNE
#    d(A, B) = racine( (tailleA - tailleB)² + (poidsA - poidsB)² )
# ══════════════════════════════════════════════════════════════════════════
def distance(joueur_a, joueur_b):
    """Distance euclidienne entre deux joueurs, dans le plan (taille, poids)."""
    dt = joueur_a[TAILLE] - joueur_b[TAILLE]
    dp = joueur_a[POIDS] - joueur_b[POIDS]
    return math.sqrt(dt ** 2 + dp ** 2)


# ══════════════════════════════════════════════════════════════════════════
# 4. LES k PLUS PROCHES VOISINS
#
#    `sorted` ne modifie pas la liste d'origine et son tri est STABLE : deux
#    joueurs à égale distance restent dans l'ordre du jeu d'entraînement.
#    C'est ce qui rend les résultats de ce TP reproductibles.
# ══════════════════════════════════════════════════════════════════════════
def plus_proches_voisins(entrainement, joueur, k):
    """Les k joueurs d'entraînement les plus proches de `joueur`."""
    tries = sorted(entrainement, key=lambda j: distance(j, joueur))
    return tries[:k]


# ══════════════════════════════════════════════════════════════════════════
# 5. LE VOTE MAJORITAIRE
# ══════════════════════════════════════════════════════════════════════════
def predire(entrainement, joueur, k):
    """Prédit le poste de `joueur` par un vote de ses k plus proches voisins."""
    voisins = plus_proches_voisins(entrainement, joueur, k)
    comptes = {}
    for v in voisins:
        comptes[v[POSTE]] = comptes.get(v[POSTE], 0) + 1
    # max() sur les valeurs du dictionnaire : le poste le plus représenté gagne.
    # Avec k impair et deux postes, il ne peut pas y avoir d'égalité.
    return max(comptes, key=comptes.get)


# ══════════════════════════════════════════════════════════════════════════
# 6. ÉVALUATION SUR LE JEU DE TEST
# ══════════════════════════════════════════════════════════════════════════
def evaluer(entrainement, test, k):
    """Renvoie (nombre de bonnes réponses, liste des noms mal classés)."""
    corrects, erreurs = 0, []
    for joueur in test:
        if predire(entrainement, joueur, k) == joueur[POSTE]:
            corrects += 1
        else:
            erreurs.append(joueur[NOM])
    return corrects, erreurs


# ══════════════════════════════════════════════════════════════════════════
# 7. NORMALISATION MIN-MAX
#
#    Xnew = (X - min(X)) / (max(X) - min(X))    →  toutes les valeurs dans [0, 1]
#
#    Les min et max sont calculés sur le jeu d'ENTRAÎNEMENT SEULEMENT, puis
#    appliqués tels quels au jeu de test : sinon, on utiliserait pour préparer
#    les données une information qu'on est censé ne pas connaître (fuite de
#    données), et le taux de réussite mesuré serait trop optimiste.
# ══════════════════════════════════════════════════════════════════════════
def bornes(donnees, colonne):
    valeurs = [j[colonne] for j in donnees]
    return min(valeurs), max(valeurs)


def normaliser(donnees, bornes_taille, bornes_poids):
    """Renvoie une COPIE des données avec taille et poids ramenés dans [0, 1]."""
    t_min, t_max = bornes_taille
    p_min, p_max = bornes_poids
    return [[j[NOM],
             (j[TAILLE] - t_min) / (t_max - t_min),
             (j[POIDS] - p_min) / (p_max - p_min),
             j[POSTE]] for j in donnees]


# ══════════════════════════════════════════════════════════════════════════
# 8. VISUALISATION
# ══════════════════════════════════════════════════════════════════════════
def visualiser(entrainement, test, k):
    plt.figure(figsize=(10, 7))
    for poste, couleur, marqueur in [("Avant", "#c0392b", "o"),
                                     ("Arrière", "#2471a3", "s")]:
        grp = [j for j in entrainement if j[POSTE] == poste]
        plt.scatter([j[TAILLE] for j in grp], [j[POIDS] for j in grp],
                    c=couleur, marker=marqueur, s=70, alpha=.75,
                    label=f"{poste} (entraînement)")

    for joueur in test:
        prediction = predire(entrainement, joueur, k)
        correct = prediction == joueur[POSTE]
        plt.scatter(joueur[TAILLE], joueur[POIDS],
                    c="none", edgecolors="#27ae60" if correct else "#e67e22",
                    marker="D", s=190, linewidths=2.5)
        plt.annotate(joueur[NOM], (joueur[TAILLE], joueur[POIDS]),
                     textcoords="offset points", xytext=(8, 6), fontsize=8)

    plt.scatter([], [], c="none", edgecolors="#27ae60", marker="D", s=120,
                linewidths=2.5, label="Test — bien classé")
    plt.scatter([], [], c="none", edgecolors="#e67e22", marker="D", s=120,
                linewidths=2.5, label="Test — mal classé")
    plt.xlabel("Taille (cm)")
    plt.ylabel("Poids (kg)")
    plt.title(f"Avants et arrières dans le plan (taille, poids) — prédiction à k={k}")
    plt.legend()
    plt.grid(alpha=.3)
    plt.tight_layout()
    plt.show()


# ══════════════════════════════════════════════════════════════════════════
# PROGRAMME PRINCIPAL
# ══════════════════════════════════════════════════════════════════════════
def main():
    K = 3   # valeur retenue pour l'évaluation détaillée

    print("=" * 70)
    print("TP k-NN — CLASSER DES RUGBYMEN (Avant / Arrière)")
    print("=" * 70)

    print(f"\n1. JEU DE DONNÉES : {len(joueurs)} joueurs "
          f"({len(avants)} avants, {len(arrieres)} arrières)")
    t_min, t_max = bornes(joueurs, TAILLE)
    p_min, p_max = bornes(joueurs, POIDS)
    print(f"   Taille : {t_min} à {t_max} cm (amplitude {t_max - t_min})")
    print(f"   Poids  : {p_min} à {p_max} kg (amplitude {p_max - p_min})")
    print("   Le poids varie sur une plage deux fois plus large que la taille :")
    print("   il pèsera donc deux fois plus lourd dans le calcul des distances.")

    print(f"\n2. DÉCOUPAGE STRATIFIÉ : {len(entrainement)} en entraînement, "
          f"{len(test)} en test "
          f"({100 * len(entrainement) // len(joueurs)} % / "
          f"{100 * len(test) // len(joueurs)} %)")
    print("   Test :", ", ".join(j[NOM] for j in test))

    print(f"\n3-6. ÉVALUATION À k={K} (données brutes)")
    for joueur in test:
        voisins = plus_proches_voisins(entrainement, joueur, K)
        prediction = predire(entrainement, joueur, K)
        verdict = "OK" if prediction == joueur[POSTE] else "ERREUR"
        print(f"   {joueur[NOM]:<15} {joueur[TAILLE]} cm {joueur[POIDS]} kg  "
              f"réel={joueur[POSTE]:<8} prédit={prediction:<8} [{verdict}]")
        print("      voisins : " + ", ".join(
            f"{v[NOM]} ({v[POSTE][:2]}, {distance(v, joueur):.2f})" for v in voisins))

    corrects, erreurs = evaluer(entrainement, test, K)
    print(f"\n   Taux de réussite : {corrects}/{len(test)} = "
          f"{100 * corrects / len(test):.1f} %")
    print(f"   Mal classé(s) : {', '.join(erreurs) if erreurs else 'aucun'}")

    print("\n7. INFLUENCE DE k")
    print(f"   racine({len(entrainement)}) = {math.sqrt(len(entrainement)):.2f} "
          f"→ la règle du cours conseille k = 5")
    b_taille = bornes(entrainement, TAILLE)
    b_poids = bornes(entrainement, POIDS)
    entr_n = normaliser(entrainement, b_taille, b_poids)
    test_n = normaliser(test, b_taille, b_poids)

    print(f"\n   {'k':>3} | {'brut':>18} | {'normalisé':>18}")
    print("   " + "-" * 45)
    for k in (1, 3, 5, 7, 9, 11):
        cb, eb = evaluer(entrainement, test, k)
        cn, en = evaluer(entr_n, test_n, k)
        print(f"   {k:>3} | {cb}/{len(test)} = {100 * cb / len(test):5.1f} %"
              f"      | {cn}/{len(test)} = {100 * cn / len(test):5.1f} %")
    print("\n   À k=1, Marchand est mal classé : son plus proche voisin est Danty")
    print("   (181 cm, 106 kg), un ARRIÈRE, à seulement 2,00 de distance. À k=3,")
    print("   Mauvaka et Wardi (avants) l'emportent 2 contre 1 : l'erreur disparaît.")
    print("   C'est le sur-ajustement décrit dans le cours.")
    print("\n   Fickou reste mal classé quel que soit k : centre de 190 cm pour")
    print("   100 kg, il a le gabarit d'un troisième ligne. L'information qui")
    print("   permettrait de le reconnaître n'est pas dans (taille, poids).")

    print("\n8. NORMALISATION MIN-MAX (bornes calculées sur l'entraînement)")
    print(f"   Taille : {b_taille[0]} à {b_taille[1]} cm   "
          f"Poids : {b_poids[0]} à {b_poids[1]} kg")
    print("   Elle n'améliore pas les résultats ici, et les dégrade même à k=3.")
    print("   En égalisant l'influence des deux caractéristiques, elle retire au")
    print("   poids le poids qu'il méritait : c'est lui qui sépare le mieux les")
    print("   deux postes. Normaliser est indispensable quand les échelles sont")
    print("   sans commune mesure (le revenu face à l'âge dans le cours) — pas")
    print("   quand la grande amplitude est justement la plus informative.")

    print("\n" + "=" * 70)
    visualiser(entrainement, test, K)


if __name__ == "__main__":
    main()
