# 🛡️ SpamCheck - Hybrid SMS Spam Detection System

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://your-deployment-url.com)

An advanced SMS spam detection system leveraging multiple machine learning approaches including PU Learning, Reinforcement Learning, BiLSTM, and GAN-based models with an ensemble voting mechanism.

## Overview

SpamCheck is a comprehensive spam detection solution developed as part of a B.Tech Computer Science & Engineering project at Sri Venkatesa Perumal College of Engineering & Technology. The system addresses the limitations of traditional spam filtering methods by integrating multiple advanced machine learning techniques.

### Key Highlights

- **Multi-Model Approach**: Combines 4 different ML models for robust classification
- **Ensemble Learning**: Soft voting mechanism for improved accuracy
- **Real-time Classification**: Single message and bulk processing capabilities
- **Interactive UI**: Modern React-based frontend with performance visualizations
- **High Accuracy**: Achieves up to 100% accuracy with BiLSTM model

## Features

### Core Capabilities

- ✅ **Single Message Detection** - Real-time spam classification for individual messages
- ✅ **Bulk Processing** - Upload CSV files for batch classification
- ✅ **Multiple Models** - Choose from 5 different classification approaches
- ✅ **Performance Metrics** - Detailed accuracy, precision, recall, and F1-score visualization
- ✅ **Ensemble Voting** - Combines predictions from all models for optimal results
- ✅ **Adversarial Robustness** - Handles text obfuscation and evasion techniques

### Advanced Features

-  **PU Learning** - Handles imbalanced datasets effectively
-  **Reinforcement Learning** - Adapts to evolving spam patterns
-  **BiLSTM** - Captures sequential dependencies in messages
-  **GAN-Based** - Generates synthetic spam for improved training
-  **Real-time Analytics** - Visual performance comparison across models

## System Architecture

```
┌───────────────────────────────────────────────────────────┐
│                        Frontend (React)                   │
│  ┌────────────┐  ┌────────────┐  ┌─────────────────────┐  │
│  │   Home     │  │   Single   │  │    Bulk Detection   │  │
│  │   Page     │  │ Detection  │  │    & Analytics      │  │
│  └────────────┘  └────────────┘  └─────────────────────┘  │
└───────────────────────────────────────────────────────────┘
                            │
                            ↓ (Gradio Client API)
┌───────────────────────────────────────────────────────────┐
│                    Backend (Gradio + Python)              │
│  ┌──────────────────────────────────────────────────────┐ │
│  │           Data Processing Module                     │ │
│  │  • Text Preprocessing  • Feature Extraction          | │
│  │  • Tokenization        • Embedding Generation        │ │
│  └──────────────────────────────────────────────────────┘ │
│                            │                              │
│  ┌──────────────────────────────────────────────────────┐ │
│  │        Machine Learning Models Module                │ │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌─────────┐  │ │
│  │  │PU Learn  │ │    RL    │ │ BiLSTM   │ │  GAN    │  │ │
│  │  │XGBoost+  │ │LightRoB  │ │DistilB   │ │  BERT   │  │ │
│  │  │RoBERTa   │ │+PPO      │ │Frozen    │ │Embeddi  │  │ │
│  │  └──────────┘ └──────────┘ └──────────┘ └─────────┘  │ │
│  └──────────────────────────────────────────────────────┘ │
│                            │                              │
│  ┌──────────────────────────────────────────────────────┐ │
│  │            Ensemble Module (Soft Voting)             │ │
│  └──────────────────────────────────────────────────────┘ │
└───────────────────────────────────────────────────────────┘
                             │
                             ↓
┌───────────────────────────────────────────────────────────┐
│              Hugging Face Spaces (Model Hosting)          │
│  • BiLSTM Model      • RL Model                           │
│  • PU Learning       • GAN BERT                           │
└───────────────────────────────────────────────────────────┘
```

##  Dataset Details

### Training Dataset Statistics

| Metric | Value |
|--------|-------|
| **Total Messages** | 67,008 |
| **Training Set** | 36,648 (54.7%) |
| **Validation Set** | 5,236 (7.8%) |
| **Test Set** | 10,472 (15.6%) |
| **Spam Messages** | 26,178 (39.1%) |
| **Ham Messages** | 40,830 (60.9%) |

### Dataset Composition

- **Source**: Combined SMS Spam Collection Dataset
- **Format**: CSV with `message` and `label` columns
- **Preprocessing**: Text normalization, tokenization, embedding generation
- **Features**: RoBERTa, DistilBERT, and LightRoBERTa embeddings

### Data Distribution

```
Class Distribution:
├── Non-Spam (Ham): 40,830 messages (60.9%)
└── Spam: 26,178 messages (39.1%)

Dataset Split:
├── Train: 36,648 messages
├── Validation: 5,236 messages
└── Test: 10,472 messages
```

## 🎥 Demo Video

[![SpamCheck Demo](https://img.shields.io/badge/▶️-Watch%20Demo-red?style=for-the-badge&logo=youtube)](https://github.com/user-attachments/assets/a0effc19-1a33-4346-a7a4-cf3432d507e7)

**Video Highlights:**
- Single message detection walkthrough
- Bulk CSV processing demonstration
- Model comparison and metrics visualization
- Real-time classification examples

## 📸 Screenshots

### 1. Homepage
![Homepage](<img width="1600" height="859" alt="s1" src="https://github.com/user-attachments/assets/cc773abb-2b77-40d5-bdaa-1a1b7487364f" />)
*Landing page with options for single and bulk detection*

### 2. Single Message Detection
![Single Detection](<img width="1600" height="860" alt="s2" src="https://github.com/user-attachments/assets/902a72c9-0614-4ea4-8364-1c0d8e9bd962" />)
*Real-time spam classification with model selection*

### 3. Bulk Processing Interface
![Bulk Upload](<img width="1600" height="859" alt="s3" src="https://github.com/user-attachments/assets/15cc51cd-a99a-4f20-9060-7784d25a171d" />)
*CSV file upload for batch processing*

### 4. Results Dashboard
![Metrics Visualization](<img width="1600" height="857" alt="s4" src="https://github.com/user-attachments/assets/92e1b2fd-6c41-4c14-8e71-f62f1cc3098d" />)
*Comprehensive results table with ensemble predictions*

### 5. Performance Metrics
![Results](<img width="1600" height="856" alt="s5" src="https://github.com/user-attachments/assets/6de58229-ce97-4f12-ac1b-69dbc3ef549d" />)
*Detailed performance comparison across all models*

## Installation

### Prerequisites

- Node.js 18+ and npm
- Python 3.8+
- Git

### Backend Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/SpamCheck.git
cd SpamCheck

# Navigate to backend
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Run Gradio backend
python app.py
```

The backend will be available at `http://localhost:7860`

### Frontend Setup

```bash
# Navigate to frontend directory
cd front

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will be available at `http://localhost:5173`


## 💻 Usage

- Try out SpamCheck with examples given

### Single Message Detection

1. Navigate to the **Single Detection** page
2. Enter your SMS message in the text input
3. Select a model (BiLSTM, RL, PU Learning, GAN BERT, or Ensemble)
4. Click **"Check Spam"**
5. View the prediction result and probability

### Bulk Processing

1. Navigate to the **Bulk Detection** page
2. Prepare a CSV file with columns: `sms` and `label`
3. Upload the CSV file
4. Click **"Upload & Classify"**
5. View comprehensive results:
   - Summary statistics
   - Combined model predictions
   - Ensemble results
   - Performance metrics for each model

### Example CSV Format

```csv
sms,label
"Congratulations! You've won $1000. Click here to claim",1
"Hi, are we still meeting for lunch tomorrow?",0
"URGENT: Your account has been compromised. Verify now",1
```

## 📈 Model Performance

### Individual Model Metrics

| Model | Accuracy | Precision | Recall | F1 Score |
|-------|----------|-----------|--------|----------|
| **BiLSTM** | 95% | 100% | 95% | 94.6% |
| **GAN BERT** | 88.89% | 100% | 88.89% | 94.12% |
| **Reinforcement Learning** | 77.78% | 100% | 77.78% | 87.5% |
| **PU Learning** | 44.44% | 100% | 44.44% | 61.54% |
| **Ensemble** | 88.89% | 100% | 88.89% | 94.12% |

### Key Performance Insights

- ✅ **Low False Positives**: All models achieve high precision
- ✅ **High Recall**: BiLSTM and GAN BERT models excel at detecting spam
- ✅ **Robust Ensemble**: Soft voting mechanism balances all predictions
- ✅ **Adversarial Resistant**: Handles text obfuscation effectively

## 🛠️ Tech Stack

### Frontend
- **React 18.3.1** - UI framework
- **Vite 6.0** - Build tool and dev server
- **@gradio/client** - API communication
- **CSS3** - Styling with modern gradients and animations

### Backend
- **Python 3.8+** - Core language
- **Gradio** - ML model deployment and API
- **PyTorch** - Deep learning framework
- **Transformers** - Pre-trained models (RoBERTa, DistilBERT)
- **XGBoost** - Gradient boosting for PU Learning
- **Scikit-learn** - Machine learning utilities
- **Pandas & NumPy** - Data processing

### ML Models
- **RoBERTa** - Contextual embeddings for PU Learning
- **LightRoBERTa** - Lightweight embeddings for RL
- **DistilBERT** - Frozen embeddings for BiLSTM
- **BERT** - GAN-based synthetic data generation
### https://huggingface.co/AavV4

### Deployment
- **Hugging Face Spaces** - Model hosting
- **GitHub** - Version control and CSV storage
- **Netlify** - Frontend hosting options

## 📁 Project Structure

```
SpamCheck/
├── backend/                    # Gradio backend
│   ├── app.py                 # Main Gradio application
│   ├── requirements.txt       # Python dependencies
│   └── README.md             # Backend documentation
│
├── front/                     # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── home/         # Homepage component
│   │   │   ├── navbar/       # Navigation bar
│   │   │   ├── navpage1/     # Single detection page
│   │   │   └── navpage2/     # Bulk detection page
│   │   ├── App.jsx           # Main app component
│   │   ├── main.jsx          # Entry point
│   │   └── index.css         # Global styles
│   ├── public/               # Static assets
│   ├── package.json          # Node dependencies
│   └── README.md            # Frontend documentation
│
└── README.md               # This file
```

## 📧 Contact

- **Email**: [vennapusaani1629@gmail.com](mailto:vennapusaani1629@gmail.com)
- **GitHub**: [@AnirudhV16](https://github.com/AnirudhV16)
- **Project Link**: [https://github.com/AnirudhV16/SpamCheck](https://github.com/AnirudhV16/SpamCheck)

---

**⭐ If you find this project useful, please consider giving it a star!**
