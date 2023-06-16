function bandpassFilterSimulink()
    % Nama model
    model = 'bandpassFilterModel';

    % Menutup model jika sudah ada
    if bdIsLoaded(model)
        close_system(model, 0);
    end

    % Membuat model baru
    new_system(model);

    % Membuka model
    open_system(model);

    % Menambahkan blok-blok yang diperlukan
    add_block('simulink/Sources/Sine Wave', [model '/Input Signal']);
    add_block('simulink/Continuous/Transfer Fcn', [model '/TransferFcn']);
    add_block('simulink/Sinks/Scope', [model '/Input Scope']);
    add_block('simulink/Sinks/Scope', [model '/Output Scope']);
    add_block('simulink/Sinks/Scope', [model '/Comparison Scope']);
    add_block('simulink/Math Operations/Add', [model '/Add']);

    % Mengatur posisi blok-blok
    set_param([model '/Input Signal'], 'Position', [100, 100, 130, 130]);
    set_param([model '/TransferFcn'], 'Position', [200, 100, 230, 130]);
    set_param([model '/Input Scope'], 'Position', [300, 100, 330, 130]);
    set_param([model '/Output Scope'], 'Position', [400, 100, 430, 130]);
    set_param([model '/Comparison Scope'], 'Position', [500, 100, 530, 130]);
    set_param([model '/Add'], 'Position', [300, 200, 330, 230]);

    % Menghubungkan blok-blok
    add_line(model, 'Input Signal/1', 'TransferFcn/1');
    add_line(model, 'TransferFcn/1', 'Output Scope/1');
    add_line(model, 'Input Signal/1', 'Input Scope/1');
    add_line(model, 'TransferFcn/1', 'Add/1');
    add_line(model, 'Input Signal/1', 'Add/2');
    add_line(model, 'Add/1', 'Comparison Scope/1');

    % Menentukan nilai-nilai komponen
    C1 = 5*10^-6;
    R1 = 20000;
    R2 = 10000;

    % Menambahkan fungsi transfer pada blok TransferFcn
    transferFcn = tf([0 0 1], [R1*R2 *C1 + R2 R1]);
    set_param([model '/TransferFcn'], 'Numerator', mat2str(transferFcn.Numerator{1}), 'Denominator', mat2str(transferFcn.Denominator{1}));

    % Mengatur parameter waktu simulasi
    simTime = 10; % Waktu simulasi dalam detik

    % Menjalankan simulasi
    sim(model, simTime);

    % Jangan menutup model secara otomatis
    set_param(model, 'SimulationCommand', 'stop');
    
    % Menampilkan grafik di Simulink
    open_system([model '/Input Scope']);
    open_system([model '/Output Scope']);
    open_system([model '/Comparison Scope']);
end
