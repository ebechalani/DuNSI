import sqlite3

conn = sqlite3.connect('ludotheque.db')

c = conn.cursor()

c.execute('DROP TABLE IF EXISTS jeu')
c.execute('DROP TABLE IF EXISTS editeur')

c.execute('PRAGMA foreign_keys = ON')

#creation de la table Editeur
c.execute('''CREATE TABLE editeur (
     idEditeur int primary key not null,
     nomEditeur text not null,
     nationaliteEditeur text)''')

#remplissage de la table Editeur
listeEditeurs = [(1, 'Days of wonder', 'Française'),
                 (2, 'EggertSpiele', 'Allemande'),
         (3, 'Iello', 'Française')]
c.executemany("INSERT INTO editeur values(?,?,?)", listeEditeurs)

#creationd de la table jeu
c.execute('''CREATE TABLE jeu (
     idJeu int primary key not null,
     nomJeu text not null,
     nbJoueursMin int,
     nbJoueursMax int,
     duree int,
     idEditeur int REFERENCES Editeur(idEditeur))''')

listeJeux = [
    (1, 'Les chevaliers de la table ronde', 3, 7, 90, 1),
    (2, 'Cargo Noir', 2, 5, 60, 1),
    (3, 'Era: medieval age', 1, 4, 50, 2),
    (4, 'Smash up', 2, 4, 45, 3)
    ]
c.executemany("INSERT INTO jeu values(?,?,?,?,?,?)", listeJeux)

conn.commit()
conn.close()
       
