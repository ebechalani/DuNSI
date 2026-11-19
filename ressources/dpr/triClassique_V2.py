#V2 : tri en place

def triInsertion (lst):
    """ Tri une liste suivant un algorithme de tri par insertion
    Modifie la liste de départ
    
    Tests automatiques :
    >>> a = [39, 19, 13, 25, 29, 37, 18, 23, 17, 28, 14, 15, 6, 16, 10, 20, 3, 35, 1, 24, 5, 32, 33, 30, 21, 4, 38, 0, 11, 36, 8, 7, 34, 9, 27, 22, 26, 31, 2, 12]
    >>> triInsertion(a)
    >>> a
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39]
    """
    for i in range(1, len(lst)):
        #On commence à i, ce qui est a gauche est déja trié
        j = i
        #On ramene le terme pointé par i vers la gauche jusqu'a ce qu'il soit a sa place
        #tant que le terme de gauche est plus grand, il faut intervertir les deux
        while j > 0 and lst[j] < lst[j - 1]:
            lst[j], lst[j - 1] = lst[j - 1], lst[j]
            #terme suivant à gauche
            j -= 1

def triSelection (lst):
    """ Tri une liste suivant un algorithme de tri par sélection
    Modifie la liste de départ
    
    Tests automatiques :
    >>> a = [39, 19, 13, 25, 29, 37, 18, 23, 17, 28, 14, 15, 6, 16, 10, 20, 3, 35, 1, 24, 5, 32, 33, 30, 21, 4, 38, 0, 11, 36, 8, 7, 34, 9, 27, 22, 26, 31, 2, 12]
    >>> triSelection(a)
    >>> a
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39]
    """
    
    taille = len(lst)
    for i in range(taille - 1):
        #recherche du minimum
        #on suppose que c'est le premier terme de la partie
        #de la liste encore à trier 
        mini = i
        #parcours la partie à trier
        for j in range(i + 1, taille):
            #c'est le minimum ?
            if lst[j] <= lst[mini]:
                #si oui, on mémorise son indice
                mini = j
        #on échange le minimum avec le premier terme de la iste retant a trie
        lst[i], lst[mini] = lst[mini], lst[i]

def triBulle (lst):
    """ Tri une liste suivant un algorithme de tri à bulle
    Modifie la liste de départ
    
    Tests automatiques :
    >>> a = [39, 19, 13, 25, 29, 37, 18, 23, 17, 28, 14, 15, 6, 16, 10, 20, 3, 35, 1, 24, 5, 32, 33, 30, 21, 4, 38, 0, 11, 36, 8, 7, 34, 9, 27, 22, 26, 31, 2, 12]
    >>> triBulle(a)
    >>> a
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39]
    """
    
    taille = len(lst)
    for i in range(taille):
        flagFin = True #initialisation du flag de fin
        for j in range(taille - 1 - i):
            if lst[j] > lst[j + 1]:
                lst[j], lst[j + 1] = lst[j + 1], lst[j]
                flagFin = False #non si au moins une inversion
        if flagFin : #si flagFin toujours vrai -> aucune inversion dans la derniere boucle, c'est fini
            break

if __name__=="__main__":
    import doctest
    from random import shuffle
    doctest.testmod()
    
    a = [x for x in range(1000)]
    shuffle(a)
    
    b = a
    triInsertion(b) 
    print(b[:10], "...",b[990:])
    b = a
    triSelection(b) 
    print(b[:10], "...",b[990:])
    b = a
    triBulle(b) 
    print(b[:10], "...",b[990:])


