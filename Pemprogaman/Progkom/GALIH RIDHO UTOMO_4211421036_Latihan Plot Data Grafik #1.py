from perpus import *

sx = float(input("Masukan nilai sudut awalan: "))
sf = float(input("Masukan angka yang dijadikan stop sebagai nilai kali pi: "))
steps = float(input("Masukan nilai tiap step sudut: "))
bts = pow(sf, pi)

x = arange(sx, bts, steps)

fig = figure(num="Grafik Sin² (x) dan Cos² (x)")
x1 = fig.add_subplot(3, 1, 1)
x2 = fig.add_subplot(3, 1, 2)
x3 = fig.add_subplot(3, 1, 3)
subplots_adjust(
    hspace = 1
)

def update(i):
    global x
    x = delete(x, 0, 0)
    x = append(x, [x[-1] + steps])
    NilaiSin = sin(x)**2
    NilaiCos = cos(x)**2
    x1.clear()
    x2.clear()
    x3.clear()
    x1.set_title(f'Sin² (x)')
    x1.set_xlabel(f'Nilai x dari {sx} sd {sf}')
    x1.set_ylabel('Sin² (x)')
    x2.set_title(f'\nCos² (x)')
    x2.set_xlabel(f'Nilai x dari {sx} sd {sf}')
    x2.set_ylabel('Cos (x)')
    x3.set_title(f'\nSin² (x) dan Cos² (x)')
    x3.set_xlabel(f'Nilai x dari {sx} sd {sf}')
    x3.set_ylabel('Sin² (x) dan Cos² (x)')
    x1.plot(x, NilaiSin, 'r-')
    x2.plot(x, NilaiCos, 'g-')
    x3.plot(x, NilaiSin, "y-", x, NilaiCos, "b-")
    x1.legend(['sin² (x)'])
    x2.legend(['cos² (x)'])
    x3.legend(['sin² (x)', 'cos² (x)'])
    x1.grid(True)
    x2.grid(True)
    x3.grid(True)

SimpanPlot = r"C:\Users\asus\Downloads\Grafik Sin² (x) dan Cos² (x).gif" #Tempat Menyimpan File GIF
GIF = FuncAnimation(fig, update, interval=5)
GIF.save(SimpanPlot, writer='imagemagick', fps=1/5)
show()