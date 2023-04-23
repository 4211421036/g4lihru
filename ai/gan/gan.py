'''
Delegation for MANDING KOSMIK 2023
Research Name: GALIH RIDHO UTOMO
Aim to Research: to develop and valute GAN render image by AI
'''
# Import necessary libraries
from keras.models import Sequential, Model
from keras.layers import Input, Dense, Reshape, Flatten, Dropout, Conv2D, Conv2DTranspose, LeakyReLU
from keras.optimizers import Adam
from keras.datasets import mnist
import numpy as np
import matplotlib.pyplot as plt

# Define hyperparameters
img_rows = 28
img_cols = 28
channels = 1
img_shape = (img_rows, img_cols, channels)
latent_dim = 100
optimizer = Adam(0.0002, 0.5)

# Build generator model
def build_generator():

    model = Sequential()

    model.add(Dense(256, input_dim=latent_dim))
    model.add(LeakyReLU(alpha=0.2))
    model.add(Dense(512))
    model.add(LeakyReLU(alpha=0.2))
    model.add(Dense(1024))
    model.add(LeakyReLU(alpha=0.2))
    model.add(Dense(np.prod(img_shape), activation='tanh'))
    model.add(Reshape(img_shape))

    model.summary()

    noise = Input(shape=(latent_dim,))
    img = model(noise)

    return Model(noise, img)

# Build discriminator model
def build_discriminator():

    model = Sequential()

    model.add(Flatten(input_shape=img_shape))
    model.add(Dense(512))
    model.add(LeakyReLU(alpha=0.2))
    model.add(Dense(256))
    model.add(LeakyReLU(alpha=0.2))
    model.add(Dense(1, activation='sigmoid'))

    model.summary()

    img = Input(shape=img_shape)
    validity = model(img)

    return Model(img, validity)

def build_gan(generator, discriminator):

    discriminator.trainable = False

    gan_input = Input(shape=(latent_dim,))
    fake_img = generator(gan_input)
    validity = discriminator(fake_img)

    discriminator.trainable = True

    gan = Model(gan_input, validity)
    gan.compile(loss='binary_crossentropy', optimizer=optimizer)

    return gan

# Load and preprocess MNIST dataset
(X_train, _), (_, _) = mnist.load_data()
X_train = X_train / 127.5 - 1.
X_train = np.expand_dims(X_train, axis=3)

# Build and compile models
generator = build_generator()
discriminator = build_discriminator()
gan = build_gan(generator, discriminator)

# Build and compile models
generator.compile(loss='binary_crossentropy', optimizer=optimizer)

discriminator = build_discriminator()
discriminator.compile(loss='binary_crossentropy', optimizer=optimizer)

# Set discriminator.trainable to False before compiling GAN
discriminator.trainable = False
gan = build_gan(generator, discriminator)
gan.compile(loss='binary_crossentropy', optimizer=optimizer)

# Train GANs
batch_size = 128
epochs = 10000

for epoch in range(epochs):

    idx = np.random.randint(0, X_train.shape[0], batch_size)
    real_imgs = X_train[idx]
    noise = np.random.normal(0, 1, (batch_size, latent_dim))
    fake_imgs = generator.predict(noise)

    d_loss_real = discriminator.train_on_batch(real_imgs, np.ones((batch_size, 1)))
    d_loss_fake = discriminator.train_on_batch(fake_imgs, np.zeros((batch_size, 1)))
    d_loss = 0.5 * np.add(d_loss_real, d_loss_fake)

    noise = np.random.normal(0, 1, (batch_size, latent_dim))
# Train GANs (lanjutan)
    g_loss = gan.train_on_batch(noise, np.ones((batch_size, 1)))

    # Print progress
    print(f"Epoch: {epoch+1}/{epochs}, D Loss: {d_loss}, G Loss: {g_loss}")

    # Save generated images
    if epoch % 100 == 0:
        noise = np.random.normal(0, 1, (25, latent_dim))
        gen_imgs = generator.predict(noise)
        gen_imgs = 0.5 * gen_imgs + 0.5
        fig, axs = plt.subplots(5, 5)
        cnt = 0
        for i in range(5):
            for j in range(5):
                axs[i,j].imshow(gen_imgs[cnt, :,:,0], cmap='gray')
                axs[i,j].axis('off')
                cnt += 1
        fig.savefig(f"images/mnist_{epoch}.png")
        plt.close()


# Save models
generator.save("generator.h5")
discriminator.save("discriminator.h5")
