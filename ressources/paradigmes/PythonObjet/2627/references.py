'''
 Exemple pour illustrer le principes de référence à un objet
 et de copie de référence.
 Pour bien comprendre, exécuter ce code avec Python Tutor :
 https://pythontutor.com/visualize.html#
'''
 
class Point:
    def __init__(self, initX, initY):
      self.x = initX
      self.y = initY

    def translater(self, dx, dy):
        self.x += dx
        self.y += dy

p1 = Point(3,4)
'''
 Sur la ligne suivante, on ne copie pas l'objet, on
 copie la REFERENCE à l'objet dans la variable p3
 => le même objet va être référencé par p1 et p3
'''
p3 = p1
p1.translater(1,1)
'''
 Visualiser ici le contenu de l'objet
 référencé par p1 et p3
'''
