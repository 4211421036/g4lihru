from sklearn.neighbors import KNeighborsClassifier
import numpy as np

# Training data
X_train = np.array([[1.0, 1.0], [1.5, 2.0], [2.0, 2.5], [3.0, 3.0], [3.5, 4.0], [4.0, 4.5]])
y_train = np.array([0, 0, 0, 1, 1, 1])

# Test data
X_test = np.array([[3.5, 3.5]])

# KNN algorithm
K = 3
knn = KNeighborsClassifier(n_neighbors=K)
knn.fit(X_train, y_train)
y_pred = knn.predict(X_test)

# Output
print("Test point belongs to class:", y_pred[0])
