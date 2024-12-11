% Tambahkan path MNPBEM jika belum ditambahkan
addpath(genpath('C:\Users\asus\Downloads\MNPBEM'));

% Definisikan fungsi dielektrik
epstab = {epsconst(1.33^2), epstable('gold.dat')};

% Buat nanosphere dengan 144 vertices dan diameter 10 nm
p = trisphere(144, 10);

% Definisikan properti dielektrik nanopartikel
p = comparticle(epstab, {p}, [2,1], 1);

% Inisialisasi BEM solver
bem = bemstat(p);

% Definisikan eksitasi gelombang datar
exc = planewavestat([1,0,0; 0,1,0]);

% Definisikan panjang gelombang (dalam nm)
enei = linspace(400, 700, 80);

% Inisialisasi array untuk menyimpan hasil hamburan
sca = zeros(length(enei), 2);

% Loop utama untuk berbagai panjang gelombang eksitasi
for ien = 1:length(enei)
    sig = bem \ exc(p, enei(ien));
    sca(ien, :) = exc.sca(sig);
end

% Plot hasil
figure;
plot(enei, sca);
xlabel('Wavelength (nm)');
ylabel('Scattering cross section');
title('Scattering spectrum of gold nanosphere');
legend('x-polarization', 'y-polarization');

% Hitung dan plot muatan permukaan untuk panjang gelombang tertentu
ien = 40; % Misalnya, pilih panjang gelombang ke-40
sig = bem \ exc(p, enei(ien));

figure;
plot(p, real(sig.sig), 'EdgeColor', 'b');
title(['Surface charge at ' num2str(enei(ien)) ' nm']);

figure;
field = bem.field(sig,2);
plot(p,real(field.e),'scale',0.6);

% Hitung dan plot medan listrik di sekitar partikel
[x, y] = meshgrid(linspace(-15, 15, 31));
pt = compoint(p, [x(:), y(:), 0*x(:)], 'mindist', 1);

% Gunakan bem.field untuk menghitung medan listrik
field = bem.field(sig);

figure;
plot(p, 'EdgeColor', 'b');
hold on;
quiver(p.pos(:,1), p.pos(:,2), real(field.e(:,1)), real(field.e(:,2)));
title(['Electric field at ' num2str(enei(ien)) ' nm']);
axis equal;