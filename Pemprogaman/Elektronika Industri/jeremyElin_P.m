k = 1;
j = 3.2284*10^-6;
b = 3.5077*10^-6;
R = 4;
l = 2.75*10^-6;
Kp = 100;    % Meningkatkan lebih lanjut untuk meningkatkan kecepatan respons
num = [Kp*k];
den = [j+b l+R (k^2+Kp)];
plant = tf(num, den);

% Simulasikan respons terhadap step function
figure;
step(plant);
title('Respons Step dengan Kontrol P Servo Motor Position');
xlabel('Waktu (s)');
ylabel('Amplitudo');
grid on;

% Tambahkan metode root locus
figure;
rlocus(plant);
title('Root Locus dari Sistem Terbuka dengan Kontrol P');
xlabel('Real Part');
ylabel('Imaginary Part');
grid on;

% Gunakan rlocfind untuk memilih titik pada root locus
[K_selected, poles_selected] = rlocfind(plant);

fprintf('K yang dipilih: %f\n', K_selected);
fprintf('Pole yang dipilih:\n');
disp(poles_selected);