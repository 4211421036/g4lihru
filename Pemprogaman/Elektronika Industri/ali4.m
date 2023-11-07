m = 500000;
b = 2046

s = tf('s');
% Meningkatkan lebih lanjut untuk meningkatkan kecepatan respons
num = [1];
den = [m b];
plant = tf(num, den);
% Simulasikan respons terhadap step function
figure;
step(plant);
title('Respons Step tanpa kontrol');
xlabel('Waktu (s)');
ylabel('Amplitudo');
grid on;
