%  DEMOSPECRET11 - Scattering spectra for two nanospheres in layer.
%    For two metallic nanospheres with a diameter of 8 nm and a 1 nm gap,
%    embedded inside a 10 nm thick glass layer on top of a substrate, and
%    an incoming plane wave, this program computes the scattering spectrum
%    using the full Maxwell equations.
%
%  Runtime on my computer:  2 min.
clc
clear
%%  initialization
%  table of dielectric functions
op = bemoptions( 'sim', 'ret', 'interp', 'curv' );
epstab = { epsconst( 1.33^2 ), epstable( 'znwe.dat' ), epstable( 'zno3.dat' ) };

%  radius of spheres
a1 =80;%tengah
a2= 80;
dis=0; %embedding(-), jarak(+)
%  extrude polygon to nanoparticle
p1 = shift( trisphere(288, a1 ), [a1/2+dis, 0,0] );
p2 = shift( trisphere(288, a2 ), [-a2/2-dis, 0,0] );
p = comparticle( epstab, { p1, p2 }, [ 2, 1; 3, 1], 1, 2, op );

%  set up COMPARTICLE objects

figure(1),plot2(p,'FaceColor',[1,1,1],'FaceAlpha',0.5)
%%  BEM simulation
%   set up BEM solver
bem = bemsolver( p, op );

%  plane wave excitation
exc = planewave( [ 1, 0, 0; 0, 1, 0; 0, 0, 1 ], [ 0, 0, 1; 0, 0, 1; 1, 0, 0 ], op );
enei = linspace( 302, 800, 410);
%  allocate scattering and extinction cross sections
% sca = zeros( length( enei ), 3 );
% ext = zeros( length( enei ), 3 );
abs = zeros( length( enei ), 3 );
%  loop over wavelengths
multiWaitbar( 'BEM solver', 0, 'Color', 'b', 'CanCancel', 'on' );
for ien = 1 : length( enei )
  %  surface charge
  sig = bem \ exc( p, enei( ien ) );
  %  scattering and extinction cross sections
%   sca( ien, : ) = exc.sca( sig );
%   ext( ien, : ) = exc.ext( sig );
  abs( ien, : ) = exc.abs( sig );
   multiWaitbar( 'BEM solver', ien / numel( enei ) );
end
multiWaitbar( 'CloseAll' );
% 
% %%  final plot
% % %figure(2),plot(enei, abs(:,2),'g-');
% % figure(2),plot( enei, abs(:,1),'r-',enei, abs(:,2),'g-',enei, abs(:,3),'b-');
% % xlabel( 'Wavelength (nm)' );
% % ylabel( 'Scattering cross section (nm^2)' );
enei=enei';
data=[enei,abs];
% % Define the output file
outputFile = 'load_znzno_80.txt';

% Write the combined data to the output file
dlmwrite(outputFile, data, 'delimiter', '\t');  % Adjust delimiter if needed