#!/usr/bin/env python
"""
Generate a custom dataset for Prahar quiz based on specific question-to-prahar mappings.
This script creates a dataset with high correlation between answers and Prahar outcomes.
"""

import pandas as pd
import numpy as np
import random
import os

# Set seed for reproducibility
np.random.seed(42)

# Number of samples to generate
NUM_SAMPLES = 10000

# Number of questions in the quiz
NUM_QUESTIONS = 10

# Number of options per question (A, B, C, D mapped to 0, 1, 2, 3)
NUM_OPTIONS = 4

# Number of Prahars (1-8)
NUM_PRAHARS = 8

# Define the mapping of question answers to Prahars
# This is based on the provided mapping where:
# Q1: A→P1, B→P2, C→P3, D→P4
# Q2: A→P5, B→P6, C→P7, D→P8
# And so on...
QUESTION_PRAHAR_MAPPING = {
    # Question number: {answer option (0-3): prahar number (1-8)}
    1: {0: 1, 1: 2, 2: 3, 3: 4},
    2: {0: 5, 1: 6, 2: 7, 3: 8},
    3: {0: 1, 1: 2, 2: 3, 3: 4},
    4: {0: 5, 1: 6, 2: 7, 3: 8},
    5: {0: 1, 1: 2, 2: 3, 3: 4},
    6: {0: 5, 1: 6, 2: 7, 3: 8},
    7: {0: 1, 1: 2, 2: 3, 3: 4},
    8: {0: 5, 1: 6, 2: 7, 3: 8},
    9: {0: 1, 1: 2, 2: 3, 3: 4},
    10: {0: 5, 1: 6, 2: 7, 3: 8},
}

def generate_dataset():
    """Generate a synthetic dataset for Prahar quiz responses and labels based on specific mappings."""
    
    # Generate random answers for each question (values 0-3 representing A, B, C, D options)
    data = {}
    for i in range(1, NUM_QUESTIONS + 1):
        data[f'Q{i}'] = np.random.randint(0, NUM_OPTIONS, size=NUM_SAMPLES)
    
    # Create DataFrame
    df = pd.DataFrame(data)
    
    # Count occurrences of each Prahar for each sample
    prahar_counts = {i: np.zeros(NUM_SAMPLES) for i in range(1, NUM_PRAHARS + 1)}
    
    for idx, row in df.iterrows():
        for q_num in range(1, NUM_QUESTIONS + 1):
            answer = row[f'Q{q_num}']
            prahar = QUESTION_PRAHAR_MAPPING[q_num][answer]
            prahar_counts[prahar][idx] += 1
    
    # Convert to DataFrame for easier analysis
    prahar_count_df = pd.DataFrame(prahar_counts)
    
    # Determine the most frequent Prahar for each sample
    df['Label'] = prahar_count_df.idxmax(axis=1)
    
    # Add some noise to make the dataset more realistic (5% randomness)
    # This helps prevent overfitting while maintaining high accuracy
    noise_mask = np.random.random(NUM_SAMPLES) < 0.05
    df.loc[noise_mask, 'Label'] = np.random.randint(1, NUM_PRAHARS + 1, size=noise_mask.sum())
    
    # Save to CSV
    os.makedirs('data', exist_ok=True)
    df.to_csv('data/prahar_custom_dataset.csv', index=False)
    print(f"Generated dataset with {NUM_SAMPLES} samples and saved to 'data/prahar_custom_dataset.csv'")
    
    # Show distribution of prahar labels
    print("\nPrahar distribution:")
    print(df['Label'].value_counts().sort_index())
    
    # Calculate and print the theoretical accuracy
    correct_predictions = 0
    for idx, row in df.iterrows():
        # Skip the noisy samples
        if idx in df[noise_mask].index:
            continue
            
        prahar_votes = prahar_count_df.loc[idx]
        max_prahar = prahar_votes.idxmax()
        if row['Label'] == max_prahar:
            correct_predictions += 1
    
    theoretical_accuracy = correct_predictions / (NUM_SAMPLES - noise_mask.sum()) * 100
    print(f"\nTheoretical accuracy (without noise): {theoretical_accuracy:.2f}%")
    
    return df

if __name__ == "__main__":
    generate_dataset()
