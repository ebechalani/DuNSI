class Personne:
    def __init__(self, nom , age):
        self.__nom = nom
        self.age = age
        self.majeur = age >= 18
        self.invariant()

    def vieillir(self):
        self.invariant()
        self.age += 1
        # ici, l'invariant peut être faux, mais ce n'est pas un problème
        if self.age >= 18:
            self.majeur = True
        self.invariant()

    def invariant(self):
        assert (self.age >= 18) == (self.majeur), "Majorité pas correcte"

# problème si on ne respecte pas l'encapsulation :
# p1 = Personne("Martin", 17)
# p1.age = 18
#p1.__nom depuis l'extérieur de la classe pose un problème
# encapsulation : mécanisme consistant à forcer le passage par des méthodes pour accéder aux variables d'instance d'une classe.

p1 = Personne("Martin", 17)
p1.vieillir()
p1.age = 15
p1.vieillir()
