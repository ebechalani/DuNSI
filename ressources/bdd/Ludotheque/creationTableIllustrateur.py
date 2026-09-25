import sqlite3

conn = sqlite3.connect('ludotheque.db')

c = conn.cursor()

c.execute('DROP TABLE IF EXISTS illustrateur')

c.execute('''CREATE TABLE illustrateur (
     idIllustrateur int primary key,
     nomIllustrateur text,
     prenomIllustrateur text,
     nationaliteIllustrateur text)''')

#Insertion 1 à 1
c.execute('''INSERT INTO illustrateur
              values(1, 'Delval', 'Julien', 'Française')''')
c.execute('''INSERT INTO illustrateur
              values(2, 'Coimbra', 'Miguel', 'Française')''')
c.execute('''INSERT INTO illustrateur
              values(3, 'Quilliams', 'Chris', 'Canadienne')''')
c.execute('''INSERT INTO illustrateur
              values(4, 'Balixa', 'Bruno', 'Américaine')''')
c.execute('''INSERT INTO illustrateur
              values(5, 'Alsop', 'Dave', 'Américaine')''')
c.execute('''INSERT INTO illustrateur
              values(6, 'Torres', 'Francisco Rico', 'Américaine')''')

#Insertion groupée
#ici provoque une erreur de clef primaire et le prog python s'arrête.
#comme le commit n'est du coup pas exécuté, toutes les insertions sont
#perdues car non sauvegardées dans le fichier de la base
'''liste = [(5, 'Mermet', 'Bruno', 'Française'),
         (6, 'Amanton', 'Laurent','Franc-comtoise')]
c.executemany("INSERT INTO illustrateur values(?,?,?,?)", liste)'''
conn.commit()
conn.close()
       
