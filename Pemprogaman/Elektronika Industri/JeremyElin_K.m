k = 1;
j = 3.2284*10^-6;
b = 3.5077*10^-6;
R = 4;
l = 2.75*10^-6;

num = [k];
den = [j+b l+R (k^2)];
plant = tf(num, den);

% Simulasikan respons terhadap step function
figure;
step(plant);
title('Respons Step dengan Kontrol Servo Motor Position');
xlabel('Waktu (s)');
ylabel('Amplitudo');
grid on;
