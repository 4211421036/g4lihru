m = 500000;
b = 2046;

kp = 500;
kd = 500;
ki = 123.948818;

s = tf('s')
D = 1/(m+b*s)
G = kp+kd*s+ki/s
L = (s+45)/(s+10)
sys = (D*G*L)/(1+D*G*L)
step(sys,2000)
stepinfo(sys)

% Simulasikan respons terhadap step function
figure;
step(sys);
title('Respons Step dengan Kontrol PID yang disesuaikan');
xlabel('Waktu (s)');
ylabel('Amplitudo');
grid on;

figure;
rlocus(sys);
title('Root Locus dari Sistem Terbuka dengan Kontrol PID');
xlabel('Real Part');
ylabel('Imaginary Part');
grid on;

% Gunakan rlocfind untuk memilih titik pada root locus
[K_selected, poles_selected] = rlocfind(sys);

fprintf('K yang dipilih: %f\n', K_selected);
fprintf('Pole yang dipilih:\n');
disp(poles_selected);