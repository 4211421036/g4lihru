kp = 50;
kd = 90;
ki = 10;
num = [kd kp ki];
den = [1 10+kd 20+kp ki];
C = pid(kp, kd);
T = feedback(C, 1);
step(num, den);