%  DEMOSPECRET1 - Light scattering of metallic nanosphere.
%    For a metallic nanosphere and an incoming plane wave, this program
%    computes the scattering cross section for different light wavelengths
%    using the full Maxwell equations, and compares the results with Mie
%    theory.
%
%  Runtime on my computer:  7.4 sec.

%%  initialization
%  options for BEM simulation
op = bemoptions( 'sim', 'ret', 'interp', 'curv' );

%  table of dielectric functions
%epstab = { epsconst( 1 ), epstable( 'gold.dat' ) };
epstab = { epsconst( 1.33^2 ), epstable( 'zno_query.dat' ) };
%  diameter of sphere
diameter = 40;
%  initialize sphere
p = comparticle( epstab, { trisphere( 144, diameter ) }, [ 2, 1 ], 1, op );

%%  BEM simulation
%  set up BEM solver
bem = bemsolver( p, op );

%  plane wave excitation
exc = planewave( [ 1, 0, 0 ], [ 0, 0, 1], op );
%  light wavelength in vacuum
enei = linspace( 300, 800, 410 );
%  allocate scattering and extinction cross sections
sca = zeros( length( enei ), 1);
ext = zeros( length( enei ), 1);
abs = zeros( length( enei ), 1);

multiWaitbar( 'BEM solver', 0, 'Color', 'g', 'CanCancel', 'on' );
%  loop over wavelengths
for ien = 1 : length( enei )
  %  surface charge
  sig = bem \ exc( p, enei( ien ) );
  %  scattering and extinction cross sections
%   sca( ien, : ) = exc.sca( sig );
%   ext( ien, : ) = exc.ext( sig );
  abs( ien, : ) = exc.abs( sig );
  
  multiWaitbar( 'BEM solver', ien / numel( enei ) );
end
%  close waitbar
multiWaitbar( 'CloseAll' );

%%  final plot
figure(1),plot(enei,ext,'r-',enei,abs,'b-', linewidth=2 );  
legend ('extinction', 'absoption');
xlabel( 'Wavelength (nm)' );
ylabel( 'Scattering cross section (nm^2)' );
title ('silver dalam medium air')

enei=enei';
data=[enei,abs];
% Define the output file
outputFile = 'zno.txt';

% Write the combined data to the output file
dlmwrite(outputFile, data, 'delimiter', '\t');  % Adjust delimiter if needed