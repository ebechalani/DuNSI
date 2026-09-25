import sqlite3

#Connection à la base de donnée
conn = sqlite3.connect('ludotheque.db')
c = conn.cursor()

#Définition de la requête
#requete = "SELECT * FROM illustrateur"
#requete = "SELECT * FROM auteur"
#requete = """SELECT *
#FROM illustrateur
#WHERE (nationaliteIllustrateur = 'Américaine' AND
#      upper(prenomIllustrateur) LIKE '%O%')
#OR    nationaliteIllustrateur = 'Française'""";

requete = input("Requête : ")

#Exécution de la requête et affichage du résultat
for ligne in c.execute(requete):
    print(ligne)

#Des fois que la requête saisie serait une requête modifiant la base...
conn.commit()

#Déconnexion de la base de données
conn.close()

           
