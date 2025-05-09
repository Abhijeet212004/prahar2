import pandas as pd
import numpy as np
import random

# Set seed for reproducibility
np.random.seed(42)

# Number of samples to generate
NUM_SAMPLES = 1000

# Number of questions in the quiz
NUM_QUESTIONS = 10

# Number of options per question (assuming 4 options: 0, 1, 2, 3)
NUM_OPTIONS = 4

# Number of Prahars (1-8)
NUM_PRAHARS = 8

def generate_dataset():
    """Generate a synthetic dataset for Prahar quiz responses and labels."""
    
    # Generate random answers for each question (values 0-3 representing multiple choice options)
    data = {}
    for i in range(1, NUM_QUESTIONS + 1):
        data[f'Q{i}'] = np.random.randint(0, NUM_OPTIONS, size=NUM_SAMPLES)
    
    # Create patterns that influence the Prahar assignment
    # This simulates certain answer patterns being more likely to map to specific Prahars
    df = pd.DataFrame(data)
    
    # Create rules to assign Prahars based on answer patterns
    # These are simplified rules for our synthetic data
    prahar_labels = []
    
    for _, row in df.iterrows():
        # Sum the answers to create a weighted score
        total = sum(row.values)
        
        # Create a pattern based on even/odd answers
        even_count = sum(1 for ans in row.values if ans % 2 == 0)
        
        # Create different patterns for different Prahars
        if total < 10 and even_count > 7:
            prahar = 1
        elif total < 15 and even_count <= 7:
            prahar = 2
        elif 15 <= total < 20 and even_count > 5:
            prahar = 3
        elif 15 <= total < 20 and even_count <= 5:
            prahar = 4
        elif 20 <= total < 25 and even_count > 5:
            prahar = 5
        elif 20 <= total < 25 and even_count <= 5:
            prahar = 6
        elif 25 <= total and even_count > 5:
            prahar = 7
        else:
            prahar = 8
            
        # Add some randomness to make the dataset more realistic
        if random.random() < 0.1:  # 10% chance to randomize
            prahar = random.randint(1, NUM_PRAHARS)
            
        prahar_labels.append(prahar)
    
    # Add labels to the dataframe
    df['Label'] = prahar_labels
    
    # Save to CSV
    df.to_csv('data/prahar_quiz_dataset.csv', index=False)
    print(f"Generated dataset with {NUM_SAMPLES} samples and saved to 'data/prahar_quiz_dataset.csv'")
    
    # Show distribution of prahar labels
    print("\nPrahar distribution:")
    print(df['Label'].value_counts().sort_index())
    
    return df

if __name__ == "__main__":
    generate_dataset() 