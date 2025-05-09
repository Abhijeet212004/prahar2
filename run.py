#!/usr/bin/env python
"""
Runner script for the Prahar Personality Quiz system.
This script sets up and runs the entire application.
"""

import os
import subprocess
import sys
import time

def check_dependencies():
    """Check if required packages are installed"""
    try:
        import flask
        import pandas
        import numpy
        import sklearn
        import joblib
        print("✅ All dependencies are installed.")
        return True
    except ImportError as e:
        print(f"❌ Missing dependency: {e}")
        print("Installing dependencies...")
        try:
            subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"])
            print("✅ Dependencies installed successfully.")
            return True
        except subprocess.CalledProcessError:
            print("❌ Failed to install dependencies.")
            return False

def generate_dataset():
    """Generate the dataset if it doesn't exist"""
    if not os.path.exists("data/prahar_quiz_dataset.csv"):
        print("Generating dataset...")
        try:
            subprocess.check_call([sys.executable, "data/generate_dataset.py"])
            print("✅ Dataset generated successfully.")
            return True
        except subprocess.CalledProcessError:
            print("❌ Failed to generate dataset.")
            return False
    else:
        print("✅ Dataset already exists.")
        return True

def train_model():
    """Train the machine learning model if it doesn't exist"""
    if not os.path.exists("app/models/prahar_random_forest_model.pkl"):
        print("Training model...")
        try:
            subprocess.check_call([sys.executable, "app/models/train_model.py"])
            print("✅ Model trained successfully.")
            return True
        except subprocess.CalledProcessError:
            print("❌ Failed to train model.")
            return False
    else:
        print("✅ Model already exists.")
        return True

def run_app():
    """Run the Flask application"""
    print("Starting Flask application...")
    os.chdir("app")
    print("🚀 Server is running! Open http://localhost:5000 in your browser.")
    subprocess.call([sys.executable, "app.py"])

if __name__ == "__main__":
    print("=" * 50)
    print("Prahar Personality Quiz - Setup and Launch")
    print("=" * 50)
    
    if check_dependencies() and generate_dataset() and train_model():
        run_app()
    else:
        print("❌ Setup failed. Please check the errors above and try again.")
        sys.exit(1) 