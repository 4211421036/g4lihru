kp = 30;
ki = 70;
num = [kp ki];
den = [1 10 20+kp ki];
t=0:0.012:30;
step(num, den, t);