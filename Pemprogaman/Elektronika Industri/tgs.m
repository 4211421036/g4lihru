F = 20; % Ns/m
K = 17; % N
h_0 = 1; % M

num = [1];
den = [K/(2*F*sqrt(h_0)) 1/F];
plant = tf(num, den);

Kp = 1.026582;
Ki = 0.851861;
Kd = 1.232589;

controller = pid(Kp, Ki, Kd); % Kontrol PID
closed_loop_system = feedback(controller * plant, 1);

% Simulasikan respons terhadap step function
figure;
step(closed_loop_system);
title('Respons Step dengan Kontrol PID pada Water Level System');
xlabel('Waktu (s)');
ylabel('Amplitudo');
grid on;

% Tambahkan metode root locus
figure;
rlocus(closed_loop_system);
title('Root Locus dari Sistem Terbuka dengan Kontrol PID');
xlabel('Real Part');
ylabel('Imaginary Part');
grid on;

% Gunakan rlocfind untuk memilih titik pada root locus
[K_selected, poles_selected] = rlocfind(closed_loop_system);

fprintf('K yang dipilih: %f\n', K_selected);
fprintf('Pole yang dipilih:\n');
disp(poles_selected);