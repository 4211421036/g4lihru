# GALIH RIDHO UTOMO
# 4211421036
# Fisika Murni

import cv2, os, numpy as np

wajahDir = r'C:\Users\asus\public\Grap\datawajah'
latihDir = r'C:\Users\asus\public\Grap\latihwajah'
faceRecognizer = cv2.face.LBPHFaceRecognizer_create()
faceDetector = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
eyeDetector = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_eye.xml')

faceRecognizer.read(latihDir + '/latih.yaml')

font = cv2.FONT_HERSHEY_SIMPLEX

id = 0
names = ['Tidak ada', 'Galih', 'Dipta']

cam = cv2.VideoCapture(0)
cam.set(3, 1280)
cam.set(4, 720)

minWidth = 0.1 * cam.get(3)
minHeight = 0.1 * cam.get(4)


while True:
    retV, frame = cam.read()
    frame = cv2.flip(frame, 1)
    abuAbu = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    faces = faceDetector.detectMultiScale(abuAbu, 1.2, 5, minSize=(round(minWidth),round(minHeight)),)
    person = 1
    personU = 1
    for (x, y, w, h) in faces:
        frame = cv2.rectangle(frame, (x, y), (x+w, y+h), (193, 208, 0), 2)
        id, confidence = faceRecognizer.predict(abuAbu[y:y+h, x:x+w])
        roiAbuAbu = abuAbu[y:y+h, x:x+w]
        roiWarna = frame[y:y+h, x:x+w]
        if (confidence > 5):
            nameID = [names[id]]
            confidenceTxt = " {0}%".format(round(100 - confidence))
            cv2.putText(frame, str(f"Hallo {nameID}"), (x+5, y-10), font,  1, (255,255,255),2)
            cv2.putText(frame, str(confidenceTxt), (x+5, y+h-5), font,  1, (255,255,0),1)
            for (x, y, w, h) in faces:
                frame = cv2.rectangle(frame, (x, y), (x+w, y+h), (193, 208, 0), 2)
                cv2.putText(frame, f'wajah yang terdeksi {personU}', (x,y-40), cv2.FONT_HERSHEY_SIMPLEX, 1, (166,178,16), 1)
                personU += 1
            cv2.putText(frame, f'Total Wajah terdeteksi : {(personU-1)}', (40,70), cv2.FONT_HERSHEY_DUPLEX, 0.8, (197,210,18), 2)
        elif (confidence > 20):
            nameID = [names[id]]
            confidenceTxt = " {0}%".format(round(100 - confidence))
            cv2.putText(frame, str(f"Hallo {nameID}"), (x+5, y-10), font,  1, (255,255,255),2)
            cv2.putText(frame, str(confidenceTxt), (x+5, y+h-5), font,  1, (255,255,0),1)
            for (x, y, w, h) in faces:
                frame = cv2.rectangle(frame, (x, y), (x+w, y+h), (193, 208, 0), 2)
                cv2.putText(frame, f'wajah yang terdeksi {personU}', (x,y-40), cv2.FONT_HERSHEY_SIMPLEX, 1, (166,178,16), 1)
                personU += 1
            cv2.putText(frame, f'Total Wajah terdeteksi : {(personU-1)}', (40,70), cv2.FONT_HERSHEY_DUPLEX, 0.8, (197,210,18), 2)
        else:
            nameID = names[0]
            confidenceTxt = " {0}%".format(round(100 - confidence))
            cv2.putText(frame, str(confidenceTxt), (x+5, y+h-5), font,  1, (0,0,255),1)
            cv2.putText(frame, str(nameID), (x+5, y-10), font,  1, (255,255,255),2)
            for (x, y, w, h) in faces:
                frame = cv2.rectangle(frame, (x, y), (x+w, y+h), (0, 0, 255), 2)
                cv2.putText(frame, f'wajah tidak terdeteksi {person}', (x,y-40), cv2.FONT_HERSHEY_SIMPLEX, 1, (0,0,255), 1)
                person += 1
            cv2.putText(frame, f'Total Wajah tidak terdeteksi : {(person-1)}', (40,100), cv2.FONT_HERSHEY_DUPLEX, 0.8, (197,210,18), 2)
        eyes = eyeDetector.detectMultiScale(roiAbuAbu)
        for (xe, ye, we, he) in eyes:
            cv2.rectangle(roiWarna,(xe, ye), (xe+we, ye+he), (61, 250, 186), 1)

    cv2.putText(frame, f'Total Wajah : {(person-1 + personU-1)}', (40,130), cv2.FONT_HERSHEY_DUPLEX, 0.8, (197,210,18), 2)
    cv2.imshow("Face Recognition", frame)
    k = cv2. waitKey(1) & 0xFF
    if k == 27 or k == ord('q'):
        break

cam.release()
cv2.destroyAllWindows()