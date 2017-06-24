import cv2

def detectFace(image, classifier='haarcascade_frontalface_default'):


    faceCascade = cv2.CascadeClassifier(classifier)

    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    faces = faceCascade.detectMultiScale(gray, 1.3, 5)
    print("Faces: %d" % len(faces))

# for (x, y, w, h) in faces:
#     cv2.rectangle(image, (x, y), (x+w, y+h), (0, 255, 0), 2)
    return faces


if __name__ == '__main__':
    classifier = 'haarcascade_frontalface_default.xml'
    imagePath = 'faces-agreeableness.jpg'
    image = cv2.imread(imagePath)
    detectFace(image, classifier)

