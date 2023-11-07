num = [1 7];
k = 1.3862;
den = conv(conv([1, 0], [1, 5]), conv([1, 15], [1, 20]));
[num1, den1] = cloop(k*num, den);
step(num1, den1);