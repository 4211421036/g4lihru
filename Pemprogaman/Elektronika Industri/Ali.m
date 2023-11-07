M = 500000;
B = 2046;
Kp = 500;
Ki = 3;
Kd = 500;
s = tf('s');

% Mendefinisikan kontrol PID
PID = Kp + Ki/s + Kd*s;

% Transfer function untuk sistem dengan kontrol PID
plant = PID / (M*s^2 + B*s + Kp + Ki/s + Kd*s);

% Simulasikan respons terhadap step function
figure;
step(plant);
title('Respons Step dengan Kontrol PID yang disesuaikan');
xlabel('Waktu (s)');
ylabel('Amplitudo');
grid on;
