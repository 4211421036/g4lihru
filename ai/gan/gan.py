import subprocess

# Daftar modul yang diperlukan
required_modules = ['keras', 'matplotlib']

# Fungsi untuk memeriksa dan menginstal modul
def CheckandInstallModule(module_name):
    try:
        __import__(module_name)
        print(f"Module '{module_name}' already installed")
    except ImportError:
        print(f"Module '{module_name}' not found. Installing...")
        subprocess.call(['pip', 'install', module_name])
        print(f"Module '{module_name}' installed successfully")

# Memeriksa dan menginstal modul yang diperlukan
for module in required_modules:
    CheckandInstallModule(module)

# Import necessary libraries
from keras.models import Sequential, Model
from keras.layers import Input, Dense, Reshape, Flatten, Dropout, Conv2D, Conv2DTranspose, LeakyReLU
from keras.optimizers import Adam
from keras.datasets import mnist
import numpy as np
import matplotlib.pyplot as plt

# Define hyperparameters
ImgRows = 28
ImgCols = 28
channels = 1
ImgShape = (ImgRows, ImgCols, channels)
LatentDim = 100
optimizer = Adam(0.0002, 0.5)

# Build generator model
def BuildGenerator():

    model = Sequential()

    model.add(Dense(256, input_dim=LatentDim))
    model.add(LeakyReLU(alpha=0.2))
    model.add(Dense(512))
    model.add(LeakyReLU(alpha=0.2))
    model.add(Dense(1024))
    model.add(LeakyReLU(alpha=0.2))
    model.add(Dense(np.prod(ImgShape), activation='tanh'))
    model.add(Reshape(ImgShape))

    model.summary()

    noise = Input(shape=(LatentDim,))
    img = model(noise)

    return Model(noise, img)

# Build discriminator model
def BuildDiscriminator():

    model = Sequential()

    model.add(Flatten(input_shape=ImgShape))
    model.add(Dense(512))
    model.add(LeakyReLU(alpha=0.2))
    model.add(Dense(256))
    model.add(LeakyReLU(alpha=0.2))
    model.add(Dropout(0.4))
    model.add(Dense(1, activation='sigmoid'))

    model.summary()

    img = Input(shape=ImgShape)
    validity = model(img)

    return Model(img, validity)

def BuildGAN(generator, discriminator):

    discriminator.trainable = False

    gan_input = Input(shape=(LatentDim,))
    fake_img = generator(gan_input)
    validity = discriminator(fake_img)

    discriminator.trainable = True

    gan = Model(gan_input, validity)
    gan.compile(loss='binary_crossentropy', optimizer=optimizer)

    return gan

# Load and preprocess MNIST dataset
(XTrain, _), (_, _) = mnist.load_data()
XTrain = XTrain / 127.5 - 1.
XTrain = np.expand_dims(XTrain, axis=3)

# Build and compile models
generator = BuildGenerator()
discriminator = BuildDiscriminator()
gan = BuildGAN(generator, discriminator)

# Build and compile models
generator.compile(loss='binary_crossentropy', optimizer=optimizer)

discriminator = BuildDiscriminator()
discriminator.compile(loss='binary_crossentropy', optimizer=optimizer)

# Set discriminator.trainable to False before compiling GAN
discriminator.trainable = False
gan = BuildGAN(generator, discriminator)
gan.compile(loss='binary_crossentropy', optimizer=optimizer)

# Train GANs
BatchSize = 128
epochs = 10000

for epoch in range(epochs):

    idx = np.random.randint(0, XTrain.shape[0], BatchSize)
    RealImgs = XTrain[idx]
    noise = np.random.normal(0, 1, (BatchSize, LatentDim))
    fake_imgs = generator.predict(noise)

    DLossReal = discriminator.train_on_batch(RealImgs, np.ones((BatchSize, 1)))
    DLossFake = discriminator.train_on_batch(fake_imgs, np.zeros((BatchSize, 1)))
    DLoss = 0.5 * np.add(DLossReal, DLossFake)

    noise = np.random.normal(0, 1, (BatchSize, LatentDim))
    # Train GANs (lanjutan)
    GLoss = gan.train_on_batch(noise, np.ones((BatchSize, 1)))

    # Print progress
    print(f"Epoch: {epoch+1}/{epochs}, D Loss: {DLoss}, G Loss: {GLoss}")

    # Save generated images
    if epoch % 100 == 0:
        noise = np.random.normal(0, 1, (25, LatentDim))
        GenImgs = generator.predict(noise)
        GenImgs = 0.5 * GenImgs + 0.5
        fig, axs = plt.subplots(5, 5)
        cnt = 0
        for i in range(5):
            for j in range(5):
                axs[i,j].imshow(GenImgs[cnt, :,:,0], cmap='gray')
                axs[i,j].axis('off')
                cnt += 1
        fig.savefig(f"images/mnist_{epoch}.png")
        plt.close()


# Save models
generator.save("generator.h5")
discriminator.save("discriminator.h5")
