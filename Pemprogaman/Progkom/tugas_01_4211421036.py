#Nama   : GALIH RIDHO UTOMO
#NIM    : 4211421036
#Prodi  : Fisika Murni

import math
kecepatan_awal = input("Masukan Kecepatan Awal: ")
kecepatan_awal = float(kecepatan_awal)
sudut_pelemparan = input("Masukan sudut: ")
sudut_pelemparan = float(sudut_pelemparan)
g = 9.8
t = kecepatan_awal / g
xmax = (kecepatan_awal**2 * math.sin(2 * sudut_pelemparan)) / g
ymax = (kecepatan_awal * math.sin(sudut_pelemparan))**2 / 2 * g
print("\nHitunglah ketinggian maksimum dan jarak maksimum yang dapat ditempuh oleh bola\n", "\nPembahasan yaitu: \n", "\nketinggian maksimum yaitu xmax = (kecepatan_awal**2 * math.sin(2 * sudut_pelemparan)) / g\n", xmax, "m\n", "\njarak maksimum yang dapat ditempuh oleh bola yaitu ymax = (kecepatan_awal * math.sin(sudut_pelemparan))**2 / 2 * g\n", ymax, "m\n" "\nKapan bola mecapai ketinggian maksimum yaitu pada saat\n", t, "s")
