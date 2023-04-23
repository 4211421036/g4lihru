'''
Delegation for Earth Essay Competition from UKMP 2023
Research name : - GALIH RIDHO UTOMO
                - INDAH PERMATA NUSANTARA
@copyright 2023 UKMP UNNES
This template progam for develop our research
'''
import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense, Dropout

# Dimensions of the input images
img_width, img_height = 150, 150

# Paths to the training and validation sets
train_dir = 'path/to/training/set'
validation_dir = 'path/to/validation/set'

# Number of training and validation samples
num_train = sum([len(files) for _, _, files in os.walk(train_dir)])
num_validation = sum([len(files) for _, _, files in os.walk(validation_dir)])

# Batch size and number of epochs
batch_size = 32
epochs = 50

# Data augmentation for the training set
train_datagen = ImageDataGenerator(rescale=1./255,
                                   rotation_range=40,
                                   width_shift_range=0.2,
                                   height_shift_range=0.2,
                                   shear_range=0.2,
                                   zoom_range=0.2,
                                   horizontal_flip=True,
                                   fill_mode='nearest')

# Rescale the validation set
validation_datagen = ImageDataGenerator(rescale=1./255)

# Generate batches of images and labels for the training set
train_generator = train_datagen.flow_from_directory(train_dir,
                                                    target_size=(img_width, img_height),
                                                    batch_size=batch_size,
                                                    class_mode='binary')

# Generate batches of images and labels for the validation set
validation_generator = validation_datagen.flow_from_directory(validation_dir,
                                                              target_size=(img_width, img_height),
                                                              batch_size=batch_size,
                                                              class_mode='binary')

# Define the model
model = Sequential()
model.add(Conv2D(32, (3, 3), activation='relu', input_shape=(img_width, img_height, 3)))
model.add(MaxPooling2D((2, 2)))
model.add(Conv2D(64, (3, 3), activation='relu'))
model.add(MaxPooling2D((2, 2)))
model.add(Conv2D(128, (3, 3), activation='relu'))
model.add(MaxPooling2D((2, 2)))
model.add(Conv2D(128, (3, 3), activation='relu'))
model.add(MaxPooling2D((2, 2)))
model.add(Flatten())
model.add(Dropout(0.5))
model.add(Dense(512, activation='relu'))
model.add(Dense(1, activation='sigmoid'))

# Compile the model
model.compile(optimizer='rmsprop',
              loss='binary_crossentropy',
              metrics=['accuracy'])

# Train the model
history = model.fit_generator(train_generator,
                              steps_per_epoch=num_train // batch_size,
                              epochs=epochs,
                              validation_data=validation_generator,
                              validation_steps=num_validation // batch_size)
