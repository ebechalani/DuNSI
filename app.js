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
// Documents produits pour l'évaluation : copies locales servies depuis ressources/evaluation/
const EVAL_DOCS = [
  { icon: '📄', title: 'Rapport papier — version 2 (PDF, 19 pages)', desc: 'Approche générale, séance 2 détaillée (RIP et OSPF), exercices corrigés, extrait de devoir, annexe de l\'oral.', url: 'ressources/evaluation/Protocoles_de_routage_NSI_Terminale_v2.pdf' },
  { icon: '🎤', title: 'Oral — fiche de préparation (PDF, 3 pages)', desc: 'Repères de temps des cinq temps de 5 minutes, valeurs à connaître, questions probables du jury, liste de vérification.', url: 'ressources/evaluation/Oral_fiche_de_preparation.pdf' },
]

const RESSOURCES_MERMET = [
  { icon: '🧠', title: "Bloc 1 — Didactique de l'informatique", desc: 'Pensée informatique, approche instrumentale, didactique', url: 'https://mermet.users.greyc.fr/Enseignement/EnseignementInformatiqueLycee/Havre/Didactique/index.html' },
  { icon: '🌐', title: 'Bloc 1 — Web côté client (JavaScript)', desc: 'HTML, CSS, JavaScript, événements, interfaces web',        url: 'https://mermet.users.greyc.fr/Enseignement/EnseignementInformatiqueLycee/Havre/Javascript/index.html' },
  { icon: '⚙️', title: 'Bloc 2 — Algorithmique',                 desc: 'Algorithmes classiques, correction, complexité',           url: 'https://mermet.users.greyc.fr/Enseignement/EnseignementInformatiqueLycee/Havre/Algorithmique/index.html' },
  { icon: '🗄️', title: 'Bloc 4 — Programmation avancée et BDD', desc: 'SQL, paradigmes, structures de données',                   url: 'https://mermet.users.greyc.fr/Enseignement/EnseignementInformatiqueLycee/Havre/Bloc4/index.html' },
]

// ── Ordre du jour des séances en ligne (distanciel) ──────
// Les URLs relatives sont résolues contre `base`; celles commençant par http restent telles quelles.
const SESSIONS_ENLIGNE = [
  {
    id: 'mermet-didactique-2026-06-22',
    iso: '2026-06-22', dateLabel: '22 juin 2026', bloc: 'bloc1',
    titre: "Culture & didactique de l'informatique",
    formateur: 'Bruno Mermet', mode: 'distanciel', duree: '3 h',
    base: 'https://mermet.users.greyc.fr/Enseignement/EnseignementInformatiqueLycee/Havre/Didactique/',
    index: 'index.html',
    parties: [
      { titre: 'I. Culture informatique', duree: '1 h', items: [
        { t: "Histoire de l'informatique",                 f: "Histoire de l'informatique — dates clés",            u: 'histoireInformatique.html' },
        { t: 'Typologie des langages de programmation',     f: 'Typologie des langages de programmation',            u: 'typologieLangages.html' },
        { t: 'Projets informatiques : caractéristiques',    f: 'Les projets informatiques et le génie logiciel',     u: 'projetInformatique.html' },
        { t: 'Psychologie du développeur',                  f: 'Psychologie du développeur',                         u: 'psychologieDeveloppeur.html' },
        { t: 'Les études pour devenir informaticien',       f: 'Les études en informatique (Normandie)',             u: 'etudes.html' },
      ]},
      { titre: "II. Didactique de l'informatique", duree: '1 h', groupes: [
        { sous: 'Points de repère', items: [
          { t: 'Introduction à la didactique',                       f: "Introduction à la didactique de l'informatique",        u: 'didactique.html' },
          { t: 'Computational Thinking (Dagienė & Jevsikova)',       f: 'La pensée informatique (Computational Thinking)',       u: 'computationalThinking.html' },
          { t: 'Compétences ADAGE',                                  f: 'Les compétences ADAGE',                                 u: 'adage.html' },
          { t: "Résumé du livre « Enseigner l'informatique »",        f: "Enseigner l'informatique (résumé du livre)",            u: 'resumeLivreEnseignerInformatique.html' },
        ]},
        { sous: 'En Première', items: [
          { t: 'Programme officiel de Première (PDF)',               u: 'https://cache.media.education.gouv.fr/file/SP1-MEN-22-1-2019/26/8/spe633_annexe_1063268.pdf' },
          { t: 'Organiser le cours de NSI en Première',              f: 'Organiser le cours de NSI en Première',                 u: 'organisationPremiere.html' },
          { t: 'Évaluation de NSI en Première (BO)',                 u: 'https://www.education.gouv.fr/pid285/bulletin_officiel.html?cid_bo=141199' },
        ]},
        { sous: 'En Terminale', items: [
          { t: 'Grandes lignes du programme de Terminale',          f: 'Programme de Terminale NSI (grandes lignes)',           u: 'resumeProgrammeTerminale.html' },
          { t: 'Quelques trucs bien pratiques',                     f: 'Trucs pratiques : livrer un programme en boîte noire (.pyc)', u: 'trucs.html' },
        ]},
      ]},
      { titre: 'III. Travail pratique & conclusion', duree: '1 h', items: [
        { t: 'Brainstorming : idées de projet',  f: 'Idées de projets NSI (brainstorming)',  u: 'ideesProjets.html' },
        { t: 'Rendu pour la fin de la formation', f: 'Rendu de la formation (cours à préparer)', u: 'rendu.html' },
      ]},
    ],
  },
  {
    id: 'representation-2026-06-22',
    iso: '2026-06-22', dateLabel: '22 juin 2026 (après-midi)', bloc: 'bloc1',
    titre: 'Représentation des données',
    formateur: 'Support DIU (forge éducation)', mode: 'distanciel', duree: '~3 h',
    base: 'https://diu-representations-0abb3a.forge.apps.education.fr/',
    index: 'index.html',
    parties: [
      { titre: 'Cours', items: [
        { t: 'Numération et bases',                    f: 'Numération et bases',                                 u: 'representation-nombres.html' },
        { t: 'Entiers relatifs et complément à deux',  f: 'Entiers relatifs et complément à deux',               u: 'representation-nombres.html#entiers-relatifs' },
        { t: 'Nombres à virgule (IEEE 754)',           f: 'Nombres à virgule (virgule fixe et IEEE 754)',        u: 'representation-nombres.html#nombres-à-virgule-décimaux' },
        { t: 'Représentation des caractères',          f: 'Représentation des caractères (ASCII, Unicode, UTF-8)', u: 'representation-caracteres.html' },
      ]},
      { titre: 'Présentations (diapositives)', items: [
        { t: 'Diapos — Représentation des nombres (PDF)',    u: 'prez-representation-nombres.prez.pdf' },
        { t: 'Diapos — Représentation des caractères (PDF)', u: 'prez-representation-caracteres.prez.pdf' },
      ]},
      { titre: 'Exercices', items: [
        { t: 'Exercices interactifs (console Slate)',  u: 'https://console.slate.educ.space' },
      ]},
    ],
  },
  {
    id: 'htmlcss-2026-06-23',
    iso: '2026-06-23', dateLabel: '23 juin 2026 (matin)', bloc: 'bloc1',
    titre: 'Web : HTML, CSS et client/serveur',
    formateur: 'J.-M. Barbier (DIU EIL)', mode: 'distanciel', duree: '~3 h',
    base: 'https://diu-htmlcss-1858e2.forge.apps.education.fr/',
    index: 'index.html',
    parties: [
      { titre: 'Cours', items: [
        { t: 'HTML : structure et balises',            f: 'HTML : structure et balises',                    u: 'ressources/web/book-html.pdf' },
        { t: 'Le DOM (Document Object Model)',         f: 'Le DOM (Document Object Model)',                  u: 'ressources/web/book-html.pdf' },
        { t: 'CSS : sélecteurs, cascade, mise en page', f: 'CSS : sélecteurs, cascade et mise en page',     u: 'ressources/web/book-css.pdf' },
        { t: 'Client / serveur : HTTP, DNS, REST',     f: 'Client / serveur : HTTP, DNS et REST',           u: 'ressources/web/book-clientserveur.pdf' },
      ]},
      { titre: 'Supports PDF (livres complets, copie locale)', items: [
        { t: 'Livre HTML (PDF)',            u: 'ressources/web/book-html.pdf' },
        { t: 'Livre CSS (PDF)',             u: 'ressources/web/book-css.pdf' },
        { t: 'Livre Client / serveur (PDF)', u: 'ressources/web/book-clientserveur.pdf' },
      ]},
    ],
  },
  {
    id: 'listes-tuples-dicts-2026-06-23',
    iso: '2026-06-23', dateLabel: '23 juin 2026 (après-midi, 13h30 CEST)', bloc: 'bloc1',
    titre: 'Listes, n-uplets et dictionnaires (Python)',
    formateur: 'Y. Pigné (DIU EIL)', mode: 'distanciel', duree: '2h30 (séance 1)',
    base: 'https://git.litislab.fr/ypigne/2026-EIL-listes-tuples-dictionnaires/',
    index: '',
    parties: [
      { titre: 'Séance en direct', items: [
        { t: 'Rejoindre la visio (13h30 CEST / 11h30 UTC)', u: 'https://visio.numerique.gouv.fr/diu-2026-eil' },
      ]},
      { titre: 'Cours & TP (notebooks)', items: [
        { t: 'Listes et compréhensions', f: 'Listes et compréhensions (Python)', u: 'https://notebook.basthon.fr/?from=https%3A%2F%2Fgit.litislab.fr%2Fypigne%2F2026-EIL-listes-tuples-dictionnaires%2F-%2Fraw%2Fmain%2Fsession-1-listes-tuples%2Fcours.ipynb' },
        { t: 'Tuples, piles et files',   f: 'Tuples, piles et files (Python)',   u: 'https://notebook.basthon.fr/?from=https%3A%2F%2Fgit.litislab.fr%2Fypigne%2F2026-EIL-listes-tuples-dictionnaires%2F-%2Fraw%2Fmain%2Fsession-1-listes-tuples%2Fcours.ipynb' },
        { t: 'TP séance 1 — listes & tuples (notebook)', u: 'https://notebook.basthon.fr/?from=https%3A%2F%2Fgit.litislab.fr%2Fypigne%2F2026-EIL-listes-tuples-dictionnaires%2F-%2Fraw%2Fmain%2Fsession-1-listes-tuples%2Ftp.ipynb' },
        { t: 'Dictionnaires et ensembles', f: 'Dictionnaires et ensembles (Python)', u: 'https://notebook.basthon.fr/?from=https%3A%2F%2Fgit.litislab.fr%2Fypigne%2F2026-EIL-listes-tuples-dictionnaires%2F-%2Fraw%2Fmain%2Fsession-2-dictionnaires%2Fcours.ipynb' },
        { t: 'TP séance 2 — dictionnaires (notebook)', u: 'https://notebook.basthon.fr/?from=https%3A%2F%2Fgit.litislab.fr%2Fypigne%2F2026-EIL-listes-tuples-dictionnaires%2F-%2Fraw%2Fmain%2Fsession-2-dictionnaires%2Ftp.ipynb' },
      ]},
      { titre: 'Pour démarrer', items: [
        { t: 'Notebook de test (à exécuter avant le cours)', u: 'https://notebook.basthon.fr/?from=https%3A%2F%2Fgit.litislab.fr%2Fypigne%2F2026-EIL-listes-tuples-dictionnaires%2F-%2Fraw%2Fmain%2Fnotebook-de-test.ipynb' },
        { t: 'Dépôt complet (tous les notebooks)', u: 'https://git.litislab.fr/ypigne/2026-EIL-listes-tuples-dictionnaires' },
        { t: 'Fiches élèves (énoncés + corrigés)', u: 'https://git.litislab.fr/ypigne/2026-EIL-listes-tuples-dictionnaires/-/tree/main/eleves' },
        { t: 'Ouvrir un notebook : Basthon (sans installation)', u: 'https://notebook.basthon.fr' },
      ]},
    ],
  },
  {
    id: 'sql-2026-10-15',
    iso: '2026-10-15', dateLabel: '15 octobre 2026 (matin)', bloc: 'bloc4',
    titre: 'SQL : jointures sur plusieurs tables et contraintes d\'intégrité',
    formateur: 'Bruno Mermet (Bloc 4, chapitre 1)', mode: 'distanciel', duree: '~3 h',
    base: 'https://bases-de-donnees-26b46e.gitlab.io/',
    index: 'sql.html',
    parties: [
      { titre: 'Séance en direct', items: [
        { t: 'Rejoindre la visio', u: 'https://visio.numerique.gouv.fr/diu-2026-eil' },
      ]},
      { titre: 'La séance du jour', items: [
        { t: 'Jointures sur plusieurs tables, USING, contraintes en pratique', f: 'SQL — jointures sur plusieurs tables et contraintes d\'intégrité en pratique', u: 'sql.html' },
        { t: 'Rappel : LMD et LDD (INSERT, UPDATE, DELETE, CREATE TABLE)',     f: 'SQL — manipuler et décrire (LMD/LDD) : INSERT, DELETE, UPDATE, CREATE TABLE',  u: 'sql.html' },
      ]},
      { titre: 'Fichiers du TP « ludothèque » (copie locale)', items: [
        { t: 'Les 4 scripts Python de création et de lecture', u: 'ressources/bdd/Ludotheque/lectureLudotheque.py' },
        { t: 'Support complet du chapitre (copie locale)',     u: 'ressources/bdd/indexBD.html' },
      ]},
    ],
  },
  {
    id: 'structures-lineaires-2026-10-15',
    iso: '2026-10-15', dateLabel: '15 octobre 2026 (après-midi)', bloc: 'bloc4',
    titre: 'Structures linéaires — piles, files, listes chaînées',
    formateur: 'FDIU (DU Normandie)', mode: 'distanciel', duree: '~3 h',
    base: '',
    index: 'https://notebook.basthon.fr/?from=https%3A%2F%2Febechalani.github.io%2FDuNSI%2Fressources%2Fpython%2FFDIU-Piles-Files-2026.ipynb',
    parties: [
      { titre: 'Pour commencer : fin de Karatsuba (suite du 8 octobre)', items: [
        { t: 'Cours : Karatsuba, multiplier de grands nombres', f: 'Karatsuba — multiplier de grands nombres en diviser pour régner' },
        { t: 'Notebook Karatsuba (Basthon) — TP corrigé dans l\'onglet 🧪 TP', u: 'basthon:ressources/dpr/FDIU_diviser_pour_regner_2_karatsuba.ipynb' },
      ]},
      { titre: 'Piles et files (LIFO / FIFO)', items: [
        { t: 'Cours : types abstraits, piles, files, NPI, round-robin', f: 'Piles et files : LIFO, FIFO et applications',
          u: 'https://notebook.basthon.fr/?from=https%3A%2F%2Febechalani.github.io%2FDuNSI%2Fressources%2Fpython%2FFDIU-Piles-Files-2026.ipynb' },
        { t: 'Notebook à compléter (Basthon, en ligne)', u: 'https://notebook.basthon.fr/?from=https%3A%2F%2Febechalani.github.io%2FDuNSI%2Fressources%2Fpython%2FFDIU-Piles-Files-2026.ipynb' },
        { t: 'Télécharger le notebook (.ipynb, copie locale)', u: 'ressources/python/FDIU-Piles-Files-2026.ipynb' },
      ]},
      { titre: 'Listes chaînées', items: [
        { t: 'Cours : cellules, pointeurs, double chaînage, récursif', f: 'Les listes chaînées',
          u: 'https://notebook.basthon.fr/?from=https%3A%2F%2Febechalani.github.io%2FDuNSI%2Fressources%2Fpython%2FFDIU-Listes-chainees.ipynb' },
        { t: 'Notebook à compléter (Basthon, en ligne)', u: 'https://notebook.basthon.fr/?from=https%3A%2F%2Febechalani.github.io%2FDuNSI%2Fressources%2Fpython%2FFDIU-Listes-chainees.ipynb' },
        { t: 'Télécharger le notebook (.ipynb, copie locale)', u: 'ressources/python/FDIU-Listes-chainees.ipynb' },
      ]},
    ],
  },
  {
    id: 'bdd-2026-09-10',
    iso: '2026-09-10', dateLabel: '10 septembre 2026', bloc: 'bloc4',
    titre: 'Bases de données relationnelles et SQL',
    formateur: 'Bruno Mermet (Bloc 4, chapitre 1)', mode: 'distanciel', duree: '~3 h',
    base: 'https://bases-de-donnees-26b46e.gitlab.io/',
    index: 'indexBD.html',
    parties: [
      { titre: 'Séance en direct', items: [
        { t: 'Rejoindre la visio', u: 'https://visio.numerique.gouv.fr/diu-2026-eil' },
      ]},
      { titre: "I. Structuration de l'information", items: [
        { t: 'A. Bases de données relationnelles (DF, clés, formes normales)', f: 'Bases de données relationnelles — DF, clés et formes normales',        u: 'bdr.html' },
        { t: 'B. Modèle conceptuel (diagramme de classes → relationnel)',     f: 'Modèle conceptuel — diagramme de classes et passage au relationnel',  u: 'modeleConceptuel.html' },
        { t: 'C. Contraintes de référence',                                    f: 'Contraintes de référence (clés étrangères)',                          u: 'contraintesReference.html' },
        { t: 'D. Notion de SGBD',                                              f: 'Notion de SGBD (et pourquoi SQLite)',                                 u: 'sgbd.html' },
      ]},
      { titre: "II. Langages de données et d'interrogation", items: [
        { t: 'A. SQL — interrogation (LID) : projection, restriction, jointure', f: 'SQL — interroger une base (LID) : projection, restriction, jointure',                 u: 'sql.html' },
        { t: 'A. SQL — manipulation et description (LMD / LDD)',                f: 'SQL — manipuler et décrire (LMD/LDD) : INSERT, DELETE, UPDATE, CREATE TABLE',       u: 'sql.html' },
        { t: 'B. Interagir avec une base depuis Python (sqlite3)',              f: 'SQL et Python — le module sqlite3',                                                  u: 'sqlEtPython.html' },
        { t: 'C. Programmation web côté serveur',                               f: 'Programmation web côté serveur (CGI Python + SQLite)',                               u: 'progWebServeur.html' },
      ]},
      { titre: 'Fichiers du TP « ludothèque » (copie locale)', items: [
        { t: 'creationTableIllustrateur.py — crée ludotheque.db + table Illustrateur', u: 'ressources/bdd/Ludotheque/creationTableIllustrateur.py' },
        { t: 'lectureLudotheque.py — taper une requête et voir le résultat',          u: 'ressources/bdd/Ludotheque/lectureLudotheque.py' },
        { t: 'creationTablesEditeurJeu.py — tables Editeur et Jeu',                   u: 'ressources/bdd/Ludotheque/creationTablesEditeurJeu.py' },
        { t: 'creationTableEstDessinePar.py — table d\'association N-M',              u: 'ressources/bdd/Ludotheque/creationTableEstDessinePar.py' },
        { t: 'Support complet du chapitre (copie locale, hors ligne)',               u: 'ressources/bdd/indexBD.html' },
      ]},
      { titre: 'Références et pratique', items: [
        { t: 'Doc Python — module sqlite3',                           u: 'https://docs.python.org/3/library/sqlite3.html' },
        { t: 'Types de données SQLite (datatype3)',                   u: 'https://www.sqlite.org/datatype3.html' },
        { t: 'SQLite Online — exécuter du SQL dans le navigateur',    u: 'https://sqliteonline.com' },
        { t: 'Chapitre 2 : Paradigmes de programmation (dès le 22 octobre)', u: 'indexParadigmes.html' },
      ]},
    ],
  },
  {
    id: 'knn-2026-09-10',
    iso: '2026-09-10', dateLabel: '10 septembre 2026 (2ᵉ partie)', bloc: 'bloc2',
    titre: 'Apprentissage supervisé : les k plus proches voisins',
    formateur: 'Laurent Amanton', mode: 'distanciel', duree: '~3 h',
    base: '',
    index: 'ressources/knn/KNN_Amanton.pdf',
    parties: [
      { titre: 'Séance en direct', items: [
        { t: 'Rejoindre la visio', u: 'https://visio.numerique.gouv.fr/diu-2026-eil' },
        { t: 'Support du cours — 30 diapositives (PDF)', u: 'ressources/knn/KNN_Amanton.pdf' },
      ]},
      { titre: 'Cours (fiches internes)', items: [
        { t: 'Apprentissage supervisé et principe du k-NN',   f: 'k-NN — apprentissage supervisé et principe' },
        { t: "L'algorithme et le vote majoritaire",           f: "k-NN — l'algorithme et le vote majoritaire" },
        { t: 'Mesurer la distance entre deux exemples',       f: 'k-NN — mesurer la distance entre deux exemples' },
        { t: 'Deux exemples déroulés (2-NN et 3-NN)',         f: 'k-NN — deux exemples déroulés (2-NN et 3-NN)' },
        { t: 'Le choix de k et le compromis biais-variance',  f: 'k-NN — le choix de k et le compromis biais-variance' },
        { t: "Effets d'échelle et normalisation min-max",     f: "k-NN — effets d'échelle et normalisation min-max" },
        { t: 'De l\'implémentation manuelle à scikit-learn',  f: 'k-NN en Python — de l\'implémentation manuelle à scikit-learn' },
      ]},
      { titre: 'Travaux pratiques', items: [
        { t: 'Correction officielle du TP rugby, commentée (script Python)', u: 'ressources/knn/tp_knn_rugby.py' },
      ]},
      { titre: 'Pour aller plus loin', items: [
        { t: 'Jeu de données Iris (UCI) — celui du cours',      u: 'https://archive.ics.uci.edu/ml/machine-learning-databases/iris/iris.data' },
        { t: 'scikit-learn — KNeighborsClassifier',             u: 'https://scikit-learn.org/stable/modules/generated/sklearn.neighbors.KNeighborsClassifier.html' },
        { t: 'Basthon — exécuter du Python sans installation',  u: 'https://console.basthon.fr' },
      ]},
    ],
  },
  {
    id: 'bdd-2026-09-17',
    iso: '2026-09-17', dateLabel: '17 septembre 2026 (matin)', bloc: 'bloc4',
    titre: 'Bases de données : normalisation et conception par diagramme de classes',
    formateur: 'Bruno Mermet (Bloc 4, chapitre 1)', mode: 'distanciel', duree: '~3 h',
    base: 'https://bases-de-donnees-26b46e.gitlab.io/',
    index: 'indexBD.html',
    parties: [
      { titre: 'Séance en direct', items: [
        { t: 'Rejoindre la visio', u: 'https://visio.numerique.gouv.fr/diu-2026-eil' },
      ]},
      { titre: 'La séance du jour', items: [
        { t: 'Erratum du support (2FN), décomposition en 3FN, conception UML et 4FN', f: 'Bases de données — erratum 2FN, limites de la 3FN et conception par diagramme de classes', u: 'bdr.html' },
        { t: 'Rappel : dépendances fonctionnelles, clés et formes normales',          f: 'Bases de données relationnelles — DF, clés et formes normales',                             u: 'bdr.html' },
        { t: 'Du diagramme de classes au schéma relationnel',                          f: 'Modèle conceptuel — diagramme de classes et passage au relationnel',                        u: 'modeleConceptuel.html' },
        { t: 'Contraintes de référence (clés étrangères)',                             f: 'Contraintes de référence (clés étrangères)',                                                u: 'contraintesReference.html' },
      ]},
      { titre: 'Support', items: [
        { t: 'Support complet du chapitre (copie locale, hors ligne)', u: 'ressources/bdd/indexBD.html' },
      ]},
    ],
  },
  {
    id: 'algo-2026-09-17',
    iso: '2026-09-17', dateLabel: '17 septembre 2026 (après-midi)', bloc: 'bloc2',
    titre: 'Correction des algorithmes : validation et tests unitaires',
    formateur: 'Bruno Mermet (Bloc 2 — Algorithmique)', mode: 'distanciel', duree: '~3 h',
    base: 'https://mermet.users.greyc.fr/Enseignement/EnseignementInformatiqueLycee/Havre/Algorithmique/',
    index: 'index.html',
    parties: [
      { titre: 'Séance en direct', items: [
        { t: 'Rejoindre la visio', u: 'https://visio.numerique.gouv.fr/diu-2026-eil' },
      ]},
      { titre: 'II. Correction des algorithmes — la séance du jour', items: [
        { t: 'A. Introduction à la validation : prototypage, test, preuve', f: 'Validation des algorithmes — test, preuve et prototypage',          u: 'validation.html' },
        { t: 'C. Tests unitaires : méthodologie, TDD, pytest',              f: 'Tests unitaires en Python — méthodologie, couverture et pytest',  u: 'tests.html' },
        { t: 'Exercice : la calculatrice en notation polonaise inversée',   u: 'calculatrice.html' },
        { t: 'Exercice : les tests de la calculatrice, pas à pas',          u: 'test_Calculatrice.html' },
      ]},
      { titre: 'Support et outils', items: [
        { t: 'Chapitre complet (copie locale, hors ligne)',            u: 'ressources/algo/index.html' },
        { t: 'Test logiciel — support PDF complémentaire (B. Mermet)', u: 'https://mermet.users.greyc.fr/Enseignement/CoursPDF/testLogiciel.pdf' },
        { t: 'Documentation pytest',                                   u: 'https://docs.pytest.org/en/latest/' },
      ]},
    ],
  },
  {
    id: 'sql-2026-09-24',
    iso: '2026-09-24', dateLabel: '24 septembre 2026 (matin)', bloc: 'bloc4',
    titre: 'SQL : interroger et manipuler la base « ludothèque »',
    formateur: 'Bruno Mermet (Bloc 4, chapitre 1)', mode: 'distanciel', duree: '~3 h',
    base: 'https://bases-de-donnees-26b46e.gitlab.io/',
    index: 'sql.html',
    parties: [
      { titre: 'Séance en direct', items: [
        { t: 'Rejoindre la visio', u: 'https://visio.numerique.gouv.fr/diu-2026-eil' },
      ]},
      { titre: 'II. Langages de données — la séance du jour', items: [
        { t: 'SQL — interrogation (LID) : projection, restriction, jointure', f: 'SQL — interroger une base (LID) : projection, restriction, jointure',           u: 'sql.html' },
        { t: 'SQL — manipulation et description (LMD / LDD)',                 f: 'SQL — manipuler et décrire (LMD/LDD) : INSERT, DELETE, UPDATE, CREATE TABLE', u: 'sql.html' },
        { t: 'Interagir avec la base depuis Python (sqlite3)',                f: 'SQL et Python — le module sqlite3',                                            u: 'sqlEtPython.html' },
      ]},
      { titre: 'Fichiers du TP « ludothèque » (copie locale)', items: [
        { t: 'creationTableIllustrateur.py — crée ludotheque.db + table Illustrateur', u: 'ressources/bdd/Ludotheque/creationTableIllustrateur.py' },
        { t: 'creationTablesEditeurJeu.py — tables Editeur et Jeu',                   u: 'ressources/bdd/Ludotheque/creationTablesEditeurJeu.py' },
        { t: 'creationTableEstDessinePar.py — table d\'association N-M',              u: 'ressources/bdd/Ludotheque/creationTableEstDessinePar.py' },
        { t: 'lectureLudotheque.py — taper une requête et voir le résultat',          u: 'ressources/bdd/Ludotheque/lectureLudotheque.py' },
        { t: 'SQLite Online — exécuter du SQL dans le navigateur',                    u: 'https://sqliteonline.com' },
      ]},
    ],
  },
  {
    id: 'gloutons-2026-09-24',
    iso: '2026-09-24', dateLabel: '24 septembre 2026 (après-midi)', bloc: 'bloc2',
    titre: 'Algorithmes gloutons (TP FDIU)',
    formateur: 'FDIU (DU Normandie)', mode: 'distanciel', duree: '~3 h',
    base: '',
    index: 'basthon:ressources/glouton/FDIU_algorithmes_gloutons.ipynb',
    parties: [
      { titre: 'Cours et TP', items: [
        { t: 'Cours : principe, limites et alternatives', f: 'Algorithmes gloutons — principe, limites et alternatives' },
        { t: 'Notebook du TP (Basthon) — TP corrigé pas à pas dans l\'onglet 🧪 TP',     u: 'basthon:ressources/glouton/FDIU_algorithmes_gloutons.ipynb' },
      ]},
      { titre: 'Correction (donnée le 1er octobre)', items: [
        { t: 'Correction officielle du formateur (Basthon)',          u: 'basthon:ressources/glouton/FDIU_algorithmes_gloutons_correction_formateur.ipynb' },
        { t: 'Télécharger la correction officielle (.ipynb)',        u: 'ressources/glouton/FDIU_algorithmes_gloutons_correction_formateur.ipynb' },
        { t: 'Script de vérification (références exhaustives)',      u: 'ressources/glouton/solution_gloutons.py' },
      ]},
    ],
  },
  {
    id: 'algo-2026-10-01',
    iso: '2026-10-01', dateLabel: '1er octobre 2026 (matin)', bloc: 'bloc2',
    titre: 'Correction des algorithmes : couverture, preuve de programme et assertions',
    formateur: 'Bruno Mermet (Bloc 2 — Algorithmique)', mode: 'distanciel', duree: '~3 h',
    base: 'https://mermet.users.greyc.fr/Enseignement/EnseignementInformatiqueLycee/Havre/Algorithmique/',
    index: 'index.html',
    parties: [
      { titre: 'Séance en direct', items: [
        { t: 'Rejoindre la visio', u: 'https://visio.numerique.gouv.fr/diu-2026-eil' },
      ]},
      { titre: 'II. Correction des algorithmes — la séance du jour', items: [
        { t: 'Couverture de code : instructions, branches, chemins',  f: 'Tests unitaires en Python — méthodologie, couverture et pytest',     u: 'tests.html' },
        { t: 'B. Preuve — logique, triplets de Hoare, substitution',  f: 'Preuve de programme — logique, triplets de Hoare et substitution',  u: 'preuve.html' },
        { t: 'B. Preuve — invariants, correction partielle et totale', f: 'Preuve de programme — invariants, correction partielle et totale', u: 'preuve.html' },
        { t: 'B. Preuve — assertions Python et exercices corrigés',   f: 'La preuve en pratique — assertions Python et exercices corrigés',   u: 'preuve.html' },
      ]},
      { titre: 'Code écrit en séance par le formateur', items: [
        { t: 'personne.py — invariant de classe et encapsulation',            u: 'ressources/algo/seance-2026-10-01/personne.py' },
        { t: 'exemple.txt — assertions, skolémisation, preuves de maximum et Horloge', u: 'ressources/algo/seance-2026-10-01/exemple.txt' },
      ]},
      { titre: 'Support complet (copie locale, hors ligne)', items: [
        { t: 'Sommaire du chapitre',                                          u: 'ressources/algo/index.html' },
        { t: 'Exercices de preuve corrigés (horloge, maximum, tri à bulle)', u: 'ressources/algo/preuve.html' },
      ]},
    ],
  },
  {
    id: 'dpr-2026-10-01',
    iso: '2026-10-01', dateLabel: '1er octobre 2026 (après-midi)', bloc: 'bloc2',
    titre: 'Diviser pour régner (1) : occurrences et tri fusion — et correction des gloutons',
    formateur: 'FDIU (DU Normandie)', mode: 'distanciel', duree: '~3 h',
    base: '',
    index: 'basthon:ressources/dpr/FDIU_diviser_pour_regner.ipynb|ressources/dpr/_fusion.py|ressources/dpr/triClassique_V2.py',
    parties: [
      { titre: 'Diviser pour régner', items: [
        { t: 'Cours : principe, exemples et tri fusion', f: 'Diviser pour régner — principe, exemples et tri fusion' },
        { t: 'Le cours de B. Mermet (diviser.html)',      u: 'ressources/algo/diviser.html' },
        { t: 'Notebook du TP (Basthon) — TP corrigé pas à pas dans l\'onglet 🧪 TP', u: 'basthon:ressources/dpr/FDIU_diviser_pour_regner.ipynb|ressources/dpr/_fusion.py|ressources/dpr/triClassique_V2.py' },
        { t: 'Solutions des trois TP diviser pour régner (script Python)', u: 'ressources/dpr/solution_dpr.py' },
      ]},
      { titre: 'Algorithmes gloutons : la correction', items: [
        { t: 'Correction officielle du TP gloutons (Basthon)', u: 'basthon:ressources/glouton/FDIU_algorithmes_gloutons_correction_formateur.ipynb' },
      ]},
    ],
  },
  {
    id: 'complexite-2026-10-08',
    iso: '2026-10-08', dateLabel: '8 octobre 2026 (matin)', bloc: 'bloc2',
    titre: 'Complexité des algorithmes : en temps, en espace, prolongements',
    formateur: 'Bruno Mermet (Bloc 2 — Algorithmique)', mode: 'distanciel', duree: '~3 h',
    base: 'https://mermet.users.greyc.fr/Enseignement/EnseignementInformatiqueLycee/Havre/Algorithmique/',
    index: 'complexite.html',
    parties: [
      { titre: 'Séance en direct', items: [
        { t: 'Rejoindre la visio', u: 'https://visio.numerique.gouv.fr/diu-2026-eil' },
      ]},
      { titre: 'III. Complexité — la séance du jour', items: [
        { t: 'Complexité en temps : compter, notation O, classes usuelles', f: 'Complexité en temps — compter les opérations, notation O et classes usuelles', u: 'complexiteTemps.html' },
        { t: 'Exemple : Fibonacci naïf contre mémoïsé',                     u: 'complexiteTemps01fibo.html' },
        { t: 'Exemple : recherche dans une liste',                           u: 'complexiteTemps02recherche.html' },
        { t: 'Complexité en espace, Ackermann, efficacité énergétique',     f: 'Complexité en espace et prolongements (Ackermann, efficacité énergétique)', u: 'complexiteEspace.html' },
        { t: 'Prolongements',                                                u: 'prolongementsComplexite.html' },
      ]},
      { titre: 'Support complet (copie locale, hors ligne)', items: [
        { t: 'Complexité — sommaire de la partie III', u: 'ressources/algo/complexite.html' },
      ]},
    ],
  },
  {
    id: 'dpr-2026-10-08',
    iso: '2026-10-08', dateLabel: '8 octobre 2026 (après-midi)', bloc: 'bloc2',
    titre: 'Diviser pour régner (2) : multiplication de Karatsuba et rotation d\'image',
    formateur: 'FDIU (DU Normandie)', mode: 'distanciel', duree: '~3 h',
    base: '',
    index: 'basthon:ressources/dpr/FDIU_diviser_pour_regner_2_karatsuba.ipynb',
    parties: [
      { titre: 'Karatsuba', items: [
        { t: 'Cours : multiplier de grands nombres en diviser pour régner', f: 'Karatsuba — multiplier de grands nombres en diviser pour régner' },
        { t: 'Notebook Karatsuba (Basthon) — TP corrigé dans l\'onglet 🧪 TP', u: 'basthon:ressources/dpr/FDIU_diviser_pour_regner_2_karatsuba.ipynb' },
      ]},
      { titre: 'Rotation d\'image', items: [
        { t: 'Notebook rotation d\'image (Basthon) — TP corrigé dans l\'onglet 🧪 TP', u: 'basthon:ressources/dpr/FDIU_rotation_image_dpr.ipynb|ressources/dpr/perroquet_256_cc.jpg' },
        { t: 'Solutions des trois TP diviser pour régner (script Python)', u: 'ressources/dpr/solution_dpr.py' },
      ]},
    ],
  },
  {
    id: 'arbres-2026-11-19',
    iso: '2026-11-19', dateLabel: '19 novembre 2026', bloc: 'bloc5',
    titre: 'Algorithmique avancée : les arbres binaires',
    formateur: 'Université de Caen Normandie (Bloc 5)', mode: 'distanciel', duree: '~3 h',
    base: '',
    index: 'ressources/arbres/Arbres.pdf',
    parties: [
      { titre: 'Introduction : autour de l\'algorithmique', items: [
        { t: 'Algorithmes, complexité, exécution d\'un programme Python, timeit', f: 'Autour de l\'algorithmique — algorithmes, complexité et exécution d\'un programme Python' },
        { t: 'Diaporama « Autour de l\'algorithmique » (G. Richard, PDF)',       u: 'ressources/arbres/Intro-Algo.pdf' },
      ]},
      { titre: 'CM 5 : structures arborescentes', items: [
        { t: 'Définitions inductives et vocabulaire',                 f: 'Arbres — définitions inductives et vocabulaire' },
        { t: 'Propriétés inductives et représentation en Python',     f: 'Arbres binaires — propriétés inductives et représentation en Python' },
        { t: 'Parcours : largeur, préfixe, infixe, suffixe',          f: 'Parcours d\'arbres binaires — largeur, profondeur, préfixe, infixe, suffixe' },
        { t: 'Diaporama du cours (PDF)',                              u: 'ressources/arbres/Arbres.pdf' },
        { t: 'Arbre.py — la classe Noeud donnée en séance',           u: 'ressources/arbres/Arbre.py' },
      ]},
      { titre: 'TD : arbres binaires', items: [
        { t: 'Énoncé du TD (PDF) — TP corrigé pas à pas dans l\'onglet 🧪 TP', u: 'ressources/arbres/TD-Arbres.pdf' },
        { t: 'Toutes les solutions, autovérifiées (script Python)',             u: 'ressources/arbres/solution_td_arbres.py' },
      ]},
    ],
  },
  {
    id: 'paradigmes-2026-10-22',
    iso: '2026-10-22', dateLabel: '22 octobre 2026', bloc: 'bloc4',
    titre: 'Paradigmes de programmation : la programmation fonctionnelle (Haskell) — et fin de SQL',
    formateur: 'Bruno Mermet (Bloc 4, chapitre 2)', mode: 'distanciel', duree: '~3 h',
    base: 'https://bases-de-donnees-26b46e.gitlab.io/',
    index: 'indexParadigmes.html',
    parties: [
      { titre: 'Séance en direct', items: [
        { t: 'Rejoindre la visio', u: 'https://visio.numerique.gouv.fr/diu-2026-eil' },
      ]},
      { titre: 'Fin du chapitre 1 : SQL et Python', items: [
        { t: 'Injection SQL, requêtes paramétrées, ALTER TABLE', f: 'SQL et Python — injection SQL, requêtes paramétrées et ALTER TABLE', u: 'sqlEtPython.html' },
      ]},
      { titre: 'Chapitre 2 : paradigmes — la séance du jour', items: [
        { t: 'A. Introduction aux paradigmes',                         f: 'Paradigmes de programmation — introduction',                                            u: 'introductionParadigmes.html' },
        { t: 'C. Fonctionnel : λ-calcul, immuabilité, inférence de types', f: 'Programmation fonctionnelle — λ-calcul, immuabilité et inférence de types',          u: 'progFonctionnelle.html' },
        { t: 'C. Fonctionnel : récursivité, listes, map / filter / fold',  f: 'Programmation fonctionnelle — récursivité, listes et fonctions d\'ordre supérieur', u: 'progFonctionnelle.html' },
        { t: 'Le type abstrait Liste',                                  u: 'listes.html' },
      ]},
      { titre: 'Suite du chapitre (prochaines séances)', items: [
        { t: 'F. Logique : faits, buts et variables logiques (Prolog)', f: 'Programmation logique — faits, buts et variables logiques (Prolog)',     u: 'progLogique.html' },
        { t: 'F. Logique : règles, récursivité, arbre de résolution',   f: 'Programmation logique — règles, récursivité et arbre de résolution',     u: 'progLogique.html' },
        { t: 'G. Objet : classes, instances, encapsulation',            f: 'Programmation objet — classes, instances et encapsulation',              u: 'progObjet.html' },
        { t: 'G. Objet : attributs dynamiques, composition, héritage',  f: 'Programmation objet — attributs dynamiques, composition et héritage',    u: 'progObjet.html' },
      ]},
      { titre: 'Support et outils', items: [
        { t: 'Chapitre 2 complet (copie locale, hors ligne)', u: 'ressources/paradigmes/indexParadigmes.html' },
        { t: 'SWISH — Prolog dans le navigateur',             u: 'https://swish.swi-prolog.org/' },
        { t: 'Haskell — installer GHC (ghci)',                u: 'https://www.haskell.org/ghcup/' },
      ]},
    ],
  },
]
// « basthon:ressources/x.ipynb|ressources/module.py|ressources/image.jpg » : ouvre la copie du dépôt dans
// Basthon, quel que soit l'hébergeur du site (Vercel, GitHub Pages, local), avec ses fichiers annexes.
function basthonLien(spec) {
  const [nb, ...annexes] = spec.slice('basthon:'.length).split('|')
  const abs = p => encodeURIComponent(new URL(p, window.location.href).href)
  return 'https://notebook.basthon.fr/?from=' + abs(nb) +
    annexes.map(p => (p.endsWith('.py') ? '&module=' : '&aux=') + abs(p)).join('')
}
// URL absolue ou fichier local du dépôt (ressources/…, /…) : gardé tel quel ; sinon résolu contre la base du formateur
const resolveUrl = (base, u) => u.startsWith('basthon:') ? basthonLien(u)
  : (/^https?:/i.test(u) || /^(ressources\/|\/)/.test(u)) ? u : base + u
const RESSOURCES_OFFICIEL = [
  { icon: '🐧', title: 'Linux : répertoires & fichiers (L. Mouchard)', desc: 'Notes HackMD — navigation, ls, cd, mkdir, cp, mv, rm (Bloc 3 / shell)', url: 'https://hackmd.io/@LaurentMouchard/r1A2T-7lze#R%C3%A9pertoires-amp-Fichiers' },
  { icon: '🐳', title: 'Docker et les conteneurs (Univ. Rouen)', desc: 'cgroups, namespaces, seccomp, prise en main Docker (Bloc 3 — pour aller plus loin)', url: 'https://codimd.univ-rouen.fr/s/sNesfpTmN' },
  { icon: '🧬', title: 'Big Data et Sciences de la Vie (L. Mouchard)', desc: 'Les 3 V, ordres de grandeur, bases bio (GenBank, SRA, TCGA), cloud computing (Jour 6)', url: 'https://codimd.univ-rouen.fr/s/PM0v1dyOX' },
  { icon: '🌐', title: 'Quelques repères sur les réseaux informatiques (HackMD)', desc: 'OSI/TCP-IP, encapsulation, IPv4, DNS, TCP/UDP, CIDR, NAT, firewalls — Jour 7 (téléchargement local)', url: 'ressources/Reseaux_reperes.html' },
  { icon: '🖥️', title: 'Cours architecture matérielle (S. Nicolas, Univ. Rouen)', desc: 'Von Neumann, jeu d\'instructions, assembleur, mémoire, SoC, robotique — support PDF complet (Jour 7)', url: 'ressources/architecture/Nicolas_Architecture_materielle.pdf' },
  { icon: '🔢', title: 'Représentation des données (support DIU)', desc: 'Cours complet : numération & bases, entiers (complément à 2), IEEE 754, caractères (ASCII/Unicode/UTF-8) + diapos & exos Slate — Jour en ligne 22 juin', url: 'https://diu-representations-0abb3a.forge.apps.education.fr/index.html' },
  { icon: '🌍', title: 'Web : HTML, CSS, client/serveur (support DIU)', desc: 'Cours complet : HTML & DOM, CSS (sélecteurs, boîte, Flexbox), HTTP/DNS/REST — Jour en ligne 23 juin (3 livres PDF)', url: 'https://diu-htmlcss-1858e2.forge.apps.education.fr/index.html' },
  { icon: '🧑‍💻', title: 'Créer une appli web en NSI (mdBook complet)', desc: 'Référence Flask/Python : serveur, routes, templates, formulaires, bases de données (SQL, SQLite, injection), authentification (cookies, sessions, tokens), déploiement (SSH, SSL)', url: 'https://2025-formation-web-app-python-26f3cf.forge.apps.education.fr/' },
  { icon: '🗄️', title: 'Bloc 4 — Bases de données (B. Mermet, en ligne)', desc: 'Chapitre 1 complet : BDD relationnelles (DF, formes normales), modèle conceptuel, contraintes de référence, SGBD, SQL (LID/LMD/LDD), sqlite3 en Python, web côté serveur — Jour en ligne 10 septembre', url: 'https://bases-de-donnees-26b46e.gitlab.io/indexBD.html' },
  { icon: '📐', title: 'Bloc 2 Algorithmique — copie locale du chapitre (B. Mermet)', desc: 'Les 30 pages du chapitre et leurs schémas, consultables hors ligne : gloutons, diviser pour régner, k plus proches voisins, validation, preuve de programme et ses exercices corrigés, tests unitaires, complexité (séances des 17 septembre, 1er et 8 octobre)', url: 'ressources/algo/index.html' },
  { icon: '🧠', title: 'Bloc 4 — Paradigmes de programmation (B. Mermet) — copie locale', desc: 'Chapitre 2 : introduction, programmation fonctionnelle (λ-calcul, Haskell : types, récursivité, map/filter/fold), programmation logique (Prolog), programmation objet (classes, encapsulation, héritage) — séance du 22 octobre', url: 'ressources/paradigmes/indexParadigmes.html' },
  { icon: '🌳', title: 'Arbres binaires — cours, TD et solutions (Unicaen)', desc: 'Séance du 19 novembre (Bloc 5) : CM « structures arborescentes », TD « arbres binaires » corrigé dans l\'onglet TP, script de solutions autovérifié, classe Noeud — copies locales', url: 'ressources/arbres/Arbres.pdf' },
  { icon: '✂️', title: 'Notebooks « Diviser pour régner » (FDIU)', desc: 'Tri fusion (1er octobre), Karatsuba (8 et 15 octobre), rotation d\'image — copies locales avec leurs modules, s\'ouvrent dans Basthon ; les trois TP corrigés sont dans l\'onglet TP', url: 'basthon:ressources/dpr/FDIU_diviser_pour_regner.ipynb|ressources/dpr/_fusion.py|ressources/dpr/triClassique_V2.py' },
  { icon: '✅', title: 'TP gloutons — correction officielle du formateur (FDIU)', desc: 'Le notebook corrigé donné en séance le 1er octobre : conversion binaire, rendu de monnaie et conditions de Pearson, sac à dos, planning, recherche exhaustive — s\'ouvre dans Basthon', url: 'basthon:ressources/glouton/FDIU_algorithmes_gloutons_correction_formateur.ipynb' },
  { icon: '💾', title: 'Support BDD — copie locale + scripts ludothèque', desc: 'Les 7 pages du chapitre, les schémas et les 4 scripts Python du TP (creationTable…, lectureLudotheque.py), consultables hors ligne', url: 'ressources/bdd/indexBD.html' },
  { icon: '🐍', title: 'Doc Python — module sqlite3', desc: 'Documentation officielle : connect, execute, executemany, commit, curseurs, requêtes paramétrées (utilisée dans le cours BDD du 10 septembre)', url: 'https://docs.python.org/3/library/sqlite3.html' },
  { icon: '🍬', title: 'Notebook « Les algorithmes gloutons » (FDIU)', desc: 'TP complet sur les problèmes d\'optimisation : conversion binaire, rendu de monnaie, sac à dos, planning de conférenciers, recherche exhaustive et programmation dynamique — ouvrable dans Basthon', url: 'https://github.com/LANSIG/NSI' },
  { icon: '📁', title: 'Dépôts source des supports DIU (forge éducation)', desc: 'Groupe GitLab diu-2026-eil : code source de tous les supports (HTML/CSS, représentations…), toujours à jour', url: 'https://forge.apps.education.fr/diu-2026-eil' },
  { icon: '🐍', title: 'Listes, n-uplets et dictionnaires (Y. Pigné)', desc: 'Dépôt de notebooks (cours + TP + fiches élèves) : listes, tuples, piles/files, dictionnaires, ensembles — Bloc 1 (23 juin, ouvrables dans Basthon)', url: 'https://git.litislab.fr/ypigne/2026-EIL-listes-tuples-dictionnaires' },
  { icon: '🥞', title: 'Notebook — Piles et files (FDIU, DU Normandie)', desc: 'Cours en ligne du 15 octobre (Bloc 4) : LIFO/FIFO, classes Pile et File, notation polonaise inversée, patate chaude, ordonnanceur round-robin — copie locale, s\'ouvre dans Basthon', url: 'https://notebook.basthon.fr/?from=https%3A%2F%2Febechalani.github.io%2FDuNSI%2Fressources%2Fpython%2FFDIU-Piles-Files-2026.ipynb' },
  { icon: '⛓️', title: 'Notebook — Listes chaînées (FDIU, DU Normandie)', desc: 'Cours en ligne du 15 octobre (Bloc 4) : classes Cellule et Liste, complexités, double chaînage, traitement récursif head/tail — copie locale, s\'ouvre dans Basthon', url: 'https://notebook.basthon.fr/?from=https%3A%2F%2Febechalani.github.io%2FDuNSI%2Fressources%2Fpython%2FFDIU-Listes-chainees.ipynb' },
  { icon: '📖', title: 'Modèle de von Neumann (Pixees / D. Roche)', desc: 'Cours en ligne 1ʳᵉ NSI sur l\'architecture séquentielle — pédagogique et concis', url: 'https://pixees.fr/informatiquelycee/n_site/nsi_prem_von_neu.html' },
  { icon: '🧪', title: 'TP simulateur CPU (Pixees / D. Roche)', desc: '1ʳᵉ NSI : 3 programmes assembleur de difficulté croissante (saisie, conversion machine↔asm, boucle while)', url: 'https://pixees.fr/informatiquelycee/n_site/nsi_prem_sim_cpu.html' },
  { icon: '💻', title: 'Simulateur CPU en ligne (P. Higginson)', desc: 'Simulateur de processeur von Neumann (registres, mémoire, assembleur) — utilisé par le TP Pixees', url: 'https://peterhigginson.co.uk/AQA/' },
  { icon: '🎓', title: 'Moodle Eureka (Univ. Le Havre)', desc: 'Plateforme du DIU — login = identifiants wifi · mdp : /login/forgot_password.php', url: 'https://eureka.univ-lehavre.fr' },
  { icon: '📚', title: 'Eduscol NSI',      desc: 'Programmes et ressources officielles Numérique et Sciences Informatiques', url: 'https://eduscol.education.gouv.fr/5823/programmes-et-ressources-en-numerique-et-sciences-informatiques-voie-g' },
  { icon: '💬', title: 'Forum MOOC NSI',   desc: 'Échanges et ressources de la communauté NSI (INRIA)',                      url: 'https://mooc-forums.inria.fr/moocnsi' },
  { icon: '✉️', title: 'Liste de diffusion DIU',  desc: 'diu-eil-2026@univ-lehavre.fr — communication officielle de la promo',  url: 'mailto:diu-eil-2026@univ-lehavre.fr' },
  { icon: '📧', title: 'Liste SNT (RENATER)',     desc: 'sciences-numeriques-technologie@groupes.renater.fr',                    url: 'mailto:sciences-numeriques-technologie@groupes.renater.fr' },
  { icon: '📧', title: 'Liste NSI (RENATER)',     desc: 'numerique-sciences-informatiques@groupes.renater.fr',                   url: 'mailto:numerique-sciences-informatiques@groupes.renater.fr' },
]

// ── Logisim : plateforme + projets de circuits logiques (Bloc 3, Jour 6) ──
const LOGISIM_PLATFORM = {
  icon: '🔌',
  title: 'Logisim Evolution (à installer)',
  desc: 'Simulateur libre de circuits logiques (gratuit, nécessite Java). Télécharge la dernière version, puis ouvre les projets .circ ci-dessous (Fichier → Ouvrir).',
  url: 'https://github.com/logisim-evolution/logisim-evolution/releases/latest',
}
// Projets rangés du plus simple au plus complet (combinatoire → séquentiel → microprocesseur)
const LOGISIM_PROJETS = [
  { file: 'Addition.circ',   icon: '➕', title: 'Additionneurs & soustracteur', theme: 'Logique combinatoire',
    desc: 'Demi-additionneur, additionneur complet, additionneur 4 bits, additionneur/soustracteur et affichage.' },
  { file: 'Plexer.circ',     icon: '🔀', title: 'Encodeurs, décodeurs, multiplexeurs', theme: 'Logique combinatoire',
    desc: 'Encodeurs, décodeurs, multiplexeurs et démultiplexeurs (2 et 4 bits).' },
  { file: 'ByteToBCD.circ',  icon: '🔢', title: 'Conversion octet → BCD', theme: 'Logique combinatoire',
    desc: 'Convertit un octet en décimal codé binaire (BCD) pour l’affichage.' },
  { file: 'Aff7seg.circ',    icon: '🔡', title: 'Afficheur 7 segments', theme: 'Logique combinatoire',
    desc: 'Décodage d’une valeur vers un afficheur 7 segments (hexadécimal et décimal).' },
  { file: 'FF.circ',         icon: '🔁', title: 'Bascules (flip-flops)', theme: 'Logique séquentielle',
    desc: 'Bascules RS, RS à horloge, JK, JK maître-esclave, D et T.' },
  { file: 'Sequentiel.circ', icon: '⏱️', title: 'Horloges & registres à décalage', theme: 'Logique séquentielle',
    desc: 'Horloges, bascules, décalages (gauche/droite), rotation.' },
  { file: 'Memoire.circ',    icon: '💾', title: 'Registres & mémoire', theme: 'Logique séquentielle',
    desc: 'Registre 1 bit / 4 bits, mémoires 8×4 et 32×4 bits, décodeurs d’adresse.' },
  { file: 'Sequenceur.circ', icon: '🎚️', title: 'Séquenceur', theme: 'Logique séquentielle',
    desc: 'Séquenceurs asynchrones et synchrone, partie combinatoire.' },
  { file: 'ALU.circ',        icon: '🧮', title: 'Unité Arithmétique et Logique (UAL)', theme: 'Microprocesseur',
    desc: 'Décodeur, multiplexeur, additionneur, UAL 1 bit puis UAL 4 bits.' },
  { file: 'HighLevel.circ',  icon: '🖥️', title: 'Processeur complet (vue haut niveau)', theme: 'Microprocesseur',
    desc: 'Décodeur d’instruction, unité de commande, séquenceur, exécution, registres, ROM/RAM.' },
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
let ficheGroupMode = 'bloc'   // 'bloc' | 'theme'
let lastFicheView = 'fiches'  // vue d'où la fiche a été ouverte (fiches | projets)
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
  else if (view === 'projets')    renderProjets()
  else if (view === 'journal')    renderJournal()
  else if (view === 'eval')       renderEval()
  else if (view === 'ressources') renderRessources()
}

const PROJET_PREFIX = 'Projet ·'
const PROJET_CATEGORIES = ['Algorithmique & maths', 'Jeux', 'Cryptographie', 'Structures de données', 'Graphique & simulation']
function estProjet(f) { return (f.topic || '').startsWith(PROJET_PREFIX) }
function projetCategorie(f) { return (f.topic || '').replace(/^Projet ·\s*/, '') }

// ── Données TP ───────────────────────────────────────────
const TPS = [
  // ── TP — Arbres binaires : parcours, feuilles, profondeurs, expressions ──
  {
    id: "tp-arbres-binaires", bloc: "bloc5", jour: "En ligne — 19 novembre 2026",
    theme: "Algorithmique avancée — arbres binaires",
    title: "TP — Arbres binaires : parcours, feuilles, profondeurs, expressions",
    type: 'tp',
    original: "TD-Arbres.pdf",
    intro: "TD « Arbres binaires » du cours de L2 « Algorithmique et structures de données » (Université de Caen Normandie), adapté pour la formation NSI et traité lors de la séance DIU du 19 novembre 2026, avec le CM 5 « Structures arborescentes ». Toutes les questions sont corrigées en Python avec la classe Noeud donnée en séance (fichier Arbre.py : valeur, gauche, droite ; l'arbre vide est None). L'étape x.y correspond à l'exercice x, question y : exercice 1, parcours de l'arbre A, nombre de feuilles, copie et parcours préfixe itératif avec une pile ; exercice 2, profondeurs, niveaux et longueurs de cheminement (LC, LCE) ; exercice 3, arbres d'expressions arithmétiques. Conventions du cours : la racine est de profondeur 0, l'arbre vide a pour hauteur −1. Chaque étape donne un squelette (signature, docstring, doctests) : complète-le, lance doctest.testmod(), puis déplie la correction. Les corrections s'exécutent dans l'ordre, chacune s'appuyant sur les précédentes ; le script solution_td_arbres.py les réunit toutes et vérifie chaque résultat. Pour la mise en œuvre en classe, voir aussi les fiches « Piles et files : LIFO, FIFO et applications » et « Les listes chaînées » (bloc 4), le « Parcours guidé — Pile, File et Arbre » et le « Projet — Arbre binaire de recherche » (bloc 0).",
    steps: [
      {
        num: "1.1", title: "L'arbre A et ses quatre parcours, à la main",
        intro: "Exercice 1, question 1. Voici l'arbre A de la figure 1 du TD, recopié nœud par nœud ; ∅ désigne un sous-arbre vide. Avant de programmer quoi que ce soit, on donne à la main l'ordre de visite des nœuds pour chacun des parcours vus en cours (CM 5, diapositives 20 à 25).",
        code: `#                        a
#                /               \\
#               b                 c
#             /   \\             /   \\
#            d     ∅           ∅     e
#          /   \\                   /    \\
#         ∅     f                 g      h
#              / \\              /   \\   / \\
#             ∅   ∅            i     j ∅   ∅
#                             / \\   / \\
#                            ∅   ∅ ∅   ∅
#
# Donnez, à la main, l'ordre de visite des nœuds de A :
prefixe  = "..."   # 1. parcours préfixe
postfixe = "..."   # 2. parcours postfixe (ou suffixe)
largeur  = "..."   # 3. parcours en largeur
infixe   = "..."   # 4. parcours infixe : le quatrième parcours du cours, oublié par l'énoncé`,
        note: "Coquille de l'énoncé : la question 1 annonce « les quatre parcours suivants » mais n'en énumère que trois (préfixe, postfixe, largeur). Le quatrième parcours du cours est le parcours infixe ; on le traite partout, et la question 3 (« chacun des quatre ordres ») confirme qu'il était prévu.",
        questions: [
          "Donnez l'ordre de visite des nœuds de A pour le parcours préfixe, le parcours postfixe (ou suffixe) et le parcours en largeur.",
          "L'énoncé annonce « quatre parcours » mais n'en liste que trois : quel est le quatrième ? Donnez aussi son ordre de visite.",
          "Combien A a-t-il de nœuds, de nœuds internes et de feuilles ?"
        ],
        correction: [
          { text: "Méthode du cours (diapositive 22) : dans un parcours en profondeur, on part de la racine, on descend le plus à gauche possible puis on remonte ; chaque nœud est visité trois fois : à la première visite (en arrivant), à la deuxième (après son sous-arbre gauche) et à la troisième (après son sous-arbre droit). Pour A, la suite complète des visites est : a b d d f f f d b b a c c e g i i i g j j j g e h h h e c a. Le parcours préfixe garde la première occurrence de chaque nœud, l'infixe la deuxième, le postfixe la troisième." },
          { code: `# Réponses de la question 1 (vérifiées par programme à l'étape 1.3)
prefixe  = "a b d f c e g i j h"   # racine, puis sous-arbre gauche, puis sous-arbre droit
infixe   = "d f b a c i g j e h"   # sous-arbre gauche, puis racine, puis sous-arbre droit
postfixe = "f d b i j g h e c a"   # sous-arbre gauche, puis sous-arbre droit, puis racine
largeur  = "a b c d e f g h i j"   # niveau 0, puis niveau 1, ... chaque niveau de gauche à droite` },
          { text: "Le quatrième parcours est le parcours infixe (ou symétrique), présenté en cours à la diapositive 24 : la liste de l'énoncé s'arrête à trois, c'est une coquille. On traite donc les quatre ordres dans tout le TP." },
          { text: "Deux pièges classiques en préfixe et en postfixe : d n'a pas de fils gauche, donc f vient juste après d en préfixe et juste avant d en postfixe ; c n'a pas de fils gauche, donc en infixe c est affiché tout de suite après a, avant tout son sous-arbre droit." },
          { text: "A compte N(A) = 10 nœuds : 6 nœuds internes (a, b, c, d, e, g) et 4 feuilles (f, h, i, j). On retrouve bien N(A) = Ni(A) + Nf(A) = 6 + 4 (cours, diapositive 10). Ces trois nombres serviront aux questions 4 à 6." }
        ]
      },
      {
        num: "1.2", title: "Représentation chaînée de A en Python",
        intro: "Exercice 1, question 2. En Python, la « structure nœud » du TD devient la classe Noeud donnée en séance (fichier Arbre.py). Le « pointeur sur nœud » est une référence vers un objet Noeud, et le pointeur nul est None : un arbre binaire est donc représenté par (une référence vers) sa racine, et l'arbre vide par None.",
        code: `class Noeud:
    def __init__(self, valeur, gauche=None, droite=None):
        self.valeur = valeur      # Contenu du nœud
        self.gauche = gauche      # Sous-arbre gauche
        self.droite = droite      # Sous-arbre droit


def parenthese(B):
    """Notation parenthésée de l'arbre B (∅ pour l'arbre vide).

    >>> parenthese(Noeud('x', None, Noeud('y')))
    'x(∅,y)'
    >>> parenthese(None)
    '∅'
    """
    ...


A = ...   # à compléter : construire l'arbre A de la figure 1`,
        note: "Le TD note le fils droit « droit » ; la classe Noeud d'Arbre.py l'appelle « droite ». On garde ici la classe telle quelle : A->gauche s'écrit A.gauche et A->droit s'écrit A.droite.",
        questions: [
          "Dessinez la représentation chaînée de A : chaque nœud est une case à trois champs (gauche, valeur, droit).",
          "Construisez A en Python avec la classe Noeud. Combien d'objets Noeud faut-il créer ? Combien de champs valent None ?",
          "Écrivez parenthese(B), qui renvoie la notation parenthésée d'un arbre, pour contrôler la construction."
        ],
        correction: [
          { text: "Dessin de la représentation chaînée : chaque case [gauche|valeur|droit] est un objet Noeud, * est une référence vers un autre nœud, ∅ est None. La variable A n'est qu'une référence vers la case de la racine." },
          { code: `#  A
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
#                                  [∅|i|∅]    [∅|j|∅]` },
          { text: "On crée exactement 10 objets Noeud, un par nœud. On peut construire l'arbre de bas en haut (les feuilles d'abord) ou d'un seul coup par des appels imbriqués : les deux écritures donnent le même arbre." },
          { code: `class Noeud:
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
assert A.droite.droite.gauche.droite.valeur == 'j'    # A->droit->droit->gauche->droit` },
          { text: "Champs à None : chaque feuille en a 2 (4 feuilles, donc 8), et b, c, d en ont 1 chacun, soit 11 en tout. C'est un cas particulier d'un fait général : un arbre binaire à N nœuds a 2N champs de fils, dont N − 1 sont occupés (chaque nœud sauf la racine a exactement un parent) ; il reste donc N + 1 = 11 champs à None. Ce décompte resservira à la question 6." }
        ]
      },
      {
        num: "1.3", title: "Une procédure par parcours",
        intro: "Exercice 1, question 3. Une procédure par ordre : préfixe, infixe, postfixe (récursives, calquées sur la définition inductive des arbres binaires) et largeur (itérative, avec une file). Chaque procédure affiche les valeurs sur une même ligne, séparées par des espaces.",
        code: `from collections import deque


def affichePrefixe(A):
    """Affiche les nœuds de A dans l'ordre préfixe (racine, gauche, droite).

    >>> affichePrefixe(A)               # doctest: +NORMALIZE_WHITESPACE
    a b d f c e g i j h
    >>> affichePrefixe(None)            # arbre vide : rien à afficher
    """
    ...


def afficheInfixe(A):
    """Affiche les nœuds de A dans l'ordre infixe (gauche, racine, droite).

    >>> afficheInfixe(A)                # doctest: +NORMALIZE_WHITESPACE
    d f b a c i g j e h
    """
    ...


def affichePostfixe(A):
    """Affiche les nœuds de A dans l'ordre postfixe (gauche, droite, racine).

    >>> affichePostfixe(A)              # doctest: +NORMALIZE_WHITESPACE
    f d b i j g h e c a
    """
    ...


def afficheLargeur(A):
    """Affiche les nœuds de A niveau par niveau, chaque niveau de gauche à droite.

    >>> afficheLargeur(A)               # doctest: +NORMALIZE_WHITESPACE
    a b c d e f g h i j
    """
    ...


import doctest
doctest.testmod()`,
        note: "Les procédures affichent avec print(..., end=\" \") : la ligne se termine par un espace et sans retour à la ligne. La directive # doctest: +NORMALIZE_WHITESPACE demande à doctest d'ignorer ces différences d'espaces. Pour lancer les tests d'un notebook ou d'un script : import doctest puis doctest.testmod().",
        questions: [
          "Écrivez les trois procédures récursives affichePrefixe, afficheInfixe et affichePostfixe. Qu'est-ce qui change de l'une à l'autre ?",
          "Écrivez afficheLargeur avec une file. Pourquoi une file, et pas une pile ?",
          "Vérifiez par programme les réponses données à la main à l'étape 1.1."
        ],
        correction: [
          { text: "Les trois parcours en profondeur ont exactement le même squelette : cas de base l'arbre vide (on ne fait rien), sinon deux appels récursifs sur les sous-arbres. Seule la place de l'affichage change : avant les deux appels (première visite, préfixe), entre eux (deuxième visite, infixe) ou après (troisième visite, postfixe)." },
          { code: `from collections import deque


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
            file.append(n.droite)` },
          { text: "Le parcours en largeur ne se prête pas à une écriture récursive directe : il faut mémoriser les nœuds découverts mais pas encore traités, et les traiter dans l'ordre où on les a découverts (premier entré, premier sorti). C'est exactement une file. Avec une pile, on obtiendrait un parcours en profondeur (voir l'étape 1.8). La deque du module collections fournit append et popleft en temps constant ; list.pop(0) marcherait aussi mais coûte un décalage de toute la liste." },
          { text: "Pour comparer un affichage à une chaîne attendue, on capture ce qui est affiché. La petite fonction sortie ci-dessous resservira dans tout le TP." },
          { code: `import contextlib
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
# largeur   a b c d e f g h i j` },
          { text: "Complément : la suite des trois visites de la diapositive 22 s'obtient en affichant à chacune des trois places à la fois. C'est un bon exercice pour les élèves, qui y voient les trois parcours d'un coup." },
          { code: `def afficheTroisVisites(A):
    if A is not None:
        print(A.valeur, end=" ")        # 1re visite
        afficheTroisVisites(A.gauche)
        print(A.valeur, end=" ")        # 2e visite
        afficheTroisVisites(A.droite)
        print(A.valeur, end=" ")        # 3e visite


print(sortie(afficheTroisVisites, A))
# a b d d f f f d b b a c c e g i i i g j j j g e h h h e c a
assert sortie(afficheTroisVisites, A) == "a b d d f f f d b b a c c e g i i i g j j j g e h h h e c a"` }
        ]
      },
      {
        num: "1.4", title: "nombreFeuilles1 : combien d’appels récursifs ?",
        intro: "Exercice 1, question 4. La procédure de l'énoncé, traduite en Python. On cherche le nombre d'appels récursifs en fonction du nombre Ni de nœuds internes, on le démontre, puis on le vérifie avec un compteur.",
        code: `def nombreFeuilles1(A):
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


# À compléter : la même procédure, qui incrémente un compteur à chaque appel.
compteur = {"appels": 0}


def nombreFeuilles1Compte(A):
    """Comme nombreFeuilles1, mais compte ses appels dans compteur["appels"].

    >>> compteur["appels"] = 0
    >>> nombreFeuilles1Compte(A)
    4
    >>> compteur["appels"] - 1           # appels récursifs (sans l'appel initial)
    12
    """
    ...`,
        questions: [
          "Combien d'appels récursifs nombreFeuilles1(A) déclenche-t-il, en fonction du nombre Ni de nœuds internes ? Démontrez-le.",
          "Combien de ces appels portent sur un arbre vide ?",
          "Vérifiez la formule avec un compteur, sur A puis sur d'autres arbres."
        ],
        correction: [
          { text: "Réponse : nombreFeuilles1(A) déclenche exactement 2 × Ni(A) appels récursifs (2 × Ni + 1 appels en comptant l'appel initial). Pour A, Ni = 6 : 12 appels récursifs, 13 appels en tout." },
          { text: "Démonstration. Regardons qui lance chaque appel récursif. Un appel sur l'arbre vide ou sur une feuille n'en lance aucun : il renvoie 0 ou 1 directement. Un appel sur un nœud interne en lance exactement deux, un par sous-arbre, même si l'un des deux est vide. Enfin, chaque nœud n'est le sujet que d'un seul appel (celui que lance son parent, ou l'appel initial pour la racine). Le nombre d'appels récursifs est donc 2 fois le nombre de nœuds internes. Par récurrence structurelle, si R(A) désigne ce nombre : R(∅) = 0 et R(feuille) = 0 = 2 × 0 ; pour un nœud interne, R(A) = 2 + R(Ag) + R(Ad) = 2 + 2 Ni(Ag) + 2 Ni(Ad) = 2 Ni(A), puisque Ni(A) = 1 + Ni(Ag) + Ni(Ad)." },
          { text: "Appels sur l'arbre vide : les sous-arbres vides pendants d'un nœud interne. On a vu à l'étape 1.2 qu'il y a N + 1 champs à None en tout ; les feuilles en possèdent 2 × Nf, il en reste N + 1 − 2 Nf = Ni − Nf + 1 accrochés aux nœuds internes. Pour A : 6 − 4 + 1 = 3 appels inutiles (fils droit de b, fils gauche de c, fils gauche de d). Ce sont eux que nombreFeuilles2 va supprimer." },
          { code: `def nombreFeuilles1(A):
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
assert compteur["vides"] == nbInternes(A) - nombreFeuilles1(A) + 1 == 3` },
          { text: "Pour tester sur d'autres arbres, trois familles d'arbres de taille quelconque : le peigne (arbre filiforme, chaque nœud n'a qu'un fils gauche), l'arbre parfait de hauteur h (tous les niveaux pleins) et un arbre aléatoire à n nœuds (taille du sous-arbre gauche tirée au hasard). Elles resserviront aux étapes 1.6, 2.4 et 2.6." },
          { code: `import random


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
print("2 × Ni vérifié sur tous les arbres testés")` }
        ]
      },
      {
        num: "1.5", title: "nombreFeuilles2 : quatre cas, le moins de tests possible",
        intro: "Exercice 1, question 5. Cette fois, l'arbre est supposé non vide, et on ne s'appelle jamais sur un sous-arbre vide. On distingue les quatre cas de l'indication : a) feuille ; b) gauche vide, droit non vide ; c) droit vide, gauche non vide ; d) deux sous-arbres non vides.",
        code: `def nombreFeuilles2(A):
    """Nombre de feuilles de l'arbre binaire A, supposé NON VIDE.

    >>> nombreFeuilles2(A)
    4
    >>> nombreFeuilles2(Noeud('x'))
    1
    """
    ...`,
        questions: [
          "Écrivez nombreFeuilles2 en distinguant les quatre cas a), b), c), d).",
          "Quel est le nombre minimal de tests ? Justifiez qu'on ne peut pas faire mieux.",
          "Que se passe-t-il si on appelle nombreFeuilles2(None) ? Comment obtenir une fonction utilisable sur tout arbre ?"
        ],
        correction: [
          { text: "On teste d'abord le fils gauche, puis, dans chacune des deux branches, le fils droit. Chaque combinaison des deux réponses correspond à exactement un des quatre cas." },
          { code: `def nombreFeuilles2(A):
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
assert nombreFeuilles(None) == 0` },
          { text: "Nombre minimal de tests : 2 tests à chaque appel (et 3 tests écrits dans le code). On ne peut pas faire moins : il y a quatre cas à distinguer et un test n'a que deux issues ; un seul test ne sépare que deux situations, il en faut donc au moins deux (log₂ 4 = 2). La version ci-dessus les atteint : quel que soit le cas, exactement deux tests sont évalués." },
          { text: "Comparaison : nombreFeuilles1 fait 1 test sur un arbre vide, 3 tests sur une feuille (A vide ? gauche vide ? droit vide ?) et 2 ou 3 sur un nœud interne selon que le « et » court-circuite ou non ; en plus, elle fait des appels sur des arbres vides. nombreFeuilles2 ne teste jamais si A est vide : c'est la précondition « A non vide » qui le permet, et chaque appel récursif la respecte puisqu'on ne descend que dans un sous-arbre non vide." },
          { text: "Appelée sur None, nombreFeuilles2 lève AttributeError ('NoneType' object has no attribute 'gauche') : c'est la précondition violée. L'enveloppe nombreFeuilles traite l'arbre vide une fois pour toutes, à l'extérieur de la récursion." }
        ]
      },
      {
        num: "1.6", title: "Nombre d’appels de nombreFeuilles2 et comparaison",
        intro: "Exercice 1, question 6. On compte les appels récursifs de nombreFeuilles2 en fonction du nombre N de nœuds, puis on compare les deux procédures sur plusieurs arbres.",
        code: `def nombreFeuilles2Compte(A):
    """Comme nombreFeuilles2, mais compte ses appels dans compteur["appels"].

    >>> compteur["appels"] = 0
    >>> nombreFeuilles2Compte(A)
    4
    >>> compteur["appels"] - 1           # appels récursifs (sans l'appel initial)
    9
    """
    ...


# À compléter : un tableau N, Ni, Nf, appels de nombreFeuilles1, appels de nombreFeuilles2
# pour A, un peigne, un arbre parfait et quelques arbres aléatoires
# (fonctions taille, nbInternes, appelsRecursifs, peigne, parfait et aleatoire de la correction 1.4).`,
        questions: [
          "Combien d'appels récursifs nombreFeuilles2(A) déclenche-t-il, en fonction du nombre N de nœuds ?",
          "Comparez sur plusieurs arbres le nombre d'appels des deux procédures. Quand sont-ils égaux ? Quand l'écart est-il maximal ?"
        ],
        correction: [
          { text: "Réponse : N − 1 appels récursifs (N appels en tout). nombreFeuilles2 est appelée une fois et une seule sur chaque nœud de l'arbre, jamais sur un arbre vide : la racine par l'appel initial, chacun des N − 1 autres nœuds par son parent. Pour A : 9 appels récursifs, contre 12 pour nombreFeuilles1." },
          { code: `def nombreFeuilles2Compte(A):
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
    assert a1 - a2 == Ni - Nf + 1 >= 0` },
          { code: `# Sortie obtenue :
# arbre                N    Ni    Nf    nf1    nf2
# arbre A             10     6     4     12      9
# peigne(10)          10     9     1     18      9
# parfait(3)          15     7     8     14     14
# aléatoire(20)       20    11     9     22     19
# aléatoire(100)     100    67    33    134     99
# aléatoire(1000)   1000   661   339   1322    999` },
          { text: "Écart : nombreFeuilles1 fait 2 Ni appels, nombreFeuilles2 en fait N − 1 = Ni + Nf − 1. La différence vaut Ni − Nf + 1 : c'est exactement le nombre d'appels de nombreFeuilles1 sur un sous-arbre vide (étape 1.4). Elle n'est jamais négative, car dans tout arbre binaire non vide Nf ≤ Ni + 1." },
          { text: "Égalité lorsque Nf = Ni + 1, c'est-à-dire lorsque chaque nœud interne a deux fils : l'arbre est localement complet (la notion de l'exercice 3), comme l'arbre parfait du tableau. Écart maximal pour un arbre filiforme, comme le peigne : une seule feuille, Ni = N − 1, donc nombreFeuilles1 fait 2(N − 1) appels, deux fois plus que nombreFeuilles2. Dans tous les cas les deux procédures restent linéaires en N : on gagne au mieux un facteur 2, pas un ordre de grandeur." }
        ]
      },
      {
        num: "1.7", title: "copieArbre : une copie sans nœud commun",
        intro: "Exercice 1, question 7. Copier un arbre, c'est créer un nouveau nœud pour chaque nœud de A. Une simple affectation B = A ne copie rien : elle crée un second nom pour le même arbre. On vérifie avec l'opérateur is qu'aucun nœud n'est partagé.",
        code: `def copieArbre(A):
    """Renvoie une copie de A : même forme, mêmes valeurs, aucun nœud commun.

    >>> B = copieArbre(A)
    >>> parenthese(B) == parenthese(A)
    True
    >>> B is A
    False
    >>> copieArbre(None) is None
    True
    """
    ...


def noeuds(A):
    """Liste des nœuds (des objets Noeud) de A, en ordre préfixe."""
    ...


def aucunNoeudCommun(A, B):
    """True si aucun objet Noeud n'appartient à la fois à A et à B (test avec is)."""
    ...`,
        questions: [
          "Écrivez copieArbre(A), récursive.",
          "Écrivez noeuds(A) et aucunNoeudCommun(A, B), qui compare les nœuds avec is, et vérifiez la copie.",
          "Pourquoi B = A et Noeud(A.valeur, A.gauche, A.droite) ne sont-ils pas des copies ?"
        ],
        correction: [
          { text: "Même schéma que les parcours : l'arbre vide se copie en l'arbre vide ; sinon on crée un nouveau nœud dont les fils sont les copies des sous-arbres. C'est un parcours postfixe : les fils sont copiés avant que leur parent soit créé." },
          { code: `def copieArbre(A):
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
assert parenthese(A) == "a(b(d(∅,f),∅),c(∅,e(g(i,j),h)))"` },
          { text: "Pourquoi is et pas == ? Pour la classe Noeud, qui ne définit pas __eq__, == compare aussi les identités ; mais is dit explicitement ce qu'on veut tester : « est-ce le même objet en mémoire ? ». C'est le lien avec la fiche « Valeur vs Référence & gestion de la mémoire » (bloc0)." },
          { text: "aucunNoeudCommun compare chaque nœud de A à chaque nœud de B : N² comparaisons, sans importance ici. Complément pour aller plus vite : comparer les ensembles {id(x) for x in noeuds(A)} et {id(y) for y in noeuds(B)}, qui sont disjoints exactement quand aucun nœud n'est partagé (tant que les deux arbres existent, deux objets distincts ont des id distincts)." },
          { text: "La copie est « profonde » pour la structure, pas pour les valeurs : les valeurs sont partagées. Avec des chaînes ou des entiers, non modifiables, cela ne pose aucun problème ; avec des valeurs modifiables (des listes), il faudrait aussi les copier." }
        ]
      },
      {
        num: "1.8", title: "affichePrefixeIteratif : le parcours préfixe avec une pile",
        intro: "Exercice 1, question 8. On remplace la récursivité par une pile explicite, qui mémorise les nœuds en attente de traitement. On initialise la pile avec la racine, puis, tant qu'elle n'est pas vide, on dépile le sommet, on l'affiche et on empile ses fils non vides. Avant d'écrire la procédure, on exécute l'algorithme à la main sur le sous-arbre de racine e.",
        code: `def affichePrefixeIteratif(A, trace=False):
    """Affiche les nœuds de A dans l'ordre préfixe, sans récursivité, avec une pile.
    Si trace vaut True, affiche aussi le contenu de la pile à chaque tour.

    >>> affichePrefixeIteratif(A)        # doctest: +NORMALIZE_WHITESPACE
    a b d f c e g i j h
    >>> affichePrefixeIteratif(None)
    """
    ...`,
        questions: [
          "Exécutez l'algorithme à la main sur le sous-arbre de racine e (5 nœuds) : contenu de la pile à chaque tour.",
          "Dans quel ordre faut-il empiler les deux fils ? Que se passe-t-il dans l'autre ordre ?",
          "Écrivez affichePrefixeIteratif et vérifiez qu'il donne le même affichage qu'affichePrefixe."
        ],
        correction: [
          { text: "Le dernier nœud empilé est le premier dépilé. Pour que le sous-arbre gauche soit traité avant le droit, il faut donc empiler le fils droit d'abord, puis le fils gauche : le gauche se retrouve au sommet." },
          { code: `# Exécution à la main sur le sous-arbre de racine e (sommet de la pile à droite) :
#
#            e
#          /   \\
#         g     h
#        / \\
#       i   j
#
# tour  pile avant      on dépile   on affiche   on empile (droit puis gauche)
#  1    [e]             e           e            h, g
#  2    [h, g]          g           g            j, i
#  3    [h, j, i]       i           i            -
#  4    [h, j]          j           j            -
#  5    [h]             h           h            -
#       []              fin                      affichage : e g i j h` },
          { code: `def affichePrefixeIteratif(A, trace=False):
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
assert sortie(affichePrefixeMauvaisOrdre, A) == "a c e h g j i b d f"` },
          { text: "Dans l'autre ordre (gauche empilé d'abord), le fils droit est traité avant le gauche : on obtient le parcours « racine, droite, gauche », c'est-à-dire le préfixe de l'arbre miroir. Sur A, cela donnerait a c e h g j i b d f." },
          { text: "La pile explicite joue le rôle de la pile des appels de la version récursive : chaque nœud empilé est un appel « en attente ». Remplacer la pile par une file (on retire le plus ancien) et empiler le gauche d'abord donne exactement le parcours en largeur de l'étape 1.3 : les deux parcours ne diffèrent que par la structure d'attente. C'est le lien avec la fiche « Piles et files : LIFO, FIFO et applications » (bloc4)." }
        ]
      },
      {
        num: "2.1", title: "Profondeur et niveaux des nœuds de A",
        intro: "Exercice 2, question 1. Rappel du cours (diapositive 12) : la profondeur p(x) d'un nœud x est la longueur du chemin allant de la racine jusqu'à x, c'est-à-dire le nombre d'arêtes à descendre. Définition inductive : la racine est de profondeur 0, et si x est le parent de y alors p(y) = p(x) + 1. Le niveau i est formé de tous les nœuds de profondeur i.",
        code: `#                        a
#                /               \\
#               b                 c
#             /   \\             /   \\
#            d     ∅           ∅     e
#          /   \\                   /    \\
#         ∅     f                 g      h
#              / \\              /   \\   / \\
#             ∅   ∅            i     j ∅   ∅
#                             / \\   / \\
#                            ∅   ∅ ∅   ∅
#
# Nœuds de chaque niveau de A (à compléter) :
niveaux = {0: "...", 1: "...", 2: "...", 3: "...", 4: "...", 5: "..."}`,
        questions: [
          "Quelle est la profondeur de la racine ?",
          "Donnez les nœuds de A de niveau 0, 1, 2, 3, 4 et 5.",
          "Quelle est la hauteur de A ? Que dire du niveau 5 ?"
        ],
        correction: [
          { text: "La racine est de profondeur 0 : le chemin qui va de la racine à elle-même est (a), qui a un seul nœud, donc une longueur 1 − 1 = 0 (un chemin de k nœuds a pour longueur k − 1, diapositive 11)." },
          { code: `niveaux = {0: "a",
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
    return 1 + max(hauteur(B.gauche), hauteur(B.droite))` },
          { text: "La hauteur de A est la plus grande profondeur d'un nœud : h(A) = 4, atteinte par i et j. Le niveau 5 est donc vide. La question est un petit piège volontaire : il faut savoir répondre « aucun nœud », et le programme de l'étape 2.2 doit, lui aussi, ne rien afficher pour k = 5 sans provoquer d'erreur." }
        ]
      },
      {
        num: "2.2", title: "afficheNiveau(A, k) : les nœuds d’un niveau donné",
        intro: "Exercice 2, question 2. Indication du TD : k est la longueur du chemin qu'il reste à parcourir pour atteindre un nœud de profondeur k. Quand k vaut 0, on est sur un nœud du niveau cherché. Quand on descend dans un sous-arbre, il reste un pas de moins à faire.",
        code: `def afficheNiveau(A, k):
    """Affiche, de gauche à droite, les nœuds de profondeur k de l'arbre A.

    >>> afficheNiveau(A, 3)              # doctest: +NORMALIZE_WHITESPACE
    f g h
    >>> afficheNiveau(A, 5)              # niveau vide : rien n'est affiché
    """
    ...`,
        questions: [
          "Écrivez afficheNiveau(A, k), récursive. Quels sont les cas de base ?",
          "Affichez tous les niveaux de A, de 0 à 5, et comparez avec l'étape 2.1.",
          "Combien d'appels coûte afficheNiveau(A, k) ? En déduire le coût d'un parcours en largeur obtenu en appelant afficheNiveau pour k = 0, 1, …, h(A)."
        ],
        correction: [
          { text: "Deux cas de base : l'arbre vide (rien à afficher, quel que soit k) et k = 0 (on est sur le niveau cherché : on affiche la racine et on ne descend pas plus bas). Sinon, on cherche le niveau k − 1 dans chacun des deux sous-arbres, d'abord le gauche pour respecter l'ordre de gauche à droite." },
          { code: `def afficheNiveau(A, k):
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
# niveau 5 :` },
          { text: "Coût : afficheNiveau(A, k) visite tous les nœuds de profondeur inférieure ou égale à k (plus quelques arbres vides), et pas les autres. Enchaîner les niveaux 0 à h(A) donne bien le parcours en largeur, mais en revisitant les premiers niveaux à chaque fois : sur un peigne de N nœuds, cela fait de l'ordre de N²/2 visites, contre N pour la version avec une file de l'étape 1.3. C'est un bon argument à donner aux élèves pour justifier la file." },
          { code: `def largeurParNiveaux(A):
    for k in range(hauteur(A) + 1):
        afficheNiveau(A, k)


assert sortie(largeurParNiveaux, A) == sortie(afficheLargeur, A) == largeur` }
        ]
      },
      {
        num: "2.3", title: "Longueur de cheminement de A, à la main",
        intro: "Exercice 2, question 3. La longueur de cheminement LC(A) est la somme des profondeurs de tous les nœuds de A (cours, diapositive 13). À la main, le plus sûr est de regrouper les nœuds par niveau : chaque nœud du niveau k apporte k.",
        code: `# LC(A) = somme, sur tous les nœuds x de A, de p(x)
# Niveau par niveau (étape 2.1) : à compléter
LC_A = ...`,
        questions: [
          "Calculez LC(A) à la main.",
          "Recalculez-la par programme, sans encore écrire LC : en comptant les nœuds de chaque niveau."
        ],
        correction: [
          { text: "Regroupement par niveaux : 0 × 1 (a) + 1 × 2 (b, c) + 2 × 2 (d, e) + 3 × 3 (f, g, h) + 4 × 2 (i, j) = 0 + 2 + 4 + 9 + 8 = 23." },
          { code: `#  niveau k   nœuds      nombre   contribution k × nombre
#     0       a            1         0
#     1       b c          2         2
#     2       d e          2         4
#     3       f g h        3         9
#     4       i j          2         8
#                                  ----
#                          LC(A) =  23
LC_A = 0 * 1 + 1 * 2 + 2 * 2 + 3 * 3 + 4 * 2
assert LC_A == 23` },
          { text: "Vérification par programme : on adapte afficheNiveau pour qu'elle compte au lieu d'afficher, puis on fait la somme des k × (nombre de nœuds au niveau k). C'est une méthode différente de celle de l'étape 2.4, ce qui en fait un bon contrôle croisé." },
          { code: `def compteNiveau(A, k):
    """Nombre de nœuds de profondeur k dans A."""
    if A is None:
        return 0
    if k == 0:
        return 1
    return compteNiveau(A.gauche, k - 1) + compteNiveau(A.droite, k - 1)


def LCparNiveaux(A):
    return sum(k * compteNiveau(A, k) for k in range(hauteur(A) + 1))


print([compteNiveau(A, k) for k in range(6)], LCparNiveaux(A))    # [1, 2, 2, 3, 2, 0] 23
assert LCparNiveaux(A) == LC_A == 23` }
        ]
      },
      {
        num: "2.4", title: "LC(A) avec la procédure auxiliaire LCaux",
        intro: "Exercice 2, question 4. LCaux(B, p) calcule, pour un sous-arbre B de A dont la racine est à la profondeur p dans A, la somme des profondeurs (dans A) des nœuds de B. La racine de B apporte p, et ses deux sous-arbres ont leur racine à la profondeur p + 1.",
        code: `def LCaux(B, p):
    """Somme des profondeurs des nœuds de B, sachant que la racine de B
    est à la profondeur p.

    >>> LCaux(A.droite, 1)               # c, e, g, h, i, j : 1+2+3+3+4+4
    17
    """
    ...


def LC(A):
    """Longueur de cheminement de A : somme des profondeurs de tous ses nœuds.

    >>> LC(A)
    23
    >>> LC(None), LC(Noeud('x'))
    (0, 0)
    """
    ...`,
        questions: [
          "Écrivez LCaux(B, p) puis LC(A).",
          "Pourquoi a-t-on besoin d'un paramètre supplémentaire p ?",
          "Complément : démontrez que LC(A) = LC(Ag) + LC(Ad) + N(A) − 1 et déduisez-en une version sans paramètre auxiliaire."
        ],
        correction: [
          { code: `def LCaux(B, p):
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


assert LC(A) == LC_A == 23` },
          { text: "Le paramètre p transporte une information qui vient d'en haut : la profondeur d'un nœud dépend du chemin depuis la racine de A, pas seulement du sous-arbre B. Un appel récursif sur B seul ne peut pas la deviner : on la lui transmet. C'est le schéma classique de la fonction auxiliaire avec un accumulateur descendant ; LC se contente de lancer LCaux avec p = 0, la profondeur de la racine." },
          { text: "Complément. Dans A, chaque nœud de Ag est un cran plus profond que dans Ag pris seul ; même chose pour Ad. Donc LC(A) = 0 (la racine) + (LC(Ag) + N(Ag)) + (LC(Ad) + N(Ad)) = LC(Ag) + LC(Ad) + N(A) − 1, puisque N(Ag) + N(Ad) = N(A) − 1. Pour A : LC(Ag) = 0 + 1 + 2 = 3 (b, d, f), LC(Ad) = 0 + 1 + 2 + 2 + 3 + 3 = 11 (c, e, g, h, i, j), et 3 + 11 + 10 − 1 = 23. Cette version recalcule les tailles ; on peut renvoyer le couple (LC, N) pour rester linéaire." },
          { code: `def LCetTaille(A):
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
    assert LC(B) == LCparNiveaux(B) == LCetTaille(B)[0]` }
        ]
      },
      {
        num: "2.5", title: "Longueur de cheminement externe de A, à la main",
        intro: "Exercice 2, question 5. La longueur de cheminement externe LCE(A) est la somme des profondeurs des feuilles de A seulement ; autrement dit, la somme des longueurs de toutes les branches (chemins de la racine à une feuille).",
        code: `# LCE(A) = somme, sur toutes les feuilles x de A, de p(x)
# Feuilles de A et leurs profondeurs : à compléter
LCE_A = ...`,
        questions: [
          "Listez les feuilles de A et leur profondeur, puis calculez LCE(A).",
          "Retrouvez le résultat en listant les branches de A."
        ],
        correction: [
          { text: "Les feuilles de A sont f, h, i et j. Leurs profondeurs : f et h au niveau 3, i et j au niveau 4. LCE(A) = 3 + 3 + 4 + 4 = 14." },
          { code: `#  branche (racine -> feuille)   longueur = profondeur de la feuille
#  a b d f                          3
#  a c e g i                        4
#  a c e g j                        4
#  a c e h                          3
#                                  ---
#                       LCE(A) =   14
LCE_A = 3 + 4 + 4 + 3
assert LCE_A == 14` },
          { text: "Attention aux nœuds qui n'ont qu'un fils (b, c, d) : ce ne sont pas des feuilles, ils ne comptent pas, même si l'un de leurs sous-arbres est vide. C'est l'erreur la plus fréquente, et elle reviendra dans le code de l'étape 2.6 (le cas « arbre vide » ne doit pas être confondu avec le cas « feuille »)." }
        ]
      },
      {
        num: "2.6", title: "LCE(A) récursive avec LCEaux ; sommes et appels",
        intro: "Exercice 2, question 6. Même schéma qu'à l'étape 2.4, mais seules les feuilles apportent leur profondeur. On compte ensuite le nombre de sommes et d'appels récursifs en fonction du nombre Ni de nœuds internes.",
        code: `def LCEaux(B, p):
    """Somme des profondeurs des feuilles de B, la racine de B étant à la profondeur p.

    >>> LCEaux(A.droite, 1)              # feuilles i, j, h : 4 + 4 + 3
    11
    """
    ...


def LCE(A):
    """Longueur de cheminement externe de A : somme des profondeurs de ses feuilles.

    >>> LCE(A)
    14
    >>> LCE(None), LCE(Noeud('x'))
    (0, 0)
    """
    ...`,
        questions: [
          "Écrivez LCEaux(B, p) puis LCE(A).",
          "Combien de sommes et combien d'appels récursifs le calcul de LCE(A) effectue-t-il, en fonction du nombre Ni de nœuds internes ? Vérifiez avec des compteurs."
        ],
        correction: [
          { text: "Trois cas : arbre vide (0), feuille (elle apporte sa profondeur p), nœud interne (somme des contributions de ses deux sous-arbres, dont la racine est à la profondeur p + 1)." },
          { code: `def LCEaux(B, p):
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


assert LCE(A) == LCE_A == 14` },
          { text: "Décompte. Les appels sur un arbre vide ou une feuille ne font ni somme ni appel. Chaque appel sur un nœud interne fait exactement 2 appels récursifs et 1 somme (le + entre les deux résultats). Au total : Ni sommes et 2 Ni appels récursifs de LCEaux, sans compter l'appel LCEaux(A, 0) lancé par LCE ; ces 2 Ni appels portent sur chacun des N − 1 nœuds autres que la racine, plus Ni − Nf + 1 sous-arbres vides. Pour A, Ni = 6 : 12 appels récursifs et 6 sommes. Si l'on compte aussi les incréments p + 1 comme des additions, il faut en ajouter 2 Ni (1 seule par nœud interne si on calcule p + 1 une fois dans une variable)." },
          { code: `compteLCE = {"appels": 0, "sommes": 0}


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
    assert valeur == LCE(B) and appels == 2 * Ni and sommes == Ni` },
          { text: "Comme pour nombreFeuilles1, une partie de ces appels porte sur des arbres vides (Ni − Nf + 1 d'entre eux, 3 pour A). On peut les éviter avec la technique de nombreFeuilles2 (ne descendre que dans les sous-arbres non vides) : on tombe alors à N − 1 appels récursifs, et à Nf − 1 sommes : une par nœud à deux fils, et un arbre binaire non vide a toujours exactement Nf − 1 nœuds à deux fils (pour A : a, e, g)." }
        ]
      },
      {
        num: "2.7", title: "LCEIt : version itérative avec une file de couples",
        intro: "Exercice 2, question 7. On fait un parcours en largeur de A avec une file, mais on enfile des couples (nœud, profondeur). Un compteur, initialisé à 0, reçoit la profondeur de chaque feuille rencontrée.",
        code: `from collections import deque


def LCEIt(A):
    """Longueur de cheminement externe de A, sans récursivité :
    parcours en largeur avec une file de couples (nœud, profondeur).

    >>> LCEIt(A)
    14
    >>> LCEIt(None)
    0
    """
    ...`,
        questions: [
          "Écrivez LCEIt(A) avec une file (collections.deque) de couples (nœud, profondeur).",
          "Faites tourner la file à la main sur A : dans quel ordre les feuilles sont-elles rencontrées ?",
          "Pourquoi faut-il stocker la profondeur avec le nœud ?"
        ],
        correction: [
          { code: `from collections import deque


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
    assert LCEIt(B) == LCE(B)` },
          { text: "Déroulé sur A (tête de la file à gauche) : (a,0) ; (b,1) (c,1) ; (c,1) (d,2) ; (d,2) (e,2) ; (e,2) (f,3) ; (f,3) (g,3) (h,3) ; f est une feuille, total = 3 ; (g,3) (h,3) ; (h,3) (i,4) (j,4) ; h feuille, total = 6 ; (i,4) (j,4) ; i feuille, total = 10 ; j feuille, total = 14 ; la file est vide. Les feuilles sont rencontrées dans l'ordre du parcours en largeur : f, h, i, j." },
          { text: "La profondeur d'un nœud n'est pas stockée dans le nœud (la classe Noeud n'a que valeur, gauche et droite) et ne se déduit pas du nœud seul. On la calcule au moment où on découvre le nœud, à partir de celle de son parent (p + 1, la définition inductive du cours), et on la range avec lui dans la file : c'est le rôle que jouait le paramètre p dans LCEaux. Le même couple (nœud, profondeur) dans une pile au lieu d'une file marcherait aussi : pour une somme, l'ordre de visite est indifférent." }
        ]
      },
      {
        num: "3.1", title: "L’arbre de l’expression (((a ∗ c) + (d ∗ b)) ∗ (b + a))",
        intro: "Exercice 3, question 1. Une expression arithmétique est une lettre, ou (E1 + E2), ou (E1 ∗ E2). Son arbre a une lettre à chaque feuille et un opérateur à chaque nœud interne, qui a toujours deux fils : c'est un arbre binaire localement complet. En Python, on note l'opérateur ∗ avec le caractère ordinaire *.",
        code: `# Dessinez l'arbre de (((a * c) + (d * b)) * (b + a)), puis construisez-le :
E = ...


def estLocalementComplet(B):
    """True si chaque nœud de B qui n'est pas une feuille a deux fils.

    >>> estLocalementComplet(E)
    True
    >>> estLocalementComplet(A)
    False
    """
    ...`,
        questions: [
          "Dessinez l'arbre de l'expression (((a ∗ c) + (d ∗ b)) ∗ (b + a)). Quelle est sa racine ?",
          "Construisez-le en Python et vérifiez qu'il est localement complet.",
          "Que donnent les parcours préfixe, infixe et postfixe de cet arbre ?"
        ],
        correction: [
          { text: "La racine est l'opérateur « principal », celui qui est entouré par les parenthèses les plus extérieures seulement : le ∗ du milieu. Son fils gauche est l'arbre de ((a ∗ c) + (d ∗ b)), son fils droit celui de (b + a). On recommence dans chaque sous-expression." },
          { code: `#                  *
#              /       \\
#            +           +
#          /   \\        / \\
#         *     *      b   a
#        / \\   / \\
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
assert appelsRecursifs(nombreFeuilles1Compte, E) == appelsRecursifs(nombreFeuilles2Compte, E) == 10` },
          { text: "L'arbre a 11 nœuds : 5 opérateurs (nœuds internes) et 6 lettres (feuilles). Dans un arbre localement complet non vide on a toujours Nf = Ni + 1, et c'est exactement le cas où nombreFeuilles1 et nombreFeuilles2 font le même nombre d'appels (étape 1.6) : 10 ici." },
          { text: "Les trois parcours donnent trois notations de la même expression. Le préfixe donne la notation polonaise (opérateur avant ses opérandes), le postfixe la notation polonaise inverse, celle des calculatrices à pile : on l'évalue de gauche à droite avec une pile, sans aucune parenthèse. L'infixe redonne l'écriture usuelle, mais sans les parenthèses, et a ∗ c + d ∗ b ∗ b + a ne se lit pas comme l'expression de départ : pour la retrouver, il faut ajouter une parenthèse ouvrante à la première visite de chaque nœud interne et une fermante à la troisième (fonction chaineExp de l'étape 3.3)." }
        ]
      },
      {
        num: "3.2", title: "valeurExp(E, V) : évaluer l’expression",
        intro: "Exercice 3, question 2. Une valuation V associe un entier naturel à chaque lettre. La valeur V(E) se définit en suivant le schéma d'induction : V(lettre) est donnée, V((E1 + E2)) = V(E1) + V(E2) et V((E1 ∗ E2)) = V(E1) × V(E2). En Python, V peut être un dictionnaire ou une fonction ; on accepte les deux.",
        code: `def valeurExp(E, V):
    """Valeur de l'expression d'arbre E pour la valuation V.
    V est un dictionnaire {lettre: entier} ou une fonction lettre -> entier.

    >>> valeurExp(E, {'a': 1, 'b': 2, 'c': 3, 'd': 4})
    33
    >>> valeurExp(E, lambda lettre: 2)
    32
    """
    ...`,
        questions: [
          "Écrivez valeurExp(E, V), récursive, pour V dictionnaire ou fonction.",
          "Calculez à la main la valeur de E pour a = 1, b = 2, c = 3, d = 4, puis pour la valuation constante égale à 2.",
          "Quel parcours valeurExp effectue-t-elle ?"
        ],
        correction: [
          { code: `def valeurExp(E, V):
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
assert valeurExp(Noeud('z'), {'z': 7}) == 7` },
          { text: "À la main avec a = 1, b = 2, c = 3, d = 4 : (a ∗ c) = 3, (d ∗ b) = 8, leur somme vaut 11, (b + a) = 3, et 11 × 3 = 33. Avec la valuation constante 2 : 4 + 4 = 8, puis 8 × 4 = 32." },
          { text: "valeurExp est un parcours postfixe : on ne peut appliquer l'opérateur d'un nœud qu'après avoir évalué ses deux sous-arbres (troisième visite). L'arbre étant localement complet et non vide, on n'a pas de cas « arbre vide » : un nœud est soit une feuille, soit un opérateur avec deux fils." },
          { text: "Le test callable(V) permet d'accepter les deux formes. Le TD parle d'une fonction V : A → ℕ ; le dictionnaire est la façon la plus naturelle de donner une fonction sur un ensemble fini en Python, et les élèves de Première le connaissent bien. Avec un dictionnaire incomplet, une lettre absente lève KeyError." }
        ]
      },
      {
        num: "3.3", title: "arbreExp : construire l’arbre en lisant l’expression caractère par caractère",
        intro: "Exercice 3, question 3. La procédure lit l'expression un caractère à la fois et construit l'arbre en suivant le schéma d'induction : si le caractère lu est une lettre, c'est une feuille ; si c'est une parenthèse ouvrante, on lit récursivement E1, puis l'opérateur, puis récursivement E2, puis la parenthèse fermante. Ici, au lieu du clavier, la procédure lit dans un itérateur de caractères (par exemple iter(\"(a+b)\")), ce qui la rend testable.",
        code: `LETTRES = "abcdefghijklmnopqrstuvwxyz"


def lireCar(source):
    """Prochain caractère de l'itérateur source, en sautant les espaces ;
    renvoie '' quand il n'y a plus rien à lire."""
    ...


def arbreExp(source):
    """Lit une expression arithmétique dans l'itérateur de caractères source
    et renvoie son arbre. Lève ValueError si l'expression est incorrecte.

    >>> parenthese(arbreExp(iter("((a*c)+b)")))
    '+(*(a,c),b)'
    """
    ...


def arbreExpChaine(texte):
    """Arbre de l'expression contenue dans la chaîne texte (rien ne doit rester après).

    >>> valeurExp(arbreExpChaine("(((a*c)+(d*b))*(b+a))"), {'a': 1, 'b': 2, 'c': 3, 'd': 4})
    33
    >>> arbreExpChaine("(a+b))")
    Traceback (most recent call last):
    ...
    ValueError: caractères en trop après l'expression : ')'
    """
    ...`,
        note: "Adaptation de l'énoncé : le TD demande une lecture « au clavier, caractère par caractère ». Pour que la procédure soit testable (doctests, notebook, correction automatique), elle lit ici dans un itérateur de caractères passé en paramètre, par exemple iter(\"(a+b)\"). Le principe est identique ; la dernière réponse de la correction montre comment la brancher sur le clavier. On tolère aussi les espaces, que l'énoncé écrit pour la lisibilité. On a choisi l'option « avec contrôle d'erreur » : toute expression incorrecte lève ValueError avec un message précis.",
        questions: [
          "Écrivez lireCar puis arbreExp, récursive, qui lit l'expression caractère par caractère.",
          "Ajoutez un contrôle d'erreur : quelles expressions incorrectes faut-il détecter, et où ?",
          "Écrivez chaineExp(E), la fonction réciproque, et vérifiez que chaineExp(arbreExpChaine(s)) redonne s.",
          "Comment revenir à une vraie lecture au clavier ?"
        ],
        correction: [
          { text: "Le programme suit la grammaire : chaque appel de arbreExp lit exactement une expression, ni plus ni moins, et laisse l'itérateur juste après elle. C'est ce qui permet à l'appel qui lit (E1 op E2) d'enchaîner naturellement la lecture de E1, de l'opérateur, de E2 et de la parenthèse fermante. Le contrôle d'erreur se fait à chaque caractère attendu : une lettre ou « ( » au début d'une expression, « + » ou « * » après E1, « ) » après E2, et rien après l'expression complète." },
          { code: `LETTRES = "abcdefghijklmnopqrstuvwxyz"


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
# '()'       refusée : lettre ou parenthèse ouvrante attendue, lu : ')'` },
          { text: "Piège Python à signaler aux élèves : en fin de lecture, lireCar renvoie la chaîne vide, et '' in LETTRES vaut True (la chaîne vide est sous-chaîne de toute chaîne). Sans le test car != '', une expression tronquée créerait une feuille vide au lieu de lever une erreur. Pour l'opérateur, le problème ne se pose pas : on le compare au tuple ('+', '*'), dont la chaîne vide ne fait pas partie." },
          { text: "Retour au clavier, comme dans l'énoncé : iter(lambda: sys.stdin.read(1), '') est un itérateur qui lit l'entrée standard un caractère à la fois, jusqu'à la fin. On peut donc écrire def arbreExpClavier(): return arbreExp(iter(lambda: sys.stdin.read(1), '')) après import sys. La logique de lecture est inchangée : seule la source des caractères diffère. Plus simple pour une classe : arbreExpChaine(input(\"Expression : \")), qui lit une ligne puis la parcourt caractère par caractère." },
          { text: "Complément : arbreExp est un analyseur « par descente récursive », la technique utilisée par les compilateurs et interpréteurs pour construire l'arbre syntaxique d'un programme (cours, diapositive 5). Elle est possible ici parce que l'expression est complètement parenthésée : le premier caractère suffit toujours à savoir quel cas de la définition inductive s'applique." }
        ]
      }
    ]
  },
  // ── TP — Les algorithmes gloutons ──
  {
    id: "tp-gloutons", bloc: "bloc2", jour: "En ligne — 24 septembre 2026 (FDIU)",
    theme: "Algorithmes gloutons",
    title: "TP — Les algorithmes gloutons",
    type: 'tp',
    basthonUrl: "https://notebook.basthon.fr/?from=https://raw.githubusercontent.com/LANSIG/NSI/refs/heads/main/FDIU%20-%20Les%20algorithmes%20gloutons.ipynb",
    notebook: "FDIU_algorithmes_gloutons.ipynb",
    intro: "Un algorithme glouton résout un problème d'optimisation en appliquant toujours la même règle locale, sans jamais revenir en arrière. Simple à écrire, rapide — mais sans garantie d'optimalité. Ce TP le met à l'épreuve sur quatre problèmes : conversion en binaire, rendu de monnaie, sac à dos et planning de conférenciers, puis le compare à la recherche exhaustive. Les corrections sont désormais celles du formateur (FDIU), données lors de la séance du 1er octobre : son code est reproduit tel quel, aux retouches signalées près (print ajoutés autour des expressions nues, lignes propres à Basthon retirées, docstrings répétées omises), et il a été exécuté. Quand une cellule de réponse est restée vide dans sa correction, notre réponse est donnée et signalée comme telle ; les éléments qui commencent par « Complément : » viennent de notre première correction ; les erreurs repérées dans le code ou les encadrés officiels sont signalées et corrigées. Ouvre le notebook dans Basthon pour travailler, cherche par toi-même, puis déplie la correction.",
    steps: [
      {
        num: "1", title: "Décimal vers binaire sur 16 bits",
        intro: "Premier problème glouton, le plus simple : à chaque rang, on prend le plus grand poids qui « tient » encore.",
        code: `def dec_vers_bin_16b(n):
    # n est un entier de 0 a 65535, la fonction renvoie une chaine de 16 caracteres
    # TODO : pour chaque rang i de 15 a 0
    #          si n >= 2**i : ajouter "1" au resultat et retirer 2**i de n
    #          sinon        : ajouter "0"
    ...

print(dec_vers_bin_16b(42))     # attendu : 0000000000101010`,
        note: "L'énoncé du notebook écrit « si n >= i² » : c'est une coquille. Le poids du rang i vaut 2 puissance i (2**i), pas i au carré. Avec i², la conversion serait fausse dès le rang 3. La correction du formateur le confirme : son énoncé corrigé écrit « si n >= 2 ** i : ajouter \"1\" au résultat, retirer 2 ** i de n ».",
        questions: [
          "Écrire la fonction dec_vers_bin_16b.",
          "En quoi cet algorithme est-il glouton ? Quelle est la règle locale, et pourquoi ne revient-on jamais en arrière ?",
          "Pourquoi le résultat est-il ici toujours optimal, contrairement aux problèmes suivants ?"
        ],
        correction: [
          { text: "Correction du formateur. Il suit exactement l'algorithme de l'énoncé, en ajoutant une précondition : l'assert refuse tout n hors de l'intervalle 0 à 65535, qui ne tiendrait pas sur 16 bits. Il teste sur 65535 et 10 (les appels du notebook sont ici entourés de print ; le test sur 42 est celui de l'énoncé du site)." },
          { code: `def dec_vers_bin_16b(n):
    assert 0 <= n <= 65535
    res = ''

    for i in range(15, -1 , -1):
        if n >= 2 ** i:
            res += '1'
            n -= 2 ** i
        else:
            res += '0'
    return res

print(dec_vers_bin_16b(65535))   # 1111111111111111
print(dec_vers_bin_16b(10))      # 0000000000001010
print(dec_vers_bin_16b(42))      # 0000000000101010` },
          { text: "Notre correction (le formateur n'a pas rédigé de réponse aux deux questions de réflexion) : la règle locale est « prendre le plus grand poids disponible qui tient ». Elle est appliquée seize fois de suite, et une fois qu'un bit est écrit il n'est jamais remis en cause : c'est exactement la définition d'un algorithme glouton." },
          { text: "Notre correction, suite : ici le glouton est optimal, et ce n'est pas un hasard. Chaque poids vaut plus que la somme de tous les poids inférieurs (2**i > 2**(i-1) + ... + 2 + 1). Ne pas prendre un poids qui tient serait donc irrattrapable. C'est cette propriété qui manquera au système monétaire non canonique de l'étape 4." }
        ]
      },
      {
        num: "2", title: "Décimal vers binaire sans limite",
        intro: "Même stratégie, mais sans savoir à l'avance combien de bits seront nécessaires.",
        code: `def dec_vers_bin(n):
    # TODO : chercher d'abord le plus grand poids utile, puis appliquer la meme regle
    ...

def dec_vers_bin_while(n):
    # TODO : une version avec une boucle while (cellule « Avec un while ? » du notebook)
    #        au choix : chercher a chaque tour la plus grande puissance de 2 qui tient,
    #        ou proceder par divisions successives par 2
    ...

for n in (0, 5, 42, 1000):
    print(n, dec_vers_bin(n), dec_vers_bin_while(n))`,
        questions: [
          "Écrire dec_vers_bin, qui n'a plus de borne supérieure.",
          "Écrire une version avec un while (le formateur cherche la plus grande puissance de 2 qui tient ; les divisions successives par 2 sont une autre possibilité).",
          "Quel cas particulier faut-il traiter à part dans les deux versions ?"
        ],
        correction: [
          { text: "Correction du formateur. Sa cellule dec_vers_bin « stratégie gloutonne, sans limite » est restée vide (voir notre correction plus bas). Pour « Avec un while ? », il écrit une fonction auxiliaire qui donne l'exposant de la plus grande puissance de 2 inférieure ou égale à n, puis place directement les \"1\" dans une liste de caractères. Il réutilise le nom dec_vers_bin." },
          { code: `from math import log2, floor

def plus_grande_puissance_de_2(n):
    assert n > 0, 'n doit être positif'
    return floor(log2(n))

print(plus_grande_puissance_de_2(1))   # 0


def dec_vers_bin(n):
    if n == 0:
        return '0'

    res = ['0'] * (plus_grande_puissance_de_2(n) + 1)

    while n > 0:
        i = plus_grande_puissance_de_2(n)
        res[-1 - i] = '1'
        n -= 2 ** i

    return ''.join(res)

print(dec_vers_bin(256))   # 100000000` },
          { text: "Fonctionnement : res est une liste de '0' de la bonne longueur (nombre de bits du résultat). À chaque tour, i est l'exposant du plus grand poids qui tient encore ; le bit correspondant est en position i en partant de la droite, d'où l'indice négatif -1 - i. On retranche 2 ** i et on recommence. join recolle enfin les caractères. Le formateur montre au passage le fonctionnement de join :" },
          { code: `a = tuple('bonjour')
print(a)                   # ('b', 'o', 'n', 'j', 'o', 'u', 'r')
print('535524'.join(a))    # b535524o535524n535524j535524o535524u535524r` },
          { text: "Réponse à la question 3, d'après le code du formateur : le cas particulier est n = 0, traité en tête de fonction. Sans ce test, plus_grande_puissance_de_2(0) échouerait sur son assert (et log2(0) lèverait de toute façon une erreur de domaine)." },
          { text: "Erreur dans la correction officielle : log2 calcule en nombres flottants. Pour un grand n juste en dessous d'une puissance de 2, l'arrondi donne l'exposant supérieur. Avec n = 2**49 - 1, log2(n) vaut 49.0 au lieu d'un nombre légèrement inférieur à 49 : la fonction place un \"1\" au rang 49, retranche 2**49, n devient négatif et la boucle s'arrête. Résultat : \"1\" suivi de 49 zéros, soit 2**49, au lieu de 49 fois \"1\". Mesuré sur les nombres de la forme 2**k - 1 : le résultat est juste jusqu'à k = 48, faux dès k = 49. Les entiers usuels passent, mais l'énoncé annonce « pas de limite supérieure »." },
          { code: `n = 2 ** 49 - 1
print(log2(n))                             # 49.0 : arrondi flottant
print(dec_vers_bin(n) == format(n, 'b'))   # False` },
          { text: "Version corrigée : il suffit de calculer l'exposant en nombres entiers. Comme dec_vers_bin appelle plus_grande_puissance_de_2 au moment de son exécution, redéfinir la fonction auxiliaire suffit. (En Python, n.bit_length() - 1 donne aussi cet exposant, exactement.)" },
          { code: `def plus_grande_puissance_de_2(n):
    """Exposant de la plus grande puissance de 2 inferieure ou egale a n, en calcul entier."""
    assert n > 0, 'n doit être positif'
    i = 0
    while 2 ** (i + 1) <= n:
        i += 1
    return i

print(dec_vers_bin(2 ** 49 - 1) == format(2 ** 49 - 1, 'b'))   # True
print(dec_vers_bin(2 ** 200 - 1) == format(2 ** 200 - 1, 'b')) # True` },
          { text: "Notre correction pour la cellule laissée vide (dec_vers_bin avec la même boucle que l'étape 1) : sans borne connue, il faut d'abord trouver le plus grand poids utile, en doublant tant qu'on ne dépasse pas n. Ensuite, la boucle est identique à celle de l'étape 1. Tout est en entiers : pas de problème d'arrondi." },
          { code: `def dec_vers_bin(n):
    if n == 0:
        return "0"
    poids = 1
    while poids * 2 <= n:        # le plus grand poids qui ne depasse pas n
        poids *= 2
    resultat = ""
    while poids >= 1:
        if n >= poids:
            resultat += "1"
            n -= poids
        else:
            resultat += "0"
        poids //= 2
    return resultat` },
          { text: "Complément : la version par divisions successives lit les bits dans l'autre sens, du poids faible vers le poids fort, d'où la concaténation à gauche. Ce n'est plus une stratégie gloutonne, mais c'est la méthode que les élèves rencontrent le plus souvent." },
          { code: `def dec_vers_bin_while(n):
    if n == 0:
        return "0"
    resultat = ""
    while n > 0:
        resultat = str(n % 2) + resultat
        n = n // 2
    return resultat

for n in (0, 5, 42, 1000):
    print(n, dec_vers_bin(n), dec_vers_bin_while(n))` },
          { text: "Complément : dans ces deux versions aussi, n = 0 doit être traité à part. La boucle while ne s'exécuterait jamais et on renverrait la chaîne vide. Sur 16 bits le problème ne se posait pas, puisque la boucle for tournait de toute façon seize fois." }
        ]
      },
      {
        num: "3", title: "Le rendu de monnaie",
        intro: "On dispose d'un nombre illimité de pièces de 1, 2, 5, 10, 20, 50, 100 et 200 centimes. La règle gloutonne : toujours rendre la plus grosse pièce possible.",
        code: `def rendu_glouton(rst, lst_piece):
    lst_rendu = []
    i = 0
    # TODO : tant qu'il reste quelque chose a rendre,
    #        prendre la piece lst_piece[i] si elle tient, sinon passer a la suivante
    return lst_rendu

euro = [200, 100, 50, 20, 10, 5, 2, 1]
rd = rendu_glouton(11, euro);  print(rd, rd == [10, 1])
rd = rendu_glouton(48, euro);  print(rd, rd == [20, 20, 5, 2, 1])
rd = rendu_glouton(52, euro);  print(rd, rd == [50, 2])`,
        questions: [
          "Écrire rendu_glouton et vérifier les trois tests.",
          "Pourquoi la liste des pièces doit-elle être triée par ordre décroissant ?",
          "Que fait l'indice i, et pourquoi ne le remet-on jamais à zéro ?"
        ],
        correction: [
          { text: "Correction du formateur, d'abord sous forme de script, dans la cellule de l'énoncé (rst = 548). Il importe aussi tutor et appelle tutor() en fin de cellule pour visualiser l'exécution pas à pas : ces deux lignes sont omises ici, car le module tutor n'existe que dans Basthon." },
          { code: `rst = 548

lst_piece = [200, 100, 50, 20, 10, 5, 2, 1]
lst_rendu = []
i = 0

while rst > 0 and i < len(lst_piece):
    if lst_piece[i] <= rst:
        lst_rendu.append(lst_piece[i])
        rst -= lst_piece[i]
    else:
        i += 1

print(lst_rendu)   # [200, 200, 100, 20, 20, 5, 2, 1]` },
          { text: "Puis la même chose en fonction. Version 1 du formateur, avec les tests du notebook :" },
          { code: `def rendu_glouton(rst, lst_piece):
    lst_rendu = []
    i = 0

    while rst > 0 and i < len(lst_piece):
        if lst_piece[i] <= rst:
            lst_rendu.append(lst_piece[i])
            rst -= lst_piece[i]
        else:
            i += 1

    return lst_rendu


print(rendu_glouton(548, [200, 100, 50, 20, 10, 5, 2, 1]))   # [200, 200, 100, 20, 20, 5, 2, 1]

rd = rendu_glouton(11, [200, 100, 50, 20, 10, 5, 2, 1])
print(rd, rd == [10, 1])
rd = rendu_glouton(48, [200, 100, 50, 20, 10, 5, 2, 1])
print(rd, rd == [20, 20, 5, 2, 1])
rd = rendu_glouton(52, [200, 100, 50, 20, 10, 5, 2, 1])
print(rd, rd == [50, 2])` },
          { text: "Les trois tests affichent True. Le formateur donne ensuite une version 2, qui retire le test i < len(lst_piece) de la condition de boucle et force à la place l'usage de la dernière pièce (la plus petite) quand on y est arrivé :" },
          { code: `def rendu_glouton(rst, lst_piece):
    lst_rendu = []
    i = 0

    while rst > 0:
        if lst_piece[i] <= rst or i == len(lst_piece) - 1:
            lst_rendu.append(lst_piece[i])
            rst -= lst_piece[i]
        else:
            i += 1

    return lst_rendu


print(rendu_glouton(548, [200, 100, 50, 20, 10, 5, 2, 1]))   # [200, 200, 100, 20, 20, 5, 2, 1]` },
          { text: "Avec l'euro, qui contient la pièce de 1, les deux versions donnent toujours le même résultat (vérifié pour toutes les sommes de 0 à 999) : arrivé à la pièce de 1, elle tient forcément. Elles diffèrent quand la plus petite pièce n'est pas 1 : c'est l'objet de l'étape 4. Attention aussi : la version 2 lève une IndexError si la liste de pièces est vide, la version 1 renvoie []." },
          { text: "Notre correction (le formateur n'a pas rédigé de réponse aux questions 2 et 3) : le tri décroissant EST la stratégie gloutonne, « la plus grosse pièce d'abord ». Avec une liste croissante, le même code rendrait 11 centimes avec onze pièces de 1 centime." },
          { text: "Notre correction, suite : i désigne la pièce qu'on essaie en ce moment. On ne le remet jamais à zéro parce qu'une pièce déclarée trop grosse le restera : le reste à rendre ne fait que diminuer. C'est le « on ne revient jamais en arrière » des algorithmes gloutons, et c'est aussi ce qui rend l'algorithme linéaire." }
        ]
      },
      {
        num: "4", title: "Quand le glouton se trompe",
        intro: "Un système de pièces est dit canonique si l'algorithme glouton y donne toujours le nombre minimal de pièces. L'euro l'est. Le système britannique d'avant 1971 — 30, 24, 12, 6, 3 et 1 pence — ne l'est pas.",
        code: `# Un systeme monetaire NON canonique
print(rendu_glouton(48, [30, 24, 12, 6, 3, 1]))
print(rendu_glouton(52, [30, 24, 12, 6, 3, 1]))

# Et s'il n'y a plus de piece de 1 centime ?
print(rendu_glouton(11, [200, 100, 50, 20, 10, 5, 2]))

# TODO : pour chacun des trois cas, trouver a la main une meilleure solution`,
        note: "Une fois la décision prise, l'algorithme glouton ne la remet jamais en cause — même quand elle le conduit dans une impasse.",
        questions: [
          "Pour 48 pence, que rend le glouton ? Existe-t-il mieux ?",
          "Pour 52 pence, même question.",
          "Sans pièce de 1 centime, que se passe-t-il pour 11 centimes ? Le programme plante-t-il ?",
          "Quelle solution correcte existe pourtant pour ces 11 centimes ?"
        ],
        correction: [
          { text: "Correction du formateur. Sur le système britannique, le glouton rend [30, 12, 6] pour 48 pence et [30, 12, 6, 3, 1] pour 52 pence. La cellule « Réponse » sur l'optimalité est restée vide, mais le formateur répond par le code, en fin de notebook : une recherche exhaustive récursive, rendre_ex, qui trouve [24, 24] pour 48 pence." },
          { code: `# hypothèse : on a des pièces de 1cte


def rendre_ex(lst_piece, rst, i=0):
    # plus de pièce
    if i >= len(lst_piece):
        # hypothese : toujours des pièces de 1
        return [1] * rst

    # plus rien a rendre
    if rst == 0:
        return []

    # la piece i est trop grande
    if lst_piece[i] > rst:
        return rendre_ex(lst_piece, rst, i + 1)

    # les solutions
    sol_1 = [lst_piece[i]] + rendre_ex(lst_piece, rst - lst_piece[i], i)
    sol_2 = rendre_ex(lst_piece, rst, i + 1)

    if len(sol_1) < len(sol_2):
        return sol_1
    return sol_2


print(rendre_ex([30, 24, 12, 6, 3, 1], 48))   # [24, 24]
print(rendre_ex([30, 24, 12, 6, 3, 1], 52))   # [24, 24, 3, 1]` },
          { text: "Le schéma est celui de la recherche exhaustive de l'étape 8 : pour la pièce i, soit on la prend (et on reste sur i, car on peut la reprendre), soit on passe définitivement à la suivante, et on garde la solution qui utilise le moins de pièces. Pour 52 pence, elle trouve 4 pièces là où le glouton en rendait 5. Le formateur s'en sert aussi (module rcviz, dans Basthon) pour dessiner l'arbre des appels de rendre_ex([200, 100, 50, 20, 10, 5, 2, 1], 6)." },
          { text: "Attention à l'hypothèse écrite en tête : quand il n'y a plus de pièce à essayer, rendre_ex complète avec des pièces de 1. Sans pièce de 1, elle en invente donc : rendre_ex([200, 100, 50, 20, 10, 5, 2], 11) renvoie [10, 1]. Elle ne peut pas servir pour la question 3." },
          { text: "Sans pièce de 1 centime : ce qu'affiche le programme dépend de la version de rendu_glouton. Dans le notebook du formateur, la dernière définie est la version 2 (étape 3), qui force la plus petite pièce : elle affiche [10, 2], soit 12 centimes rendus pour 11 dus. C'est aussi la sortie imprimée dans le notebook élève. Avec la version 1, la boucle s'arrête quand i dépasse la fin de la liste et on obtient [10] : 10 centimes rendus sur 11. Dans les deux cas : pas de plantage, pas de boucle infinie, mais un résultat faux, sans aucun message." },
          { code: `# avec la version 2 du formateur (la derniere definie a l'etape 3)
print(rendu_glouton(11, [200, 100, 50, 20, 10, 5, 2]))   # [10, 2] : 12 centimes rendus` },
          { text: "Réponse du formateur à « Proposez une solution à la main » : [5, 2, 2, 2]. Sa conclusion de l'exercice : une fois qu'une « décision » a été prise, on ne revient pas en arrière ; on a choisi la pièce de 10 cts, même si cela conduit dans une impasse." },
          { text: "Le formateur ajoute un encadré « Système canonique : utilisation des conditions de Pearson (1994) ». Il y écrit : « Pearson a démontré que pour un système monétaire strictement décroissant c1 > c2 > … > cn = 1, le système est canonique si et seulement si c(k+1) ≤ c(k) / 2 pour tout k = 1, …, n − 1. Autrement dit, chaque pièce doit être au plus la moitié de la pièce précédente. D'où la suite 10, 5, 2, 1 que l'on retrouve dans la plupart des systèmes monétaires. »" },
          { text: "Erreur dans cet encadré : cette « condition de la moitié » n'est ni nécessaire ni suffisante, et ce n'est pas le résultat de Pearson. Le système (3, 2, 1) la viole (2 > 3 / 2) et il est pourtant canonique. Le système (12, 5, 1) la respecte (5 ≤ 6 et 1 ≤ 2,5) et il n'est pas canonique : pour 15, le glouton rend 12 + 1 + 1 + 1, soit 4 pièces, alors que 5 + 5 + 5 n'en demande que 3. Ce que Pearson a réellement établi (rapport de 1994, publié en 2005), c'est un algorithme en temps polynomial pour décider si un système est canonique : il n'existe pas de critère qui se lit à l'œil sur les valeurs. La condition se trouve vraie pour l'euro et fausse pour le système britannique (24 > 30 / 2), ce qui explique qu'elle semble fonctionner sur les exemples du TP. Vérification par le calcul :" },
          { code: `def nb_glouton(rst, lst_piece):
    """Nombre de pieces rendues par le glouton (lst_piece triee, decroissante)."""
    nb = 0
    for p in lst_piece:
        nb += rst // p
        rst = rst % p
    return nb

def nb_min(rst, lst_piece):
    """Nombre minimal de pieces, par programmation dynamique."""
    mini = [0] + [float("inf")] * rst
    for s in range(1, rst + 1):
        for p in lst_piece:
            if p <= s and mini[s - p] + 1 < mini[s]:
                mini[s] = mini[s - p] + 1
    return mini[rst]

def est_canonique(lst_piece):
    # Un plus petit contre-exemple, s'il existe, est inferieur a la somme
    # des deux plus grosses pieces (Kozen et Zaks, 1994) : on teste jusque-la.
    borne = lst_piece[0] + lst_piece[1]
    return all(nb_glouton(s, lst_piece) == nb_min(s, lst_piece) for s in range(1, borne))

def condition_moitie(lst_piece):
    return all(2 * lst_piece[k + 1] <= lst_piece[k] for k in range(len(lst_piece) - 1))

for systeme in ([200, 100, 50, 20, 10, 5, 2, 1], [30, 24, 12, 6, 3, 1],
                [4, 3, 1], [3, 2, 1], [12, 5, 1]):
    print(systeme, "canonique :", est_canonique(systeme),
          "| condition de la moitie :", condition_moitie(systeme))

# [200, 100, 50, 20, 10, 5, 2, 1] canonique : True | condition de la moitie : True
# [30, 24, 12, 6, 3, 1] canonique : False | condition de la moitie : False
# [4, 3, 1] canonique : False | condition de la moitie : False
# [3, 2, 1] canonique : True | condition de la moitie : False
# [12, 5, 1] canonique : False | condition de la moitie : True` },
          { text: "Complément : sur tous les systèmes de 2 à 4 pièces de valeurs inférieures à 30 (avec la pièce de 1), on trouve 176 systèmes canoniques qui violent la condition et 182 systèmes qui la respectent sans être canoniques. En classe, on retiendra seulement que l'euro est canonique, que ce n'est pas le cas de tous les systèmes, et que cela se vérifie par le calcul." },
          { text: "Complément : une référence exhaustive par programmation dynamique, qui calcule le vrai minimum sans supposer qu'il existe une pièce de 1. Elle trouve [24, 24] pour 48, [24, 24, 3, 1] pour 52 et [5, 2, 2, 2] pour 11 centimes sans pièce de 1 ; elle renvoie None si la somme est impossible à rendre." },
          { code: `def rendu_optimal(rst, lst_piece):
    INF = float("inf")
    mini = [0] + [INF] * rst
    choix = [None] * (rst + 1)
    for somme in range(1, rst + 1):
        for p in lst_piece:
            if p <= somme and mini[somme - p] + 1 < mini[somme]:
                mini[somme] = mini[somme - p] + 1
                choix[somme] = p
    if mini[rst] == INF:
        return None                      # somme impossible a rendre
    pieces = []
    while rst > 0:
        pieces.append(choix[rst])
        rst -= choix[rst]
    return sorted(pieces, reverse=True)

print(rendu_optimal(48, [30, 24, 12, 6, 3, 1]))          # [24, 24]
print(rendu_optimal(52, [30, 24, 12, 6, 3, 1]))          # [24, 24, 3, 1]
print(rendu_optimal(11, [200, 100, 50, 20, 10, 5, 2]))   # [5, 2, 2, 2]
print(rendu_optimal(3, [200, 100, 50, 20, 10, 5]))       # None` }
        ]
      },
      {
        num: "5", title: "Le sac à dos — critère 1 : la valeur",
        intro: "Quatre objets, décrits par un tuple (valeur, masse) : (5, 13), (4, 8), (3, 10) et (7, 12). Le sac accepte une masse maximale. Premier critère local : prendre d'abord l'objet le plus cher.",
        code: `valeur_masse_objets = [(5, 13), (4, 8), (3, 10), (7, 12)]

def masse(liste_objet):
    # TODO : masse totale d'une liste d'objets
    ...

def valeur(liste_objet):
    # TODO : valeur totale d'une liste d'objets
    ...

def sac_a_dos_1(masse_max, liste_objet):
    # TODO : trier par valeur decroissante, puis prendre chaque objet s'il tient encore
    ...

sad = sac_a_dos_1(15, valeur_masse_objets); print(sad, sad == [(7, 12)])
sad = sac_a_dos_1(21, valeur_masse_objets); print(sad, sad == [(7, 12), (4, 8)])
sad = sac_a_dos_1(30, valeur_masse_objets); print(sad, sad == [(7, 12), (5, 13)])`,
        questions: [
          "Quel est le critère global à satisfaire dans le problème du sac à dos ?",
          "Quels critères locaux peut-on appliquer à chaque étape ? En donner au moins deux.",
          "Écrire masse, valeur et sac_a_dos_1, puis vérifier les trois tests.",
          "À la main : avec un sac de 30 kg, quels objets faudrait-il vraiment prendre ?",
          "Pourquoi sorted(liste, reverse=True) suffit-il ici, sans préciser de clé de tri ?"
        ],
        correction: [
          { text: "Réponses du formateur. Critère global : « la valeur des objets du sac ». Critères locaux possibles : « choisir les objets les plus chers », « choisir les plus légers », « choisir le plus grand rapport prix / masse (€/kg) »." },
          { text: "Réponse du formateur à la question « à la main » : « 30 kg, 14 €, avec les objets 1, 3 et 4 ». Dans la numérotation du tableau du notebook, l'objet 1 est (7, 12), l'objet 3 est (4, 8) et l'objet 4 est (3, 10)." },
          { text: "masse et valeur, par le formateur : il décompose chaque tuple directement dans la boucle for." },
          { code: `valeur_masse_objets = [(5, 13), (4, 8), (3, 10), (7, 12)]

def masse(liste_objet):
    s = 0
    for v, m in liste_objet:
        s += m
    return s

def valeur(liste_objet):
    s = 0
    for v, m in liste_objet:
        s += v
    return s

print(masse(valeur_masse_objets))    # 43
print(valeur(valeur_masse_objets))   # 19` },
          { text: "Pour sac_a_dos_1, le formateur donne deux versions. La première parcourt la liste triée avec un while et un indice, en diminuant la capacité restante masse_max à chaque objet pris ; elle affiche au passage la liste triée (print de mise au point)." },
          { code: `def sac_a_dos_1(masse_max, liste_objet):
    """Choisi les objets a mettre dans le sac a dos.

    parametres
    ----------
    masse_max : int
        la masse maxi du sac a dos
    liste_objets : list [(prix, masse)]
        La liste des caractéristiques des objets (prix, masse)

    return
    ------
    list
        une liste d'objets sélectionnés parmi liste_objets, sous forme de tuple (prix, masse).
    """
    #ici, on maximise la valeur des objets
    liste_objet_2 = sorted(liste_objet, reverse=True)
    print(liste_objet_2)

    sac = []
    i = 0

    while masse_max > 0 and i < len(liste_objet_2):
        if liste_objet_2[i][1] <= masse_max:
            sac.append(liste_objet_2[i])
            masse_max -= liste_objet_2[i][1]
        i += 1

    return sac


sad = sac_a_dos_1(30, valeur_masse_objets)
print(sad)
print(masse(sad), 'kg')
print(valeur(sad), '€')
# [(7, 12), (5, 13), (4, 8), (3, 10)]
# [(7, 12), (5, 13)]
# 25 kg
# 12 €` },
          { text: "La seconde remplace le while par un for, plus direct (la docstring, identique, est omise ici) :" },
          { code: `def sac_a_dos_1(masse_max, liste_objet):
    #ici, on maximise la valeur des objets
    liste_objet_2 = sorted(liste_objet, reverse=True)
    # print(liste_objet_2)

    sac = []

    for obj in liste_objet_2:
        if obj[1] <= masse_max:
            sac.append(obj)
            masse_max -= obj[1]

    return sac


sad = sac_a_dos_1(15, valeur_masse_objets)
print(sad, masse(sad), valeur(sad), sad == ([(7, 12)]))
sad = sac_a_dos_1(21, valeur_masse_objets)
print(sad, masse(sad), valeur(sad), sad == ([(7, 12), (4, 8)]))
sad = sac_a_dos_1(30, valeur_masse_objets)
print(sad, masse(sad), valeur(sad), sad == ([(7, 12), (5, 13)]))
# [(7, 12)] 12 7 True
# [(7, 12), (4, 8)] 20 11 True
# [(7, 12), (5, 13)] 25 12 True` },
          { text: "À noter : l'énoncé du notebook demande que sac_a_dos_1 renvoie un tuple (liste des objets, valeur totale, masse du sac). Le formateur, comme les tests, renvoie seulement la liste des objets ; la valeur et la masse s'obtiennent ensuite avec valeur(sad) et masse(sad)." },
          { text: "Pourquoi sorted suffit sans clé : la réponse est dans l'encadré « Les secrets de sorted » du notebook. Si la liste contient des itérables, le tri se fait sur leur premier élément, ici la valeur. Pour trier sur un autre élément, il faut passer une fonction key, en général une lambda. Petite coquille dans l'exemple de cet encadré : la ligne commentée « tri sur le premier élément » écrit sorted(lst1) ; il faut lire sorted(list4) pour obtenir [(20, 462, 60), (139, 71, 343), (999, 90, 585)]." },
          { text: "Notre correction (la cellule « Réponse » sur l'optimalité des trois tests est restée vide chez le formateur) : à 15 kg, (7, 12) pour 7 € est optimal ; à 21 kg, (7, 12) + (4, 8) pour 11 € est optimal ; à 30 kg, le glouton prend (7, 12) puis (5, 13), soit 25 kg pour 12 €, et ne peut plus rien ajouter. Ce n'est pas optimal : (7, 12) + (4, 8) + (3, 10) remplit exactement les 30 kg pour 14 €, la réponse « à la main » du formateur. En prenant l'objet à 5 €, le glouton a consommé 13 kg pour pas grand-chose. Le critère « le plus cher d'abord » ignore la place occupée : d'où le critère 2, à l'étape suivante." },
          { text: "Complément : Python compare les tuples élément par élément ; sorted trie donc d'abord sur la valeur, et ne départage sur la masse qu'en cas d'égalité de valeur. Remarque aussi que la version du formateur diminue la capacité restante au fur et à mesure, ce qui évite de recalculer la masse du sac à chaque objet (notre première correction appelait masse(sac) dans la boucle)." },
          { text: "Complément : le critère « les plus légers d'abord », cité par le formateur, ne garantit rien non plus. Sur les quatre objets, il donne 4 € à 15 kg (au lieu de 7 €) et 7 € à 21 kg (au lieu de 11 €) ; il tombe sur l'optimum à 30 kg, par chance." }
        ]
      },
      {
        num: "6", title: "Le sac à dos — critère 2 : le rapport valeur/masse",
        intro: "Un critère plus fin : privilégier les objets qui rapportent le plus par kilo. On construit des triplets (valeur, masse, valeur/masse) et on trie sur le rapport.",
        code: `def sac_a_dos_2(masse_max, liste_objet):
    # TODO : construire la liste des (valeur, masse, valeur/masse)
    # TODO : la trier sur le rapport, par ordre decroissant
    # TODO : puis prendre chaque objet s'il tient encore
    ...

print(sac_a_dos_2(30, valeur_masse_objets))

# La grande liste : 20 objets
valeur_masse = [(35, 120), (30, 30), (26, 50), (21, 20), (18, 40), (17, 60), (15, 30),
                (14, 10), (13, 14), (11, 36), (10, 72), (9, 86), (8, 5), (7, 3), (6, 7),
                (5, 23), (4, 49), (3, 57), (2, 69), (1, 12)]

for max_sac in (205, 420):
    s1 = sac_a_dos_1(max_sac, valeur_masse)
    s2 = sac_a_dos_2(max_sac, valeur_masse)
    print(max_sac, "kg :", valeur(s1), "EUR contre", valeur(s2), "EUR")`,
        questions: [
          "Écrire sac_a_dos_2.",
          "L'ordre des objets a-t-il changé par rapport au critère 1 ?",
          "Sur les quatre objets avec un sac de 30 kg, ce critère fait-il mieux que le premier ?",
          "Sur la grande liste, lequel des deux critères donne le meilleur résultat à 205 kg ? Et à 420 kg ?",
          "Peut-on conclure qu'un critère est meilleur que l'autre ?"
        ],
        correction: [
          { text: "Correction du formateur. Il montre deux façons de trier sur le rapport : en construisant les triplets (valeur, masse, valeur/masse) et en triant sur x[2], comme l'énoncé le propose, ou directement sur les couples, avec une clé qui calcule le rapport." },
          { code: `valeur_masse_2 = sorted([(v, m, v / m) for v, m in valeur_masse_objets], key=lambda x: x[2], reverse=True)
print(valeur_masse_2)
# [(7, 12, 0.5833333333333334), (4, 8, 0.5), (5, 13, 0.38461538461538464), (3, 10, 0.3)]

valeur_masse_2 = sorted(valeur_masse_objets, key=lambda x: x[0] / x[1], reverse=True)
print(valeur_masse_2)
# [(7, 12), (4, 8), (5, 13), (3, 10)]` },
          { text: "Notre correction (la cellule « l'ordre a-t-il changé ? » est restée vide chez le formateur) : oui. (4, 8) rapporte 0,5 €/kg et passe devant (5, 13), qui ne rapporte que 0,38 €/kg ; (7, 12), à 0,58 €/kg, reste en tête." },
          { text: "Sa fonction sac_a_dos_2 utilise la seconde forme, sans triplets (docstring omise) :" },
          { code: `def sac_a_dos_2(masse_max, liste_objet):
    # créer une novelle liste d'objet, rangé sur le critère prix / masse
    valeur_masse_2 = sorted(liste_objet, key=lambda x: x[0] / x[1], reverse=True)
    # print(valeur_masse_2)
    #ici, on maximise le rapport valeur/masse des objets
    sac = []
    for obj in valeur_masse_2:
        if obj[1] <= masse_max:
            sac.append(obj)
            masse_max -= obj[1]
    return sac


sad = sac_a_dos_2(30, valeur_masse_objets)
print(sad)
print(masse(sad), 'kg')
print(valeur(sad), '€')
# [(7, 12), (4, 8), (3, 10)]
# 30 kg
# 14 €` },
          { text: "Réponse du formateur sur l'optimalité à 30 kg : « cette fois ci oui, c'est la solution optimale » (14 € pour 30 kg, contre 12 € avec le critère 1)." },
          { text: "Le formateur teste ensuite les deux fonctions sur la grande liste :" },
          { code: `valeur_masse = [(35, 120), (30, 30), (26, 50), (21, 20), (18, 40), (17, 60), (15, 30),
                (14, 10), (13, 14), (11, 36), (10, 72), (9, 86), (8, 5), (7, 3), (6, 7),
                (5, 23), (4, 49), (3, 57), (2, 69), (1, 12)]
print(valeur(valeur_masse), '€', masse(valeur_masse), 'kg')   # 255 € 793 kg

for max_sac in (205, 420):          # deux cellules dans le notebook, une par capacite
    print(max_sac, 'kg')
    print('version 1')
    sad = sac_a_dos_1(max_sac, valeur_masse)
    print(sad)
    print(valeur(sad), '€', masse(sad), 'kg')
    print('version 2')
    sad = sac_a_dos_2(max_sac, valeur_masse)
    print(sad)
    print(valeur(sad), '€', masse(sad), 'kg')` },
          { text: "Sorties obtenues : à 205 kg, la version 1 donne 99 € pour 205 kg et la version 2 donne 151 € pour 205 kg. À 420 kg, la version 1 donne 215 € pour 418 kg et la version 2 donne 210 € pour 400 kg." },
          { text: "Notre correction (la cellule « Réponse » est restée vide chez le formateur) : à 205 kg, le rapport écrase la valeur seule ; à 420 kg, le classement s'inverse. On ne peut donc pas conclure qu'un critère est toujours meilleur. Le rapport est meilleur en général, mais « en général » n'est pas « toujours » : un algorithme glouton n'a pas de garantie, seulement des tendances, et la seule façon de savoir est de mesurer." },
          { text: "Complément : pour trancher, une référence exhaustive. Celle-ci parcourt les masses atteignables et garde le meilleur sac pour chacune." },
          { code: `def sac_a_dos_optimal(masse_max, liste_objet):
    meilleurs = {0: []}                    # masse -> meilleur sac de cette masse
    for (v, m) in liste_objet:
        nouveaux = dict(meilleurs)
        for mm, sac in meilleurs.items():
            if mm + m <= masse_max:
                cand = sac + [(v, m)]
                if valeur(cand) > valeur(nouveaux.get(mm + m, [])):
                    nouveaux[mm + m] = cand
        meilleurs = nouveaux
    return max(meilleurs.values(), key=valeur)

for max_sac in (205, 420):
    print(max_sac, 'kg : optimum', valeur(sac_a_dos_optimal(max_sac, valeur_masse)), '€')
# 205 kg : optimum 152 €
# 420 kg : optimum 215 €` },
          { text: "Complément : l'optimum vaut 152 € à 205 kg (le critère 2 s'en approche à 1 € près) et 215 € à 420 kg : le critère 1, réputé naïf, atteint donc l'optimum exact à 420 kg, par chance, pendant que le critère réputé plus fin s'arrête à 210 €." }
        ]
      },
      {
        num: "7", title: "Le planning des conférenciers — version gloutonne",
        intro: "Des conférenciers ne sont disponibles que sur un créneau donné. Il faut en caser le plus grand nombre possible dans une seule salle. Un créneau est un tuple (début, fin, nom).",
        code: `tab_conf_1 = [(3, 4, 'C1'), (0, 1, 'C2'), (2, 3, 'C3'), (1, 2, 'C4')]
# TODO : ecrire tab_conf_2 et tab_conf_3 d'apres les schemas du notebook
tab_conf_4 = [(0, 7, 'C1'), (2, 5, 'C2'), (6, 8, 'C3'), (1, 2, 'C4'), (5, 6, 'C5'),
              (0, 2, 'C6'), (4, 7, 'C7'), (0, 1, 'C8'), (3, 6, 'C9'), (1, 3, 'C10'),
              (4, 5, 'C11'), (6, 8, 'C12'), (0, 2, 'C13'), (5, 7, 'C14'), (1, 4, 'C15')]

def planning1(tab_inter):
    # TODO : trier selon le critere local choisi, puis retenir les creneaux compatibles
    ...

print(planning1(tab_conf_1))
print(planning1(tab_conf_4))`,
        questions: [
          "Proposer deux critères locaux possibles pour choisir les conférenciers.",
          "Traduire les cas 2 et 3 des schémas en listes de tuples.",
          "Écrire planning1 avec le critère qui vous paraît le meilleur.",
          "Combien de conférenciers le cas 4 permet-il de caser ?"
        ],
        correction: [
          { text: "Réponse du formateur sur les critères locaux : « celui qui parle le moins longtemps », « celui qui commence en premier », « celui qui interfère le moins avec les autres », « celui qui finit le plus tôt — ce choix paraît le plus pertinent »." },
          { text: "Sa représentation des cas 2 et 3, et sa fonction planning1, qui trie sur l'heure de fin et renvoie les noms des conférenciers retenus. La variable debut contient l'heure à partir de laquelle la salle est libre, c'est-à-dire la fin du dernier exposé retenu." },
          { code: `# donnes par l'enonce
tab_conf_1 = [(3, 4, 'C1'), (0, 1, 'C2'), (2, 3, 'C3'), (1, 2, 'C4')]
tab_conf_4 = [(0, 7, 'C1'), (2, 5, 'C2'), (6, 8, 'C3'), (1, 2, 'C4'), (5, 6, 'C5'), 
            (0, 2, 'C6'), (4, 7, 'C7'), (0, 1, 'C8'), (3, 6, 'C9'), (1, 3, 'C10'), 
            (4, 5, 'C11'), (6, 8, 'C12'), (0, 2, 'C13'), (5, 7, 'C14'), (1, 4, 'C15')]

# reponse du formateur
tab_conf_2 = [(2, 4, 'C1'), (0, 1,'C2'), (1, 3,'C3'), (0, 2,'C4')]
tab_conf_3 = [(0, 3, 'C1'), (1, 2,'C2'), (2, 3,'C3')]


def planning1(tab_inter):
    tab_inter = sorted(tab_inter, key=lambda x: x[1])
    # print(tab_inter)
    planning = []

    debut = 0
    for c in tab_inter:
        if c[0] >= debut:
            planning.append(c[2])
            debut = c[1]

    return planning


print(planning1(tab_conf_1))   # ['C2', 'C4', 'C3', 'C1']
print(planning1(tab_conf_2))   # ['C2', 'C3']
print(planning1(tab_conf_3))   # ['C2', 'C3']
print(planning1(tab_conf_4))   # ['C8', 'C4', 'C2', 'C5', 'C3']` },
          { text: "Le cas 4 permet donc de caser 5 conférenciers : C8, C4, C2, C5 et C3." },
          { text: "Complément : pourquoi les autres critères échouent. Celui qui commence en premier peut occuper toute la matinée : au cas 3, C1 commence à 0 mais garde la salle jusqu'à 3, et le retenir interdirait tout le reste ; le critère de l'heure de fin l'écarte et en case deux. Le plus court peut tomber à cheval sur deux créneaux qu'il bloque tous les deux. Finir le plus tôt, c'est libérer la salle au plus vite et laisser le maximum de place à la suite : c'est le seul de ces critères qui soit démontrablement optimal." },
          { text: "Complément : « celui qui interfère le moins », le troisième critère du formateur, semble prometteur mais échoue lui aussi. Dans l'exemple ci-dessous, X ne chevauche que deux créneaux (B et C) : c'est lui que ce critère choisit en premier, et il en écarte deux à lui seul. On case 3 conférenciers au lieu de 4." },
          { code: `def chevauche(a, b):
    return a[0] < b[1] and b[0] < a[1]

def planning_moins_genant(tab_inter):
    """Glouton : d'abord les creneaux qui chevauchent le moins d'autres creneaux."""
    def nb_conflits(c):
        return sum(1 for d in tab_inter if d is not c and chevauche(c, d))
    planning = []
    for c in sorted(tab_inter, key=nb_conflits):
        if all(not chevauche(c, d) for d in planning):
            planning.append(c)
    return sorted(planning)

tab = [(0, 3, 'A'), (4, 7, 'B'), (8, 11, 'C'), (12, 15, 'D'), (6, 9, 'X'),
       (2, 5, 'G1'), (2, 5, 'G2'), (2, 5, 'G3'),
       (10, 13, 'H1'), (10, 13, 'H2'), (10, 13, 'H3')]
print([c[2] for c in planning_moins_genant(tab)])   # ['A', 'X', 'D']
print(planning1(tab))                               # ['A', 'B', 'C', 'D']` }
        ]
      },
      {
        num: "8", title: "Le planning — recherche exhaustive récursive",
        intro: "L'algorithme concurrent : explorer toutes les combinaisons et garder la meilleure. Pour chaque conférence, deux possibilités — la prendre ou non.",
        code: `def planning2(tab_inter, debut=0, i=0):
    # Meilleur planning commencant a \`debut\` avec les conferences i et suivantes.
    # TODO : s'il n'y a plus de conference -> planning vide
    # TODO : si la conference i commence avant \`debut\` -> passer a i + 1
    # TODO : sinon comparer les deux solutions (la prendre / ne pas la prendre)
    ...

for tab in (tab_conf_1, tab_conf_2, tab_conf_3, tab_conf_4):
    print(planning2(sorted(tab)))`,
        note: "On passe sorted(tab) : l'algorithme suppose les conférences rangées par heure de début croissante.",
        questions: [
          "Écrire planning2.",
          "Le glouton trouve-t-il le même nombre de conférenciers que la recherche exhaustive ?",
          "Modifier l'algorithme pour qu'à nombre égal il préfère le planning qui laisse le moins de trous.",
          "Quelle est la complexité de planning2, et à quelle limite se heurte-t-elle ?"
        ],
        correction: [
          { text: "Correction du formateur. Elle suit l'algorithme de l'énoncé et renvoie des listes de noms. La ligne print(debut, i) est une trace de mise au point : elle affiche une ligne par appel, 706 lignes pour le cas 4." },
          { code: `def planning2(tab_inter, debut=0, i=0):
    print(debut, i)
    if i >= len(tab_inter):
        return []

    if tab_inter[i][0] < debut:
        return planning2(tab_inter, debut, i + 1)

    sol_1 = [tab_inter[i][2]] + planning2(tab_inter, tab_inter[i][1], i + 1)
    sol_2 = planning2(tab_inter, debut, i + 1)

    if len(sol_1) >= len(sol_2):
        return sol_1
    return sol_2


print(planning2(sorted(tab_conf_4)))   # 706 lignes de trace, puis ['C8', 'C4', 'C2', 'C5', 'C12']` },
          { text: "Pour les quatre cas, la même fonction sans la ligne de trace :" },
          { code: `def planning2(tab_inter, debut=0, i=0):
    if i >= len(tab_inter):
        return []
    if tab_inter[i][0] < debut:
        return planning2(tab_inter, debut, i + 1)
    sol_1 = [tab_inter[i][2]] + planning2(tab_inter, tab_inter[i][1], i + 1)
    sol_2 = planning2(tab_inter, debut, i + 1)
    if len(sol_1) >= len(sol_2):
        return sol_1
    return sol_2


print(planning2(sorted(tab_conf_1)))   # ['C2', 'C4', 'C3', 'C1']
print(planning2(sorted(tab_conf_2)))   # ['C2', 'C3']
print(planning2(sorted(tab_conf_3)))   # ['C2', 'C3']
print(planning2(sorted(tab_conf_4)))   # ['C8', 'C4', 'C2', 'C5', 'C12']` },
          { text: "La recherche exhaustive case 4, 2, 2 et 5 conférenciers : exactement autant que le glouton. Au cas 4, elle retient C12 là où le glouton retenait C3 ; ce sont deux créneaux identiques, de 6 h à 8 h." },
          { text: "Complément : ce n'est pas une coïncidence. Contrairement au sac à dos, le critère « finir le plus tôt » est démontrablement optimal. Ce problème s'appelle l'ordonnancement d'intervalles, et c'est l'un des rares où un glouton bien choisi garantit l'optimum." },
          { text: "Pour départager deux plannings de même taille, le formateur compare le cumul des temps de parole : à nombre égal, il garde sol_1 seulement si elle occupe strictement plus la salle, sinon sol_2." },
          { code: `def planning3(tab_inter, debut=0, i=0):
    if i >= len(tab_inter):
        return []

    if tab_inter[i][0] < debut:
        return planning3(tab_inter, debut, i + 1)

    sol_1 = [tab_inter[i][2]] + planning3(tab_inter, tab_inter[i][1], i + 1)
    sol_2 = planning3(tab_inter, debut, i + 1)

    if len(sol_1) > len(sol_2):
        return sol_1
    if len(sol_1) == len(sol_2):
        if cumul_temps(tab_inter, sol_1) > cumul_temps(tab_inter, sol_2):
            return sol_1
    return sol_2

def cumul_temps(tab_inter, sol):
    """Renvoi le cumul des temps de parole des intervenents de sol
    """
    s = 0
    for inter in tab_inter:
        if inter[2] in sol:
            s += inter[1] - inter[0]
    return s


print(planning3(sorted(tab_conf_1)))   # ['C2', 'C4', 'C3', 'C1']
print(planning3(sorted(tab_conf_2)))   # ['C4', 'C1']
print(planning3(sorted(tab_conf_3)))   # ['C2', 'C3']
print(planning3(sorted(tab_conf_4)))   # ['C8', 'C15', 'C11', 'C5', 'C3']` },
          { text: "Au cas 2, la différence se voit : planning2 retenait C2 [0, 1] puis C3 [1, 3], soit 3 heures occupées ; planning3 retient C4 [0, 2] puis C1 [2, 4], soit 4 heures. Deux conférenciers dans les deux cas, mais une salle mieux remplie. Au cas 4, les deux plannings occupent la salle sans trou de 0 h à 8 h." },
          { text: "Complément : notre première correction départageait avec >= au lieu de > ; elle garde alors sol_1 en cas d'égalité parfaite et renvoie au cas 4 ['C8', 'C4', 'C2', 'C5', 'C12'], qui occupe aussi 8 heures. Les deux réponses sont également bonnes : seul le choix entre ex aequo change." },
          { text: "Notre correction pour la complexité (la cellule est restée vide chez le formateur) : chaque appel en déclenche deux, la complexité est exponentielle, en O(2 puissance n) dans le pire cas. Mesuré : planning2 fait 31, 19 et 11 appels pour les cas 1 à 3, et déjà 706 pour les 15 conférenciers du cas 4. Dans le pire cas, le nombre d'appels double à chaque conférencier ajouté : quelques dizaines suffisent à rendre le calcul impossible. C'est le prix de la garantie d'optimalité, et c'est le défaut que la programmation dynamique cherche à corriger." }
        ]
      },
      {
        num: "9", title: "Le coût de la récursivité : Fibonacci",
        intro: "Pour mesurer ce que coûte une exploration exhaustive naïve, un exemple plus simple : la suite de Fibonacci, où chaque terme est la somme des deux précédents.",
        code: `def fiboR(n):
    # TODO : la version recursive, traduction directe de la definition
    ...

# Combien de temps pour fiboR(35) ?

dicFibo = {..., ...}

def fiboD(n):
    # TODO : la version dynamique, qui memorise les resultats deja calcules
    ...

print(fiboD(60))`,
        note: "Mémoriser les résultats déjà calculés pour ne pas les recalculer s'appelle la programmation dynamique. C'est la réponse standard au coût exponentiel de la récursivité naïve.",
        questions: [
          "Écrire fiboR, la version récursive.",
          "Pourquoi est-elle si lente ? Combien d'appels pour fiboR(6) ?",
          "Écrire fiboD, la version qui mémorise ses résultats.",
          "Que vaut fiboD(60) ? Pourquoi la version récursive ne peut-elle pas le calculer ?"
        ],
        correction: [
          { text: "Correction du formateur, version récursive :" },
          { code: `def fiboR(n):
    if n <= 1:
        return n

    return fiboR(n - 1) + fiboR(n - 2)

print(fiboR(15))   # 610` },
          { text: "Le formateur visualise ensuite l'arbre des appels de fiboR(6) avec le module rcviz : from rcviz import viz, puis fiboR = viz(fiboR), fiboR(6) et fiboR.callgraph(). Ce module n'est pas disponible partout ; le dessin n'est pas reproduit ici." },
          { text: "Notre correction (pas de réponse écrite du formateur) : la version récursive est lente parce qu'elle recalcule sans cesse les mêmes valeurs. fiboR(6) appelle fiboR(5) et fiboR(4) ; fiboR(5) rappelle fiboR(4), qui a déjà été calculé. L'arbre compte 25 appels pour n = 6, et sa taille est multipliée par environ 1,6 à chaque incrément de n (le rapport tend vers le nombre d'or, 1,618…) : la complexité est exponentielle." },
          { text: "Version dynamique du formateur : le dictionnaire contient au départ les deux valeurs de base, et la recherche dans le dictionnaire sert de condition d'arrêt. Il trace aussi son arbre des appels avec rcviz, beaucoup plus petit." },
          { code: `dicFibo = {0: 0, 1: 1}

def fiboD(n):
    if n not in dicFibo:
        dicFibo[n] = fiboD(n - 1) + fiboD(n - 2)
    return dicFibo[n]

print(fiboD(60))   # 1548008755920` },
          { text: "Notre correction (pas de réponse écrite du formateur) : fiboD(60) vaut 1 548 008 755 920, calculé instantanément, car chaque terme n'est calculé qu'une fois : la complexité est devenue linéaire. La version récursive naïve demanderait environ cinq mille milliards d'appels pour le même résultat ; mesuré sur une machine courante qui enchaîne près de 18 millions d'appels par seconde, cela représente un peu plus de trois jours de calcul. Le passage de l'un à l'autre tient en trois lignes." }
        ]
      }
    ]
  },
  // ── TP — Diviser pour régner (1) : occurrences et tri fusion ──
  {
    id: "tp-dpr-fusion", bloc: "bloc2", jour: "En ligne — 1er octobre 2026 (FDIU)",
    theme: "Algorithmique — diviser pour régner",
    title: "TP — Diviser pour régner (1) : occurrences et tri fusion",
    type: 'tp',
    notebook: "FDIU_diviser_pour_regner.ipynb",
    aux: ["ressources/dpr/_fusion.py","ressources/dpr/triClassique_V2.py"],
    intro: "TP du cours en ligne du 1er octobre 2026 (FDIU, DU Normandie). Le paradigme diviser pour régner tient en trois temps. DIVISER : découper le problème en sous-problèmes plus petits. RÉGNER : résoudre ces sous-problèmes, le plus souvent récursivement, jusqu'à un cas trivial. COMBINER : assembler les solutions des sous-problèmes en une solution du problème de départ. On l'applique d'abord à un problème où la méthode n'apporte rien (compter les occurrences d'un caractère), puis au tri fusion, où elle fait passer de O(n²) à O(n log n). Le notebook s'appuie sur deux modules fournis, _fusion.py et triClassique_V2.py, à placer à côté du notebook : le bouton Basthon du site les charge automatiquement avec le notebook. Les cellules rcviz (graphe des appels) et tutor ne fonctionnent que dans Basthon. Ouvre le notebook dans Basthon, cherche par toi-même, puis déplie la correction.",
    steps: [
      {
        num: "1", title: "Compter les occurrences d'un caractère, en diviser pour régner",
        intro: "Premier exemple, volontairement simple : réécrire str.count en récursif. nb_occurence(chaine, x) renvoie le nombre d'occurrences du caractère x dans chaine, en respectant la casse et les accents (à ≠ a, A ≠ a). Interdit d'utiliser count() : on est justement en train de le réécrire.",
        code: `def nb_occurence(chaine, x):
    ...

nb_occurence('abracadabra', 'a')

# Graphe des appels récursifs (Basthon uniquement)
from rcviz import viz
nb_occurence = viz(nb_occurence)
nb_occurence('abracadabra', 'a')
nb_occurence.callgraph()`,
        note: "Les modules rcviz (graphe des appels récursifs) et tutor (exécution pas à pas) sont propres à Basthon : ailleurs, l'import échoue avec ModuleNotFoundError. On garde ces cellules, mais elles ne servent qu'à visualiser. Après la cellule rcviz, nb_occurence est remplacée par sa version « enveloppée » : il faut ré-exécuter la cellule de définition avant de chronométrer (étape 2).",
        questions: [
          "Écrire nb_occurence en coupant la chaîne en deux moitiés.",
          "Repérer dans le code les trois phases : diviser, régner, combiner.",
          "Combien d'appels pour 'abracadabra' (11 caractères) ? Et pour une chaîne de n caractères ?",
          "Quelle différence avec une version qui traite un seul caractère puis se rappelle sur le reste ?"
        ],
        correction: [
          { text: "Régner : une chaîne vide ou d'un seul caractère donne directement 0 ou 1. Diviser : sinon, on coupe la chaîne au milieu. Combiner : on additionne les deux comptes." },
          { code: `def nb_occurence(chaine, x):
    # RÉGNER : cas trivial, chaîne vide ou d'un caractère
    if len(chaine) <= 1:
        if chaine == x:
            return 1
        return 0
    # DIVISER : deux moitiés
    k = len(chaine) // 2
    # COMBINER : somme des deux sous-résultats
    return nb_occurence(chaine[:k], x) + nb_occurence(chaine[k:], x)

print(nb_occurence('abracadabra', 'a'))                # 5
print(nb_occurence('abracadabra', 'A'))                # 0 : la casse compte
print(nb_occurence('à la mer, à la plage', 'à'))       # 2 : les accents aussi` },
          { text: "Le test len(chaine) <= 1 traite aussi la chaîne vide. Avec un test == 1, l'appel nb_occurence('', 'a') ne s'arrêterait jamais, car ''[:0] et ''[0:] valent encore ''." },
          { text: "Nombre d'appels : chaque appel sur une chaîne d'au moins 2 caractères en déclenche exactement deux, et les feuilles de l'arbre sont les n caractères. Un arbre binaire à n feuilles a n − 1 nœuds internes, soit 2n − 1 appels : 21 pour 'abracadabra', ce qu'on vérifie avec un compteur. La profondeur est d'environ log2(n) : 5 niveaux ici." },
          { text: "La variante « réduire » proposée dans le corrigé du formateur traite le dernier caractère puis se rappelle sur les n − 1 autres. Elle est correcte, mais ce n'est plus diviser pour régner au sens strict : il n'y a qu'un sous-problème, à peine plus petit. Elle fait n + 1 appels sur une profondeur n, et lève RecursionError dès 1 000 caractères (limite par défaut de Python). La version qui coupe en deux ne descend qu'à une profondeur d'environ 17 pour 100 000 caractères." },
          { code: `def nb_occurence_2(chaine, x):
    if not chaine:
        return 0
    c = 1 if chaine[-1] == x else 0
    return c + nb_occurence_2(chaine[:-1], x)

print(nb_occurence_2('abracadabra', 'a'))     # 5
print(nb_occurence('a' * 100000, 'a'))        # 100000, sans dépasser la pile` }
        ]
      },
      {
        num: "2", title: "Version itérative et course contre la montre (timeit)",
        intro: "Le notebook propose de mesurer les deux versions avec timeit, sur 100 000 appels chacune.",
        code: `from timeit import timeit

# version itérative
def nb_occurence_i(chaine, x):
    ...

assert not hasattr(nb_occurence, 'callgraph'), 'Recharger cette fonction sans viz'
# (notebook : f-strings réécrites sans f-string, voir la note)
print('Version récursive :', timeit("nb_occurence('abracadabra', 'a')", number=100000, globals=globals()), 's')
print('Version itérative :', timeit("nb_occurence_i('abracadabra', 'a')", number=100000, globals=globals()), 's')`,
        note: "Deux pièges dans cette cellule. 1) L'assert vérifie que nb_occurence n'est plus la version enveloppée par rcviz : ré-exécuter d'abord la cellule de définition. 2) Le notebook écrit ces deux affichages sous la forme print(f'Version récursive : {timeit(\"nb_occurence('abracadabra', 'a')\", number=100000, globals=globals())}s') : des apostrophes à l'intérieur d'une f-string elle-même délimitée par des apostrophes. Python l'accepte depuis la version 3.12, celle qu'utilise Basthon aujourd'hui. Avec Python 3.11 ou une version antérieure, c'est une SyntaxError (« f-string: unterminated string »). On les a donc réécrits ci-dessus sans f-string, et la correction calcule les temps à part : les deux marchent avec toutes les versions.",
        questions: [
          "Compléter nb_occurence_i avec une boucle et un compteur.",
          "Comparer les temps des deux versions. Laquelle est la plus rapide, et pourquoi ?",
          "Quelle est la complexité de chacune ?"
        ],
        correction: [
          { code: `from timeit import timeit

def nb_occurence_i(chaine, x):
    c = 0
    for u in chaine:
        if u == x:
            c += 1
    return c

assert not hasattr(nb_occurence, 'callgraph'), 'Recharger cette fonction sans viz'
t_rec = timeit("nb_occurence('abracadabra', 'a')", number=100000, globals=globals())
t_ite = timeit("nb_occurence_i('abracadabra', 'a')", number=100000, globals=globals())
print(f"Version récursive : {t_rec}s")
print(f"Version itérative : {t_ite}s")` },
          { text: "Sur notre machine (Python 3.11), on obtient environ 0,15 s pour la version récursive et 0,02 s pour l'itérative, soit un facteur 7. Le notebook affiche 0,34 s et 0,055 s dans Basthon, soit un facteur 6. Les valeurs dépendent de la machine, mais le rapport reste du même ordre." },
          { text: "Explication : le problème est déjà linéaire, un simple parcours suffit. La version diviser pour régner fait le même nombre de comparaisons (n), mais elle y ajoute 2n − 1 appels de fonction et la copie des tranches chaine[:k] et chaine[k:]. Chaque niveau de l'arbre recopie toute la chaîne, donc O(n log n) caractères sont copiés au total, contre O(n) opérations pour la boucle." },
          { text: "C'est la conclusion du notebook : ici, diviser pour régner n'a pas de sens. En général, l'efficacité d'un algorithme diviser pour régner dépend surtout du coût de la recombinaison et de ce que la division fait gagner. En classe, c'est un bon contre-exemple à montrer avant le tri fusion : récursif ne veut pas dire plus rapide." }
        ]
      },
      {
        num: "3", title: "Tester la fonction _fusion fournie",
        intro: "Le tri fusion, inventé par John von Neumann en 1945, repose sur deux fonctions. fusion réunit deux listes triées en une seule liste triée : ce sont les phases régner et combiner. tri_fusion coupe la liste en deux, se rappelle sur chaque moitié et fusionne les résultats : c'est la phase diviser. Le module _fusion.py fournit une fonction _fusion déjà corrigée, que l'on commence par tester.",
        code: `# pour les tests et les essais (tutor et rcviz : Basthon uniquement)
from doctest import run_docstring_examples
from tutor import tutor
from rcviz import viz

from _fusion import _fusion

# deux listes triées indépendamment
a = [1, 4, 8]
b = [2, 3, 12]
_fusion(a, b)

# À vous de jouer : proposez quelques tests supplémentaires
`,
        note: "Le bouton Basthon du site charge _fusion.py avec le notebook. Sinon, hors Capytale, il faut télécharger _fusion.py (lien dans le notebook, dépôt LANSIG/NSI) et le placer à côté du notebook. Dans Basthon : Fichier → Ouvrir..., puis le déclarer comme module. Une curiosité du module : ses doctests appellent fusion(...) et non _fusion(...). La commande python3 -m doctest _fusion.py signale donc 5 échecs (NameError), alors que la fonction est juste.",
        questions: [
          "Que renvoie _fusion([1, 4, 8], [2, 3, 12]) ?",
          "Proposer des tests supplémentaires : le notebook laisse trois cellules vides.",
          "Quels cas limites faut-il absolument tester ?"
        ],
        correction: [
          { text: "La cellule affiche [1, 2, 3, 4, 8, 12]." },
          { code: `from _fusion import _fusion

assert _fusion([1, 4, 8], [2, 3, 12]) == [1, 2, 3, 4, 8, 12]
# listes vides
assert _fusion([], []) == []
assert _fusion([], [1, 2]) == [1, 2]
assert _fusion([3], []) == [3]
# une liste entièrement avant l'autre, dans les deux sens
assert _fusion([1, 2], [5, 6, 7]) == [1, 2, 5, 6, 7]
assert _fusion([5, 6, 7], [1, 2]) == [1, 2, 5, 6, 7]
# doublons, y compris d'une liste à l'autre
assert _fusion([1, 1, 2], [1, 2, 2]) == [1, 1, 1, 2, 2, 2]
# négatifs et longueurs différentes
assert _fusion([-5, 0], [-7, 10, 11]) == [-7, -5, 0, 10, 11]
# les listes de départ ne sont pas modifiées
a, b = [1, 3], [2, 4]
_fusion(a, b)
assert a == [1, 3] and b == [2, 4]
# comparaison avec sorted sur des listes aléatoires
from random import randint
for _ in range(100):
    x = sorted(randint(-20, 20) for _ in range(randint(0, 15)))
    y = sorted(randint(-20, 20) for _ in range(randint(0, 15)))
    assert _fusion(x, y) == sorted(x + y)
print("tous les tests passent")` },
          { text: "Cas limites à couvrir : une ou deux listes vides, une liste épuisée avant l'autre (dans les deux sens), des doublons, des longueurs différentes, et le fait que les listes passées en argument ne sont pas modifiées. Comparer avec sorted(x + y) sur des listes aléatoires est une bonne habitude." },
          { text: "Remarque : à égalité, _fusion prend l'élément de b, car le test a[i] < b[j] est strict. Le résultat est juste, mais le tri obtenu n'est pas stable : deux éléments égaux peuvent échanger leur ordre. Avec a[i] <= b[j], la fusion devient stable. C'est le choix fait à l'étape 6." }
        ]
      },
      {
        num: "4", title: "La fonction récursive tri_fusion",
        intro: "_fusion étant fournie, on écrit le tri : diviser la liste en deux jusqu'à obtenir des listes d'un seul élément, déjà triées, puis fusionner à la remontée.",
        code: `def tri_fusion (lst):
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
    ...

run_docstring_examples(tri_fusion, globals())

tri_fusion([45, 6, 78, 45, 33, 1, 0])

# Graphe des appels (Basthon uniquement)
from rcviz import viz
tri_fusion = viz(tri_fusion)
tri_fusion([45, 6, 78, 45, 33, 1, 0])
tri_fusion.callgraph()`,
        questions: [
          "Écrire tri_fusion(lst), récursive, en s'appuyant sur _fusion. Elle renvoie une nouvelle liste triée sans modifier lst.",
          "Pourquoi le cas de base doit-il être len(lst) <= 1, et pas len(lst) == 1 ?",
          "Que renvoie tri_fusion([45, 6, 78, 45, 33, 1, 0]) ? Combien d'appels pour ces 7 éléments ?"
        ],
        correction: [
          { code: `from doctest import run_docstring_examples
from _fusion import _fusion

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
        return lst[:]
    # DIVISER
    milieu = len(lst) // 2
    gauche = tri_fusion(lst[:milieu])
    droite = tri_fusion(lst[milieu:])
    # COMBINER
    return _fusion(gauche, droite)

run_docstring_examples(tri_fusion, globals())    # n'affiche rien : tout passe
print(tri_fusion([45, 6, 78, 45, 33, 1, 0]))      # [0, 1, 6, 33, 45, 45, 78]` },
          { text: "run_docstring_examples n'affiche rien quand tous les tests passent : le silence est ici une bonne nouvelle." },
          { text: "Le doctest tri_fusion([]) piège le cas de base. Avec if len(lst) == 1, la liste vide est coupée en deux listes vides, indéfiniment, jusqu'à RecursionError. C'est précisément le défaut du corrigé public de 2021 (triFusion avec taille == 1), que la version 2026 du notebook détecte grâce à ce test." },
          { text: "La liste de départ n'est jamais modifiée : les tranches lst[:milieu] et lst[milieu:] sont des copies, et _fusion construit une nouvelle liste. Dans le cas de base, on renvoie lst[:] plutôt que lst, pour ne jamais rendre l'argument lui-même. Renvoyer lst passe aussi les tests, mais pour une liste de 0 ou 1 élément le « résultat » serait alors la même liste que l'argument." },
          { text: "Pour 7 éléments, on compte 13 appels (2n − 1, comme à l'étape 1) sur 4 niveaux. Le graphe rcviz de Basthon montre la division à la descente et la fusion à la remontée." }
        ]
      },
      {
        num: "5", title: "Complexité : tris lents contre tri fusion",
        intro: "Le module triClassique_V2.py fournit triSelection, triInsertion et triBulle, trois tris en place vus en Première. On compare les temps.",
        code: `from triClassique_V2 import *

from random import shuffle
from timeit import timeit

assert not hasattr(tri_fusion, 'callgraph'), 'Recharger cette fonction sans viz'

for n in [100, 1000, 10000]:
    a = [x for x in range(n)]
    shuffle(a)

    a1 = a.copy()
    print(F"{n} éléments triés par sélection en {timeit('triSelection(a1)', number = 1, globals = globals())}s")
    a1 = a.copy()
    print(F"{n} éléments triés par insertion en {timeit('triInsertion(a1)', number = 1, globals = globals())}s")
    a1 = a.copy()
    print(F"{n} éléments triés par fusion en {timeit('tri_fusion(a1)', number = 1, globals = globals())}s")

for n in [100, 1000, 10000, 100000, 1000000]:
    a = [x for x in range(n)]
    shuffle(a)

    print(F"{n} éléments triés par fusion en {timeit('a2 = tri_fusion(a)', number = 1, globals = globals())}s")

for n in [100, 1000, 10000, 100000, 1000000]:
    a = [x for x in range(n)]
    shuffle(a)

    print(F"{n} éléments triés par sorted en {timeit('a2 = sorted(a)', number = 1, globals = globals())}s")`,
        note: "Le bouton Basthon du site charge aussi triClassique_V2.py ; sinon, hors Capytale, il faut le télécharger. Ses tris travaillent en place, d'où a1 = a.copy() avant chaque mesure : sinon le deuxième tri recevrait une liste déjà triée. Si tri_fusion est encore enveloppée par rcviz, l'assert bloque. Sans l'assert, on obtient une KeyError venue de rcviz, comme dans le corrigé du formateur : il faut ré-exécuter la définition de tri_fusion. Le bloc de test de triClassique_V2.py contient d'ailleurs ce piège : b = a ne copie pas la liste, si bien que les deuxième et troisième tris y reçoivent une liste déjà triée.",
        questions: [
          "Lancer les trois cellules de mesure et relever les temps.",
          "Indiquer la complexité temporelle des deux tris lents au programme de Première.",
          "Pourquoi qualifie-t-on le tri fusion de tri rapide ?"
        ],
        correction: [
          { text: "Mesures sur notre machine (Python 3.11), en secondes. Dans Basthon, tout est environ 20 fois plus lent (le corrigé 2021 donne 0,19 s pour 1 000 éléments triés par sélection), mais les rapports sont les mêmes." },
          { code: `n          sélection   insertion   tri_fusion   sorted
100        0,0001      0,0001      0,0001       0,00001
1 000      0,009       0,013       0,001        0,0001
10 000     0,92        1,45        0,013        0,001
100 000    —           —           0,17         0,020
1 000 000  —           —           2,9          0,29` },
          { text: "Lecture du tableau : quand n est multiplié par 10, le temps des tris par sélection et par insertion est multiplié par environ 100, signe d'un comportement quadratique. Celui du tri fusion est multiplié par un peu plus de 10 : un facteur 10 pour n, et un facteur log n qui grandit lentement." },
          { text: "Tri par sélection : O(n²) dans tous les cas. Il fait n(n − 1)/2 comparaisons, même sur une liste déjà triée. Tri par insertion : O(n²) dans le pire cas (liste triée à l'envers) et en moyenne, mais O(n) dans le meilleur cas (liste déjà triée)." },
          { text: "Tri fusion : O(n log n) dans tous les cas. Il y a environ log2(n) niveaux de découpage (20 pour un million d'éléments) et, à chaque niveau, les fusions traitent n éléments en tout, en temps linéaire. La relation de récurrence T(n) = 2T(n/2) + O(n) donne O(n log n). C'est en ce sens qu'il est « rapide » : pour n = 1 000 000, n² vaut 10¹², alors que n·log2(n) vaut environ 2 × 10⁷." },
          { text: "sorted (Timsort, écrit en C, hybride du tri fusion et du tri par insertion) est encore 10 fois plus rapide : même complexité O(n log n), mais une constante bien plus petite. Attention au vocabulaire en classe : « tri rapide » désigne aussi le quicksort, un autre algorithme diviser pour régner. Contrepartie du tri fusion : il n'est pas en place. Il utilise O(n) mémoire supplémentaire pour les listes intermédiaires." }
        ]
      },
      {
        num: "6", title: "La fonction fusion, version 1 (append, extend, slicing)",
        intro: "On n'utilise plus _fusion : on écrit sa propre fonction itérative fusion(lst_a, lst_b), qui reçoit deux listes triées et renvoie leur fusion triée. Version 1 : la plus simple, avec les méthodes des listes Python (append, extend, slicing).",
        code: `def fusion(lst_a, lst_b):
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
    ...

a = [1, 1, 4, 8, 15, 101, 103]
b = [1, 2, 3, 12, 15, 46, 48, 78, 85]
fusion(a, b)

run_docstring_examples(fusion, globals())`,
        note: "Dans le notebook distribué, run_docstring_examples(fusion, globals()) a produit une NameError : la cellule d'imports (from doctest import run_docstring_examples) n'avait pas été exécutée. Après un redémarrage du noyau, il faut toujours ré-exécuter les cellules d'import.",
        questions: [
          "Écrire fusion en utilisant append, extend et le slicing.",
          "Quelle est sa complexité ?",
          "Dans tri_fusion, remplacer _fusion par fusion : le tri reste-t-il juste ?"
        ],
        correction: [
          { code: `def fusion(lst_a, lst_b):
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
        if lst_a[i] <= lst_b[j]:     # <= : à égalité, on prend dans lst_a (tri stable)
            resultat.append(lst_a[i])
            i += 1
        else:
            resultat.append(lst_b[j])
            j += 1
    # l'une des deux listes est épuisée : on recopie la fin de l'autre
    resultat.extend(lst_a[i:])
    resultat.extend(lst_b[j:])
    return resultat

a = [1, 1, 4, 8, 15, 101, 103]
b = [1, 2, 3, 12, 15, 46, 48, 78, 85]
print(fusion(a, b))
run_docstring_examples(fusion, globals())    # rien à signaler` },
          { text: "fusion(a, b) renvoie [1, 1, 1, 2, 3, 4, 8, 12, 15, 15, 46, 48, 78, 85, 101, 103] et les 11 exemples du docstring passent." },
          { text: "Principe : deux indices avancent chacun dans sa liste. À chaque tour, on recopie le plus petit des deux éléments pointés. Quand une liste est épuisée, extend recopie d'un coup la fin de l'autre ; l'une des deux tranches est alors vide. Complexité : O(len(lst_a) + len(lst_b)), car chaque élément est recopié une seule fois. C'est cette fusion en temps linéaire qui fait l'efficacité du tri fusion." },
          { text: "Le test lst_a[i] <= lst_b[j], plutôt que <, rend la fusion stable : à égalité, l'élément de la liste de gauche passe en premier. Le tri fusion conserve alors l'ordre initial des éléments égaux, ce qui compte quand on trie des enregistrements selon une clé. Le corrigé du formateur teste lst_a[ia] >= lst_b[ib] et prend donc dans lst_b à égalité : le résultat est juste, mais le tri n'est pas stable." },
          { code: `def tri_fusion(lst):
    if len(lst) <= 1:
        return lst[:]
    milieu = len(lst) // 2
    return fusion(tri_fusion(lst[:milieu]), tri_fusion(lst[milieu:]))   # fusion au lieu de _fusion

from random import randint
for _ in range(200):
    lst = [randint(-50, 50) for _ in range(randint(0, 40))]
    assert tri_fusion(lst) == sorted(lst)
print(tri_fusion([45, 6, 78, 45, 33, 1, 0]))   # [0, 1, 6, 33, 45, 45, 78]` }
        ]
      },
      {
        num: "7", title: "La fonction fusion_2, sans append, extend ni slicing",
        intro: "Version 2, « moins pythonesque » : la même fusion, mais sans append, sans extend et sans tranches.",
        code: `# version moins python
# sans : append, extend, slicing

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
    ...

a = [-1, 1, 1, 4, 8, 15, 142, 143]
b = [1, 2, 3, 12, 15, 46, 48, 78, 125]
fusion2(a, b)

run_docstring_examples(fusion_2, globals())`,
        note: "Coquille du notebook : la cellule de test appelle fusion2(a, b), ce qui provoque une NameError. La fonction s'appelle fusion_2.",
        questions: [
          "Écrire fusion_2 sans append, extend ni slicing.",
          "Comparer les temps de fusion et de fusion_2 sur de grandes listes.",
          "Laquelle des deux se transpose le plus directement dans un autre langage ?"
        ],
        correction: [
          { text: "Sans append, on réserve d'emblée une liste résultat de la bonne taille, [0] * (na + nb), puis on la remplit case par case. Une seule boucle suffit : on prend dans lst_a si lst_b est épuisée, ou si l'élément courant de lst_a est le plus petit. Sinon, on prend dans lst_b." },
          { code: `def fusion_2(lst_a, lst_b):
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
    resultat = [0] * (na + nb)       # réservée d'avance, remplie case par case
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

a = [-1, 1, 1, 4, 8, 15, 142, 143]
b = [1, 2, 3, 12, 15, 46, 48, 78, 125]
print(fusion_2(a, b))
run_docstring_examples(fusion_2, globals())` },
          { text: "Résultat : [-1, 1, 1, 1, 2, 3, 4, 8, 12, 15, 15, 46, 48, 78, 125, 142, 143], et les doctests passent. Le corrigé du formateur écrit trois boucles while : une boucle principale tant que les deux listes ont des éléments, puis une boucle pour vider le reste de chaque liste. Les deux écritures sont équivalentes." },
          { code: `from timeit import timeit
a = list(range(1_000_000))
t1 = timeit('fusion(a, a)', number=1, globals=globals())
t2 = timeit('fusion_2(a, a)', number=1, globals=globals())
print(f"fusion   : {t1:.3f} s")
print(f"fusion_2 : {t2:.3f} s")` },
          { text: "Les deux fonctions sont en O(n) : seule la constante diffère, et elle dépend surtout de l'écriture de la boucle (nombre de tests et d'appels à len par tour) et de la version de Python. Le formateur, dans Basthon, sur deux listes de 10 millions d'éléments, trouve fusion plus rapide (3,28 s contre 3,88 s pour sa version à trois while). Chez nous, sur deux listes d'un million d'éléments, la fusion_2 ci-dessus est plutôt plus rapide avec Python 3.11 (environ 0,1 s, contre 0,13 à 0,3 s pour fusion selon les essais), et l'écart est faible avec Python 3.13 (0,16 à 0,18 s pour fusion_2, 0,18 à 0,23 s pour fusion). Leçon pour la classe : on ne départage deux écritures de même complexité qu'en mesurant." },
          { text: "fusion_2 se traduit telle quelle en C ou en Java, où un tableau a une taille fixe et où append, extend et les tranches n'existent pas." }
        ]
      }
    ]
  },
  // ── TP — Diviser pour régner (2) : la multiplication de Karatsuba ──
  {
    id: "tp-dpr-karatsuba", bloc: "bloc2", jour: "En ligne — 8 et 15 octobre 2026 (FDIU)",
    theme: "Algorithmique — diviser pour régner",
    title: "TP — Diviser pour régner (2) : la multiplication de Karatsuba",
    type: 'tp',
    notebook: "FDIU_diviser_pour_regner_2_karatsuba.ipynb",
    intro: "TP du cours en ligne des 8 et 15 octobre 2026 (FDIU, DU Normandie), terminé en séance le 15 octobre. Multiplier deux nombres de n chiffres comme à l'école demande n² multiplications de deux chiffres. Anatoli Karatsuba a montré en 1960 (publication en 1962) qu'on peut faire mieux : on coupe chaque nombre en deux moitiés, M = a·10^k + b et N = c·10^k + d, et trois produits de moitiés suffisent au lieu de quatre. Appliquée récursivement, l'idée donne une complexité en O(n^1,585). Les nombres sont représentés par des listes de chiffres, poids faible en tête. On construit d'abord les outils (conversions, mise en forme, addition, comparaison, soustraction), puis mul_Kara, et on compte les multiplications élémentaires. Ouvre le notebook dans Basthon, cherche par toi-même, puis déplie la correction.",
    steps: [
      {
        num: "1", title: "conv : d'un entier à la liste de ses chiffres (récursif)",
        intro: "On représente un nombre par la liste de ses chiffres, poids faible en tête : 123456 s'écrit [6, 5, 4, 3, 2, 1]. Avec cette convention, l'indice d'un chiffre est exactement sa puissance de 10, et ajouter des zéros en fin de liste ne change pas la valeur du nombre.",
        code: `from doctest import run_docstring_examples

def conv(x) :
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
    ...

conv(12345)

run_docstring_examples(conv, globals())`,
        questions: [
          "Écrire conv(x), obligatoirement de façon récursive.",
          "Quel est le cas de base ? Pourquoi conv(0) doit-il renvoyer [0] et pas une liste vide ?"
        ],
        correction: [
          { code: `from doctest import run_docstring_examples

def conv(x) :
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
    return [x % 10] + conv(x // 10)  # le chiffre des unités, puis les autres

print(conv(12345))                   # [5, 4, 3, 2, 1]
run_docstring_examples(conv, globals())` },
          { text: "x % 10 donne le chiffre des unités et x // 10 le nombre privé de ce chiffre. Le cas de base est x < 10, c'est-à-dire un nombre d'un seul chiffre. Avec un cas de base « x == 0 renvoie [] », conv(0) renverrait une liste vide, qui ne représente aucun nombre, et toutes les fonctions suivantes devraient traiter ce cas à part. La convention retenue : un nombre a toujours au moins un chiffre." },
          { text: "Profondeur de récursion : un appel par chiffre. Pour les nombres de 94 chiffres de l'étape 9, on reste très loin de la limite de 1 000 appels." }
        ]
      },
      {
        num: "2", title: "conv_inv : de la liste de chiffres à l'entier (récursif)",
        code: `def conv_inv(lst):
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
    ...

conv_inv([5, 4, 3, 2, 1])

run_docstring_examples(conv_inv, globals())`,
        note: "En 2026, la consigne impose la récursivité pour les deux conversions. Le corrigé public de 2021 écrivait conv_inv (alors convInv) avec une boucle, ce qu'autorisait l'ancienne consigne.",
        questions: [
          "Écrire conv_inv(lst), elle aussi de façon récursive."
        ],
        correction: [
          { code: `def conv_inv(lst):
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

print(conv_inv([5, 4, 3, 2, 1]))     # 12345
run_docstring_examples(conv_inv, globals())` },
          { text: "Idée : [5, 4, 3, 2, 1] vaut 5 + 10 × (valeur de [4, 3, 2, 1]). C'est le schéma de Horner, lu du poids faible vers le poids fort. Les deux fonctions sont réciproques : conv_inv(conv(x)) == x pour tout entier naturel x." }
        ]
      },
      {
        num: "3", title: "meme_len : égaliser les longueurs",
        intro: "Pour additionner ou couper deux nombres chiffre à chiffre, il est pratique que leurs listes aient la même longueur. Ajouter des zéros en poids fort, c'est-à-dire en fin de liste, ne change pas la valeur : 000322 = 322.",
        code: `def meme_len(l1, l2):
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
    ...

a = [5, 4, 3, 2, 1]
b = [1]
meme_len(a, b)
b

run_docstring_examples(meme_len, globals())`,
        questions: [
          "Écrire meme_len(l1, l2).",
          "Que renvoie cette fonction ? Comment le voit-on dans les doctests ?"
        ],
        correction: [
          { code: `def meme_len(l1, l2):
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

a = [5, 4, 3, 2, 1]
b = [1]
meme_len(a, b)
print(b)                             # [1, 0, 0, 0, 0]
run_docstring_examples(meme_len, globals())` },
          { text: "meme_len ne renvoie rien (None) : elle modifie en place la plus courte des deux listes. Dans les doctests, la ligne >>> meme_len(a, b) n'est suivie d'aucune sortie, et c'est en affichant a et b ensuite qu'on constate l'effet. Une seule des deux boucles while s'exécute effectivement. C'est pour cette raison que add, sub et mul_Kara travaillent sur des copies : sans elles, les listes de l'utilisateur seraient allongées." }
        ]
      },
      {
        num: "4", title: "supp_zero : retirer les zéros inutiles",
        code: `def supp_zero(lst):
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
    ...

b = [1, 2, 0, 0, 0]
supp_zero(b)
b

run_docstring_examples(supp_zero, globals())`,
        questions: [
          "Écrire supp_zero(lst), qui retire en place les zéros de poids fort.",
          "Quel cas particulier le dernier doctest vérifie-t-il ?"
        ],
        correction: [
          { code: `def supp_zero(lst):
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

b = [1, 2, 0, 0, 0]
supp_zero(b)
print(b)                                   # [1, 2]
run_docstring_examples(supp_zero, globals())` },
          { text: "Les zéros de poids fort sont en fin de liste : pop() les retire un par un, en temps constant. Le dernier doctest, ajouté en 2026, vérifie que le nombre 0 garde un chiffre : [0, 0, 0, 0, 0] doit devenir [0] et non []. D'où la condition len(lst) > 1, testée en premier : si la liste ne contient plus qu'un élément, on s'arrête avant de regarder lst[-1]." }
        ]
      },
      {
        num: "5", title: "add : l'addition posée",
        intro: "Exemple : [9, 9, 9, 9] + [1] = [0, 0, 0, 0, 1], c'est-à-dire 9999 + 1 = 10000.",
        code: `def add(lst1, lst2):
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
    ...

a = [8, 9, 9, 9]
b = [1]
add(a,b)

a = [9, 9, 9, 9]
b = [1]
add(a,b)

run_docstring_examples(add, globals())`,
        questions: [
          "Écrire add(lst1, lst2) sans modifier les listes passées en argument.",
          "Quel test échoue si l'on oublie la retenue finale ?"
        ],
        correction: [
          { code: `def add(lst1, lst2):
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
    l1 = lst1[:]                     # copies : lst1 et lst2 restent intactes
    l2 = lst2[:]
    meme_len(l1, l2)
    retenue = 0
    result = []
    for i in range(len(l1)):
        s = l1[i] + l2[i] + retenue
        result.append(s % 10)        # le chiffre des unités va au résultat
        retenue = s // 10            # celui des dizaines part en retenue
    if retenue != 0:                 # retenue finale : un chiffre de plus
        result.append(retenue)
    return result

print(add([8, 9, 9, 9], [1]))        # [9, 9, 9, 9]
print(add([9, 9, 9, 9], [1]))        # [0, 0, 0, 0, 1]
run_docstring_examples(add, globals())` },
          { text: "C'est l'addition posée de l'école primaire, de droite à gauche dans l'écriture usuelle, donc de gauche à droite dans la liste. Sans les deux dernières lignes, 9999 + 1 donnerait [0, 0, 0, 0], soit 0, et les doctests [0, 0, 0, 0, 1] et [0, 1, 1, 1, 1, 1] échoueraient. En 2021, le notebook donnait cette fonction avec précisément cette omission, à retrouver par les tests. En 2026, on l'écrit entièrement." }
        ]
      },
      {
        num: "6", title: "plus_grand : comparer deux nombres",
        code: `def plus_grand(lst1, lst2):
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
    ...

a = [1, 7, 3, 1, 3]
b = [2, 7, 3, 1, 3]
plus_grand(b, a)

b = [5, 4]
a = [0]
plus_grand(b, a)

run_docstring_examples(plus_grand, globals())`,
        questions: [
          "Écrire plus_grand(lst1, lst2), qui renvoie True si lst1 ≥ lst2.",
          "Dans quel sens faut-il parcourir les listes ?",
          "Que se passe-t-il si une liste porte des zéros inutiles en poids fort ?"
        ],
        correction: [
          { code: `def plus_grand(lst1, lst2):
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
    meme_len(l1, l2)                         # mêmes longueurs
    for i in range(len(l1) - 1, -1, -1):     # du poids fort vers le poids faible
        if l1[i] > l2[i]:
            return True
        if l1[i] < l2[i]:
            return False
    return True                              # tous les chiffres sont égaux

print(plus_grand([2, 7, 3, 1, 3], [1, 7, 3, 1, 3]))   # True  : 31372 >= 31371
print(plus_grand([5, 4], [0]))                         # True  : 45 >= 0
print(plus_grand([5, 0, 0], [9]))                      # False : 5 < 9
run_docstring_examples(plus_grand, globals())` },
          { text: "On compare comme dans un dictionnaire, mais à partir du poids fort, donc en partant de la fin de la liste. Le premier chiffre différent décide. Si tous les chiffres sont égaux, les nombres sont égaux et la réponse est True (≥)." },
          { text: "Le piège est de comparer d'abord les longueurs, comme le faisait le corrigé de 2021. Ce raccourci est faux dès qu'une liste porte des zéros de poids fort : [5, 0, 0] (qui vaut 5) serait déclaré plus grand que [9]. Égaliser les longueurs avec meme_len sur des copies règle le problème." }
        ]
      },
      {
        num: "7", title: "sub : la soustraction posée",
        intro: "sub(lst1, lst2) renvoie lst1 − lst2, avec la précondition lst1 ≥ lst2. Le notebook fournit le début de la fonction.",
        code: `def sub(lst1, lst2):
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

    ...

b = [1]
a = [0, 0, 0, 0, 0, 0, 0, 0, 0, 1]
sub(a, b)

b = [1]
a = [1]
sub(a, b)

b = [2]
a = [1]
sub(a, b)

run_docstring_examples(sub, globals())`,
        questions: [
          "Compléter sub.",
          "Que renvoient les trois cellules de test ? Commenter la dernière.",
          "Pourquoi appeler supp_zero à la fin ?"
        ],
        correction: [
          { code: `def sub(lst1, lst2):
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
        if chiffre < 0:              # on emprunte une dizaine au rang suivant
            chiffre += 10
            retenue = 1
        else:
            retenue = 0
        result.append(chiffre)
    supp_zero(result)
    return result

print(sub([0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1]))   # [9, 9, 9, 9, 9, 9, 9, 9, 9]
print(sub([1], [1]))                               # [0]
print(sub([1], [2]))                               # [9] : faux, précondition violée
run_docstring_examples(sub, globals())` },
          { text: "Résultats : 1000000000 − 1 = 999999999, soit neuf 9 ; 1 − 1 = 0, soit [0] grâce à supp_zero qui garde un chiffre." },
          { text: "sub([1], [2]) renvoie [9] : c'est faux, parce que la précondition lst1 ≥ lst2 n'est pas respectée. La retenue qui reste à 1 à la fin de la boucle signale qu'on a « emprunté » au-delà du dernier chiffre : on obtient le complément à 10 de −1, comme en complément à deux pour les entiers machine. C'est pour cette raison que mul_Kara doit comparer avant de soustraire (avec plus_grand) et gérer le signe à part. Pour une version défensive, on peut ajouter assert retenue == 0 avant le return." },
          { text: "supp_zero est nécessaire parce que la différence a souvent moins de chiffres que lst1 : 22345 − 12345 donne [1, 0, 0, 0, 0] avant nettoyage, et [1] après. Sans ce nettoyage, les zéros inutiles s'accumuleraient au fil des appels récursifs de mul_Kara et fausseraient les longueurs." }
        ]
      },
      {
        num: "8", title: "mul_Kara : la multiplication de Karatsuba",
        intro: "Avec M = a·10^k + b et N = c·10^k + d, on calcule t1 = a·c, t2 = b·d et t3 = (a − b)·(c − d), puis M·N = t1·10^(2k) + (t1 + t2 − t3)·10^k + t2. Trois produits de moitiés au lieu de quatre, appliqués récursivement jusqu'à des nombres d'un chiffre. Voici la version à trous proposée dans l'aide du notebook.",
        code: `def mul_Kara(lst1, lst2):
    """Multiplication des deux listes lst1 et lst2 avec la méthode de KARATSUBA
    Fonctions récursive qui ne modifie pas lst1 et lst2.
    """
    global compt_mul
    # copie les listes pour ne pas les modifier
    l1 = lst1[:]
    l2 = lst2[:]
    # ajuste les longueurs des listes éventuellement
    meme_len(l1, l2)

    # condition d'arrêt
    # les listes ont un seul éléments
    ...

    # les listes ont plus que 1 élément
    # on les coupe en deux
    ...

    # on applique ensuite Karatsuba sur les 4 parties
    t1 = ...
    t2 = ...

    # t3 = (a - b) * (c - d) = t31 * t32
    # attention au signe, le résultat peut être négatif
    sign = 1 # on démarre avec un signe +
    ...

    t3 = ...

    # t = t1 + t2 - t3
    # selon signe de t3
    if sign > 0:
        t = ...
    else:
        t = ...
    # on a tout pour calculer le résultat
    # t1 * 10^2k + (t1 + t2 - t3) * 10^k + t2
    # t1 * 10^2k = [0] * 2 * k + ac on ajoute 2k 0 en poids faible
    # t = (t1 + t2 - t3)
    # donc t * 10^k = [0] * k + t on ajoute k 0 en poids faible
    # reste plus qu'à ajouter t2 et on peut retourner le résultat
    res = ...

    supp_zero(res)

    return res`,
        questions: [
          "Compléter mul_Kara.",
          "Montrer que a·c + b·d − (a − b)·(c − d) = a·d + b·c, et en déduire la formule de Karatsuba.",
          "Lors du découpage, quelle moitié de la liste correspond à a, et laquelle à b ?",
          "Pourquoi faut-il gérer un signe pour t3, et comment ?",
          "Quel est le rôle de [0] * k et de [0] * 2 * k ?"
        ],
        correction: [
          { code: `compt_mul = 0

def mul_Kara(lst1, lst2):
    """Multiplication des deux listes lst1 et lst2 avec la méthode de KARATSUBA
    Fonctions récursive qui ne modifie pas lst1 et lst2.
    """
    global compt_mul
    # copie les listes pour ne pas les modifier
    l1 = lst1[:]
    l2 = lst2[:]
    # ajuste les longueurs des listes éventuellement
    meme_len(l1, l2)

    # condition d'arrêt : les listes ont un seul élément
    if len(l1) == 1:
        compt_mul += 1                       # une multiplication élémentaire
        return conv(l1[0] * l2[0])           # 0 à 81 : un ou deux chiffres

    # on coupe en deux : poids faibles en tête de liste
    k = len(l1) // 2
    b, a = l1[:k], l1[k:]                    # M = a * 10^k + b
    d, c = l2[:k], l2[k:]                    # N = c * 10^k + d
    for part in (a, b, c, d):
        supp_zero(part)

    # on applique ensuite Karatsuba sur les 4 parties
    t1 = mul_Kara(a, c)
    t2 = mul_Kara(b, d)

    # t3 = (a - b) * (c - d) = t31 * t32, en valeur absolue
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

    # t = t1 + t2 - t3, selon le signe de t3
    if sign > 0:
        t = sub(add(t1, t2), t3)
    else:
        t = add(add(t1, t2), t3)
    # t1 * 10^2k + t * 10^k + t2
    res = add(add([0] * (2 * k) + t1, [0] * k + t), t2)

    supp_zero(res)

    return res

print(conv_inv(mul_Kara(conv(1234), conv(5678))), 1234 * 5678)   # 7006652 7006652` },
          { text: "La formule : (a − b)(c − d) = ac − ad − bc + bd, donc ac + bd − (a − b)(c − d) = ad + bc. Or (a·10^k + b)(c·10^k + d) = ac·10^(2k) + (ad + bc)·10^k + bd. Le coefficient du milieu, qui demandait deux produits (ad et bc), s'obtient avec un seul produit nouveau, t3, en réutilisant t1 = ac et t2 = bd déjà calculés." },
          { text: "Découpage : les poids faibles sont en tête de liste, donc b = l1[:k] (les k chiffres de poids faible) et a = l1[k:] (les poids forts). C'est l'inverse de l'écriture usuelle : 1234 = 12·10² + 34 donne a = 12 et b = 34, mais la liste [4, 3, 2, 1] se coupe en [4, 3] → b et [2, 1] → a. On applique ensuite supp_zero à chaque moitié : une moitié comme [0, 5] (soit 50) devient [0, 5], mais [3, 0] (soit 3) devient [3], ce qui raccourcit les appels suivants." },
          { text: "Signe : sub ne sait calculer que x − y avec x ≥ y (étape 7). On calcule donc les valeurs absolues t31 = abs(a − b) et t32 = abs(c − d) en comparant d'abord avec plus_grand. Chaque inversion change le signe : sign vaut +1 si le produit (a − b)(c − d) est positif, −1 sinon. Ensuite, t1 + t2 − t3 devient sub(add(t1, t2), t3) si le signe est positif, et add(add(t1, t2), t3) s'il est négatif. Comme t1 + t2 − t3 = ad + bc ≥ 0, la soustraction ne viole jamais sa précondition." },
          { text: "Décalages : multiplier par 10^k revient à ajouter k zéros en poids faible, donc en tête de liste. [0] * k + t vaut t·10^k, et [0] * (2 * k) + t1 vaut t1·10^(2k). C'est une simple concaténation, sans aucune multiplication. Les notes de séance du 15 octobre le soulignent : « ajouter k zéros en tête de liste, opération très rapide »." },
          { text: "Les notes du 15 octobre écrivent T3 = (A + B) × (C + D) − T1 − T2. C'est une autre variante de Karatsuba, elle aussi juste, puisque (a + b)(c + d) − ac − bd = ad + bc. Mais ce n'est pas celle du notebook, et ce n'est pas celle qui a produit les chiffres annoncés en séance (voir l'étape 9). Le support fait foi : t3 = (a − b)(c − d) et recombinaison t1 + t2 − t3. La variante additive évite la gestion du signe, mais a + b peut avoir un chiffre de plus que a, ce qui déséquilibre le découpage." }
        ]
      },
      {
        num: "9", title: "Compter les multiplications : Karatsuba contre la méthode naïve",
        intro: "On ajoute un compteur global compt_mul, incrémenté à chaque multiplication de deux chiffres, et on compare les deux algorithmes sur deux nombres de 94 chiffres. mul_naive est fournie par le notebook.",
        code: `a = 1234567890123456789012345678909999999912659845589961469813613131313131361368874655441588556585
b = 9876543210987654321098765432100000000000002256622541258562555855654555215254438542435435435435
res = a * b

print('n vaut', max((len(str(a)), len(str(b)))))

res

global compt_mul
compt_mul = 0

res1 = mul_Kara(conv(a), conv(b))
assert conv_inv(res1) == res, "Résultat faux"

print(compt_mul, "multiplications élémentaires")

# ── cellule : mul_naive, fournie ──
def mul_naive(lA, lB):
    """Multiplication naive (comme a l'école primaire) entre les deux listes lA et lB.
    Renvoi le résultat et ne modifie pas les les listes lA et lB

    """
    l1 = lA[:]
    l2 = lB[:]
    #pour compter le nombre de multiplication élémentaire
    global compt_mul

    res = []   # matrice des multiplications chiffre par chiffre
    for i in range(len(l1)):
        # pour chaque chiffre de l1 : l1[i]
        # que l'on multiplie par l2
        # le résultat est une liste qu'on ajoute dans res
        r = 0   # retenue nulle au début
        res.append([0] * i)    # on décale d'un cran a chaque chiffre de l1, comme on met des points à l'école ...
        for j in range(len(l2)):
            compt_mul += 1
            result = l1[i] * l2[j] + r
            res[i].append(result % 10)    # le chiffre des unité va au résultat
            r = result // 10    # celui des dizaine part en retenue
        if r != 0:
            # si il reste une reteune a la fin, on l'ajoute. ça fera un chiffre de plus en poids fort
            res[i].append(r)

    result = []    # resultat final
    for i in range(len(res)):
        result = add(result, res[i])

    return result

# ── cellule de comparaison (le notebook y répète « global compt_mul », inutile hors d'une fonction) ──
compt_mul = 0

res2 = mul_naive(conv(a), conv(b))
assert conv_inv(res2) == res, "Résultat faux"

print(compt_mul, "multiplications élémentaires")`,
        note: "Le notebook demande de « modifier » mul_naive pour compter les multiplications, mais la version distribuée contient déjà global compt_mul et compt_mul += 1 : il n'y a rien à ajouter. Pour mul_Kara, le seul endroit où l'on multiplie deux chiffres est le cas de base, et c'est donc là qu'il faut incrémenter le compteur.",
        questions: [
          "Où placer compt_mul += 1 dans mul_Kara ?",
          "Combien de multiplications élémentaires pour chaque algorithme sur ces deux nombres de 94 chiffres ?",
          "Retrouve-t-on les chiffres annoncés en séance le 15 octobre (8 836 en naïf, 1 631 avec Karatsuba) ?",
          "Justifier la complexité O(n^1,585) annoncée par le notebook."
        ],
        correction: [
          { code: `# mul_naive est fournie complète par le notebook (compteur compris) : on l'exécute telle quelle
def mul_naive(lA, lB):
    """Multiplication naive (comme a l'école primaire) entre les deux listes lA et lB.
    Renvoi le résultat et ne modifie pas les les listes lA et lB
    """
    l1 = lA[:]
    l2 = lB[:]
    global compt_mul
    res = []                         # une ligne de l'opération posée par chiffre de l1
    for i in range(len(l1)):
        r = 0
        res.append([0] * i)          # décalage d'un cran par chiffre, comme les points à l'école
        for j in range(len(l2)):
            compt_mul += 1
            result = l1[i] * l2[j] + r
            res[i].append(result % 10)
            r = result // 10
        if r != 0:
            res[i].append(r)
    result = []
    for i in range(len(res)):
        result = add(result, res[i])
    return result

a = 1234567890123456789012345678909999999912659845589961469813613131313131361368874655441588556585
b = 9876543210987654321098765432100000000000002256622541258562555855654555215254438542435435435435
res = a * b
print('n vaut', max((len(str(a)), len(str(b)))))       # n vaut 94

compt_mul = 0
res1 = mul_Kara(conv(a), conv(b))
assert conv_inv(res1) == res, "Résultat faux"
print(compt_mul, "multiplications élémentaires")        # 1631

compt_mul = 0
res2 = mul_naive(conv(a), conv(b))
assert conv_inv(res2) == res, "Résultat faux"
print(compt_mul, "multiplications élémentaires")        # 8836` },
          { text: "Le produit exact, que les deux assert vérifient, vaut 12193263113702179522618503273461057764471006900190764091568644761816761846721929774232466032890349854526993364608631765217879873131435397995180712503649251954354772524515604414702611589475 (188 chiffres)." },
          { text: "On retrouve exactement les chiffres de la séance : 1 631 multiplications élémentaires avec Karatsuba et 8 836 avec la méthode naïve, soit 5,4 fois moins. Le chiffre naïf s'explique sans calcul : 94 × 94 = 8 836, un produit par couple de chiffres." },
          { text: "Le chiffre de Karatsuba, lui, dépend des détails de l'implémentation. On obtient 1 631 avec le compteur dans le cas de base et supp_zero appliqué aux quatre moitiés a, b, c et d, comme ci-dessus. Sans ces supp_zero, on en compte 1 641. Avec la variante (a + b)(c + d) mentionnée dans les notes, on en compte 2 731. C'est donc bien la variante du notebook, avec (a − b)(c − d), qui a été exécutée en séance. Le corrigé public de 2021 annonçait 1 653 et 6 862 : son second opérande ne comptait que 73 chiffres (94 × 73 = 6 862), et notre fonction redonne bien 1 653 sur ces nombres-là." },
          { text: "Complexité : multiplier deux nombres de n chiffres demande 3 multiplications de nombres de n/2 chiffres, plus des additions, soustractions et décalages en O(n). La relation T(n) = 3T(n/2) + O(n) donne log2(n) niveaux et 3^log2(n) = n^log2(3) ≈ n^1,585 multiplications élémentaires. Exemple du notebook : 1234 × 5678 demande 9 multiplications au lieu de 16, ce que notre compteur confirme. Sur deux nombres aléatoires de n chiffres (tirage fixé par Random(2026) dans solution_dpr.py ; un autre tirage donne des valeurs voisines), on mesure :" },
          { code: `n chiffres   Karatsuba   naïve    n^1,585
4            9           16       9
16           79          256      81
64           725         4 096    729
256          6 475       65 536   6 562` },
          { text: "Mise en garde pour le choix des exemples : avec deux nombres formés uniquement de 9, a − b vaut 0 à chaque niveau. Karatsuba ne fait alors que 2n − 1 multiplications (127 pour n = 64), ce qui donne une image trop flatteuse de l'algorithme. Pour la culture : CPython multiplie lui-même ses grands entiers avec Karatsuba dès qu'ils dépassent 70 « chiffres » internes de 30 bits (environ 630 chiffres décimaux), et des algorithmes encore plus rapides existent pour des nombres bien plus grands (Toom-Cook, FFT)." }
        ]
      },
      {
        num: "10", title: "Lancer tous les tests automatiques",
        code: `import doctest
doctest.testmod()`,
        questions: [
          "Que doit afficher doctest.testmod() quand toutes les fonctions sont justes ?"
        ],
        correction: [
          { code: `import doctest
print(doctest.testmod())` },
          { text: "Dans le notebook, testmod() parcourt toutes les fonctions définies dans les cellules et exécute leurs exemples. Avec les fonctions corrigées, on obtient TestResults(failed=0, attempted=57) : 3 exemples pour conv, 3 pour conv_inv, 9 pour meme_len, 9 pour supp_zero, 18 pour add, 9 pour plus_grand et 6 pour sub. mul_Kara et mul_naive n'ont pas de doctest. Un échec indique la fonction, l'exemple, la sortie attendue et la sortie obtenue." }
        ]
      }
    ]
  },
  // ── TP — Diviser pour régner (3) : rotation d'une image ──
  {
    id: "tp-dpr-rotation", bloc: "bloc2", jour: "En ligne — 8 octobre 2026 (FDIU)",
    theme: "Algorithmique — diviser pour régner",
    title: "TP — Diviser pour régner (3) : rotation d'une image",
    type: 'tp',
    notebook: "FDIU_rotation_image_dpr.ipynb",
    aux: ["ressources/dpr/perroquet_256_cc.jpg"],
    intro: "TP du cours en ligne du 8 octobre 2026 (FDIU, DU Normandie). Faire tourner une image carrée d'un quart de tour dans le sens horaire : d'abord pixel par pixel, puis par diviser pour régner. On coupe l'image en quatre carrés, on fait tourner chaque carré récursivement, puis on replace les quatre carrés par permutation circulaire. On travaille avec le module PIL (Pillow), disponible dans Basthon, et avec l'image perroquet_256_cc.jpg (256 × 256 pixels), fournie avec le TP et chargée par le bouton Basthon du site. Le corrigé public de 2021 utilisait d'autres noms (rotationNaive, rotationDpR, rotationDpR2) : on respecte ici ceux du notebook 2026. Ouvre le notebook dans Basthon, cherche par toi-même, puis déplie la correction.",
    steps: [
      {
        num: "1", title: "Prise en main du module PIL",
        intro: "Quelques commandes du module PIL (Pillow) qui serviront ensuite : ouvrir ou créer une image, lire et écrire un pixel, découper, coller. Attention au repère : l'origine (0, 0) est le coin en haut à gauche, x va vers la droite et y vers le bas.",
        code: `from PIL import Image

# création d'une image dans PIL à partir d'un fichier png, jpg, bmp
im = Image.open("perroquet_256_cc.jpg")
# Pour afficher l'image dans le notebook, il suffit de l'appeler en dernière ligne de la cellule :
im.show()

# création d'une image vierge de 64px * 32px
imNew = Image.new('RGB', (64, 32))
# Cette image est vierge donc totalement noire
imNew.show()

# on peut également lui spécifier une couleur par un argument supplémentaire : un tuple (R, V, B)
imNew2 = Image.new('RGB', (64, 32), (127, 255, 127))
imNew2.show()

# on peut afficher la taille d'une image de la manière suivante :
largeur, hauteur = imNew.size
print(largeur, hauteur)

# lire la couleur d'un pixel : notez bien les doubles parenthèses
im.getpixel((130, 25))

# changer la couleur d'un pixel : tuple (R, V, B), chaque composante sur 8 bits (0 à 255)
imNew.putpixel((32, 16), (255, 0, 0))
imNew.putpixel((34, 16), (0, 255, 0))
imNew.putpixel((36, 16), (0, 0, 255))
imNew

# découper : crop((x1, y1, x2, y2)), coin haut gauche et coin bas droite
imC = im.crop((100, 0, 150, 50))
imC

# coller : paste(image_a_coller, position du coin haut gauche), (0, 0) par défaut
im.paste(imC)
im.paste(imC, (0, 100))
im.paste(imC, (25, 125))
im`,
        note: "Le notebook ouvre r2d2_256.png ici, puis smiley_256.jpg aux étapes suivantes. Ces deux fichiers ne sont pas fournis avec le site : on utilise partout perroquet_256_cc.jpg (256 × 256 pixels, RVB), c'est le seul changement. Dans le notebook ouvert depuis le site, il faut donc remplacer ces deux noms de fichier par perroquet_256_cc.jpg, sinon Image.open lève FileNotFoundError. Avec r2d2_256.png, le notebook affiche (50, 91, 170) pour getpixel((130, 25)) ; avec le perroquet, la valeur est différente. Dans Basthon, im.show() ou le nom de l'image en dernière ligne de cellule l'affiche. Dans un script Python ordinaire, show() ouvre une visionneuse externe, et im.save('resultat.png') permet de garder le résultat.",
        questions: [
          "Que renvoie getpixel ? Pourquoi faut-il des doubles parenthèses ?",
          "Quelle est la taille de imC ? Le pixel (150, 50) en fait-il partie ?",
          "paste crée-t-il une nouvelle image, ou modifie-t-il im ?"
        ],
        correction: [
          { code: `from PIL import Image

im = Image.open("perroquet_256_cc.jpg")
print(im.size, im.mode)              # (256, 256) RGB

imNew = Image.new('RGB', (64, 32))
print(imNew.size, imNew.getpixel((0, 0)))     # (64, 32) (0, 0, 0) : noir

print(im.getpixel((130, 25)))        # un tuple (R, V, B)

imNew.putpixel((32, 16), (255, 0, 0))
print(imNew.getpixel((32, 16)))      # (255, 0, 0)

imC = im.crop((100, 0, 150, 50))
print(imC.size)                      # (50, 50)

im.paste(imC, (0, 100))
print(im.getpixel((0, 100)) == imC.getpixel((0, 0)))   # True : im a été modifiée` },
          { text: "getpixel renvoie un tuple (R, V, B) de trois entiers entre 0 et 255. Chez nous, le pixel (130, 25) du perroquet vaut (139, 148, 81), mais la valeur exacte d'un pixel de JPEG peut varier d'une unité selon le décodeur. getpixel attend un seul argument, le couple (x, y) : d'où les doubles parenthèses, getpixel((x, y))." },
          { text: "crop((100, 0, 150, 50)) donne une image de 50 × 50 pixels. Le coin (x2, y2) est exclu, comme la borne de fin de range ou d'une tranche : les colonnes vont de 100 à 149 et les lignes de 0 à 49. crop renvoie une nouvelle image et ne touche pas à im." },
          { text: "paste, au contraire, modifie l'image sur laquelle on l'appelle, et renvoie None. Après la cellule de collage, im n'est plus l'image d'origine : pour la suite, on rouvre le fichier." }
        ]
      },
      {
        num: "2", title: "Rotation naïve, pixel par pixel",
        intro: "Lors d'une rotation de 90° dans le sens horaire d'une image carrée de côté n pixels, le pixel (xi, yi) arrive en (xr, yr) = (n − 1 − yi, xi). Sur une image de 8 pixels de côté, le pixel (1, 1) va en (6, 1), le pixel (7, 4) en (3, 7) et le pixel (4, 7) en (0, 4).",
        code: `# une autre image pour les tests
im2 = Image.open("perroquet_256_cc.jpg")
im2

def rotation_naive(img):
    largeur, hauteur = img.size
    assert largeur == hauteur, "Cette fonction ne traite que les images carrées"

    imNew = ...

    ...

    return ...

rotationn_naive(im2)

# chronométrer la fonction sur une image de 256 px de côté
from timeit import timeit

print(timeit("rotation_naive(im2)", number = 1, globals = globals()))`,
        note: "Coquille du notebook : la cellule appelle rotationn_naive(im2), avec deux n, ce qui provoque une NameError. La fonction s'appelle rotation_naive.",
        questions: [
          "Écrire rotation_naive(img), purement itérative.",
          "Vérifier la formule sur les trois pixels d'exemple.",
          "Chronométrer la fonction sur l'image de 256 × 256 pixels."
        ],
        correction: [
          { code: `from PIL import Image
from timeit import timeit

def rotation_naive(img):
    largeur, hauteur = img.size
    assert largeur == hauteur, "Cette fonction ne traite que les images carrées"
    n = largeur

    imNew = Image.new('RGB', (n, n))

    for x in range(n):
        for y in range(n):
            # le pixel (x, y) part en (n - 1 - y, x)
            imNew.putpixel((n - 1 - y, x), img.getpixel((x, y)))

    return imNew

im2 = Image.open("perroquet_256_cc.jpg")
tournee = rotation_naive(im2)
# contrôle avec la rotation intégrée de PIL (ROTATE_270 = 90° dans le sens horaire)
print(tournee.tobytes() == im2.transpose(Image.Transpose.ROTATE_270).tobytes())   # True
print(timeit("rotation_naive(im2)", number = 1, globals = globals()))` },
          { text: "On parcourt les n² pixels de l'image de départ, et chacun est écrit une seule fois dans la nouvelle image : la complexité est O(n²), linéaire en nombre de pixels. Avec n = 8 : (1, 1) donne (8 − 1 − 1, 1) = (6, 1), (7, 4) donne (8 − 1 − 4, 7) = (3, 7), et (4, 7) donne (8 − 1 − 7, 4) = (0, 4)." },
          { text: "Pourquoi n − 1 − y ? La première ligne de l'image (y = 0) devient la dernière colonne (x = n − 1). Ici, y parcourt 0 à n − 1, donc n − 1 − y reste bien dans l'image. On peut le faire vérifier aux élèves sur un quadrillage 4 × 4 avant de coder." },
          { text: "Temps mesuré chez nous (Python 3.13, Pillow 12) : environ 0,07 s pour 256 × 256 pixels. Le corrigé de 2021 donnait 0,58 s dans Basthon. Pour comparer, im2.transpose(Image.Transpose.ROTATE_270), écrit en C, prend environ 0,1 ms." }
        ]
      },
      {
        num: "3", title: "Un seul niveau : découper en quatre et permuter les carrés",
        intro: "Algorithme diviser pour régner : découper l'image en quatre carrés de même taille A (haut gauche), B (haut droite), C (bas gauche) et D (bas droite), créer une image vierge de même taille, puis y recoller les quatre carrés en les faisant tourner d'un cran dans le sens horaire. Hypothèse : les images sont carrées et leur côté est une puissance de 2.",
        code: `im2 = Image.open("perroquet_256_cc.jpg")

n, hauteur = im2.size

m = n // 2

#Découpe en quatre carrés
carreA = ...
carreB = ...
carreC = ...
carreD = ...

#recombine l'image en faisant tourner les carrés
imNew = Image.new('RGB', (n, n))

imNew.paste(...)
...
...
...

imNew`,
        questions: [
          "Compléter les quatre crop et les quatre paste.",
          "L'image obtenue est-elle tournée d'un quart de tour ?"
        ],
        correction: [
          { code: `from PIL import Image

im2 = Image.open("perroquet_256_cc.jpg")

n, hauteur = im2.size

m = n // 2

#Découpe en quatre carrés
carreA = im2.crop((0, 0, m, m))      # haut gauche
carreB = im2.crop((m, 0, n, m))      # haut droite
carreC = im2.crop((0, m, m, n))      # bas gauche
carreD = im2.crop((m, m, n, n))      # bas droite

#recombine l'image en faisant tourner les carrés
imNew = Image.new('RGB', (n, n))

imNew.paste(carreA, (m, 0))          # A : haut gauche -> haut droite
imNew.paste(carreB, (m, m))          # B : haut droite -> bas droite
imNew.paste(carreD, (0, m))          # D : bas droite  -> bas gauche
imNew.paste(carreC, (0, 0))          # C : bas gauche  -> haut gauche

print(imNew.crop((m, 0, n, m)).tobytes() == carreA.tobytes())   # True` },
          { text: "Les quatre carrés font une permutation circulaire dans le sens horaire : A → haut droite, B → bas droite, D → bas gauche, C → haut gauche. Chaque coin est une image de m × m pixels, avec m = n // 2." },
          { text: "L'image n'est pas encore tournée : les quatre quarts ont changé de place, mais chacun garde son orientation d'origine. On voit un perroquet découpé en quatre morceaux droits. Pour obtenir la vraie rotation, il faut aussi faire tourner chaque quart, et c'est exactement le même problème en plus petit : d'où la récursivité de l'étape suivante." }
        ]
      },
      {
        num: "4", title: "rotation_dpr : la version récursive",
        intro: "Pour obtenir une rotation complète, on réapplique la même opération récursivement à chaque carré, jusqu'à des carrés de 1 pixel sur 1. rotation_dpr(img) prend une image PIL et renvoie une nouvelle image tournée de 90° dans le sens horaire.",
        code: `def rotation_dpr(img):

    n, hauteur = img.size
    assert n == hauteur, "Cette fonction ne traite que les images carrées"

    m = n // 2

    # Découpe en quatre carrés
    carre_A = ...
    carre_B = ...
    ...

    # On relance la fonction sur les 4 morceaux


    # Recombine l'image en faisant tourner les carrés


    return im_new


rotation_dpr(im2)`,
        questions: [
          "Compléter rotation_dpr. Quel est le cas de base ?",
          "Identifier les phases diviser, régner et combiner.",
          "Pourquoi l'hypothèse « côté puissance de 2 » est-elle nécessaire ?"
        ],
        correction: [
          { code: `from PIL import Image

def rotation_dpr(img):

    n, hauteur = img.size
    assert n == hauteur, "Cette fonction ne traite que les images carrées"

    # RÉGNER : un carré de 1 pixel est sa propre rotation
    if n == 1:
        return img.copy()

    m = n // 2

    # DIVISER : découpe en quatre carrés
    carre_A = img.crop((0, 0, m, m))
    carre_B = img.crop((m, 0, n, m))
    carre_C = img.crop((0, m, m, n))
    carre_D = img.crop((m, m, n, n))

    # On relance la fonction sur les 4 morceaux
    carre_A = rotation_dpr(carre_A)
    carre_B = rotation_dpr(carre_B)
    carre_C = rotation_dpr(carre_C)
    carre_D = rotation_dpr(carre_D)

    # COMBINER : recombine l'image en faisant tourner les carrés
    im_new = Image.new('RGB', (n, n))
    im_new.paste(carre_A, (m, 0))
    im_new.paste(carre_B, (m, m))
    im_new.paste(carre_D, (0, m))
    im_new.paste(carre_C, (0, 0))

    return im_new


im2 = Image.open("perroquet_256_cc.jpg")
r = rotation_dpr(im2)
print(r.tobytes() == im2.transpose(Image.Transpose.ROTATE_270).tobytes())   # True` },
          { text: "Diviser : les quatre crop. Régner : les quatre appels récursifs, jusqu'au cas de base, une image de 1 pixel, qui est sa propre rotation. Combiner : les quatre paste en permutation circulaire. Pourquoi ça marche : si chaque quart est correctement tourné (hypothèse de récurrence) et que les quarts sont replacés par rotation d'un cran, alors toute l'image est tournée. Le résultat est identique pixel pour pixel à celui de rotation_naive et de transpose(ROTATE_270)." },
          { text: "Le corrigé de 2021 (rotationDpR) s'arrête un cran plus tôt, avec un test if m > 1 avant les appels récursifs : à n = 2, les quatre carrés de 1 pixel sont recollés directement. C'est équivalent. Le test n == 1 présente le cas de base de façon plus lisible pour des élèves, et il traite aussi une image de 1 pixel passée directement." },
          { text: "Puissance de 2 : à chaque niveau, n est divisé par 2 avec m = n // 2. Si n est impair, par exemple 3, les carrés n'ont plus tous la même taille, et crop((m, 0, n, m)) n'est plus carré : l'assert échoue dès l'appel récursif suivant. 256 = 2⁸ donne 8 niveaux de découpage." }
        ]
      },
      {
        num: "5", title: "Critiquer l'efficacité de la méthode",
        code: `from timeit import timeit

print(timeit("rotation_dpr(im2)", number = 1, globals = globals()))`,
        questions: [
          "Chronométrer rotation_dpr sur l'image de 256 × 256 pixels et comparer avec rotation_naive.",
          "Critiquer l'efficacité de la méthode dans ce cas."
        ],
        correction: [
          { code: `from timeit import timeit

t_naive = timeit("rotation_naive(im2)", number = 1, globals = globals())
t_dpr = timeit("rotation_dpr(im2)", number = 1, globals = globals())
print(f"naïve : {t_naive:.3f} s   diviser pour régner : {t_dpr:.3f} s")` },
          { text: "Mesures chez nous (Python 3.13, Pillow 12) : environ 0,07 s pour la version naïve et 0,3 à 0,5 s pour la version diviser pour régner, soit 4 à 7 fois plus lent. Le corrigé de 2021 donnait 0,58 s contre 3,08 s dans Basthon, le même ordre de rapport." },
          { text: "Explication : la version récursive fait 1 + 4 + 16 + ... + 4⁸ = 87 381 appels. Chacun crée une nouvelle image et quatre découpes, soit environ 175 000 objets images pour 65 536 pixels. De plus, à chaque niveau, les paste recopient l'image entière : T(n) = 4T(n/2) + O(n²) donne O(n² log n) pixels copiés (9 niveaux pour 256 pixels de côté), contre O(n²) pour la version naïve qui déplace chaque pixel une seule fois." },
          { text: "Conclusion : ici, diviser pour régner n'apporte aucun gain. Le problème est déjà linéaire en nombre de pixels, et la recombinaison coûte autant que le problème lui-même. C'est le même constat qu'avec les occurrences du TP 1. L'intérêt est ailleurs : c'est un bel exemple visuel de récursivité, et les quatre sous-problèmes, indépendants, pourraient être traités en parallèle. Sur une matrice qu'on a le droit de modifier, il existe aussi une version en place qui n'utilise aucune image intermédiaire." }
        ]
      },
      {
        num: "6", title: "Dans les deux sens : l'argument reverse",
        intro: "Nouvelle fonction rotation_dpr_2(img, reverse=False) : avec reverse=True, la rotation se fait dans le sens anti-horaire.",
        code: `def rotation_dpr_2(img, reverse=False):

    n, hauteur = img.size
    assert n == hauteur, "Cette fonction ne traite que les images carrées"

    m = n // 2

    ...

im2 = Image.open("perroquet_256_cc.jpg")
rotation_dpr_2(im2, reverse=True)`,
        questions: [
          "Écrire rotation_dpr_2. Qu'est-ce qui change par rapport à rotation_dpr ?",
          "Comment vérifier le résultat sans regarder l'image ?"
        ],
        correction: [
          { code: `from PIL import Image

def rotation_dpr_2(img, reverse=False):

    n, hauteur = img.size
    assert n == hauteur, "Cette fonction ne traite que les images carrées"

    if n == 1:
        return img.copy()

    m = n // 2

    # on transmet reverse aux appels récursifs
    carre_A = rotation_dpr_2(img.crop((0, 0, m, m)), reverse)
    carre_B = rotation_dpr_2(img.crop((m, 0, n, m)), reverse)
    carre_C = rotation_dpr_2(img.crop((0, m, m, n)), reverse)
    carre_D = rotation_dpr_2(img.crop((m, m, n, n)), reverse)

    im_new = Image.new('RGB', (n, n))
    if not reverse:                  # sens horaire : A -> B -> D -> C -> A
        im_new.paste(carre_A, (m, 0))
        im_new.paste(carre_B, (m, m))
        im_new.paste(carre_D, (0, m))
        im_new.paste(carre_C, (0, 0))
    else:                            # sens anti-horaire : A -> C -> D -> B -> A
        im_new.paste(carre_A, (0, m))
        im_new.paste(carre_C, (m, m))
        im_new.paste(carre_D, (m, 0))
        im_new.paste(carre_B, (0, 0))
    return im_new

im2 = Image.open("perroquet_256_cc.jpg")
gauche = rotation_dpr_2(im2, reverse=True)
print(gauche.tobytes() == im2.transpose(Image.Transpose.ROTATE_90).tobytes())   # True
print(rotation_dpr_2(gauche).tobytes() == im2.tobytes())                       # True : retour au départ` },
          { text: "Deux changements : la permutation des quatre carrés se fait dans l'autre sens (A va en bas à gauche, C en bas à droite, D en haut à droite, B en haut à gauche), et reverse doit être transmis aux quatre appels récursifs. Si on l'oublie, les quarts tournent dans le sens horaire alors que leur placement est anti-horaire, et l'image est fausse." },
          { text: "Vérifications sans regarder l'image : comparer avec transpose(Image.Transpose.ROTATE_90), qui est la rotation anti-horaire de PIL. On peut aussi vérifier qu'un quart de tour dans un sens suivi d'un quart de tour dans l'autre redonne l'image de départ, et que quatre quarts de tour dans le même sens aussi. Ce sont de bons tests à faire écrire aux élèves, car ils ne demandent aucune valeur de pixel calculée à la main." }
        ]
      }
    ]
  },
  // ── TP k-NN — Bloc 2, séance en ligne du 10 septembre (L. Amanton) ──
  {
    id: "tp-knn-rugby", bloc: "bloc2", jour: "En ligne — 10 septembre 2026",
    theme: "Apprentissage automatique — k plus proches voisins",
    title: "TP — Classer des rugbymen avec les k plus proches voisins",
    type: 'tp',
    intro: "On dispose de la taille et du poids de 30 internationaux français, avec leur poste (Avant ou Arrière). Objectif : écrire k-NN entièrement à la main pour deviner le poste d'un joueur à partir de son seul gabarit, puis mesurer le taux d'erreur et chercher la meilleure valeur de k. Uniquement la bibliothèque standard (math, random) et matplotlib pour la courbe finale : ni numpy, ni scikit-learn. Cherche la réponse avant d'ouvrir la correction.",
    steps: [
      {
        num: "1", title: "Le jeu de données",
        intro: "Chaque joueur est une liste [Nom, Taille (cm), Poids (kg), Poste]. Les 16 avants sont donnés d'abord, puis les 14 arrières.",
        code: `import math
import random
import matplotlib.pyplot as plt

# [Nom, Taille (cm), Poids (kg), Poste] — 30 joueurs (16 Avants, 14 Arrières)
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

# TODO : afficher le nombre de joueurs, puis le minimum et le maximum
#        de la taille, et le minimum et le maximum du poids.`,
        questions: [
          "Quelles sont les deux caractéristiques utilisées pour décider, et quelle est l'étiquette à prédire ?",
          "Sur quelle plage varie la taille ? et le poids ? Laquelle des deux varie le plus ?",
          "En regardant Danty (181 cm, 106 kg) et Marchand (181 cm, 108 kg), que peut-on déjà craindre ?"
        ],
        correction: [
          { text: "Les caractéristiques sont la taille et le poids : ce sont les deux nombres à partir desquels on calcule des distances. L'étiquette à prédire est le poste, une valeur non numérique (« Avant » ou « Arrière ») : c'est donc un problème de CLASSIFICATION, pas de régression." },
          { code: `print(len(joueurs), "joueurs")

tailles = [j[1] for j in joueurs]
poids = [j[2] for j in joueurs]
print("taille :", min(tailles), "à", max(tailles), "cm  (amplitude", max(tailles) - min(tailles), ")")
print("poids  :", min(poids), "à", max(poids), "kg  (amplitude", max(poids) - min(poids), ")")` },
          { text: "On obtient une taille de 174 à 203 cm (amplitude 29) et un poids de 81 à 145 kg (amplitude 64). Le poids varie donc sur une plage plus de deux fois plus large : dans le calcul d'une distance euclidienne, il pèsera environ deux fois plus lourd que la taille. Retiens cette remarque, on y reviendra." },
          { text: "Danty est un arrière de 181 cm pour 106 kg ; Marchand est un avant de 181 cm pour 108 kg. Deux joueurs presque confondus dans le plan (taille, poids) mais de postes différents : aucun algorithme fondé sur ces deux seules mesures ne pourra les distinguer. C'est la limite du jeu de caractéristiques, pas celle de k-NN." }
        ]
      },
      {
        num: "2", title: "Séparer entraînement et test",
        intro: "On garde environ 75 % des joueurs pour « apprendre » et 25 % pour évaluer honnêtement le modèle sur des joueurs qu'il n'a jamais vus.",
        code: `# La liste est rangée par poste : 16 avants D'ABORD, puis 14 arrières.
# TODO : pourquoi prendre directement joueurs[:22] serait-il une très mauvaise idée ?
# TODO : mélanger la liste, puis la couper en 22 / 8.

entrainement = ...
test = ...`,
        note: "Règle d'or : on n'évalue JAMAIS un modèle sur des données qui ont servi à l'entraîner. Il les a mémorisées, il aurait 100 % de réussite et on n'aurait rien mesuré.",
        questions: [
          "Que contiendraient entrainement = joueurs[:22] et test = joueurs[22:] sans mélange préalable ?",
          "Écrire le mélange et le découpage 22 / 8.",
          "Relance le programme deux fois : obtiens-tu les mêmes joueurs dans le test ? Comment rendre le tirage reproductible ?"
        ],
        correction: [
          { text: "Sans mélange, l'entraînement recevrait les 16 avants et seulement 6 arrières, et le test serait composé de 8 arrières et d'aucun avant. Le modèle n'aurait presque jamais vu d'arrières, et on l'évaluerait uniquement sur des arrières : la mesure n'aurait aucun sens. C'est pourquoi on mélange d'abord." },
          { code: `random.shuffle(joueurs)

entrainement = joueurs[:22]
test = joueurs[22:30]  # 8 joueurs` },
          { text: "random.shuffle mélange la liste SUR PLACE : il ne renvoie rien, il modifie joueurs directement. Écrire joueurs = random.shuffle(joueurs) est une erreur classique qui remplace la liste par None." },
          { text: "Non, le tirage change à chaque exécution : les 8 joueurs du test ne sont jamais les mêmes, donc les résultats non plus. Pour figer le tirage le temps d'une comparaison, on fixe la graine du générateur aléatoire avant de mélanger." },
          { code: `random.seed(42)     # même mélange à chaque exécution
random.shuffle(joueurs)` }
        ]
      },
      {
        num: "3", title: "La distance euclidienne",
        intro: "Pour trouver les voisins d'un joueur, il faut d'abord savoir mesurer à quel point deux joueurs se ressemblent.",
        code: `def distance_euclidienne(p1, p2):
    # p1 et p2 sont deux couples [taille, poids]
    # TODO : renvoyer la racine carrée de la somme des carrés des écarts
    pass

# Vérification : Danty [181, 106] et Marchand [181, 108]
print(distance_euclidienne([181, 106], [181, 108]))`,
        questions: [
          "Écrire la fonction distance_euclidienne.",
          "Que vaut la distance entre Danty [181, 106] et Marchand [181, 108] ? Et entre Dupont [174, 85] et Atonio [196, 145] ?",
          "Pourquoi extrait-on les caractéristiques avec joueur[1:3] plutôt que d'utiliser le joueur entier ?"
        ],
        correction: [
          { text: "La distance euclidienne du cours, en deux dimensions, est la racine carrée de la somme des carrés des écarts sur chaque caractéristique : c'est la longueur du segment qui relie les deux points dans le plan (taille, poids)." },
          { code: `def distance_euclidienne(p1, p2):
    return math.sqrt((p1[0] - p2[0]) ** 2 + (p1[1] - p2[1]) ** 2)` },
          { text: "Entre Danty et Marchand : racine(0² + 2²) = 2,0 — ils sont quasiment au même endroit. Entre Dupont et Atonio : racine(22² + 60²) = racine(484 + 3600) = racine(4084) ≈ 63,9 — le demi de mêlée et le pilier sont aux deux extrémités du nuage." },
          { text: "Un joueur est [Nom, Taille, Poids, Poste] : le nom et le poste ne sont pas des nombres, on ne peut pas les soustraire. La tranche joueur[1:3] prend les éléments d'indice 1 et 2 — la taille et le poids — et s'arrête avant l'indice 3. C'est exactement le couple de caractéristiques attendu par la fonction." }
        ]
      },
      {
        num: "4", title: "Les k plus proches voisins et le vote",
        intro: "Le cœur de l'algorithme : calculer toutes les distances, garder les k plus petites, puis faire voter les voisins retenus.",
        code: `def knn(donnees_ent, cible, k):
    distances = []
    for joueur in donnees_ent:
        caracteristiques = joueur[1:3]   # taille et poids
        classe = joueur[3]               # le poste
        # TODO : calculer la distance à la cible et l'empiler avec la classe

    # TODO : trier par distance croissante, puis garder les k premiers
    k_voisins = ...

    # TODO : compter les postes présents parmi ces k voisins
    effectifs = {}

    # TODO : renvoyer le poste le plus représenté
    return ...`,
        note: "Rien n'est calculé tant qu'on ne prédit pas : la phase d'entraînement de k-NN se résume à garder les données sous la main. C'est ce que le cours appelle un apprentissage paresseux.",
        questions: [
          "Compléter la fonction knn.",
          "À quoi sert le paramètre key dans distances.sort(key=lambda x: x[0]) ?",
          "Expliquer l'idiome effectifs[classe] = effectifs.get(classe, 0) + 1.",
          "Que renvoie max(effectifs, key=effectifs.get) : une clé ou une valeur ?"
        ],
        correction: [
          { text: "On construit une liste de couples (distance, classe), on la trie, on coupe aux k premiers, on compte les classes dans un dictionnaire, et on renvoie celle qui revient le plus souvent." },
          { code: `def knn(donnees_ent, cible, k):
    distances = []
    for joueur in donnees_ent:
        caracteristiques = joueur[1:3]
        classe = joueur[3]
        dist = distance_euclidienne(caracteristiques, cible)
        distances.append((dist, classe))

    distances.sort(key=lambda x: x[0])
    k_voisins = distances[:k]

    effectifs = {}
    for _, classe in k_voisins:
        effectifs[classe] = effectifs.get(classe, 0) + 1

    return max(effectifs, key=effectifs.get)` },
          { text: "key indique SUR QUOI trier. Chaque élément x est un couple (distance, classe) ; x[0] est la distance. Sans key, Python comparerait les couples entiers : à distance égale il comparerait les chaînes de caractères des postes, ce qui n'a aucun sens ici. Le tri de Python est stable : deux joueurs à égale distance restent dans leur ordre d'origine." },
          { text: "dictionnaire.get(cle, 0) renvoie la valeur associée à la clé, ou 0 si la clé est absente. La ligne ajoute donc 1 au compteur du poste, en le créant à 0 la première fois. Sans .get, il faudrait tester if classe in effectifs avant chaque incrémentation." },
          { text: "Elle renvoie une CLÉ. max parcourt les clés du dictionnaire et les compare d'après effectifs.get(cle), c'est-à-dire d'après leur effectif. Le résultat est donc le poste majoritaire, pas son nombre de voix." },
          { text: "Une prédiction, pour vérifier : knn(entrainement, [190, 100], 3) donne le poste attribué à un joueur de 190 cm pour 100 kg." }
        ]
      },
      {
        num: "5", title: "Évaluer le modèle : le taux d'erreur",
        intro: "On applique la prédiction à chacun des 8 joueurs du test et on compte les fois où le modèle s'est trompé.",
        code: `def evaluer_modele(donnees_ent, donnees_test, k):
    """Calcule le taux d'erreur du modèle pour un k donné."""
    erreurs = 0
    for joueur in donnees_test:
        cible = joueur[1:3]
        vraie_classe = joueur[3]
        # TODO : prédire, comparer à la vraie classe, compter les erreurs

    # TODO : renvoyer le ratio d'erreurs (entre 0.0 et 1.0)
    return ...

print(evaluer_modele(entrainement, test, 3))`,
        questions: [
          "Compléter evaluer_modele.",
          "Le jeu de test compte 8 joueurs : quelles valeurs le taux d'erreur peut-il prendre ?",
          "Un taux d'erreur de 0,0 signifie-t-il que le modèle est parfait ?"
        ],
        correction: [
          { code: `def evaluer_modele(donnees_ent, donnees_test, k):
    """Calcule le taux d'erreur du modèle pour un k donné."""
    erreurs = 0
    for joueur in donnees_test:
        cible = joueur[1:3]
        vraie_classe = joueur[3]
        prediction = knn(donnees_ent, cible, k)

        if prediction != vraie_classe:
            erreurs += 1

    return erreurs / len(donnees_test)` },
          { text: "Avec 8 joueurs, le nombre d'erreurs est un entier de 0 à 8 : le taux ne peut valoir que 0 %, 12,5 %, 25 %, 37,5 %… Il avance par marches de 12,5 %. Une seule erreur de plus ou de moins fait donc bouger la courbe de façon très visible : c'est le signe que l'échantillon de test est petit." },
          { text: "Non. Cela signifie que le modèle a correctement classé CES 8 joueurs-là. Avec un autre tirage, le résultat serait différent. Un taux mesuré sur 8 exemples est une estimation très imprécise de la qualité réelle du modèle." }
        ]
      },
      {
        num: "6", title: "L'influence de k",
        intro: "k est un hyperparamètre : ce n'est pas le programme qui l'apprend, c'est nous qui le choisissons. Testons plusieurs valeurs.",
        code: `# On ne teste que des valeurs IMPAIRES pour éviter les ex aequo dans le vote
valeurs_k = [1, 3, 5, 7, 9, 11, 13, 15]
taux_erreurs = []

for k in valeurs_k:
    # TODO : évaluer le modèle pour ce k, stocker le taux, puis l'afficher
    pass`,
        questions: [
          "Écrire la boucle.",
          "Pourquoi se limiter à des valeurs impaires de k ?",
          "Le cours conseille k proche de la racine carrée du nombre d'exemples d'entraînement : que cela donne-t-il ici ?",
          "Que se passerait-il avec k = 22, le nombre total d'exemples d'entraînement ?"
        ],
        correction: [
          { code: `valeurs_k = [1, 3, 5, 7, 9, 11, 13, 15]
taux_erreurs = []

for k in valeurs_k:
    erreur = evaluer_modele(entrainement, test, k)
    taux_erreurs.append(erreur)
    print(f"Pour k={k}, taux d'erreur = {erreur * 100:.1f}%")` },
          { text: "Il y a deux postes possibles. Avec un k pair, le vote peut donner 2 contre 2 ou 3 contre 3 : le résultat dépendrait alors de l'ordre des données, pas de leur contenu. Un k impair rend toujours une majorité possible. Avec trois classes ou plus, en revanche, aucun k ne met à l'abri d'un ex æquo (k = 5 autorise 2 – 2 – 1) : il faut alors prévoir une règle de départage, par exemple la classe du voisin le plus proche." },
          { text: "L'entraînement compte 22 joueurs, et racine(22) ≈ 4,69 : la règle du cours conseille donc k = 5. C'est bien dans l'intervalle de 3 à 10 que le cours recommande en pratique." },
          { text: "Avec k = 22, les 22 joueurs d'entraînement votent pour CHAQUE prédiction : le résultat ne dépend plus du tout du joueur à classer, le modèle répond toujours la classe majoritaire du jeu d'entraînement. C'est le sous-apprentissage poussé à l'extrême — le modèle a cessé de regarder ses entrées." }
        ]
      },
      {
        num: "7", title: "Tracer la courbe du taux d'erreur",
        intro: "La même courbe que la diapositive « Taux d'erreur » du cours, mais sur nos rugbymen plutôt que sur les iris.",
        code: `plt.figure(figsize=(9, 5))
plt.plot(valeurs_k, taux_erreurs, marker='o', linestyle='-', color='crimson', linewidth=2)
plt.title("Évolution du taux d'erreur en fonction de k (Hyperparamètre)")
plt.xlabel("Valeur de k (Nombre de voisins considérés)")
plt.ylabel("Taux d'erreur (0.0 = aucune erreur)")
plt.xticks(valeurs_k)
plt.grid(True, linestyle='--', alpha=0.7)

# TODO : annoter le graphique aux deux extrémités (sur-apprentissage / sous-apprentissage)

plt.show()`,
        questions: [
          "Ajouter les deux annotations pédagogiques aux extrémités de la courbe.",
          "Quelle forme la courbe est-elle censée avoir, et pourquoi ?",
          "Relance le programme plusieurs fois. La courbe garde-t-elle la même allure ?"
        ],
        correction: [
          { code: `plt.text(valeurs_k[0], taux_erreurs[0], ' Overfitting potentiel', verticalalignment='bottom')
plt.text(valeurs_k[-1], taux_erreurs[-1], ' Sous-apprentissage\\n (Bruitage par la classe majoritaire)',
         horizontalalignment='right')` },
          { text: "Elle est censée avoir une forme de U, ou de vallée. À gauche (k = 1) le modèle recopie son plus proche voisin et épouse le moindre bruit : c'est le SUR-APPRENTISSAGE (overfitting). À droite (k = 15) le vote est noyé par des joueurs de plus en plus lointains et tend vers la classe majoritaire : c'est le SOUS-APPRENTISSAGE. Le meilleur k est au creux de la vallée, ce que le cours appelle le compromis biais-variance." },
          { text: "Non, et c'est le point le plus instructif de ce TP. Le tirage change à chaque exécution, et le taux est mesuré sur 8 joueurs seulement : il arrive souvent que la courbe soit toute plate, ou qu'elle monte et descende sans former de vallée. Sur 3000 tirages différents mesurés, environ 38 % donnent exactement le même taux d'erreur pour toutes les valeurs de k. Une seule exécution ne prouve rien — c'est l'objet de l'étape suivante." }
        ]
      },
      {
        num: "8", title: "Pour aller plus loin : moyenner sur plusieurs découpages",
        intro: "Un taux mesuré sur 8 joueurs tirés au hasard est trop instable pour choisir k. La parade : répéter l'expérience et faire la moyenne.",
        code: `# TODO : refaire N fois (par exemple 200) le mélange, le découpage et l'évaluation,
#        puis afficher le taux d'erreur MOYEN pour chaque valeur de k.
N = 200
moyennes = []

for k in valeurs_k:
    total = 0
    for essai in range(N):
        ...
    moyennes.append(total / N)`,
        note: "Répéter le tirage pour stabiliser une mesure est exactement l'idée de la validation croisée, utilisée dans tous les vrais projets d'apprentissage automatique.",
        questions: [
          "Écrire la double boucle et afficher la courbe moyenne.",
          "Quelle valeur de k ressort comme la meilleure ?",
          "Comparer avec la valeur conseillée par la règle de la racine carrée."
        ],
        correction: [
          { text: "On remélange à chaque essai, on redécoupe, on évalue, et on accumule. Attention à bien travailler sur une COPIE de la liste si l'on veut préserver l'ordre d'origine." },
          { code: `N = 200
moyennes = []

for k in valeurs_k:
    total = 0
    for essai in range(N):
        melange = joueurs[:]          # copie de la liste
        random.shuffle(melange)
        ent, tst = melange[:22], melange[22:30]
        total += evaluer_modele(ent, tst, k)
    moyennes.append(total / N)
    print(f"k={k:2} : taux d'erreur moyen = {moyennes[-1] * 100:.1f}%")

plt.plot(valeurs_k, moyennes, marker='s', color='navy', label=f"moyenne sur {N} découpages")
plt.legend()
plt.show()` },
          { text: "La vallée apparaît enfin. Sur 3000 découpages, les taux d'erreur moyens mesurés sont : 9,9 % à k=1 ; 6,7 % à k=3 ; 5,5 % à k=5 ; 5,2 % à k=7 ; 6,0 % à k=9 ; 5,7 % à k=11 ; 6,6 % à k=13 ; 10,3 % à k=15. Le minimum se situe vers k = 7, et les deux extrémités sont bien les plus mauvaises : le sur-apprentissage à k=1 et le sous-apprentissage à k=15 sont donc réels, mais ils ne se voient qu'en moyenne." },
          { text: "La règle de la racine carrée conseillait k = 5, pour un minimum observé vers k = 7 : l'écart est faible et les taux à k=5, 7, 9 et 11 sont très proches (entre 5,2 % et 6,0 %). La règle donne bien un bon ordre de grandeur — c'est un point de départ, pas un oracle. Avec 200 essais au lieu de 3000, tes chiffres différeront un peu : c'est normal, la moyenne se stabilise quand N grandit." }
        ]
      }
    ]
  },
  // ── Mémo Séance 1 ──────────────────────────────────────
  {
    id: 'memo-s1', bloc: 'bloc0', jour: 'Jour 1 — 19 mai 2026', theme: 'Linux — bases (navigation, fichiers, droits)', original: 'Jour2 tp1 unix_260520_121450.pdf',
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
    id: 'tp1', bloc: 'bloc0', jour: 'Jour 1 — 19 mai 2026', theme: 'Linux — bases (navigation, fichiers, droits)', original: 'Jour2 tp1 unix_260520_121450.pdf',
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
        ],
        correction: [
          "pwd affiche le répertoire courant, typiquement /home/votre_login. Le ~ (tilde) est un raccourci qui désigne ce répertoire personnel : cd ~ et cd seul ramènent tous deux au home.",
          "ls liste seulement les fichiers visibles ; ls -la ajoute -a (les fichiers cachés) et -l (le format long : droits, propriétaire, taille, date). Les fichiers commençant par un point (.bashrc, .gitconfig) sont cachés : ce sont surtout des fichiers de configuration.",
          "/bin = commandes de base · /etc = fichiers de configuration du système · /home = répertoires personnels des utilisateurs · /tmp = fichiers temporaires effacés au redémarrage."
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
        ],
        correction: [
          "Relatif : cd ../../etc (on remonte de deux niveaux jusqu'à la racine /, puis on descend dans etc). Absolu : cd /etc (toujours valable, quel que soit l'endroit où l'on se trouve).",
          "cd sans argument ramène au home (comme cd ~). cd - revient au répertoire précédent : pratique pour faire des allers-retours entre deux dossiers."
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
        ],
        correction: [
          "Arborescence : NSI_projet/ contient scripts/, data/ et docs/ ; scripts/ contient utilitaires/. mkdir -p crée toute la chaîne de dossiers parents manquants d'un coup (mkdir -p a/b/c crée a, puis b, puis c).",
          "cd ~ (ou cd seul) ramène directement au home en une seule commande, quel que soit le répertoire courant."
        ]
      }
    ]
  },
  // ── TP 2 ───────────────────────────────────────────────
  {
    id: 'tp2', bloc: 'bloc0', jour: 'Jour 1 — 19 mai 2026', theme: 'Linux — bases (navigation, fichiers, droits)', original: 'Jour2 tp1 unix_260520_121450.pdf',
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
        ],
        correction: [
          "cat > fichier écrit dans le fichier en ÉCRASANT son contenu précédent. cat >> fichier AJOUTE à la fin sans rien effacer. (Le heredoc << 'EOF' indique où s'arrête la saisie au clavier.)",
          "wc -l compte les lignes. wc -w compte les mots, wc -c compte les caractères (octets). Sur eleves.txt à 3 lignes, wc -l renvoie 3."
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
        ],
        correction: [
          "cp copie (l'original reste en place), mv déplace ou renomme (l'original disparaît). Si la destination de mv existe déjà, elle est écrasée silencieusement, sans avertissement — d'où la prudence à avoir.",
          "Un dossier contient d'autres fichiers : l'option -r (récursif) demande à cp de copier aussi tout le contenu. Sans -r, cp refuse de copier un dossier."
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
        ],
        correction: [
          "Les fichiers en point sont cachés par convention pour ne pas encombrer l'affichage : ce sont surtout des fichiers de configuration personnels (.bashrc configure le shell, le dossier .ssh stocke les clés de connexion).",
          "ls -a | grep '^[.]' : grep ne garde que les noms commençant par un point (^[.] = « commence par un point »). On peut aussi utiliser ls -d .* pour le même effet."
        ]
      }
    ]
  },
  // ── TP 3 ───────────────────────────────────────────────
  {
    id: 'tp3', bloc: 'bloc0', jour: 'Jour 1 — 19 mai 2026', theme: 'Linux — bases (navigation, fichiers, droits)', original: 'Jour2 tp1 unix_260520_121450.pdf',
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
        ],
        correction: [
          "Le PID du bash courant s'obtient avec echo $$ (ou en cherchant bash dans ps aux). Le PID 1 est le tout premier processus lancé par le noyau (systemd ou init) : c'est l'ancêtre de tous les autres processus.",
          "STAT : S = en sommeil (le processus attend un événement) · R = en cours d'exécution (running) · Z = zombie (le processus est terminé mais pas encore nettoyé par son parent)."
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
        ],
        correction: [
          "Dans man ls, l'option -S trie par taille (du plus gros au plus petit) : ls -lS. On peut chercher dans le man en tapant /taille puis Entrée.",
          "--help donne un résumé court et rapide ; man ouvre le manuel complet, avec toutes les options et des exemples. man est donc plus complet."
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
        ],
        correction: [
          "ps -u \"$USER\" | wc -l compte les lignes de processus de votre utilisateur ($USER contient votre login). Pensez à retirer 1 pour la ligne d'en-tête.",
          "grep -v grep retire de la liste la commande grep elle-même. Sans lui, ps aux | grep bash afficherait aussi le processus grep bash qu'on vient de lancer, ce qui fausserait le résultat."
        ]
      }
    ]
  },
  // ── TP 4 ───────────────────────────────────────────────
  {
    id: 'tp4', bloc: 'bloc0', jour: 'Jour 1 — 19 mai 2026', theme: 'Linux — bases (navigation, fichiers, droits)', original: 'Jour2 tp1 unix_260520_121450.pdf',
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
        ],
        correction: [
          "-rwxr-x--- : le propriétaire (rwx) peut lire, écrire et exécuter ; le groupe (r-x) peut lire et exécuter mais pas écrire ; les autres (---) n'ont aucun droit.",
          "chmod 740 fichier : 7=rwx (propriétaire), 4=r-- (groupe, lecture seule), 0=--- (autres, rien)."
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
        ],
        correction: [
          "MA_VAR=valeur crée une variable visible uniquement dans le shell courant. export MA_VAR=valeur la rend aussi visible par les programmes et sous-processus lancés depuis ce shell.",
          "$PATH contient la liste des dossiers où le shell cherche les commandes (séparés par des deux-points). Si on l'efface, le shell ne trouve plus ls, grep, etc. : il faut alors taper le chemin complet, comme /bin/ls."
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
        ],
        correction: [
          "Sans shebang, le système ne sait pas quel interpréteur utiliser : selon le contexte il tente de l'exécuter avec le shell courant ou refuse. Le #!/bin/bash lève l'ambiguïté en imposant bash.",
          "Ajouter la ligne : ls data/*.txt (ou ls data/ | grep '.txt') pour lister les fichiers .txt du dossier data.",
          "$(commande) est une substitution de commande : le shell exécute ce qui est entre $( et ) puis insère le résultat à la place. Ici $(date +%d/%m/%Y) insère la date du jour formatée jour/mois/année."
        ]
      }
    ]
  },
  // ── Mémo Séance 2 ──────────────────────────────────────
  {
    id: 'memo-s2', bloc: 'bloc0', jour: 'Jour 2 — 20 mai 2026', theme: 'Linux — filtres de texte & pipes', original: 'Jour 2 tp unix shell avance_260520_174731.pdf',
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
    id: 'tp5', bloc: 'bloc0', jour: 'Jour 2 — 20 mai 2026', theme: 'Linux — filtres de texte & pipes', original: 'Jour 2 tp unix shell avance_260520_174731.pdf',
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
        ],
        correction: [
          "4 élèves en 1NSI1 (Alice, Clara, Emma, Gina). Commande : grep -c '1NSI1' data/eleves.csv — l'option -c compte les lignes correspondantes.",
          "grep -v 'nom' affiche toutes les lignes SAUF celles contenant « nom » : ici cela élimine la ligne d'en-tête (nom,prenom,classe,…) pour ne garder que les données des élèves."
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
        ],
        correction: [
          "Meilleure note en info : Emma (19) — sort -t',' -k5 -nr data/eleves.csv | head. Meilleure note en maths : Clara (17) — sort -t',' -k4 -nr data/eleves.csv | head. (-k5/-k4 = numéro de colonne, -n = tri numérique, -r = ordre décroissant.)"
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
        ],
        correction: [
          "uniq ne supprime que les doublons CONSÉCUTIFS. Sans tri préalable, deux lignes identiques séparées par d'autres lignes ne sont pas détectées. Il faut donc sort d'abord pour regrouper les doublons côte à côte.",
          "4 élèves par classe. Pipeline : cut -d',' -f3 data/eleves.csv | grep -v 'classe' | sort | uniq -c → affiche « 4 1NSI1 » et « 4 1NSI2 »."
        ]
      }
    ]
  },
  {
    id: 'tp6', bloc: 'bloc0', jour: 'Jour 2 — 20 mai 2026', theme: 'Linux — filtres de texte & pipes', original: 'Jour 2 tp unix shell avance_260520_174731.pdf',
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
        ],
        correction: [
          "grep '1NSI2' data/eleves.csv | cut -d',' -f1,2 | sort : on filtre la classe 1NSI2, on extrait nom+prénom (colonnes 1 et 2), puis on trie alphabétiquement. Résultat : Martin,Bob — Morin,Hugo — Petit,Felix — Thomas,David."
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
        ],
        correction: [
          "8 lignes. Le > a créé le fichier avec les 4 élèves de 1NSI1 (en écrasant), puis le >> a ajouté les 4 élèves de 1NSI2 à la fin sans rien effacer. Malgré son nom, le fichier contient donc les deux classes : c'est tout l'intérêt de >> (ajouter) par opposition à > (écraser)."
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
        ],
        correction: [
          "Pipeline complet : grep '1NSI1' data/eleves.csv | grep -v 'nom' | sort -t',' -k5 -nr | cut -d',' -f1,2,5 >> data/rapport.txt. Décodage étape par étape : grep '1NSI1' garde la classe visée → grep -v 'nom' enlève l'éventuel en-tête → sort -t',' -k5 -nr trie par note d'info (colonne 5) en ordre décroissant → cut -d',' -f1,2,5 extrait nom, prénom et note d'info → >> ajoute le tout à la fin du rapport sans écraser l'en-tête créé à l'étape 1."
        ]
      }
    ]
  },
  // ── Python · TP 1 ──────────────────────────────────────
  {
    id: 'pytp1', bloc: 'bloc0', jour: 'Jour 3 — 21 mai 2026', theme: 'Python — bases du langage', notebook: 'Python_S1_notebook_etudiant_1.ipynb',
    title: 'Python · TP 1 — Variables et types',
    type: 'tp',
    intro: 'Notebook Python (Séance 1). Exécute chaque cellule avec Ctrl+Entrée. Les cellules « # À vous ! » sont des exercices à compléter.',
    steps: [
      {
        num: '1.1', title: 'Les 4 types fondamentaux',
        code: `# Les 4 types de base
age     = 17        # int   — entier
moyenne = 13.5      # float — décimal
prenom  = 'Alice'   # str   — chaîne de caractères
admis   = True      # bool  — booléen
print(type(age), type(moyenne), type(prenom), type(admis))

# Typage dynamique : une variable peut changer de type
x = 42
print(x, type(x))
x = 'maintenant une chaîne'
print(x, type(x))

# Surprise : bool est un sous-type de int !
print(True + True)    # ?
print(True == 1)      # ?
print(False == 0)`,
        questions: [
          "Que renvoie True + True ? Pourquoi ?",
          "Qu'est-ce que cela révèle sur le type bool en Python ?"
        ],
        correction: [
          "True + True renvoie 2. En Python, bool est un sous-type de int : True vaut 1 et False vaut 0. L'addition de deux booléens se fait donc comme une addition d'entiers (1 + 1 = 2).",
          "Cela révèle que les booléens sont des entiers déguisés : True == 1 et False == 0 sont vrais. On peut ainsi compter des conditions vraies en additionnant des booléens."
        ]
      },
      {
        num: '1.2', title: 'Opérateurs',
        code: `# Arithmétiques
print(17 + 5, 17 - 5, 17 * 5)
print(17 / 5)    # division — TOUJOURS un float !
print(17 // 5)   # division entière (quotient)
print(17 % 5)    # modulo (reste)
print(2 ** 10)   # puissance

# Comparaison et logiques
print(17 == 17, 17 != 10, 17 >= 17)
print(True and False, True or False, not True)

# Erreur classique : = (affectation) vs == (comparaison)
# if age = 17:   ->  SyntaxError ! il faut ==`,
        questions: [
          "Quelle est la différence entre 17/5 et 17//5 ? Dans quel algorithme NSI utilise-t-on // et % ?",
          "Explique la différence entre = et ==."
        ],
        correction: [
          "17/5 = 3.4 (division réelle, renvoie toujours un float). 17//5 = 3 (division entière, le quotient). On utilise // et % dans la division euclidienne, le test de parité (n % 2 == 0), l'extraction des chiffres d'un nombre, les conversions de base, ou le chiffrement (modulo).",
          "= est l'affectation : elle donne une valeur à une variable (age = 17). == est la comparaison : elle teste l'égalité et renvoie un booléen. Confondre les deux dans un if provoque une SyntaxError."
        ]
      },
      {
        num: '1.3', title: 'Conversions de types',
        code: `print(int(3.9))     # troncature ou arrondi ?
print(int(3.1))
print(float(17))
print(str(42))
print(int('42'))

# Conversion impossible
try:
    int('bonjour')
except ValueError as e:
    print(f'ValueError : {e}')`,
        questions: [
          "int(3.9) fait-il un arrondi ou une troncature ? Comment le prouver ?"
        ],
        correction: [
          "int(3.9) renvoie 3 : c'est une TRONCATURE (on enlève la partie décimale), pas un arrondi. Preuve : un arrondi donnerait 4. Pour arrondir réellement, on utilise round(3.9) qui donne 4."
        ]
      },
      {
        num: '1.4', title: 'Exercice — calculatrice de moyenne',
        code: `# Complète ce programme :
note1 = ___   # choisis une note
note2 = ___
note3 = ___
moyenne = ___  # formule de la moyenne
print(f'Votre moyenne est : {moyenne:.2f}')
print(f'Meilleure note   : {max(note1, note2, note3)}')`,
        questions: [
          "Complète les quatre blancs."
        ],
        correction: [
          "note1 = 15 ; note2 = 12 ; note3 = 18 ; moyenne = (note1 + note2 + note3) / 3. La moyenne s'affiche 15.00 (le :.2f impose 2 décimales) et la meilleure note 18."
        ]
      }
    ]
  },
  // ── Python · TP 2 ──────────────────────────────────────
  {
    id: 'pytp2', bloc: 'bloc0', jour: 'Jour 3 — 21 mai 2026', theme: 'Python — bases du langage', notebook: 'Python_S1_notebook_etudiant_1.ipynb',
    title: 'Python · TP 2 — Entrées / sorties',
    type: 'tp',
    intro: 'input() retourne TOUJOURS une chaîne (str) — ne jamais l\'oublier !',
    steps: [
      {
        num: '2.1', title: 'input() et f-strings',
        code: `# input() retourne toujours une str
prenom = input('Quel est ton prénom ? ')
print(f'Bonjour {prenom} !')
print(type(prenom))

# Erreur classique : oublier de convertir
# age = input('Âge ? ')   # '17' (str)
# print(age + 10)         # TypeError !

# Bonne pratique : convertir tout de suite
age = int(input('Quel est ton âge ? '))
print(f'Dans 10 ans, tu auras {age + 10} ans.')

# f-strings et formatage
note = 16.567
print(f'{note:.1f}')   # 1 décimale
print(f'{note:.2f}')   # 2 décimales
print(f'{note:.0f}')   # arrondi entier`,
        questions: [
          "Que signifie :.2f dans une f-string ?",
          "Pourquoi print(age + 10) provoque-t-il une TypeError si age vient de input() ?"
        ],
        correction: [
          ":.2f formate un nombre à virgule (f = float) avec 2 chiffres après la virgule. Ex. 16.567 devient 16.57. :.0f arrondit à l'entier (17).",
          "input() renvoie une str : age contient '17' (texte), pas 17 (nombre). '17' + 10 mélange chaîne et entier → TypeError. Solution : age = int(input(...)) pour convertir tout de suite."
        ]
      },
      {
        num: '2.2', title: 'Exercice complet',
        code: `# Écris un programme qui :
# 1. Demande le prénom et l'âge
# 2. Affiche 'Bonjour [prénom], tu as [âge] ans.'
# 3. Affiche le nombre d'années avant la majorité (jamais négatif)
prenom = ___
age    = ___
print(___)
print(f'Tu seras majeur(e) dans {max(0, 18 - age)} an(s).')`,
        questions: [
          "Complète le programme."
        ],
        correction: [
          "prenom = input('Prénom ? ') ; age = int(input('Âge ? ')) ; print(f'Bonjour {prenom}, tu as {age} ans.'). Le max(0, 18 - age) garantit qu'on n'affiche jamais un nombre négatif d'années (si l'élève est déjà majeur, on obtient 0)."
        ]
      }
    ]
  },
  // ── Python · TP 3 ──────────────────────────────────────
  {
    id: 'pytp3', bloc: 'bloc0', jour: 'Jour 3 — 21 mai 2026', theme: 'Python — bases du langage', notebook: 'Python_S1_notebook_etudiant_1.ipynb',
    title: 'Python · TP 3 — Conditions',
    type: 'tp',
    intro: 'L\'indentation (4 espaces) est syntaxiquement OBLIGATOIRE en Python : elle délimite les blocs.',
    steps: [
      {
        num: '3.1', title: 'if / else et indentation',
        code: `note = float(input('Note (0-20) : '))
if note >= 10:
    print('Admis(e)')      # 4 espaces — obligatoire !
else:
    print('Ajourné(e)')

# Sans indentation -> IndentationError :
# if note >= 10:
# print('Admis')   # ERREUR`,
        questions: [
          "Qu'est-ce qu'une IndentationError ? Pourquoi Python l'impose-t-il ?"
        ],
        correction: [
          "Une IndentationError survient quand le code à l'intérieur d'un bloc (après if:, else:, for:…) n'est pas décalé vers la droite. Python utilise l'indentation (4 espaces) pour délimiter les blocs, là où d'autres langages utilisent des accolades. L'indentation fait donc partie de la syntaxe, elle n'est pas décorative."
        ]
      },
      {
        num: '3.2', title: 'if / elif / else et ordre des conditions',
        code: `note = float(input('Note (0-20) : '))
if note >= 16:
    mention = 'Très Bien'
elif note >= 14:
    mention = 'Bien'
elif note >= 12:
    mention = 'Assez Bien'
elif note >= 10:
    mention = 'Passable'
else:
    mention = 'Ajourné(e)'
print(mention)

# Piège : ordre inversé avec note = 17
note = 17
if note >= 14:    # vrai en premier !
    mention = 'Bien'
elif note >= 16:  # jamais atteint
    mention = 'Très Bien'
print(mention)    # affiche 'Bien' — problème !`,
        questions: [
          "Explique le problème de l'ordre inversé avec note = 17."
        ],
        correction: [
          "Avec note = 17, la première condition note >= 14 est vraie : mention = 'Bien' et Python IGNORE les elif suivants (dès qu'une condition est vraie, le reste est sauté). On n'atteint jamais note >= 16, alors que 17 mérite 'Très Bien'. Il faut ordonner les conditions du plus restrictif (>= 16) au moins restrictif (>= 10)."
        ]
      },
      {
        num: '3.3', title: 'Exercice — validation de la note',
        code: `# Refuser une note < 0 ou > 20 AVANT de calculer la mention.
note = float(input('Note (0-20) : '))
# TODO :
# if ___:
#     print('Note invalide !')
# else:
#     ... (calcul de la mention)`,
        questions: [
          "Complète la validation."
        ],
        correction: [
          "if note < 0 or note > 20: print('Note invalide !') else: (ici le calcul de la mention). Le or est essentiel : la note est invalide si elle est trop petite OU trop grande. On valide avant de calculer pour éviter une mention absurde sur une note impossible."
        ]
      }
    ]
  },
  // ── Python · TP 4 ──────────────────────────────────────
  {
    id: 'pytp4', bloc: 'bloc0', jour: 'Jour 3 — 21 mai 2026', theme: 'Python — bases du langage', notebook: 'Python_S1_notebook_etudiant_1.ipynb',
    title: 'Python · TP 4 — Boucles',
    type: 'tp',
    intro: 'Deux boucles : for (nombre de tours connu, avec range()) et while (jusqu\'à ce qu\'une condition change).',
    steps: [
      {
        num: '4.1', title: 'Boucle for avec range()',
        code: `print(list(range(5)))          # 0 à 4
print(list(range(1, 6)))       # 1 à 5
print(list(range(0, 20, 5)))   # 0, 5, 10, 15
print(list(range(10, 0, -1)))  # 10 à 1 (décroissant)

# Accumulation : somme de 1 à 100
total = 0
for i in range(1, 101):
    total += i
print(total)                    # 5050
print(100 * 101 // 2)           # même résultat par la formule`,
        questions: [
          "Que produit range(1, 10, 2) ?",
          "Écris une boucle qui affiche les 10 premiers multiples de 7."
        ],
        correction: [
          "range(1, 10, 2) produit 1, 3, 5, 7, 9 : de 1 (inclus) à 10 (exclu) par pas de 2, donc les impairs jusqu'à 9.",
          "for i in range(1, 11): print(7 * i)  → affiche 7, 14, 21, … 70. (On peut aussi écrire range(7, 71, 7).)"
        ]
      },
      {
        num: '4.2', title: 'Boucle while — jeu du nombre deviné',
        code: `import random
secret = random.randint(1, 20)
tentative = 0
while True:
    guess = int(input('Devine (1-20) : '))
    tentative += 1
    if guess == secret:
        print(f'Bravo ! Trouvé en {tentative} coup(s).')
        break
    elif guess < secret:
        print('Trop petit')
    else:
        print('Trop grand')`,
        note: 'while True: … break est le motif classique d\'une boucle qui tourne jusqu\'à ce qu\'une condition d\'arrêt soit rencontrée.',
        questions: [
          "Que se passe-t-il si on retire le break ?",
          "Pourquoi while True plutôt que for ici ?"
        ],
        correction: [
          "Sans le break, la condition while True reste vraie indéfiniment : la boucle ne s'arrête jamais (boucle infinie), même après avoir trouvé le secret.",
          "On ne connaît pas à l'avance le nombre d'essais : il dépend du joueur. for sert quand le nombre de tours est connu (ex. range(1, 11)) ; while sert quand on répète jusqu'à ce qu'une condition change."
        ]
      },
      {
        num: '4.3', title: 'Exercice — limiter à 5 tentatives',
        code: `import random
secret     = random.randint(1, 20)
tentative  = 0
MAX_ESSAIS = 5
while True:
    restant = ___                       # tentatives restantes
    print(f'Il reste {restant} essai(s)')
    guess = int(input('Devine : '))
    tentative += 1
    if guess == secret:
        print(f'Trouvé en {tentative} coup(s) !')
        break
    elif ___:                           # plus de tentatives ?
        print(f'Perdu ! Le secret était {secret}')
        break
    elif guess < secret:
        print('Trop petit')
    else:
        print('Trop grand')`,
        questions: [
          "Complète les deux blancs."
        ],
        correction: [
          "restant = MAX_ESSAIS - tentative (essais encore disponibles). Condition de fin : elif tentative >= MAX_ESSAIS: (on a épuisé les 5 essais sans trouver → on révèle le secret et on s'arrête avec break)."
        ]
      }
    ]
  },
  // ── Python · Bilan ─────────────────────────────────────
  {
    id: 'pybilan', bloc: 'bloc0', jour: 'Jour 3 — 21 mai 2026', theme: 'Python — bases du langage', notebook: 'Python_S1_notebook_etudiant_1.ipynb',
    title: 'Python · Bilan — Quiz de révision',
    type: 'tp',
    intro: 'Prédis le résultat de chaque ligne AVANT d\'exécuter, puis vérifie.',
    steps: [
      {
        num: 'Q', title: 'Quiz : prédis la sortie',
        code: `print(17 // 5)
print(17 % 5)
print(type(17 / 5))
print(list(range(2, 10, 3)))
print('2' + '3')
print(2 + 3)`,
        questions: [
          "Donne la sortie de chacune des 6 lignes."
        ],
        correction: [
          "17 // 5 → 3 (quotient entier). 17 % 5 → 2 (reste). type(17 / 5) → class float (la division / donne toujours un float). list(range(2, 10, 3)) → [2, 5, 8]. '2' + '3' → '23' (concaténation de chaînes, pas une addition !). 2 + 3 → 5 (addition d'entiers)."
        ]
      }
    ]
  },
  // ── Python · Séance 2 ──────────────────────────────────
  {
    id: 'pys2', bloc: 'bloc0', jour: 'Python — Séance 2', theme: 'Python — fonctions & structures de données',
    notebook: 'Python_S2_notebook_etudiant.ipynb',
    title: 'Python · Séance 2 — Fonctions et structures de données',
    type: 'tp',
    intro: 'Fonctions, portée, listes, tuples, dictionnaires et compréhensions. Le notebook interactif (bouton ⚡ Basthon) contient tous les exercices à compléter et exécuter.',
    steps: [
      {
        num: '1', title: 'Fonctions : def, return, paramètres par défaut, portée',
        code: `def carre(n):
    """Retourne le carré de n."""
    return n * n

# Paramètre par défaut + expression conditionnelle
def mention(note, seuil=10):
    return 'Admis' if note >= seuil else 'Ajourné'

print(mention(14))                 # Admis (seuil par défaut = 10)
print(mention(14, 15))             # Ajourné
print(mention(note=14, seuil=12))  # arguments nommés

# Renvoyer plusieurs valeurs (un tuple)
def statistiques(notes):
    return min(notes), max(notes), sum(notes) / len(notes)

mini, maxi, moy = statistiques([12, 15, 8, 17, 11])

# Portée : une variable créée dans une fonction est LOCALE
def calcul():
    x = 42
    return x
# print(x)  ->  NameError : x n'existe pas en dehors de calcul()`,
        questions: [
          "Que vaut carre(carre(3)) ?",
          "Que se passe-t-il si on écrit print(x) en dehors de la fonction calcul() ?",
          "Exercice : écris statistiques_complete(notes) qui renvoie aussi l'écart-type."
        ],
        correction: [
          "carre(3) = 9, puis carre(9) = 81. Une fonction peut prendre en argument le résultat d'une autre.",
          "NameError : x est une variable LOCALE à calcul(), elle n'existe pas à l'extérieur. C'est la notion de portée (scope) : ce qui est défini dans une fonction y reste confiné. On note aussi le paramètre par défaut (seuil=10), les arguments nommés, la docstring entre triples guillemets, et le renvoi de plusieurs valeurs sous forme de tuple.",
          { text: "Exercice statistiques_complete — solution. On calcule la moyenne, puis la VARIANCE (la moyenne des écarts à la moyenne élevés au carré), et l'ÉCART-TYPE = racine carrée de la variance." },
          { code: `import math

def statistiques_complete(notes):
    n = len(notes)
    moyenne = sum(notes) / n
    variance = sum((x - moyenne) ** 2 for x in notes) / n
    ecart_type = math.sqrt(variance)
    return {
        'moyenne': moyenne,
        'min': min(notes),
        'max': max(notes),
        'ecart_type': ecart_type,
    }

print(statistiques_complete([12, 15, 8, 17, 11]))
# moyenne 12.6 | min 8 | max 17 | ecart_type ≈ 3.137` },
          { text: "Pourquoi ces étapes : (1) la moyenne sert de référence ; (2) on élève chaque écart au carré pour le rendre positif et amplifier les grands écarts ; (3) la variance est la moyenne de ces carrés ; (4) la racine carrée ramène le résultat dans l'unité d'origine (des points). Lecture : un écart-type ≈ 3,14 signifie que les notes s'écartent en moyenne d'environ 3 points autour de la moyenne (12,6). Variante « échantillon » (statistique inférentielle) : diviser la variance par n - 1 au lieu de n." }
        ]
      },
      {
        num: '2', title: 'Listes : indexation, slicing, méthodes, copie vs référence',
        code: `notes = [12, 15, 8, 17, 11, 14]
notes[0]      # 12  (premier)
notes[-1]     # 14  (dernier)
notes[1:4]    # [15, 8, 17]  (slicing : indices 1 à 3, le 4 est exclu)
notes[::-1]   # liste inversée
notes[::2]    # un élément sur deux

# Méthodes qui MODIFIENT la liste sur place
notes.append(20)   # ajoute à la fin
notes.sort()       # trie sur place

# Copie vs référence (le PIÈGE classique)
a = [1, 2, 3]
b = a           # b et a désignent la MÊME liste
b.append(99)    # ... donc a est modifiée aussi !
c = a.copy()    # c est une VRAIE copie indépendante`,
        questions: [
          "Prédis notes[2:5] et notes[::2] sur [12, 15, 8, 17, 11, 14].",
          "Quelle est la différence entre b = a et c = a.copy() ?"
        ],
        correction: [
          "notes[2:5] → [8, 17, 11] (indices 2, 3, 4 ; le 5 est exclu). notes[::2] → [12, 8, 11] (un élément sur deux).",
          "b = a copie seulement la RÉFÉRENCE : a et b pointent vers la même liste en mémoire, donc modifier l'une modifie l'autre. c = a.copy() crée une nouvelle liste indépendante. C'est la distinction fondamentale entre une référence partagée et une vraie copie d'un objet mutable.",
          { text: "Exercice analyser_classe(notes) — solution. On renvoie un dictionnaire avec les statistiques de la classe. nb_admis se calcule en comptant les notes >= 10 avec une compréhension de liste." },
          { code: `def analyser_classe(notes):
    return {
        'min': min(notes),
        'max': max(notes),
        'moyenne': sum(notes) / len(notes),
        'nb_admis': len([n for n in notes if n >= 10]),
    }

notes = [12, 15, 8, 17, 11, 14, 6, 18, 9, 13]
print(analyser_classe(notes))
# {'min': 6, 'max': 18, 'moyenne': 12.3, 'nb_admis': 7}` }
        ]
      },
      {
        num: '3', title: 'Tuples et dictionnaires',
        code: `# Tuple : séquence NON modifiable (immuable)
coord = (48.8566, 2.3522)
lat, lon = coord          # déballage (unpacking)
# coord[0] = 0  ->  TypeError : un tuple ne se modifie pas

# Dictionnaire : couples clé -> valeur
eleve = {'nom': 'Dupont', 'prenom': 'Alice', 'note_info': 18}
eleve['nom']                       # 'Dupont' (accès par clé)
eleve.get('age', 'Non renseigné')  # valeur par défaut si la clé est absente
eleve['classe'] = '1NSI1'          # ajout d'une clé
for cle, val in eleve.items():     # parcours clé / valeur
    print(cle, ':', val)`,
        questions: [
          "Quand préfère-t-on un tuple à une liste ?"
        ],
        correction: [
          "On choisit un tuple quand les données ne doivent PAS changer (coordonnées GPS, date, point fixe) : l'immuabilité protège des modifications accidentelles et permet d'utiliser le tuple comme clé de dictionnaire. La liste sert quand le contenu évolue (ajouts, tris).",
          "Le dictionnaire associe des clés à des valeurs ; .get(cle, defaut) évite une erreur si la clé manque ; .items() parcourt les couples (clé, valeur)."
        ]
      },
      {
        num: '4', title: 'Compréhensions de liste et de dictionnaire',
        code: `notes = [12, 15, 8, 17, 11, 14, 6]
carres = [n**2 for n in notes]            # transformer
admis  = [n for n in notes if n >= 10]    # filtrer
pct    = [round(n/20*100, 1) for n in notes]

# Compréhension de dictionnaire + zip()
noms = ['Alice', 'Bob', 'Clara']
vals = [15, 12, 17]
dico = {nom: note for nom, note in zip(noms, vals)}
# {'Alice': 15, 'Bob': 12, 'Clara': 17}`,
        questions: [
          "Exercice final : à partir d'une liste de dicts élèves (nom, maths, info), écris (1) la liste des noms admis en info, (2) la moyenne en info, (3) le dict {nom: moyenne maths-info}."
        ],
        correction: [
          { text: "Exercice final — solution. Chaque question se traite avec une compréhension (qui remplace une boucle for + append). Le schéma est toujours : [expression for élément in itérable if condition]." },
          { code: `classe = [
    {'nom': 'Alice', 'maths': 15, 'info': 18},
    {'nom': 'Bob',   'maths': 12, 'info': 14},
    {'nom': 'Clara', 'maths': 17, 'info': 16},
    {'nom': 'David', 'maths':  9, 'info': 11},
]

# 1) noms des admis en info (>= 10)
admis = [e['nom'] for e in classe if e['info'] >= 10]

# 2) moyenne de la classe en info
moy_info = sum(e['info'] for e in classe) / len(classe)

# 3) dict {nom: moyenne maths-info}
moyennes = {e['nom']: (e['maths'] + e['info']) / 2 for e in classe}

print(admis)      # ['Alice', 'Bob', 'Clara', 'David']
print(moy_info)   # 14.75
print(moyennes)   # {'Alice': 16.5, 'Bob': 13.0, 'Clara': 16.5, 'David': 10.0}` }
        ]
      }
    ]
  },
  // ── Python · Séance 3 ──────────────────────────────────
  {
    id: 'pys3', bloc: 'bloc0', jour: 'Python — Séance 3', theme: 'Python — algorithmique & fichiers',
    notebook: 'Python_S3_notebook_etudiant.ipynb',
    title: 'Python · Séance 3 — Algorithmique et fichiers',
    type: 'tp',
    intro: 'Tris, recherches, récursivité et fichiers CSV. À exécuter pas à pas dans le notebook (⚡ Basthon).',
    steps: [
      {
        num: '1', title: 'Algorithmes de tri (sélection, insertion)',
        code: `def tri_selection(lst):
    """Tri par sélection — O(n²)."""
    lst = lst.copy()
    n = len(lst)
    for i in range(n - 1):
        idx_min = i
        for j in range(i + 1, n):
            if lst[j] < lst[idx_min]:
                idx_min = j
        lst[i], lst[idx_min] = lst[idx_min], lst[i]   # échange
    return lst

def tri_insertion(lst):
    """Tri par insertion — O(n²)."""
    lst = lst.copy()
    for i in range(1, len(lst)):
        cle = lst[i]
        j = i - 1
        while j >= 0 and lst[j] > cle:
            lst[j + 1] = lst[j]
            j -= 1
        lst[j + 1] = cle
    return lst

print(sorted([12, 15, 8, 17]))   # Timsort intégré de Python — O(n log n)`,
        questions: [
          "Lequel des deux tris préfères-tu enseigner, et pourquoi ?",
          "Quelle est la précondition implicite du tri par insertion à chaque étape ?"
        ],
        correction: [
          "Le tri par insertion est souvent privilégié en classe : il est intuitif (comme ranger des cartes dans sa main) et reste rapide sur une liste presque triée. Les deux sont en O(n²), donc lents sur de grandes listes — d'où l'usage de sorted() (Timsort, O(n log n)) en pratique.",
          "À chaque étape, toute la partie située AVANT l'indice i est déjà triée : l'algorithme insère le nouvel élément à sa place dans cette portion triée. Les deux fonctions renvoient une nouvelle liste (grâce à lst.copy()) sans modifier l'originale."
        ]
      },
      {
        num: '2', title: 'Recherche séquentielle et dichotomique',
        code: `def recherche_sequentielle(lst, valeur):
    """Recherche linéaire — O(n)."""
    for i, v in enumerate(lst):
        if v == valeur:
            return i
    return -1

def recherche_dichotomique(lst, valeur):
    """Recherche dichotomique — O(log n). Liste TRIÉE obligatoire."""
    gauche, droite = 0, len(lst) - 1
    while gauche <= droite:
        milieu = (gauche + droite) // 2
        if lst[milieu] == valeur:
            return milieu
        elif lst[milieu] < valeur:
            gauche = milieu + 1
        else:
            droite = milieu - 1
    return -1`,
        questions: [
          "Pourquoi la dichotomique donne-t-elle un résultat faux sur une liste non triée ?",
          "Sur 1000 éléments, combien de comparaisons au maximum pour chaque méthode ?"
        ],
        correction: [
          "La dichotomique suppose la liste triée : elle compare au milieu et élimine une moitié. Si la liste n'est pas triée, l'hypothèse « tout ce qui est à gauche est plus petit » est fausse — elle peut éliminer la moitié qui contient la valeur et renvoyer -1 à tort. C'est la même pré-condition « liste triée » qu'on a vue avec uniq en shell.",
          "Séquentielle : jusqu'à 1000 comparaisons (O(n)). Dichotomique : environ 10 comparaisons car log₂(1000) ≈ 10 (O(log n)). C'est tout l'intérêt de trier d'abord."
        ]
      },
      {
        num: '3', title: 'Récursivité (factorielle, Fibonacci)',
        code: `def factorielle(n):
    """n! récursivement."""
    if n <= 1:                 # cas de base — OBLIGATOIRE
        return 1
    return n * factorielle(n - 1)

def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

# Version itérative (rapide)
def fibonacci_iter(n):
    a, b = 0, 1
    for _ in range(n):
        a, b = b, a + b
    return a`,
        questions: [
          "Déroule à la main factorielle(4) en écrivant chaque appel et son retour.",
          "Pourquoi la version récursive de Fibonacci est-elle très lente ?"
        ],
        correction: [
          "factorielle(4) = 4 × factorielle(3) = 4 × (3 × factorielle(2)) = 4 × 3 × (2 × factorielle(1)) = 4 × 3 × 2 × 1 = 24. Chaque appel attend le résultat du suivant ; le cas de base (n <= 1) arrête la descente.",
          "fibonacci récursif recalcule sans cesse les mêmes valeurs : fibonacci(5) appelle fibonacci(4) ET fibonacci(3), qui rappellent fibonacci(3), fibonacci(2)… Le nombre d'appels explose (exponentiel, de l'ordre de 2ⁿ). La version itérative ne calcule chaque terme qu'une seule fois (linéaire)."
        ]
      },
      {
        num: '4', title: 'Fichiers CSV (lecture / écriture)',
        code: `import csv

# Lire un CSV en liste de dictionnaires
def lire_csv(chemin):
    with open(chemin, newline='', encoding='utf-8') as f:
        return list(csv.DictReader(f))

eleves = lire_csv('eleves.csv')   # chaque élève est un dict

# Traiter : moyenne info, nombre d'admis
notes_info = [int(e['note_info']) for e in eleves]
moyenne = sum(notes_info) / len(notes_info)
admis = [e for e in eleves if int(e['note_info']) >= 10]

# Écrire un CSV depuis une liste de dicts
def ecrire_csv(chemin, lignes, champs):
    with open(chemin, 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=champs, extrasaction='ignore')
        writer.writeheader()
        writer.writerows(lignes)`,
        questions: [
          "Pourquoi convertir e['note_info'] avec int() avant de calculer ?",
          "Quel est le rôle de DictReader et DictWriter ?"
        ],
        correction: [
          "Un fichier CSV ne contient que du TEXTE : csv.DictReader renvoie toutes les valeurs en chaîne ('18'). Pour calculer (somme, moyenne, comparaison >= 10) il faut les convertir en int (ou float). Sans conversion, on compare des chaînes et les résultats sont faux.",
          "DictReader lit chaque ligne du CSV comme un dictionnaire dont les clés sont les en-têtes de colonnes. DictWriter fait l'inverse : writeheader() écrit la ligne d'en-tête, writerows() écrit la liste de dicts.",
          { text: "Exercice complet — lire eleves.csv, calculer la moyenne en info, et écrire les admis (info >= 10) dans admis.csv :" },
          { code: `import csv

def lire_csv(chemin):
    with open(chemin, newline='', encoding='utf-8') as f:
        return list(csv.DictReader(f))

eleves = lire_csv('eleves.csv')

# Moyenne en info (penser à convertir en int !)
notes = [int(e['note_info']) for e in eleves]
print(f'Moyenne info : {sum(notes) / len(notes):.2f}')

# Garder les admis puis les écrire dans un nouveau CSV
admis = [e for e in eleves if int(e['note_info']) >= 10]
with open('admis.csv', 'w', newline='', encoding='utf-8') as f:
    writer = csv.DictWriter(f, fieldnames=['nom', 'prenom', 'note_info'],
                            extrasaction='ignore')
    writer.writeheader()
    writer.writerows(admis)

print(len(admis), 'admis écrits dans admis.csv')` }
        ]
      }
    ]
  },
  // ── Python · Séance 4 ──────────────────────────────────
  {
    id: 'pys4', bloc: 'bloc0', jour: 'Python — Séance 4', theme: 'Python — projet intégré',
    notebook: 'Python_S4_notebook_etudiant.ipynb',
    title: 'Python · Séance 4 — Projet intégré : Gestionnaire de notes NSI',
    type: 'tp',
    intro: 'Projet récapitulatif : lire un CSV, calculer des statistiques, afficher, trier/modifier, exporter. On développe une fonction à la fois et on la teste avec assert. Le notebook (⚡ Basthon) contient les tests automatiques.',
    steps: [
      {
        num: '1', title: 'Lecture du fichier',
        code: `def lire_notes(chemin):
    """Lit le CSV et retourne une liste de dicts."""
    # à compléter
    pass

eleves = lire_notes('eleves.csv')
assert isinstance(eleves, list)
assert len(eleves) > 0
assert 'nom' in eleves[0]`,
        questions: [ "Complète lire_notes(chemin)." ],
        correction: [
          { text: "Solution. On réutilise exactement la lecture CSV de la séance 3 : DictReader transforme chaque ligne en dictionnaire." },
          { code: `import csv

def lire_notes(chemin):
    """Lit le CSV et retourne une liste de dicts."""
    with open(chemin, newline='', encoding='utf-8') as f:
        return list(csv.DictReader(f))` }
        ]
      },
      {
        num: '2', title: 'Statistiques (min, max, moyenne, écart-type)',
        code: `import math

def statistiques(eleves, matiere):
    notes = [float(e[matiere]) for e in eleves]
    # à compléter : min, max, moyenne, écart-type
    pass`,
        questions: [ "Complète statistiques() pour renvoyer (min, max, moyenne, écart-type)." ],
        correction: [
          { text: "Solution. On convertit les notes en float, on calcule la moyenne, puis l'écart-type (racine de la moyenne des écarts au carré). On renvoie un tuple de 4 valeurs." },
          { code: `import math

def statistiques(eleves, matiere):
    notes = [float(e[matiere]) for e in eleves]
    moyenne = sum(notes) / len(notes)
    ecart_type = math.sqrt(sum((n - moyenne) ** 2 for n in notes) / len(notes))
    return min(notes), max(notes), moyenne, ecart_type` },
          { text: "L'écart-type mesure la dispersion des notes autour de la moyenne : plus il est grand, plus les niveaux sont hétérogènes dans la classe." }
        ]
      },
      {
        num: '3', title: 'Affichage aligné (bulletin)',
        code: `def afficher_bulletin(eleves):
    print(f"{'Nom':<12} {'Prenom':<10} {'Maths':>6} {'Info':>6}")
    print('-' * 38)
    for e in eleves:
        # à compléter : afficher chaque élève aligné
        pass`,
        questions: [ "Complète la boucle pour afficher chaque élève en colonnes alignées." ],
        correction: [
          { text: "Solution. Dans la boucle, on réutilise les formats d'alignement de f-string : :<12 aligne à gauche sur 12 caractères, :>6 aligne à droite sur 6. C'est la même logique que le :2d de la séance 1, appliquée à des colonnes." },
          { code: `def afficher_bulletin(eleves):
    print(f"{'Nom':<12} {'Prenom':<10} {'Maths':>6} {'Info':>6}")
    print('-' * 38)
    for e in eleves:
        print(f"{e['nom']:<12} {e['prenom']:<10} {e['note_maths']:>6} {e['note_info']:>6}")` }
        ]
      },
      {
        num: '4', title: 'Tri et modification',
        code: `def trier_par_note(eleves, matiere, decroissant=True):
    # à compléter : sorted() avec une clé
    pass

def ajouter_note(eleves, nom, prenom, matiere, note):
    """Modifie la note d'un élève. Retourne True si trouvé."""
    # à compléter
    pass`,
        questions: [ "Complète trier_par_note() et ajouter_note()." ],
        correction: [
          { text: "Solution. sorted() avec key=lambda trie sur un critère calculé (la note convertie en float) ; reverse=True pour l'ordre décroissant. ajouter_note parcourt la liste, modifie la note si l'élève est trouvé et renvoie True, sinon False." },
          { code: `def trier_par_note(eleves, matiere, decroissant=True):
    return sorted(eleves, key=lambda e: float(e[matiere]), reverse=decroissant)

def ajouter_note(eleves, nom, prenom, matiere, note):
    for e in eleves:
        if e['nom'] == nom and e['prenom'] == prenom:
            e[matiere] = str(note)
            return True
    return False` }
        ]
      },
      {
        num: '5', title: 'Session de débogage',
        code: `# Bug 1
def stat_erronee(eleves, matiere):
    notes = [e[matiere] for e in eleves]   # bug ici
    return sum(notes) / len(notes)

# Bug 2
def tri_bugge(eleves, matiere):
    eleves.sort(key=lambda e: float(e[matiere]))
    return eleves`,
        questions: [
          "Bug 1 : quel est le problème et comment le corriger ?",
          "Bug 2 : quel est l'effet de bord, et quand pose-t-il problème ?"
        ],
        correction: [
          { text: "Bug 1 — les notes sont des chaînes (le CSV est du texte), or sum() ne peut pas additionner des str → TypeError. Correction : convertir en float." },
          { code: `def stat_corrigee(eleves, matiere):
    notes = [float(e[matiere]) for e in eleves]   # conversion !
    return sum(notes) / len(notes)` },
          { text: "Bug 2 — eleves.sort() trie la liste REÇUE sur place : la liste passée en argument est modifiée à l'insu de l'appelant (effet de bord). Problème si l'appelant comptait garder l'ordre d'origine. Solution : renvoyer une NOUVELLE liste avec sorted(), sans toucher l'originale (fonction pure)." },
          { code: `def tri_corrige(eleves, matiere):
    return sorted(eleves, key=lambda e: float(e[matiere]))` }
        ]
      }
    ]
  },
  // ── Python · Projets (notebook interactif à compléter) ──
  {
    id: 'pyprojets', bloc: 'bloc0', jour: 'Python — Projets', theme: 'Python — projets',
    notebook: 'Python_projets_etudiant.ipynb',
    title: 'Python · Projets NSI (à compléter)',
    type: 'tp',
    intro: "Neuf mini-projets à coder. Ouvre le notebook interactif (bouton ⚡ Ouvrir dans Basthon), complète les cellules marquées # TODO et exécute. La correction complète et commentée de chaque projet est dans l'onglet Fiches → thème « Python — projets ».",
    steps: [
      {
        num: '1', title: 'Suite de Syracuse',
        code: `def syracuse(n):
    vol = [n]
    while n != 1:
        # TODO : pair -> n//2, impair -> 3n+1
        vol.append(n)
    return vol`,
        questions: ["Compléter la règle et afficher le temps de vol et l'altitude max."],
        correction: [{ code: `n = n // 2 if n % 2 == 0 else 3 * n + 1` }]
      },
      {
        num: '2', title: 'Fibonacci (itératif)',
        code: `def fib(n):
    a, b = 0, 1
    for _ in range(n):
        # TODO
        pass
    return a`,
        questions: ["Faire avancer a et b à chaque tour."],
        correction: [{ code: `a, b = b, a + b` }]
      },
      {
        num: '3', title: 'Tri par sélection',
        code: `for j in range(i + 1, len(lst)):
    # TODO : mettre à jour idx_min
    pass`,
        questions: ["Repérer le minimum du reste de la liste."],
        correction: [{ code: `if lst[j] < lst[idx_min]:
    idx_min = j` }]
      },
      {
        num: '4', title: 'Recherche dichotomique',
        code: `while gauche <= droite:
    milieu = (gauche + droite) // 2
    if lst[milieu] == valeur:
        return milieu
    # TODO : réduire l'intervalle`,
        questions: ["Choisir la moitié gauche ou droite selon la comparaison."],
        correction: [{ code: `elif lst[milieu] < valeur:
    gauche = milieu + 1
else:
    droite = milieu - 1` }]
      },
      {
        num: '5', title: 'Dictionnaire — comptage de mots',
        code: `compte = {}
for mot in texte.split():
    # TODO : incrémenter compte[mot]
    pass`,
        questions: ["Compter chaque mot avec .get()."],
        correction: [{ code: `compte[mot] = compte.get(mot, 0) + 1` }]
      },
      {
        num: '6', title: 'Jeu de la vie de Conway',
        code: `if 0 <= x < len(grille) and 0 <= y < len(grille[0]):
    # TODO : ajouter la cellule voisine au compteur
    pass`,
        questions: ["Additionner les voisines vivantes (0 ou 1)."],
        correction: [{ code: `n += grille[x][y]` }]
      },
      {
        num: '7', title: 'Image — négatif (numpy)',
        code: `img = np.tile(np.linspace(0, 255, 100, dtype=int), (100, 1))
# TODO : calculer le négatif
negatif = img`,
        questions: ["Inverser chaque valeur de pixel."],
        correction: [{ code: `negatif = 255 - img` }]
      },
      {
        num: '8', title: 'Courbes f(x) (numpy + matplotlib)',
        code: `x = np.linspace(-10, 10, 300)
plt.plot(x, x**2, label='x carré')
# TODO : ajouter la courbe de sin(x)`,
        questions: ["Tracer une deuxième courbe avec un label."],
        correction: [{ code: `plt.plot(x, np.sin(x), label='sin(x)')` }]
      },
      {
        num: '9', title: 'Droite de régression',
        code: `xs = np.array([1, 2, 3, 4, 5])
ys = np.array([2.1, 3.9, 6.2, 7.8, 10.1])
# TODO : a, b = ...
a, b = 0, 0`,
        questions: ["Calculer la pente et l'ordonnée par moindres carrés."],
        correction: [{ code: `a, b = np.polyfit(xs, ys, 1)` }]
      }
    ]
  },
  // ── TP Bloc 3 — Analyse de patients.txt (shell) ─────────
  {
    id: 'tp-patients', bloc: 'bloc3', jour: 'Jour 5 — 26 mai 2026', theme: 'Linux — traitement de texte',
    title: 'TP — Analyser patients.txt en ligne de commande',
    type: 'tp',
    intro: "Fichier patients.txt : un patient par ligne, champs séparés par « : » → ID:prénom:nom:ville:âge:sexe:catégorie. À faire dans un terminal Linux (WSL). Cherche la réponse, puis ouvre la correction.",
    steps: [
      {
        num: '1', title: 'Découverte du fichier',
        code: `$ head patients.txt        # voir les premières lignes
$ wc -l patients.txt       # ?`,
        questions: [
          "Combien y a-t-il de patients dans le fichier ?",
          "Quels sont les 7 champs d'une ligne, dans l'ordre ?"
        ],
        correction: [
          { text: "wc -l compte les lignes, donc le nombre de patients." },
          { code: `wc -l patients.txt` },
          { text: "Champs : 1=identifiant, 2=prénom, 3=nom, 4=ville, 5=âge, 6=sexe (M/F), 7=catégorie (0 à 3)." }
        ]
      },
      {
        num: '2', title: 'grep — filtrer des lignes',
        code: `$ grep ':F:' patients.txt        # les femmes
$ grep ':Le Havre:' patients.txt # les Havrais`,
        questions: [
          "Combien y a-t-il de femmes ? (option -c de grep)",
          "Combien de patients habitent Rouen ?"
        ],
        correction: [
          { code: `grep -c ':F:' patients.txt
grep -c ':Rouen:' patients.txt` },
          { text: "-c demande à grep de COMPTER les lignes correspondantes. On entoure le motif de « : » pour viser le bon champ (sexe, ville) et pas un fragment d'un autre champ." }
        ]
      },
      {
        num: '3', title: 'cut — extraire des colonnes',
        code: `$ cut -d: -f2 patients.txt     # le prénom
$ cut -d: -f2,3 patients.txt   # prénom + nom`,
        questions: [
          "Affiche uniquement la liste des villes (colonne 4).",
          "Affiche le nom (col 3) et l'âge (col 5) de chaque patient."
        ],
        correction: [
          { code: `cut -d: -f4 patients.txt
cut -d: -f3,5 patients.txt` },
          { text: "-d: indique le séparateur « : », -f choisit le ou les champs." }
        ]
      },
      {
        num: '4', title: 'Pipes — combiner les commandes',
        code: `# La sortie de gauche devient l'entrée de droite
$ cut -d: -f4 patients.txt | sort | uniq -c`,
        questions: [
          "Combien de villes DIFFÉRENTES apparaissent dans le fichier ?",
          "Donne la répartition hommes / femmes (nombre de M et de F)."
        ],
        correction: [
          { code: `cut -d: -f4 patients.txt | sort -u | wc -l
cut -d: -f6 patients.txt | sort | uniq -c` },
          { text: "sort -u trie et garde les valeurs uniques ; wc -l les compte. uniq -c (après sort) compte les occurrences de chaque valeur." }
        ]
      },
      {
        num: '5', title: 'sort — trier par âge',
        code: `$ sort -t: -k5 -n patients.txt   # par âge croissant`,
        questions: [
          "Affiche les 5 patients les plus âgés.",
          "À quoi servent les options -t: , -k5 et -n ?"
        ],
        correction: [
          { code: `sort -t: -k5 -nr patients.txt | head -5` },
          { text: "-t: = séparateur « : » ; -k5 = trier sur la colonne 5 (âge) ; -n = tri numérique (et non alphabétique) ; -r = ordre décroissant ; head -5 = garder les 5 premières lignes." }
        ]
      },
      {
        num: '6', title: 'awk — calculs sur les colonnes',
        code: `# -F: = séparateur ; $5 = 5e colonne (âge)
$ awk -F: '{ somme += $5 } END { print somme / NR }' patients.txt`,
        questions: [
          "Calcule l'âge moyen de tous les patients.",
          "Combien de patients ont plus de 50 ans ?"
        ],
        correction: [
          { code: `awk -F: '{ s += $5 } END { print s / NR }' patients.txt
awk -F: '$5 > 50' patients.txt | wc -l` },
          { text: "awk lit chaque ligne, découpe sur « : » (-F:). $5 est l'âge. On cumule dans s ; NR est le nombre de lignes (END = après tout le fichier). Une condition seule (ex. $5 > 50) affiche les lignes qui la vérifient." }
        ]
      },
      {
        num: '7', title: 'Redirections — sauvegarder les résultats',
        code: `$ grep ':Rouen:' patients.txt  > rouen.txt    # crée / écrase
$ grep ':Paris:' patients.txt >> rouen.txt    # ajoute à la fin`,
        questions: [
          "Crée un fichier femmes.txt contenant uniquement les femmes.",
          "Quelle est la différence entre > et >> ?"
        ],
        correction: [
          { code: `grep ':F:' patients.txt > femmes.txt` },
          { text: "> redirige la sortie vers un fichier en l'ÉCRASANT (repart de zéro). >> AJOUTE à la fin sans effacer l'existant." }
        ]
      },
      {
        num: '8', title: 'Synthèse — un pipeline complet',
        code: `# Objectif : combien de prénoms DIFFÉRENTS ont les femmes de Rouen ?`,
        questions: [
          "Écris un seul pipeline qui répond à la question ci-dessus."
        ],
        correction: [
          { code: `grep ':Rouen:' patients.txt | grep ':F:' | cut -d: -f2 | sort -u | wc -l` },
          { text: "Décodage : on garde Rouen → on garde les femmes → on extrait le prénom (col 2) → sort -u enlève les doublons → wc -l compte les prénoms uniques. Attention : ce n'est PAS le nombre de femmes de Rouen (ça, c'est sans cut/sort -u)." }
        ]
      }
    ]
  },

  // ── TP en ligne — Listes & tuples (Y. Pigné, séance 1) ──
  {
    id: 'pytp-ltd1', bloc: 'bloc1', jour: 'En ligne — 23 juin 2026', theme: 'Python — listes, tuples, dictionnaires',
    basthonUrl: 'https://notebook.basthon.fr/?from=https%3A%2F%2Fgit.litislab.fr%2Fypigne%2F2026-EIL-listes-tuples-dictionnaires%2F-%2Fraw%2Fmain%2Fsession-1-listes-tuples%2Ftp.ipynb',
    title: 'Python · TP — Séquences (listes, tuples, piles/files)',
    type: 'tp',
    intro: 'TP de la séance 1 (Y. Pigné). Ouvre-le dans Basthon pour coder en ligne, ou cherche ici puis déplie la correction. Cellules « # votre code » à compléter.',
    steps: [
      {
        num: 'E1', title: 'Exercice 1 — Les participants (listes : bases)',
        code: `# votre code`,
        questions: [
          "Créez une liste villes avec 4 villes de participants (ex. Paris, Montréal…).",
          "Ajoutez une ville en fin de liste ; insérez une ville en première position.",
          "Supprimez l'une des villes par son nom.",
          "Affichez le nombre de villes, la première et la dernière."
        ],
        correction: [
          { code: `villes = ["Paris", "Montréal", "Tokyo", "Dakar"]
villes.append("Nouméa")
villes.insert(0, "Beyrouth")
villes.remove("Tokyo")
print("nombre :", len(villes))
print("première :", villes[0])
print("dernière :", villes[-1])` }
        ]
      },
      {
        num: 'E2', title: 'Exercice 2 — Le planning (slicing)',
        code: `creneaux = [9, 10, 11, 13, 14, 15, 16]
# votre code`,
        questions: [
          "Affichez les 3 premiers créneaux, puis les 2 derniers.",
          "Affichez la journée à l'envers ; puis un créneau sur deux.",
          "À l'aide de sorted, affichez les 3 derniers créneaux de la journée."
        ],
        correction: [
          { code: `print(creneaux[:3])
print(creneaux[-2:])
print(creneaux[::-1])
print(creneaux[::2])
print(sorted(creneaux)[-3:])` }
        ]
      },
      {
        num: 'E3', title: 'Exercice 3 — Durées des sessions (compréhensions)',
        code: `durees = [150, 45, 150, 30, 90, 150]
# votre code`,
        questions: [
          "Construisez (en compréhension) la liste des durées en heures (décimal).",
          "Construisez la liste des durées supérieures ou égales à 90 minutes.",
          "Bonus : à partir de villes = ['Paris', 'Dakar', 'Tokyo'], construisez en compréhension la liste de leurs initiales."
        ],
        correction: [
          { code: `heures = [d / 60 for d in durees]
print(heures)
longues = [d for d in durees if d >= 90]
print(longues)
initiales = [v[0] for v in ["Paris", "Dakar", "Tokyo"]]
print(initiales)` }
        ]
      },
      {
        num: 'E4', title: 'Exercice 4 — Une session (tuples & unpacking)',
        code: `# votre code`,
        questions: [
          "Représentez une session par un tuple (date, heure_utc, sujet) ; dépaquetez-le dans trois variables et affichez-les.",
          "Écrivez une fonction min_max(valeurs) qui renvoie le min et le max sous forme de tuple ; testez-la sur durees.",
          "Échangez deux variables a et b sans variable temporaire."
        ],
        correction: [
          { code: `session = ("2026-06-22", 14, "Listes et tuples")
date, heure_utc, sujet = session
print(date, heure_utc, sujet)

def min_max(valeurs):
    return min(valeurs), max(valeurs)

durees = [150, 45, 150, 30, 90, 150]
print(min_max(durees))

a, b = 10, 20
a, b = b, a
print(a, b)` }
        ]
      },
      {
        num: 'E5', title: 'Exercice 5 — Défi : mesurer un coût (complexité)',
        code: `import timeit
# votre code`,
        questions: [
          "Construisez une grande liste : grande = list(range(1_000_000)).",
          "Avec timeit, mesurez le temps pour tester si un élément absent (-1) est dans la liste.",
          "Recommencez avec une liste dix fois plus petite. Que constatez-vous, et pourquoi cette recherche est-elle « lente » ?"
        ],
        correction: [
          { code: `grande = list(range(1_000_000))
petite = list(range(100_000))
t_grande = timeit.timeit(lambda: -1 in grande, number=20)
t_petite = timeit.timeit(lambda: -1 in petite, number=20)
print(f"grande (1 000 000) : {t_grande:.3f} s")
print(f"petite (100 000)   : {t_petite:.3f} s")` },
          { text: "La grande liste est ~10× plus lente : la recherche x in liste parcourt les éléments un à un → coût linéaire O(n). (Le dictionnaire, en O(1), réglera ça en séance 2.)" }
        ]
      },
      {
        num: 'E6', title: "Exercice 6 — Pile & file (historique et file d'attente)",
        code: `from collections import deque
# votre code`,
        questions: [
          "Pile (annuler) : avec une list, empilez 'slide 1', 'slide 2', 'slide 3', puis revenez deux fois en arrière (dépilez) en affichant la slide quittée.",
          "File des questions Discord : avec une deque, faites entrer 'Q1', 'Q2', 'Q3', puis traitez-les dans l'ordre d'arrivée (FIFO).",
          "Pour la file, pourquoi deque plutôt qu'une list ?"
        ],
        correction: [
          { code: `# pile (LIFO) : historique du diaporama
historique = []
for slide in ["slide 1", "slide 2", "slide 3"]:
    historique.append(slide)
for _ in range(2):
    print("retour, on quitte :", historique.pop())

# file (FIFO) : questions Discord
questions = deque()
for q in ["Q1", "Q2", "Q3"]:
    questions.append(q)
while questions:
    print("on traite :", questions.popleft())` },
          { text: "deque retire en tête en O(1), alors que list.pop(0) est O(n) (il faut décaler tous les éléments)." }
        ]
      },
      {
        num: 'E7', title: 'Exercice 7 — Tableaux numpy (optionnel)',
        code: `import numpy as np
connectes = [42, 38, 51, 29, 47, 33]
# votre code`,
        questions: [
          "Convertissez la liste en tableau numpy ; affichez la moyenne, le mini et le maxi.",
          "On attend +5 connexions à chaque session : ajoutez 5 partout sans boucle.",
          "Combien de sessions ont ≥ 40 connectés ? (indice : (tableau >= 40).sum())"
        ],
        correction: [
          { code: `connectes = np.array([42, 38, 51, 29, 47, 33])
print("moyenne :", connectes.mean())
print("min/max :", connectes.min(), connectes.max())
print(connectes + 5)
print("sessions >= 40 :", (connectes >= 40).sum())` }
        ]
      }
    ]
  },

  // ── TP en ligne — Dictionnaires & ensembles (Y. Pigné, séance 2) ──
  {
    id: 'pytp-ltd2', bloc: 'bloc1', jour: 'En ligne — 23 juin 2026', theme: 'Python — listes, tuples, dictionnaires',
    basthonUrl: 'https://notebook.basthon.fr/?from=https%3A%2F%2Fgit.litislab.fr%2Fypigne%2F2026-EIL-listes-tuples-dictionnaires%2F-%2Fraw%2Fmain%2Fsession-2-dictionnaires%2Ftp.ipynb',
    title: 'Python · TP — Structures associatives (dictionnaires, ensembles)',
    type: 'tp',
    intro: 'TP de la séance 2 (Y. Pigné). Ouvre-le dans Basthon pour coder en ligne, ou cherche ici puis déplie la correction.',
    steps: [
      {
        num: 'E1', title: 'Exercice 1 — Annuaire de la formation (dictionnaire : bases)',
        code: `annuaire = {"Awa": "Dakar", "Lin": "Tokyo", "Marc": "Montréal"}
# votre code`,
        questions: [
          "Un intervenant déménage : changez la ville de 'Marc' en 'Québec'.",
          "Ajoutez une nouvelle intervenante 'Sofia' à 'Beyrouth'.",
          "Affichez la ville de 'Inconnu' sans provoquer d'erreur (défaut '?').",
          "Parcourez l'annuaire et affichez 'nom : ville' pour chaque ligne."
        ],
        correction: [
          { code: `annuaire["Marc"] = "Québec"
annuaire["Sofia"] = "Beyrouth"
print("inconnu :", annuaire.get("Inconnu", "?"))
for nom, ville in annuaire.items():
    print(f"{nom} : {ville}")` }
        ]
      },
      {
        num: 'E2', title: 'Exercice 2 — Pays des participants (Counter)',
        code: `from collections import Counter
pays = ["France", "Sénégal", "France", "Japon", "France", "Canada", "Japon", "Liban"]
# votre code`,
        questions: [
          "Avec collections.Counter, comptez les participants par pays.",
          "Affichez le pays le plus représenté et son effectif.",
          "Affichez le classement des 3 premiers pays."
        ],
        correction: [
          { code: `compte = Counter(pays)
premier, effectif = compte.most_common(1)[0]
print(f"le plus représenté : {premier} ({effectif})")
print(compte.most_common(3))` }
        ]
      },
      {
        num: 'E3', title: 'Exercice 3 — Dictionnaire en compréhension',
        code: `villes = ["Paris", "Dakar", "Tokyo", "Montréal"]
fuseaux = {"Paris": 2, "Tokyo": 9, "Dakar": 0}
# votre code`,
        questions: [
          "Construisez (en compréhension) le dict ville -> longueur du nom.",
          "Construisez le dict ville -> heure locale quand il est 12h UTC.",
          "Bonus : ne gardez que les villes dont l'heure locale est en après-midi (≥ 12)."
        ],
        correction: [
          { code: `longueurs = {ville: len(ville) for ville in villes}
print(longueurs)
locales = {ville: (12 + dec) % 24 for ville, dec in fuseaux.items()}
print(locales)
aprem = {ville: h for ville, h in locales.items() if h >= 12}
print(aprem)` }
        ]
      },
      {
        num: 'E4', title: 'Exercice 4 — Présence aux sessions (ensembles)',
        code: `session1 = {"Awa", "Lin", "Marc", "Sofia", "Ravi"}
session2 = {"Lin", "Sofia", "Ravi", "Yuki"}
connexions = ["Awa", "Lin", "Awa", "Marc", "Lin"]
# votre code`,
        questions: [
          "Qui était présent aux deux sessions ? (intersection)",
          "Qui a assisté à au moins une session ? (union) ; qui était à la 1re mais pas à la 2e ? (différence)",
          "À partir de connexions, combien de personnes distinctes se sont connectées ?"
        ],
        correction: [
          { code: `print(sorted(session1 & session2))
print(sorted(session1 | session2))
print(sorted(session1 - session2))
print(len(set(connexions)), "personnes distinctes")` }
        ]
      },
      {
        num: 'E5', title: 'Exercice 5 — Défi : agenda multi-fuseaux',
        code: `import timeit
fuseaux = {"Paris": 2, "Montréal": -4, "Tokyo": 9, "Nouméa": 11, "Dakar": 0}
# votre code`,
        questions: [
          "Une session démarre à 14h00 UTC. Écrivez heure_locale(ville, h_utc) qui renvoie l'heure locale (modulo 24).",
          "Affichez l'heure locale de début pour chaque ville (parcours du dict).",
          "Perf : comparez avec timeit le coût de 'Tokyo' in fuseaux (dict) vs la même recherche dans list(fuseaux.keys()). Que concluez-vous ?"
        ],
        correction: [
          { code: `def heure_locale(ville, h_utc):
    return (h_utc + fuseaux[ville]) % 24

for ville in fuseaux:
    print(f"{ville} : {heure_locale(ville, 14)}h")

cles_liste = list(fuseaux.keys())
t_dict = timeit.timeit(lambda: "Tokyo" in fuseaux, number=100000)
t_liste = timeit.timeit(lambda: "Tokyo" in cles_liste, number=100000)
print(f"dict  : {t_dict:.4f} s")
print(f"liste : {t_liste:.4f} s")` },
          { text: "Sur 5 éléments l'écart est minime ; il se creuse avec la taille : recherche dans un dict en O(1) (table de hachage) vs O(n) dans une liste." }
        ]
      }
    ]
  },

  // ── Fiches ÉLÈVES clé en main (Y. Pigné) — énoncé + corrigé ──
  {
    id: 'eltp-listes', bloc: 'bloc1', jour: 'Fiches élèves (clé en main)', theme: 'Python — fiches élèves (listes, tuples, dictionnaires)',
    basthonUrl: 'https://notebook.basthon.fr/?from=https%3A%2F%2Fgit.litislab.fr%2Fypigne%2F2026-EIL-listes-tuples-dictionnaires%2F-%2Fraw%2Fmain%2Feleves%2F1-listes%2Fenonce.ipynb',
    title: 'Élèves · Les listes (1ʳᵉ NSI)',
    type: 'tp',
    intro: "Fiche élève clé en main (Première NSI). Ouvre l'énoncé dans Basthon, ou déplie chaque correction.",
    steps: [
      {
        num: 'E1', title: 'Exercice 1 — Ma playlist',
        code: `# ton code`,
        questions: [
          "Crée une liste playlist avec 4 titres que tu aimes.",
          "Ajoute un titre à la fin avec .append(...) ; ajoute un titre au début avec .insert(0, ...).",
          "Supprime un titre avec .remove(...).",
          "Affiche le nombre de titres, le premier et le dernier."
        ],
        correction: [
          { code: `playlist = ["Flowers", "Espresso", "As It Was", "Levitating"]
playlist.append("Bad Guy")
playlist.insert(0, "Blinding Lights")
playlist.remove("As It Was")
print("nombre :", len(playlist))
print("premier :", playlist[0])
print("dernier :", playlist[-1])` }
        ]
      },
      {
        num: 'E2', title: 'Exercice 2 — Le tableau des scores',
        code: `scores = [42, 7, 99, 13, 77, 5, 88]
# ton code`,
        questions: [
          "Affiche les 3 premiers scores (slicing scores[:3]), puis les 2 derniers.",
          "Affiche les scores du plus grand au plus petit (sorted(..., reverse=True)).",
          "Affiche le meilleur score (max)."
        ],
        correction: [
          { code: `print(scores[:3])
print(scores[-2:])
print(sorted(scores, reverse=True))
print("meilleur :", max(scores))` }
        ]
      }
    ]
  },
  {
    id: 'eltp-comprehensions', bloc: 'bloc1', jour: 'Fiches élèves (clé en main)', theme: 'Python — fiches élèves (listes, tuples, dictionnaires)',
    basthonUrl: 'https://notebook.basthon.fr/?from=https%3A%2F%2Fgit.litislab.fr%2Fypigne%2F2026-EIL-listes-tuples-dictionnaires%2F-%2Fraw%2Fmain%2Feleves%2F2-comprehensions%2Fenonce.ipynb',
    title: 'Élèves · Les listes en compréhension (1ʳᵉ NSI)',
    type: 'tp',
    intro: "Fiche élève clé en main (Première NSI). Une liste en compréhension construit une liste en une seule ligne.",
    steps: [
      {
        num: 'E1', title: 'Exercice 1 — Durées en minutes',
        code: `durees = [183, 95, 240, 60, 312]
# ton code`,
        questions: [
          "Construis en compréhension la liste des durées en minutes (division entière // 60).",
          "Construis la liste des morceaux qui durent au moins 2 minutes (>= 120 s)."
        ],
        correction: [
          { code: `minutes = [d // 60 for d in durees]
print(minutes)
longues = [d for d in durees if d >= 120]
print(longues)` }
        ]
      },
      {
        num: 'E2', title: 'Exercice 2 — Les initiales',
        code: `titres = ["Flowers", "Espresso", "As It Was"]
# ton code`,
        questions: [
          "Construis en compréhension la liste de leurs initiales.",
          "Construis la liste des titres en majuscules (.upper())."
        ],
        correction: [
          { code: `initiales = [t[0] for t in titres]
print(initiales)
majus = [t.upper() for t in titres]
print(majus)` }
        ]
      }
    ]
  },
  {
    id: 'eltp-tuples', bloc: 'bloc1', jour: 'Fiches élèves (clé en main)', theme: 'Python — fiches élèves (listes, tuples, dictionnaires)',
    basthonUrl: 'https://notebook.basthon.fr/?from=https%3A%2F%2Fgit.litislab.fr%2Fypigne%2F2026-EIL-listes-tuples-dictionnaires%2F-%2Fraw%2Fmain%2Feleves%2F3-tuples%2Fenonce.ipynb',
    title: 'Élèves · Les tuples (1ʳᵉ NSI)',
    type: 'tp',
    intro: "Fiche élève clé en main (Première NSI). Un tuple regroupe des valeurs qui vont ensemble et ne changent pas.",
    steps: [
      {
        num: 'E1', title: 'Exercice 1 — Une chanson',
        code: `# ton code`,
        questions: [
          "Crée un tuple chanson = (titre, artiste, duree).",
          "Dépaquette-le dans 3 variables : titre, artiste, duree = chanson.",
          "Affiche une phrase : <titre> par <artiste> (<duree> s).",
          "Essaie de modifier chanson[0] = ... : que se passe-t-il ? (commente)"
        ],
        correction: [
          { code: `chanson = ("Flowers", "Miley Cyrus", 200)
titre, artiste, duree = chanson
print(f"{titre} par {artiste} ({duree} s)")
# chanson[0] = 'X'  -> TypeError : un tuple est immuable` }
        ]
      },
      {
        num: 'E2', title: 'Exercice 2 — Échanger deux scores',
        code: `a = 10
b = 20
# ton code`,
        questions: [
          "Échange les valeurs de a et b sans variable temporaire : a, b = b, a.",
          "Affiche a et b pour vérifier."
        ],
        correction: [
          { code: `a, b = b, a
print(a, b)` }
        ]
      }
    ]
  },
  {
    id: 'eltp-piles-files', bloc: 'bloc1', jour: 'Fiches élèves (clé en main)', theme: 'Python — fiches élèves (listes, tuples, dictionnaires)',
    basthonUrl: 'https://notebook.basthon.fr/?from=https%3A%2F%2Fgit.litislab.fr%2Fypigne%2F2026-EIL-listes-tuples-dictionnaires%2F-%2Fraw%2Fmain%2Feleves%2F4-piles-files%2Fenonce.ipynb',
    title: 'Élèves · Piles et files (Tale NSI)',
    type: 'tp',
    intro: "Fiche élève clé en main (Terminale NSI). Pile : on retire le dernier ajouté (Ctrl+Z). File : on retire le premier arrivé.",
    steps: [
      {
        num: 'E1', title: 'Exercice 1 — La pile « Annuler »',
        code: `pile = []
# ton code`,
        questions: [
          "Empile 3 actions : 'écrire A', 'écrire B', 'écrire C' (.append).",
          "Annule deux fois (.pop()) en affichant l'action annulée ; affiche ce qu'il reste."
        ],
        correction: [
          { code: `for action in ["écrire A", "écrire B", "écrire C"]:
    pile.append(action)
for _ in range(2):
    print("annulé :", pile.pop())
print(pile)` }
        ]
      },
      {
        num: 'E2', title: "Exercice 2 — La file d'attente d'un jeu",
        code: `from collections import deque
file = deque()
# ton code`,
        questions: [
          "Trois joueurs entrent dans la file : 'Ana', 'Beto', 'Cho' (.append).",
          "Fais-les jouer dans l'ordre d'arrivée avec .popleft() ; affiche qui joue à chaque tour."
        ],
        correction: [
          { code: `for joueur in ["Ana", "Beto", "Cho"]:
    file.append(joueur)
while file:
    print("au tour de :", file.popleft())` }
        ]
      }
    ]
  },
  {
    id: 'eltp-dictionnaires', bloc: 'bloc1', jour: 'Fiches élèves (clé en main)', theme: 'Python — fiches élèves (listes, tuples, dictionnaires)',
    basthonUrl: 'https://notebook.basthon.fr/?from=https%3A%2F%2Fgit.litislab.fr%2Fypigne%2F2026-EIL-listes-tuples-dictionnaires%2F-%2Fraw%2Fmain%2Feleves%2F5-dictionnaires%2Fenonce.ipynb',
    title: 'Élèves · Les dictionnaires (1ʳᵉ NSI)',
    type: 'tp',
    intro: "Fiche élève clé en main (Première NSI). Un dictionnaire associe une clé à une valeur (ex. objet -> quantité).",
    steps: [
      {
        num: 'E1', title: "Exercice 1 — L'inventaire du héros",
        code: `inventaire = {"potion": 3, "épée": 1, "or": 150}
# ton code`,
        questions: [
          "Le héros ramasse 2 potions : inventaire['potion'] += 2.",
          "Il gagne un 'bouclier' (quantité 1) : ajoute-le.",
          "Affiche la quantité de 'flèche' sans erreur (.get('flèche', 0)).",
          "Parcours l'inventaire et affiche objet : quantité."
        ],
        correction: [
          { code: `inventaire["potion"] += 2
inventaire["bouclier"] = 1
print("flèches :", inventaire.get("flèche", 0))
for objet, quantite in inventaire.items():
    print(f"{objet} : {quantite}")` }
        ]
      },
      {
        num: 'E2', title: 'Exercice 2 — Le sondage de la classe',
        code: `from collections import Counter
votes = ["Mario", "Zelda", "Mario", "Sonic", "Mario", "Zelda"]
# ton code`,
        questions: [
          "Avec collections.Counter, compte les votes par jeu.",
          "Affiche le gagnant et son nombre de voix."
        ],
        correction: [
          { code: `compte = Counter(votes)
gagnant, voix = compte.most_common(1)[0]
print(f"gagnant : {gagnant} ({voix} voix)")` }
        ]
      }
    ]
  },
  {
    id: 'eltp-ensembles', bloc: 'bloc1', jour: 'Fiches élèves (clé en main)', theme: 'Python — fiches élèves (listes, tuples, dictionnaires)',
    basthonUrl: 'https://notebook.basthon.fr/?from=https%3A%2F%2Fgit.litislab.fr%2Fypigne%2F2026-EIL-listes-tuples-dictionnaires%2F-%2Fraw%2Fmain%2Feleves%2F6-ensembles%2Fenonce.ipynb',
    title: 'Élèves · Les ensembles (1ʳᵉ NSI)',
    type: 'tp',
    intro: "Fiche élève clé en main (Première NSI). Un ensemble (set) ne contient pas de doublon : pratique pour comparer des groupes ou dédupliquer.",
    steps: [
      {
        num: 'E1', title: 'Exercice 1 — Deux options',
        code: `foot = {"Léa", "Tom", "Hugo", "Inès"}
theatre = {"Tom", "Inès", "Maya"}
# ton code`,
        questions: [
          "Qui fait foot ET théâtre ? (foot & theatre)",
          "Qui fait foot OU théâtre ? (foot | theatre)",
          "Qui fait foot mais pas théâtre ? (foot - theatre)"
        ],
        correction: [
          { code: `print(sorted(foot & theatre))
print(sorted(foot | theatre))
print(sorted(foot - theatre))` }
        ]
      },
      {
        num: 'E2', title: 'Exercice 2 — Combien de notes différentes ?',
        code: `notes = [12, 15, 12, 8, 15, 19, 8]
# ton code`,
        questions: [
          "Combien y a-t-il de notes différentes ? (set puis len)",
          "Affiche les notes distinctes, triées."
        ],
        correction: [
          { code: `print(len(set(notes)), "notes différentes")
print(sorted(set(notes)))` }
        ]
      }
    ]
  },

  // ── TP en ligne — Piles, files, listes chaînées (FDIU, 15 octobre) ──
  {
    id: 'pytp-pf', bloc: 'bloc4', jour: 'En ligne — 15 octobre 2026', theme: 'Python — structures de données linéaires',
    basthonUrl: 'https://notebook.basthon.fr/?from=https%3A%2F%2Febechalani.github.io%2FDuNSI%2Fressources%2Fpython%2FFDIU-Piles-Files-2026.ipynb',
    title: 'Python · TP — Piles et files (LIFO / FIFO)',
    type: 'tp',
    intro: "TP du cours en ligne du 15 octobre (FDIU — DU Normandie). Ouvre le notebook dans Basthon pour coder en ligne, ou travaille ici puis déplie les corrections. Fiche associée : « Piles et files : LIFO, FIFO et applications ».",
    steps: [
      {
        num: 'E1', title: 'Exercice 1 — Lire une pile (sur papier)',
        code: `p = creer_pile_vide()
empiler(p, 8); empiler(p, 5); empiler(p, 2); empiler(p, 4)

q = creer_pile_vide()
while not est_vide(p):
    empiler(q, depiler(p))

for u in range(8):
    if u % 2 != 0:
        empiler(p, u)`,
        questions: [
          "Quel sera le contenu des piles p et q après exécution de ces instructions ?",
          "Donne pour chacune l'ordre des éléments et la valeur au sommet."
        ],
        correction: [
          "La boucle while vide p dans q en inversant l'ordre : q contient (du fond au sommet) 4, 2, 5, 8 — sommet = 8.",
          "La boucle for empile ensuite les impairs de 0 à 7 dans p (vidée juste avant) : p contient 1, 3, 5, 7 — sommet = 7."
        ]
      },
      {
        num: 'E2', title: 'Exercice 2 — La classe Pile (avec une liste Python)',
        code: `class Pile:
    def __init__(self):
        self._pile = ...
    # à compléter : valeur(), depile(), empile(v), est_vide(), __len__()`,
        questions: [
          "Implémente la classe Pile : attribut privé _pile (une list Python).",
          "valeur() renvoie le sommet (ou None si vide) sans dépiler ; depile() retire et renvoie le sommet (ou None).",
          "empile(v) ajoute v ; est_vide() et __len__() complètent l'interface.",
          "Teste : empile 2, 4, 6 puis dépile tout — vérifie l'ordre 6, 4, 2 (LIFO)."
        ],
        correction: [
          { code: `class Pile:
    def __init__(self):
        self._pile = []

    def valeur(self):
        if self.est_vide():
            return None
        return self._pile[-1]      # le sommet, sans dépiler

    def depile(self):
        if self.est_vide():
            return None
        return self._pile.pop()    # pop() : dernier élément = sommet

    def empile(self, v):
        self._pile.append(v)

    def est_vide(self):
        return len(self._pile) == 0

    def __len__(self):
        return len(self._pile)` },
          "Le sommet est la FIN de la liste : append et pop y travaillent en O(1)."
        ]
      },
      {
        num: 'E3', title: 'Exercice 3 — Calculatrice NPI (notation polonaise inversée)',
        code: `def calcul_expression_NPI(exp):
    """exp : str du type '1 2 + 4 * 3 +' — renvoie le résultat (float)."""
    ...

r = calcul_expression_NPI('2 3 +')
print(r, r == 5)
r = calcul_expression_NPI('1 2 + 4 * 3 +')
print(r, r == 15)
r = calcul_expression_NPI('3 2 + 6 * 5 / 4 +')
print(r, r == 10)
r = calcul_expression_NPI('33 2 - 6 - 5 - 4 +')
print(r, r == 24)`,
        questions: [
          "Lis les symboles de gauche à droite (exp.split()).",
          "Un nombre : empile-le. Un opérateur : dépile b puis a, calcule a op b, empile le résultat.",
          "À la fin, la pile contient un seul élément : le résultat.",
          "Attention à l'ordre des opérandes pour - et / : le premier dépilé est l'opérande de droite."
        ],
        correction: [
          { code: `def calcul_expression_NPI(exp):
    p = Pile()
    for token in exp.split():
        if token in ('+', '-', '*', '/'):
            b = p.depile()     # opérande de droite (dépilé en premier !)
            a = p.depile()     # opérande de gauche
            if token == '+':   p.empile(a + b)
            elif token == '-': p.empile(a - b)
            elif token == '*': p.empile(a * b)
            else:              p.empile(a / b)
        else:
            p.empile(float(token))
    return p.depile()` },
          "Les quatre tests affichent True : 5.0, 15.0, 10.0 et 24.0."
        ]
      },
      {
        num: 'E4', title: 'Exercice 4 — La classe File (avec une liste Python)',
        code: `class File:
    def __init__(self):
        self._file = ...
    # à compléter : valeur(), defile(), enfile(v), est_vide(), __len__()`,
        questions: [
          "Implémente la classe File : attribut privé _file (une list Python).",
          "enfile(v) ajoute en fin ; defile() retire et renvoie le PREMIER entré (ou None) ; valeur() le consulte sans le retirer.",
          "Teste : enfile 2, 4, 6 puis défile tout — vérifie l'ordre 2, 4, 6 (FIFO).",
          "Question bonus : pourquoi cette implémentation n'est-elle pas optimale ?"
        ],
        correction: [
          { code: `class File:
    def __init__(self):
        self._file = []

    def valeur(self):
        if self.est_vide():
            return None
        return self._file[0]       # le plus ancien, sans défiler

    def defile(self):
        if self.est_vide():
            return None
        return self._file.pop(0)   # retire le premier entré

    def enfile(self, v):
        self._file.append(v)

    def est_vide(self):
        return len(self._file) == 0

    def __len__(self):
        return len(self._file)` },
          "Bonus : pop(0) décale tous les éléments restants, donc défiler coûte O(n). Pour une file efficace : collections.deque, ou une liste doublement chaînée (voir le TP Listes chaînées, exercice 6)."
        ]
      },
      {
        num: 'E5', title: 'Exercice 5 — La patate chaude (Hot Potato)',
        code: `def hot_potato(noms, k):
    """Renvoie le gagnant : à chaque tour, k passes puis élimination."""
    ...

gagnant = hot_potato(["Alice", "Bob", "Charlie", "Dave", "Eve"], 3)
print(f"Le gagnant est {gagnant}")`,
        questions: [
          "Enfile tous les joueurs dans une File.",
          "Une passe = défiler le joueur de tête et le renfiler aussitôt.",
          "Après k passes, le joueur de tête est défilé sans être renfilé : éliminé.",
          "Répète jusqu'à ce qu'il ne reste qu'un joueur : le gagnant."
        ],
        correction: [
          { code: `def hot_potato(noms, k):
    f = File()
    for nom in noms:
        f.enfile(nom)
    while len(f) > 1:
        for _ in range(k):
            f.enfile(f.defile())   # il passe la patate et rejoint la fin
        elimine = f.defile()       # pas renfilé : éliminé
        print(elimine, "est éliminé")
    return f.defile()` },
          "Avec k = 3 et les 5 joueurs de l'énoncé, sont éliminés Dave, Charlie, Eve puis Bob : le gagnant est Alice."
        ]
      },
      {
        num: 'E6', title: 'Exercice 6 — Ordonnanceur round-robin (tourniquet)',
        code: `from time import sleep

class Processus:
    def __init__(self, nom, duree, priorite=1):
        self.nom = nom
        self.duree_tache = duree      # temps en cycles CPU
        self.duree_restante = duree
        self.etat = 'prêt'

    def executer(self):
        if self.etat == 'prêt':
            self.etat = 'en exécution'
            sleep(0.1)
            self.duree_restante -= 1
            self.etat = 'prêt' if self.duree_restante > 0 else 'terminé'

ps = [Processus("P0", duree=2), Processus("P1", duree=10),
      Processus("P2", duree=3), Processus("P3", duree=8),
      Processus("P4", duree=4, priorite=2)]

def ordonnancer(processus, quantum=4):
    file_attente = ...

ordonnancer(ps, quantum=4)`,
        questions: [
          "Enfile tous les processus dans une file d'attente FIFO.",
          "Défile le processus de tête et exécute-le au plus quantum fois (arrête-toi avant s'il est terminé).",
          "S'il n'est pas terminé : il est préempté, renfile-le en fin de file. Sinon, signale sa terminaison.",
          "Continue jusqu'à ce que la file soit vide, en renvoyant la liste des décisions."
        ],
        correction: [
          { code: `def ordonnancer(processus, quantum=4):
    file_attente = File()
    for p in processus:
        file_attente.enfile(p)
    decisions = []
    while not file_attente.est_vide():
        p = file_attente.defile()
        for _ in range(quantum):
            p.executer()
            if p.etat == 'terminé':
                break
        if p.etat == 'terminé':
            decisions.append(p.nom + ' : terminé')
            print(p.nom, ': terminé')
        else:
            decisions.append(p.nom + ' : préempté, reste ' + str(p.duree_restante))
            print(p.nom, ': préempté, reste', p.duree_restante, 'cycles')
            file_attente.enfile(p)   # retour en fin de file
    return decisions` },
          "C'est exactement la politique du tourniquet vue dans la fiche « Les processus » (Bloc 3) : personne ne monopolise le CPU.",
          "Bonus (deux niveaux de priorité) : utilise deux files, une prioritaire et une normale ; l'ordonnanceur défile toujours la file prioritaire tant qu'elle n'est pas vide."
        ]
      }
    ]
  },
  {
    id: 'pytp-lc', bloc: 'bloc4', jour: 'En ligne — 15 octobre 2026', theme: 'Python — structures de données linéaires',
    basthonUrl: 'https://notebook.basthon.fr/?from=https%3A%2F%2Febechalani.github.io%2FDuNSI%2Fressources%2Fpython%2FFDIU-Listes-chainees.ipynb',
    title: 'Python · TP — Listes chaînées',
    type: 'tp',
    intro: "TP du cours en ligne du 15 octobre (FDIU — DU Normandie). Cellules et pointeurs, liste chaînée complète, pile chaînée, file doublement chaînée, récursif. Fiche associée : « Les listes chaînées ». Convention pédagogique : pas de liste vide.",
    steps: [
      {
        num: 'E1', title: 'Exercice 1 — Tester la classe Cellule (fournie)',
        code: `class Cellule:
    _compt = 0        # compteur de classe, pour numéroter les cellules (debug)

    def __init__(self, value, next_cell=None):
        Cellule._compt += 1
        self._id_cell = Cellule._compt
        self.value = value
        self.next_cell = next_cell

    def set_value(self, value):
        self.value = value

    def set_suivant(self, cell):
        self.next_cell = cell

    def _get_id(self):
        return 'C' + str(self._id_cell)

    def __repr__(self):
        suiv = self.next_cell._get_id() if self.next_cell is not None else 'None'
        return self._get_id() + ' : (' + str(self.value) + ', ' + suiv + ')'`,
        questions: [
          "Crée deux cellules a = Cellule(12) et b = Cellule(20), affiche-les.",
          "Chaîne a vers b avec set_suivant, puis affiche a, a.value et a.next_cell.",
          "Modifie la valeur de b avec set_value et vérifie."
        ],
        correction: [
          { code: `a = Cellule(12)
b = Cellule(20)
print(a)             # C1 : (12, None)
print(b)             # C2 : (20, None)
a.set_suivant(b)
print(a)             # C1 : (12, C2)
print(a.value)       # 12
print(a.next_cell)   # C2 : (20, None)
b.set_value(25)
print(a.next_cell)   # C2 : (25, None)` },
          "Une cellule = une valeur + un pointeur vers la suivante. Chaîner, c'est simplement faire pointer next_cell vers une autre instance."
        ]
      },
      {
        num: 'E2', title: 'Exercice 2 — Classe Liste : le début de la liste',
        code: `class Liste:
    def __init__(self, value):
        ...
    def ajoute_d(self, value):
        ...
    def retire_d(self):
        ...
    def __len__(self):
        ...`,
        questions: [
          "__init__(value) : crée cell_debut (une Cellule) et taille = 1.",
          "ajoute_d(value) : nouvelle cellule en tête, qui pointe vers l'ancienne première — coût O(1).",
          "retire_d() : retire et renvoie la première valeur (interdit si la liste n'a qu'un élément).",
          "__len__() : renvoie l'attribut taille — coût O(1).",
          "Teste la séquence de l'énoncé : Liste(22), ajoute_d(18), ajoute_d(12), ajoute_d(9), retire_d()."
        ],
        correction: [
          { code: `class Liste:
    def __init__(self, value):
        self.cell_debut = Cellule(value)
        self.taille = 1

    def ajoute_d(self, value):                 # O(1)
        self.cell_debut = Cellule(value, self.cell_debut)
        self.taille += 1

    def retire_d(self):                        # O(1)
        if self.taille == 1:
            raise ValueError('La liste ne peut pas être vide')
        c = self.cell_debut
        self.cell_debut = c.next_cell
        self.taille -= 1
        return c.value

    def __len__(self):                         # O(1)
        return self.taille` },
          "Grâce à l'attribut taille tenu à jour, len() ne parcourt pas la liste : coût constant."
        ]
      },
      {
        num: 'E3', title: 'Exercice 3 — Classe Liste : la fin de la liste',
        questions: [
          "dernier() : renvoie la dernière cellule (sans rien supprimer) — il faut parcourir : O(n).",
          "ajoute_f(value) : ajoute en queue (utilise dernier()).",
          "retire_f() : retire et renvoie la dernière valeur (comme pop) — il faut s'arrêter sur l'avant-dernière cellule.",
          "copie() : renvoie une copie indépendante (nouvelles cellules).",
          "concatener(lst) : ajoute une copie des valeurs de lst à la fin (les deux listes restent indépendantes)."
        ],
        correction: [
          { code: `    def dernier(self):                         # O(n)
        c = self.cell_debut
        while c.next_cell is not None:
            c = c.next_cell
        return c

    def ajoute_f(self, value):                 # O(n)
        self.dernier().set_suivant(Cellule(value))
        self.taille += 1

    def retire_f(self):                        # O(n)
        if self.taille == 1:
            raise ValueError('La liste ne peut pas être vide')
        c = self.cell_debut
        while c.next_cell.next_cell is not None:
            c = c.next_cell                    # c = avant-dernière cellule
        v = c.next_cell.value
        c.set_suivant(None)
        self.taille -= 1
        return v

    def copie(self):
        new = Liste(self.cell_debut.value)
        c = self.cell_debut.next_cell
        while c is not None:
            new.ajoute_f(c.value)
            c = c.next_cell
        return new

    def concatener(self, lst):
        c = lst.cell_debut
        while c is not None:
            self.ajoute_f(c.value)             # copie : nouvelles cellules
            c = c.next_cell` },
          "Pour retirer la dernière cellule, il faut détenir l'AVANT-dernière (afin de couper son pointeur) : d'où le double next_cell dans la condition du while."
        ]
      },
      {
        num: 'E4', title: 'Exercice 4 — Classe Liste : le milieu de la liste',
        code: `l1 = Liste(10)
l1.ajoute_f(20)
l1.ajoute_f(30)
l1.ajoute_f(40)
l1.inserer(1, 15)     # (10, 15, 20, 30, 40)
print(l1.get(1))      # 15
l2 = l1.couper(2)     # l1 = (10, 15) ; l2 = (20, 30, 40)`,
        questions: [
          "get(i) : renvoie la valeur d'indice i (IndexError si i est hors limites) — parcours en O(n).",
          "inserer(i, value) : insère à l'indice i en décalant la suite (i = 0 : réutilise ajoute_d).",
          "couper(j) : coupe juste avant l'indice j et renvoie une nouvelle Liste avec la suite (interdit si l'un des morceaux serait vide).",
          "Teste couper avec j = 1, 2, 3 — et vérifie que 0 et 4 lèvent bien une exception."
        ],
        correction: [
          { code: `    def get(self, i):                          # O(n)
        if i < 0 or i >= self.taille:
            raise IndexError('Indice hors limites')
        c = self.cell_debut
        for _ in range(i):
            c = c.next_cell
        return c.value

    def inserer(self, i, value):
        if i < 0 or i > self.taille:
            raise IndexError('Indice hors limites')
        if i == 0:
            self.ajoute_d(value)
            return
        c = self.cell_debut
        for _ in range(i - 1):                 # c = cellule d'indice i-1
            c = c.next_cell
        c.set_suivant(Cellule(value, c.next_cell))
        self.taille += 1

    def couper(self, j):
        if j == 0 or j > self.taille - 1:
            raise ValueError('La liste ne peut pas être vide')
        prec = self.cell_debut
        for _ in range(j - 1):                 # prec = cellule d'indice j-1
            prec = prec.next_cell
        suite = prec.next_cell
        prec.set_suivant(None)                 # on coupe la chaîne
        new = Liste(None)                      # liste provisoire d'une cellule
        new.cell_debut = suite                 # remplacée par la vraie suite
        new.taille = self.taille - j
        self.taille = j
        return new` },
          "L'insertion ne décale aucune donnée en mémoire : on ne fait que rebrancher deux pointeurs (c'est la force des listes chaînées).",
          "couper réutilise les cellules existantes : la nouvelle liste commence à la cellule d'indice j, aucune valeur n'est copiée."
        ]
      },
      {
        num: 'E5', title: 'Exercice 5 — Une Pile avec des cellules chaînées',
        code: `class Pile:
    def __init__(self):
        self._cell_dessus_pile = ...
        self._taille = ...
    # à compléter : valeur(), depile(), empile(v), est_vide(), __len__()
    # valeur() et depile() lèvent une exception si la pile est vide`,
        questions: [
          "Le sommet de la pile est la TÊTE de la chaîne : empiler = ajouter en tête, dépiler = retirer la tête.",
          "Quel avantage par rapport à la version « liste Python » de l'autre TP ?"
        ],
        correction: [
          { code: `class Pile:
    def __init__(self):
        self._cell_dessus_pile = None          # None = pile vide
        self._taille = 0

    def valeur(self):
        if self.est_vide():
            raise ValueError('La pile est vide.')
        return self._cell_dessus_pile.value

    def depile(self):
        if self.est_vide():
            raise ValueError('La pile est vide.')
        v = self._cell_dessus_pile.value
        self._cell_dessus_pile = self._cell_dessus_pile.next_cell
        self._taille -= 1
        return v

    def empile(self, v):
        self._cell_dessus_pile = Cellule(v, self._cell_dessus_pile)
        self._taille += 1

    def est_vide(self):
        return self._cell_dessus_pile is None

    def __len__(self):
        return self._taille` },
          "Avantage : empiler et dépiler sont en O(1) GARANTI (aucun redimensionnement de tableau, contrairement au append des list qui n'est O(1) qu'en moyenne)."
        ]
      },
      {
        num: 'E6', title: 'Exercice 6 — Une File avec une liste doublement chaînée',
        code: `class CelluleDoubleChainage:
    def __init__(self, value):
        self.value = value
        self.cell_avant = None     # vers la cellule précédente
        self.cell_apres = None     # vers la cellule suivante

    def set_suivant(self, cell):
        self.cell_apres = cell

    def set_precedent(self, cell):
        self.cell_avant = cell

class File:
    def __init__(self):
        self.cell_entree = ...
        self.cell_sortie = ...
        self.taille = ...
    # à compléter : valeur(), defile(), enfile(v), est_vide(), __len__()`,
        questions: [
          "La file garde un pointeur vers l'ENTRÉE (dernier arrivé) et la SORTIE (prochain servi).",
          "enfile(v) : la nouvelle cellule devient l'entrée (chaînée à l'ancienne entrée dans les deux sens).",
          "defile() : retire la cellule de sortie ; la précédente devient la nouvelle sortie (attention au cas où la file se vide).",
          "Pourquoi obtient-on enfin une file où enfiler ET défiler coûtent O(1) ?"
        ],
        correction: [
          { code: `class File:
    def __init__(self):
        self.cell_entree = None
        self.cell_sortie = None
        self.taille = 0

    def valeur(self):
        if self.est_vide():
            raise ValueError('La file est vide.')
        return self.cell_sortie.value

    def defile(self):                          # O(1)
        if self.est_vide():
            raise ValueError('La file est vide.')
        v = self.cell_sortie.value
        self.cell_sortie = self.cell_sortie.cell_avant
        if self.cell_sortie is None:           # la file est devenue vide
            self.cell_entree = None
        else:
            self.cell_sortie.set_suivant(None)
        self.taille -= 1
        return v

    def enfile(self, v):                       # O(1)
        c = CelluleDoubleChainage(v)
        if self.est_vide():
            self.cell_entree = c
            self.cell_sortie = c
        else:
            c.set_suivant(self.cell_entree)    # chaînage dans les deux sens
            self.cell_entree.set_precedent(c)
            self.cell_entree = c
        self.taille += 1

    def est_vide(self):
        return self.taille == 0

    def __len__(self):
        return self.taille` },
          "Grâce aux deux pointeurs d'extrémité, on touche directement l'entrée et la sortie : aucun parcours, aucun décalage — O(1) aux deux bouts (ce que ni la list Python ni la liste simplement chaînée n'offraient)."
        ]
      },
      {
        num: 'E7', title: 'Exercice 7 — Traitement récursif (head / tail, comme en LISP)',
        code: `# La classe ListeChainee (fournie complète dans le notebook) offre :
#   lst.head()  -> la première valeur
#   lst.tail()  -> le reste de la liste (None au bout)
#   l1 + l2     -> concaténation (nouvelle liste)
#   itérable : for v in lst

l1 = ListeChainee(12, 13, 14, 15, 16)`,
        questions: [
          "double(lst) : renvoie une nouvelle liste dont les éléments sont les doubles de ceux de lst.",
          "applique(fct, lst) : renvoie une nouvelle liste des images fct(v) (c'est le map des langages fonctionnels).",
          "somme(lst) : renvoie la somme des éléments.",
          "Chaque fonction est RÉCURSIVE : cas de base = tail() is None, sinon on traite head() et on relance sur tail()."
        ],
        correction: [
          { code: `def double(lst):
    if lst.tail() is None:                     # cas de base : dernière cellule
        return ListeChainee(lst.head() * 2)
    return ListeChainee(lst.head() * 2) + double(lst.tail())

def applique(fct, lst):
    if lst.tail() is None:
        return ListeChainee(fct(lst.head()))
    return ListeChainee(fct(lst.head())) + applique(fct, lst.tail())

def somme(lst):
    if lst.tail() is None:
        return lst.head()
    return lst.head() + somme(lst.tail())

l1 = ListeChainee(12, 13, 14, 15, 16)
print(double(l1))                     # 〘24, 26, 28, 30, 32〙
print(applique(lambda x: x + 1, l1))  # 〘13, 14, 15, 16, 17〙
print(somme(l1))                      # 70` },
          "Remarque : double(lst) n'est qu'un cas particulier d'applique : applique(lambda x: x * 2, lst)."
        ]
      }
    ]
  }
]

// ── Rendu TP ─────────────────────────────────────────────
let tpGroupMode = 'jour'   // 'jour' | 'theme'

function renderTPs() {
  // Toujours revenir au menu en entrant dans la vue
  showTPIndex()
  renderTPIndex()

  // Branchements (une seule fois)
  const indexList = document.getElementById('tp-index-list')
  if (indexList && !indexList.dataset.bound) {
    indexList.addEventListener('click', e => {
      const card = e.target.closest('[data-open-tp]')
      if (card) showTPDetail(card.dataset.openTp)
    })
    indexList.dataset.bound = '1'
  }
  const toggle = document.querySelector('#view-tp .tp-group-toggle')
  if (toggle && !toggle.dataset.bound) {
    toggle.querySelectorAll('.tp-group-btn').forEach(b => {
      b.addEventListener('click', () => {
        tpGroupMode = b.dataset.group
        toggle.querySelectorAll('.tp-group-btn').forEach(x =>
          x.classList.toggle('active', x.dataset.group === tpGroupMode))
        renderTPIndex()
      })
    })
    toggle.dataset.bound = '1'
  }
  const detailEl = document.getElementById('tp-detail')
  if (detailEl && !detailEl.dataset.bound) {
    document.getElementById('tp-detail-back').addEventListener('click', showTPIndex)
    // Délégation du bouton d'impression dans le TP ouvert
    document.getElementById('tp-detail-content').addEventListener('click', e => {
      const btn = e.target.closest('[data-print-tp]')
      if (btn) openPrintPreview(btn.dataset.printTp)
    })
    detailEl.dataset.bound = '1'
  }
}

// Menu : liste des TP groupés par jour ou par thème
function renderTPIndex() {
  const listEl = document.getElementById('tp-index-list')
  if (!listEl) return
  const keyFn = tpGroupMode === 'theme'
    ? (t => t.theme || 'Autres')
    : (t => t.jour || '—')
  const groups = new Map()
  // Les projets ont leur propre onglet → exclus du menu TP
  TPS.filter(t => t.id !== 'pyprojets').forEach(t => {
    const k = keyFn(t)
    if (!groups.has(k)) groups.set(k, [])
    groups.get(k).push(t)
  })
  let html = ''
  for (const [label, items] of groups) {
    html += `<div class="tp-index-group">
      <div class="tp-index-group-label">${escapeHtml(label)}</div>
      <div class="tp-index-cards">` +
      items.map(t => {
        const isMemo = t.type === 'memo'
        const badge  = isMemo ? 'Mémo' : 'TP'
        const color  = isMemo ? '#0ea5e9' : '#10b981'
        const sub    = tpGroupMode === 'theme' ? (t.jour || '') : (t.theme || '')
        return `<button class="tp-index-card" data-open-tp="${t.id}">
          <span class="tp-type-badge" style="background:${color}">${badge}</span>
          <span class="tp-index-card-title">${escapeHtml(t.title)}</span>
          ${sub ? `<span class="tp-index-card-sub">${escapeHtml(sub)}</span>` : ''}
          <span class="tp-index-card-arrow">›</span>
        </button>`
      }).join('') +
      `</div></div>`
  }
  listEl.innerHTML = html
}

function showTPIndex() {
  document.getElementById('tp-detail').classList.add('hidden')
  document.getElementById('tp-index').classList.remove('hidden')
  window.scrollTo(0, 0)
}

function showTPDetail(id) {
  const tp = TPS.find(t => t.id === id)
  if (!tp) return
  document.getElementById('tp-detail-content').innerHTML = renderTPCard(tp)
  document.getElementById('tp-index').classList.add('hidden')
  document.getElementById('tp-detail').classList.remove('hidden')
  window.scrollTo(0, 0)
}

// Rendu d'une étape de TP. mode : 'screen' | 'enonce' | 'corrige'
function tpStepHtml(step, mode) {
  const introHtml  = step.intro ? `<p class="tp-step-intro">${escapeHtml(step.intro)}</p>` : ''
  const noteHtml   = step.note  ? `<div class="tp-note">${escapeHtml(step.note)}</div>` : ''
  const questHtml  = step.questions ? step.questions.map(q =>
    `<p class="tp-question"><em>${escapeHtml(q)}</em></p>`).join('') : ''
  let corrHtml = ''
  if (step.correction && step.correction.length) {
    const items = step.correction.map(c => {
      if (typeof c === 'string') return `<p class="tp-correction-item">${escapeHtml(c)}</p>`
      // objet { text?, code? }
      let h = ''
      if (c.text) h += `<p class="tp-correction-item">${escapeHtml(c.text)}</p>`
      if (c.code) h += `<pre class="doc-code tp-correction-code">${escapeHtml(c.code)}</pre>`
      return h
    }).join('')
    if (mode === 'screen') {
      corrHtml = `<details class="tp-correction"><summary>✅ Afficher la correction</summary><div class="tp-correction-body">${items}</div></details>`
    } else if (mode === 'corrige') {
      corrHtml = `<div class="tp-correction-open"><div class="tp-correction-title">✅ Correction</div>${items}</div>`
    }
  }
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
      ${corrHtml}
    </div>`
}

function tpSetupHtml(tp) {
  return tp.setup ? `
    <div class="tp-setup">
      <p class="tp-intro">${escapeHtml(tp.intro || '')}</p>
      <pre class="doc-code">${escapeHtml(tp.setup)}</pre>
      ${tp.setupCreate ? `<p class="tp-intro" style="margin-top:8px">Si le fichier est absent, recréez-le :</p><pre class="doc-code">${escapeHtml(tp.setupCreate)}</pre>` : ''}
    </div>` : (tp.intro ? `<p class="tp-intro">${escapeHtml(tp.intro)}</p>` : '')
}

function tpMemoTable(tp) {
  const rows = tp.table.map(r => `
      <tr>
        <td class="tp-cmd-cell"><code>${escapeHtml(r.cmd)}</code></td>
        <td class="tp-synt-cell"><code>${escapeHtml(r.synt)}</code></td>
        <td class="tp-desc-cell">${escapeHtml(r.desc)}</td>
      </tr>`).join('')
  return `
      <div class="tp-table-wrap">
        <table class="tp-cmd-table">
          <thead><tr><th>Commande</th><th>Syntaxe</th><th>Description</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>`
}

function renderTPCard(tp) {
  const typeLabel = tp.type === 'memo' ? 'Mémo' : 'TP'
  const typeColor = tp.type === 'memo' ? '#0ea5e9' : '#10b981'
  let basthonBtn = '', downloadBtn = ''
  // Notebook hébergé en ligne (ex. dépôt GitLab) : lien Basthon direct
  if (tp.basthonUrl) {
    basthonBtn = `<a class="tp-print-btn tp-basthon-btn" href="${tp.basthonUrl}" target="_blank" rel="noopener" title="Exécuter le notebook dans le navigateur (Python en ligne)">⚡ Ouvrir dans Basthon</a>`
  }
  const origName = tp.notebook || tp.original
  if (origName) {
    const res = allRessources.find(r => r.file_name === origName)
    if (res) {
      if (tp.notebook) {
        // Fichiers dont le notebook a besoin (modules .py importés, images…) : Basthon les charge
        // dans son système de fichiers via les paramètres module= et aux= de l'URL.
        const extras = (tp.aux || []).map(p => {
          const abs = encodeURIComponent(new URL(p, window.location.href).href)
          return (p.endsWith('.py') ? '&module=' : '&aux=') + abs
        }).join('')
        basthonBtn = `<a class="tp-print-btn tp-basthon-btn" href="https://notebook.basthon.fr/?from=${encodeURIComponent(ressourceAbsUrl(res))}${extras}" target="_blank" rel="noopener" title="Exécuter le notebook dans le navigateur (Python en ligne)">⚡ Ouvrir dans Basthon</a>`
      }
      downloadBtn = `<a class="tp-print-btn tp-download-btn" href="${ressourceUrl(res)}" download="${escapeHtml(origName)}" title="Télécharger le document original">⬇ TP original</a>`
    }
  }
  const printBtns = `${downloadBtn}${basthonBtn}<button class="tp-print-btn" data-print-tp="${tp.id}">🖨 Imprimer / PDF</button>`

  if (tp.type === 'memo') {
    return `
    <div class="tp-card" data-tp-id="${tp.id}">
      <div class="tp-card-header">
        <span class="tp-type-badge" style="background:${typeColor}">${typeLabel}</span>
        <span class="tp-jour">${escapeHtml(tp.jour)}</span>
        <span class="tp-print-group">${printBtns}</span>
      </div>
      <h3 class="tp-card-title">${escapeHtml(tp.title)}</h3>
      <p class="tp-intro">${escapeHtml(tp.intro)}</p>
      ${tpMemoTable(tp)}
    </div>`
  }

  const stepsHtml = tp.steps.map(step => tpStepHtml(step, 'screen')).join('')
  return `
  <div class="tp-card" data-tp-id="${tp.id}">
    <div class="tp-card-header">
      <span class="tp-type-badge" style="background:${typeColor}">${typeLabel}</span>
      <span class="tp-jour">${escapeHtml(tp.jour)}</span>
      <span class="tp-print-group">${printBtns}</span>
    </div>
    <h3 class="tp-card-title">${escapeHtml(tp.title)}</h3>
    ${tpSetupHtml(tp)}
    ${stepsHtml}
  </div>`
}

// ── Aperçu d'impression avec bascule Énoncé / Corrigé ────
let printState = { tpId: null, mode: 'enonce' }

function tpPrintBody(tp, mode) {
  if (tp.type === 'memo') {
    return `<p class="tp-intro">${escapeHtml(tp.intro)}</p>${tpMemoTable(tp)}`
  }
  const steps = tp.steps.map(s => tpStepHtml(s, mode === 'corrige' ? 'corrige' : 'enonce')).join('')
  return tpSetupHtml(tp) + steps
}

function renderPrintDoc() {
  const tp = TPS.find(t => t.id === printState.tpId)
  if (!tp) return
  const container = document.getElementById('print-doc-container')
  if (!container) return
  const label = printState.mode === 'corrige' ? ' — Corrigé' : ''
  container.innerHTML = `
    <div class="print-doc">
      <div class="print-head">DIU NSI — Le Havre · ${escapeHtml(tp.jour)}</div>
      <h1 class="print-title">${escapeHtml(tp.title)}${label}</h1>
      ${tpPrintBody(tp, printState.mode)}
    </div>`
  document.querySelectorAll('#tp-print-overlay .print-toggle-btn').forEach(b =>
    b.classList.toggle('active', b.dataset.pmode === printState.mode))
}

function openPrintPreview(tpId) {
  const tp = TPS.find(t => t.id === tpId)
  if (!tp) return
  printState = { tpId, mode: 'enonce' }
  const overlay = document.getElementById('tp-print-overlay')
  if (!overlay) return
  const hasCorrection = tp.type !== 'memo' && tp.steps.some(s => s.correction && s.correction.length)
  overlay.querySelector('.print-toggle').style.display = hasCorrection ? 'inline-flex' : 'none'
  renderPrintDoc()
  overlay.classList.remove('hidden')
  document.body.classList.add('print-preview-open')
  overlay.scrollTop = 0
}

function closePrintPreview() {
  const overlay = document.getElementById('tp-print-overlay')
  if (overlay) overlay.classList.add('hidden')
  document.body.classList.remove('print-preview-open')
}

// Branchement des contrôles de l'aperçu (une seule fois)
;(function bindPrintOverlay() {
  const overlay = document.getElementById('tp-print-overlay')
  if (!overlay) return
  overlay.querySelectorAll('.print-toggle-btn').forEach(b =>
    b.addEventListener('click', () => { printState.mode = b.dataset.pmode; renderPrintDoc() }))
  const doBtn = document.getElementById('print-do')
  const closeBtn = document.getElementById('print-close')
  if (doBtn) doBtn.addEventListener('click', () => window.print())
  if (closeBtn) closeBtn.addEventListener('click', closePrintPreview)
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !overlay.classList.contains('hidden')) closePrintPreview()
  })
})()

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
  renderAgendaBanner()
  const totalTopics   = PROGRAMME.reduce((n, b) => n + b.topics.length, 0)
  const mastered      = Object.values(topicStatuses).filter(s => s === 'mastered').length
  const inProgress    = Object.values(topicStatuses).filter(s => s === 'in_progress').length

  // Prochaines deadlines
  const daysRendu   = daysUntil('2026-07-01')   // rendu de la formation en ligne (Mermet)
  const daysRapport = daysUntil('2026-11-30')
  const daysPresent = daysUntil('2026-12-17')

  // La carte « rendu formation » n'apparaît que tant que l'échéance est à venir
  const renduCard = daysRendu >= 0 ? `
    <div class="stat-card deadline-card ${daysRendu < 14 ? 'urgent' : ''}">
      <div class="deadline-label">📚 Rendu formation</div>
      <div class="deadline-date">1ᵉʳ juil. 2026</div>
      <div class="deadline-days">J-${daysRendu}</div>
    </div>` : ''

  document.getElementById('dash-stats').innerHTML = `
    <div class="stat-card"><div class="stat-value">${mastered}</div><div class="stat-label">Thèmes maîtrisés / ${totalTopics}</div></div>
    <div class="stat-card"><div class="stat-value">${allFiches.length}</div><div class="stat-label">Fiches de cours</div></div>
    <div class="stat-card"><div class="stat-value">${allEntries.length}</div><div class="stat-label">Entrées journal</div></div>
    ${renduCard}
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
  '2026-05-26': 'Jour 5 — 26 mai',
  '2026-05-27': 'Jour 6 — 27 mai',
  '2026-05-28': 'Jour 7 — 28 mai',
}
function jourLabel(isoTs) {
  if (!isoTs) return ''
  const d = isoTs.slice(0, 10)
  return JOUR_LABELS[d] || d
}

function renderFiches() {
  // ── Sélecteur Par bloc / Par thème (branché une fois) ──
  const toggle = document.getElementById('fiche-group-toggle')
  if (toggle && !toggle.dataset.bound) {
    toggle.querySelectorAll('.tp-group-btn').forEach(b => {
      b.addEventListener('click', () => {
        ficheGroupMode = b.dataset.fgroup
        toggle.querySelectorAll('.tp-group-btn').forEach(x =>
          x.classList.toggle('active', x.dataset.fgroup === ficheGroupMode))
        renderFiches()
      })
    })
    toggle.dataset.bound = '1'
  }

  // ── Onglets blocs (masqués en mode thème) ─────────────
  const tabs = document.getElementById('fiche-tabs')
  if (ficheGroupMode === 'theme') {
    tabs.innerHTML = ''
    tabs.classList.add('hidden')
  } else {
    tabs.classList.remove('hidden')
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
  }

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

  // Les projets ont leur propre onglet → on les exclut des Fiches
  const fichesCours = allFiches.filter(f => !estProjet(f))

  // ── Mode THÈME : catégorie macro (Python, Linux…) → sous-thèmes dedans
  if (ficheGroupMode === 'theme') {
    empty.classList.toggle('hidden', fichesCours.length > 0)
    if (!fichesCours.length) { list.innerHTML = ''; return }
    const cats = new Map()
    fichesCours.forEach(f => {
      const c = ficheCategorie(f.topic)
      if (!cats.has(c)) cats.set(c, [])
      cats.get(c).push(f)
    })
    const order = ['Python', 'Bases de données', 'Algorithmique & apprentissage', 'Linux & Shell', 'Programmation — notions de base', 'Paradigmes de programmation', 'Concepts généraux']
    const ordered = [...cats.keys()].sort((a, b) => {
      const ia = order.indexOf(a), ib = order.indexOf(b)
      return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib)
    })
    list.innerHTML = ordered.map(cat => `
      <div class="fiche-cat-section">
        <div class="fiche-cat-divider"><span class="fiche-cat-label">${escapeHtml(cat)}</span></div>
        ${renderFichesByTheme(cats.get(cat), true, true)}
      </div>`).join('')
    return
  }

  // ── Mode BLOC (trié par date de création croissante) ──
  const byDate = (a, b) => (a.created_at || '').localeCompare(b.created_at || '')
  const filtered = (ficheFilter === 'all'
    ? fichesCours
    : fichesCours.filter(f => f.bloc === ficheFilter)).slice().sort(byDate)

  empty.classList.toggle('hidden', filtered.length > 0)
  if (!filtered.length) { list.innerHTML = ''; return }

  if (ficheFilter === 'all') {
    // Groupe par bloc (ordre du programme) puis par thème, dates croissantes
    const byBloc = {}
    filtered.forEach(f => {
      const k = f.bloc || 'autre'
      ;(byBloc[k] = byBloc[k] || []).push(f)
    })
    const blocOrder = PROGRAMME.map(b => b.id)
    const entries = Object.entries(byBloc).sort(
      (a, b) => (blocOrder.indexOf(a[0]) + 1 || 99) - (blocOrder.indexOf(b[0]) + 1 || 99))
    list.innerHTML = entries.map(([bId, fiches]) => {
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

// Catégorie macro d'un thème (pour le regroupement "Par thème")
function ficheCategorie(topic) {
  const t = (topic || '').toLowerCase()
  if (t.startsWith('python')) return 'Python'
  if (/(bases de données|sql|sgbd|relationnel)/.test(t)) return 'Bases de données'
  if (/(apprentissage|k-nn|knn|voisins|algorithmique|glouton|optimisation)/.test(t)) return 'Algorithmique & apprentissage'
  if (/(linux|shell|bash|unix|exploitation)/.test(t)) return 'Linux & Shell'
  if (/(paradigme|fonctionnel|impératif|imperatif)/.test(t)) return 'Paradigmes de programmation'
  if (/(compilation|interpr|fondements)/.test(t)) return 'Concepts généraux'
  return 'Programmation — notions de base'
}

function renderFichesByTheme(fiches, showJourPerCard, showBloc) {
  // Trier par date de création croissante avant de grouper par thème
  const byDate = (a, b) => (a.created_at || '').localeCompare(b.created_at || '')
  const sorted = fiches.slice().sort(byDate)
  const groups = new Map()
  sorted.forEach(f => {
    const key = f.topic || '(Sans thème)'
    if (!groups.has(key)) groups.set(key, [])
    groups.get(key).push(f)
  })

  return [...groups.entries()].map(([topic, group]) => {
    // Jour du premier élément du groupe (le plus ancien)
    const jour = jourLabel(group[0].created_at)
    const cards = group.map(f => {
      const j = showJourPerCard ? '' :
        `<span class="fiche-card-jour">${jourLabel(f.created_at)}</span>`
      const b = showBloc ? blocBadge(f.bloc) : ''
      return `
        <div class="fiche-card" data-id="${f.id}">
          ${j}${b}
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
  if (fiche) { lastFicheView = 'fiches'; showFicheRead(fiche) }
})

function escapeHtml(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;')
}

// ── Fichiers des ressources : servis depuis le dépôt ─────
// Les fichiers uploadés avant le cutoff ont été copiés dans ressources/uploads/
// (zéro egress Supabase) ; les uploads plus récents restent servis par le bucket.
const RESSOURCES_LOCAL_CUTOFF = '2026-06-27'
function ressourceUrl(r) {
  // file_path déjà relatif au dépôt (ressources/…) : servi tel quel, quelle que soit la date
  if ((r.file_path || '').startsWith('ressources/')) return r.file_path
  if ((r.created_at || '') < RESSOURCES_LOCAL_CUTOFF) return 'ressources/uploads/' + r.file_path
  return db.storage.from('ressources').getPublicUrl(r.file_path).data.publicUrl
}
// URL absolue (nécessaire pour Basthon, service externe qui vient chercher le fichier)
function ressourceAbsUrl(r) { return new URL(ressourceUrl(r), window.location.href).href }

// ── Onglet Projets ───────────────────────────────────────
function renderProjets() {
  const wrap = document.getElementById('projets-list')
  if (!wrap) return
  const projets = allFiches.filter(estProjet)
    .slice().sort((a, b) => (a.created_at || '').localeCompare(b.created_at || ''))

  const isNb = r => /\.ipynb$/i.test(r.file_name || '')
  const sortNom = (a, b) => (a.title || '').localeCompare(b.title || '')
  const parcoursNb = allRessources.filter(r => isNb(r) && r.topic === 'Python — parcours').sort(sortNom)
  const projetsNb  = allRessources.filter(r => isNb(r) && r.topic === 'Python — projets').sort(sortNom)
  const btn = r => {
    return `<a class="btn-basthon" href="https://notebook.basthon.fr/?from=${encodeURIComponent(ressourceAbsUrl(r))}" target="_blank" rel="noopener">⚡ ${escapeHtml(r.title || r.file_name)}</a>`
  }
  let banner = ''
  if (parcoursNb.length || projetsNb.length) {
    banner = `<details class="projets-banner">
      <summary class="projets-banner-summary">⚡ Notebooks interactifs (Basthon) — ${parcoursNb.length + projetsNb.length}</summary>
      ${parcoursNb.length ? `<div class="projets-banner-group"><div class="projets-banner-label">📚 Parcours guidés</div><div class="projets-banner-btns">${parcoursNb.map(btn).join('')}</div></div>` : ''}
      ${projetsNb.length ? `<div class="projets-banner-group"><div class="projets-banner-label">🛠 Projets à compléter</div><div class="projets-banner-btns">${projetsNb.map(btn).join('')}</div></div>` : ''}
    </details>`
  }

  if (!projets.length) {
    wrap.innerHTML = banner + '<p class="empty-msg">Aucun projet pour l\'instant.</p>'
    return
  }
  // Grouper par catégorie
  const cats = new Map()
  projets.forEach(f => {
    const c = projetCategorie(f)
    if (!cats.has(c)) cats.set(c, [])
    cats.get(c).push(f)
  })
  const ordered = [...cats.keys()].sort((a, b) => {
    const ia = PROJET_CATEGORIES.indexOf(a), ib = PROJET_CATEGORIES.indexOf(b)
    return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib)
  })
  const sections = ordered.map(cat => {
    const cards = cats.get(cat).map(f => {
      const titre = (f.title || '').replace(/^Projet détaillé\s*[—–-]\s*/, '')
      return `<button class="projet-card" data-projet-id="${f.id}">
        <div class="projet-card-title">${escapeHtml(titre)}</div>
        ${f.summary ? `<div class="projet-card-desc">${escapeHtml(f.summary)}</div>` : ''}
        <span class="projet-card-arrow">›</span>
      </button>`
    }).join('')
    return `<details class="projet-cat">
      <summary class="projet-cat-label">${escapeHtml(cat)} (${cats.get(cat).length})</summary>
      <div class="projet-grid">${cards}</div>
    </details>`
  }).join('')
  wrap.innerHTML = banner + sections

  if (!wrap.dataset.bound) {
    wrap.addEventListener('click', e => {
      const card = e.target.closest('[data-projet-id]')
      if (!card) return
      const fiche = allFiches.find(f => f.id === card.dataset.projetId)
      if (fiche) { lastFicheView = 'projets'; showFicheRead(fiche) }
    })
    wrap.dataset.bound = '1'
  }
}

// Mise en forme « inline » : échappe le HTML puis gère **gras**, `code` et liens
function inlineFmt(s) {
  let h = escapeHtml(s)
  h = h.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')        // **gras**
  h = h.replace(/\*([^*\n]+)\*/g, '<em>$1</em>')                  // *italique*
  h = h.replace(/`([^`]+)`/g, '<code class="doc-ic">$1</code>')   // `code` -> pastille
  h = h.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')   // [libellé](url) (relatif ou http)
  h = h.replace(/(^|[^"=>])(https?:\/\/[^\s<]+)/g, '$1<a href="$2" target="_blank" rel="noopener">$2</a>') // URL brute (pas déjà dans un href)
  return h
}
const linkify = inlineFmt   // compat

// Rend un bloc tableau Markdown (| col | col |) en vrai tableau HTML
function mdTable(block) {
  const sep = c => c.every(x => /^:?-{2,}:?$/.test(x.trim()))
  const rows = block.split('\n').filter(l => l.trim().startsWith('|'))
    .map(r => r.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map(c => c.trim()))
  const head = rows[0]
  const body = rows.slice(1).filter(r => !sep(r))
  return `<table class="doc-table"><thead><tr>${head.map(c => `<th>${inlineFmt(c)}</th>`).join('')}</tr></thead>` +
         `<tbody>${body.map(r => `<tr>${r.map(c => `<td>${inlineFmt(c)}</td>`).join('')}</tr>`).join('')}</tbody></table>`
}

// Met en forme un texte de cours :
//  - titres de section (1) …, Exercice…, Étape…) mis en évidence
//  - blocs de code délimités par des triples accents graves rendus en monospace
//  - tableaux Markdown, **gras** et `code` inline
// Rend un fragment de prose (titre éventuel + paragraphe)
function renderProseChunk(txt) {
  txt = txt.trim()
  if (!txt) return ''
  const lines = txt.split('\n')
  const first = lines[0].trim()
  if (/^(\d+[\).]|Exercice|Étape|Etape)(\s|$)/i.test(first)) {
    const rest = lines.slice(1).join('\n').trim()
    return `<p class="doc-subheading">${inlineFmt(first)}</p>` +
           (rest ? `<p class="doc-para">${inlineFmt(rest)}</p>` : '')
  }
  return `<p class="doc-para">${inlineFmt(txt)}</p>`
}

// Rend un bloc : peut contenir un titre PUIS un tableau (même sans ligne vide)
function renderBlock(block) {
  const lines = block.split('\n')
  let html = ''
  let buf = []
  for (let i = 0; i < lines.length; i++) {
    const isTableStart = lines[i].trim().startsWith('|') &&
      i + 1 < lines.length && /-{2,}/.test(lines[i + 1]) && lines[i + 1].includes('|')
    if (isTableStart) {
      html += renderProseChunk(buf.join('\n')); buf = []
      let j = i
      const tbl = []
      while (j < lines.length && lines[j].trim().startsWith('|')) { tbl.push(lines[j]); j++ }
      html += mdTable(tbl.join('\n'))
      i = j - 1
    } else {
      buf.push(lines[i])
    }
  }
  html += renderProseChunk(buf.join('\n'))
  return html
}

function formatProse(text) {
  // segments alternés : prose (pair) / code (impair)
  return String(text).split('```').map((seg, i) => {
    if (i % 2 === 1) {
      return `<pre class="doc-code">${escapeHtml(seg.replace(/^\n+|\n+$/g, ''))}</pre>`
    }
    return seg.split(/\n{2,}/).map(block => {
      block = block.replace(/^\n+|\n+$/g, '')
      if (!block.trim()) return ''
      return renderBlock(block)
    }).join('')
  }).join('')
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
    const inner = opts.lead
      ? `<div class="doc-body lead">${escapeHtml(body)}</div>`
      : `<div class="doc-prose">${formatProse(body)}</div>`
    return `<div class="doc-section"><div class="doc-label">${label}</div>${inner}</div>`
  }
  // Marqueur de notebook lié : [[nb:fichier.ipynb]] (retiré du texte affiché)
  const nbMatch = (fiche.content || '').match(/\[\[nb:([^\]]+)\]\]/)
  const contenu = (fiche.content || '').replace(/\s*\[\[nb:[^\]]+\]\]\s*/g, '').trim()

  const parts = [
    sec('Résumé', fiche.summary, { lead: true }),
    sec('Objectifs pédagogiques', fiche.objectifs),
    sec('Notes de cours', contenu),
    sec('Exemple de code', fiche.code_example, { code: true }),
    sec('Exercices pour les élèves', fiche.exercices),
  ].filter(Boolean)

  // Bouton « ⚡ Notebook » si la fiche est liée à un notebook
  const ba = document.getElementById('btn-read-basthon')
  if (ba) {
    const res = nbMatch && allRessources.find(r => r.file_name === nbMatch[1])
    if (res) {
      ba.href = 'https://notebook.basthon.fr/?from=' + encodeURIComponent(ressourceAbsUrl(res))
      ba.classList.remove('hidden')
    } else {
      ba.classList.add('hidden')
      ba.removeAttribute('href')
    }
  }

  // Libellé du bouton retour selon la provenance (Fiches ou Projets)
  const back = document.getElementById('btn-read-back')
  if (back) back.textContent =
    lastFicheView === 'projets'   ? '← Retour aux projets' :
    lastFicheView === 'ressources' ? "← Retour à l'ordre du jour" :
    '← Retour aux fiches'

  // Bouton « PDF original » si une ressource partage le même thème
  const dl = document.getElementById('btn-read-download')
  if (dl) {
    const res = fiche.topic && allRessources.find(r => r.topic && r.topic === fiche.topic && r.file_name)
    if (res) {
      dl.href = ressourceUrl(res)
      dl.setAttribute('download', res.file_name)
      dl.classList.remove('hidden')
    } else {
      dl.classList.add('hidden')
      dl.removeAttribute('href')
    }
  }

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

  document.getElementById('eval-docs').innerHTML = EVAL_DOCS.map(d => `
    <div class="agenda-row">
      <a class="agenda-link" href="${d.url}" target="_blank" rel="noopener">
        <span class="agenda-fiche-icon">${d.icon}</span>
        <span><strong>${escapeHtml(d.title)}</strong><br><span class="eval-doc-desc">${escapeHtml(d.desc)}</span></span>
        <span class="agenda-arrow">↗</span>
      </a>
    </div>`).join('')

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

// ── Ordre du jour (séances en ligne) ─────────────────────
function agendaLinkRow(base, it) {
  // Item rapatrié dans une fiche interne : on ouvre la fiche ; lien « source » externe en complément
  if (it.f) {
    const src = it.u
      ? `<a class="agenda-src" href="${resolveUrl(base, it.u)}" target="_blank" rel="noopener" title="Page d'origine (B. Mermet)">source ↗</a>`
      : ''
    return `<div class="agenda-row">
      <button class="agenda-link agenda-fiche-btn" data-fiche-title="${escapeHtml(it.f)}">
        <span class="agenda-fiche-icon">📝</span><span>${escapeHtml(it.t)}</span>
      </button>${src}</div>`
  }
  const url = resolveUrl(base, it.u)
  return `<div class="agenda-row"><a class="agenda-link" href="${url}" target="_blank" rel="noopener">${escapeHtml(it.t)} <span class="agenda-arrow">↗</span></a></div>`
}
function agendaSessionHtml(s, openFirst) {
  const parts = s.parties.map((p, i) => {
    let body
    if (p.groupes) {
      body = p.groupes.map(g =>
        `<div class="agenda-sub">${escapeHtml(g.sous)}</div>` +
        `<div class="agenda-list">${g.items.map(it => agendaLinkRow(s.base, it)).join('')}</div>`
      ).join('')
    } else {
      body = `<div class="agenda-list">${p.items.map(it => agendaLinkRow(s.base, it)).join('')}</div>`
    }
    const duree = p.duree ? ` <span class="agenda-duree">· ${escapeHtml(p.duree)}</span>` : ''
    return `<details class="projet-cat"${i === 0 && openFirst ? ' open' : ''}>` +
           `<summary class="projet-cat-label">${escapeHtml(p.titre)}${duree}</summary>` +
           `<div class="agenda-part-body">${body}</div></details>`
  }).join('')
  return `<div class="agenda-card">
      <div class="agenda-head">
        <div>
          <div class="agenda-title">${blocBadge(s.bloc)} ${escapeHtml(s.titre)}</div>
          <div class="agenda-meta">${escapeHtml(s.formateur)} · ${escapeHtml(s.dateLabel)} · ${escapeHtml(s.mode)} · ${escapeHtml(s.duree)}</div>
        </div>
        <a class="btn-secondary agenda-index-btn" href="${resolveUrl(s.base, s.index)}" target="_blank" rel="noopener">Ouvrir l'index ↗</a>
      </div>
      ${parts}
    </div>`
}
function renderAgenda() {
  const wrap = document.getElementById('res-agenda')
  if (!wrap) return
  const now = today()
  // Tri chronologique ; la séance du jour (ou la prochaine) est dépliée
  const sessions = [...SESSIONS_ENLIGNE].sort((a, b) => a.iso.localeCompare(b.iso))
  const todayIdx = sessions.findIndex(s => s.iso === now)
  const nextIdx  = sessions.findIndex(s => s.iso >= now)
  const highlight = todayIdx >= 0 ? todayIdx : nextIdx
  wrap.innerHTML = sessions.map((s, i) => agendaSessionHtml(s, i === highlight)).join('')

  // Ouvre la fiche interne correspondante (lié une seule fois)
  if (!wrap.dataset.bound) {
    wrap.addEventListener('click', e => {
      const btn = e.target.closest('.agenda-fiche-btn')
      if (!btn) return
      const fiche = allFiches.find(f => f.title === btn.dataset.ficheTitle)
      if (fiche) { lastFicheView = 'ressources'; showFicheRead(fiche) }
      else toast('Fiche introuvable — rechargez la page')
    })
    wrap.dataset.bound = '1'
  }
}

// Bannière « aujourd'hui / prochaine séance en ligne » sur le tableau de bord
function renderAgendaBanner() {
  const el = document.getElementById('dash-agenda')
  if (!el) return
  const now = today()
  const sessions = [...SESSIONS_ENLIGNE].sort((a, b) => a.iso.localeCompare(b.iso))
  const todaySession = sessions.find(s => s.iso === now)
  const nextSession  = sessions.find(s => s.iso > now)
  const s = todaySession || nextSession
  if (!s) { el.innerHTML = ''; return }
  const isToday = !!todaySession
  // Plusieurs séances le même jour (ex. 10 septembre : bases de données puis k-NN)
  const memeJour = sessions.filter(x => x.iso === s.iso).length
  const jLabel = (isToday ? "Aujourd'hui" : `Dans ${daysUntil(s.iso)} j`) +
                 (memeJour > 1 ? ` · ${memeJour} séances` : '')
  el.innerHTML = `
    <button class="agenda-banner ${isToday ? 'is-today' : ''}" id="dash-agenda-btn">
      <span class="agenda-banner-tag">📋 ${jLabel}</span>
      <span class="agenda-banner-text">Séance en ligne — ${escapeHtml(s.titre)} <span class="agenda-banner-meta">(${escapeHtml(s.formateur)}, ${escapeHtml(s.dateLabel)})</span></span>
      <span class="agenda-banner-cta">Voir l'ordre du jour →</span>
    </button>`
  el.querySelector('#dash-agenda-btn').addEventListener('click', () => {
    navigate('ressources')
    setTimeout(() => document.getElementById('res-agenda')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60)
  })
}

// ── Ressources ───────────────────────────────────────────

function renderRessources() {
  const makeCard = r => `
    <a class="resource-card" href="${r.url.startsWith('basthon:') ? basthonLien(r.url) : r.url}" target="_blank" rel="noopener">
      <div class="resource-card-icon">${r.icon}</div>
      <div>
        <div class="resource-card-title">${r.title}</div>
        <div class="resource-card-desc">${r.desc}</div>
      </div>
      <div class="resource-card-arrow">↗</div>
    </a>`

  renderUploadedRessources()

  renderAgenda()
  document.getElementById('res-mermet').innerHTML   = RESSOURCES_MERMET.map(makeCard).join('')
  document.getElementById('res-officiel').innerHTML = RESSOURCES_OFFICIEL.map(makeCard).join('')

  // Logisim : plateforme (lien externe) + projets .circ (téléchargement local)
  const logiWrap = document.getElementById('res-logisim')
  if (logiWrap) {
    const platform = makeCard(LOGISIM_PLATFORM)
    const projets = LOGISIM_PROJETS.map(p => `
      <a class="resource-card" href="ressources/logisim/${p.file}" download>
        <div class="resource-card-icon">${p.icon}</div>
        <div>
          <div class="resource-card-title">${p.title}</div>
          <div class="resource-card-desc"><span class="logisim-tag">${p.theme}</span>${p.desc}</div>
        </div>
        <div class="resource-card-arrow">⬇</div>
      </a>`).join('')
    logiWrap.innerHTML = platform + projets
  }

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
    const url = ressourceUrl(r)
    const meta = [r.topic, humanSize(r.file_size)].filter(Boolean).join(' · ')
    const isNotebook = /\.ipynb$/i.test(r.file_name || '') || (r.file_type || '').includes('ipynb')
    const basthonBtn = isNotebook
      ? `<a class="btn-secondary btn-basthon" style="margin:0 0 0 8px;padding:6px 12px;font-size:.8rem" href="https://notebook.basthon.fr/?from=${encodeURIComponent(ressourceAbsUrl(r))}" target="_blank" rel="noopener" title="Exécuter le notebook dans le navigateur (Python en ligne)">⚡ Basthon</a>`
      : ''
    return `
      <div class="calendar-row">
        <div class="calendar-dot" style="background:${r.bloc && BLOCS[r.bloc] ? BLOCS[r.bloc].color : 'var(--muted)'}"></div>
        <div class="calendar-info">
          <div class="calendar-bloc">${fileIcon(r.file_type, r.file_name)} ${r.title || r.file_name || '(Sans titre)'}</div>
          <div class="calendar-dates">${[r.bloc && BLOCS[r.bloc] ? BLOCS[r.bloc].short : '', meta].filter(Boolean).join(' — ')}${r.description ? '<br>' + r.description : ''}</div>
        </div>
        ${basthonBtn}
        <a class="btn-secondary" style="margin:0 0 0 8px;padding:6px 12px;font-size:.8rem" href="${url}" target="_blank" rel="noopener" download>⬇ Ouvrir</a>
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
  const dansLeDepot = (r.file_path || '').startsWith('ressources/')
  if (!confirm(dansLeDepot
    ? 'Retirer cette ressource de la liste ? Le fichier restera dans le dépôt (à supprimer par un commit).'
    : 'Supprimer cette ressource ?')) return
  if (!dansLeDepot) await db.storage.from('ressources').remove([r.file_path])
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
document.getElementById('btn-read-back').addEventListener('click',    () => navigate(lastFicheView || 'fiches'))

// ── Recherche globale (fiches, projets, parcours) ────────
;(function bindSearch() {
  const input = document.getElementById('global-search')
  const box   = document.getElementById('search-results')
  if (!input || !box) return
  // normalise : minuscules + sans accents (recherche tolérante)
  const norm = s => (s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
  input.addEventListener('input', () => {
    const q = norm(input.value.trim())
    if (q.length < 2) { box.classList.add('hidden'); box.innerHTML = ''; return }
    const match = (...champs) => champs.some(c => norm(c).includes(q))
    const fHits = allFiches.filter(f => match(f.title, f.topic, f.summary)).slice(0, 12)
    const tHits = TPS.filter(t => match(t.title, t.theme, t.intro)).slice(0, 8)
    let html = fHits.map(f => {
      const tag = estProjet(f) ? '🚀' : '📝'
      return `<button class="search-hit" data-id="${f.id}">
        <span class="search-hit-title">${tag} ${escapeHtml(f.title || '')}</span>
        <span class="search-hit-topic">${escapeHtml(f.topic || '')}</span>
      </button>`
    }).join('')
    html += tHits.map(t => `<button class="search-hit" data-tp="${t.id}">
        <span class="search-hit-title">🧪 ${escapeHtml(t.title || '')}</span>
        <span class="search-hit-topic">${escapeHtml(t.theme || t.jour || '')}</span>
      </button>`).join('')
    box.innerHTML = html || '<div class="search-empty">Aucun résultat</div>'
    box.classList.remove('hidden')
  })
  box.addEventListener('click', e => {
    const b = e.target.closest('[data-id],[data-tp]')
    if (!b) return
    if (b.dataset.tp) {
      navigate('tp'); showTPDetail(b.dataset.tp)
    } else {
      const f = allFiches.find(x => x.id === b.dataset.id)
      if (f) { lastFicheView = estProjet(f) ? 'projets' : 'fiches'; showFicheRead(f) }
    }
    box.classList.add('hidden'); input.value = ''
  })
  input.addEventListener('keydown', e => { if (e.key === 'Escape') { box.classList.add('hidden'); input.value = '' } })
  document.addEventListener('click', e => {
    if (!input.contains(e.target) && !box.contains(e.target)) box.classList.add('hidden')
  })
})()
document.getElementById('btn-read-edit').addEventListener('click',    () => {
  const f = allFiches.find(x => x.id === currentFicheId)
  if (f) showFicheEdit(f)
})
document.getElementById('btn-read-print').addEventListener('click', () => {
  document.body.classList.add('printing-fiche')
  window.print()
})
window.addEventListener('afterprint', () => document.body.classList.remove('printing-fiche'))
document.getElementById('btn-fiche-save').addEventListener('click',   saveFiche)
document.getElementById('btn-fiche-delete').addEventListener('click', deleteFiche)

// ── Init ─────────────────────────────────────────────────
;(async () => {
  await loadAll()
  navigate('dashboard')
})()
