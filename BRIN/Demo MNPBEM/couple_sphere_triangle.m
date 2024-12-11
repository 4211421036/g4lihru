%   COUPLE_SPHERE_TRIANGLE - Light extinction, scattering, and absorbtion of
%   coupled nanotriangle & sphere and their field enhancement
%       For a triangular and a spherical metallic nanoparticles; and an incoming
%       plane wave with a polarization along x, y, and z, this program
%       computes the extinction, scattering, and absorption cross sections
%       for different light wavelengths along with their field enhancement
%       by solving Full Maxwell's equation.

%   options for BEM simulation
op = bemoptions( 'sim', 'ret', 'interp', 'curv' );
%   table of dielectric functions
epstab = { epsconst( 1.33 ^ 2 ), epstable( 'gold.dat' ), epstable( 'gold.dat' ) };

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

for b = 1 : 5

%for c = 0 : 1

%%  setting geometry of nanotriangle
%  set edge length
%EL1 = [ 50, 80, 100 ];
edge_length_1 = 80;
%d_1 = 2 * edge_length_1 / sqrt( 3 ); %diameter of outer circle
d_1 = edge_length_1 / sqrt( 3 ); %diameter of inner circle

%  set left-to-right length
dia1_1 = edge_length_1 * sqrt( 3 ) / 2; %triangle with fixed edge length
%dia1_1 = 100; %triangle with fixed height
%  set up-to-down length
dia2_1 = edge_length_1; %triangle with fixed edge length
%dia2_1 = dia1_1 * sqrt( 3 ) / 2; %triangle with fixed height

%  set thickness
thick_1 = 10;
%  set edge discretization
nz_1 = 11;

%  set rounding/truncation parameter
roundpar_1 = b * 0.05 * edge_length_1; %fixed rounding radius
%roundpar_1 = b * 5 / sqrt( 3 ) ; %truncation
%roundpar_1 = edge_length_1 / ( ( 9 / 2 ) * sqrt( 3 ) ); %truncation
roundnum_1 = 7; %fixed rounding points
%rotdeg_1 = -90; %fixed rotating degree

%  initializing triangle
triangle_1 = polygon( 3, 'size', [ dia1_1, dia2_1 ] );
%triangle_1 = polygon( [ xm1, ym1; xm2, ym2; xm3, ym3; xm4, ym4; xm5, ym5; xm6, ym6 ] );

%  rounding/truncating
%triangle_1 = round( triangle_1 ); %rounding
%triangle_1 = round( triangle_1, 'rad', roundpar_1 ); %rounding with radius
%triangle_1 = round( triangle_1, 'nrad', roundnum_1 ); %rounding with points
%triangle_1 = round( triangle_1, 'edge', [ 1, 2 ] ); %masking for edges that rounded
triangle_1 = round( triangle_1, 'rad', roundpar_1, 'nrad', roundnum_1 );
%triangle_1 = round( triangle_1, 'rad', roundpar_1, 'nrad', roundnum_1, 'edge', [ 1, 2 ] );
%triangle_1 = rot( triangle_1, rotdeg_1 ); %rotating polygon in degree

%  edge profile
edge_1 = edgeprofile( thick_1, nz_1 );
%  extrude polygon to nanoparticle
[ p1, triangle_1 ] = tripolygon( triangle_1, edge_1 );

%%  setting geometry of nanosphere

%   diameter of sphere
%diameter2 = [ 25; 50; 75; 100; 125; 150; 175; 200 ];
dia_2 = 20;
%   points of triangulations
%triangul2 = [ 32, 60, 144, 169, 225, 256, 289, 324, 361, 400, 441, 484, 529, 576, 625, 676, 729, 784, 841, 900, 961, 1024, 1225, 1444 ];
n_2 = 144;

%   initializing sphere
[ sphere_2 ] = trisphere( n_2, dia_2 );

%%  coupling nanoparticles

%  left triangle, right sphere
gap_x = 100; %gap distance in x-direction
gap_y = 0; %gap distance in x-direction
gap_z = 0; %gap distance in x-direction
sx = ( ( d_1 / 2 ) + ( dia_2 / 2 ) ) + gap_x; %shifting in x-direction
sy = 0 + gap_y; %shifting in y-direction
sz = 0 + gap_z; %shifting in z-direction
vec1 = [ - sx / 2 - ( d_1 / 4 - dia_2 / 4 ), sy, sz ]; %shift vector p1
vec2 = [ sx / 2 - ( d_1 / 4 - dia_2 / 4 ), sy, sz ]; %shift vector p2
[ p1, triangle_1 ] = deal( shift( p1, vec1 ), shift( triangle_1, vec1 ) ); %shifting triangle #1
sphere_2 = deal( shift( sphere_2, vec2 ) ); %shifting sphere #2

%  left flipped triangle, right sphere
%gap_x = c * 100; %gap distance in x-direction
%gap_y = 0; %gap distance in x-direction
%gap_z = 0; %gap distance in x-direction
%sx = ( ( dia1_1 - d_1 / 2 ) + ( dia_2 / 2 ) ) + gap_x; %shifting in x-direction
%sy = 0 + gap_y; %shifting in y-direction
%sz = 0 + gap_z; %shifting in z-direction
%vec1 = [ - sx / 2 + ( ( dia_2 / 2 - ( dia1_1 - d_1 / 2 ) ) / 2 ), sy, sz ]; %shift vector p1
%vec2 = [ sx / 2 + ( dia_2 / 2 - ( dia1_1 - d_1 / 2 ) ) / 2  , sy, sz ]; %shift vector p2
%[ p1, triangle_1 ] = deal( flip( p1, 1 ), flip( triangle_1, 1 ) ); %flipping triangle #1
%[ p1, triangle_1 ] = deal( shift( p1, vec1 ), shift( triangle_1, vec1 ) ); %shifting triangle #1
%sphere_2 = deal( shift( sphere_2, vec2 ) ); %shifting sphere #2

%  left sphere, right triangle
%gap_x = c * 100; %gap distance in x-direction
%gap_y = 0; %gap distance in x-direction
%gap_z = 0; %gap distance in x-direction
%sx = ( ( dia1_1 - d_1 / 2 ) + ( dia_2 / 2 ) ) + gap_x; %shifting in x-direction
%sy = 0 + gap_y; %shifting in y-direction
%sz = 0 + gap_z; %shifting in z-direction
%vec1 = [ sx / 2 + ( dia_2 / 2 - ( dia1_1 - d_1 / 2 ) ) / 2  , sy, sz ]; %shift vector p1
%vec2 = [ - sx / 2 + ( ( dia_2 / 2 - ( dia1_1 - d_1 / 2 ) ) / 2 ), sy, sz ]; %shift vector p2
%[ p1, triangle_1 ] = deal( shift( p1, vec1 ), shift( triangle_1, vec1 ) ); %shifting triangle #1
%sphere_2 = deal( shift( sphere_2, vec2 ) ); %shifting sphere #2

%   set up COMPARTICLE object
p = comparticle( epstab, { p1, sphere_2 }, [ 2, 1; 3, 1 ], 1, 2, op );

%   plot coupled nanoparticles
figure( 1 )
    plot( p );
    
% %   save figure 1
% %file = [ 'Au sphere-triangle, L1-', num2str( edge_length_1 ), 'nm H1-', num2str( thick_1 ), 'nm, D2-', num2str( dia_2 ) 'nm, s-', num2str( gap_x ), 'nm - ', num2str( nz_1 ), '&', num2str( n_2 ), 'ret.jpg'];
% %file = [ 'Au sphere-flipped_triangle, L1-', num2str( edge_length_1 ), 'nm H1-', num2str( thick_1 ), 'nm, D2-', num2str( dia_2 ) 'nm, s-', num2str( gap_x ), 'nm - ', num2str( nz_1 ), '&', num2str( n_2 ), 'ret.jpg'];
% file = [ 'Au triangle-sphere, L1-', num2str( edge_length_1 ), 'nm H1-', num2str( thick_1 ), 'nm, D2-', num2str( dia_2 ) 'nm, s-', num2str( gap_x ), 'nm - ', num2str( nz_1 ), '&', num2str( n_2 ), 'ret.jpg'];
% file = [ 'Au triangle-sphere, L1-', num2str( edge_length_1 ), 'nm H1-', num2str( thick_1 ), 'nm round ', num2str( roundpar_1 ), 'nm, D2-', num2str( dia_2 ) 'nm, s-', num2str( gap_x ), 'nm - ', num2str( nz_1 ), '&', num2str( n_2 ), 'ret.jpg'];
% 
% saveas( gcf, file )

%%  BEM simulation
%   set up BEM solver
bem = bemsolver( p, op );

%   wavelength of interest
x1 = 200; %start
x2 = 1100; %finish
res = 0.5; %resolution

%  plane wave excitation
exc = planewave( [ 1, 0, 0; 0, 1, 0; 0, 0, 1 ], [ 0, 0, 1; 0, 0, 1; 1, 0, 0 ], op );
%   light wavelength in vacuum
enei = linspace( x1, x2, ( x2 - x1 ) / res );

%  allocate extinction cross sections
ext = zeros( length( enei ), 3 ); %xyz
%  allocate scattering cross sections
sca = zeros( length( enei ), 3 ); %xyz
%  allocate absorption cross sections
abs = zeros( length( enei ), 3 ); %xyz
%  allocate wavelength
wl = zeros( length( enei ), 1 );

multiWaitbar( 'BEM solver', 0, 'Color', 'g', 'CanCancel', 'on' );

%  loop over wavelengths
for ien = 1 : length( enei )
    %  surface charge
    sig = bem \ exc( p, enei( ien ) );
    %  extinction cross sections
    ext( ien, : ) = exc.ext( sig );
    %  scattering cross sections
    sca( ien, : ) = exc.sca( sig );
    %  absorbance cross sectionss
    abs( ien, : ) = exc.abs( sig );
    %  wavelength
    wl( ien, : ) = enei( ien );
    
    multiWaitbar( 'BEM solver', ien / numel( enei ) );
end

%  close waitbar
multiWaitbar( 'CloseAll' );

%%  plot LSPR
figure( 2 )
    plot( enei, ext, '-'  );  hold on;
    plot( enei, sca, '-'  );  hold on;
    plot( enei, abs, '-'  );  hold on;
    
    xlabel( 'Wavelength (nm)' );
    ylabel( 'Cross section (nm^2)' );
    
    legend( 'extinction x-pol', 'extinction y-pol', 'extinction z-pol', 'scattering x-pol', 'scattering y-pol', 'scattering z-pol', 'absorption x-pol', 'absorption y-pol', 'absorption z-pol' );
% 
% %%  peak analysis
% %  extinction peak analysis
% [ ext_pks_x, ext_locs_x ] = findpeaks( ext( :, 1 ) );
% [ ext_pks_y, ext_locs_y ] = findpeaks( ext( :, 2 ) );
% [ ext_pks_z, ext_locs_z ] = findpeaks( ext( :, 3 ) );
% ext_x = [ wl( ext_locs_x ), ext_pks_x ];
% ext_x_plus = [ ext_x_plus, ext( :, 1 ) ];
% ext_y = [ wl( ext_locs_y ), ext_pks_y ];
% ext_y_plus = [ ext_y_plus, ext( :, 2 ) ];
% ext_z = [ wl( ext_locs_z ), ext_pks_z ];
% ext_z_plus = [ ext_z_plus, ext( :, 3 ) ];
% 
% %  scattering peak analysis
% [ sca_pks_x, sca_locs_x ] = findpeaks( sca( :, 1 ) );
% [ sca_pks_y, sca_locs_y ] = findpeaks( sca( :, 2 ) );
% [ sca_pks_z, sca_locs_z ] = findpeaks( sca( :, 3 ) );
% sca_x = [ wl( sca_locs_x ), sca_pks_x ];
% sca_x_plus = [ sca_x_plus, sca( :, 1 ) ];
% sca_y = [ wl( sca_locs_y ), sca_pks_y ];
% sca_y_plus = [ sca_y_plus, sca( :, 2 ) ];
% sca_z = [ wl( sca_locs_z ), sca_pks_z ];
% sca_z_plus = [ sca_z_plus, sca( :, 3 ) ];
% 
% %  absorption peak analysis
% [ abs_pks_x, abs_locs_x ] = findpeaks( abs( :, 1 ) );
% [ abs_pks_y, abs_locs_y ] = findpeaks( abs( :, 2 ) );
% [ abs_pks_z, abs_locs_z ] = findpeaks( abs( :, 3 ) );
% abs_x = [ wl( abs_locs_x ), abs_pks_x ];
% abs_x_plus = [ abs_x_plus, abs( :, 1 ) ];
% abs_y = [ wl( abs_locs_y ), abs_pks_y ];
% abs_y_plus = [ abs_y_plus, abs( :, 2 ) ];
% abs_z = [ wl( abs_locs_z ), abs_pks_z ];
% abs_z_plus = [ abs_z_plus, abs( :, 3 ) ];
% 
% %  peak info display
% empty = [ 0, 0; 0, 0; 0, 0 ];
% %peakinfo = [ ext_x; empty; ext_y; empty; sca_x; empty; sca_y; empty; abs_x; empty; abs_y ];
% peakinfo = [ ext_x; empty; ext_y; empty; ext_z; empty; sca_x; empty; sca_y; empty; sca_z; empty; abs_x; empty; abs_y; empty; abs_z ];
% emptyrow = size( peakinfo );
% emptyrow = zeros ( length( enei ) - emptyrow( 1, 1 ), 2);
% peakinfo = [ peakinfo; emptyrow ];
% peak_plus = [ peak_plus, peakinfo ];
% 
% %   all data
% data = [ wl, ext, sca, abs, peakinfo];
% 
% %   file name
% %file = [ 'Au sphere-triangle, L1-', num2str( edge_length_1 ), 'nm H1-', num2str( thick_1 ), 'nm, D2-', num2str( dia_2 ) 'nm, s-', num2str( gap_x ), 'nm - ', num2str( nz_1 ), '&', num2str( n_2 ), 'ret.txt'];
% %file = [ 'Au sphere-flipped_triangle, L1-', num2str( edge_length_1 ), 'nm H1-', num2str( thick_1 ), 'nm, D2-', num2str( dia_2 ) 'nm, s-', num2str( gap_x ), 'nm - ', num2str( nz_1 ), '&', num2str( n_2 ), 'ret.txt'];
% %file = [ 'Au triangle-sphere, L1-', num2str( edge_length_1 ), 'nm H1-', num2str( thick_1 ), 'nm, D2-', num2str( dia_2 ) 'nm, s-', num2str( gap_x ), 'nm - ', num2str( nz_1 ), '&', num2str( n_2 ), 'ret.txt'];
% file = [ 'Au triangle-sphere, L1-', num2str( edge_length_1 ), 'nm H1-', num2str( thick_1 ), 'nm round ', num2str( roundpar_1 ), 'nm, D2-', num2str( dia_2 ) 'nm, s-', num2str( gap_x ), 'nm - ', num2str( nz_1 ), '&', num2str( n_2 ), 'ret.txt'];
% 
% %   save data
% save ( file, 'data', '-ascii' );
% 
% close all;

end