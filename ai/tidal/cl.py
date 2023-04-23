'''
Delegation for Earth Essay Competition from UKMP 2023
Research name : - GALIH RIDHO UTOMO
                - INDAH PERMATA NUSANTARA
@copyright 2023 UKMP UNNES
This template progam for develop our research
'''
import os
import random
import shutil

# Path to the dataset directory
dataset_dir = ''

# Path to the directory where the prepared dataset will be saved
base_dir = ''
os.makedirs(base_dir, exist_ok=True)

# Directory names for training, validation, and test sets
train_dir = os.path.join(base_dir, 'train')
validation_dir = os.path.join(base_dir, 'validation')

# Directory names for beach and trash classes
beach_dir = os.path.join(base_dir, 'beach')
trash_dir = os.path.join(base_dir, 'trash')

# Percentage of images to use for validation set
validation_split = 0.2

# Create directories for the training and validation sets
os.makedirs(train_dir, exist_ok=True)
os.makedirs(validation_dir, exist_ok=True)
os.makedirs(beach_dir, exist_ok=True)
os.makedirs(trash_dir, exist_ok=True)

# Copy beach images to the beach directory
beach_files = os.listdir(os.path.join(dataset_dir, 'beach'))
for file_name in beach_files:
    file_path = os.path.join(dataset_dir, 'beach', file_name)
    shutil.copy(file_path, beach_dir)

# Copy trash images to the trash directory
trash_files = os.listdir(os.path.join(dataset_dir, 'trash'))
for file_name in trash_files:
    file_path = os.path.join(dataset_dir, 'trash', file_name)
    shutil.copy(file_path, trash_dir)

# Split the beach images into training and validation sets
beach_files = os.listdir(beach_dir)
random.shuffle(beach_files)
num_validation = int(validation_split * len(beach_files))
for i in range(num_validation):
    file_name = beach_files[i]
    src_path = os.path.join(beach_dir, file_name)
    dst_path = os.path.join(validation_dir, 'beach', file_name)
    shutil.move(src_path, dst_path)

# Move the remaining beach images to the training set
for file_name in beach_files[num_validation:]:
    src_path = os.path.join(beach_dir, file_name)
    dst_path = os.path.join(train_dir, 'beach', file_name)
    shutil.move(src_path, dst_path)

# Split the trash images into training and validation sets
trash_files = os.listdir(trash_dir)
random.shuffle(trash_files)
num_validation = int(validation_split * len(trash_files))
for i in range(num_validation):
    file_name = trash_files[i]
    src_path = os.path.join(trash_dir, file_name)
    dst_path = os.path.join(validation_dir, 'trash', file_name)
    shutil.move(src_path, dst_path)

# Move the remaining trash images to the training set
for file_name in trash_files[num_validation:]:
    src_path = os.path.join(trash_dir, file_name)
    dst_path = os.path.join(train_dir, 'trash', file_name)
    shutil.move(src_path, dst_path)
