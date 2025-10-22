import gradio as gr
import pandas as pd
import numpy as np
import matplotlib
matplotlib.use('Agg')  # Use non-interactive backend
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

def bulk_classify_file(file):
    """Bulk classification from CSV file"""
    if file is None:
        return "Please upload a CSV file", None, None, None, None, None, None, None
    
    try:
        # Close all existing figures at the start
        plt.close('all')
        
        # Handle both file path (string) and file object
        if isinstance(file, str):
            df = pd.read_csv(file)
        else:
            df = pd.read_csv(file.name if hasattr(file, 'name') else file)
        
        df = df.dropna()
        
        if "sms" not in df.columns or "label" not in df.columns:
            return 'CSV must contain "sms" and "label" columns', None, None, None, None, None, None, None
        
        smses = df["sms"].astype(str).tolist()
        true_labels = df["label"].astype(int).tolist()
        
        # Results storage
        all_results = []
        model_chart_paths = []
        
        # Process each model
        models_info = [
            ("BiLSTM", classify_with_bilstm, client1),
            ("Reinforcement Learning", classify_with_rl, client2),
            ("PU Learning", classify_with_pu, client3),
            ("GAN BERT", classify_with_gan, client4)
        ]
        
        ensemble_probs = []
        
        for model_name, classify_func, client in models_info:
            probs = [classify_func(sms, client) for sms in smses]
            predictions = [1 if p >= 0.5 else 0 for p in probs]
            
            # Calculate metrics
            metrics = {
                "Accuracy": accuracy_score(true_labels, predictions) * 100,
                "Precision": precision_score(true_labels, predictions, zero_division=0) * 100,
                "Recall": recall_score(true_labels, predictions, zero_division=0) * 100,
                "F1 Score": f1_score(true_labels, predictions, zero_division=0) * 100
            }
            
            # Create results dataframe for this model
            model_df = pd.DataFrame({
                "SMS": smses,
                f"{model_name} Probability (%)": [round(p * 100, 2) for p in probs],
                f"{model_name} Prediction": ["SPAM" if p >= 0.5 else "NOT SPAM" for p in probs]
            })
            all_results.append(model_df)
            
            # Generate chart and save to file
            chart_path = generate_bar_chart(metrics, f"Metrics for {model_name}")
            model_chart_paths.append(chart_path)
            
            ensemble_probs.append(probs)
        
        # Calculate ensemble
        ensemble_final_probs = np.mean(np.array(ensemble_probs), axis=0)
        ensemble_predictions = [1 if p >= 0.5 else 0 for p in ensemble_final_probs]
        
        ensemble_metrics = {
            "Accuracy": accuracy_score(true_labels, ensemble_predictions) * 100,
            "Precision": precision_score(true_labels, ensemble_predictions, zero_division=0) * 100,
            "Recall": recall_score(true_labels, ensemble_predictions, zero_division=0) * 100,
            "F1 Score": f1_score(true_labels, ensemble_predictions, zero_division=0) * 100
        }
        
        # Create ensemble results
        ensemble_df = pd.DataFrame({
            "SMS": smses,
            "Ensemble Probability (%)": [round(p * 100, 2) for p in ensemble_final_probs],
            "Ensemble Prediction": ["SPAM" if p >= 0.5 else "NOT SPAM" for p in ensemble_final_probs],
            "True Label": ["SPAM" if l == 1 else "NOT SPAM" for l in true_labels]
        })
        
        ensemble_chart_path = generate_bar_chart(ensemble_metrics, "Metrics for Ensemble Model")
        
        # Combine all results
        combined_df = pd.concat([df[["sms", "label"]].rename(columns={"sms": "SMS", "label": "True Label"})] + all_results, axis=1)
        combined_df = combined_df.loc[:, ~combined_df.columns.duplicated()]
        
        summary = f"✅ Successfully processed {len(smses)} messages\n\n"
        summary += "**Ensemble Model Performance:**\n"
        for metric, value in ensemble_metrics.items():
            summary += f"- {metric}: {value:.2f}%\n"
        
        # Return chart file paths in the correct order: BiLSTM, RL, PU, GAN, Ensemble
        return (summary, combined_df, ensemble_df, 
                model_chart_paths[0], model_chart_paths[1], model_chart_paths[2], 
                model_chart_paths[3], ensemble_chart_path)
    
    except Exception as e:
        import traceback
        error_detail = traceback.format_exc()
        print(f"Error in bulk_classify_file: {error_detail}")
        return f"Error: {str(e)}\n\nDetails: {error_detail}", None, None, None, None, None, None, None
    finally:
        # Clean up figures after processing
        plt.close('all')

# Create Gradio Interface
with gr.Blocks(title="Spam Detection API", theme=gr.themes.Soft()) as demo:
    gr.Markdown("""
    # 🛡️ SMS Spam Detection System
    
    This application uses multiple machine learning models to detect spam messages:
    - **BiLSTM**: Bidirectional LSTM neural network
    - **Reinforcement Learning**: RL-based classifier
    - **PU Learning**: Positive-Unlabeled learning approach
    - **GAN BERT**: GAN-enhanced BERT model
    - **Ensemble**: Soft voting ensemble of all models
    """)
    
    with gr.Tabs():
        # Single Text Classification Tab
        with gr.Tab("Single Message Classification"):
            gr.Markdown("### Classify a single text message")
            
            with gr.Row():
                with gr.Column():
                    text_input = gr.Textbox(
                        label="Enter Message",
                        placeholder="Type or paste your message here...",
                        lines=5
                    )
                    model_dropdown = gr.Dropdown(
                        choices=["BiLSTM", "Reinforcement Learning", "PU Learning", "GAN BERT", "Ensemble"],
                        value="Ensemble",
                        label="Select Model"
                    )
                    classify_btn = gr.Button("Classify Message", variant="primary")
                
                with gr.Column():
                    prediction_output = gr.Textbox(label="Prediction", interactive=False)
                    probability_output = gr.Number(label="Spam Probability (%)", interactive=False)
            
            classify_btn.click(
                fn=classify_single_text,
                inputs=[text_input, model_dropdown],
                outputs=[prediction_output, probability_output]
            )
            
            gr.Examples(
                examples=[
                    ["Congratulations! You've won a $1000 gift card. Click here to claim now!", "Ensemble"],
                    ["Hi, are we still meeting for lunch tomorrow?", "Ensemble"],
                    ["URGENT: Your account has been compromised. Verify immediately.", "Ensemble"]
                ],
                inputs=[text_input, model_dropdown]
            )
        
        # Bulk Classification Tab
        with gr.Tab("Bulk Classification"):
            gr.Markdown("""
            ### Upload CSV for batch processing
            
            **CSV Format Requirements:**
            - Must contain columns: `sms` (message text) and `label` (0 for NOT SPAM, 1 for SPAM)
            - Example:
            ```
            sms,label
            "Free entry to win!",1
            "Meeting at 3pm",0
            ```
            """)
            
            file_input = gr.File(label="Upload CSV File", file_types=[".csv"])
            bulk_classify_btn = gr.Button("Process File", variant="primary")
            
            with gr.Row():
                summary_output = gr.Markdown(label="Summary")
            
            with gr.Row():
                with gr.Column():
                    gr.Markdown("### Combined Results (All Models)")
                    combined_results = gr.Dataframe(label="Detailed Results")
                
                with gr.Column():
                    gr.Markdown("### Ensemble Results")
                    ensemble_results = gr.Dataframe(label="Ensemble Predictions")
            
            gr.Markdown("### Model Performance Charts")
            
            with gr.Row():
                bilstm_chart = gr.Image(label="BiLSTM Metrics", type="filepath")
                rl_chart = gr.Image(label="RL Metrics", type="filepath")
            
            with gr.Row():
                pu_chart = gr.Image(label="PU Learning Metrics", type="filepath")
                gan_chart = gr.Image(label="GAN BERT Metrics", type="filepath")
            
            with gr.Row():
                ensemble_chart = gr.Image(label="Ensemble Metrics", type="filepath")
            
            bulk_classify_btn.click(
                fn=bulk_classify_file,
                inputs=[file_input],
                outputs=[summary_output, combined_results, ensemble_results, 
                        bilstm_chart, rl_chart, pu_chart, gan_chart, ensemble_chart]
            )

# Launch the app
if __name__ == "__main__":
    demo.launch()
