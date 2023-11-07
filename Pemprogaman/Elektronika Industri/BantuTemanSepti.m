clear; close all; clc;

% Constants
ENCODER_CONSTANT = 1000; % For simplicity, this will be our system gain

% System dynamics (as an example, we will treat the Arduino-motor system as a first order system)
tau = 60 / 1000; % Time constant, based on the given interval
K = ENCODER_CONSTANT; % System gain

plant = tf(K, [tau, 1]); % First-order system representation

% PID controller values
Kp = 10;
Ki = 5.1;
Kd = 0.401223;

controller = pid(Kp, Ki, Kd);

closed_loop_system = feedback(controller * plant, 1);

% Simulate step response
figure;
step(closed_loop_system);
title('Step Response with Applied PID Control');
xlabel('Time (s)');
ylabel('Amplitude');
grid on;

figure;
rlocus(plant);
title('Root Locus dari Sistem Terbuka dengan Kontrol PID');
xlabel('Real Part');
ylabel('Imaginary Part');
grid on;

% Gunakan rlocfind untuk memilih titik pada root locus
[K_selected, poles_selected] = rlocfind(plant);

fprintf('K yang dipilih: %f\n', K_selected);
fprintf('Pole yang dipilih:\n');
disp(poles_selected);
