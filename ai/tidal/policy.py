'''
Delegation for Earth Essay Competition from UKMP 2023
Research name : - GALIH RIDHO UTOMO
                - INDAH PERMATA NUSANTARA
@copyright 2023 UKMP UNNES
This template progam for develop our research
'''
import gym
from gym import spaces
import cv2

class BeachEnv(gym.Env):
    def __init__(self, model_path):
        super().__init__()
        self.action_space = spaces.Discrete(2) # 0 = no trash, 1 = trash
        self.observation_space = spaces.Box(low=0, high=255, shape=(img_width, img_height, 3), dtype=np.uint8)
        self.model = tf.keras.models.load_model(model_path)
        self.img = None
        self.trash_probability = None
    
    def reset(self):
        # Reset the environment
        self.img = None
        self.trash_probability = None
        return self._get_observation()
    
    def step(self, action):
        # Execute one time step within the environment
        assert self.action_space.contains(action)
        done = False
        
        # Simulate the action
        if action == 1:
            # Add trash to the image
            self._add_trash()
        
        # Predict the probability of trash in the image
        self.trash_probability = self.model.predict(np.expand_dims(self.img, axis=0))[0][0]
        
        # Check if the episode is over
        if self.trash_probability >= 0.5:
            done = True
        
        # Calculate the reward
        reward = 1 - self.trash_probability
        
        return self._get_observation(), reward, done, {}
    
    def _get_observation(self):
        # Get the current observation
        if self.img is None:
            # Generate a random image
            self._generate_image()
        
        # Resize the image to the required dimensions
        img = cv2.resize(self.img, (img_width, img_height))
        
        # Convert the image to RGB format
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        
        return img
    
    def _generate_image(self):
        # Generate a random image
        self.img = np.zeros((img_height, img_width, 3), dtype=np.uint8)
        cv2.rectangle(self.img, (0, 0), (img_width, img_height), (0, 255, 0), -1)
        
        # Add some noise to the image
        noise = np.random.randint(0, 50, (img_height, img_width, 3), dtype=np.uint8)
        self.img = cv2.add(self.img, noise)
        
    def _add_trash(self):
        # Add trash to the image
        trash = cv2.imread('path/to/trash.png')
        trash = cv2.resize(trash, (img_width // 4, img_height // 4))
        
        x = np.random.randint(0, img_width - trash.shape[1])
        y = np.random.randint(0, img_height - trash.shape[0])
        
        self.img[y:y+trash.shape[0], x:x+trash.shape[1]] = trash
    
    def render(self, mode='human'):
        # Render the environment
        img = self._get_observation()
        cv2.imshow('BeachEnv', img)
        cv2.waitKey(1)
