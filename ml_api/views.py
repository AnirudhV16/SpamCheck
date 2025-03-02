import json
import os
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import io
import base64
from gradio_client import Client
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score
from django.http import JsonResponse

client1 = Client("AavV4/BiLSTMmodel")
client2 = Client("AavV4/RLmodel")
client3 = Client("AavV4/PULearningmodel")
client4 = client = Client("AavV4/GANBERTmodel")

def classify_with_bilstm(text,client):
    
    result = client.predict(
            text=text,
            api_name="/predict")
    return result.get("confidence")

def classify_with_rl(text,client):
    
    result = client.predict(
            text=text,
            api_name="/predict")
    return result.get("spam_probability")
    

def classify_with_pu(text,client):
    result = client.predict(
            text=text,
            api_name="/predict")
    return result.get("probability")

def classify_with_GAN(text,client):
    result = client.predict(
            text=text,
            api_name="/predict")
    #print(result)
    return result.get("spam_probability")

def soft_voting_ensemble(text,client1,client2,client3,client4):
    probs_bilstm = classify_with_bilstm(text,client1)
    probs_rl = classify_with_rl(text,client2)
    probs_pu = classify_with_pu(text,client3)
    probs_gan = classify_with_GAN(text,client4)
    return (probs_bilstm + probs_rl + probs_pu + probs_gan) / 4


def generate_bar_chart(metrics, title):
    fig, ax = plt.subplots()
    ax.bar(metrics.keys(), metrics.values(), color=['blue', 'green', 'orange', 'red'])
    ax.set_ylabel('Percentage')
    ax.set_title(title)
    buf = io.BytesIO()
    plt.savefig(buf, format="png")
    buf.seek(0)
    return base64.b64encode(buf.getvalue()).decode('utf-8')

def bulk_classify(request):
    if request.method == "POST":
        try:
            file = request.FILES.get("file")
            if not file:
                return JsonResponse({'error': 'No file uploaded'}, status=400)

            df = pd.read_csv(file).dropna()
            if "sms" not in df.columns or "label" not in df.columns:
                return JsonResponse({'error': 'CSV must contain "sms" and "label" columns'}, status=400)

            smses = df["sms"].astype(str).tolist()
            true_labels = df["label"].astype(int).tolist()

            model_results = {}
            ensemble_probs = []

            for model_name, classify_func, client in zip(["BiLSTM", "Reinforcement Learning", "PU Learning" ,"GAN BERT"],
                                                 [classify_with_bilstm, classify_with_rl, classify_with_pu, classify_with_GAN],
                                                 [client1,client2,client3,client4]):
                probs = [classify_func(sms,client) for sms in smses]
                print(f"{model_name} Probabilities: {probs}")  # Debugging output
                model_metrics = {
                    "accuracy": accuracy_score(true_labels, [1 if p >= 0.5 else 0 for p in probs]) * 100,
                    "precision": precision_score(true_labels, [1 if p >= 0.5 else 0 for p in probs], zero_division=0) * 100,
                    "recall": recall_score(true_labels, [1 if p >= 0.5 else 0 for p in probs], zero_division=0) * 100,
                    "f1_score": f1_score(true_labels, [1 if p >= 0.5 else 0 for p in probs], zero_division=0) * 100
                }
                model_results[model_name] = {
                    "description": f"{model_name} model for spam detection.",
                    "table": [{"sms": sms, "probability": round(prob * 100, 2)} for sms, prob in zip(smses, probs)],
                    "metrics": model_metrics,
                    "chart": generate_bar_chart(model_metrics, f"Metrics for {model_name}")
                }
                ensemble_probs.append(probs)

            ensemble_final_probs = np.mean(np.array(ensemble_probs), axis=0)
            print(f"Ensemble Probabilities: {ensemble_final_probs}")  # Debugging output
            ensemble_metrics = {
                "accuracy": accuracy_score(true_labels, [1 if p >= 0.5 else 0 for p in ensemble_final_probs]) * 100,
                "precision": precision_score(true_labels, [1 if p >= 0.5 else 0 for p in ensemble_final_probs], zero_division=0) * 100,
                "recall": recall_score(true_labels, [1 if p >= 0.5 else 0 for p in ensemble_final_probs], zero_division=0) * 100,
                "f1_score": f1_score(true_labels, [1 if p >= 0.5 else 0 for p in ensemble_final_probs], zero_division=0) * 100
            }
            ensemble_results = [{"sms": sms, "ensemble": "SPAM" if prob >= 0.5 else "NOT SPAM"} for sms, prob in zip(smses, ensemble_final_probs)]

            return JsonResponse({
    "models": model_results,
    "ensemble": {
        "table": ensemble_results,
        "metrics": ensemble_metrics,
        "chart": generate_bar_chart(ensemble_metrics, f"Metrics for Ensemble Model")
    }
})

        except Exception as e:
            print(f"Bulk Classification Error: {e}")
            return JsonResponse({'error': str(e)}, status=500)
    return JsonResponse({'error': 'Invalid request method'}, status=405)


def classify_text(request):
    if request.method == "POST":
        try:
            # Parse the JSON request body
            data = json.loads(request.body)
            text = data.get('text', '')
            model_selected = data.get('modelSelect', 'bilstm')  # Default to BiLSTM

            if not text:
                return JsonResponse({'error': 'No text provided'}, status=400)

            # Get predictions based on the selected model
            if model_selected == 'bilstm':
                probability = classify_with_bilstm(text,client1)
            elif model_selected == 'rl':
                probability = classify_with_rl(text,client2)
            elif model_selected == 'pu':
                probability = classify_with_pu(text,client3)
            elif model_selected == 'gan':
                probability = classify_with_GAN(text,client4)
            elif model_selected == 'ensemble':
                probability = soft_voting_ensemble(text,client1,client2,client3,client4)
            else:
                return JsonResponse({'error': 'Invalid model selected'}, status=400)

            # Return the prediction and probability as a JSON response
            return JsonResponse({
                'prediction': "SPAM" if probability >= 0.5 else "NOT SPAM",
                'probability': probability
            })
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    # Return an error for non-POST requests
    return JsonResponse({'error': 'Invalid request method'}, status=405)