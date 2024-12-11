%   NANOSPHERESPECRET - Light scattering, absorbtion, and extinction of
%   metallic nanosphere.
%    For a metallic nanosphere and an incoming plane wave, this program
%    computes the scattering, absorption, and extinction cross section
%    for different light wavelengths using the full Maxwell equations,
%    and compares the results with Mie theory.

%%  initialization
%  options for BEM simulation
op = bemoptions( 'sim', 'ret', 'interp', 'curv' );
%for ep = 1 : 10
%    epc = 1 + ( 0.1 * ep );
%  table of dielectric functions
epstab = { epsconst( 1.33 ^ 2 ), epstable( 'gold.dat' ) };

%%  allocate parameter
ext_x_plus = [ ];
ext_y_plus = [ ];
ext_z_plus = [ ];
sca_x_plus = [ ];
sca_y_plus = [ ];
sca_z_plus = [ ];
abs_x_plus = [ ];
abs_y_plus = [ ];
abs_z_plus = [ ];
peak_plus = [ ];

%%  setting geometry of nanosphere
%triangul = [ 676, 729, 784, 841, 900, 961, 1024, 1225, 1444 ];
%for a = 1 : 20

%  diameter of sphere
%d = [ 25; 50; 75; 100; 125; 150; 175; 200 ];
%for a = 1 : 8
%dia = d( a );
dia = 60;
%  points of triangulations
n = 144;
%n = triangul( a );
%  initializing sphere
nanosphere = trisphere( n, dia );
%  set up comparticle object
p = comparticle( epstab, { nanosphere }, [ 2, 1 ], 1, op );

%  plot sphere
figure( 1 )
plot( p, 'EdgeColor', 'b' );
%plot( p );
%  file name
file = [ 'AuNP, D ', num2str( dia ), 'nm - ret.jpg' ];
%file = [ 'AuNP, D ', num2str( dia ), 'nm - ', num2str( n ), 'ret.jpg' ];
%file = [ 'AuNP, D ', num2str( dia ), 'nm RI', num2str( epc ), ' - ', num2str( n ), 'ret.jpg' ];

%  save figure
saveas ( gcf, file );

%%  BEM simulation

%  set up BEM solver
bem = bemsolver( p, op );

% wavelength of interest
x1 = 200 ; %start
x2 = 1100 ; %finish
res = 0.5 ; %resolution

%  plane wave excitation
exc = planewave( [ 1, 0, 0; 0, 1, 0; 0, 0, 1 ], [ 0, 0, 1; 0, 0, 1 ; 1, 0, 0 ], op );
%  light wavelength in vacuum
enei = linspace( x1, x2, ( x2 - x1 ) / res );
%  allocate extinction, scattering, and absorbtion cross sections
ext = zeros( length( enei ), 3 );
sca = zeros( length( enei ), 3 );
abs = zeros( length( enei ), 3 );
%  allocate wavelength
wl = zeros( length( enei ), 1 );

multiWaitbar( 'BEM solver', 0, 'Color', 'g', 'CanCancel', 'on' );

%  loop over wavelengths
for ien = 1 : length( enei )
    %  surface charge
    sig = bem \ exc( p, enei( ien ) );
    %  extinction, scattering, and absorbtion cross sections
    ext( ien, : ) = exc.ext( sig );
    sca( ien, : ) = exc.sca( sig );
    abs( ien, : ) = exc.abs( sig );
    %  wavelength
    wl( ien, : ) = enei( ien );
    
    multiWaitbar( 'BEM solver', ien / numel( enei ) );
end

%  close waitbar
multiWaitbar( 'CloseAll' );

%%  final plot

figure( 2 )
    plot( enei, ext, '-'  );  hold on;
	plot( enei, sca, '-'  );  hold on;
	plot( enei, abs, '-'  );  hold on;
    
xlabel( 'Wavelength (nm)' );
ylabel( 'Cross section (nm^2)' );

legend( 'extinction x-pol', 'extinction y-pol', 'scattering x-pol', 'scattering y-pol', 'absorption x-pol', 'absorption y-pol' );

%%  comparison with Mie theory
%  allocate extinction, scattering, and absorbtion Mie-theory cross sections
mie_ext = zeros( length( enei ), 1 );
mie_sca = zeros( length( enei ), 1 );
mie_abs = zeros( length( enei ), 1 );

%  MIE solver
mie = miesolver( epstab{ 2 }, epstab{ 1 }, dia, op );

%  extinction, scattering, and absorbtion cross sections
for i = 1 : length( enei )
    mie_ext( i, : ) = mie.ext( enei( i ) );
    mie_sca( i, : ) = mie.sca( enei( i ) );
    mie_abs( i, : ) = mie.abs( enei( i ) ); 
end

%  BEM and Mie theory plot
plot( enei, mie_ext, 'ro' );  hold on
plot( enei, mie_sca, 'go' );  hold on
plot( enei, mie_abs, 'bo' );  hold on

legend( 'extinction x-pol', 'extinction y-pol', 'scattering x-pol', 'scattering y-pol', 'absorption x-pol', 'absorption y-pol', 'Mie theory - extinction', 'Mie theory - scattering', 'Mie theory - absorbtion' );

%%  peak analysis
%  extinction peak analysis
[ ext_pks_x, ext_locs_x ] = findpeaks( ext( :, 1 ) );
[ ext_pks_y, ext_locs_y ] = findpeaks( ext( :, 2 ) );
[ ext_pks_z, ext_locs_z ] = findpeaks( ext( :, 3 ) );
ext_x = [ wl( ext_locs_x ), ext_pks_x ]
ext_y = [ wl( ext_locs_y ), ext_pks_y ];
ext_z = [ wl( ext_locs_z ), ext_pks_z ];

%  scattering peak analysis
[ sca_pks_x, sca_locs_x ] = findpeaks( sca( :, 1 ) );
[ sca_pks_y, sca_locs_y ] = findpeaks( sca( :, 2 ) );
[ sca_pks_z, sca_locs_z ] = findpeaks( sca( :, 3 ) );
sca_x = [ wl( sca_locs_x ), sca_pks_x ];
sca_y = [ wl( sca_locs_y ), sca_pks_y ];
sca_z = [ wl( sca_locs_z ), sca_pks_z ];

%  absorption peak analysis
[ abs_pks_x, abs_locs_x ] = findpeaks( abs( :, 1 ) );
[ abs_pks_y, abs_locs_y ] = findpeaks( abs( :, 2 ) );
[ abs_pks_z, abs_locs_z ] = findpeaks( abs( :, 3 ) );
abs_x = [ wl( abs_locs_x ), abs_pks_x ];
abs_y = [ wl( abs_locs_y ), abs_pks_y ];
abs_z = [ wl( abs_locs_z ), abs_pks_z ];

%  Mie-theory extinction peak analysis
[ mie_ext_pks, mie_ext_locs ] = findpeaks( mie_ext );
mieext = [ wl( mie_ext_locs ), mie_ext_pks ];

%  Mie-theory scattering peak analysis
[ mie_sca_pks, mie_sca_locs ] = findpeaks( mie_sca );
miesca = [ wl( mie_sca_locs ), mie_sca_pks ];

%  Mie-theory absorption peak analysis
[ mie_abs_pks, mie_abs_locs ] = findpeaks( mie_abs );
mieabs = [ wl( mie_abs_locs ), mie_abs_pks ];

%  peak info display
empty = [ 0, 0; 0, 0; 0, 0 ];
%peakinfo = [ ext_x; empty; ext_y; empty; sca_x; empty; sca_y; empty; abs_x; empty; abs_y; empty; mieext; empty; miesca; empty; mieabs ];
%peakinfo = [ ext_x; empty; ext_y; empty; ext_z; empty; sca_x; empty; sca_y; empty; sca_z; empty; abs_x; empty; abs_y; empty; abs_z ];
peakinfo = [ ext_x; empty; ext_y; empty; ext_z; empty; sca_x; empty; sca_y; empty; sca_z; empty; abs_x; empty; abs_y; empty; abs_z; empty; mieext; empty; miesca; empty; mieabs ];
emptyrow = size( peakinfo );
emptyrow = zeros ( length( enei ) - emptyrow( 1, 1 ), 2);
peakinfo = [ peakinfo; emptyrow ];
%peak_plus = [ peak_plus, peakinfo ];

%%  save data
%  all data
data = [ wl, ext, sca, abs, mie_ext, mie_sca, mie_abs, peakinfo];
%data = [ wl, ext, sca, abs, peakinfo];

%  file name
file = [ 'AuNP, D ', num2str( dia ), 'nm - ret.txt' ];
%file = [ 'AuNP, D ', num2str( dia ), 'nm - ', num2str( n ), 'ret.txt' ];
%file = [ 'AuNP, D ', num2str( dia ), 'nm RI', num2str( epc ), ' - ', num2str( n ), 'ret.txt' ];

%   save data
%save ( file, 'data', '-ascii' );

close ALL;

%end

%end