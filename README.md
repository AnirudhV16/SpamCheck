#  SpamCheck Backend

Gradio-based backend API for SMS spam detection using multiple machine learning models hosted on Hugging Face Spaces.

## Overview

The backend provides a RESTful API using Gradio that connects to four different ML models hosted on Hugging Face Spaces. It processes both single messages and bulk CSV files, returning classification results and performance metrics.

### Key Components

- **Gradio API**: Web interface and API endpoints
- **Model Clients**: Connections to Hugging Face Spaces
- **Processing Pipeline**: Text preprocessing and feature extraction
- **Ensemble Module**: Soft voting mechanism combining all models
- **Metrics Generator**: Performance visualization with charts

## 🏗️ Architecture

```
┌───────────────────────────────────────────────────────────┐
│                    Gradio Backend (app.py)                │
│                                                           │
│  ┌────────────────────────────────────────────────────┐   │
│  │           API Endpoints                            │   │
│  │  • classify_single_text()                          │   │
│  │  • bulk_classify_file()                            │   │
│  └────────────────────────────────────────────────────┘   │
│                           │                               │
│  ┌────────────────────────────────────────────────────┐   │
│  │        Gradio Client Connections                   │   │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────┐│  │   |
│  │  │BiLSTM    │ │RL Model  │ │PU Learn  │ │GAN   ││  │   |
│  │  │Client    │ │Client    │ │Client    │ │Client││  │   |
│  │  └──────────┘ └──────────┘ └──────────┘ └──────┘│  │   |
│  └────────────────────────────────────────────────────┘   │
│                           │                               │
│  ┌────────────────────────────────────────────────────┐   │
│  │         Classification Functions                   │   │
│  │  • classify_with_bilstm()                          │   │
│  │  • classify_with_rl()                              │   │
│  │  • classify_with_pu()                              │   │
│  │  • classify_with_gan()                             │   │
│  │  • soft_voting_ensemble()                          │   │
│  └────────────────────────────────────────────────────┘   │
│                           │                               │
│  ┌────────────────────────────────────────────────────┐   │
│  │         Metrics & Visualization                    │   │
│  │  • generate_bar_chart()                            │   │
│  │  • calculate_metrics()                             │   │
│  └────────────────────────────────────────────────────┘   │
└───────────────────────────────────────────────────────────┘
                            │
                            ↓
┌───────────────────────────────────────────────────────────┐
│              Hugging Face Spaces (Model Hosting)          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │AavV4/BiLSTM  │  │AavV4/RLmodel │  │AavV4/PULearn │     │
│  │model         │  │              │  │ingmodel      │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│  ┌──────────────┐                                         │
│  │AavV4/GANBERT │                                         │
│  │model         │                                         │
│  └──────────────┘                                         │
└───────────────────────────────────────────────────────────┘
```

## 🤖 Machine Learning Models

### 1. BiLSTM Model (DistilBERT + BiLSTM)
**Hugging Face Space**: [AavV4/BiLSTMmodel](https://huggingface.co/spaces/AavV4/BiLSTMmodel)

**Architecture**:
- Frozen DistilBERT embeddings (768-dimensional)
- Bidirectional LSTM layers (128 units)
- Attention mechanism
- Fully connected classification layer

**Purpose**: Captures sequential dependencies in text

**Performance**:
- Accuracy: 95%
- Precision: 100%
- Recall: 95%
- F1-Score: 96.4%

**Code Integration**:
```python
def classify_with_bilstm(text, client):
    result = client.predict(text=text, api_name="/predict")
    return result.get("spam_confidence")
```

---

### 2. Reinforcement Learning Model (LightRoBERTa + PPO) semi-dynamic
**Hugging Face Space**: [AavV4/RLmodel](https://huggingface.co/spaces/AavV4/RLmodel)


**Architecture**:
- LightRoBERTa embeddings
- Actor-Critic network
- PPO (Proximal Policy Optimization) agent
- semi - Dynamic learning from rewards

**Purpose**: Adapts to evolving spam patterns

**Performance**:
- Accuracy: 77.78%
- Precision: 100%
- Recall: 77.78%
- F1-Score: 87.5%

**Code Integration**:
```python
def classify_with_rl(text, client):
    result = client.predict(text=text, api_name="/predict")
    return result.get("spam_probability")
```

---

### 3. PU Learning Model (XGBoost + RoBERTa)
**Hugging Face Space**: [AavV4/PULearningmodel](https://huggingface.co/spaces/AavV4/PULearningmodel)

**Architecture**:
- RoBERTa embeddings (768-dimensional)
- Two-step XGBoost classification
- Reliable negative extraction
- Hard-negative mining

**Purpose**: Handles imbalanced datasets

**Performance**:
- Accuracy: 44.44%
- Precision: 100%
- Recall: 44.44%
- F1-Score: 61.54%

**Code Integration**:
```python
def classify_with_pu(text, client):
    result = client.predict(text=text, api_name="/predict")
    return result.get("probability")
```

---

### 4. GAN BERT Model (GAN + BERT Embeddings)
**Hugging Face Space**: [AavV4/GANBERTmodel](https://huggingface.co/spaces/AavV4/GANBERTmodel)

**Architecture**:
- Generator network (creates synthetic spam embeddings)
- Discriminator network (distinguishes real vs fake)
- BERT embeddings (768-dimensional)
- BiLSTM classifier

**Purpose**: Improves detection of adversarial spam

**Performance**:
- Accuracy: 88.89%
- Precision: 100%
- Recall: 88.89%
- F1-Score: 94.12%

**Code Integration**:
```python
def classify_with_gan(text, client):
    result = client.predict(text=text, api_name="/predict")
    return result.get("spam_probability")
```

---

## 🔌 API Endpoints

### 1. Single Text Classification

**Endpoint**: `/classify_single_text`

**Method**: POST

**Parameters**:
```python
{
    "text": str,           # SMS message to classify
    "model_select": str   # Model choice: "BiLSTM", "Reinforcement Learning", 
                         # "PU Learning", "GAN BERT", or "Ensemble"
}
```

**Response**:
```python
[
    prediction: str,      # "SPAM" or "NOT SPAM"
    probability: float    # Probability percentage (0-100)
]
```

---

### 2. Bulk File Classification

**Endpoint**: `/bulk_classify_file`

**Method**: POST

**Parameters**:
```python
{
    "file": File  # CSV file with 'sms' and 'label' columns
}
```

**Response**:
```python
[
    summary: str,                # Summary statistics markdown
    combined_results: DataFrame, # All model predictions
    ensemble_results: DataFrame, # Ensemble predictions with true labels
    bilstm_chart: Image,         # BiLSTM metrics bar chart
    rl_chart: Image,             # RL metrics bar chart
    pu_chart: Image,             # PU Learning metrics bar chart
    gan_chart: Image,            # GAN BERT metrics bar chart
    ensemble_chart: Image        # Ensemble metrics bar chart
]
```

---

## 🚀 Installation

### Prerequisites

- Python 3.8+
- pip

### Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### requirements.txt

```txt
gradio==5.9.1
pandas==2.2.3
numpy==2.2.3
matplotlib==3.10.1
scikit-learn==1.6.1
```

---

## 💻 Usage

### Start Gradio Server

```bash
python app.py
```

Server runs at: `http://localhost:7860`

### Access Gradio Interface

1. Open browser to `http://localhost:7860`
2. Use web interface for testing
3. API automatically available at same URL

### API Usage Examples

**Python**:
```python
from gradio_client import Client

client = Client("http://localhost:7860")

# Single prediction
result = client.predict("Free money! Click now!", "Ensemble", api_name="/classify_single_text")
print(result)  # ["SPAM", 95.5]
```

**JavaScript**:
```javascript
import { Client } from "@gradio/client";

const client = await Client.connect("http://localhost:7860");
const result = await client.predict("/classify_single_text", {
    text: "Free money! Click now!",
    model_select: "Ensemble"
});
console.log(result.data);  // ["SPAM", 95.5]
```
---

## 📊 Performance

### Response Times

| Operation | Average Time |
|-----------|-------------|
| Single classification | 1-2 seconds |
| Bulk (100 messages) | 30-45 seconds |
| Bulk (1000 messages) | 5-7 minutes |

### Optimization Tips

1. **Batch Processing**: Process messages in batches
2. **Caching**: Cache model responses for common messages
3. **Async Requests**: Use async/await for parallel processing
4. **Connection Pooling**: Reuse client connections

---

## 🐛 Debugging

### Enable Debug Mode

```python
demo.launch(debug=True)
```

### Check Client Connection

```python
try:
    client = Client("AavV4/BiLSTMmodel")
    print("✅ Client connected successfully")
except Exception as e:
    print(f"❌ Connection failed: {e}")
```

### Test Individual Models

```python
# Test BiLSTM
try:
    result = client1.predict(text="Test message", api_name="/predict")
    print(f"BiLSTM: {result}")
except Exception as e:
    print(f"BiLSTM Error: {e}")

# Test RL Model
try:
    result = client2.predict(text="Test message", api_name="/predict")
    print(f"RL: {result}")
except Exception as e:
    print(f"RL Error: {e}")
```

### Common Issues

**1. Client Connection Timeout**
```python
# Solution: Increase timeout
client = Client("AavV4/BiLSTMmodel", timeout=120)
```

**2. Memory Issues with Large CSV**
```python
# Solution: Process in chunks
chunk_size = 100
for chunk in pd.read_csv(file, chunksize=chunk_size):
    process_chunk(chunk)
```

**3. Model Prediction Returns None**
```python
# Solution: Check API name and response structure
result = client.predict(text=text, api_name="/predict")
if result is None:
    print("Model returned None - check Hugging Face Space logs")
```

---

## 🧪 Testing

### Unit Tests

```python
import unittest

class TestClassification(unittest.TestCase):
    
    def setUp(self):
        self.client = Client("AavV4/BiLSTMmodel")
    
    def test_spam_detection(self):
        text = "Win free money now! Click here!"
        result = classify_with_bilstm(text, self.client)
        self.assertGreater(result, 0.5)  # Should detect as spam
    
    def test_ham_detection(self):
        text = "Meeting at 3pm tomorrow"
        result = classify_with_bilstm(text, self.client)
        self.assertLess(result, 0.5)  # Should detect as ham
    
    def test_empty_input(self):
        result = classify_single_text("", "Ensemble")
        self.assertEqual(result[0], "Please enter some text")

if __name__ == '__main__':
    unittest.main()
```

### Integration Tests

```python
def test_end_to_end():
    # Test single classification
    result = classify_single_text("Test message", "Ensemble")
    assert len(result) == 2
    assert isinstance(result[0], str)
    assert isinstance(result[1], float)
    
    # Test bulk classification
    test_csv = pd.DataFrame({
        'sms': ['spam message', 'ham message'],
        'label': [1, 0]
    })
    test_csv.to_csv('test.csv', index=False)
    
    result = bulk_classify_file('test.csv')
    assert result[0] is not None  # Summary
    assert result[1] is not None  # Combined results
    assert result[2] is not None  # Ensemble results
```

---

## 📊 Performance Benchmarks

### Model Comparison

| Model | Avg Response Time |  Accuracy |
|-------|------------------|----------|
| BiLSTM | 1.2s | 95% |
| RL | 1.5s |  77.78% |
| PU Learning | 0.8s |  44.44% |
| GAN BERT | 1.4s |  88.89% |
| Ensemble | 2.1s |  88.89% |



## 🌐 Deployment Options

### 1. Hugging Face Spaces (Current)

```python
# Already deployed at:
# https://huggingface.co/spaces/AavV4/Spam_Detection

# Advantages:
# - Free hosting
# - Automatic scaling
# - Built-in API
# - Easy updates
```

### 2. Docker Deployment

```dockerfile
# Dockerfile
FROM python:3.8-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY app.py .

EXPOSE 7860

CMD ["python", "app.py"]
```

```bash
# Build and run
docker build -t spam-detection-backend .
docker run -p 7860:7860 spam-detection-backend
```

### 3. AWS Lambda

```python
# lambda_function.py
import json
from gradio_client import Client

def lambda_handler(event, context):
    client = Client("AavV4/BiLSTMmodel")
    text = event['text']
    model = event.get('model', 'Ensemble')
    
    result = classify_single_text(text, model)
    
    return {
        'statusCode': 200,
        'body': json.dumps({
            'prediction': result[0],
            'probability': result[1]
        })
    }
```

### 4. Local Server

```python
# For production deployment
if __name__ == "__main__":
    demo.launch(
        server_name="0.0.0.0",
        server_port=7860,
        share=False,
        ssl_verify=False
    )
```
---

