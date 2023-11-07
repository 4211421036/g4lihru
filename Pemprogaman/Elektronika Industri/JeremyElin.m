m = 20000;
k = 2000000;
c = 80000;
Kp = 0.0057;
F = 500;

%kriteria desain
%overshoot <6%
%risetime <3s
%setling time <5s
%SSE 0
% Meningkatkan lebih lanjut untuk meningkatkan kecepatan respons
num = [Kp];
den = [m c k kp];
plant = tf(F*num, den);
step(plant)

% Tambahkan metode root locus
%Mp = 6%
%Tr = 3s
figure;
rlocus(plant);
title('Root Locus dari Sistem Terbuka dengan Kontrol PI');
zeta = 0.66
wn = 0.6
sgrid(zeta,wn)
[k,poles] = rlocfind(plant)
xlabel('Real Part');
ylabel('Imaginary Part');
grid on;

