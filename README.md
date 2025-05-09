# Prahar Personality Quiz

A web application that helps users identify which Prahar they belong to based on their answers to a 10-question personality quiz. The system uses machine learning to predict the Prahar based on patterns in user responses.

## Project Overview

This project uses a locally trained machine learning model to predict Prahar affinity without any cloud service dependencies.

### Features

- **10-Question Personality Quiz**: Users answer multiple-choice questions about their preferences and behaviors.
- **Machine Learning Prediction**: A locally trained model analyzes user responses to determine their Prahar.
- **Dynamic Day/Night Cycle**: Beautiful animated sky background that transitions through different times of day as users scroll through the quiz.
- **Immersive UI with Glassmorphism**: Modern, clean interface with subtle glass-like effects that integrate with the changing sky backgrounds.
- **Responsive Design**: User-friendly interface that works on both desktop and mobile devices.
- **No Cloud Dependencies**: All processing happens locally, with no external API calls required.

## Getting Started

### Prerequisites

- Python 3.8 or higher
- pip (Python package manager)

### Installation

1. Clone this repository:
   ```
   git clone <repository-url>
   cd prahar
   ```

2. Create a virtual environment (optional but recommended):
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows, use: venv\Scripts\activate
   ```

3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

### Running the Application

1. Generate the dataset (if not already created):
   ```
   python data/generate_dataset.py
   ```

2. Train the machine learning model:
   ```
   python app/models/train_model.py
   ```

3. Start the Flask server:
   ```
   cd app
   python app.py
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5000
   ```

## Project Structure

```
prahar/
│
├── app/                    # Main application directory
│   ├── models/             # ML model directory
│   │   └── train_model.py  # Model training script
│   ├── static/             # Static files (CSS, JS)
│   │   └── style.css       # Additional styling
│   ├── templates/          # HTML templates
│   │   └── index.html      # Quiz interface
│   └── app.py              # Flask application
│
├── data/                   # Data directory
│   ├── generate_dataset.py # Script to generate synthetic dataset
│   └── prahar_quiz_dataset.csv  # Generated dataset (after running the script)
│
├── requirements.txt        # Project dependencies
└── README.md               # This file
```

## How It Works

1. **Dataset Generation**: We create a synthetic dataset of user answers mapped to Prahar labels.
2. **Model Training**: A Random Forest or Logistic Regression model is trained locally to predict Prahar labels.
3. **User Interface**: Users take the quiz through a web interface built with HTML, CSS, and JavaScript.
4. **Prediction**: The Flask backend processes the quiz answers and runs the trained model to predict the Prahar.
5. **Results**: The predicted Prahar and its description are displayed to the user.

## Customization

- **Questions**: Modify the `QUIZ_QUESTIONS` list in `app/app.py` to change the quiz questions.
- **Prahar Descriptions**: Update the `PRAHAR_INFO` dictionary in `app/app.py` to change the Prahar descriptions.
- **Model Selection**: Edit `app/models/train_model.py` to experiment with different machine learning algorithms.

## License

[MIT License](LICENSE)

## Acknowledgments

- Built with Flask, scikit-learn, and Bootstrap
- Created for demonstrating local machine learning implementation 
