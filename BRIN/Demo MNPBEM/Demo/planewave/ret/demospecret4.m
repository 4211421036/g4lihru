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
epstab = { epsconst( 1 ), epstable( 'silver.dat' ), epstable( 'gold.dat' ) };

%  nanosphere
p1 = trisphere( 144, 35 );
%  rounded nanocube
p2 = tricube( 12, 100 );

%  initialize gold sphere in silver cube
p = comparticle( epstab, { p1, p2 }, [ 3, 2; 2, 1 ], 1, 2, op );

%%  BEM simulation
%  set up BEM solver
bem = bemsolver( p, op );

%  plane wave excitation
exc = planewave( [ 1, 0, 0; 0, 1, 0 ], [ 0, 0, 1; 0, 0, 1 ], op );
%  light wavelength in vacuum
enei = linspace( 300, 900, 1000 );
%  allocate scattering cross sections
abs = zeros( length( enei ), 2 );
sca = zeros( length( enei ), 2 );
ext = zeros( length( enei ), 2 );
multiWaitbar( 'BEM solver', 0, 'Color', 'g', 'CanCancel', 'on' );
%  loop over wavelengths
for ien = 1 : length( enei )
  %  surface charge
  sig = bem \ exc( p, enei( ien ) );
  %  scattering cross sections
  abs( ien, : ) = exc.absorption( sig );
  sca( ien, : ) = exc.scattering( sig );
  ext( ien, : ) = exc.extinction( sig );
  multiWaitbar( 'BEM solver', ien / numel( enei ) );
end
%  close waitbar
multiWaitbar( 'CloseAll' );
ev=1239.847./enei;
%%  final plot
plot( ev, abs, 'b-',ev, sca, 'g-',ev, ext, 'r-' );  hold on;

% xlabel( 'Wavelength (nm)' );
xlabel( 'energy (eV)' );
ylabel( 'abs cross section (nm^2)' );

legend( 'x-pol', 'y-pol' );
