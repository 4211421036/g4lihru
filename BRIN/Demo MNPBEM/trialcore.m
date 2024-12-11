
clc
clear
%  DEMOSPECRET4 - Spectrum for Au nanosphere in Ag nanocube.
%    For a Au nanosphere (diameter 35 nm) in a Ag nanocube (size 100 nm)
%    and an incoming plane wave with a polarization along x or y, this
%    program the scattering cross section for different light wavelengths
%    using the full Maxwell equations.  For an experimental realization see
%    G. Boris et al., J. Chem. Phys. C 118, 15356 (2014).
%
%  Runtime on my computer:  112 sec.

%%  initialization
%  options for BEM simulation
op = bemoptions( 'sim', 'ret', 'interp', 'curv' );

%  table of dielectric functions
epstab = { epsconst( 1.33^2 ), epstable('zno3.dat'), epstable('silverw.dat') };
%% shell ditipisin
%  nanosphere
d1= 5; %diameter core
p1 = trisphere( 288, d1);
d2= 20; %diameter shell %% 22-50
p2 = trisphere( 288, d2);
p = comparticle( epstab, { p1, p2}, [ 3, 2; 2, 1 ], 1, 2,op);
figure( 1 ),plot2(p,'FaceColor',[1,1,1], 'FaceAlpha',0.5);
bem = bemsolver( p, op );
%  plane wave excitation
exc = planewave( [ 1, 0, 0 ], [ 0, 0, 1], op );
%  light wavelength in vacuum
enei = linspace( 302, 800, 410 );
%  allocate scattering and extinction cross sections
% sca = zeros( length( enei ), 1);
% ext = zeros( length( enei ), 1);
abs = zeros( length( enei ), 1);
multiWaitbar( 'BEM solver', 0, 'Color', 'g', 'CanCancel', 'on' );
%  loop over wavelengths
for ien = 1 : length( enei )
  %  surface charge
  sig = bem \ exc( p, enei( ien ) ); %% error
  %  scattering and extinction cross sections
%   sca( ien, : ) = exc.sca( sig );
%   ext( ien, : ) = exc.ext( sig );
  abs( ien, : ) = exc.abs( sig );
  multiWaitbar( 'BEM solver', ien / numel( enei ) );
end
%  close waitbar
multiWaitbar( 'CloseAll' );

% %  final plot
% figure(2),
% plot( enei, sca, 'r.-',enei, ext, 'b-.',enei, abs,'g-' ,Linewidth=2);
% 
% xlabel( 'Wavelength (nm)' );
% ylabel( 'Scattering cross section (nm^2)' );
% legend('scattering', 'Extincion', 'Absorbtion');
% title ('Ag@ZnO dalam medium air')


enei=enei';
data=[enei,abs];
% Define the output file
outputFile = 'core_auzno.txt';

% Write the combined data to the output file
dlmwrite(outputFile, data, 'delimiter', '\t');  % Adjust delimiter if needed

