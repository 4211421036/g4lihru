num = [-7];
den = [0 -5 -15 -20];
sys = tf(num, den);
rlocus(sys);
sgrid(0.69, 1.8);
[k, pole] = rlocfind(sys);
disp(['Gain for the selected point is: ', num2str(k)]);