'''
    Devolement by
    @author Dea Nisah
    @author GALIH RIDHO UTOMO
    @author Nining Hardiyanti
    @copyright KOSMIKA 2023 and UKMP 2023
    @protectedsection me.g4lihru.protect.shell
    @version 1.0
'''
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import accuracy_score
import matplotlib.pyplot as plt
import numpy as np


# Training data
X_train = np.array([[1.0, 1.0], [1.5, 2.0], [2.0, 2.5], [3.0, 3.0], [3.5, 4.0], [4.0, 4.5]])
y_train = np.array([0, 0, 0, 1, 1, 1])

# Test data
X_test = np.array([[3.5, 3.5]])
y_test = np.array([1])

# KNN algorithm
K = 3
knn = KNeighborsClassifier(n_neighbors=K)
knn.fit(X_train, y_train)
y_pred = knn.predict(X_test)

# Calculate accuracy
accuracy = accuracy_score(y_test, y_pred)

# Output
print("Test point belongs to class:", y_pred[0])
print("Accuracy:", accuracy)
print("Predict: ", y_pred)

# Plot training data
plt.figure(num="AI-CREATE")
plt.scatter(X_train[:,0], X_train[:,1], c=y_train)
for i in range(len(X_train)):
    plt.annotate(f"({X_train[i,0]}, {X_train[i,1]})", (X_train[i,0], X_train[i,1]), textcoords="offset points", xytext=(5,-5), ha='left')

# Plot test point
plt.scatter(X_test[:,0], X_test[:,1], c='red', marker='x')
for i in range(len(X_test)):
    plt.annotate(f"Test Point {(X_test[i,0], X_test[i,1])}", (X_test[:,0], X_test[:,1]), textcoords="offset points", xytext=(5,-5), ha='left')

# Add labels and title
plt.xlabel('Kreativitas')
plt.ylabel('Ide')
plt.title('AI-Enabled Creativity')

# Connect data points with a line
for i in range(len(X_train)):
    if y_train[i] == 0:
        plt.plot([X_train[i,0], X_test[0,0]], [X_train[i,1], X_test[0,1]], 'b--')
    else:
        plt.plot([X_train[i,0], X_test[0,0]], [X_train[i,1], X_test[0,1]], 'r--')

plt.grid(True)
plt.show()
