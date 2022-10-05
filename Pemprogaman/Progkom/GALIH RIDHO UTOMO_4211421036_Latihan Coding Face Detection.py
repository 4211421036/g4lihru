# GALIH RIDHO UTOMO
# 4211421036
# Fisika Murni

import cv2
cam = cv2.VideoCapture(0)
cam.set(3, 1280)
cam.set(4, 720)

faceDetector = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
eyeDetector = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_eye.xml')

while True:
    retV, frame = cam.read()
    abuAbu = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    faces = faceDetector.detectMultiScale(abuAbu, 1.3, 5)
    
    person = 1
    for (x, y, w, h) in faces:
        frame = cv2.rectangle(frame, (x, y), (x+w, y+h), (193, 208, 0), 2)
        cv2.putText(frame, f'wajah {person}', (x,y-30), cv2.FONT_HERSHEY_SIMPLEX, 1, (166,178,16), 1)
        person += 1
        roiAbuAbu = abuAbu[y:y+h, x:x+w]
        roiWarna = frame[y:y+h, x:x+w]
        eyes = eyeDetector.detectMultiScale(roiAbuAbu)
        for (xe, ye, we, he) in eyes:
            cv2.rectangle(roiWarna,(xe, ye), (xe+we, ye+he), (61, 250, 186), 1)
    
    cv2.putText(frame, f'Total Wajah : {person-1}', (40,70), cv2.FONT_HERSHEY_DUPLEX, 0.8, (197,210,18), 2)
    cv2.imshow("Face Detection", frame)
    k = cv2. waitKey(1) & 0xFF
    if k == 27 or k == ord('q'):
        break

cam.release()
cv2.destroyAllWindows()
     