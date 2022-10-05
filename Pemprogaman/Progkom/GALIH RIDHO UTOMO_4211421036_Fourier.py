# Nama  : GALIH RIDHO UTOMO
# NIM   : 4211421036
# Prodi : Fisika Murni

'''
Latex Format Catatan Buat Saya:

>>> diawali $ dan diakhiri $
>>> \frac{}{} = pembagian a / b
>>> \cos = cos()
>>> \sin = sin()
>>> \pi = pi
>>> \sum_{i = 1}^{\ I} = Sigma i letak dibawah I letak atas
>>> \infty = tak hingga
>>> b_a = b pangkat bawah
>>> \, = spasi

'''

from perpus import *
def format(m):
    return (2 / m * pi) * (1 - cos(m * pi / 3) - 3 * cos(m * pi) + 3 * cos(2 * m * pi / 3))

x = arange(-1/262, 1/262, 0.00001) 
max_m = 5000
sumY = 0
m = 1
while m <= max_m:
    n =  format(m) * sin(262 * m * pi * x)
    sumY += n/10
    m += 1

fig = figure(num='Grafik Deret Fourier')
title(r'$\sum_{1}^{\infty}b_n \ {\sin 262 n {\pi} t}$')
plot(x, sumY, label=r'$\frac{2}{n \pi}(1 - \cos \frac{n \pi}{3} + 3\, \cos n \pi - 3\, \cos \frac{2 n \pi}{3})$') #Latex Label
ax = gca()
ax.grid(True)
ax.axhline(0, color='black', lw=1.5)
ax.axvline(0, color='black', lw=1.5)
ax.set_xticklabels([r'$-\frac{...}{...}$', r'$-\frac{1}{197}$', r'$-\frac{1}{262}$', r'$-\frac{1}{393}$', r'$-\frac{1}{786}$', 0, 
                    r'$\frac{1}{786}$', r'$\frac{1}{393}$', r'$\frac{1}{262}$', r'$-\frac{1}{197}$']) #Latex Sumbu X Label
ax.spines['left'].set_position(('data', 0))
ax.spines['top'].set_color('black')
ax.spines['right'].set_color('black')
ax.spines['bottom'].set_color('black')
ax.spines['bottom'].set_position('center')
legend(shadow=True)
text(0.5, 1, 'p(t)', horizontalalignment='right',
    verticalalignment='top', transform=ax.transAxes)
grid(True)

savefig('Galih Ridho Utomo_4211421036_Grafik Deret Fourier')
show()
