#GALIH RIDHO UTOMO
#4211421036
#FISIKA MURNI
#SOAL NO 1 Menentukan Zodiak

print ('''
Menentukan Zodiak Menggunakan Python 
berdasarkan bulan dan tanggal
''')


hari = int(input("Saya lahir pada tanggal: "))
bulan = input("saya lahir pada Bulan (contoh: Maret, maret, April, april,...): ")
if bulan == 'desember' or bulan == 'Desember':
 zodiak = 'Sagittarius' if (hari < 22) else 'Capricorn'
elif bulan == 'januari' or bulan == 'Januari':
 zodiak= 'Capricorn' if (hari < 20) else 'Aquarius'
elif bulan == 'februari' or bulan == 'Februari':
 zodiak = 'Aquarius' if (hari < 19) else 'Pisces'
elif bulan == 'maret' or bulan == 'Maret':
 zodiak = 'Pisces' if (hari < 21) else 'Aries'
elif bulan == 'april' or bulan == 'April':
 zodiak = 'Aries' if (hari < 20) else 'Taurus'
elif bulan == 'mei' or bulan == 'Mei':
 zodiak = 'Taurus' if (hari < 21) else 'Gemini'
elif bulan == 'juni' or bulan == 'Juni':
 zodiak = 'Gemini' if (hari < 21) else 'Cancer'
elif bulan == 'juli' or bulan == 'Juli':
 zodiak = 'Cancer' if (hari < 23) else 'Leo'
elif bulan == 'agustus' or bulan == 'Agustus':
 zodiak = 'Leo' if (hari < 23) else 'Virgo'
elif bulan == 'september' or bulan == 'September':
 zodiak = 'Virgo' if (hari < 23) else 'Libra'
elif bulan == 'oktober' or bulan == 'Oktober':
 zodiak = 'Libra' if (hari < 23) else 'Scorpio'
elif bulan == 'november' or bulan == 'November':
 zodiak = 'scorpio' if (hari < 22) else 'Sagittarius'

print("\nZodiak Anda Adalah :",zodiak)
print ('''
Selamat anda telah mengetahui zodiak anda
''')
