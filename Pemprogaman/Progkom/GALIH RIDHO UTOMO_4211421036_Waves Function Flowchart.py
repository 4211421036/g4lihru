# nama   : GALIH RIDHO UTOMO
# NIM    : 4211421036
# Prodi  : Fisika Murni
# Topik  : Wave Energy

import matplotlib.pyplot as plt
import numpy as np

'''
Latex Catatan Buat Saya
>>> diawali $ dan diakhiri $
>>> \frac{}{} = pembagian a / b
>>> \cos = cos()
>>> \sin = sin()
>>> \pi = pi
>>> \sum_{i = 1}^{\ I} = Sigma i letak dibawah I letak atas
>>> \infty = tak hingga
>>> b_a = b pangkat bawah
>>> \, = spasi
Code Unicode latex
>>> \u03B1	α	
>>> \u03B2	β	
>>> \u03B3	γ	
>>> \u03B4	δ	
>>> \u03B5	ε	
>>> \u03B6	ζ	
>>> \u03B7	η	
>>> \u03B8	θ	
>>> \u03B9	ι	
>>> \u03BB	λ	
>>> \u03BF	ο	
>>> \u03C1	ρ	
>>> \u03C4	τ	
>>> \u03C6	φ	
>>> \u03C8	ψ	
>>> \u03C9	ω
'''

#konstanta 
h = 6.626e-34
m = 9.11e-31

#rentang nilai x dan L
xList = np.linspace(0, 1, 100)

L = 1

#rumus psi 
def psi(n, L, x):
    return np.sqrt(2/L) * np.sin(n * np.pi * x/L)

#rumus psi 2
def psi_2(n, L, x):
    return np.square(psi(n, L, x))

plt.figure(num='Grafik Wave Function', figsize=(15,10))
plt.suptitle("Wave Function \n"r'$\phi_n = (\frac{2}{L})^\frac{1}{2} \sin \frac{n * \pi * x}{L}$', fontsize=18)

for n in range(1, 4):
    psi2List = []
    psiList = []
    for x in xList:
        psi2List.append(psi_2(n, L, x))
        psiList.append(psi(n, L, x))
    plt.plot(xList, psiList, label=f'{n} (\u03C8)')
    plt.xlabel("L", fontsize=13)
    plt.ylabel("\u03C8", fontsize=12)
    plt.xticks(np.arange(0, 1, step=0.5))
    plt.title(f"n = {n}", fontsize=12)
    plt.grid(True)
    plt.legend(shadow=True)
    plt.plot(xList, psi2List, label=f'{n} (\u03C8 * \u03C8)')
    plt.xlabel("L\n", fontsize=12)
    plt.ylabel("\u03C8", fontsize=12)
    plt.xticks(np.arange(0, 1, step=0.5))
    plt.title(f"Rentang n = {n, n-1, n-2}", fontsize=12)
    plt.grid(True)
    plt.legend(shadow=True)

plt.tight_layout(rect=[0, 0.03, 1, 0.95])
plt.show()