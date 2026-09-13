# Insère les 8 fiches « Bases de données » (cours en ligne du 10 septembre 2026,
# Bloc 4 — B. Mermet, https://bases-de-donnees-26b46e.gitlab.io/) dans la table
# Supabase `fiches`.   Usage :  python _add_fiches_bdd.py
import sys, json, urllib.request, urllib.error
sys.stdout.reconfigure(encoding='utf-8')

URL = 'https://tnkwbcevfyslpetuuxlu.supabase.co'
ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRua3diY2V2ZnlzbHBldHV1eGx1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkxOTkzMjMsImV4cCI6MjA5NDc3NTMyM30.bMQJwMVioi6OSYWYqXFEwGA89AompDtnr-eDg6movWw'

TOPIC = 'Bases de données (SQL)'
BLOC = 'bloc4'
SRC = 'https://bases-de-donnees-26b46e.gitlab.io/'
LOCAL = 'ressources/bdd/'

def fiche(title, created, summary, objectifs, content, exercices):
    return {'title': title, 'bloc': BLOC, 'topic': TOPIC,
            'created_at': f'2026-09-10T{created}:00+00:00',
            'summary': summary, 'objectifs': objectifs,
            'content': content, 'exercices': exercices, 'code_example': None}

FICHES = [

# ─────────────────────────────────────────────────────────────────────────────
fiche('Bases de données relationnelles — DF, clés et formes normales', '09:00',
"Fil rouge de la ludothèque : pourquoi une table unique pose problème (redondance, anomalies), dépendances fonctionnelles, couverture minimale, clé minimale, formes normales 1FN/2FN/3FN et décomposition d'un schéma en 3FN.",
"Définir relation, schéma, tuple, attribut. Repérer les attributs non atomiques. Écrire les dépendances fonctionnelles d'un schéma et sa couverture minimale. Déterminer une clé minimale. Vérifier 1FN/2FN/3FN et décomposer un schéma en 3FN.",
f"""Cours du **10 septembre** (Bloc 4, B. Mermet) — [page d'origine]({SRC}bdr.html) · [copie locale]({LOCAL}bdr.html).

1) L'EXEMPLE INTRODUCTIF : LA LUDOTHÈQUE
On veut informatiser une ludothèque. Première idée : une seule grande table.

| Nom du jeu | Auteur 1 | Auteur 2 | Éditeur | Joueurs | Durée | Illustrateur | Nat. illustr. | Thèmes |
|---|---|---|---|---|---|---|---|---|
| Les chevaliers de la table ronde | Bruno Cathala | S. Laget | Days of Wonder | 3–7 | 90 | Julien Delval | Française | Moyen-âge, Légende arthurienne |
| Cargo Noir | Serge Laget | | Days of Wonder | 2–5 | 60 | Miguel Coimbra | Française | Marché noir, Navigation marchande |
| Era : medieval age | Matt Leacock | | EggertSpiele | 1–4 | 50 | Chris Quilliams | Canadienne | Médiéval, Construction |
| Smash up | Paul Peterson | | Iello | 2–4 | 45 | Balixa, Alsop, Torres | Américaine | Fantastique, Monstre, Pirate |

Cet exemple sert de fil rouge à tout le cours.

2) PREMIÈRES DÉFINITIONS
Dans le modèle relationnel, les données sont stockées dans des tables appelées **relations**.
Le **schéma de relation** est l'ensemble des noms de colonnes et de leurs types.
Chaque ligne est un **enregistrement** ou **tuple** ; chaque colonne est un **attribut** (ou champ), caractérisé par un nom et un type.

3) LES PROBLÈMES DE LA TABLE UNIQUE
Redondance : la nationalité de Days of Wonder est écrite deux fois.
Structure rigide : 2 auteurs au plus, 1 seul illustrateur — il faut « triturer » la table pour Smash up.
Contenus libres : « Serge Laget » ou « S. Laget », « Moyen-âge » ou « Médiéval » — les recherches deviennent impossibles.
Cellules multi-valuées : le champ Thèmes contient plusieurs informations.
Si l'on met un auteur par ligne, la redondance devient criante, et les redondances engendrent des **anomalies de mise à jour**. On va donc décomposer la relation en plusieurs relations.

4) DÉPENDANCE FONCTIONNELLE (DF)
Il y a dépendance fonctionnelle d'un ensemble d'attributs E vers un attribut A (notée E → A) si, pour tous les tuples ayant les mêmes valeurs sur E, la valeur de A est identique.
Un attribut est **atomique** s'il ne contient qu'une seule valeur, non composite (pas une liste de thèmes, pas une adresse complète).
Exemple sur la ludothèque, après avoir rendu les attributs atomiques (Thème unique, Nom/Prénom séparés) :
```
Ω = (NomJeu, NomAuteur, PrénomAuteur, Éditeur, NbJoueursMin, NbJoueursMax,
     NationalitéÉditeur, Durée, NomIllustrateur, PrénomIllustrateur,
     NationalitéIllustrateur, Thème)

NomJeu → Éditeur, NbJoueursMin, NbJoueursMax, Durée
Éditeur → NationalitéÉditeur
(NomIllustrateur, PrénomIllustrateur) → NationalitéIllustrateur
```
Propriétés des DF :
DF **réflexive** (triviale) : A → A, toujours vraie.
**Augmentation** : si X → A alors (X, B) → A est vraie aussi ; une DF **élémentaire** ne s'obtient pas par augmentation.
**Transitivité** : si X → A et A → B alors X → B ; une DF **directe** ne s'obtient pas par transitivité. Ex. : NomJeu → NationalitéÉditeur est vraie mais non directe.

5) COUVERTURE MINIMALE
La **fermeture transitive** d'un ensemble de DF est l'ensemble de toutes les DF qu'on peut en déduire (réflexivité, augmentation, transitivité).
La **couverture minimale** CMDF est un ensemble minimal de DF non réflexives, élémentaires et directes, de même fermeture transitive que l'ensemble de départ. Sur la ludothèque :
```
CMDF = {{ NomJeu → Éditeur, NomJeu → NbJoueursMin, NomJeu → NbJoueursMax,
         NomJeu → Durée, Éditeur → NationalitéÉditeur,
         (NomIllustrateur, PrénomIllustrateur) → NationalitéIllustrateur }}
```
(on suppose qu'il n'y a ni deux jeux homonymes, ni deux illustrateurs homonymes). On la représente souvent par un [graphe des DF]({LOCAL}grapheDF.png).

6) NOTION DE CLÉ
Une **clé** K est un sous-ensemble d'attributs tel que K → A pour tout attribut A du schéma. Deux tuples ne peuvent donc pas avoir les mêmes valeurs sur la clé. Tout sur-ensemble d'une clé est une clé.
Une **clé minimale** est une clé dont aucun sous-ensemble strict n'est clé (elle n'est pas forcément unique). Convention : on souligne les attributs de la clé.
Clé minimale de la ludothèque : (NomJeu, NomAuteur, PrénomAuteur, NomIllustrateur, PrénomIllustrateur, Thème).

7) FORMES NORMALES
Plus la forme normale est élevée, moins il y a de redondance. Chaque forme inclut la précédente.
**1FN** : tous les attributs sont atomiques (c'est la base du modèle relationnel).
**2FN** : 1FN, et aucun attribut non clé ne dépend d'une **partie seulement** d'une clé minimale.
**3FN** : 2FN, et aucune DF entre attributs non clés.
« Attribut non clé » = n'appartenant à aucune clé minimale. La 3FN ne supprime pas toutes les redondances.
Ludothèque : (Ω, CMDF) est en 1FN mais pas en 2FN, car NationalitéIllustrateur ne dépend que d'une partie de la clé.

8) PASSER EN 3FN
Passage en 2FN : pour chaque DF (partieDeClé → attributNonClé), on crée une relation de clé partieDeClé ; on fusionne les relations de même clé ; on garde une relation avec toute la clé minimale.
```
R1 = (NomJeu, NomAuteur, PrénomAuteur, NomIllustrateur, PrénomIllustrateur, Thème)
R2 = (NomJeu, Éditeur, NbJoueursMin, NbJoueursMax, Durée, NationalitéÉditeur)
R3 = (NomIllustrateur, PrénomIllustrateur, NationalitéIllustrateur)
```
Passage en 3FN : pour chaque DF (nonClé1 → nonClé2), on crée la table (nonClé1, nonClé2) et on retire nonClé2 de la relation de départ. Ici seule Éditeur → NationalitéÉditeur viole la 3FN :
```
R1  = (NomJeu, NomAuteur, PrénomAuteur, NomIllustrateur, PrénomIllustrateur, Thème)
R2a = (NomJeu, Éditeur, NbJoueursMin, NbJoueursMax, Durée)
R2b = (Éditeur, NationalitéÉditeur)
R3  = (NomIllustrateur, PrénomIllustrateur, NationalitéIllustrateur)
```
Remarque : cette démarche ne fait pas apparaître que (NomAuteur, PrénomAuteur) forment une même entité « Auteur » — d'où l'intérêt du modèle conceptuel (fiche suivante).""",
"""Exercice 1 — Dans la table introductive, quels champs ne sont pas atomiques ? Proposer un nouveau schéma.
Correction : Thèmes (plusieurs valeurs) ; Auteur/Illustrateur discutables (séparer nom et prénom). Schéma Ω donné dans la fiche.

Exercice 2 — Donner les dépendances fonctionnelles de Ω.
Correction : NomJeu → Éditeur, NbJoueursMin, NbJoueursMax, Durée ; Éditeur → NationalitéÉditeur ; (NomIllustrateur, PrénomIllustrateur) → NationalitéIllustrateur ; plus toutes les DF réflexives, augmentées et transitives (ex. NomJeu → NationalitéÉditeur).

Exercice 3 — Donner la couverture minimale, puis son graphe.
Correction : CMDF de la fiche (6 DF) ; graphe : ressources/bdd/grapheDF.png.

Exercice 4 — Déterminer une clé minimale.
Correction : (NomJeu, NomAuteur, PrénomAuteur, NomIllustrateur, PrénomIllustrateur, Thème).

Exercice 5 — (Ω, CMDF) est-elle en 1FN, 2FN, 3FN ?
Correction : 1FN oui ; 2FN non (NationalitéIllustrateur dépend d'une partie de la clé) ; donc 3FN non.

Exercices 6-7 — Passer en 2FN puis en 3FN.
Correction : R1, R2, R3 puis R1, R2a, R2b, R3 (voir fiche).

Exercice 8 — Remplir les tables R1, R2a, R2b, R3 avec les données de la ludothèque.
Correction : R2a contient 4 lignes (une par jeu), R2b 3 lignes (Days of Wonder/Française, EggertSpiele/Allemande, Iello/Française), R3 6 illustrateurs, R1 une ligne par (jeu, auteur, illustrateur, thème) — 17 lignes, toujours redondantes : la 3FN ne suffit pas."""),

# ─────────────────────────────────────────────────────────────────────────────
fiche('Modèle conceptuel — diagramme de classes et passage au relationnel', '09:10',
"Modéliser la ludothèque par un diagramme de classes UML : classes et attributs, identifiant non significatif, associations, cardinalités (0..1, 1..1, 0..*, 1..*), puis règles de traduction en schémas de relation (associations N-M et 1-N, fusion, attributs #).",
"Recenser les classes d'un problème. Dessiner les associations et justifier les cardinalités. Traduire un diagramme de classes en schémas de relation. Connaître les cas avancés : association ternaire, réflexive, attribut d'association.",
f"""Cours du **10 septembre** (Bloc 4, B. Mermet) — [page d'origine]({SRC}modeleConceptuel.html) · [copie locale]({LOCAL}modeleConceptuel.html).

1) POURQUOI UN MODÈLE CONCEPTUEL
Autre façon d'aborder la ludothèque : établir un **schéma conceptuel** avant les tables, avec un modèle entité-association ou un **diagramme de classes UML** (choix du cours). Attention : dans le modèle entité-association, les cardinalités ne sont pas notées au même endroit — ne pas mélanger les deux notations.

2) LES CLASSES
Chaque type de donnée devient une classe : un nom et des attributs. Première étape : recenser les types d'éléments à manipuler.
```
Jeu (NomJeu, NbJoueursMin, NbJoueursMax, Durée)
Auteur (NomAuteur, PrénomAuteur)
Éditeur (NomÉditeur, NationalitéÉditeur)
Illustrateur (NomIllustrateur, PrénomIllustrateur, NationalitéIllustrateur)
```
Variante discutable : une classe Nationalité à part.
Il est recommandé d'ajouter à chaque classe un attribut **non significatif** (un numéro : IdJeu, IdAuteur…) qui servira de clé. On précise ensuite les types des attributs : [diagramme des classes]({LOCAL}classes.png) · [classes typées]({LOCAL}classesTypees.png).

3) LES ASSOCIATIONS
Une association (ou relation) entre deux classes est un trait nommé : par exemple « est auteur de » entre Auteur et Jeu — [schéma]({LOCAL}association1.png). Il n'est pas nécessaire de préciser le sens de lecture quand il va de soi. [Diagramme complet avec toutes les associations]({LOCAL}association2.png).

4) LES CARDINALITÉS
Pour chaque association entre A et B, on écrit à chaque extrémité à combien d'instances de l'autre classe une instance peut être reliée, sous forme d'intervalle :

| Notation | Signification |
|---|---|
| 1..* | au moins 1 |
| 0..* (ou *) | un nombre quelconque |
| 0..1 | au plus 1 |
| 1..1 (ou 1) | exactement 1 |

Trop souples : la base peut devenir incohérente. Trop strictes : on bloque des cas non prévus ou l'évolution de la base. Les cardinalités dépendent du **cahier des charges** (un jeu a-t-il un seul éditeur ? dans la réalité, il existe des co-éditions).
Exemple Jeu–Auteur : un jeu a plusieurs auteurs au maximum, et 0 au minimum (le jeu d'échecs n'a pas d'auteur) ; un auteur a créé plusieurs jeux au maximum et 0 au minimum (pour pouvoir créer un auteur avant de lui associer des jeux). Résultat : 0..* des deux côtés — [schéma]({LOCAL}cardinalite1.png) · [diagramme complet avec cardinalités]({LOCAL}cardinalite2.png).

5) DU DIAGRAMME DE CLASSES AU MODÈLE RELATIONNEL
Étape 1 : un schéma de relation par classe.
Étape 2 : pour chaque association **N-M** (les deux cardinalités max sont *), créer une relation dont les attributs sont les clés des deux classes ; sa clé est l'ensemble de ces attributs.
Étape 3 : pour chaque association **1-N**, créer une relation avec les clés des deux classes ; sa clé est celle de la classe côté *.
Étape 4 : fusionner les schémas de relation de même clé.
Les attributs non clés qui reprennent une clé d'une autre table sont préfixés par # : leurs valeurs doivent exister dans la table référencée (ce sera une contrainte de référence).
```
Étape 1
  Illustrateur(IdIllustrateur, NomIllustrateur, PrénomIllustrateur, NationalitéIllustrateur)
  Auteur(IdAuteur, NomAuteur, PrénomAuteur)
  Éditeur(IdÉditeur, NomÉditeur, NationalitéÉditeur)
  Thème(IdThème, NomThème)
  Jeu(IdJeu, NomJeu, NbJoueursMin, NbJoueursMax, Durée)
Étape 2 (N-M)
  EstDessinéPar(#IdIllustrateur, #IdJeu)
  EstAuteurDe(#IdAuteur, #IdJeu)
  ParleDe(#IdThème, #IdJeu)
Étape 3 (1-N)
  Publie(#IdJeu, #IdÉditeur)
Étape 4 : fusion de Jeu et Publie (même clé IdJeu)
  Jeu(IdJeu, NomJeu, NbJoueursMin, NbJoueursMax, Durée, #IdÉditeur)
```
Contenu des tables pour la ludothèque : Éditeur = (1, Days of wonder, Française), (2, EggertSpiele, Allemande), (3, Iello, Française) ; Jeu = (1, Les chevaliers de la table ronde, 3, 7, 90, 1), (2, Cargo noir, 2, 5, 60, 1), (3, Era: medieval age, 1, 4, 50, 2), (4, Smash up, 2, 4, 45, 3) ; EstDessinéPar = (1,1), (2,2), (3,3), (4,4), (5,4), (6,4)…

6) POUR ALLER PLUS LOIN
Association entre plus de 2 classes (ternaire) : quel enseignant enseigne quelle matière à quel groupe — [schéma]({LOCAL}associationTernaire2.png). Ce n'est ni redondant ni équivalent aux trois associations deux à deux.
Association **réflexive** : une relation entre deux entités d'une même classe (lien de parenté) ; on nomme les rôles aux extrémités — [schéma]({LOCAL}associationReflexive.png).
Plusieurs associations entre les deux mêmes classes : chacune avec son nom et ses cardinalités.
**Attribut d'association** : la moyenne d'un élève dans une matière ne peut être ni dans Élève ni dans Matière ; c'est un attribut de l'association Élève–Matière — [schéma]({LOCAL}attributAssociation.png).""",
"""Exercice 1 — Déterminer les types de données (classes) du problème de la ludothèque.
Correction : Jeu, Auteur, Éditeur, Illustrateur (+ éventuellement Nationalité).

Exercice 2 — Compléter le diagramme avec toutes les associations.
Correction : est auteur de (Auteur–Jeu), est dessiné par (Illustrateur–Jeu), publie (Éditeur–Jeu), parle de (Thème–Jeu) — ressources/bdd/association2.png.

Exercice 3 — Ajouter les cardinalités.
Correction : Auteur–Jeu 0..* / 0..* ; Illustrateur–Jeu 0..* / 0..* ; Éditeur–Jeu 1 côté éditeur (un jeu a exactement un éditeur dans notre cahier des charges), 0..* côté jeu ; Thème–Jeu 0..* / 0..* — ressources/bdd/cardinalite2.png.

Exercice 4 — Traduire le diagramme en schémas de relation.
Correction : les 8 relations de la fiche (étape 4).

Exercice 5 — Donner le contenu des tables pour les données initiales.
Correction : Illustrateur (6 lignes), Auteur (4), Éditeur (3), Thème (9), Jeu (4), EstDessinéPar (6), EstAuteurDe (5), ParleDe (9).

Question ouverte (à poser en cours) : comment traduire un attribut d'association (la moyenne Élève–Matière) dans le modèle relationnel ?"""),

# ─────────────────────────────────────────────────────────────────────────────
fiche('Contraintes de référence (clés étrangères)', '09:20',
"La notation # du modèle conceptuel devient une contrainte de référence : RA(attRA) référence RB(attRB) — toute valeur de la clé étrangère doit exister comme valeur de clé dans la table référencée. Liste complète des contraintes de la ludothèque.",
"Définir formellement une contrainte de référence et la notion de clé étrangère. Lister toutes les contraintes de référence d'un schéma relationnel. Savoir qu'une clé étrangère peut rester non renseignée.",
f"""Cours du **10 septembre** (Bloc 4, B. Mermet) — [page d'origine]({SRC}contraintesReference.html) · [copie locale]({LOCAL}contraintesReference.html).

1) D'OÙ VIENT LA CONTRAINTE
Le modèle conceptuel a produit, par exemple :
```
Illustrateur(IdIllustrateur, NomIllustrateur, PrénomIllustrateur, NationalitéIllustrateur)
EstDessinéPar(#IdIllustrateur, #IdJeu)
```
Les deux attributs IdIllustrateur ne sont pas indépendants : dans EstDessinéPar, on ne peut mettre que des valeurs qui existent dans Illustrateur. La notation # n'existe pas dans le modèle relationnel : on l'exprime par une **contrainte de référence**.

2) DÉFINITION
Soient deux relations RA et RB, attRA un attribut de RA et attRB un attribut **clé** de RB. La contrainte
```
RA(attRA) référence RB(attRB)
```
signifie : si dans un tuple de RA l'attribut attRA vaut v, alors il existe au moins un tuple de RB où attRB vaut v.
On dit que attRA est une **clé étrangère** de RA.
Les deux attributs n'ont pas forcément le même nom (même si c'est souvent le cas).
Cas général (non traité) : une contrainte peut porter d'un ensemble d'attributs vers un ensemble d'attributs formant une clé.
Précision importante : la contrainte n'impose pas que la clé étrangère soit renseignée dans tous les tuples ; elle impose seulement que **si** une valeur est définie, elle existe dans la table référencée.

3) LES CONTRAINTES DE LA LUDOTHÈQUE
```
Jeu(IdÉditeur)                 référence Éditeur(IdÉditeur)
EstDessinéPar(IdIllustrateur)  référence Illustrateur(IdIllustrateur)
EstDessinéPar(IdJeu)           référence Jeu(IdJeu)
EstAuteurDe(IdAuteur)          référence Auteur(IdAuteur)
EstAuteurDe(IdJeu)             référence Jeu(IdJeu)
ParleDe(IdThème)               référence Thème(IdThème)
ParleDe(IdJeu)                 référence Jeu(IdJeu)
```
On peut aussi représenter ces contraintes par des flèches entre les schémas de relation (comme le font Access ou LibreOffice Base) — [schéma]({LOCAL}contraintesReference.png). Attention à ne pas confondre ce graphe avec un diagramme de classes.""",
"""Exercice — Déterminer toutes les contraintes de référence de la ludothèque (schéma de l'exercice 4 du modèle conceptuel).
Correction : les 7 contraintes listées dans la fiche.

Pour aller plus loin : dans la fiche « SQL — LMD/LDD », voir comment ces contraintes s'écrivent (REFERENCES / FOREIGN KEY) et pourquoi SQLite exige PRAGMA foreign_keys = ON pour les vérifier."""),

# ─────────────────────────────────────────────────────────────────────────────
fiche('Notion de SGBD (et pourquoi SQLite)', '09:30',
"Rôle et caractéristiques d'un système de gestion de bases de données (création, modification sous contraintes, langage de requêtes, persistance, gros volumes, concurrence, droits, déclencheurs, sauvegarde), panorama Oracle/MySQL/PostgreSQL/SQL Server/Access/LibreOffice Base, et le choix de SQLite 3 pour le cours.",
"Expliquer ce qu'est un SGBD et pourquoi on n'écrit pas soi-même la gestion des données. Citer les caractéristiques attendues d'un SGBD. Situer les principaux SGBD et justifier le choix de SQLite (embarqué, sans serveur, module Python sqlite3).",
f"""Cours du **10 septembre** (Bloc 4, B. Mermet) — [page d'origine]({SRC}sgbd.html) · [copie locale]({LOCAL}sgbd.html).

1) DÉFINITION
De nombreux logiciels ont besoin d'une base de données. Pour ne pas réinventer la roue, on utilise des logiciels dédiés : les **Systèmes de Gestion de Bases de Données** (SGBD). La plupart gèrent des bases relationnelles et sont implantés sous la forme d'un **logiciel serveur** indépendant (sur la même machine que l'application cliente, ou sur une autre).

2) CARACTÉRISTIQUES ATTENDUES
Créer une base de données relationnelle.
Modifier son contenu **en contrôlant les contraintes** (par exemple les contraintes de référence).
Proposer un langage de requêtes pour explorer les données.
Gérer la **persistance** des données.
Gérer efficacement des bases potentiellement très grandes.
Gérer les **accès concurrents**.
Gérer les **droits d'accès**.
Déclencher automatiquement certaines tâches sur certaines actions.
Limiter les risques de perte de données (panne, fausse manipulation).

3) PANORAMA DES SGBD

| SGBD | En bref |
|---|---|
| Oracle | la référence professionnelle : lourd, mais le plus robuste et le plus contrôlable ; version gratuite |
| MySQL | le plus connu grâce au web ; léger, gratuit ; ignorait les contraintes de référence dans ses premières versions |
| PostgreSQL | excellent compromis : fiable, efficace, gratuit, moins lourd qu'Oracle, en avance sur certaines fonctionnalités |
| SQL Server | le SGBD de Microsoft |
| Access / LibreOffice Base | « SGBD pour débutants » ; dépannent pour un usage non professionnel |

Tous fonctionnent en serveur : il faut installer le SGBD (droits administrateur) et disposer d'une bibliothèque pour le langage choisi — pas toujours simple ni disponible.

4) LE CHOIX DU COURS : SQLite 3
**SQLite** est un SGBD « embarqué » dans l'application : aucun serveur, aucune installation, la base tient dans un fichier `.db`. Très utilisé dans les applications mobiles.
Python fournit le module **sqlite3** en standard : [documentation officielle](https://docs.python.org/3/library/sqlite3.html).
Limites : bases moins volumineuses et moins de fonctionnalités qu'Oracle ou PostgreSQL. Ne pas confondre l'**outil** en ligne de commande `sqlite3` et le **module Python** `sqlite3`.""",
"""1. Citer trois caractéristiques d'un SGBD qu'un simple fichier CSV manipulé en Python ne fournit pas.
2. Pourquoi les contraintes de référence ignorées par les premières versions de MySQL étaient-elles un vrai défaut ?
3. Quels sont les deux avantages de SQLite pour un cours de NSI, et sa principale limite ?
4. Différence entre l'outil sqlite3 et le module Python sqlite3 ?"""),

# ─────────────────────────────────────────────────────────────────────────────
fiche('SQL — interroger une base (LID) : projection, restriction, jointure', '09:40',
"Les 4 parties de SQL (LID, LMD, LDD, LCD), puis le langage d'interrogation sur la base ludotheque.db : SELECT/FROM (projection), ORDER BY, WHERE avec upper() et LIKE (restriction), AND/OR, DISTINCT, fonctions d'agrégation, produit cartésien, JOIN … ON / USING, associations N-M, IS NULL.",
"Écrire des requêtes de projection, tri et restriction. Combiner les conditions. Utiliser DISTINCT et COUNT/MAX. Comprendre le produit cartésien et écrire une jointure avec ON ou USING, y compris à travers une table d'association N-M. Tester l'absence de valeur.",
f"""Cours du **10 septembre** (Bloc 4, B. Mermet) — [page d'origine]({SRC}sql.html) · [copie locale]({LOCAL}sql.html).

1) SQL, QUATRE LANGAGES EN UN
**LID** — Langage d'Interrogation de Données : retrouver des informations.
**LMD** — Langage de Manipulation de Données : modifier les données.
**LDD** — Langage de Description de Données : définir la structure (tables).
**LCD** — Langage de Contrôle de Données : droits d'accès (non abordé).
Une requête renvoie un ensemble de tuples. Dans les tables du cours, les noms de champs sont suffixés par le nom de la table (idIllustrateur, nomIllustrateur…).

2) MISE EN PLACE : LA BASE LUDOTHÈQUE
Créer un répertoire Ludotheque, y copier et exécuter [creationTableIllustrateur.py]({LOCAL}Ludotheque/creationTableIllustrateur.py) : cela crée `ludotheque.db` avec la table Illustrateur.
Deux façons de dialoguer avec la base :
```
$ sqlite3 ludotheque.db
sqlite> select * from illustrateur;
1|Delval|Julien|Française
2|Coimbra|Miguel|Française
3|Quilliams|Chris|Canadienne
```
(ne pas oublier le `;` final ; quitter avec `.quit` ou Ctrl-D) — ou en Python avec [lectureLudotheque.py]({LOCAL}Ludotheque/lectureLudotheque.py), qui affiche chaque ligne sous forme de tuple Python.

3) PROJECTION : SELECT … FROM
SELECT donne la liste des attributs voulus (`*` = tous) ; FROM la ou les tables.
```
SELECT nomIllustrateur FROM illustrateur
SELECT prenomIllustrateur, nomIllustrateur FROM illustrateur
```
Tri avec ORDER BY (ordre numérique ou alphanumérique ; DESC pour l'ordre inverse) :
```
SELECT nomIllustrateur FROM illustrateur ORDER BY nomIllustrateur
SELECT prenomIllustrateur, nomIllustrateur FROM illustrateur
ORDER BY nationaliteIllustrateur, nomIllustrateur
SELECT * FROM illustrateur ORDER BY idIllustrateur DESC
```

4) RESTRICTION : WHERE
```
SELECT * FROM illustrateur WHERE nationaliteIllustrateur = 'Française'
```
Les constantes texte sont entre apostrophes simples. La comparaison est **sensible à la casse** et `=` exige une égalité stricte. Pour ignorer la casse :
```
SELECT * FROM illustrateur
WHERE upper(nationaliteIllustrateur) = upper('Française')
```
LIKE compare à un modèle : `%` = n'importe quelle suite de caractères (même vide), `_` = exactement un caractère.
```
SELECT * FROM illustrateur WHERE nationaliteIllustrateur LIKE '%i_e%'
```
Autres opérateurs : <, >, <=, >=, <>, IN, BETWEEN. Sur les chaînes, toutes les majuscules sont « inférieures » aux minuscules.
Conditions multiples avec AND, OR et parenthèses :
```
SELECT * FROM illustrateur
WHERE (nationaliteIllustrateur = 'Américaine' AND upper(prenomIllustrateur) LIKE '%O%')
   OR nationaliteIllustrateur = 'Française'
```
La projection est faite en dernier : on peut filtrer sur un attribut qu'on n'affiche pas.
```
SELECT prenomIllustrateur FROM illustrateur
WHERE nationaliteIllustrateur = 'Française' ORDER BY prenomIllustrateur
```

5) DISTINCT ET FONCTIONS D'AGRÉGATION
`SELECT nationaliteIllustrateur FROM illustrateur` renvoie Française deux fois et Américaine trois fois. DISTINCT supprime les doublons :
```
SELECT DISTINCT nationaliteIllustrateur FROM illustrateur
```
Les fonctions d'agrégation résument une colonne :
```
SELECT COUNT(*) FROM illustrateur
SELECT COUNT(DISTINCT nationaliteIllustrateur) FROM illustrateur
SELECT MAX(idIllustrateur) FROM illustrateur
```
Un SELECT contenant une agrégation ne peut pas contenir de simples noms d'attributs (sauf avec GROUP BY, non vu dans ce cours).

6) PLUSIEURS TABLES : PRODUIT CARTÉSIEN PUIS JOINTURE
Exécuter [creationTablesEditeurJeu.py]({LOCAL}Ludotheque/creationTablesEditeurJeu.py) pour créer Editeur et Jeu.
Mettre naïvement deux tables dans FROM donne le **produit cartésien** : tous les couples possibles (4 jeux × 3 éditeurs = 12 lignes), sans intérêt.
```
SELECT * FROM jeu, editeur
```
La **jointure** ne garde que les tuples dont les valeurs correspondent :
```
SELECT * FROM jeu JOIN editeur ON jeu.idEditeur = editeur.idEditeur
1|Les chevaliers de la table ronde|3|7|90|1|1|Days of wonder|Française
2|Cargo Noir|2|5|60|1|1|Days of wonder|Française
```
Quand l'attribut a le même nom dans les deux tables et que la condition est une égalité, USING suffit :
```
SELECT * FROM jeu JOIN editeur USING (idEditeur)
```
On combine ensuite restriction, projection et tri :
```
SELECT nomJeu, nationaliteEditeur
FROM Jeu JOIN Editeur ON Jeu.idEditeur = Editeur.idEditeur
ORDER BY nationaliteEditeur, nomJeu

SELECT nomJeu FROM Jeu JOIN Editeur USING (idEditeur)
WHERE nationaliteEditeur = 'Française'
```
Une condition de jointure n'est pas forcément une égalité ni forcément liée à une contrainte de référence :
```
SELECT DISTINCT nomIllustrateur
FROM illustrateur JOIN editeur
  ON illustrateur.nationaliteIllustrateur = editeur.nationaliteEditeur
```

7) ASSOCIATION N-M : DEUX JOINTURES
Exécuter [creationTableEstDessinePar.py]({LOCAL}Ludotheque/creationTableEstDessinePar.py). Pour retrouver les illustrateurs de chaque jeu, il faut Jeu, la table de lien EstDessinePar, et Illustrateur :
```
SELECT nomJeu, prenomIllustrateur, nomIllustrateur
FROM Jeu JOIN EstDessinePar USING (idJeu) JOIN Illustrateur USING (idIllustrateur)
ORDER BY nomJeu, nomIllustrateur
```
Résultat : une ligne par couple (jeu, illustrateur) — Smash up apparaît trois fois.

8) ABSENCE DE VALEUR
NULL n'est pas une valeur : `= NULL` ne marche pas. On teste avec IS NULL / IS NOT NULL.
```
SELECT nomIllustrateur FROM illustrateur WHERE nationaliteIllustrateur IS NOT NULL
```

9) CONVENTIONS
SQL n'est pas sensible à la casse pour les mots-clés, noms de tables et d'attributs (mais l'est pour les données). Norme conseillée : mots-clés en MAJUSCULES, tables en CamelCase, attributs en camelCase. Deux tables peuvent avoir un attribut de même nom : on le préfixe alors par la table (Jeu.idJeu).""",
"""Exercice 1 — Noms des illustrateurs ; prénoms et noms.
```
SELECT nomIllustrateur FROM illustrateur
SELECT prenomIllustrateur, nomIllustrateur FROM illustrateur
```
Exercice 2 — Noms triés ; prénoms et noms triés par nationalité puis nom.
```
SELECT nomIllustrateur FROM illustrateur ORDER BY nomIllustrateur
SELECT prenomIllustrateur, nomIllustrateur FROM illustrateur ORDER BY nationaliteIllustrateur, nomIllustrateur
```
Exercice 3 — Tout sur les illustrateurs par identifiant décroissant.
```
SELECT * FROM illustrateur ORDER BY idIllustrateur DESC
```
Exercice 4 — Illustrateurs français, et américains dont le prénom contient un 'o'.
```
SELECT * FROM illustrateur
WHERE (nationaliteIllustrateur = 'Américaine' AND upper(prenomIllustrateur) LIKE '%O%')
   OR nationaliteIllustrateur = 'Française'
```
Exercice 5 — Prénoms des illustrateurs français, triés.
```
SELECT prenomIllustrateur FROM illustrateur WHERE nationaliteIllustrateur = 'Française' ORDER BY prenomIllustrateur
```
Exercice 6 — Chaque jeu avec la nationalité de son éditeur, tri par nationalité puis nom.
```
SELECT nomJeu, nationaliteEditeur FROM Jeu JOIN Editeur ON Jeu.idEditeur = Editeur.idEditeur
ORDER BY nationaliteEditeur, nomJeu
```
Exercice 7 — Jeux édités par un éditeur français.
```
SELECT nomJeu FROM Jeu JOIN Editeur USING (idEditeur) WHERE nationaliteEditeur = 'Française' ORDER BY nomJeu
```
Exercice 8 — Illustrateurs ayant la même nationalité qu'au moins un éditeur.
```
SELECT DISTINCT nomIllustrateur FROM illustrateur JOIN editeur ON illustrateur.nationaliteIllustrateur = editeur.nationaliteEditeur
```
Exercice 9 (sur papier) — Jeux jouables à 4, en 1 h au plus, sur la navigation marchande.
```
SELECT nomJeu FROM jeu JOIN parleDe USING (idJeu) JOIN theme USING (idTheme)
WHERE nbJoueursMin <= 4 AND nbJoueursMax >= 4 AND duree <= 60
  AND upper(nomTheme) = 'NAVIGATION MARCHANDE'
```
Exercice 10 (sur papier) — Jeux dont l'éditeur a la même nationalité qu'un des illustrateurs.
```
SELECT nomJeu FROM illustrateur JOIN estDessinePar USING (idIllustrateur)
  JOIN jeu USING (idJeu) JOIN editeur USING (idEditeur)
WHERE nationaliteIllustrateur = nationaliteEditeur
```"""),

# ─────────────────────────────────────────────────────────────────────────────
fiche('SQL — manipuler et décrire (LMD/LDD) : INSERT, DELETE, UPDATE, CREATE TABLE', '09:50',
"Insertion de tuples (VALUES, NULL, liste d'attributs, violation de clé), suppression et modification avec WHERE, création de tables avec types SQLite, PRIMARY KEY, NOT NULL, REFERENCES / FOREIGN KEY, clé composée, DROP TABLE IF EXISTS, l'indispensable PRAGMA foreign_keys = ON, et les commandes de l'outil sqlite3 (.tables, .schema, .dump, .read).",
"Écrire INSERT, DELETE et UPDATE en respectant les contraintes de référence. Créer les tables de la ludothèque avec clés primaires (simples et composées) et clés étrangères. Savoir activer la vérification des contraintes dans SQLite. Utiliser .dump/.read pour préparer un TP.",
f"""Cours du **10 septembre** (Bloc 4, B. Mermet) — [page d'origine]({SRC}sql.html) · [copie locale]({LOCAL}sql.html) (parties III à VI).

1) INSERT : AJOUTER UN TUPLE
```
INSERT INTO NomTable VALUES (valeur1, valeur2, ..., valeurN)
INSERT INTO Illustrateur VALUES (7, 'Cochard', 'David', 'Française')
```
Valeur inconnue : le mot-clé NULL. Ou bien on nomme explicitement les attributs renseignés :
```
INSERT INTO Illustrateur VALUES (8, 'Naiade', NULL, 'Française')
INSERT INTO Illustrateur(idIllustrateur, nomIllustrateur, nationaliteIllustrateur)
VALUES (8, 'Naiade', 'Française')
```
Une violation de contrainte est signalée et l'insertion refusée :
```
INSERT INTO Illustrateur VALUES (1, 'Cardouat', 'Marie', 'Française')
Error: UNIQUE constraint failed: illustrateur.idIllustrateur
```

2) DELETE : SUPPRIMER DES TUPLES
```
DELETE FROM Illustrateur WHERE idIllustrateur >= 7
DELETE FROM estDessinePar            -- vide toute la table
```
Si le contrôle des contraintes de référence est actif (PRAGMA, voir plus bas), on ne peut pas supprimer dans n'importe quel ordre : supprimer l'éditeur 4 alors qu'un jeu le référence est refusé.

3) UPDATE : MODIFIER DES TUPLES
```
UPDATE nomTable SET attributX = valX, attributY = valY WHERE condition
```
Plusieurs tuples peuvent être touchés ; pour n'en modifier qu'un, on filtre sur la clé :
```
UPDATE Editeur SET nomEditeur = 'Days of Wonder' WHERE idEditeur = 1
UPDATE Editeur SET nationaliteEditeur = 'Francaise' WHERE nationaliteEditeur = 'Française'
```
Mêmes précautions que pour DELETE vis-à-vis des contraintes de référence.

4) CREATE TABLE : DÉFINIR LA STRUCTURE
Chaque attribut : nom, type (types SQLite : int, text… voir [datatype3](https://www.sqlite.org/datatype3.html)), puis contraintes.
```
CREATE TABLE editeur (
     idEditeur int primary key not null,
     nomEditeur text not null,
     nationaliteEditeur text
)
```
**primary key** : pas deux tuples de même idEditeur. **not null** : valeur obligatoire (dans la plupart des SGBD, primary key implique not null — pas dans SQLite). nationaliteEditeur peut rester inconnue.
Contrainte de référence sur un attribut :
```
CREATE TABLE jeu (
     idJeu int primary key not null,
     nomJeu text not null,
     nbJoueursMin int,
     nbJoueursMax int,
     duree int,
     idEditeur int REFERENCES Editeur(idEditeur)
)
```
Clé composée et contraintes déclarées en fin de table :
```
CREATE TABLE EstDessinePar (
     idIllustrateur int not null,
     idJeu int not null,
     PRIMARY KEY (idJeu, idIllustrateur),
     FOREIGN KEY(idJeu) REFERENCES Jeu(idJeu),
     FOREIGN KEY(idIllustrateur) REFERENCES Illustrateur(IdIllustrateur)
)
```
Une clé à deux attributs ne peut pas être déclarée sur la ligne d'un attribut.

5) PRAGMA foreign_keys = ON — INDISPENSABLE AVEC SQLite
Par défaut, **SQLite 3 ne vérifie pas les contraintes de référence**. Il faut, avant d'utiliser la base, exécuter :
```
PRAGMA foreign_keys = ON
```
Sans ce PRAGMA, on peut même supprimer une table référencée par d'autres et rompre la structure de la base — ce que la plupart des autres SGBD interdisent.

6) DROP TABLE : SUPPRIMER UNE TABLE
```
DROP TABLE NomTable
DROP TABLE IF EXISTS NomTable      -- pas d'erreur si elle n'existe pas (pratique dans un programme)
```

7) COMMANDES DE L'OUTIL sqlite3
Préfixées par un point, sans `;` :

| Commande | Effet |
|---|---|
| .help | liste des commandes |
| .quit | quitter |
| .tables | liste des tables |
| .schema NomTable | requête de création de la table |
| .fullschema | toutes les créations |
| .read fichier | exécute le SQL du fichier |
| .once fichier | la sortie de la commande suivante va dans le fichier |
| .dump | code SQL pour recréer et remplir toute la base |

Recette pour un TP : une fois la base créée et remplie, `.once initialisation.sql` puis `.dump` ; on édite le fichier pour ne garder que l'utile ; les élèves font `.read initialisation.sql`. Ou on leur donne directement le fichier `.db`.""",
"""Exercice 11 — Écrire les CREATE TABLE manquants de la ludothèque (Illustrateur, Auteur, Thème, EstAuteurDe, ParleDe) et les INSERT associés.
```
CREATE TABLE illustrateur (
     idIllustrateur int primary key not null,
     nomIllustrateur text not null,
     prenomIllustrateur text,
     nationaliteIllustrateur text
);
CREATE TABLE auteur (
     idAuteur int primary key not null,
     nomAuteur text not null,
     prenomAuteur text
);
CREATE TABLE theme (
     idTheme int primary key not null,
     nomTheme text not null
);
CREATE TABLE EstAuteurDe (
     idAuteur int not null,
     idJeu int not null,
     PRIMARY KEY (idAuteur, idJeu),
     FOREIGN KEY(idAuteur) REFERENCES auteur(idAuteur),
     FOREIGN KEY(idJeu) REFERENCES jeu(idJeu)
);
CREATE TABLE ParleDe (
     idTheme int not null,
     idJeu int not null,
     PRIMARY KEY (idTheme, idJeu),
     FOREIGN KEY(idTheme) REFERENCES theme(idTheme),
     FOREIGN KEY(idJeu) REFERENCES jeu(idJeu)
);
INSERT INTO auteur VALUES (1, 'Laget', 'Serge'), (2, 'Cathala', 'Bruno'),
                          (3, 'Leacock', 'Matt'), (4, 'Peterson', 'Paul');
INSERT INTO theme VALUES (1, 'Moyen-âge'), (2, 'Légende arthurienne'), (3, 'Marché noir'),
  (4, 'Navigation marchande'), (5, 'Médiéval'), (6, 'Construction'),
  (7, 'Fantastique'), (8, 'Monstre'), (9, 'Pirate');
INSERT INTO EstAuteurDe VALUES (1,1), (2,1), (1,2), (3,3), (4,4);
INSERT INTO ParleDe VALUES (1,1), (2,1), (3,2), (4,2), (5,3), (6,3), (7,4), (8,4), (9,4);
```
Question — Avec PRAGMA foreign_keys = ON, dans quel ordre faut-il supprimer les tables de la ludothèque ? (D'abord les tables d'association, puis Jeu, puis Editeur/Auteur/Illustrateur/Theme.)"""),

# ─────────────────────────────────────────────────────────────────────────────
fiche('SQL et Python — le module sqlite3', '10:00',
"Dialoguer avec ludotheque.db depuis Python : connect / close, transactions et commit (vs AUTO_COMMIT de l'outil), execute pour créer une table ou insérer, executemany avec des '?', parcourir le curseur itérable, et requêtes paramétrées contre l'injection SQL.",
"Enchaîner connexion → PRAGMA → execute → commit → close. Distinguer requête d'interrogation (résultat à parcourir) et ordre de modification (à valider par commit). Utiliser executemany. Toujours paramétrer une requête construite à partir d'une saisie utilisateur.",
f"""Cours du **10 septembre** (Bloc 4, B. Mermet) — [page d'origine]({SRC}sqlEtPython.html) · [copie locale]({LOCAL}sqlEtPython.html) · [doc officielle du module sqlite3](https://docs.python.org/3/library/sqlite3.html).

1) LES ÉTAPES
Importer le module `sqlite3`, puis : se connecter à la base → exécuter la requête → éventuellement exploiter le résultat → si la base a été modifiée, **valider** → se déconnecter.

2) CONNEXION ET DÉCONNEXION
```
connexion = sqlite3.connect('ludotheque.db')   # la base = un fichier .db
...
connexion.close()
```

3) VALIDER : LES TRANSACTIONS
Une base de données est un système **transactionnel** : les modifications sont faites en mémoire jusqu'à leur validation ; à ce moment, soit elles sont toutes transférées sur le disque, soit aucune (si un autre utilisateur a modifié la base entre-temps, par exemple). Ce paquet validé d'un coup est une **transaction**.
```
connexion.commit()
```
Chaque commit termine la transaction courante et en ouvre une autre ; la première commence à la connexion. Sans modification, pas besoin de commit.
Dans l'outil sqlite3, on ne tapait pas de commit : il est en mode **AUTO_COMMIT** (validation après chaque ordre SQL).

4) EXÉCUTER UN ORDRE SQL : execute
Créer une table :
```
import sqlite3

connexion = sqlite3.connect('ludotheque.db')
connexion.execute('PRAGMA foreign_keys = ON')     # vérifier les clés étrangères
connexion.execute('DROP TABLE IF EXISTS editeur')
connexion.execute('''CREATE TABLE editeur (
     idEditeur int primary key not null,
     nomEditeur text not null,
     nationaliteEditeur text)''')
connexion.commit()
connexion.close()
```
Insérer :
```
connexion.execute('''INSERT INTO editeur
     VALUES(1, 'Days of wonder', 'Française')''')
connexion.commit()
```
À tester : mettre le commit en commentaire, vérifier avec l'outil sqlite3 — le tuple n'est pas ajouté.
Plusieurs insertions d'un coup avec **executemany** : un ordre paramétré (les `?`) et une liste de tuples ; l'ordre est exécuté pour chaque tuple.
```
listeEditeurs = [
    (2, 'EggertSpiele', 'Allemande'),
    (3, 'Iello', 'Française')
]
connexion.executemany("INSERT INTO editeur VALUES(?, ?, ?)", listeEditeurs)
connexion.commit()
```

5) EXPLOITER LES RÉSULTATS
execute renvoie un **curseur itérable** ; chaque tuple SQL devient un tuple Python.
```
curseur = connexion.execute("SELECT * FROM Editeur")
for tuple in curseur:
    print(tuple)              # (1, 'Days of wonder', 'Française')
```
Pour accéder à une valeur, on convertit en liste — mais mieux vaut une projection plus sélective :
```
curseur = connexion.execute("SELECT nomEditeur FROM Editeur")
for tuple in curseur:
    donnee = list(tuple)
    print(donnee[0])
```

6) REQUÊTES PARAMÉTRÉES ET INJECTION SQL
Une requête peut être paramétrée comme avec executemany. Recherche des éditeurs par nationalité :
```
nationalite = input("Nationalité recherchée ? ")

curseur = connexion.execute('''SELECT nomEditeur
                               FROM editeur
                               WHERE upper(nationaliteEditeur) = upper(?)
                               ORDER BY nomEditeur''',
                            (nationalite,))
for tuple in curseur:
    print(list(tuple)[0])
```
Dès qu'une information vient (directement ou non) de l'utilisateur, il faut utiliser les **requêtes paramétrées** et non la concaténation de chaînes, pour éviter les attaques par [injection SQL](https://fr.wikipedia.org/wiki/Injection_SQL).""",
"""1. Écrire un programme qui crée la table Auteur (avec PRAGMA et DROP TABLE IF EXISTS), y insère les 4 auteurs avec executemany, puis affiche « prénom nom » de chacun, triés par nom.
2. Reprendre le programme d'insertion sans commit : que constate-t-on dans sqlite3 ? Pourquoi l'outil sqlite3, lui, n'a-t-il pas besoin de commit ?
3. Écrire une fonction jeux_par_editeur(connexion, nom_editeur) qui renvoie la liste des noms de jeux d'un éditeur, en requête paramétrée avec une jointure.
4. Que renvoie curseur.description ? (Indice : [d[0] for d in curseur.description] donne les noms de colonnes.)"""),

# ─────────────────────────────────────────────────────────────────────────────
fiche('Programmation web côté serveur (CGI Python + SQLite)', '10:10',
"Pourquoi passer côté serveur, un serveur web CGI en Python (http.server, port 8888), scripts générant une page statique puis dynamique, affichage d'une table de la base dans une page HTML, formulaires GET et récupération des champs avec cgi.FieldStorage, consultation de la base à partir d'une saisie.",
"Lancer un serveur web Python et exécuter un script CGI. Générer une page HTML depuis Python, y compris avec des données SQLite. Lire les champs d'un formulaire avec le module cgi. Relier formulaire, requête paramétrée et affichage.",
f"""Cours du **10 septembre** (Bloc 4, B. Mermet) — [page d'origine]({SRC}progWebServeur.html) · [copie locale]({LOCAL}progWebServeur.html).

1) POURQUOI CÔTÉ SERVEUR
Quand une application web doit interagir avec une base de données, celle-ci est sur le serveur : JavaScript côté client ne convient plus. Principe : à une requête HTTP, le serveur ne renvoie pas une page statique mais une page **générée par un programme** (PHP, Java, JavaScript, Python…). Ici : Python.

2) LE SERVEUR WEB
```
#!/usr/bin/python
import http.server

PORT = 8888
server_address = ("", PORT)
server = http.server.HTTPServer
handler = http.server.CGIHTTPRequestHandler
handler.cgi_directories = ["/"]
print("Serveur actif sur le port :", PORT)

httpd = server(server_address, handler)
httpd.serve_forever()
```
Le serveur tourne « sur le port 8888 » tant qu'on ne l'interrompt pas et bloque le terminal (en ouvrir un autre). Les erreurs des scripts s'affichent dans **ce** terminal.

3) PAGE STATIQUE, PUIS DYNAMIQUE
Un script Python qui écrit la page sur la sortie standard (droits d'exécution : `chmod 755`) :
```
#!/usr/bin/python
page = '''<html>
  <head><title>Essai</title></head>
  <body><h1>Essai</h1><p>Voici un exemple de page html.</p></body>
</html>'''
print(page)
```
URL : `http://localhost:8888/essai.py` — localhost = la machine courante, 8888 = le port, essai.py = le script dans le répertoire du serveur. On peut vérifier le HTML en lançant le script en ligne de commande.
Le contenu peut être calculé (date et heure) :
```
from datetime import date, datetime
moment = date.today().strftime("%d/%m/%Y")
heure  = datetime.now().strftime("%H:%M:%S")
maintenant = "Nous sommes le " + moment + " et il est " + heure
page = debutPage + maintenant + finPage
print(page)
```

4) AFFICHER UNE TABLE DE LA BASE
Le script est un programme Python classique : il peut utiliser sqlite3 (base dans le répertoire du serveur). La 2ᵉ ligne d'en-tête est nécessaire pour les accents.
```
#!/usr/bin/python
#coding: utf-8
import sqlite3

print("Content-type: text/html; charset=utf-8\\n")
print("<html><body>")
conn = sqlite3.connect('ludotheque.db')
curseur = conn.execute("select * from Editeur")
print("<h1>Contenu de la table Editeur</h1>")
print("<table border='1'>")
print("<tr><th>Identifiant</th><th>Nom</th><th>Nationalité</th></tr>")
for tuple in curseur:
    print("<tr>")
    for champ in list(tuple):
        print("<td>" + str(champ) + "</td>")
    print("</tr>")
print("</table></body></html>")
conn.close()
```
Résultat : [page web obtenue]({LOCAL}pageWebAffichageEditeur.png).

5) FORMULAIRES : INFORMATIONS FOURNIES PAR L'UTILISATEUR
Page 1 (saisieIdentite.py) : un formulaire statique qui passe la main à hello.py.
```
<form action="/hello.py" method="get">
  <input type="text" name="nom" placeholder="Votre nom" />
  <input type="text" name="prenom" placeholder="Votre prénom" />
  <input type="submit" value="Envoyer">
</form>
```
Page 2 (hello.py) : le module **cgi** récupère les champs avec FieldStorage / getvalue.
```
#!/usr/bin/python
import cgi

formulaire = cgi.FieldStorage()
print("Content-type: text/html; charset=utf-8\\n")
nom = formulaire.getvalue('nom')
prenom = formulaire.getvalue('prenom')
print("<html><body><h1>Bonjour " + prenom + " " + nom + "</h1></body></html>")
```

6) CONSULTER LA BASE À PARTIR D'UNE SAISIE
On combine formulaire + requête **paramétrée** + tableau HTML : l'utilisateur saisit une nationalité, la page affiche les éditeurs correspondants.
```
formulaire = cgi.FieldStorage()
nationalite = formulaire.getvalue("nation")
connexion = sqlite3.connect('ludotheque.db')
requete = '''SELECT nomEditeur FROM Editeur
             WHERE upper(nationaliteEditeur) = upper(?)
             ORDER BY nomEditeur'''
curseur = connexion.execute(requete, (nationalite,))
print("<h1>Éditeurs de nationalité " + nationalite + "</h1><table border='1'>")
for tuple in curseur:
    print("<tr><td>" + list(tuple)[0] + "</td></tr>")
print("</table>")
connexion.close()
```
Remarque : le module cgi est déprécié depuis Python 3.11 et retiré en 3.13 ; le principe (lire les paramètres de la requête, générer du HTML) reste le même avec Flask (voir la ressource « Créer une appli web en NSI »).""",
"""Exercice 1 — Application web qui demande une nationalité puis affiche les éditeurs correspondants.
Correction : formulaire (champ nation → /editeursNation.py) + script avec cgi.FieldStorage, requête paramétrée upper(?) et tableau HTML (voir section 6).

Exercice 2 — Application web qui demande le nom d'une table puis affiche ses colonnes et son contenu.
Indication : [description[0] for description in curseur.description] donne la liste des noms de colonnes.
```
nomTable = form.getvalue('nomTable')
conn = sqlite3.connect('ludotheque.db')
curseur = conn.execute("select * from " + nomTable)
colonnes = [description[0] for description in curseur.description]
print("<ul>")
for c in colonnes:
    print("<li>" + c + "</li>")
print("</ul><table border='1'><tr>")
for col in colonnes:
    print("<th>" + col + "</th>")
print("</tr>")
for tuple in curseur:
    print("<tr>" + "".join("<td>" + str(champ) + "</td>" for champ in tuple) + "</tr>")
print("</table>")
```
Question de sécurité — Pourquoi "select * from " + nomTable est-il une injection SQL possible, et pourquoi ne peut-on pas le paramétrer avec un ? (un nom de table n'est pas une valeur) ? Quelle parade proposer ? (vérifier que nomTable appartient à la liste renvoyée par .tables / sqlite_master)"""),
]

def main():
    req = urllib.request.Request(
        f"{URL}/rest/v1/fiches",
        data=json.dumps(FICHES, ensure_ascii=False).encode('utf-8'),
        method='POST',
        headers={'apikey': ANON, 'Authorization': 'Bearer ' + ANON,
                 'Content-Type': 'application/json', 'Prefer': 'return=minimal'})
    try:
        with urllib.request.urlopen(req, timeout=60) as r:
            print("INSERT", r.status, f"— {len(FICHES)} fiches BDD ajoutées")
    except urllib.error.HTTPError as e:
        print("ERR", e.code, e.read().decode())

if __name__ == '__main__':
    if '--check' in sys.argv:
        for f in FICHES:
            n = f['content'].count('```') + f['exercices'].count('```')
            print(f"{f['title'][:60]:60} fences={n} {'OK' if n % 2 == 0 else '!! IMPAIR'}")
    else:
        main()
