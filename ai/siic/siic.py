'''
SIIC (System Vehicle Intelligence Community)

Aim for delegeration of olimpic PIF XXXIII by GALIH RIDHO UTOMO & Ana Maulida
'''

#Mengambil Perpusatakaan Module 
import cv2 
import numpy as np
from os import *

'''
Kondisi Perpustakaan Module yang diperlukan tidak tersedia
>>> Menginstal CV2
>>> SKIP jika telah terinstall
'''
system("python -m pip install opencv-python Arg")

#Source File Video
'''
Mengambil Perpustakaan berupa Video sebagai media deteksi
'''
SIICCap = cv2.VideoCapture(r'C:\Users\asus\public\SIIC\siic.mp4')

#Source data formula as SIIC
'''
Menentukan dan Menganalisis Perpustakaan yang diambil
>>> Panjang garis jebra cross
>>> Minimal Data SIIC
>>> Minimal Data Cada SIIC
'''
CountLineSIIC = 550
MinDataSIIC = 80
MinDataSIICa = 80

#Source of vahicle count finish him
'''
Menghitung data SIIC (jumlah kendaraan) yang terlintas dan menganalisis apa yang perlu diubah
>>> History = kemungkinan gagal sebab tergantung kecepatan kendaraan yang melintas (5)
>>> Variabel Penghalang = burung melintas, tiang jalan, bunga, pohon yang menjadi penghalang dan menyebabkan error
>>> Detect Shadows = Menhilang dan mendekteksi bayangan dari setiap benda
'''
SIICBac = cv2.createBackgroundSubtractorMOG2(history=5, varThreshold=60, detectShadows=True)

#Function of detect SIIC position
'''
Menentukan jarak, tinggi, dan tinggi pada kendaraan yang dihitung
'''
def cent (x,y,w,h):
    xa = int(w/2)
    xb = int(h/2)
    xc = x+xa
    xd = y+xb
    return xc, xd

#List Vehicle Counter
'''
Menentukan rumus sebagai kendaraan yang telah ditentukan nilai awalan nya dan membuat dalam bentuk list
'''
DetectSIIC = []
#Datas Offset of Counter SIIC
OffsetSIIC=6
#Counter SIIC
CountSIIC= 0

while True:
    IC, _ = SIICCap.read()

    Ab = cv2.cvtColor(_, cv2.COLOR_BGR2GRAY)

    blur = cv2.GaussianBlur(Ab,(3, 3), 5)

    img_syb = SIICBac.apply(blur)

    #Formula of SIIC 
    '''
    Membuat element stuktur deteksi pada sumber kemudian memberi gradien pada element frame kemudian mencari 
    contour pada element kemudian membuat garis lintasan pada jalan yang dilalui kendaraan.
    '''
    DelateDataSIIC = cv2.dilate(img_syb, np.ones((5,5)))
    RectSIIC = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5,5))
    DelateDataSIICada = cv2.morphologyEx(DelateDataSIIC, cv2.MORPH_CLOSE, RectSIIC)
    DelateDataSIICada = cv2.morphologyEx(DelateDataSIICada, cv2.MORPH_CLOSE, RectSIIC)
    counter, h = cv2.findContours(DelateDataSIICada, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)

    #Line zebra SIIC count 
    cv2.line(_, (25, CountLineSIIC), (1200, CountLineSIIC), (255, 127,0), 3)

    #Iterable Count Vehicle of SIIC
    '''
    Membuat perhitungan jumlah kendaraan yang melintas pada garis yang telah dibuat. Jika kendaraan melintas 
    maka terhitung. 
    '''
    for (i, c) in enumerate(counter):
        (x,y,w,h) = cv2.boundingRect(c)
        ValueCount = (w>=MinDataSIIC) and (h>=MinDataSIICa)
        if not ValueCount:
            continue

        cv2.rectangle(_, (x,y),(x+w,y+h),(0,0,255),2)

        cen = cent(x,y,w,h)
        DetectSIIC.append(cen)

        cv2.circle(_, cen, 4,(0,0,250),-1)

        for (x,y) in DetectSIIC:
            if y<(CountLineSIIC+OffsetSIIC) and y>(CountLineSIIC-OffsetSIIC):
                CountSIIC+=1
            cv2.line(_, (25, CountLineSIIC), (1200, CountLineSIIC), (255, 127,255), 3)
            DetectSIIC.remove((x,y))

    cv2.putText(_, f"SIIC: {CountSIIC}",(450,70),cv2.FONT_HERSHEY_COMPLEX, 1,(0,0,255),3)

    cv2.imshow('SIIC System Counter', _)
    
    if cv2.waitKey(1)==27:
        break

#Destroy All Apps SIIC
cv2.destroyAllWindows()
SIICCap.release()