% Tentukan transfer function sistem
num = [1]; 
den = [1 2 1]; 
plant = tf(num, den);

% Tentukan parameter kontrol PID
Kp = 2.1;    % Meningkatkan lebih lanjut untuk meningkatkan kecepatan respons
Ki = 2.5;  % Mengurangi sedikit lebih lanjut untuk mencegah osilasi
Kd = 8.3;    % Meningkatkan lebih lanjut untuk meningkatkan damping

controller = pid(Kp, Ki, Kd);
closed_loop_system = feedback(controller * plant, 1);

% Simulasikan respons terhadap step function
figure;
step(closed_loop_system);
title('Respons Step dengan Kontrol PID yang disesuaikan');
xlabel('Waktu (s)');
ylabel('Amplitudo');
grid on;
