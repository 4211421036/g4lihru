
k = 2000000;
c = 80000;
m = 20000;
kp = 25323;
kd = 100;
ki = 100;

%kriteria desain
%overshoot <6%
%risetime <3s
%setling time <5s
%SSE 0

num = [kp];
den =  [kp m c k];
plant = tf(num, den);


% Simulasikan respons terhadap step function
figure;
step(plant);
title('Fungsi Transer');
xlabel('Waktu (s)');
ylabel('Amplitudo');
grid on;