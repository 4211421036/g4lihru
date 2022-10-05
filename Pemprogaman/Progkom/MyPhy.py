import numpy as np
import matplotlib.pyplot as plt
import PySpice.Logging.Logging as Logging

from pylab import *
from tabulate import tabulate
from PySpice.Doc.ExampleTools import find_libraries
from PySpice.Probe.Plot import plot
from PySpice.Spice.Library import SpiceLibrary
from PySpice.Spice.Netlist import Circuit
from PySpice.Unit import *
from scipy.optimize import curve_fit
from PIL import Image, ImageDraw, ImageFont

logger = Logging.setup_logging()
libraries_path = find_libraries()
spice_library = SpiceLibrary(libraries_path)

def tulvoldiv():
    print("Soal anda dan jawaban akan diselesaikan dan ditampilkan berupa buku\n")
    soal = input("Silakan ketik persoalan anda: ")
    Vin = input("Masukan V input: ")
    VRinInput = input("Masukan V input R: ")
    VRinOut = input("Masukan V input R keluaran: ")
    if not Vin.isdigit():
        print("Masukan dalam angka")
    if not VRinInput.isdigit():
        print("Masukan dalam angka")
    Vin = int(Vin)
    VRinInput = int(VRinInput)
    if not VRinOut.isdigit():
        print("Masukan dalam angka")
    VRinOut = int(VRinOut)
    circuit = Circuit('Voltage Divider')

    circuit.V('input', 'in', circuit.gnd, Vin)
    circuit.R(1, 'in', 'out', VRinInput)
    circuit.R(2, 'out', circuit.gnd, VRinOut)
    
    mytemp = input("Masukan temperature: ")
    mintemp = input("Masukan minimal temperature: ")
    simulator = circuit.simulator(temperature = mytemp , nominal_temperature = mintemp)

    analysis = simulator.operating_point()
    t = 0
    g = 9.8
    SelangWaktudt = 0.1
    cepat = input("Masukan kecepatan: ")
    if not cepat.isdigit():
        print("Masukan dalam angka")
    cepat = int(cepat)
    element_types = ('capacitor', 'inductor')
    waktuMa = cepat / g
    while t <= waktuMa:
        for node in (analysis['in'], analysis.out): 
            print('\nNode {}: {} V'.format(str(node), float(node)))
        t+=SelangWaktudt

    img = Image.open(r'C:\Users\asus\public\Elan\kertas.jpg') #Cari tempat beranda font nya

    MyTxt = ImageDraw.Draw(img)

    myFont = ImageFont.truetype(r'C:\Users\asus\public\Elan\Chellin.ttf', 44)

    MyTxt.text((220, 180), f'{soal}\n {simulator}', fill =(31, 51, 82),font=myFont)

    # show and save the image
    img.show()
    img.save("Tegangan Pembagi.png")
    
    print("\nTabel Kebenaran\n",tabulate([['0', '0', '0'],['0', '1', '1'], ['1', '0', '1'], ['1', '1', '1']], headers=['A', 'B', 'AB = A + B']))
    return

def tulglbb():
    g = (9.8) 
    t = 0 
    KecepatanAwal = input("Masukan Kecepatan Awal: ")
    Ketinggian = input("Masukan Ketinggian: ")
    SelangWaktudt = 0.001
    if not KecepatanAwal.isdigit():
        print("Masukan dalam angka")
    if not Ketinggian.isdigit():
        print("Masukan dalam angka")
    KecepatanAwal = int(KecepatanAwal)
    Ketinggian = int(Ketinggian)
    V0 = [KecepatanAwal]
    DataSoal = []

    #OUTPUT SOAL
    print(f'''
            Data yang diketahui
            g               = {g} m/s**2
            t               = {t} s
            selang waktudt  = {t} s
            KecepatanAwal   = {V0}
            Ketinggian      = {Ketinggian}
        Apakah anda menginginkan output berupa apa?
        1. Langsung berupa tabel
        2. Buku Tulis
        3. Grafik
    ''')
    pilihan = input("Masukan pilihan output: (1, 2 atau 3) ")
    if pilihan == "1":
        y = Ketinggian + KecepatanAwal * t - (g * t**2) / 2
        tMax = KecepatanAwal / g
        v = KecepatanAwal - g*t
        while t <= tMax:
            ListyMax = [y]
            ListvMax = [v]
            ListTMax = [tMax]
            DataSoal.append(ListyMax)
            DataSoal.append(ListvMax)
            DataSoal.append(ListTMax)
            print("\nData Perhitungan Soal\n")
            print(tabulate([['Waktu', t, 's'], ['Waktu Maksimum', ListTMax, 's'], ['Ketinggian Maksimum', ListyMax, 'm'], ['Kecepatan Maksimum', ListvMax, 'm/s']], headers=['Nama', 'Hasil', 'Satuan']))
            t += SelangWaktudt
        print("\nSehingga Kecepatan Maksimum Bola", max(ListvMax))
        print("\nSehingga Waktu Maksimum Bola", max(ListyMax))
        print("\nSelesai Perhitungan")
            
    #OPTION 2
    elif pilihan == "2":
        y = Ketinggian + KecepatanAwal * t - (g * t **2)/2
        tMax = KecepatanAwal / g
        v = KecepatanAwal - g*t
        while t <= tMax:
            ListyMax = [y]
            ListvMax = [v]
            ListTMax = [tMax]
            DataSoal.append(ListyMax)
            DataSoal.append(ListvMax)
            DataSoal.append(ListTMax)
            t += SelangWaktudt

        if t >= tMax:
            ListyMax = [y]
            ListvMax = [v]
            ListTMax = [tMax]
            DataSoal.append(ListyMax)
            DataSoal.append(ListvMax)
            DataSoal.append(ListTMax)
            t += SelangWaktudt
        img = Image.open(r'C:\Users\asus\public\Elan\kertas.jpg') #Cari tempat beranda gambar nya

        TxtKu = ImageDraw.Draw(img)

        myFont = ImageFont.truetype(r'C:\Users\asus\public\Elan\Chellin.ttf', 40)

        TxtKu.text((220, 180), f'''
        Data yang diketahui yaitu\n
            Kecepatan Awal: {KecepatanAwal}\n 
            Ketinggian: {Ketinggian}\n
            g: {g}\n
            waktu: {t}\n
        Jawab:\n
        y = Ketinggian + KecepatanAwal . t - (g . t²) / 2 = {y} \n 
        tMax = KecepatanAwal / g = {tMax} \n 
        v = KecepatanAwal - g . t = {v}
        ''', fill =(31, 51, 82),font=myFont)

        # show and save the image
        img.show()
        img.save("GLBB.png")
        print("\nData Perhitungan Soal\n")
        print(tabulate([['Waktu', t, 's'], ['Waktu Maksimum', ListTMax, 's'], ['Ketinggian Maksimum', ListyMax, 'm'], ['Kecepatan Maksimum', ListvMax, 'm/s']], headers=['Nama', 'Hasil', 'Satuan']))

        print("\nSehingga Kecepatan Maksimum Bola", max(ListvMax))
        print("\nSehingga Waktu Maksimum Bola", max(ListyMax))
        print("\nSelesai Perhitungan")

    #OPTION 3
    elif pilihan == "3":
        g = (9.8)     
        dt = 0.001    
        N = (100)     
        vi = input("Masukan kecepatan: ")    
        xi = input("Masukan posisi sumbu x: ")    
        if not vi.isdigit():
            print("Masukan dalam angka")
        if not xi.isdigit():
            print("Masukan dalam angka")
        vi = int(vi)
        xi = int(xi)
        t = 0
        x = xi
        v = vi
        time = array([0])       
        height = array([xi])    
        velocity = array([vi])  
        
        tMax = vi / g
        while t <= tMax:
            t = t + dt
            x = x + v * dt
            v = v - g * dt
            time = append(time,t)
            height = append(height,x)
            velocity = append(velocity,v)

        if t >= tMax:
            t = t + dt
            x = x + v * dt
            v = v - g * dt
            time = append(time,t)
            height = append(height,x)
            velocity = append(velocity,v)
        plt.plot(time, height, 'ro')
        xlabel("Waktu (s)")
        ylabel("Tinggi (m)")

        plt.plot(time, xi + vi*time - 0.5*g*time**2, 'b-')
        plt.show()

    else:
        print("Mohon maaf angka anda tidak ada dalam pilihan")

def capin():
    print("Gambar Grafik Capasitor Induktor")
    figure, ((ax1, ax2), (ax3, ax4)) = plt.subplots(2, 2, figsize=(20, 10))
    figure, (ax1, ax2) = plt.subplots(2, figsize=(20, 10))
    t = 0
    g = 9.8
    SelangWaktudt = 0.1
    cepat = input("Masukan kecepatan: ")
    if not cepat.isdigit():
        print("Masukan dalam angka")
    cepat = int(cepat)
    element_types = ('capacitor', 'inductor')
    waktuMa = cepat / g
    while t <= waktuMa:
        for element_type in ('capacitor', 'inductor'):
            circuit = Circuit(element_type.title())
            source = circuit.PulseVoltageSource('input', 'in', circuit.gnd,
                                initial_value=0@u_V, pulsed_value=10@u_V,
                                pulse_width=10@u_ms, period=20@u_ms)
            circuit.R(1, 'in', 'out', 1@u_kΩ)
            if element_type == 'capacitor':
                element = circuit.C
                value = 1@u_uF
            else:
                element = circuit.L
                value = 1@u_H
            element(1, 'out', circuit.gnd, value)

            if element_type == 'capacitor':
                tau = circuit['R1'].resistance * circuit['C1'].capacitance
            else:
                tau = circuit['L1'].inductance / circuit['R1'].resistance

            simulator = circuit.simulator(temperature=25, nominal_temperature=25)
            step_time = 10@u_us
            analysis = simulator.transient(step_time=step_time, end_time=source.period*3)

            if element_type == 'capacitor':
                def out_voltage(t, tau):
                    return float(source.pulsed_value) * (1 -  np.exp(-t / tau))
            else:
                def out_voltage(t, tau):
                    return float(source.pulsed_value) * np.exp(-t / tau)
            i_max = int(5 * tau / float(step_time))
            popt, pcov = curve_fit(out_voltage, analysis.out.abscissa[:i_max], analysis.out[:i_max])
            tau_measured = popt[0]

            print('tau {0} = {1}'.format(element_type, tau.canonise().str_space()))
            print('tau measured {0} = {1:.1f} ms'.format(element_type, tau_measured * 1000))

            if element_type == 'capacitor':
                ax = ax1
                title = "Capacitor: voltage is constant"
            else:
                ax = ax2
                title = "Inductor: current is constant"
            ax.set_title(title)
            ax.grid()
            current_scale = 1000
            ax.plot(analysis['in'])
            ax.plot(analysis['out'])
            ax.plot(((analysis['in'] - analysis.out)/circuit['R1'].resistance) * current_scale)
            ax.axvline(x=float(tau), color='red')
            ax.set_ylim(-11, 11)
            ax.set_xlabel('t [s]')
            ax.set_ylabel('[V]')
            ax.legend(('Vin [V]', 'Vout [V]', 'I'), loc=(.8,.8))
            t+=SelangWaktudt
    if t >= waktuMa:
        for element_type in ('capacitor', 'inductor'):
            circuit = Circuit(element_type.title())
            source = circuit.PulseVoltageSource('input', 'in', circuit.gnd,
                                initial_value=(0@u_V), pulsed_value=(10@u_V),
                                pulse_width=(10@u_ms), period=(20@u_ms))
            circuit.R(1, 'in', 'out', 1@u_kΩ)
            if element_type == 'capacitor':
                element = circuit.C
                value = 1@u_uF
            else:
                element = circuit.L
                value = 1@u_H
            element(1, 'out', circuit.gnd, value)
    
            if element_type == 'capacitor':
                tau = circuit['R1'].resistance * circuit['C1'].capacitance
            else:
                tau = circuit['L1'].inductance / circuit['R1'].resistance

            simulator = circuit.simulator(temperature=25, nominal_temperature=25)
            step_time = 10@u_us
            analysis = simulator.transient(step_time=step_time, end_time=source.period*3)

            if element_type == 'capacitor':
                def out_voltage(t, tau):
                    return float(source.pulsed_value) * (1 -  np.exp(-t / tau))
            else:
                def out_voltage(t, tau):
                    return float(source.pulsed_value) * np.exp(-t / tau)
            i_max = int(5 * tau / float(step_time))
            popt, pcov = curve_fit(out_voltage, analysis.out.abscissa[:i_max], analysis.out[:i_max])
            tau_measured = popt[0]

            print('tau {0} = {1}'.format(element_type, tau.canonise().str_space()))
            print('tau measured {0} = {1:.1f} ms'.format(element_type, tau_measured * 1000))

            if element_type == 'Kapasistor':
                ax = ax1
                title = "Kapasistor dengan voltase konstan"
            else:
                ax = ax2
                title = "\nInduktor dengan kuat arus konstan"
            ax.set_title(title)
            ax.grid()
            current_scale = 1000
            ax.plot(analysis['in'])
            ax.plot(analysis['out'])
            ax.plot(((analysis['in'] - analysis.out)/circuit['R1'].resistance) * current_scale)
            ax.axvline(x=float(tau), color='red')
            ax.set_ylim(-11, 11)
            ax.set_xlabel('t [s]')
            ax.set_ylabel('[V]')
            ax.legend(('Vin [V]', 'Vout [V]', 'I'), loc=(.8,.8))
            t += SelangWaktudt
        plt.tight_layout()
        plt.show()
