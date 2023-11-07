R = 70;
C = 100;
Kp =  849.9466;
Kd =  849.9466;
% Meningkatkan lebih lanjut untuk meningkatkan kecepatan respons
num = [Kp R + Kd R];
den = [R C + 1 + Kp R + Kd R];
plant = tf(num, den);


% Simulasikan respons terhadap step function
figure;
step(plant);
title('Respons Step setelah diberi kontrol PI');
xlabel('Waktu (s)');
ylabel('Amplitudo');
grid on;
