import re

kenalan = input("Yuk kenalan, siapa nama anda: ")

print(f'''
    Hallo, {kenalan}, saya Galih akan membantu penyelesaian permasalahan 
    penyetaraan reaksi kimia menggunakan metode matriks

    Silakan memasukan reaksi kimia yang ingin direaksikan sebagai contoh

        >>> Reaktan Ca(OH)2     + H3PO4
        >>> Produk  Ca3(PO4)2   + H2O
        >>> 3Ca(OH)2 + 2H3PO4 -> 1Ca3(PO4)2 + 6H2O

    Saya harap, {kenalan} bisa paham metode penyelesaian penyetaraan reaksi
    kimia menggunakan matriks
''')

ElemenList = []
ElemenMatrix = []
Reaktan = input("Masukan reaktan reaksi kimia: ")
Produk = input("Masukan produk reaksi kimia: ")

def NambahMatrik(Element, index, Hitung, side):
    if(index == len(ElemenMatrix)):
       ElemenMatrix.append([])
       for x in ElemenList:
            ElemenMatrix[index].append(0)
    if(Element not in ElemenList):
        ElemenList.append(Element)
        for i in range(len(ElemenMatrix)):
            ElemenMatrix[i].append(0)
    Kolom = ElemenList.index(Element)
    ElemenMatrix[index][Kolom]+= Hitung * side
    
def CariElemen(segment,index, kali, side):
    ElementDanAngka = re.split('([A-Z][a-z]?)',segment)
    i = 0
    while(i < len(ElementDanAngka) - 1):
          i+= 1
          if(len(ElementDanAngka[i]) > 0):
            if(ElementDanAngka[i + 1].isdigit()):
                Hitung = int(ElementDanAngka[i+1])* kali
                NambahMatrik(ElementDanAngka[i], index, Hitung, side)
                i+= 1
            else:
                NambahMatrik(ElementDanAngka[i], index, kali, side)

def PenguraiSenyawa(Senyawa, index, side):
    segments = re.split('(\([A-Za-z0-9]*\)[0-9]*)',Senyawa)
    for segment in segments:
        if segment.startswith("("):
            segment = re.split('\)([0-9]*)', segment)
            kali = int(segment[1])
            segment = segment[0][1:]
        else:
            kali = 1
        CariElemen(segment, index, kali, side)