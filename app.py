import gradio as gr
import pandas as pd
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from gradio_client import Client
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score
import io
import base64

# Initialize clients
client1 = Client("AavV4/BiLSTMmodel")
client2 = Client("AavV4/RLmodel")
client3 = Client("AavV4/PULearningmodel")
client4 = Client("AavV4/GANBERTmodel")

def classify_with_bilstm(text, client):
    result = client.predict(text=text, api_name="/predict")
    return result.get("spam_confidence")

def classify_with_rl(text, client):
    result = client.predict(text=text, api_name="/predict")
    return result.get("spam_probability")

def classify_with_pu(text, client):
    result = client.predict(text=text, api_name="/predict")
    return result.get("probability")

def classify_with_gan(text, client):
    result = client.predict(text=text, api_name="/predict")
    return result.get("spam_probability")

def soft_voting_ensemble(text, client1, client2, client3, client4):
    probs_bilstm = classify_with_bilstm(text, client1)
    probs_rl = classify_with_rl(text, client2)
    probs_pu = classify_with_pu(text, client3)
    probs_gan = classify_with_gan(text, client4)
    return (probs_bilstm + probs_rl + probs_pu + probs_gan) / 4

def classify_single_text(text, model_select):
    """Single text classification"""
    if not text or text.strip() == "":
        return "Please enter some text", 0.0
    
    try:
        if model_select == "BiLSTM":
            probability = classify_with_bilstm(text, client1)
        elif model_select == "Reinforcement Learning":
            probability = classify_with_rl(text, client2)
        elif model_select == "PU Learning":
            probability = classify_with_pu(text, client3)
        elif model_select == "GAN BERT":
            probability = classify_with_gan(text, client4)
        elif model_select == "Ensemble":
            probability = soft_voting_ensemble(text, client1, client2, client3, client4)
        else:
            return "Invalid model selection", 0.0
        
        prediction = "SPAM" if probability >= 0.5 else "NOT SPAM"
        return prediction, round(probability * 100, 2)
    
    except Exception as e:
        return f"Error: {str(e)}", 0.0

def generate_bar_chart(metrics, title):
    """Generate a bar chart for metrics and save to file"""
    # Close any existing figures to prevent memory warning
    plt.close('all')
    
    fig, ax = plt.subplots(figsize=(10, 6))
    ax.bar(metrics.keys(), metrics.values(), color=['#3498db', '#2ecc71', '#e74c3c', '#f39c12'])
    ax.set_ylabel('Percentage (%)', fontsize=12)
    ax.set_title(title, fontsize=14, fontweight='bold')
    ax.set_ylim(0, 100)
    for i, (k, v) in enumerate(metrics.items()):
        ax.text(i, v + 2, f'{v:.2f}%', ha='center', fontsize=10)
    plt.tight_layout()
    
    # Save figure to a temporary file
    import tempfile
    temp_file = tempfile.NamedTemporaryFile(delete=False, suffix='.png')
    fig.savefig(temp_file.name, format='png', dpi=100, bbox_inches='tight')
    plt.close(fig)
    
    return temp_file.name

