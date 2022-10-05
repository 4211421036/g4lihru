# GALIH RIDHO UTOMO
# 4211421036
# Fisika Murni
# Project Menyelesaikan soal penyetaraan reaksi

from sympy import Matrix, lcm
from kimia import *

Reaktan = Reaktan.replace(' ', '').split("+")
Produk = Produk.replace(' ', '').split("+")
            
for i in range(len(Reaktan)):
    PenguraiSenyawa(Reaktan[i], i, 1)
for i in range(len(Produk)):
    PenguraiSenyawa(Produk[i], i + len(Reaktan),-1)

ElemenMatrix = Matrix(ElemenMatrix)
ElemenMatrix = ElemenMatrix.transpose()
Solusi = ElemenMatrix.nullspace()[0]
Perkalian = lcm([val.q for val in Solusi])
Solusi = Perkalian * Solusi
Koefisien = Solusi.tolist()
Hasil = ("") #Turple hasil tidak bisa diubah

for i in range(len(Reaktan)):
    Hasil+= str(Koefisien[i][0]) + Reaktan[i]
    if i < len(Reaktan) - 1:
       Hasil+= (" + ")
Hasil+= (" -> ")
for i in range(len(Produk)):
   Hasil+= str(Koefisien[i + len(Reaktan)][0]) + Produk[i]
   if i < len(Produk) - 1:
       Hasil+= " + "
print(f'''\nHasil penyetaraan kimia sebagai berikut: 
{Hasil}
''')