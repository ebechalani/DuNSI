# Insère les 5 fiches « Bases de données » (cours en ligne du 10 septembre 2026)
# dans la table Supabase `fiches`. À exécuter depuis une machine avec accès
# à supabase.co :  python _add_fiches_bdd.py
import sys, json, urllib.request, urllib.error
sys.stdout.reconfigure(encoding='utf-8')

URL = 'https://tnkwbcevfyslpetuuxlu.supabase.co'
ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRua3diY2V2ZnlzbHBldHV1eGx1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkxOTkzMjMsImV4cCI6MjA5NDc3NTMyM30.bMQJwMVioi6OSYWYqXFEwGA89AompDtnr-eDg6movWw'

TOPIC = 'Bases de données (SQL)'
BLOC = 'bloc4'

FICHES = [
{
  'title': 'Bases de données — le modèle relationnel',
  'bloc': BLOC, 'topic': TOPIC, 'created_at': '2026-09-10T09:00:00+00:00',
  'summary': "Pourquoi une base de données plutôt que des fichiers, relation (table), attribut, domaine, tuple, schéma relationnel, clé primaire, clé étrangère et contraintes d'intégrité.",
  'objectifs': "Comprendre les limites des fichiers plats (redondance, incohérence, accès concurrent). Définir relation, attribut, domaine, tuple et schéma. Identifier une clé primaire et une clé étrangère. Énoncer les trois contraintes d'intégrité.",
  'content': """Cours du **10 septembre** (Bloc 4, en ligne).

1) POURQUOI UNE BASE DE DONNÉES ?
Stocker des données dans des fichiers (CSV, texte) montre vite ses limites.
La redondance : la même information est copiée à plusieurs endroits.
L'incohérence : une mise à jour faite à un endroit mais pas à l'autre.
L'accès concurrent : deux programmes qui écrivent en même temps se marchent dessus.
La sécurité : pas de contrôle fin de qui peut lire ou modifier quoi.
Une base de données confie tout cela à un logiciel spécialisé : le SGBD (système de gestion de bases de données).

2) LA RELATION (TABLE)
Dans le modèle relationnel (E. F. Codd, 1970), les données sont rangées dans des relations, qu'on se représente comme des tables.

| Terme théorique | Vue « table » | Exemple |
|---|---|---|
| Relation | Table | eleves |
| Attribut | Colonne | nom, classe |
| Domaine | Type d'une colonne | TEXT, INTEGER |
| Tuple (n-uplet) | Ligne / enregistrement | (12, 'Nour', '1G3') |

Une relation n'a pas de lignes en double et l'ordre des lignes n'a pas de signification.

3) SCHÉMA RELATIONNEL
Le schéma d'une relation donne son nom, ses attributs et leurs domaines. La clé primaire est soulignée par convention.
```
eleves(id: INT, nom: TEXT, prenom: TEXT, classe: TEXT)
notes(id: INT, id_eleve: INT, matiere: TEXT, note: REAL)
```
Ici `id` est la clé primaire de chaque table, et `notes.id_eleve` est une clé étrangère qui référence `eleves.id`.

4) CLÉS
Clé primaire (PRIMARY KEY) : attribut (ou groupe d'attributs) qui identifie de façon UNIQUE chaque tuple. Jamais NULL, jamais deux fois la même valeur.
Clé étrangère (FOREIGN KEY) : attribut qui contient la clé primaire d'une AUTRE table, pour relier les deux. C'est le mécanisme qui remplace la duplication des données.

5) CONTRAINTES D'INTÉGRITÉ
Contrainte de domaine : chaque valeur respecte le type de sa colonne (une note est un nombre).
Contrainte d'entité : la clé primaire est unique et non nulle.
Contrainte de référence : toute clé étrangère pointe vers un tuple qui existe (pas de note pour un élève supprimé).
Le SGBD REFUSE toute opération qui violerait une contrainte : c'est lui le gardien de la cohérence.""",
  'exercices': """1. Donner le schéma relationnel d'une bibliothèque : livres, adhérents, emprunts (avec clés primaires et étrangères).
2. Dans la table notes(id, id_eleve, matiere, note), pourquoi id_eleve seul ne peut-il pas être clé primaire ?
3. Citer une opération refusée par la contrainte de référence sur le schéma eleves/notes.
4. Quelle redondance apparaîtrait si on stockait le nom de l'élève directement dans la table notes ?""",
},
{
  'title': 'SQL — interroger une base (SELECT)',
  'bloc': BLOC, 'topic': TOPIC, 'created_at': '2026-09-10T09:10:00+00:00',
  'summary': "La requête SELECT : projection sur des colonnes, filtre WHERE (comparaisons, AND/OR, LIKE, IN, BETWEEN), tri ORDER BY, suppression des doublons DISTINCT et limitation LIMIT.",
  'objectifs': "Écrire une requête SELECT complète : choisir les colonnes, filtrer les lignes avec WHERE, trier avec ORDER BY, dédupliquer avec DISTINCT, limiter avec LIMIT.",
  'content': """1) SELECT … FROM : LA PROJECTION
On choisit les colonnes (projection) d'une table. `*` signifie « toutes les colonnes ».
```
SELECT nom, classe FROM eleves;
SELECT * FROM eleves;
```

2) WHERE : LE FILTRE
WHERE garde uniquement les lignes qui satisfont la condition. Comparateurs : =, <>, <, <=, >, >=.
```
SELECT nom FROM eleves WHERE classe = '1G3';
SELECT * FROM notes WHERE note >= 15;
```
Les conditions se combinent avec AND, OR, NOT.
```
SELECT nom FROM eleves
WHERE classe = '1G3' AND prenom <> 'Nour';
```

3) LIKE, IN, BETWEEN
LIKE compare à un motif : % remplace une suite quelconque de caractères, _ un seul.
```
SELECT nom FROM eleves WHERE nom LIKE 'Mar%';   -- Martin, Marchand…
SELECT * FROM notes WHERE matiere IN ('NSI', 'Maths');
SELECT * FROM notes WHERE note BETWEEN 10 AND 15;
```

4) ORDER BY : LE TRI
ASC (croissant, défaut) ou DESC (décroissant). On peut trier sur plusieurs colonnes.
```
SELECT nom, classe FROM eleves
ORDER BY classe ASC, nom ASC;
```

5) DISTINCT ET LIMIT
DISTINCT supprime les doublons du résultat ; LIMIT tronque le nombre de lignes.
```
SELECT DISTINCT classe FROM eleves;
SELECT nom FROM eleves ORDER BY nom LIMIT 10;
```

6) ORDRE D'ÉCRITURE D'UNE REQUÊTE
Toujours dans cet ordre : SELECT … FROM … WHERE … ORDER BY … LIMIT …
Une requête SELECT ne modifie JAMAIS les données : elle produit une nouvelle table de résultat.""",
  'exercices': """1. Lister les noms des élèves de la classe '1G1' triés par ordre alphabétique.
2. Afficher les matières distinctes présentes dans la table notes.
3. Trouver les notes de NSI strictement supérieures à 12, la meilleure d'abord.
4. Lister les élèves dont le nom commence par 'D' ou finit par 'a'.""",
},
{
  'title': 'SQL — jointures et agrégation',
  'bloc': BLOC, 'topic': TOPIC, 'created_at': '2026-09-10T09:20:00+00:00',
  'summary': "Croiser deux tables avec JOIN … ON grâce à la clé étrangère, différence INNER/LEFT JOIN, fonctions d'agrégation (COUNT, SUM, AVG, MIN, MAX), regroupement GROUP BY et filtre de groupes HAVING.",
  'objectifs': "Écrire une jointure entre deux tables reliées par une clé étrangère. Utiliser les fonctions d'agrégation. Regrouper avec GROUP BY et filtrer les groupes avec HAVING (et distinguer HAVING de WHERE).",
  'content': """1) LA JOINTURE : CROISER DEUX TABLES
Les données sont réparties dans plusieurs tables reliées par des clés étrangères. La jointure les recolle : JOIN … ON précise la condition de correspondance.
```
SELECT eleves.nom, notes.matiere, notes.note
FROM notes
JOIN eleves ON notes.id_eleve = eleves.id;
```
On peut renommer les tables avec des alias pour alléger :
```
SELECT e.nom, n.note
FROM notes AS n
JOIN eleves AS e ON n.id_eleve = e.id
WHERE n.matiere = 'NSI';
```

2) INNER JOIN vs LEFT JOIN
JOIN (= INNER JOIN) : garde uniquement les lignes qui ont une correspondance des DEUX côtés.
LEFT JOIN : garde toutes les lignes de la table de gauche, avec NULL quand il n'y a pas de correspondance (ex. : les élèves sans aucune note).
```
SELECT e.nom, n.note
FROM eleves AS e
LEFT JOIN notes AS n ON n.id_eleve = e.id;
```

3) FONCTIONS D'AGRÉGATION
Elles résument une colonne en UNE valeur : COUNT (nombre), SUM (somme), AVG (moyenne), MIN, MAX.
```
SELECT COUNT(*) FROM eleves;
SELECT AVG(note) FROM notes WHERE matiere = 'NSI';
```

4) GROUP BY : UN RÉSUMÉ PAR GROUPE
GROUP BY calcule l'agrégat pour chaque groupe de lignes (ici : une moyenne par élève).
```
SELECT e.nom, AVG(n.note) AS moyenne
FROM notes AS n
JOIN eleves AS e ON n.id_eleve = e.id
GROUP BY e.nom
ORDER BY moyenne DESC;
```

5) HAVING : FILTRER LES GROUPES
WHERE filtre les LIGNES avant regroupement ; HAVING filtre les GROUPES après agrégation.
```
SELECT matiere, AVG(note) AS moyenne
FROM notes
GROUP BY matiere
HAVING AVG(note) >= 12;
```""",
  'exercices': """1. Afficher chaque note avec le nom et la classe de l'élève (jointure notes/eleves).
2. Compter le nombre de notes par matière.
3. Donner la moyenne par classe en NSI, uniquement pour les classes dont la moyenne dépasse 11.
4. Avec un LEFT JOIN, lister les élèves qui n'ont AUCUNE note (indice : WHERE n.id IS NULL).""",
},
{
  'title': 'SQL — créer et modifier une base',
  'bloc': BLOC, 'topic': TOPIC, 'created_at': '2026-09-10T09:30:00+00:00',
  'summary': "Le langage de définition et de manipulation : CREATE TABLE avec types et contraintes (PRIMARY KEY, FOREIGN KEY, NOT NULL, UNIQUE), INSERT INTO, UPDATE … SET … WHERE et DELETE FROM — et le danger d'un UPDATE/DELETE sans WHERE.",
  'objectifs': "Créer une table avec ses contraintes, insérer des tuples, mettre à jour et supprimer avec un WHERE correct. Comprendre que le SGBD fait respecter les contraintes à chaque écriture.",
  'content': """1) CREATE TABLE : DÉFINIR LE SCHÉMA
On déclare chaque colonne avec son type (SQLite : INTEGER, REAL, TEXT) et ses contraintes.
```
CREATE TABLE eleves (
  id     INTEGER PRIMARY KEY,
  nom    TEXT NOT NULL,
  prenom TEXT NOT NULL,
  classe TEXT
);

CREATE TABLE notes (
  id       INTEGER PRIMARY KEY,
  id_eleve INTEGER NOT NULL,
  matiere  TEXT NOT NULL,
  note     REAL CHECK (note >= 0 AND note <= 20),
  FOREIGN KEY (id_eleve) REFERENCES eleves(id)
);
```
NOT NULL : valeur obligatoire. UNIQUE : pas deux fois la même valeur. CHECK : condition à respecter. FOREIGN KEY : contrainte de référence.

2) INSERT INTO : AJOUTER DES TUPLES
On nomme les colonnes puis on donne les valeurs (dans le même ordre).
```
INSERT INTO eleves (id, nom, prenom, classe)
VALUES (1, 'Diallo', 'Awa', '1G3');

INSERT INTO notes (id_eleve, matiere, note)
VALUES (1, 'NSI', 17.5);
```
Si une contrainte est violée (id en double, note de 25, id_eleve inexistant), le SGBD REFUSE l'insertion.

3) UPDATE : MODIFIER
UPDATE … SET change les colonnes des lignes sélectionnées par WHERE.
```
UPDATE eleves SET classe = 'TG2' WHERE id = 1;
```
DANGER : sans WHERE, TOUTES les lignes sont modifiées.

4) DELETE : SUPPRIMER
```
DELETE FROM notes WHERE note < 5;
```
Même danger : `DELETE FROM notes;` vide la table entière. Réflexe : tester d'abord son WHERE avec un SELECT.
La contrainte de référence empêche de supprimer un élève qui a encore des notes (il faut d'abord supprimer ses notes).

5) LES 4 OPÉRATIONS « CRUD »

| Opération | SQL | Rôle |
|---|---|---|
| Create | INSERT | ajouter |
| Read | SELECT | lire |
| Update | UPDATE | modifier |
| Delete | DELETE | supprimer |""",
  'exercices': """1. Écrire le CREATE TABLE d'une table livres(id, titre, auteur, annee) avec les bonnes contraintes.
2. Insérer deux livres, puis corriger l'année de l'un d'eux avec UPDATE.
3. Pourquoi `DELETE FROM eleves WHERE id = 3;` peut-il être refusé par le SGBD ?
4. Quel SELECT écririez-vous pour vérifier un `DELETE FROM notes WHERE note < 5;` AVANT de l'exécuter ?""",
},
{
  'title': 'SGBD — transactions, contraintes et injection SQL',
  'bloc': BLOC, 'topic': TOPIC, 'created_at': '2026-09-10T09:40:00+00:00',
  'summary': "Le rôle du SGBD (SQLite, PostgreSQL, MySQL), l'architecture client/serveur, les transactions et propriétés ACID (BEGIN/COMMIT/ROLLBACK), et la faille d'injection SQL avec sa parade : les requêtes paramétrées.",
  'objectifs': "Situer le SGBD dans l'architecture client/serveur. Expliquer ce qu'apporte une transaction (ACID). Reconnaître une injection SQL et écrire la version paramétrée sûre en Python/sqlite3.",
  'content': """1) LE SGBD
Le système de gestion de bases de données est le logiciel qui stocke les données, exécute les requêtes SQL et fait respecter les contraintes.
SQLite : un simple fichier, embarqué dans l'application (utilisé en NSI, dans les smartphones, les navigateurs).
PostgreSQL, MySQL/MariaDB : des serveurs — plusieurs clients (applications web…) s'y connectent par le réseau ; le SGBD gère les accès concurrents.

2) TRANSACTIONS ET PROPRIÉTÉS ACID
Une transaction regroupe plusieurs opérations en un TOUT indivisible : soit tout est appliqué (COMMIT), soit rien (ROLLBACK). Exemple type : un virement (débiter un compte ET créditer l'autre).
```
BEGIN;
UPDATE comptes SET solde = solde - 100 WHERE id = 1;
UPDATE comptes SET solde = solde + 100 WHERE id = 2;
COMMIT;
```
Atomicité : tout ou rien. Cohérence : les contraintes restent vraies. Isolation : les transactions simultanées ne se mélangent pas. Durabilité : une fois validé, c'est écrit même en cas de panne.

3) L'INJECTION SQL : LA FAILLE
Construire une requête en COLLANT une saisie utilisateur dans la chaîne SQL est dangereux :
```
# CODE VULNÉRABLE — ne jamais faire
nom = input("Nom : ")
requete = "SELECT * FROM eleves WHERE nom = '" + nom + "'"
curseur.execute(requete)
```
Si l'utilisateur tape `x' OR '1'='1`, la requête devient
`SELECT * FROM eleves WHERE nom = 'x' OR '1'='1'` : la condition est toujours vraie, toute la table fuit. Avec un `'; DROP TABLE eleves; --` c'est la destruction de la table.

4) LA PARADE : REQUÊTES PARAMÉTRÉES
On laisse le SGBD insérer les valeurs à la place des `?` : la saisie est traitée comme une VALEUR, jamais comme du code SQL.
```
import sqlite3
conn = sqlite3.connect('lycee.db')
cur = conn.cursor()

nom = input("Nom : ")
cur.execute("SELECT * FROM eleves WHERE nom = ?", (nom,))
print(cur.fetchall())

cur.execute("INSERT INTO notes (id_eleve, matiere, note) VALUES (?, ?, ?)",
            (1, 'NSI', 16.0))
conn.commit()
conn.close()
```
Règle absolue : JAMAIS de concaténation de saisie utilisateur dans du SQL — toujours des paramètres.""",
  'exercices': """1. Pourquoi un virement bancaire doit-il être une transaction ? Que se passe-t-il si la 2ᵉ requête échoue sans transaction ?
2. Que devient la requête vulnérable si l'utilisateur saisit : anonyme' OR '1'='1 ?
3. Réécrire en version paramétrée : "DELETE FROM notes WHERE id = " + str(num).
4. Citer deux différences entre SQLite et PostgreSQL.""",
},
]

def main():
    rows = []
    for f in FICHES:
        row = dict(f)
        row['code_example'] = None   # le code est intercalé dans content (blocs ```)
        rows.append(row)
    req = urllib.request.Request(
        f"{URL}/rest/v1/fiches",
        data=json.dumps(rows).encode(),
        method='POST',
        headers={'apikey': ANON, 'Authorization': 'Bearer ' + ANON,
                 'Content-Type': 'application/json', 'Prefer': 'return=minimal'})
    try:
        with urllib.request.urlopen(req) as r:
            print("INSERT", r.status, f"— {len(rows)} fiches BDD ajoutées")
    except urllib.error.HTTPError as e:
        print("ERR", e.code, e.read().decode())

if __name__ == '__main__':
    main()
