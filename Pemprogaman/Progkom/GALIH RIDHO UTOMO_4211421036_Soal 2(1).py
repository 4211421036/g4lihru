#GALIH RIDHO UTOMO
#4211421036
#FISIKA MURNI
#SOAL NO 2

#Perpustakaan 
import pandas as pd
import math as mh

#Inisialisasi
x = 0 
y = 0 
g = 9.8 
t = 0 
SelangWaktudt = 0.1 

DataPengamatan = int(input("Masukan Jumlah kolom perulangan: "))

for _ in range(DataPengamatan):
    print('''
        Data yang diketahui
        x = 0 
        y = 0 
        g = 9.8 m/s**2
        t = 0 s
        selang waktudt = 0.1 s    
    ''')
    #INPUT
    KecepatanAwalBola = input("Masukan kecepatan: ")
    SudutLemparan = input("Masukan Sudut 0 - 90 derajat: ")
    if not SudutLemparan.isdigit():
        print("Masukan dalam angka")
        continue
    SudutLemparan = int(SudutLemparan)
    KecepatanAwalBola = int(KecepatanAwalBola)
    tMax = (2*(KecepatanAwalBola)*mh.sin((SudutLemparan/180)*mh.pi)/(g))
    #PROSES
    while t <= tMax:
        PosisiBolaX = (KecepatanAwalBola * mh.cos((SudutLemparan / 180) * mh.pi) / g)
        PosisiBolaY = ((KecepatanAwalBola * (mh.sin((SudutLemparan / 180) * mh.pi)) * t) - (0.5 * g *(t**2)))
        #OUTPUT
        df1 = pd.DataFrame(data=[[t, PosisiBolaX, PosisiBolaY]],columns=["t (s)", "X (m)", "Y (m)"])
        print(df1)
        t += 0.1
        print("\nSelesai Perhitungan")
