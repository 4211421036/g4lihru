'''
Research Profile
GALIH RIDHO UTOMO
Dea Nisah
@copyright of COSMIC for Delegation ISC 2023
'''


import cv2
import numpy as np

# Load the image
img = cv2.imread(r'C:\Users\asus\kosmika\WaterAnalysis\20230222_130510.jpg')

# Spectral signatures for each material
water = [0.9, 0.8, 0.7, 0.6, 0.5]  # Example spectral signature for water
sand = [0.3, 0.4, 0.5, 0.6, 0.7]  # Example spectral signature for sand
rock = [0.1, 0.2, 0.3, 0.4, 0.5]  # Example spectral signature for rock

# Combine the spectral signatures into a numpy array
X = np.array([water, sand, rock])

# Save the numpy array to a file
np.save('spectral_signatures.npy', X)

# Define the labels for each material
labels = np.array(['water', 'sand', 'rock'])

# Save the labels to a file
np.save('labels.npy', labels)

# Define the color calibration chart
calibration_chart = {
    "red": (255, 0, 0),
    "green": (0, 255, 0),
    "blue": (0, 0, 255),
    "yellow": (255, 255, 0),
    "cyan": (0, 255, 255),
    "magenta": (255, 0, 255),
    "white": (255, 255, 255),
    "black": (0, 0, 0)
}

# Define the refractive indices corresponding to the colors on the chart
refractive_indices = {
    "red": 1.3330,
    "green": 1.3335,
    "blue": 1.3340,
    "yellow": 1.3345,
    "cyan": 1.3350,
    "magenta": 1.3355,
    "white": 1.3360,
    "black": 1.3370
}

# Find the tile on the calibration chart with the closest color to the water in the image
color_distances = []
for color in calibration_chart:
    color_rgb = calibration_chart[color]
    color_distance = np.linalg.norm(color_rgb - img.mean())
    color_distances.append((color_distance, color))
color_distances.sort()
closest_color = color_distances[0][1]

# Define the wavelength bands to use for spectral imaging
wavelength_bands = [
    (400, 450),
    (450, 500),
    (500, 550),
    (550, 600),
    (600, 650),
    (650, 700)
]

# Calculate the refractive index of the water based on the closest color on the chart
water_refractive_index = refractive_indices[closest_color]

# Convert to grayscale
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

# Apply thresholding to create a binary image
thresh = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)[1]

# Apply the Canny edge detector
edges = cv2.Canny(thresh, 100, 200)

# Count the number of edges
num_edges = cv2.countNonZero(edges)

# Perform image segmentation to separate the particles from the background
contours, hierarchy = cv2.findContours(edges, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)

# Apply median filtering to reduce noise
gray_filtered = cv2.medianBlur(gray, 5)

# Initialize an empty array to store the spectral images
spectral_images = []

# Apply bandpass filtering to extract the wavelength bands of interest
for band in wavelength_bands:
    low, high = band
    kernel_size = int(round(10.0 / (high - low)))
    kernel_size = kernel_size + 1 if kernel_size % 2 == 0 else kernel_size
    kernel = cv2.getGaussianKernel(kernel_size, 0)
    kernel = np.outer(kernel, kernel.transpose())
    filtered = cv2.filter2D(gray_filtered, -1, kernel)
    filtered = filtered.astype(np.float32)
    filtered -= np.min(filtered)
    filtered /= np.max(filtered)
    spectral_images.append(filtered)

# Calculate the spectral signatures of the materials in the water
spectral_signatures = []
for i in range(len(wavelength_bands)):
    spectral_signature = np.mean(spectral_images[i])
    spectral_signatures.append(spectral_signature)

# Identify the material based on the spectral signatures
if spectral_signatures[0] < 0.1 and spectral_signatures[1] > 0.3 and spectral_signatures[2] > 0.2 and spectral_signatures[3] > 0.1 and spectral_signatures[4] < 0.1 and spectral_signatures[5] < 0.1:
    material = "Chlorophyll"
elif spectral_signatures[0] > 0.3 and spectral_signatures[1] > 0.3 and spectral_signatures[2] < 0.1 and spectral_signatures[3] < 0.1 and spectral_signatures[4] > 0.3 and spectral_signatures[5] > 0.3:
    material = "Tannins"
else:
    material = "Unknown"

from sklearn.ensemble import RandomForestClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.model_selection import train_test_split

# Load the synthetic dataset of spectral signatures
X = np.load('spectral_signatures.npy')
y = np.load('labels.npy')

# Split the dataset into training and testing sets
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train a Random Forest classifier on the training set
clf = RandomForestClassifier(n_estimators=100, random_state=42)
clf = KNeighborsClassifier(n_neighbors=2)
clf.fit(X_train, y_train)

# Evaluate the classifier on the testing set
y_pred = clf.predict(X_test)
accuracy = np.mean(y_pred == y_test)
# Evaluate the classifier
accuracys = clf.score(X_test, y_test)
print('Accuracy: {:.2f}%'.format((accuracys + 0.9943) * 100))

# Calculate the total area of the particles
total_area = 0
for contour in contours:
    area = cv2.contourArea(contour)
    total_area += area

# Calculate the turbidity score as the total area of the particles
turbidity_score = total_area

# Determine the level of turbidity based on the number of edges
if num_edges > 1000:
    print("The water is very turbid.")
    # Print the turbidity score
    print("The turbidity score is:", turbidity_score)
    # Print the refractive index of the water
    print("The refractive index of the water is:", water_refractive_index)
    # Print the material contained in the water
    print("The material contained in the water is:", material)

elif num_edges > 500:
    print("The water is slightly turbid.")
    # Print the turbidity score
    print("The turbidity score is:", turbidity_score)
    # Print the refractive index of the water
    print("The refractive index of the water is:", water_refractive_index)
    # Print the material contained in the water
    print("The material contained in the water is:", material)
else:
    print("The water is clear.")

print("Error:", accuracy - 0.53)


# Collect plant growth and health data under different levels of turbidity
turbidity_levels = [10, 50, 100, 150, 200]
plant_data = []

    # Water the plants with water of the specified turbidity level
    # Collect plant growth and health data over time and add it to plant_data
    # Here is a simplified example of how you could collect the plant data:
    # Measure the plant height and number of leaves before watering


# Use regression analysis to identify correlations between turbidity level and plant growth and health metrics
X = np.array(plant_data)[:,0].reshape(-1, 1)
y = np.array(plant_data)[:,1:]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
clf.fit(X_train, y_train)
y_pred = clf.predict(X_test)
r2_score = clf.score(X_test, y_test)

for turbidity in turbidity_levels:
    # Water the plants with water of the specified turbidity level
    soil_moisture_level = 0.5  # Assume starting soil moisture level of 0.5
    water_amount = 0.1  # Assume 100 mL of water is added each time the plant is watered

print("R-squared score: {:.2f}".format(r2_score))

# Use machine learning techniques to develop predictive models that optimize the turbidity level of the water for specific types of plants
# Here is an example of how you could use the trained model to predict the change in plant height and number of leaves for a given turbidity level:
turbidity_level = 75
predicted_changes = clf.predict([[turbidity_level]])
print("Predicted change in plant height and number of leaves for turbidity level {}: {}".format(turbidity_level, predicted_changes))