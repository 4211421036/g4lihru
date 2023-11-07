hold off
M = 1000;
b = 50;
u = 10;
kp = 1;
ki = 1;
kd = 1;
num = [1];
den = [M b];
figure
hold;
axis([-0.6 0 -0.6 0.6]);
rlocus(num, den)
sgrid(0.6,0.36)
[kp, poles] = rlocfind(num, den)
figure
hold;
numc = [kp];
denc = [M b+kp];
t = 0:0.1:20;
step(u*numc, denc, t)
axis([0 20 0 10])
