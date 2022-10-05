#GALIH RIDHO UTOMO
#4211421036
#FISIKA MURNI
#Latihan Coding Topik List & Tuple

#Perpustakaan 
from tabulate import tabulate

#Inisialisasi
g = 9.8 
t = 0 
KecepatanAwal = 15
Ketinggian = 1
SelangWaktudt = 0.001

V0 = [15]
tinggian = [1]
DataUser = [] 
DataSoal = []

#OUTPUT SOAL
print('''
        Data yang diketahui
        Kecepatan Awal 15 m/s
        Ketinggian 1 m
        g = 9.8 m/s**2
        t = 0 s
        selang waktudt = 0.001 s

        Apakah anda ingin menyelesaikan dengan cara perhitungan otomatis?
        1. Ya
        2. Tidak, saya ingin persoalan yang lain berbeda dengan ketinggian 
           dan kecepatan awal yang saya inginkan
        3. Menggabungkan data yang saya inginkan dengan data soal
''')

pilihan = input("Masukan pilihan penyelesaian: (1, 2 atau 3) ")

#OPTION 1
if pilihan == "1":
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
        print("\nData Perhitungan Soal\n")
        print(tabulate([['Waktu', t, 's'], ['Waktu Maksimum', ListTMax, 's'], ['Ketinggian Maksimum', ListyMax, 'm'], ['Kecepatan Maksimum', ListvMax, 'm/s']], headers=['Nama', 'Hasil', 'Satuan']))
        t += SelangWaktudt
    print("\nSehingga Kecepatan Maksimum Bola", max(ListvMax))
    print("\nSehingga Waktu Maksimum Bola", max(ListyMax))
    print("\nSelesai Perhitungan")
        

#OPTION 2
elif pilihan == "2":
    DataPengamatan = int(input("Masukan Jumlah kolom perulangan: "))
    for _ in range(DataPengamatan):
        JumlahCustom = int(input("Masukan angka 1: ")) 
        kecepatan = input("masukan kecepatan awal: ")
        if not kecepatan.isdigit():
            print("Masukan dalam angka")
        ketinggian = input("masukan ketinggian awal: ")
        if not ketinggian.isdigit():
            print("Masukan dalam angka")
        for CaraKu in range(JumlahCustom):
            ListCustomV = [kecepatan]
            ListCustomT = [ketinggian] 
            DataUser.append(ListCustomV)
            DataUser.append(ListCustomT)
            print("\nData sesaat sebelum dilemparkan")
            print(tabulate([['Kecepatan Awal', ListCustomV, 'm/s'], ['Ketinggian Maksimum', ListCustomT, 'm']], headers=['Nama', 'Hasil', 'Satuan']))
            print("\nHasil penambahan berupa list", DataUser)
    print("\nSehingga Kecepatan Maksimum Bola yang di custom yaitu", max(ListCustomV), "m/s")
    print("\nSehingga Ketinggian Maksimum Bola yang di custom yaitu", max(ListCustomT), "m")
    print("\nSelesai Perhitungan")

elif pilihan == "3":     
    DataPengamatan = int(input("Masukan Jumlah kolom perulangan: "))
    for _ in range(DataPengamatan):
        JumlahCustom = int(input("Masukan angka 1: ")) 
        kecepatan = input("masukan kecepatan awal: ")
        if not kecepatan.isdigit():
            print("Masukan dalam angka")
        ketinggian = input("masukan ketinggian awal: ")
        if not ketinggian.isdigit():
            print("Masukan dalam angka")
        for CaraKu in range(JumlahCustom):
            ListCustomV = [kecepatan]
            ListCustomT = [ketinggian] 
            DataUser.append(ListCustomV)
            DataUser.append(ListCustomT)
            V0.insert(15, ListCustomV)
            tinggian.insert(1, ListCustomT)
            print("\nData gabungan")
            print(tabulate([['Kecepatan Awal', ListCustomV, 'm/s'],['Kecepatan Awal', V0, 'm/s'], ['Kecepatan Awal (Modifikasi)', V0, 'm/s'], ['Ketinggian Maksimum', ListCustomT, 'm'], ['Ketinggian (Modifikasi)', tinggian, 'm']], headers=['Nama', 'Hasil', 'Satuan']))
            print("\nHasil penambahan berupa list", DataUser)
    print("\nSehingga Kecepatan Maksimum Bola yang di gabungan yaitu", max(ListCustomV), "m/s")
    print("\nSehingga Ketinggian Maksimum Bola yang di custom yaitu", max(ListCustomT), "m")
    print("\nSelesai Perhitungan")

else:
    print("Mohon maaf angka anda tidak ada dalam pilihan")
