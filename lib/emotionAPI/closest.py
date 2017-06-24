import numpy as np

def closest(listed, target):
    distances = []
    for (x,y) in listed:
        diffx = x - target[0]
        diffy = y - target[1]
        sqrx = np.power(diffx,2)
        sqry = np.power(diffy, 2)
        dist = np.sqrt(sqrx + sqry)
        distances.append(dist)
    return distances.index(min(distances))

if __name__ == '__main__':
    print(closest([(0,0), (1,1), (2,2)], [1,2]))

