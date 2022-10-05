# GALIH RIDHO UTOMO
# 4211421036
# Fisika Murni
# Project Menyelesaikan soal elektronik analog dan glbb

from MyPhy import *

nama = input("Kenalan yuk, siapa nama anda: ")

print(f'''
    Hallo, {nama}
        Salam Kenal nama ku Galih Ridho Utomo, ada yang bisa saya bantu buat anda? 
        Silakan pilih 
        1. Bantu dong, Galih mengenai Voltage Divider
        2. Bantu dong, Galih mengenai GLBB
        3. Bantu dong, Galih mengenai Kapasitor Induktor
    
    Silakan masukan soal yang ingin diselesaikan
''')

pilihan = input(f"Silakan Masukan Pilihan, {nama}: ")

if pilihan == "1":
    print("Persoalan Tegangan Pembagi\n")
    tulvoldiv()
 
elif pilihan == "2":
    print("Persoalan Gerak Parabola\n")
    tulglbb()
elif pilihan == "3":
    print("Persoalan Capasitor Induktor\n")
    capin()

else:
    print(f'''
    Mohon maaf pilihan yang {nama}, yaitu {pilihan} tidak ada dipilihan, 
    kami akan mengembang fitur lebih lanjut, Terima kasih!\n''')