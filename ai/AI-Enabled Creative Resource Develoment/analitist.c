/*
    Devolement by
    @author GALIH RIDHO UTOMO
    @author Dea Nisah
    @author Nining Hardiyanti
    @copyright KOSMIKA 2023 and UKMP 2023
    @protectedsection me.g4lihru.protect.shell
    @version 1.0
*/

#include <stdio.h>
#include <stdlib.h>
#include <math.h>

#define K 130

// Define the data structure for a data point
typedef struct {
    double x;  // The x coordinate
    double y;  // The y coordinate
    int label; // The class label
} DataPoint;

// Function to calculate the Euclidean distance between two data points
double distance(DataPoint p1, DataPoint p2) {
    return sqrt(pow(p1.x - p2.x, 2) + pow(p1.y - p2.y, 2));
}

// Function to classify a new data point using KNN
int knn(DataPoint* training_data, int num_training_points, DataPoint test_point) {
    // Calculate the distances between the test point and each training point
    double distances[num_training_points];
    for (int i = 0; i < num_training_points; i++) {
        distances[i] = distance(training_data[i], test_point);
    }

    // Find the k nearest neighbors
    int neighbors[K];
    for (int i = 0; i < K; i++) {
        int min_index = 0;
        double min_distance = distances[0];
        for (int j = 1; j < num_training_points; j++) {
            if (distances[j] < min_distance) {
                min_index = j;
                min_distance = distances[j];
            }
        }
        neighbors[i] = min_index;
        distances[min_index] = INFINITY;
    }

    // Count the number of neighbors in each class
    int counts[2] = {0, 0};
    for (int i = 0; i < K; i++) {
        counts[training_data[neighbors[i]].label]++;
    }

    // Classify the test point based on the majority class among the neighbors
    return counts[0] > counts[1] ? 0 : 1;
}

int main() {
    // Generate some random training data
    DataPoint training_data[] = {
        {1.0, 1.0, 0},
        {2.0, 2.0, 0},
        {3.0, 3.0, 0},
        {4.0, 4.0, 1},
        {5.0, 5.0, 1},
        {6.0, 6.0, 1}
    };
    int num_training_points = 6;

    // Classify a new test point
    DataPoint test_point = {3.5, 3.5, -1};
    int label = knn(training_data, num_training_points, test_point);

    printf("The test point belongs to class %d\n", label);

    return 0;
}
