%   NANOSPHERESPECSTAT - Light extinction, scattering, and absorbtion of
%   metallic nanosphere.
%    For a metallic nanosphere and an incoming plane wave, this program
%    computes the extinction, scattering, and absorbtion cross section
%    for different light wavelengths within the quasistatic approximation,
%    and compares the results with Mie theory.

%%  initialization
%  options for BEM simulation
op = bemoptions( 'sim', 'stat', 'interp', 'curv' );
%  table of dielectric functions
epstab = { epsconst( 1.33 ^ 2 ), epstable( 'gold.dat' ) };

%%  setting geometry of nanosphere
%  diameter of sphere
%d = 5;
for a = 1 : 2
dia = 5 * a;
%  points of triangulations
n = 400;

%  looping over points of triangulations
%points1 = [ 32; 60; 144; 169; 225; 256; 289; 324; 361; 400 ];
%points2 = [ 441; 484; 529; 576; 625; 676; 729; 784; 841; 900 ];
%points3 = [ 961; 1024; 1225; 1444 ];
%points = [ points1; points2; points3 ];

%for a = 1 : length( points )
%n = points( a );
    
%  initializing sphere
nanosphere = trisphere( n, dia );
%  set up comparticle object
p = comparticle( epstab, { nanosphere }, [ 2, 1 ], 1, op );

%  plot sphere
figure( 1 )
    %plot( p, 'EdgeColor', 'b' );
    plot( p );
%  file name
file = [ 'AuNP, D ', num2str( dia ), 'nm - stat.jpg' ];
%file = [ 'AuNP, D ', num2str( dia ), 'nm - ', num2str( n ), 'stat.jpg' ];

%  save figure
%saveas ( gcf, file );

%%  BEM simulation
%  set up BEM solver
bem = bemsolver( p, op );

% wavelength of interest
x1 = 200 ; %start
x2 = 1100 ; %finish
res = 0.5 ; %resolution

%  plane wave excitation
exc = planewave( [ 1, 0, 0; 0, 1, 0 ], [ 0, 0, 1; 0, 0, 1 ], op );
%  light wavelength in vacuum
enei = linspace( x1, x2, ( x2 - x1 ) / res );
%  allocate extinction, scattering, and absorbtion cross sections
ext = zeros( length( enei ), 2 );
sca = zeros( length( enei ), 2 );
abs = zeros( length( enei ), 2 );
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
ext_x = [ wl( ext_locs_x ), ext_pks_x ];
ext_y = [ wl( ext_locs_y ), ext_pks_y ];

%  scattering peak analysis
[ sca_pks_x, sca_locs_x ] = findpeaks( sca( :, 1 ) );
[ sca_pks_y, sca_locs_y ] = findpeaks( sca( :, 2 ) );
sca_x = [ wl( sca_locs_x ), sca_pks_x ];
sca_y = [ wl( sca_locs_y ), sca_pks_y ];

%  absorption peak analysis
[ abs_pks_x, abs_locs_x ] = findpeaks( abs( :, 1 ) );
[ abs_pks_y, abs_locs_y ] = findpeaks( abs( :, 2 ) );
abs_x = [ wl( abs_locs_x ), abs_pks_x ];
abs_y = [ wl( abs_locs_y ), abs_pks_y ];

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
peakinfo = [ ext_x; empty; ext_y; empty; sca_x; empty; sca_y; empty; abs_x; empty; abs_y; empty; mieext; empty; miesca; empty; mieabs ];
emptyrow = size( peakinfo );
emptyrow = zeros ( length( enei ) - emptyrow( 1, 1 ), 2);
peakinfo = [ peakinfo; emptyrow ];

%%  save data
%  all data
data = [ wl, ext, sca, abs, mie_ext, mie_sca, mie_abs, peakinfo];

%  file name
file = [ 'AuNP, D ', num2str( dia ), 'nm - stat.txt' ];
%file = [ 'AuNP, D ', num2str( dia ), 'nm - ', num2str( n ), 'stat.txt' ];

%   save data
save ( file, 'data', '-ascii' );

close ALL;

end