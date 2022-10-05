#GALIH RIDHO UTOMO
#4211421036
#FISIKA MURNI
#SOAL NO 1 Menentukan Operasi Bilangan

def tambah(x, y):
   return x + y

def kurang(x, y):
   return x - y

def kali(x, y):
   return x * y

def bagi(x, y):
   return x / y

print('''Pilih Operasi berikut
1. Tambah
2. Kurang
4. Kali
5. Kompleks''')

pilihan = input("Silakan pilih pilihan: 1, 2, 3, 4, or 5: ")

if pilihan == '1':
    num1 = int(input("Masukan angka pertama: "))
    num2 = int(input("Masukan angka kedua: "))
    print(num1,"+",num2,"=", tambah(num1,num2))

elif pilihan == '2':
    num1 = int(input("Masukan angka pertama: "))
    num2 = int(input("Masukan angka kedua: "))
    print(num1,"-",num2,"=", kurang(num1,num2))

elif pilihan == '3':
    num1 = int(input("Masukan angka pertama: "))
    num2 = int(input("Masukan angka kedua: "))
    print(num1,"*",num2,"=", kali(num1,num2))

elif pilihan == '4':
    num1 = int(input("Masukan angka pertama: "))
    num2 = int(input("Masukan angka kedua: "))
    print(num1,"/",num2,"=", bagi(num1,num2))
elif pilihan == '5':
    komplek = complex(input())
    print(komplek.real, komplek.imag)
else:
   print("Tidak ada pilihan")
