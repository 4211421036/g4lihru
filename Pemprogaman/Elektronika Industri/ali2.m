M = 500000;
B = 2046;
Kp = 3;
kd = 8474.997716;
s = tf('s');
% Meningkatkan lebih lanjut untuk meningkatkan kecepatan respons
num = [Kp kd ];
den = [1 M+B (Kp+kd)];
plant = tf(num, den);
% Simulasikan respons terhadap step function
figure;
step(plant);
title('Respons Step dengan Kontrol PD yang disesuaikan');
xlabel('Waktu (s)');
ylabel('Amplitudo');
grid on;

% Tambahkan metode root locus
figure;
rlocus(plant);
title('Root Locus dari Sistem Terbuka dengan Kontrol PD');
xlabel('Real Part');
ylabel('Imaginary Part');
grid on;

% Gunakan rlocfind untuk memilih titik pada root locus
[K_selected, poles_selected] = rlocfind(plant);

fprintf('K yang dipilih: %f\n', K_selected);
fprintf('Pole yang dipilih:\n');
disp(poles_selected);