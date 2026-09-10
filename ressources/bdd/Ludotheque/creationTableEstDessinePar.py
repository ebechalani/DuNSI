import sqlite3

conn = sqlite3.connect('ludotheque.db')

c = conn.cursor()

c.execute('DROP TABLE IF EXISTS EstDessinePar')

c.execute('PRAGMA foreign_keys = ON')

#creation de la table EstDessinePar
c.execute('''CREATE TABLE EstDessinePar (
     idIllustrateur int not null,
     idJeu int not null,
     PRIMARY KEY (idJeu, idIllustrateur),
     FOREIGN KEY(idJeu) REFERENCES Jeu(idJeu),
     FOREIGN KEY(idIllustrateur) REFERENCES Illustrateur(IdIllustrateur))''')

#remplissage de la table EstDessinePar
listeDessins = [(1, 1),
                (2, 2),
                (3, 3),
                (4, 4), (5, 4), (6, 4)]

c.executemany("INSERT INTO EstDessinePar values(?,?)", listeDessins)

conn.commit()
conn.close()
       
