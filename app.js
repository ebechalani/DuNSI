import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const SUPABASE_URL = 'https://tnkwbcevfyslpetuuxlu.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRua3diY2V2ZnlzbHBldHV1eGx1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkxOTkzMjMsImV4cCI6MjA5NDc3NTMyM30.bMQJwMVioi6OSYWYqXFEwGA89AompDtnr-eDg6movWw'
const db = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// ── Programme complet du DIU ─────────────────────────────
const BLOCS = {
  bloc0: { label: 'Bloc 0 — Rappels et mise à niveau',               short: 'Bloc 0', color: '#6366f1', dates: '19-22 mai 2026',       lieu: 'Le Havre',  mode: 'présentiel' },
  bloc1: { label: 'Bloc 1 — Représentation des données et prog.',     short: 'Bloc 1', color: '#0ea5e9', dates: '22-25 juin 2026',      lieu: 'Le Havre',  mode: 'distanciel' },
  bloc2: { label: 'Bloc 2 — Algorithmique',                           short: 'Bloc 2', color: '#10b981', dates: 'sept.–oct. 2026',      lieu: 'Le Havre',  mode: 'distanciel' },
  bloc3: { label: 'Bloc 3 — Architectures, systèmes et réseaux',      short: 'Bloc 3', color: '#f59e0b', dates: '26-29 mai 2026',       lieu: 'Rouen',     mode: 'présentiel' },
  bloc4: { label: 'Bloc 4 — Programmation avancée et BDD',            short: 'Bloc 4', color: '#ef4444', dates: 'oct.–nov. 2026',       lieu: 'Le Havre',  mode: 'distanciel' },
  bloc5: { label: 'Bloc 5 — Algorithmique avancée',                   short: 'Bloc 5', color: '#8b5cf6', dates: 'nov.–déc. 2026',       lieu: 'Caen',      mode: 'distanciel' },
}

const EVAL_RAPPORT_GENERAL = [
  { id: 'ev_pos',    label: 'Positionnement du sujet dans le programme' },
  { id: 'ev_not',    label: 'Notions à faire passer' },
  { id: 'ev_prog',   label: 'Progression envisagée' },
  { id: 'ev_heure',  label: "Nombre d'heures envisagées" },
  { id: 'ev_eval',   label: "Éléments d'évaluation" },
]
const EVAL_RAPPORT_SEANCE = [
  { id: 'ev_spos',   label: 'Positionnement de la séance' },
  { id: 'ev_scours', label: 'Support de cours' },
  { id: 'ev_sex',    label: 'Exercices envisagés' },
  { id: 'ev_smode',  label: 'Mode de travail (inversé, débranché, standard, projet…)' },
  { id: 'ev_sdev',   label: "Exemples de parties de devoir pour évaluer l'élève" },
]
const EVAL_PRESENTATION = [
  { id: 'ev_p1', label: "5 min — Présentation de l'approche générale" },
  { id: 'ev_p2', label: '5 min — Présentation générale de la séance' },
  { id: 'ev_p3', label: "5 min — Présentation d'une partie du cours" },
  { id: 'ev_p4', label: "5 min — Présentation d'un exercice ou d'une famille d'exercices" },
  { id: 'ev_p5', label: '5 min — Conclusion' },
]

const RESSOURCES_MERMET = [
  { icon: '🧠', title: "Bloc 1 — Didactique de l'informatique", desc: 'Pensée informatique, approche instrumentale, didactique', url: 'https://mermet.users.greyc.fr/Enseignement/EnseignementInformatiqueLycee/Havre/Didactique/index.html' },
  { icon: '🌐', title: 'Bloc 1 — Web côté client (JavaScript)', desc: 'HTML, CSS, JavaScript, événements, interfaces web',        url: 'https://mermet.users.greyc.fr/Enseignement/EnseignementInformatiqueLycee/Havre/Javascript/index.html' },
  { icon: '⚙️', title: 'Bloc 2 — Algorithmique',                 desc: 'Algorithmes classiques, correction, complexité',           url: 'https://mermet.users.greyc.fr/Enseignement/EnseignementInformatiqueLycee/Havre/Algorithmique/index.html' },
  { icon: '🗄️', title: 'Bloc 4 — Programmation avancée et BDD', desc: 'SQL, paradigmes, structures de données',                   url: 'https://mermet.users.greyc.fr/Enseignement/EnseignementInformatiqueLycee/Havre/Bloc4/index.html' },
]
const RESSOURCES_OFFICIEL = [
  { icon: '🎓', title: 'Moodle Eureka (Univ. Le Havre)', desc: 'Plateforme du DIU — login = identifiants wifi · mdp : /login/forgot_password.php', url: 'https://eureka.univ-lehavre.fr' },
  { icon: '📚', title: 'Eduscol NSI',      desc: 'Programmes et ressources officielles Numérique et Sciences Informatiques', url: 'https://eduscol.education.gouv.fr/5823/programmes-et-ressources-en-numerique-et-sciences-informatiques-voie-g' },
  { icon: '💬', title: 'Forum MOOC NSI',   desc: 'Échanges et ressources de la communauté NSI (INRIA)',                      url: 'https://mooc-forums.inria.fr/moocnsi' },
  { icon: '✉️', title: 'Liste de diffusion DIU',  desc: 'diu-eil-2026@univ-lehavre.fr — communication officielle de la promo',  url: 'mailto:diu-eil-2026@univ-lehavre.fr' },
  { icon: '📧', title: 'Liste SNT (RENATER)',     desc: 'sciences-numeriques-technologie@groupes.renater.fr',                    url: 'mailto:sciences-numeriques-technologie@groupes.renater.fr' },
  { icon: '📧', title: 'Liste NSI (RENATER)',     desc: 'numerique-sciences-informatiques@groupes.renater.fr',                   url: 'mailto:numerique-sciences-informatiques@groupes.renater.fr' },
]

const CALENDAR = [
  { bloc: 'bloc0', label: 'Bloc 0 — Rappels et mise à niveau',          dates: '19-22 mai 2026',   lieu: 'Le Havre', mode: 'présentiel', isoStart: '2026-05-19' },
  { bloc: 'bloc3', label: 'Bloc 3 — Architectures, systèmes, réseaux',  dates: '26-29 mai 2026',   lieu: 'Rouen',    mode: 'présentiel', isoStart: '2026-05-26' },
  { bloc: 'bloc1', label: 'Bloc 1 — Données et programmation',           dates: '22-25 juin 2026',  lieu: 'Le Havre', mode: 'distanciel', isoStart: '2026-06-22' },
  { bloc: 'bloc2', label: 'Bloc 2 — Algorithmique',                      dates: 'sept.–oct. 2026',  lieu: 'Le Havre', mode: 'distanciel', isoStart: '2026-09-01' },
  { bloc: 'bloc4', label: 'Bloc 4 — Prog. avancée et BDD',               dates: 'oct.–nov. 2026',   lieu: 'Le Havre', mode: 'distanciel', isoStart: '2026-10-01' },
  { bloc: 'bloc5', label: 'Bloc 5 — Algorithmique avancée',              dates: 'nov.–déc. 2026',   lieu: 'Caen',     mode: 'distanciel', isoStart: '2026-11-01' },
]

// ── Fiches Bloc 0 — contenu basé sur le cours du 19 mai 2026 ─────────
const FICHES_BLOC0_SEED = [
  {
    bloc: 'bloc0', topic: 'Fondements de l\'informatique',
    title: 'Les 4 piliers de l\'informatique',
    summary: 'L\'informatique repose sur 4 piliers : les données (ce qu\'on manipule), les algorithmes (comment on le fait), les langages (comment on l\'exprime) et les machines (ce qui exécute). Une interface est le point de contact entre deux entités.',
    content: `I. Les 4 piliers
1. Données : toute information manipulée par un programme (nombres, texte, images, sons…)
2. Algorithmes : suite d'instructions pour résoudre un problème — indépendant du langage
3. Langages : moyen d'exprimer les algorithmes. Multiples niveaux (bas → haut niveau)
4. Machines : matériel qui exécute les instructions (CPU, mémoire, entrées/sorties)

+ Les interfaces : point de contact entre deux systèmes (ex : clavier ↔ OS, OS ↔ programme)

Idée pédagogique : montrer que chaque programme se situe dans ces 4 dimensions.
Ex : trier une liste → données (liste), algorithme (tri à bulles), langage (Python), machine (ordinateur).`,
    code_example: `# Exemple illustrant les 4 piliers
# 1. Données
nombres = [3, 1, 4, 1, 5, 9]

# 2. Algorithme (tri à bulles)
def tri_bulle(lst):
    n = len(lst)
    for i in range(n - 1):
        for j in range(n - i - 1):
            if lst[j] > lst[j + 1]:
                lst[j], lst[j + 1] = lst[j + 1], lst[j]

# 3. Langage : Python  |  4. Machine : votre ordinateur
tri_bulle(nombres)
print(nombres)  # [1, 1, 3, 4, 5, 9]`,
  },
  {
    bloc: 'bloc0', topic: 'Paradigme impératif',
    title: 'Vocabulaire du paradigme impératif',
    summary: 'Un programme impératif est une suite d\'instructions qui modifient l\'état de la machine (valeurs des variables). L\'exécution produit des effets de bord et peut être tracée étape par étape.',
    content: `Termes clés à maîtriser :
- Instruction : ordre élémentaire donné à la machine (ex : x = 5, print("ok"))
- Bloc : suite d'instructions délimitée (en Python : l'indentation)
- Grammaire : règles syntaxiques du langage (ce qui est autorisé à écrire)
- Sémantique : sens d'une instruction (ce qu'elle fait réellement)
- Expression : calcul qui produit une valeur (ex : 3 + x * 2)
- Variable : espace mémoire nommé qui stocke une valeur
- Affectation : associer une valeur à une variable (x ← 5 ou x = 5 en Python)
- État : ensemble des valeurs de toutes les variables à un instant t
- Trace d'exécution : historique des états successifs pendant l'exécution
- Effet de bord : modification d'état visible hors de l'instruction (ex : affichage, écriture fichier)

Idée pédagogique : faire tracer l'exécution d'un programme simple à la main avant de le lancer.`,
    code_example: `# Tracer l'exécution ligne par ligne
x = 3       # État : x=3
y = x + 2   # État : x=3, y=5
x = y * x   # État : x=15, y=5
print(x)    # Effet de bord : affiche 15 à l'écran

# Exercice élève : remplir un tableau d'états
# | Ligne | x  | y |
# |-------|----|----|
# | 1     | 3  | ? |
# | 2     | 3  | 5 |
# | 3     | 15 | 5 |`,
  },
  {
    bloc: 'bloc0', topic: 'Typage',
    title: 'Le typage — types de base, fort vs faible',
    summary: 'Le type d\'une donnée définit les valeurs possibles et les opérations autorisées. Python est typé dynamiquement et fortement : une variable peut changer de type, mais les opérations entre types incompatibles provoquent une erreur explicite.',
    content: `Types de base en Python :
- int   : entiers (…-2, -1, 0, 1, 2…) — précision illimitée en Python
- float : nombres à virgule flottante (attention : imprécision !)
- bool  : True ou False — issu d'une comparaison ou opérateur logique
- str   : séquence de caractères entre guillemets

Typage fort vs faible :
- Fort (Python, Java) : les conversions entre types doivent être explicites
  → "3" + 3 provoque une TypeError en Python
- Faible (JavaScript) : conversions implicites
  → "3" + 3 donne "33" en JavaScript (concaténation silencieuse)

Typage statique vs dynamique :
- Statique (C, Java) : le type est déclaré et vérifié à la compilation
- Dynamique (Python) : le type est déterminé à l'exécution — plus souple, erreurs détectées tard

Idée pédagogique : comparer Python et JS sur "3" + 3 pour illustrer fort/faible.`,
    code_example: `# Types en Python
x   = 42        # int
y   = 3.14      # float
ok  = True      # bool
nom = "Alice"   # str

print(type(x))  # <class 'int'>
print(type(y))  # <class 'float'>

# Conversion explicite nécessaire (typage fort)
print(str(x) + " ans")   # "42 ans"
# print(x + " ans")      # TypeError !

# Booléen issu d'une comparaison
est_adulte = x >= 18      # True

# Imprécision des flottants
print(0.1 + 0.2)          # 0.30000000000000004 (pas 0.3 !)`,
  },
  {
    bloc: 'bloc0', topic: 'Variables et affectation',
    title: 'Variables, affectation et stockage en mémoire',
    summary: 'Une variable est un nom associé à un espace mémoire. En Python, l\'affectation (x = 5) lie un nom à une valeur. Les types simples sont copiés par valeur ; les objets composés (listes, dictionnaires) sont partagés par référence.',
    objectifs: `À la fin, l'élève doit savoir :
- expliquer ce qu'est une variable et une affectation ;
- distinguer x = x + 1 (informatique) d'une équation (mathématiques) ;
- prévoir le comportement d'une copie par valeur vs par référence ;
- nommer ses variables de façon explicite.`,
    content: `L'affectation :
- Syntaxe Python : x = expression  (≠ égalité mathématique !)
- x = x + 1 est valide : on lit x à droite, on écrit le résultat à gauche
- En maths, x = x + 1 est une équation sans solution — différence fondamentale à expliquer

Stockage par valeur vs par référence :
- Types simples (int, float, bool, str) → copie de la valeur
  a = 5 ; b = a ; b = 10  → a reste 5
- Types composés (list, dict) → partage de la référence (même objet en mémoire)
  a = [1, 2, 3] ; b = a ; b.append(4)  → a est modifié ! a = [1, 2, 3, 4]
  → Pour copier indépendamment : b = a.copy() ou b = a[:]

Nommage des variables (conventions) :
- Python : snake_case (nom_eleve, age_maximum)
- Java/C : camelCase (nomEleve, ageMaximum)
- Toujours choisir un nom explicite (préférer "score" à "x", "liste_eleves" à "l")

Idée pédagogique : piège du partage de liste — faire prévoir le résultat avant d'exécuter.`,
    code_example: `# Copie par valeur (types simples)
a = 5
b = a
b = 10
print(a)  # 5 — a n'est pas modifié

# Partage par référence (listes)
liste1 = [1, 2, 3]
liste2 = liste1        # même objet en mémoire !
liste2.append(4)
print(liste1)          # [1, 2, 3, 4] — surprise !

# Pour copier indépendamment :
liste3 = liste1.copy()
liste3.append(99)
print(liste1)          # [1, 2, 3, 4] — inchangé cette fois`,
    exercices: `1. (Trace) Donner la valeur finale de a et b :
   a = 7 ; b = a ; a = a + 3   →  a = ? , b = ?
2. (Prévoir) Que vaut L après :
   L = [1, 2] ; M = L ; M.append(3) ?  Expliquer pourquoi.
3. (Corriger) On veut copier une liste sans lien entre les deux.
   Le code « N = L » ne marche pas : proposer la bonne version.
4. (Nommage) Réécrire avec de bons noms :
   x = 19.5 ; y = 20 ; z = (x + y) / 2`,
  },
  {
    bloc: 'bloc0', topic: 'Conditionnelles',
    title: 'Structures conditionnelles — if / elif / else',
    summary: 'Une conditionnelle exécute un bloc d\'instructions seulement si une condition est vraie. Python utilise if / elif / else. L\'opérateur ternaire permet une forme compacte sur une seule ligne.',
    objectifs: `À la fin, l'élève doit savoir :
- écrire un if / elif / else correctement indenté ;
- comprendre l'effet de l'ordre des elif (court-circuit) ;
- combiner des conditions avec and / or / not ;
- utiliser l'opérateur ternaire pour une affectation simple.`,
    content: `2 branches : if / else
- Exécute le bloc A si condition vraie, sinon le bloc B

Plus de 2 branches : elif
- elif = "sinon si" : enchaîne les conditions
- Dès qu'une condition est vraie, les suivantes sont ignorées (court-circuit)
- L'ordre des elif est important !

Opérateur ternaire (Python) :
  valeur_si_vrai if condition else valeur_si_faux
- Utile pour les affectations courtes et lisibles

Opérateurs logiques :
- and : les deux conditions vraies
- or  : au moins une vraie
- not : inverse la condition

Idée pédagogique : jeu de notes (if/elif/else), puis demander si changer l'ordre des elif change le résultat.
Attention : en Python, l'indentation est obligatoire (différent de C/Java qui utilisent {}).`,
    code_example: `# Structure if / elif / else
note = 15

if note >= 16:
    mention = "Très bien"
elif note >= 14:
    mention = "Bien"
elif note >= 12:
    mention = "Assez bien"
elif note >= 10:
    mention = "Passable"
else:
    mention = "Insuffisant"

print(mention)  # "Bien"

# Opérateur ternaire
statut = "reçu" if note >= 10 else "recalé"

# Conditions combinées
if note >= 10 and note < 20:
    print("Note valide")`,
    exercices: `1. (Écrire) Demander un âge et afficher "mineur" ou "majeur".
2. (Barème) Écrire la mention à partir d'une note (0–20) avec elif.
3. (Ordre) Que se passe-t-il si on met "elif note >= 10" AVANT
   "elif note >= 14" ? Tester et expliquer.
4. (Ternaire) Réécrire en une ligne :
   if x % 2 == 0: p = "pair" else: p = "impair"
5. (Logique) Tester si une année est bissextile.`,
  },
  {
    bloc: 'bloc0', topic: 'Boucles',
    title: 'Boucles — bornées (for) et non bornées (while)',
    summary: 'Les boucles répètent un bloc d\'instructions. Les boucles bornées (for) s\'exécutent un nombre connu de fois. Les boucles non bornées (while) s\'exécutent tant qu\'une condition est vraie — attention aux boucles infinies !',
    objectifs: `À la fin, l'élève doit savoir :
- choisir entre for et while selon le problème ;
- écrire une boucle for avec range et parcourir une liste ;
- écrire une boucle while avec une condition d'arrêt sûre ;
- repérer et corriger une boucle infinie.`,
    content: `Boucles bornées :
1. for i in range(n) → i prend les valeurs 0, 1, …, n-1
2. for i in range(a, b) → i de a à b-1 inclus
3. for element in collection → parcourt chaque élément (liste, chaîne, dict…)

Boucles non bornées :
1. while condition : exécute le bloc tant que la condition est vraie
   → La condition doit finir par devenir fausse (sinon boucle infinie !)
2. do-while (non natif en Python) : s'exécute au moins une fois, puis vérifie
   → En Python : while True + break

Quelle boucle choisir ?
- Nombre d'itérations connu à l'avance → for
- Nombre d'itérations inconnu (dépend d'une condition) → while

Idée pédagogique :
- for : calculer la somme de 1 à n
- while : jeu de devinette, validation de saisie utilisateur`,
    code_example: `# Boucle for — itération sur range
somme = 0
for i in range(1, 11):    # 1, 2, ..., 10
    somme += i
print(somme)  # 55

# Boucle for — itération sur une liste
fruits = ["pomme", "banane", "cerise"]
for fruit in fruits:
    print(fruit)

# Boucle while — nombre d'itérations inconnu
import random
secret = random.randint(1, 10)
tentative = -1
while tentative != secret:
    tentative = int(input("Devine (1-10) : "))
print("Bravo !")

# Équivalent do-while en Python
while True:
    rep = input("Continuer ? (o/n) : ")
    if rep == 'n':
        break`,
    exercices: `1. (for) Afficher la table de multiplication de 7.
2. (for) Calculer la somme des entiers de 1 à 100.
3. (while) Jeu : faire deviner un nombre tiré au hasard (1–100),
   indiquer "trop grand / trop petit" à chaque essai.
4. (debug) Pourquoi cette boucle ne s'arrête jamais ?
   i = 0
   while i < 10:
       print(i)        # (indice : que manque-t-il ?)
5. (au choix) Réécrire l'exercice 2 avec une boucle while.`,
  },
  {
    bloc: 'bloc0', topic: 'Sauts',
    title: 'Instructions de saut — break, continue, return, exceptions',
    summary: 'Les sauts interrompent le flux séquentiel. break quitte la boucle, continue passe à l\'itération suivante, return quitte une fonction. Les exceptions (try/except) gèrent les erreurs de façon structurée sans crasher le programme.',
    content: `Sauts simples :
- break    : sort immédiatement de la boucle la plus proche
- continue : passe directement à l'itération suivante (ignore la suite du bloc)
- return   : quitte la fonction et renvoie éventuellement une valeur
- goto     : absent en Python, déconseillé (code spaghetti)

Exceptions (try / except) :
- try     : bloc susceptible de lever une erreur
- except  : bloc exécuté si l'erreur survient (peut cibler un type précis)
- finally : toujours exécuté (nettoyage, fermeture fichier)
- raise   : lever une exception manuellement

Types d'exceptions courants :
- ValueError       : valeur incorrecte (ex: int("abc"))
- ZeroDivisionError : division par zéro
- IndexError       : indice hors des limites d'une liste
- TypeError        : opération entre types incompatibles

Idée pédagogique : montrer la même boucle avec et sans break/continue pour comparer. Illustrer try/except avec une saisie utilisateur.`,
    code_example: `# break — sortir d'une boucle
for i in range(10):
    if i == 5:
        break
    print(i)   # affiche 0, 1, 2, 3, 4

# continue — sauter une itération
for i in range(6):
    if i % 2 == 0:
        continue   # saute les pairs
    print(i)       # affiche 1, 3, 5

# Gestion d'exception — saisie sécurisée
def lire_entier(message):
    while True:
        try:
            return int(input(message))
        except ValueError:
            print("Erreur : entrez un nombre entier.")

age = lire_entier("Votre âge : ")
print(f"Vous avez {age} ans.")`,
  },
  {
    bloc: 'bloc0', topic: 'Fonctions',
    title: 'Fonctions — paramètres, retour et récursivité',
    summary: 'Une fonction est un bloc d\'instructions nommé et réutilisable. Elle reçoit des paramètres en entrée et peut renvoyer une valeur via return. La récursivité est le mécanisme par lequel une fonction s\'appelle elle-même — elle nécessite toujours un cas de base.',
    objectifs: `À la fin, l'élève doit savoir :
- définir et appeler une fonction avec paramètres et return ;
- distinguer paramètre et argument, variable locale et globale ;
- comprendre le rôle du cas de base dans une fonction récursive ;
- transformer une fonction itérative simple en version récursive.`,
    content: `Anatomie d'une fonction Python :
  def nom_fonction(param1, param2):
      # corps
      return valeur

- Paramètre : nom dans la définition (variable locale à la fonction)
- Argument  : valeur concrète passée lors de l'appel
- return    : renvoie une valeur et quitte la fonction (sans return → None)

Portée des variables :
- Variable locale  : existe seulement dans la fonction (invisible dehors)
- Variable globale : accessible partout (éviter de la modifier depuis une fonction)

Récursivité :
- Une fonction récursive s'appelle elle-même
- Nécessite obligatoirement :
  1. Un cas de base (condition d'arrêt) — sinon : récursion infinie → RecursionError
  2. Un appel récursif qui se rapproche du cas de base
- Exemples classiques : factorielle, Fibonacci, tours de Hanoï, tri fusion

Idée pédagogique : partir de la version itérative, puis montrer la version récursive.
Tracer l'arbre des appels récursifs au tableau (indispensable pour la compréhension).`,
    code_example: `# Fonction simple
def aire_rectangle(longueur, largeur):
    return longueur * largeur

print(aire_rectangle(4, 5))   # 20

# Version itérative de la factorielle
def fact_iteratif(n):
    resultat = 1
    for i in range(2, n + 1):
        resultat *= i
    return resultat

# Version récursive de la factorielle
def factorielle(n):
    if n <= 1:                        # cas de base
        return 1
    return n * factorielle(n - 1)    # appel récursif

print(factorielle(5))   # 120
# Appels : fact(5) → 5×fact(4) → 5×4×fact(3) → 5×4×3×fact(2) → 5×4×3×2×1`,
    exercices: `1. (Écrire) Une fonction est_pair(n) qui renvoie True/False.
2. (Écrire) Une fonction maximum(a, b, c) qui renvoie le plus grand.
3. (Trace) Dérouler à la main factorielle(4) : noter chaque appel.
4. (Récursif) Écrire somme(n) = 1 + 2 + … + n en récursif.
5. (Réflexion) Que se passe-t-il si on oublie le cas de base ?`,
  },
  {
    bloc: 'bloc0', topic: 'Interprétation et compilation',
    title: 'Interprétation vs Compilation — du source à l\'exécution',
    summary: 'Un programme source (texte) doit être traduit en instructions machine. La compilation traduit tout le code avant l\'exécution (C, C++, Rust). L\'interprétation traduit et exécute ligne par ligne (Python). Java utilise un hybride : bytecode + machine virtuelle (JVM).',
    content: `Compilation :
- Le compilateur traduit tout le source en code machine AVANT l'exécution
- Produit un fichier exécutable spécifique à l'architecture matérielle
- Avantages : rapide à l'exécution, erreurs détectées avant de lancer
- Inconvénients : lent à compiler, peu portable entre architectures
- Exemples : C, C++, Rust

Interprétation :
- L'interpréteur lit et exécute le source instruction par instruction
- Avantages : flexible, immédiat, portable (l'interpréteur s'adapte à la machine)
- Inconvénients : plus lent (traduit à chaque exécution)
- Exemples : Python, JavaScript (navigateur), PHP

Cas hybride — Java :
1. Compilation vers du bytecode (code intermédiaire)
2. Exécution par la JVM (Java Virtual Machine) qui optimise à la volée
→ "Write once, run anywhere" : portable sur toute machine ayant une JVM

Analogie pédagogique :
- Compilateur = traducteur qui traduit tout le livre AVANT de le publier
- Interprète  = traducteur simultané qui traduit en direct, phrase par phrase`,
    code_example: `# Python est interprété : les erreurs apparaissent à l'exécution
print("Ligne 1")    # s'exécute normalement
print("Ligne 2")    # s'exécute normalement

# En C compilé, une erreur de syntaxe bloque TOUT le programme dès la compilation.
# En Python, seules les lignes atteintes peuvent provoquer une erreur :

def fonction_cachee():
    return 1 / 0    # ZeroDivisionError — mais seulement si appelée !

print("Ligne 3")    # s'exécute malgré le bug dans fonction_cachee()

# → Avantage Python : on teste petit à petit.
# → Inconvénient : un bug peut se cacher dans un chemin rarement emprunté.`,
  },
  {
    bloc: 'bloc0', topic: 'Variables et affectation',
    title: 'Valeur vs Référence & gestion de la mémoire',
    summary: 'Une variable stocke soit directement une valeur, soit une référence (adresse) vers un objet. Copier une référence fait pointer plusieurs variables vers le même objet. Les données immuables rendent ce partage sûr. La mémoire est gérée manuellement (C) ou par un ramasse-miettes (Python, Java).',
    content: `Stockage par valeur vs par référence :
- Par valeur : la variable contient directement la donnée (ex : entiers simples en C)
- Par référence : la variable contient l'adresse de la donnée (tout en Python, objets en Java, pointeurs en C)
- Copier une référence → plusieurs variables pointent le MÊME objet en mémoire
- Modifier l'objet via une référence affecte toutes les variables qui pointent dessus

Données immuables (non mutables) :
- Valeur qui ne peut pas être modifiée après création (str, int, float, tuple en Python)
- Partager des références vers de l'immuable est sûr : l'original ne peut pas être altéré
- Les opérations renvoient une NOUVELLE instance plutôt que de modifier l'original

Gestion de la mémoire :
- Manuelle (C) : le programmeur alloue et libère explicitement (risque de fuites/erreurs)
- Automatique (Python, Java) : un ramasse-miettes (garbage collector) libère les objets non référencés
- Le GC est un peu moins efficace en théorie, mais réduit fortement les bugs de mémoire

Idée pédagogique : faire prévoir le résultat du partage de liste, puis montrer qu'une chaîne (immuable) ne pose pas le problème.`,
    code_example: `# Référence partagée (objet mutable)
a = [1, 2, 3]
b = a              # b et a → même objet
b.append(4)
print(a)           # [1, 2, 3, 4] — a aussi modifié !

# Donnée immuable : pas de surprise
s = "bonjour"
t = s
t = t.upper()      # crée une NOUVELLE chaîne
print(s)           # "bonjour" — inchangé
print(t)           # "BONJOUR"

# Vérifier l'identité (même objet en mémoire ?)
x = [1, 2]
y = x
z = [1, 2]
print(x is y)      # True  (même objet)
print(x is z)      # False (objets différents, contenu égal)
print(x == z)      # True  (contenu égal)`,
  },
  {
    bloc: 'bloc0', topic: 'Programmation fonctionnelle',
    title: 'Introduction à la programmation fonctionnelle',
    summary: 'Paradigme où les fonctions sont des « citoyens de première classe » : on peut les passer en argument, les retourner, les stocker. Il privilégie l\'immuabilité et l\'absence d\'effets de bord, ce qui rend le code plus sûr et plus facile à raisonner.',
    content: `Principe : composer des fonctions plutôt qu'enchaîner des instructions qui changent l'état.

Concepts clés :
- Fonction de première classe : une fonction est une donnée (passée en paramètre, retournée, assignée à une variable)
- Fonction d'ordre supérieur : prend une fonction en argument ou en retourne une (map, filter, reduce)
- Lambda (fonction anonyme) : définie à la volée, sans nom
  Python : lambda x: x + 1   |   Haskell : \\x -> x + 1
- Évaluation paresseuse : un calcul n'est fait que lorsque son résultat est nécessaire
  (ex : range en Python, listes infinies en Haskell)
- Immuabilité : on ne modifie pas les variables, chaque opération crée de nouvelles données

Avantages :
- Sécurité : moins d'effets de bord → plus facile de raisonner sur le code
- Vérification formelle facilitée
- Code concis et expressif pour le traitement de listes (map / filter)
- Optimisation mémoire/temps grâce à l'évaluation paresseuse

Langages :
- Haskell : fonctionnel pur (récursivité au lieu de boucles)
- OCaml : fonctionnel mais autorise l'impératif
- Python : impératif intégrant beaucoup de principes fonctionnels

Idée pédagogique : réécrire une boucle for de transformation de liste avec map/lambda, puis avec une compréhension de liste, et comparer la lisibilité.`,
    code_example: `# Fonction d'ordre supérieur : map + lambda
nombres = [1, 2, 3, 4, 5]
carres = list(map(lambda x: x ** 2, nombres))
print(carres)            # [1, 4, 9, 16, 25]

# filter : ne garder que les pairs
pairs = list(filter(lambda x: x % 2 == 0, nombres))
print(pairs)             # [2, 4]

# Une fonction qui retourne une fonction
def multiplicateur(facteur):
    return lambda x: x * facteur

doubler = multiplicateur(2)
tripler = multiplicateur(3)
print(doubler(10))       # 20
print(tripler(10))       # 30

# Équivalent impératif (le même calcul, version "boucle")
carres2 = []
for x in nombres:
    carres2.append(x ** 2)
print(carres2)           # [1, 4, 9, 16, 25]

# Évaluation paresseuse : range ne crée pas la liste en mémoire
for i in range(1_000_000):   # ne stocke pas 1 million d'entiers
    if i > 3:
        break
    print(i)             # 0, 1, 2, 3`,
  },
]

async function importFichesBloc0() {
  const btn = document.getElementById('btn-seed-bloc0')
  if (btn) { btn.disabled = true; btn.textContent = 'Import en cours…' }
  try {
    const { data, error } = await db.from('fiches').insert(FICHES_BLOC0_SEED).select()
    if (error) throw error
    allFiches = [...(data || []), ...allFiches]
    toast(`${FICHES_BLOC0_SEED.length} fiches Bloc 0 importées ✓`)
    renderFiches()
  } catch (err) {
    toast('Erreur import : ' + err.message)
    if (btn) { btn.disabled = false; btn.textContent = '⬇ Importer fiches Bloc 0' }
  }
}

const PROGRAMME = [
  { id: 'bloc0', topics: [
    { id: 'b0_archi',     label: 'Architecture des ordinateurs' },
    { id: 'b0_os',        label: "Système d'exploitation et Linux" },
    { id: 'b0_imperatif', label: 'Paradigme impératif' },
    { id: 'b0_python',    label: 'Bases de la programmation Python' },
  ]},
  { id: 'bloc1', topics: [
    { id: 'b1_flottants',  label: 'Codage des nombres flottants' },
    { id: 'b1_fichiers',   label: 'Fichiers, formats, compression et archivage' },
    { id: 'b1_types',      label: 'Types structurés, p-uplets, tableaux, dictionnaires' },
    { id: 'b1_tables',     label: 'Traitement de données en tables (recherche, tris, fusion)' },
    { id: 'b1_modularite', label: 'Modularité et bibliothèques' },
    { id: 'b1_langages',   label: 'Diversité des langages de programmation' },
    { id: 'b1_html',       label: 'HTML et CSS' },
    { id: 'b1_js',         label: 'JavaScript côté client' },
    { id: 'b1_events',     label: 'Gestion des événements dans une interface web' },
    { id: 'b1_tests',      label: 'Spécification, prototypage et tests' },
    { id: 'b1_didactique', label: 'Pensée informatique et didactique' },
    { id: 'b1_psycho',     label: 'Approche instrumentale et psychologie de la programmation' },
    { id: 'b1_maths',      label: 'Liens avec les didactiques des mathématiques' },
  ]},
  { id: 'bloc2', topics: [
    { id: 'b2_gloutons',    label: 'Algorithmes gloutons (sac à dos, rendu de monnaie)' },
    { id: 'b2_diviser',     label: 'Diviser pour régner' },
    { id: 'b2_knn',         label: 'Algorithme des k plus proches voisins' },
    { id: 'b2_predicats',   label: 'Prédicats et invariants' },
    { id: 'b2_correction',  label: 'Preuve de correction partielle' },
    { id: 'b2_terminaison', label: 'Preuve de terminaison' },
    { id: 'b2_complexite',  label: 'Notion de complexité (temps et mémoire)' },
  ]},
  { id: 'bloc3', topics: [
    { id: 'b3_circuits',    label: 'Circuits séquentiels et automates' },
    { id: 'b3_vonneumann',  label: 'Architecture de Von Neumann' },
    { id: 'b3_machine',     label: "Jeu d'instruction et langage machine" },
    { id: 'b3_robotique',   label: 'Robotique et systèmes embarqués' },
    { id: 'b3_signaux',     label: 'Acquisition et conversion des signaux analogiques' },
    { id: 'b3_os',          label: "Systèmes d'exploitation" },
    { id: 'b3_reseaux',     label: 'Réseaux et protocoles Internet (modèle OSI)' },
    { id: 'b3_chiffrement', label: 'Sécurité des communications (chiffrement)' },
  ]},
  { id: 'bloc4', topics: [
    { id: 'b4_sgbd',         label: 'SGBD et bases de données relationnelles' },
    { id: 'b4_sql',          label: 'Langage SQL' },
    { id: 'b4_web_serveur',  label: 'Programmation web côté serveur' },
    { id: 'b4_imperatif',    label: 'Programmation impérative' },
    { id: 'b4_fonctionnel',  label: 'Programmation fonctionnelle' },
    { id: 'b4_objet',        label: 'Programmation objet' },
    { id: 'b4_evenementiel', label: 'Programmation événementielle' },
    { id: 'b4_parallele',    label: 'Programmation parallèle' },
    { id: 'b4_logique',      label: 'Programmation logique' },
    { id: 'b4_listes',       label: 'Listes, piles, files' },
  ]},
  { id: 'bloc5', topics: [
    { id: 'b5_arbres',         label: 'Arbres binaires et arbres binaires de recherche' },
    { id: 'b5_graphes',        label: 'Graphes (parcours en profondeur et en largeur)' },
    { id: 'b5_dynamique',      label: 'Programmation dynamique' },
    { id: 'b5_randomise',      label: 'Algorithmes randomisés' },
    { id: 'b5_textuel',        label: 'Recherche textuelle' },
    { id: 'b5_calculabilite',  label: 'Complexité, calculabilité et machines de Turing' },
  ]},
]

const STATUS_LABELS = {
  not_started: '⚪ Non vu',
  in_progress: '🟡 En cours',
  mastered:    '🟢 Maîtrisé',
}
const STATUS_NEXT = { not_started: 'in_progress', in_progress: 'mastered', mastered: 'not_started' }

// ── State ────────────────────────────────────────────────
let allEntries    = []
let allFiches     = []
let allRessources = []
let topicStatuses = {}   // { topicId: 'not_started'|'in_progress'|'mastered' }
let selectedMood  = ''
let currentJournalId = null
let currentFicheId   = null
let ficheFilter   = 'all'
let currentView   = 'dashboard'

// ── Supabase helpers ─────────────────────────────────────
async function loadAll() {
  const [entriesRes, fichesRes, statusRes, resRes] = await Promise.all([
    db.from('entries').select('*').order('date', { ascending: false }),
    db.from('fiches').select('*').order('created_at', { ascending: true }),
    db.from('topic_status').select('*'),
    db.from('ressources').select('*').order('created_at', { ascending: true }),
  ])
  allEntries    = entriesRes.data  || []
  allFiches     = fichesRes.data   || []
  topicStatuses = Object.fromEntries((statusRes.data || []).map(r => [r.topic_key, r.status]))
  allRessources = resRes.data      || []
}

async function upsertTopicStatus(topicKey, status) {
  await db.from('topic_status').upsert({ topic_key: topicKey, status }, { onConflict: 'topic_key' })
  topicStatuses[topicKey] = status
}

// ── Navigation ───────────────────────────────────────────
function showView(id) {
  document.querySelectorAll('.content > section').forEach(s => s.classList.add('hidden'))
  document.getElementById('view-' + id).classList.remove('hidden')
  document.querySelectorAll('.nav-item').forEach(b => b.classList.toggle('active', b.dataset.view === id))
  currentView = id
}

function navigate(view) {
  showView(view)
  if (view === 'dashboard')   renderDashboard()
  else if (view === 'programme')  renderProgramme()
  else if (view === 'fiches')     renderFiches()
  else if (view === 'tp')         renderTPs()
  else if (view === 'journal')    renderJournal()
  else if (view === 'eval')       renderEval()
  else if (view === 'ressources') renderRessources()
}

// ── Données TP ───────────────────────────────────────────
const TPS = [
  // ── Mémo Séance 1 ──────────────────────────────────────
  {
    id: 'memo-s1', bloc: 'bloc0', jour: 'Jour 1 — 19 mai 2026',
    title: 'Mémo — Commandes de la séance 1 (Linux, navigation, fichiers)',
    type: 'memo',
    intro: 'DIU NSI | Linux | Séance 1 — Bases du système de fichiers Unix',
    table: [
      { cmd: 'pwd',    synt: 'pwd',                      desc: 'Affiche le répertoire courant (Present Working Directory)' },
      { cmd: 'ls',     synt: 'ls [-l] [-a] [chemin]',    desc: '-l : format long (droits, taille…)  -a : fichiers cachés  -la : les deux' },
      { cmd: 'cd',     synt: 'cd [chemin]',              desc: 'Change de répertoire. cd ~ renvoie au home. cd .. remonte d\'un niveau. cd - revient au précédent' },
      { cmd: 'mkdir',  synt: 'mkdir [-p] nom',           desc: 'Crée un répertoire. -p : crée les parents manquants (mkdir -p a/b/c)' },
      { cmd: 'rmdir',  synt: 'rmdir nom',                desc: 'Supprime un répertoire VIDE uniquement' },
      { cmd: 'touch',  synt: 'touch nom_fichier',        desc: 'Crée un fichier vide ou met à jour la date de modification' },
      { cmd: 'cp',     synt: 'cp [-r] src dest',         desc: 'Copie fichier ou dossier. -r : récursif (pour les dossiers)' },
      { cmd: 'mv',     synt: 'mv src dest',              desc: 'Déplace ou renomme un fichier/dossier' },
      { cmd: 'rm',     synt: 'rm [-r] [-f] fichier',     desc: 'Supprime. -r : récursif  -f : forcer sans confirmation  ⚠ irréversible' },
      { cmd: 'cat',    synt: 'cat fichier',              desc: 'Affiche le contenu d\'un fichier dans le terminal' },
      { cmd: 'less',   synt: 'less fichier',             desc: 'Affichage paginé. Flèches pour naviguer, q pour quitter' },
      { cmd: 'file',   synt: 'file nom',                 desc: 'Identifie le type d\'un fichier (texte, binaire, image…)' },
      { cmd: 'man',    synt: 'man commande',             desc: 'Manuel de la commande. q pour quitter. / pour chercher dans le man' },
      { cmd: 'ps',     synt: 'ps aux',                   desc: 'Liste tous les processus en cours. a : tous  u : format utilisateur  x : sans terminal' },
      { cmd: 'chmod',  synt: 'chmod 755 fichier',        desc: 'Modifie les droits. Octal : 7=rwx 5=r-x 4=r--. Symbolique : chmod +x, u+w, g-r…' },
    ]
  },
  // ── TP 1 ───────────────────────────────────────────────
  {
    id: 'tp1', bloc: 'bloc0', jour: 'Jour 1 — 19 mai 2026',
    title: 'TP 1 — Premier contact avec Linux',
    type: 'tp',
    intro: 'Objectif : se repérer dans l\'arborescence Linux, créer et naviguer dans des répertoires.',
    steps: [
      {
        num: '1.1', title: 'Se repérer dans l\'arborescence',
        code: `$ pwd                        # Où suis-je ?
$ ls                         # Que contient ce répertoire ?
$ ls -l                      # Format long (droits, taille, date)
$ ls -la                     # Inclure les fichiers cachés
$ ls /                       # Contenu de la racine
$ ls /home                   # Répertoires des utilisateurs`,
        questions: [
          "Quel est votre répertoire courant ? Que signifie le ~ dans l'invite de commande ?",
          "Quelle est la différence entre ls et ls -la ? Que sont les fichiers commençant par . ?",
          "Décrivez la structure de / : à quoi servent /bin, /etc, /home, /tmp ?"
        ]
      },
      {
        num: '1.2', title: 'Chemins absolus et relatifs',
        code: `# Chemin absolu : depuis la racine /
$ ls /home

# Chemin relatif : depuis le répertoire courant
$ ls ..            # Répertoire parent
$ ls ../..         # Deux niveaux au-dessus
$ cd ~             # Retour au home (raccourci)
$ cd /tmp          # Aller dans /tmp (absolu)
$ cd -             # Revenir au répertoire précédent`,
        note: 'Chemin absolu = adresse postale complète. Chemin relatif = "à droite, puis à gauche". Le ~ est un alias pour votre répertoire home (/home/votre_login).',
        questions: [
          "Depuis votre home, comment accéder à /etc en chemin relatif ? En chemin absolu ?",
          "Que fait cd sans argument ? Et cd - ?"
        ]
      },
      {
        num: '1.3', title: 'Créer l\'arborescence du projet',
        code: `$ cd ~
$ mkdir NSI_projet
$ cd NSI_projet
$ mkdir scripts data docs
$ ls
$ mkdir -p scripts/utilitaires
$ ls scripts/
$ pwd`,
        questions: [
          "Dessinez l'arborescence obtenue. Quelle est l'utilité de mkdir -p ?",
          "Comment revenir au home depuis NSI_projet/scripts/utilitaires en une seule commande ?"
        ]
      }
    ]
  },
  // ── TP 2 ───────────────────────────────────────────────
  {
    id: 'tp2', bloc: 'bloc0', jour: 'Jour 1 — 19 mai 2026',
    title: 'TP 2 — Manipulation de fichiers',
    type: 'tp',
    intro: 'Objectif : créer, copier, déplacer, supprimer des fichiers et comprendre les fichiers cachés.',
    steps: [
      {
        num: '2.1', title: 'Créer et inspecter des fichiers',
        code: `$ cd ~/NSI_projet
$ touch data/eleves.txt
$ ls -l data/
$ file data/eleves.txt        # Type du fichier

# Écrire du contenu dans le fichier
$ cat > data/eleves.txt << 'EOF'
Alice 15
Bob 12
Clara 17
EOF

$ cat data/eleves.txt         # Afficher
$ less data/eleves.txt        # Paginé (q pour quitter)
$ wc -l data/eleves.txt       # Compter les lignes`,
        questions: [
          "Que fait cat > fichier ? Quelle est la différence avec cat >> fichier ?",
          "À quoi sert wc -l ? Que donnent wc -w et wc -c ?"
        ]
      },
      {
        num: '2.2', title: 'Copier, déplacer, renommer',
        code: `$ cp data/eleves.txt data/eleves_backup.txt
$ ls data/

$ mv data/eleves_backup.txt docs/
$ ls data/ docs/

# Renommer = mv vers le même répertoire avec un nouveau nom
$ mv docs/eleves_backup.txt docs/sauvegarde.txt
$ ls docs/

# Copier un dossier entier
$ cp -r data/ data_sauvegarde/
$ ls`,
        note: '⚠ mv écrase la destination sans avertissement si elle existe déjà. Vérifiez avant d\'exécuter.',
        questions: [
          "Quelle est la différence entre cp et mv ? Que se passe-t-il si la destination de mv existe déjà ?",
          "Pourquoi cp -r et pas juste cp pour copier un dossier ?"
        ]
      },
      {
        num: '2.3', title: 'Fichiers cachés et suppression',
        code: `# Créer un fichier caché (commence par .)
$ touch .config_perso
$ ls              # Pas visible !
$ ls -a           # Visible avec -a
$ ls -la          # Format long avec cachés

# Supprimer
$ rm .config_perso
$ rm data/eleves_backup.txt   # Fichier (s'il reste)
$ rm -r data_sauvegarde/      # Dossier et son contenu`,
        note: '⚠ rm est irréversible : pas de corbeille sous Linux. rm -rf supprime sans demander confirmation. À utiliser avec précaution !',
        questions: [
          "Pourquoi certains fichiers commencent-ils par . sous Linux ? Donnez des exemples réels (.bashrc, .ssh…)",
          "Quelle commande permet de lister UNIQUEMENT les fichiers cachés ? (indice : combinez ls -a et grep)"
        ]
      }
    ]
  },
  // ── TP 3 ───────────────────────────────────────────────
  {
    id: 'tp3', bloc: 'bloc0', jour: 'Jour 1 — 19 mai 2026',
    title: 'TP 3 — Processus et première utilisation des pipes',
    type: 'tp',
    intro: 'Objectif : observer les processus en cours, utiliser le manuel et découvrir le pipe |.',
    steps: [
      {
        num: '3.1', title: 'Observer les processus',
        code: `$ ps            # Processus du terminal courant
$ ps aux        # Tous les processus du système
$ ps aux | head -20   # Les 20 premières lignes seulement

# Signification des colonnes ps aux :
# USER PID %CPU %MEM VSZ RSS TTY STAT START TIME COMMAND
# PID = identifiant unique du processus
# %CPU / %MEM = consommation de ressources`,
        questions: [
          "Quel est le PID du processus bash en cours ? Et le premier processus lancé (PID 1) ?",
          "Que signifie STAT = S ? Z ? R ? (aidez-vous du man)"
        ]
      },
      {
        num: '3.2', title: 'Le manuel et l\'aide',
        code: `$ man ls            # Manuel de ls (q pour quitter, / pour chercher)
$ man ps
$ ls --help         # Aide courte (toutes les commandes n'ont pas --help)
$ man man           # Le manuel du manuel !

# Chercher une commande par mot-clé
$ man -k "copy file"`,
        note: 'Le man est votre meilleur ami. Avant de chercher sur internet, cherchez dans le man. Les pages man ont une structure standard : NAME, SYNOPSIS, DESCRIPTION, OPTIONS, EXAMPLES.',
        questions: [
          "Dans man ls, trouvez l'option pour trier par taille. Testez-la.",
          "Quelle est la différence entre --help et man ? Lequel est plus complet ?"
        ]
      },
      {
        num: '3.3', title: 'Premier pipeline',
        code: `# Sans pipe : on cherche à la main
$ ps aux
# → trop long, on veut filtrer

# Avec pipe : ps envoie sa sortie à grep
$ ps aux | grep bash
$ ps aux | grep python
$ ps aux | wc -l      # Compter le nombre de processus

# Chaîner 3 commandes
$ ps aux | grep -v grep | grep bash`,
        note: 'Le pipe | est fondamental Unix : la sortie (stdout) de la commande de gauche devient l\'entrée (stdin) de la commande de droite. Aucune écriture de fichier intermédiaire. C\'est le principe de composition de fonctions : f(g(x)).',
        questions: [
          "Construisez une commande qui compte le nombre de processus lancés par votre utilisateur.",
          "Que fait grep -v grep dans le dernier exemple ? Pourquoi est-ce utile ?"
        ]
      }
    ]
  },
  // ── TP 4 ───────────────────────────────────────────────
  {
    id: 'tp4', bloc: 'bloc0', jour: 'Jour 1 — 19 mai 2026',
    title: 'TP 4 — Permissions et premier script bash',
    type: 'tp',
    intro: 'Objectif : comprendre le système de permissions Unix et écrire un premier script bash.',
    steps: [
      {
        num: '4.1', title: 'Lire et modifier les permissions',
        code: `$ ls -l ~/NSI_projet/
# Exemple de sortie :
# -rw-r--r-- 1 user group 1234 mai 19 10:00 fichier.txt
# drwxr-xr-x 2 user group 4096 mai 19 10:00 scripts/
#  ↑↑↑↑↑↑↑↑↑
#  type | propriétaire | groupe | autres

# Notation octale : r=4, w=2, x=1
$ chmod 755 scripts/      # rwxr-xr-x
$ chmod 644 data/eleves.txt  # rw-r--r--

# Notation symbolique
$ chmod +x scripts/utilitaires/   # Ajouter exécution
$ chmod u+w fichier.txt            # Propriétaire : ajouter écriture
$ chmod o-r fichier.txt            # Autres : retirer lecture`,
        note: 'Permissions en octal : 7 = rwx (lecture+écriture+exécution), 5 = r-x, 4 = r--. chmod 755 = propriétaire tout, groupe et autres lecture+exécution. Convention classique pour les scripts.',
        questions: [
          "Décodez -rwxr-x--- : qui peut faire quoi ?",
          "Quelle commande donne tous les droits au propriétaire, lecture seule au groupe, aucun droit aux autres ?"
        ]
      },
      {
        num: '4.2', title: 'Variables et environnement',
        code: `# Créer une variable locale
$ MA_VAR="Bonjour NSI"
$ echo $MA_VAR

# Exporter pour les sous-processus
$ export PROJET_DIR=~/NSI_projet
$ echo $PROJET_DIR

# Variables d'environnement du système
$ echo $HOME
$ echo $PATH
$ echo $USER

# Lister toutes les variables d'environnement
$ env | less`,
        questions: [
          "Quelle est la différence entre MA_VAR=valeur et export MA_VAR=valeur ?",
          "Que contient $PATH ? À quoi sert-il ? Que se passe-t-il si on efface $PATH ?"
        ]
      },
      {
        num: '4.3', title: 'Premier script bash',
        code: `$ cd ~/NSI_projet/scripts
$ cat > bonjour.sh << 'FIN'
#!/bin/bash
# Mon premier script bash — Usage: ./bonjour.sh [nom]

# Argument 1, ou "Monde" par défaut :
NOM="Monde"
if [ -n "$1" ]; then NOM="$1"; fi

echo "Bonjour, $NOM !"
echo "Répertoire courant : $PWD"
echo "Nombre de fichiers dans data/ :"
ls ~/NSI_projet/data/ | wc -l
FIN

$ chmod +x bonjour.sh   # rendre exécutable
$ ./bonjour.sh
$ ./bonjour.sh "NSI Le Havre"`,
        note: 'Le shebang #!/bin/bash en première ligne indique à Linux quel interpréteur utiliser. Sans chmod +x, le fichier est du texte — Linux ne sait pas qu\'il faut l\'exécuter. La notation ${ 1:-défaut } est une valeur par défaut si l\'argument n\'est pas fourni.',
        questions: [
          "Que se passe-t-il si on oublie le shebang #!/bin/bash ?",
          "Modifiez le script pour qu'il affiche aussi la liste des fichiers .txt dans data/.",
          "Que fait $( date +%d/%m/%Y) ? Comment s'appelle cette syntaxe ?"
        ]
      }
    ]
  },
  // ── Mémo Séance 2 ──────────────────────────────────────
  {
    id: 'memo-s2', bloc: 'bloc0', jour: 'Jour 2 — 20 mai 2026',
    title: 'Mémo — Commandes de la séance 2 (Linux, Shell, Scripts)',
    type: 'memo',
    intro: 'DIU NSI | Linux | Séance 2 — Commandes avancées & scripts bash',
    table: [
      { cmd: 'grep',        synt: 'grep [opts] motif fichier',          desc: '-i insensible casse  -n numéro ligne  -c compter  -v inverser  -r récursif' },
      { cmd: 'sort',        synt: 'sort [-t délim] [-k col] [-n] [-r]', desc: '-t délimiteur  -k colonne  -n numérique  -r décroissant' },
      { cmd: 'uniq',        synt: 'uniq [-c]  (après sort)',            desc: 'Supprime les doublons consécutifs.  -c : compter les occurrences' },
      { cmd: 'wc',          synt: 'wc [-l] [-w] [-c] fichier',          desc: '-l lignes  -w mots  -c caractères' },
      { cmd: 'cut',         synt: 'cut -d délim -f col fichier',        desc: "-d ',' -f 1,3 : extraire colonnes 1 et 3 d'un CSV" },
      { cmd: '|',           synt: 'cmd1 | cmd2',                        desc: 'Pipe : sortie de cmd1 → entrée de cmd2' },
      { cmd: '>',           synt: 'cmd > fichier',                      desc: 'Redirige stdout vers fichier (écrase)' },
      { cmd: '>>',          synt: 'cmd >> fichier',                     desc: 'Ajoute stdout à la fin du fichier' },
      { cmd: '2>',          synt: 'cmd 2> erreurs.log',                 desc: 'Redirige stderr (erreurs) vers un fichier' },
      { cmd: 'export',      synt: 'export VAR=valeur',                  desc: "Exporte une variable d'environnement" },
      { cmd: '$VAR',        synt: 'echo $VAR',                          desc: "Utiliser la valeur d'une variable" },
      { cmd: '#!/bin/bash', synt: 'Première ligne d\'un script',        desc: 'Shebang : indique l\'interpréteur bash' },
      { cmd: 'if/then/fi',  synt: 'if [ cond ]; then ... fi',          desc: 'Condition bash. Espaces obligatoires dans [ ]' },
      { cmd: 'for',         synt: 'for X in a b c; do ... done',        desc: 'Boucle sur une liste de valeurs' },
      { cmd: 'chmod +x',    synt: 'chmod +x script.sh',                 desc: 'Rendre un script exécutable' },
    ]
  },
  {
    id: 'tp5', bloc: 'bloc0', jour: 'Jour 2 — 20 mai 2026',
    title: 'TP 5 — Filtres de texte',
    type: 'tp',
    intro: 'Tous les exercices utilisent le fichier eleves.csv. Vérifiez sa présence :',
    setup: `$ cd ~/NSI_projet
$ cat data/eleves.csv`,
    setupCreate: `$ cat > data/eleves.csv << 'EOF'
nom,prenom,classe,note_maths,note_info
Dupont,Alice,1NSI1,15,18
Martin,Bob,1NSI2,12,14
Bernard,Clara,1NSI1,17,16
Thomas,David,1NSI2,9,11
Leroy,Emma,1NSI1,14,19
Petit,Felix,1NSI2,11,13
Grand,Gina,1NSI1,16,15
Morin,Hugo,1NSI2,8,10
EOF`,
    steps: [
      {
        num: '5.1', title: 'grep : rechercher dans un fichier',
        code: `$ grep 'Alice' data/eleves.csv
$ grep '1NSI1' data/eleves.csv
$ grep -i 'dupont' data/eleves.csv    # Insensible à la casse
$ grep -n '1NSI2' data/eleves.csv     # Avec numéro de ligne
$ grep -c '1NSI1' data/eleves.csv     # Compter les occurrences
$ grep -v 'nom' data/eleves.csv       # Exclure les lignes contenant 'nom'`,
        questions: [
          "Combien d'élèves sont en 1NSI1 ? Quelle commande avez-vous utilisée ?",
          "Que fait grep -v 'nom' ? À quoi ça sert ici ?"
        ]
      },
      {
        num: '5.2', title: 'sort : trier',
        code: `$ sort data/eleves.csv
$ sort -t',' -k5 -n data/eleves.csv    # Trier par note_info (col 5), numérique
$ sort -t',' -k5 -nr data/eleves.csv   # Ordre décroissant
$ sort -t',' -k4 -n data/eleves.csv    # Trier par note_maths (col 4)`,
        questions: [
          "Quel élève a la meilleure note en info ? En maths ? Notez les commandes utilisées."
        ]
      },
      {
        num: '5.3', title: 'cut, uniq, wc',
        code: `$ cut -d',' -f1,2 data/eleves.csv        # Extraire nom et prénom
$ cut -d',' -f3 data/eleves.csv         # Extraire la classe
$ cut -d',' -f3 data/eleves.csv | sort | uniq      # Classes uniques
$ cut -d',' -f3 data/eleves.csv | sort | uniq -c   # Avec comptage
$ wc -l data/eleves.csv`,
        note: 'uniq ne fonctionne que sur des données triées : uniq supprime les doublons consécutifs uniquement. Si les données ne sont pas triées, les doublons non adjacents ne sont pas détectés. C\'est la même notion de pré-condition qu\'en algorithmique NSI : la recherche dichotomique nécessite une liste triée.',
        questions: [
          "Pourquoi faut-il faire sort AVANT uniq ? Que se passe-t-il si on ne trie pas ?",
          "Combien y a-t-il d'élèves par classe ? Construire le pipeline complet."
        ]
      }
    ]
  },
  {
    id: 'tp6', bloc: 'bloc0', jour: 'Jour 2 — 20 mai 2026',
    title: 'TP 6 — Pipes et redirections',
    type: 'tp',
    steps: [
      {
        num: '6.1', title: 'Le pipe | : chaîner les commandes',
        intro: 'Le pipe envoie la sortie d\'une commande vers l\'entrée de la suivante.',
        code: `# Filtrer 1NSI1 puis trier par note info décroissante
$ grep '1NSI1' data/eleves.csv | sort -t',' -k5 -nr

# Top 3 meilleures notes info (toutes classes)
$ grep -v 'nom' data/eleves.csv | sort -t',' -k5 -nr | head -3

# Nombre d'élèves par classe
$ cut -d',' -f3 data/eleves.csv | grep -v 'classe' | sort | uniq -c`,
        note: 'Le pipe | = composition de fonctions : grep | sort | uniq correspond en Python à list(set(sorted(filter(lambda x: …, data)))). Chaque commande fait une chose simple, la puissance vient de la composition. C\'est le principe Unix : des outils simples combinés font des tâches complexes.',
        questions: [
          "Construisez un pipeline pour afficher uniquement les noms et prénoms des élèves de 1NSI2, triés alphabétiquement."
        ]
      },
      {
        num: '6.2', title: 'Redirections : sauvegarder les résultats',
        code: `# Sauvegarder dans un nouveau fichier (écrase si existant)
$ grep '1NSI1' data/eleves.csv > data/classe_1NSI1.csv
$ cat data/classe_1NSI1.csv

# Ajouter à la fin sans écraser
$ grep '1NSI2' data/eleves.csv >> data/classe_1NSI1.csv
$ wc -l data/classe_1NSI1.csv

# Rediriger les erreurs
$ cat fichier_inexistant.csv 2> data/erreurs.log
$ cat data/erreurs.log`,
        questions: [
          "Que contient data/classe_1NSI1.csv après les deux commandes ? Pourquoi ?"
        ]
      },
      {
        num: '6.3', title: 'Exercice intégré : pipeline de rapport',
        intro: 'Construisez un pipeline complet qui génère un rapport classant les élèves de 1NSI1 par note info décroissante, sauvegardé dans data/rapport.txt :',
        code: `# Étape 1 : créer l'en-tête
$ echo '=== Classement 1NSI1 ===' > data/rapport.txt

# Étape 2 : compléter avec les données triées (à vous !)
$ grep _____ data/eleves.csv | grep -v _____ | sort _____ | cut _____ >> data/rapport.txt

# Étape 3 : vérifier
$ cat data/rapport.txt`,
        questions: [
          "Complétez et expliquez chaque partie du pipeline ci-dessus."
        ]
      }
    ]
  }
]

// ── Rendu TP ─────────────────────────────────────────────
function renderTPs() {
  // Tabs par bloc
  const blocs = [...new Set(TPS.map(t => t.bloc))]
  const tabsEl = document.getElementById('tp-bloc-tabs')
  const listEl = document.getElementById('tp-list')

  let activeBloc = blocs[0]
  function renderList() {
    const filtered = TPS.filter(t => t.bloc === activeBloc)
    listEl.innerHTML = filtered.map(tp => renderTPCard(tp)).join('')
  }

  tabsEl.innerHTML = blocs.map(b => {
    const bl = BLOCS[b] || { short: b }
    return `<button class="tab-btn ${b === activeBloc ? 'active' : ''}" data-bloc="${b}">${bl.short}</button>`
  }).join('')
  tabsEl.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      activeBloc = btn.dataset.bloc
      tabsEl.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.bloc === activeBloc))
      renderList()
    })
  })
  renderList()
}

function renderTPCard(tp) {
  const typeLabel = tp.type === 'memo' ? 'Mémo' : 'TP'
  const typeColor = tp.type === 'memo' ? '#0ea5e9' : '#10b981'

  if (tp.type === 'memo') {
    const rows = tp.table.map(r => `
      <tr>
        <td class="tp-cmd-cell"><code>${escapeHtml(r.cmd)}</code></td>
        <td class="tp-synt-cell"><code>${escapeHtml(r.synt)}</code></td>
        <td class="tp-desc-cell">${escapeHtml(r.desc)}</td>
      </tr>`).join('')
    return `
    <div class="tp-card">
      <div class="tp-card-header">
        <span class="tp-type-badge" style="background:${typeColor}">${typeLabel}</span>
        <span class="tp-jour">${escapeHtml(tp.jour)}</span>
      </div>
      <h3 class="tp-card-title">${escapeHtml(tp.title)}</h3>
      <p class="tp-intro">${escapeHtml(tp.intro)}</p>
      <div class="tp-table-wrap">
        <table class="tp-cmd-table">
          <thead><tr><th>Commande</th><th>Syntaxe</th><th>Description</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </div>`
  }

  // TP type
  const stepsHtml = tp.steps.map(step => {
    const introHtml  = step.intro ? `<p class="tp-step-intro">${escapeHtml(step.intro)}</p>` : ''
    const noteHtml   = step.note  ? `<div class="tp-note">${escapeHtml(step.note)}</div>` : ''
    const questHtml  = step.questions ? step.questions.map(q =>
      `<p class="tp-question"><em>${escapeHtml(q)}</em></p>`).join('') : ''
    return `
    <div class="tp-step">
      <div class="tp-step-header">
        <span class="tp-step-num">${escapeHtml(step.num)}</span>
        <span class="tp-step-title">${escapeHtml(step.title)}</span>
      </div>
      ${introHtml}
      <pre class="doc-code">${escapeHtml(step.code)}</pre>
      ${noteHtml}
      ${questHtml}
    </div>`
  }).join('')

  const setupHtml = tp.setup ? `
    <div class="tp-setup">
      <p class="tp-intro">${escapeHtml(tp.intro || '')}</p>
      <pre class="doc-code">${escapeHtml(tp.setup)}</pre>
      ${tp.setupCreate ? `<p class="tp-intro" style="margin-top:8px">Si le fichier est absent, recréez-le :</p><pre class="doc-code">${escapeHtml(tp.setupCreate)}</pre>` : ''}
    </div>` : (tp.intro ? `<p class="tp-intro">${escapeHtml(tp.intro)}</p>` : '')

  return `
  <div class="tp-card">
    <div class="tp-card-header">
      <span class="tp-type-badge" style="background:${typeColor}">${typeLabel}</span>
      <span class="tp-jour">${escapeHtml(tp.jour)}</span>
    </div>
    <h3 class="tp-card-title">${escapeHtml(tp.title)}</h3>
    ${setupHtml}
    ${stepsHtml}
  </div>`
}

// ── Helpers ──────────────────────────────────────────────
function fmt(iso) {
  if (!iso) return ''
  const [y, m, d] = iso.split('-')
  return `${d}/${m}/${y}`
}
function today() { return new Date().toISOString().slice(0, 10) }

function blocBadge(bloc) {
  if (!bloc || !BLOCS[bloc]) return ''
  return `<span class="bloc-badge ${bloc}">${BLOCS[bloc].short}</span>`
}

// ── Dashboard ────────────────────────────────────────────
function renderDashboard() {
  const totalTopics   = PROGRAMME.reduce((n, b) => n + b.topics.length, 0)
  const mastered      = Object.values(topicStatuses).filter(s => s === 'mastered').length
  const inProgress    = Object.values(topicStatuses).filter(s => s === 'in_progress').length

  // Prochaine deadline
  const daysRapport = daysUntil('2026-11-30')
  const daysPresent = daysUntil('2026-12-17')

  document.getElementById('dash-stats').innerHTML = `
    <div class="stat-card"><div class="stat-value">${mastered}</div><div class="stat-label">Thèmes maîtrisés / ${totalTopics}</div></div>
    <div class="stat-card"><div class="stat-value">${allFiches.length}</div><div class="stat-label">Fiches de cours</div></div>
    <div class="stat-card"><div class="stat-value">${allEntries.length}</div><div class="stat-label">Entrées journal</div></div>
    <div class="stat-card deadline-card ${daysRapport < 14 ? 'urgent' : ''}">
      <div class="deadline-label">📄 Rapport papier</div>
      <div class="deadline-date">30 nov. 2026</div>
      <div class="deadline-days">J-${daysRapport}</div>
    </div>
    <div class="stat-card deadline-card ${daysPresent < 14 ? 'urgent' : ''}">
      <div class="deadline-label">🎤 Présentation orale</div>
      <div class="deadline-date">17 déc. 2026</div>
      <div class="deadline-days">J-${daysPresent}</div>
    </div>
  `

  document.getElementById('dash-blocs').innerHTML = PROGRAMME.map(bloc => {
    const total    = bloc.topics.length
    const done     = bloc.topics.filter(t => topicStatuses[t.id] === 'mastered').length
    const ongoing  = bloc.topics.filter(t => topicStatuses[t.id] === 'in_progress').length
    const pct      = Math.round((done / total) * 100)
    const color    = BLOCS[bloc.id].color
    return `
      <div class="bloc-progress">
        <div class="bloc-progress-header">
          <span>${BLOCS[bloc.id].short} — ${BLOCS[bloc.id].label.split('—')[1].trim()}</span>
          <span style="color:var(--muted);font-weight:400">${done}/${total} maîtrisés${ongoing ? ` · ${ongoing} en cours` : ''}</span>
        </div>
        <div class="progress-track">
          <div class="progress-fill" style="width:${pct}%;background:${color}"></div>
        </div>
      </div>`
  }).join('')

  const recent = allEntries.slice(0, 3)
  document.getElementById('dash-recent').innerHTML = recent.length
    ? recent.map(e => `
        <div class="recent-card" data-id="${e.id}">
          <div class="recent-card-title">${e.mood || '📄'} ${e.title || '(Sans titre)'}</div>
          <div class="recent-card-meta">${fmt(e.date)}${e.topic ? ' · ' + e.topic : ''} ${blocBadge(e.bloc)}</div>
        </div>`).join('')
    : '<p class="empty-msg">Aucune entrée journal.</p>'

  document.querySelectorAll('.recent-card[data-id]').forEach(card => {
    card.addEventListener('click', () => {
      const entry = allEntries.find(e => e.id === card.dataset.id)
      if (entry) { navigate('journal'); showJournalEdit(entry) }
    })
  })
}

// ── Programme ────────────────────────────────────────────
function renderProgramme() {
  document.getElementById('programme-list').innerHTML = PROGRAMME.map(bloc => `
    <div class="bloc-section" id="bs-${bloc.id}">
      <div class="bloc-header" data-bloc="${bloc.id}">
        <div class="bloc-dot" style="background:${BLOCS[bloc.id].color}"></div>
        ${BLOCS[bloc.id].label}
        <span class="bloc-chevron">▶</span>
      </div>
      <div class="topic-list">
        ${bloc.topics.map(t => {
          const status = topicStatuses[t.id] || 'not_started'
          return `
            <div class="topic-row">
              <span class="topic-label">${t.label}</span>
              <button class="status-btn ${status}" data-topic="${t.id}" data-status="${status}">
                ${STATUS_LABELS[status]}
              </button>
            </div>`
        }).join('')}
      </div>
    </div>
  `).join('')

  document.querySelectorAll('.bloc-header').forEach(h => {
    h.addEventListener('click', () => {
      const section = document.getElementById('bs-' + h.dataset.bloc)
      section.classList.toggle('open')
    })
  })

  document.querySelectorAll('.status-btn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation()
      const topicId = btn.dataset.topic
      const current = btn.dataset.status
      const next    = STATUS_NEXT[current]
      btn.dataset.status = next
      btn.className = 'status-btn ' + next
      btn.textContent = STATUS_LABELS[next]
      await upsertTopicStatus(topicId, next)
    })
  })
}

// ── Fiches ───────────────────────────────────────────────
// Mappe une date ISO → label "Jour N — JJ mois"
const JOUR_LABELS = {
  '2026-05-19': 'Jour 1 — 19 mai',
  '2026-05-20': 'Jour 2 — 20 mai',
  '2026-05-21': 'Jour 3 — 21 mai',
  '2026-05-22': 'Jour 4 — 22 mai',
}
function jourLabel(isoTs) {
  if (!isoTs) return ''
  const d = isoTs.slice(0, 10)
  return JOUR_LABELS[d] || d
}

function renderFiches() {
  // ── Tabs ──────────────────────────────────────────────
  const tabs = document.getElementById('fiche-tabs')
  tabs.innerHTML =
    `<button class="tab-btn ${ficheFilter === 'all' ? 'active' : ''}" style="${ficheFilter === 'all' ? 'background:#1e293b' : ''}" data-filter="all">Tous les blocs</button>` +
    PROGRAMME.map(b => `
      <button class="tab-btn ${ficheFilter === b.id ? 'active' : ''}"
        style="${ficheFilter === b.id ? `background:${BLOCS[b.id].color}` : ''}"
        data-filter="${b.id}">${BLOCS[b.id].short}</button>
    `).join('')

  tabs.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => { ficheFilter = btn.dataset.filter; renderFiches() })
  })

  // ── Seed ──────────────────────────────────────────────
  const seedZone = document.getElementById('fiche-seed-zone')
  const hasBloc0 = allFiches.some(f => f.bloc === 'bloc0')
  if (seedZone) {
    seedZone.innerHTML = hasBloc0 ? '' :
      `<button id="btn-seed-bloc0" class="btn-secondary">⬇ Importer les fiches du cours du 19 mai (Bloc 0)</button>`
    const seedBtn = document.getElementById('btn-seed-bloc0')
    if (seedBtn) seedBtn.addEventListener('click', importFichesBloc0)
  }

  const list  = document.getElementById('fiche-list')
  const empty = document.getElementById('fiche-empty')
  const filtered = ficheFilter === 'all'
    ? allFiches
    : allFiches.filter(f => f.bloc === ficheFilter)

  empty.classList.toggle('hidden', filtered.length > 0)
  if (!filtered.length) { list.innerHTML = ''; return }

  // ── Grouper : si "Tous" → par bloc puis par thème
  //              sinon → par thème directement ──────────
  if (ficheFilter === 'all') {
    // Groupe par bloc
    const byBloc = {}
    filtered.forEach(f => {
      const k = f.bloc || 'autre'
      ;(byBloc[k] = byBloc[k] || []).push(f)
    })
    list.innerHTML = Object.entries(byBloc).map(([bId, fiches]) => {
      const bl = BLOCS[bId] || { label: bId, color: '#64748b' }
      return `
        <div class="fiche-bloc-section">
          <div class="fiche-bloc-divider" style="border-color:${bl.color}">
            <span class="fiche-bloc-divider-label" style="background:${bl.color}">${bl.label}</span>
          </div>
          ${renderFichesByTheme(fiches, false)}
        </div>`
    }).join('')
  } else {
    list.innerHTML = renderFichesByTheme(filtered, true)
  }
}

function renderFichesByTheme(fiches, showJourPerCard) {
  // Grouper par thème (topic), conserver l'ordre d'insertion (created_at asc)
  const groups = new Map()
  fiches.forEach(f => {
    const key = f.topic || '(Sans thème)'
    if (!groups.has(key)) groups.set(key, [])
    groups.get(key).push(f)
  })

  return [...groups.entries()].map(([topic, group]) => {
    // Jour du premier élément du groupe
    const jour = jourLabel(group[0].created_at)
    const cards = group.map(f => {
      const j = showJourPerCard ? '' :
        `<span class="fiche-card-jour">${jourLabel(f.created_at)}</span>`
      return `
        <div class="fiche-card" data-id="${f.id}">
          ${j}
          <div class="fiche-card-title">${escapeHtml(f.title || '(Sans titre)')}</div>
          ${f.summary ? `<div class="fiche-card-summary">${escapeHtml(f.summary.slice(0, 120))}${f.summary.length > 120 ? '…' : ''}</div>` : ''}
          ${f.code_example ? '<div class="fiche-has-code">💻 Code</div>' : ''}
        </div>`
    }).join('')

    return `
      <div class="fiche-theme-group">
        <div class="fiche-theme-header">
          <span class="fiche-theme-label">${escapeHtml(topic)}</span>
          <span class="fiche-theme-jour">${escapeHtml(jour)}</span>
        </div>
        <div class="fiche-theme-cards">${cards}</div>
      </div>`
  }).join('')
}

// Délégation de clic sur les cartes (après innerHTML)
document.getElementById('fiche-list').addEventListener('click', e => {
  const card = e.target.closest('.fiche-card[data-id]')
  if (!card) return
  const fiche = allFiches.find(f => f.id === card.dataset.id)
  if (fiche) showFicheRead(fiche)
})

function escapeHtml(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;')
}

function showFicheRead(fiche) {
  showView('fiche-read')
  currentFicheId = fiche.id
  const sec = (label, body, opts = {}) => {
    if (!body || !String(body).trim()) return ''
    if (opts.code) {
      return `<div class="doc-section"><div class="doc-label">${label}</div>` +
             `<pre class="doc-code">${escapeHtml(body)}</pre></div>`
    }
    return `<div class="doc-section"><div class="doc-label">${label}</div>` +
           `<div class="doc-body${opts.lead ? ' lead' : ''}">${escapeHtml(body)}</div></div>`
  }
  const parts = [
    sec('Résumé', fiche.summary, { lead: true }),
    sec('Objectifs pédagogiques', fiche.objectifs),
    sec('Notes de cours', fiche.content),
    sec('Exemple de code', fiche.code_example, { code: true }),
    sec('Exercices pour les élèves', fiche.exercices),
  ].filter(Boolean)

  const eyebrow = [
    fiche.bloc && BLOCS[fiche.bloc] ? BLOCS[fiche.bloc].label : '',
    fiche.topic || '',
  ].filter(Boolean).join('  ·  ')

  document.getElementById('fiche-doc').innerHTML =
    `${eyebrow ? `<div class="doc-eyebrow">${escapeHtml(eyebrow)}</div>` : ''}` +
    `<h1 class="doc-title">${escapeHtml(fiche.title || '(Sans titre)')}</h1>` +
    (parts.length ? parts.join('<hr>') : '<div class="doc-body" style="color:var(--muted)">Fiche vide — clique sur « Modifier » pour la remplir.</div>')
}

function showFicheEdit(fiche) {
  showView('fiche-edit')
  if (!fiche) {
    currentFicheId = null
    document.getElementById('fiche-bloc').value    = ficheFilter !== 'all' ? ficheFilter : ''
    document.getElementById('fiche-topic').value   = ''
    document.getElementById('fiche-title').value   = ''
    document.getElementById('fiche-summary').value   = ''
    document.getElementById('fiche-objectifs').value = ''
    document.getElementById('fiche-content').value   = ''
    document.getElementById('fiche-code').value      = ''
    document.getElementById('fiche-exercices').value = ''
  } else {
    currentFicheId = fiche.id
    document.getElementById('fiche-bloc').value      = fiche.bloc         || ''
    document.getElementById('fiche-topic').value     = fiche.topic        || ''
    document.getElementById('fiche-title').value     = fiche.title        || ''
    document.getElementById('fiche-summary').value   = fiche.summary      || ''
    document.getElementById('fiche-objectifs').value = fiche.objectifs    || ''
    document.getElementById('fiche-content').value   = fiche.content      || ''
    document.getElementById('fiche-code').value      = fiche.code_example || ''
    document.getElementById('fiche-exercices').value = fiche.exercices    || ''
  }
}

async function saveFiche() {
  const payload = {
    bloc:         document.getElementById('fiche-bloc').value    || null,
    topic:        document.getElementById('fiche-topic').value.trim(),
    title:        document.getElementById('fiche-title').value.trim(),
    summary:      document.getElementById('fiche-summary').value.trim(),
    objectifs:    document.getElementById('fiche-objectifs').value.trim(),
    content:      document.getElementById('fiche-content').value.trim(),
    code_example: document.getElementById('fiche-code').value.trim(),
    exercices:    document.getElementById('fiche-exercices').value.trim(),
  }
  if (!payload.title && !payload.summary && !payload.content) { toast('Remplis au moins un champ.'); return }

  const btn = document.getElementById('btn-fiche-save')
  btn.disabled = true; btn.textContent = 'Sauvegarde…'

  // Tolère un schéma pas encore migré : si une colonne optionnelle
  // n'existe pas encore (setup.sql non relancé), on réessaie sans elle.
  const OPTIONAL = ['objectifs', 'exercices']
  const tryWrite = async (body) => {
    if (currentFicheId) {
      return db.from('fiches').update(body).eq('id', currentFicheId).select().single()
    }
    return db.from('fiches').insert([body]).select().single()
  }

  try {
    let body = { ...payload }
    let { data, error } = await tryWrite(body)

    // Schéma pas migré : PostgREST renvoie "Could not find the 'X' column"
    // (code PGRST204) ou Postgres 42703. On retire la colonne fautive et on réessaie.
    let guard = 0
    while (error && guard++ < 5) {
      const msg = (error.message || '') + ' ' + (error.details || '')
      const missing = OPTIONAL.find(k => (k in body) && msg.includes(k))
      if (!missing) break
      delete body[missing]
      ;({ data, error } = await tryWrite(body))
    }
    if (error) throw error

    if (currentFicheId) {
      const idx = allFiches.findIndex(f => f.id === currentFicheId)
      if (idx !== -1) allFiches[idx] = { ...allFiches[idx], ...data }
    } else {
      allFiches.unshift(data)
    }
    const lost = OPTIONAL.filter(k => payload[k] && !(k in (data || {})))
    toast(lost.length
      ? 'Fiche sauvegardée ✓ (Objectifs/Exercices nécessitent setup.sql)'
      : 'Fiche sauvegardée ✓')
    setTimeout(() => { navigate('fiches') }, 700)
  } catch (err) {
    toast('Erreur : ' + (err.message || err))
    btn.disabled = false; btn.textContent = 'Sauvegarder'
  }
}

async function deleteFiche() {
  if (!currentFicheId) { navigate('fiches'); return }
  if (!confirm('Supprimer cette fiche ?')) return
  await db.from('fiches').delete().eq('id', currentFicheId)
  allFiches = allFiches.filter(f => f.id !== currentFicheId)
  navigate('fiches')
}

// ── Journal ──────────────────────────────────────────────
function renderJournal(filter = '') {
  const term     = filter.toLowerCase()
  const filtered = term
    ? allEntries.filter(e => [e.title, e.tasks, e.learned, e.notes, e.topic].some(f => (f || '').toLowerCase().includes(term)))
    : allEntries

  document.getElementById('empty-msg').classList.toggle('hidden', filtered.length > 0)
  const list = document.getElementById('day-list')
  list.innerHTML = ''
  filtered.forEach(entry => {
    const card = document.createElement('div')
    card.className = 'day-card'
    card.innerHTML = `
      <div class="day-mood">${entry.mood || '📄'}</div>
      <div class="day-info">
        <div class="day-title">${entry.title || '(Sans titre)'}</div>
        <div class="day-date">${fmt(entry.date)}${entry.topic ? ' · ' + entry.topic : ''}</div>
        ${blocBadge(entry.bloc)}
        ${entry.tasks ? `<div class="day-preview">${entry.tasks.split('\n')[0]}</div>` : ''}
      </div>
    `
    card.addEventListener('click', () => showJournalEdit(entry))
    list.appendChild(card)
  })
}

function showJournalEdit(entry) {
  showView('journal-edit')
  if (!entry) {
    currentJournalId = null
    document.getElementById('entry-date').value    = today()
    document.getElementById('entry-title').value   = ''
    document.getElementById('entry-bloc').value    = ''
    document.getElementById('entry-topic').value   = ''
    document.getElementById('entry-tasks').value   = ''
    document.getElementById('entry-learned').value = ''
    document.getElementById('entry-notes').value   = ''
    setMood('')
  } else {
    currentJournalId = entry.id
    document.getElementById('entry-date').value    = entry.date    || ''
    document.getElementById('entry-title').value   = entry.title   || ''
    document.getElementById('entry-bloc').value    = entry.bloc    || ''
    document.getElementById('entry-topic').value   = entry.topic   || ''
    document.getElementById('entry-tasks').value   = entry.tasks   || ''
    document.getElementById('entry-learned').value = entry.learned || ''
    document.getElementById('entry-notes').value   = entry.notes   || ''
    setMood(entry.mood || '')
  }
}

function setMood(mood) {
  selectedMood = mood
  document.querySelectorAll('.mood-btn').forEach(b => b.classList.toggle('selected', b.dataset.mood === mood))
}

async function saveJournal() {
  const payload = {
    date:    document.getElementById('entry-date').value    || null,
    title:   document.getElementById('entry-title').value.trim(),
    bloc:    document.getElementById('entry-bloc').value    || null,
    topic:   document.getElementById('entry-topic').value.trim(),
    tasks:   document.getElementById('entry-tasks').value.trim(),
    learned: document.getElementById('entry-learned').value.trim(),
    notes:   document.getElementById('entry-notes').value.trim(),
    mood:    selectedMood,
  }
  if (!payload.date && !payload.title && !payload.tasks) { toast('Remplis au moins un champ.'); return }

  const btn = document.getElementById('btn-save')
  btn.disabled = true; btn.textContent = 'Sauvegarde…'
  try {
    if (currentJournalId) {
      const { data, error } = await db.from('entries').update(payload).eq('id', currentJournalId).select().single()
      if (error) throw error
      const idx = allEntries.findIndex(e => e.id === currentJournalId)
      if (idx !== -1) allEntries[idx] = { ...allEntries[idx], ...data }
    } else {
      const { data, error } = await db.from('entries').insert([payload]).select().single()
      if (error) throw error
      allEntries.unshift(data)
      allEntries.sort((a, b) => (b.date || '').localeCompare(a.date || ''))
    }
    toast('Entrée sauvegardée ✓')
    setTimeout(() => { navigate('journal') }, 600)
  } catch (err) {
    toast('Erreur : ' + (err.message || err))
    btn.disabled = false; btn.textContent = 'Sauvegarder'
  }
}

async function deleteJournal() {
  if (!currentJournalId) { navigate('journal'); return }
  if (!confirm('Supprimer cette entrée ?')) return
  await db.from('entries').delete().eq('id', currentJournalId)
  allEntries = allEntries.filter(e => e.id !== currentJournalId)
  navigate('journal')
}

// ── Toast ────────────────────────────────────────────────
function toast(msg) {
  const el = document.getElementById('toast')
  el.textContent = msg; el.classList.add('show')
  clearTimeout(el._t); el._t = setTimeout(() => el.classList.remove('show'), 2800)
}

// ── Évaluation ───────────────────────────────────────────

function daysUntil(isoDate) {
  const diff = new Date(isoDate) - new Date(today())
  return Math.ceil(diff / 86400000)
}

function renderEval() {
  // Deadlines
  const deadlines = [
    { label: 'Sujet donné', date: 'Fin octobre 2026', iso: '2026-10-31', icon: '📋' },
    { label: 'Rapport papier', date: '30 novembre 2026', iso: '2026-11-30', icon: '📄' },
    { label: 'Présentation orale', date: '17 décembre 2026', iso: '2026-12-17', icon: '🎤' },
  ]
  document.getElementById('eval-deadlines').innerHTML = deadlines.map(d => {
    const days = daysUntil(d.iso)
    const cls  = days < 0 ? 'done' : days < 14 ? 'urgent' : ''
    const txt  = days < 0 ? 'Passé' : days === 0 ? "Aujourd'hui !" : `J-${days}`
    return `
      <div class="deadline-card ${cls}">
        <div class="deadline-label">${d.icon} ${d.label}</div>
        <div class="deadline-date">${d.date}</div>
        <div class="deadline-days">${txt}</div>
      </div>`
  }).join('')

  renderChecklist('eval-rapport-general',  EVAL_RAPPORT_GENERAL)
  renderChecklist('eval-rapport-seance',   EVAL_RAPPORT_SEANCE)
  renderChecklist('eval-presentation',     EVAL_PRESENTATION)

  // Sujet / trinôme (stored in topic_status as text via a hack — use a separate field)
  const evalMeta = topicStatuses['_eval_meta'] ? JSON.parse(topicStatuses['_eval_meta']) : {}
  document.getElementById('eval-sujet').value   = evalMeta.sujet   || ''
  document.getElementById('eval-trinome').value = evalMeta.trinome || ''
  document.getElementById('eval-notes').value   = evalMeta.notes   || ''
}

function renderChecklist(containerId, items) {
  const el = document.getElementById(containerId)
  el.innerHTML = items.map(item => {
    const checked = topicStatuses[item.id] === 'mastered'
    return `
      <div class="checklist-item ${checked ? 'checked' : ''}" data-eval="${item.id}">
        <div class="checklist-box">${checked ? '✓' : ''}</div>
        <span class="checklist-label">${item.label}</span>
      </div>`
  }).join('')

  el.querySelectorAll('.checklist-item').forEach(row => {
    row.addEventListener('click', async () => {
      const id      = row.dataset.eval
      const current = topicStatuses[id] || 'not_started'
      const next    = current === 'mastered' ? 'not_started' : 'mastered'
      await upsertTopicStatus(id, next)
      renderEval()
    })
  })
}

async function saveEvalMeta() {
  const meta = {
    sujet:   document.getElementById('eval-sujet').value.trim(),
    trinome: document.getElementById('eval-trinome').value.trim(),
    notes:   document.getElementById('eval-notes').value.trim(),
  }
  await upsertTopicStatus('_eval_meta', JSON.stringify(meta))
  toast('Sauvegardé ✓')
}

// ── Ressources ───────────────────────────────────────────

function renderRessources() {
  const makeCard = r => `
    <a class="resource-card" href="${r.url}" target="_blank" rel="noopener">
      <div class="resource-card-icon">${r.icon}</div>
      <div>
        <div class="resource-card-title">${r.title}</div>
        <div class="resource-card-desc">${r.desc}</div>
      </div>
      <div class="resource-card-arrow">↗</div>
    </a>`

  renderUploadedRessources()

  document.getElementById('res-mermet').innerHTML   = RESSOURCES_MERMET.map(makeCard).join('')
  document.getElementById('res-officiel').innerHTML = RESSOURCES_OFFICIEL.map(makeCard).join('')

  const now = today()
  document.getElementById('res-calendar').innerHTML = `<div class="calendar-list">` +
    CALENDAR.map(c => {
      const isPast    = c.isoStart < now
      const isCurrent = !isPast && daysUntil(c.isoStart) <= 4
      return `
        <div class="calendar-row">
          <div class="calendar-dot" style="background:${BLOCS[c.bloc].color}"></div>
          <div class="calendar-info">
            <div class="calendar-bloc">${c.label}</div>
            <div class="calendar-dates">${c.dates} — ${c.lieu}</div>
          </div>
          <span class="calendar-badge ${c.mode === 'présentiel' ? 'presentiel' : ''}">
            ${c.mode}${isCurrent ? ' 🔴 En cours' : isPast ? ' ✓' : ''}
          </span>
        </div>`
    }).join('') + `</div>`
}

function fileIcon(type, name) {
  const t = (type || '') + ' ' + (name || '')
  if (/pdf/i.test(t))                  return '📄'
  if (/audio|m4a|mp3|wav|ogg/i.test(t)) return '🎧'
  if (/video|mp4|mov|avi/i.test(t))     return '🎬'
  if (/image|png|jpe?g|gif|webp/i.test(t)) return '🖼️'
  if (/zip|rar|7z|sdocx/i.test(t))      return '🗜️'
  if (/word|docx?|odt|txt/i.test(t))    return '📝'
  return '📎'
}

function humanSize(bytes) {
  if (!bytes) return ''
  const u = ['o', 'Ko', 'Mo', 'Go']
  let i = 0, n = bytes
  while (n >= 1024 && i < u.length - 1) { n /= 1024; i++ }
  return n.toFixed(n < 10 && i > 0 ? 1 : 0) + ' ' + u[i]
}

function renderUploadedRessources() {
  const wrap  = document.getElementById('res-uploaded')
  const empty = document.getElementById('res-uploaded-empty')
  if (!wrap) return
  empty.classList.toggle('hidden', allRessources.length > 0)

  wrap.innerHTML = `<div class="calendar-list">` + allRessources.map(r => {
    const { data } = db.storage.from('ressources').getPublicUrl(r.file_path)
    const url = data.publicUrl
    const meta = [r.topic, humanSize(r.file_size)].filter(Boolean).join(' · ')
    return `
      <div class="calendar-row">
        <div class="calendar-dot" style="background:${r.bloc && BLOCS[r.bloc] ? BLOCS[r.bloc].color : 'var(--muted)'}"></div>
        <div class="calendar-info">
          <div class="calendar-bloc">${fileIcon(r.file_type, r.file_name)} ${r.title || r.file_name || '(Sans titre)'}</div>
          <div class="calendar-dates">${[r.bloc && BLOCS[r.bloc] ? BLOCS[r.bloc].short : '', meta].filter(Boolean).join(' — ')}${r.description ? '<br>' + r.description : ''}</div>
        </div>
        <a class="btn-secondary" style="margin:0;padding:6px 12px;font-size:.8rem" href="${url}" target="_blank" rel="noopener" download>⬇ Ouvrir</a>
        <button class="btn-danger" style="margin-left:8px;padding:6px 12px;font-size:.8rem" data-del-res="${r.id}">🗑</button>
      </div>`
  }).join('') + `</div>`

  wrap.querySelectorAll('[data-del-res]').forEach(b => {
    b.addEventListener('click', () => deleteRessource(b.dataset.delRes))
  })
}

async function uploadRessource() {
  const fileInput = document.getElementById('res-file')
  const file = fileInput.files[0]
  if (!file) { toast('Choisis un fichier d\'abord.'); return }

  const btn = document.getElementById('btn-res-upload')
  btn.disabled = true; btn.textContent = 'Envoi en cours…'
  try {
    const safe = file.name.replace(/[^a-zA-Z0-9._-]/g, '_')
    const path = `${Date.now()}_${safe}`
    const { error: upErr } = await db.storage.from('ressources').upload(path, file, {
      contentType: file.type || 'application/octet-stream', upsert: false,
    })
    if (upErr) throw upErr

    const row = {
      title:       document.getElementById('res-upload-title').value.trim() || file.name,
      bloc:        document.getElementById('res-upload-bloc').value || null,
      topic:       document.getElementById('res-upload-topic').value.trim(),
      description: document.getElementById('res-upload-desc').value.trim(),
      file_path:   path,
      file_name:   file.name,
      file_type:   file.type || '',
      file_size:   file.size,
    }
    const { data, error: insErr } = await db.from('ressources').insert([row]).select().single()
    if (insErr) throw insErr

    allRessources.unshift(data)
    document.getElementById('res-file').value = ''
    document.getElementById('res-upload-title').value = ''
    document.getElementById('res-upload-topic').value = ''
    document.getElementById('res-upload-desc').value = ''
    document.getElementById('res-file-info').textContent = ''
    toast('Ressource déposée ✓')
    renderUploadedRessources()
  } catch (err) {
    toast('Erreur : ' + (err.message || err))
  } finally {
    btn.disabled = false; btn.textContent = '⬆ Déposer la ressource'
  }
}

async function deleteRessource(id) {
  const r = allRessources.find(x => x.id === id)
  if (!r) return
  if (!confirm('Supprimer cette ressource ?')) return
  await db.storage.from('ressources').remove([r.file_path])
  await db.from('ressources').delete().eq('id', id)
  allRessources = allRessources.filter(x => x.id !== id)
  renderUploadedRessources()
}

// ── Event listeners ──────────────────────────────────────
document.querySelectorAll('.nav-item[data-view]').forEach(btn => {
  btn.addEventListener('click', () => navigate(btn.dataset.view))
})

document.getElementById('btn-res-upload').addEventListener('click', uploadRessource)
document.getElementById('res-file').addEventListener('change', e => {
  const f = e.target.files[0]
  const info = document.getElementById('res-file-info')
  info.textContent = f ? `${f.name} — ${humanSize(f.size)}` : ''
  const titleInput = document.getElementById('res-upload-title')
  if (f && !titleInput.value.trim()) titleInput.value = f.name.replace(/\.[^.]+$/, '')
})

document.getElementById('btn-new-day').addEventListener('click',   () => showJournalEdit(null))
document.getElementById('btn-back').addEventListener('click',      () => navigate('journal'))
document.getElementById('btn-save').addEventListener('click',      saveJournal)
document.getElementById('btn-delete').addEventListener('click',    deleteJournal)
document.getElementById('search').addEventListener('input',        e => renderJournal(e.target.value))
document.querySelectorAll('.mood-btn').forEach(btn => {
  btn.addEventListener('click', () => setMood(btn.dataset.mood))
})

document.getElementById('btn-eval-save').addEventListener('click', saveEvalMeta)

document.getElementById('btn-new-fiche').addEventListener('click',   () => showFicheEdit(null))
document.getElementById('btn-fiche-back').addEventListener('click',   () => navigate('fiches'))
document.getElementById('btn-read-back').addEventListener('click',    () => navigate('fiches'))
document.getElementById('btn-read-edit').addEventListener('click',    () => {
  const f = allFiches.find(x => x.id === currentFicheId)
  if (f) showFicheEdit(f)
})
document.getElementById('btn-fiche-save').addEventListener('click',   saveFiche)
document.getElementById('btn-fiche-delete').addEventListener('click', deleteFiche)

// ── Init ─────────────────────────────────────────────────
;(async () => {
  await loadAll()
  navigate('dashboard')
})()
