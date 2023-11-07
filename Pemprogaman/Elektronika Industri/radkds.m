j = 100;
b = 80;

num = [1];
den = [j b];
plant = tf(num, den);


% Simulasikan respons terhadap step function
figure;
step(plant);
title('Respons Step setelah diberi kontrol, trial n error');
xlabel('Waktu (s)');
ylabel('Amplitudo');
grid on;