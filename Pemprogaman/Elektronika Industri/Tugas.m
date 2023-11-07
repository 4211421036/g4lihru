J=0.01;
b=0.1;
K=0.01;
R=1;
L=0.5;
num=K;
den=[(J*L) ((J*R)+(L*b)) ((b*R)+K^2)];

z1=1;
p1=0.01;
numa = [1 z1];
dena = [1 p1];
numb=conv(num,numa);
denb=conv(den,dena);

rlocus(numb,denb)
sgrid(.8,0)
sigrid(2.3)
title('Root Locus with a lag controller')
[k,poles]=rlocfind(numb,denb);
[numc,denc]=cloop(k*numb,denb,-1);
t=0:0.01:3;
step(numc,denc,t)
title(['Step response with a lag controller, gain = ' num2str(k)])