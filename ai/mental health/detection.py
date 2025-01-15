import sys
import cv2
import numpy as np
import mediapipe as mp
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from PyQt5.QtWidgets import (QApplication, QLabel, QPushButton, QVBoxLayout, 
                           QWidget, QMainWindow, QLineEdit)
from PyQt5.QtCore import QTimer, Qt
from PyQt5.QtGui import QPixmap, QImage
import time

class LoginWindow(QWidget):
    def __init__(self):
        super().__init__()
        self.initUI()
        self.driver = None
        
    def initUI(self):
        self.setWindowTitle('Instagram Login')
        self.setFixedSize(300, 200)
        
        layout = QVBoxLayout()
        
        self.username_input = QLineEdit()
        self.username_input.setPlaceholderText('Username')
        
        self.password_input = QLineEdit()
        self.password_input.setPlaceholderText('Password')
        self.password_input.setEchoMode(QLineEdit.Password)
        
        self.login_button = QPushButton('Login to Instagram')
        self.login_button.clicked.connect(self.login_instagram)
        
        self.start_analysis_button = QPushButton('Start Mental Health Analysis')
        self.start_analysis_button.clicked.connect(self.start_analysis)
        self.start_analysis_button.setEnabled(False)  # Disabled until login successful
        
        self.status_label = QLabel('')
        
        layout.addWidget(self.username_input)
        layout.addWidget(self.password_input)
        layout.addWidget(self.login_button)
        layout.addWidget(self.start_analysis_button)
        layout.addWidget(self.status_label)
        
        self.setLayout(layout)
        
    def login_instagram(self):
        try:
            self.status_label.setText('Logging in...')
            self.driver = webdriver.Chrome()
            self.driver.get('https://www.instagram.com/accounts/login/')
            
            # Wait for login form
            wait = WebDriverWait(self.driver, 10)
            username_field = wait.until(EC.presence_of_element_located((By.NAME, 'username')))
            
            # Enter credentials
            username_field.send_keys(self.username_input.text())
            password_field = self.driver.find_element(By.NAME, 'password')
            password_field.send_keys(self.password_input.text())
            password_field.send_keys(Keys.RETURN)
            
            # Wait for successful login
            wait.until(EC.url_contains('instagram.com'))
            
            if 'login' not in self.driver.current_url:
                self.status_label.setText('Login successful! You can now start the analysis.')
                self.start_analysis_button.setEnabled(True)  # Enable analysis button after successful login
                self.login_button.setEnabled(False)  # Disable login button
            else:
                self.status_label.setText('Login successful! You can now start the analysis.')
                self.start_analysis()
                self.start_analysis_button.setEnabled(True)  # Enable analysis button after successful login
                self.login_button.setEnabled(False)  # Disable login button
                
        except Exception as e:
            self.status_label.setText(f'Error: {str(e)}')
            if self.driver:
                self.driver.quit()
                self.driver = None

    def start_analysis(self):
        if self.driver:
            self.main_window = MentalHealthPredictor()
            self.main_window.show()
            self.hide()  # Hide login window instead of closing it
        else:
            self.status_label.setText('Please login first')

    def closeEvent(self, event):
        # Clean up browser when the window is closed
        if self.driver:
            self.driver.quit()
        event.accept()

class MentalHealthPredictor(QWidget):
    def __init__(self):
        super().__init__()
        self.initUI()
        self.setupFaceDetection()
        self.startVideo()
        
    def setupFaceDetection(self):
        # Initialize MediaPipe Face Mesh
        self.mp_face_mesh = mp.solutions.face_mesh
        self.face_mesh = self.mp_face_mesh.FaceMesh(
            max_num_faces=1,
            min_detection_confidence=0.5,
            min_tracking_confidence=0.5
        )
        self.mp_drawing = mp.solutions.drawing_utils
        self.drawing_spec = self.mp_drawing.DrawingSpec(thickness=1, circle_radius=1)
        self.cap = cv2.VideoCapture(0)
        
    def initUI(self):
        self.setWindowTitle('Mental Health Analysis')
        self.setMinimumSize(800, 600)
        
        layout = QVBoxLayout()
        
        self.image_label = QLabel()
        self.image_label.setAlignment(Qt.AlignCenter)
        self.prediction_label = QLabel('Analyzing...')
        self.prediction_label.setAlignment(Qt.AlignCenter)
        
        # Add back to login button
        self.back_button = QPushButton('Back to Login')
        self.back_button.clicked.connect(self.back_to_login)
        
        layout.addWidget(self.image_label)
        layout.addWidget(self.prediction_label)
        layout.addWidget(self.back_button)
        
        self.setLayout(layout)
        
    def back_to_login(self):
        # Show login window again
        for widget in QApplication.topLevelWidgets():
            if isinstance(widget, LoginWindow):
                widget.show()
        self.close()
        
    def startVideo(self):
        self.timer = QTimer()
        self.timer.timeout.connect(self.update_frame)
        self.timer.start(30)
        
    def update_frame(self):
        ret, frame = self.cap.read()
        if ret:
            # Flip the frame horizontally for a later selfie-view display
            frame = cv2.flip(frame, 1)
            
            # Convert the BGR image to RGB
            rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            
            # Process the frame and detect faces
            results = self.face_mesh.process(rgb_frame)
            
            if results.multi_face_landmarks:
                for face_landmarks in results.multi_face_landmarks:
                    # Draw the face mesh
                    self.mp_drawing.draw_landmarks(
                        image=frame,
                        landmark_list=face_landmarks,
                        connections=self.mp_face_mesh.FACEMESH_TESSELATION,
                        landmark_drawing_spec=self.drawing_spec,
                        connection_drawing_spec=self.drawing_spec)
                    
                    # Analyze mental state based on landmarks
                    mental_state = self.analyze_mental_state(face_landmarks, frame.shape)
                    self.prediction_label.setText(f'Mental State: {mental_state}')
            
            # Convert frame to Qt format
            rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            h, w, ch = rgb_frame.shape
            bytes_per_line = ch * w
            qt_image = QImage(rgb_frame.data, w, h, bytes_per_line, QImage.Format_RGB888)
            self.image_label.setPixmap(QPixmap.fromImage(qt_image))
            
    def analyze_mental_state(self, landmarks, frame_shape):
        """Analyze mental state based on facial landmarks."""
        # Convert landmarks to numpy array
        height, width = frame_shape[:2]
        points = np.array([(lm.x * width, lm.y * height) for lm in landmarks.landmark])
        
        # Calculate key metrics
        eye_ratio = self.calculate_eye_ratio(points)
        mouth_ratio = self.calculate_mouth_ratio(points)
        brow_ratio = self.calculate_brow_ratio(points)
        
        # Simple rule-based analysis
        if eye_ratio < 0.2:
            return "Fatigue Detected"
        elif mouth_ratio > 0.5:
            return "Positive Mood"
        elif brow_ratio > 0.3:
            return "Stressed/Concerned"
        else:
            return "Neutral"
    
    def calculate_eye_ratio(self, points):
        """Calculate eye aspect ratio."""
        # MediaPipe facial landmark indices for eyes
        left_eye = [33, 160, 158, 133, 153, 144]  # Left eye indices
        right_eye = [362, 385, 387, 263, 373, 380]  # Right eye indices
        
        left_eye_points = points[left_eye]
        right_eye_points = points[right_eye]
        
        # Calculate the eye aspect ratio
        def eye_aspect_ratio(eye_points):
            vertical_dist = np.linalg.norm(eye_points[1] - eye_points[5]) + \
                          np.linalg.norm(eye_points[2] - eye_points[4])
            horizontal_dist = np.linalg.norm(eye_points[0] - eye_points[3]) * 2
            return vertical_dist / horizontal_dist if horizontal_dist != 0 else 0
        
        left_ear = eye_aspect_ratio(left_eye_points)
        right_ear = eye_aspect_ratio(right_eye_points)
        
        return (left_ear + right_ear) / 2
    
    def calculate_mouth_ratio(self, points):
        """Calculate mouth aspect ratio."""
        # MediaPipe facial landmark indices for mouth
        mouth_points = [61, 291, 0, 17]  # Outer mouth corners and top/bottom points
        mouth_pts = points[mouth_points]
        
        vertical_dist = np.linalg.norm(mouth_pts[2] - mouth_pts[3])
        horizontal_dist = np.linalg.norm(mouth_pts[0] - mouth_pts[1])
        
        return vertical_dist / horizontal_dist if horizontal_dist != 0 else 0
    
    def calculate_brow_ratio(self, points):
        """Calculate eyebrow position relative to eye."""
        # MediaPipe facial landmark indices for eyebrows and eyes
        left_brow = [70, 63, 105, 66, 107]  # Left eyebrow
        left_eye = [159, 145, 133]  # Left eye top points
        
        brow_points = points[left_brow]
        eye_points = points[left_eye]
        
        brow_height = np.mean(brow_points[:, 1])
        eye_height = np.mean(eye_points[:, 1])
        
        return (eye_height - brow_height) / (points[152, 1] - points[10, 1])  # Normalize by face height
    
    def closeEvent(self, event):
        self.cap.release()
        self.face_mesh.close()
        event.accept()

if __name__ == '__main__':
    app = QApplication(sys.argv)
    login_window = LoginWindow()
    login_window.show()
    sys.exit(app.exec_())
