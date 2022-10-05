from perpus import *

def glbb():
    print('''
        Hallo, perkenalkan saya GALIH RIDHO UTOMO
        Saya akan membantu anda dalam membuat plot posisi x dan y pada gerak parabola,
        Sebelum itu, marilah kita kenalan terlebih dahulu....
    ''')
    nama = input("Nama anda siapa? ")

    Judul = f'''
        Hallo, {nama}. Silakan Masukan Nilai
        Kecepatan Awal dan Sudut Elevasi   
    '''
    JudulAplikasi = "Data Kecepatan Awal dan Sudut Elevasi"
    KolomNama = ["Kecepatan Awal","Sudut Elevasi"]
    KolomNilai = []
    KolomNilai = multenterbox(Judul, JudulAplikasi, KolomNama)
    
    print ("Nilai yang dimasukan dalam bentuk list:", KolomNilai)

    fig, ax = subplots(num=f"GLBB | {nama}")
    g = 9.8
    time_interval = 0.001
    KecepatanAwal = float(KolomNilai[0])
    SudutElevasi = float(KolomNilai[1]) * pi / 180.0
    t = 2 * KecepatanAwal * sin(SudutElevasi) / g
    XterhadapY= KecepatanAwal * cos(SudutElevasi)*(t/2)
    YMaks=((KecepatanAwal**2) * (sin(SudutElevasi)**2))/(2 * g)
    XMaks= (KecepatanAwal**2) * sin(2 * SudutElevasi) / g
    TextWaktu="Waktu Tempuh: " + str(round(t,2)) + ' s'  
    JarakSumbuY="Titik Tertinggi: " + str(round(YMaks,2)) + ' m'
    JarakSumbuX="Jarak: " + str(round(XMaks,2)) + ' m'
    plot(XMaks, 0, 'bo')
    plot(XterhadapY, YMaks, 'ro')
    text(XterhadapY+0.1, YMaks, JarakSumbuY)
    text(XMaks+0.1, 0, JarakSumbuX)  
    text(0, 0, TextWaktu) 
                                
    t = arange(0, 0.1, 0.01)
    x = arange(0, 0.1, 0.01)
    line, = ax.plot(x, KecepatanAwal * np.sin(SudutElevasi) * x - (0.5) * g * x**2)

    def animate(i):
        line.set_linestyle("-")
        line.set_linewidth(2.5)
        line.set_color("#69ffd6")
        line.set_xdata(KecepatanAwal * cos(SudutElevasi) * (t + i /100.0))
        line.set_ydata((KecepatanAwal * sin(SudutElevasi) * (x + i /100.0)) - (0.5) * g * (x + i / 100.0)**2)
        return line,

    title("Gerak Parabola")
    axhline(0, color='black')
    axvline(0, color='black')
    xlabel('Sumbu x')
    ylabel('Sumbu y')
    axis([0, XMaks+1, 0, YMaks+1])
    legend("SH")
    grid(True)
    ax.set_autoscale_on(False)

    SimpanPlot = r"C:\Users\asus\Downloads\Grafik GLBB.gif" #Tempat Menyimpan File GIF
    GIF = FuncAnimation(fig, animate, frames = arange(1, 200), interval = 1000*time_interval)
    GIF.save(SimpanPlot, writer='imagemagick', fps=1/time_interval)
    show()

glbb()