def _fusion (a, b):
    """ réalise la fusion de deux listes triées
    en une grande liste trieé.
    
    Tests automatiques :
    >>> fusion([1,3,5,6,7,9,12,14,15,16,89], [0,2,4,8,10,11,13,17,18,25,45])
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 25, 45, 89]
    >>> fusion ([1,3,5,6,7,9,12,14,15,16], [0,2,4,8,89])
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 12, 14, 15, 16, 89]
    >>> fusion ([13, 101], [1,3,5,6,7,9,12,14,15,16])
    [1, 3, 5, 6, 7, 9, 12, 13, 14, 15, 16, 101]
    >>> fusion ([101], [16])
    [16, 101]
    >>> fusion([13, 17, 18, 19, 23, 25, 28, 29, 35, 37, 39], [1, 3, 6, 10, 14, 15, 16, 20, 24])
    [1, 3, 6, 10, 13, 14, 15, 16, 17, 18, 19, 20, 23, 24, 25, 28, 29, 35, 37, 39]
    """
    r = [] #pour stocker la liste fusionner
    i = 0 #pointe les éléments de a
    j = 0 #pointe les éléments de b
    for k in range(len(a) + len(b)):
        #si il reste encore des éléments de b et de b a pacourir
        if j < len(b) and i < len(a):
            if a[i] < b[j]:
                r.append(a[i])
                i += 1
            else :
                r.append(b[j])
                j += 1
        elif j >= len(b):
            r.extend(a[i:])
            break
        elif i >= len(a):
            r.extend(b[j:])
            break
    return r
            
  
