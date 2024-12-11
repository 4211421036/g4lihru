%% Load 
clc
clear
%%  initialization
op = bemoptions( 'sim', 'ret', 'interp', 'curv' );
%% dielectric
epstab = { epsconst( 1.33^2 ), epstable( 'copper.dat' ), epstable( 'znobodurov.dat' ) };
% 
% %  radius of spheres
% %dis=0; 
% d=[0, 2, 4, 6, 8, 10];
% d1=5;
% d2=d1+20;
%d= [5; 10; 15; 20; 25; 30];%diameter np kecil
% s=20; % 1/2 selisih diameter

% %% different
% d1= 10;
% d= [20;30; 40; 50; 60];%diameter core
% for i = 1 : length(d)
% d2 = d(i);
% dis=0;

%distance
d1=5;
d2=d1+20;
d=[0;5;10;20];
for a = 1 : length(d)
dis=d(a);

p1 = shift( trisphere(288, d1 ), [d1/2+dis, 0,0] );
p2 = shift( trisphere(288, d2 ), [-d2/2-dis, 0,0] );
p = comparticle( epstab, { p1, p2 }, [ 2, 1; 3, 1], 1, 2, op );
plot2(p, 'FaceAlpha', 0.5)

%%  BEM simulation
%   set up BEM solver
bem = bemsolver( p, op );

%  plane wave excitation
%exc = planewave( [ 1, 0, 0; 0, 1, 0; 0, 0, 1 ], [ 0, 0, 1; 0, 0, 1; 1, 0, 0 ], op );
exc = planewave( [ 1, 0, 0 ], [ 0, 0, 1], op );

%  light wavelength in vacuum
x1 = 400 ; %start
x2 = 700 ; %finish
res = 0.25 ; %resolution


enei = linspace( x1, x2, ( x2 - x1 ) / res );
abs = zeros( length( enei ), 1 );
%  allocate wavelength
wl = zeros( length( enei ), 1 );
multiWaitbar( 'BEM solver', 0, 'Color', 'g', 'CanCancel', 'on' );
%  loop over wavelengths
for ien = 1 : length( enei )
    %  surface charge
    sig = bem \ exc( p, enei( ien ) );
    abs( ien, : ) = exc.abs( sig );
    wl( ien, : ) = enei( ien );
    multiWaitbar( 'BEM solver', ien / numel( enei ) );
end

%  close waitbar
multiWaitbar( 'CloseAll' );

%%  save data
%  all data
data = [ wl, abs];

%  file name
file = [ 'Cuzno chris, bodurov, load d1 5, d2 25, distance ', num2str( dis ), 'nm - ', 'ret.txt' ];

%   save data
save ( file, 'data', '-ascii' );

close ALL;

end
