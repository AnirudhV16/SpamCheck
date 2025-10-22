<<<<<<< HEAD
# 🛡️ SpamCheck - Hybrid SMS Spam Detection System

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://unique-blancmange-44c8f0.netlify.app/)

An advanced SMS spam detection system leveraging multiple machine learning approaches including PU Learning, Reinforcement Learning (semi-dynamic), BiLSTM with distilbert, and GAN-based models with an ensemble voting mechanism.

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

---

## 🎥 Demo Video

[![SpamCheck Demo](https://img.shields.io/badge/▶️-Watch%20Demo-red?style=for-the-badge&logo=youtube)](https://github.com/user-attachments/assets/a0effc19-1a33-4346-a7a4-cf3432d507e7)

**Video Highlights:**
- Single message detection walkthrough
- Bulk CSV processing demonstration
- Model comparison and metrics visualization
- Real-time classification examples

## 📸 Screenshots

### 1. Homepage
<img width="1600" height="859" alt="s1" src="https://github.com/user-attachments/assets/cc773abb-2b77-40d5-bdaa-1a1b7487364f" />
*Landing page with options for single and bulk detection*

### 2. Single Message Detection
<img width="1600" height="860" alt="s2" src="https://github.com/user-attachments/assets/902a72c9-0614-4ea4-8364-1c0d8e9bd962" />
*Real-time spam classification with model selection*

### 3. Bulk Processing Interface
<img width="1600" height="859" alt="s3" src="https://github.com/user-attachments/assets/15cc51cd-a99a-4f20-9060-7784d25a171d" />
*CSV file upload for batch processing*

### 4. Results Dashboard
<img width="1600" height="857" alt="s4" src="https://github.com/user-attachments/assets/92e1b2fd-6c41-4c14-8e71-f62f1cc3098d" />
*Comprehensive results table with ensemble predictions*

### 5. Performance Metrics
<img width="1600" height="856" alt="s5" src="https://github.com/user-attachments/assets/6de58229-ce97-4f12-ac1b-69dbc3ef549d" />
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
---

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
=======
#  SpamCheck Frontend

Modern, responsive React application for SMS spam detection with real-time classification and performance analytics.


##  Overview

The frontend is built with React 18.3.1 and Vite, providing a fast, modern user interface for interacting with the spam detection ML models. It communicates with the Gradio backend via the `@gradio/client` library.

### Key Features

-  **Lightning-fast** development with Vite
-  **Modern UI** with gradient backgrounds and smooth animations
-  **Responsive design** for mobile and desktop
-  **Real-time updates** with live classification
-  **Data visualization** with performance charts

##  Architecture

```
┌───────────────────────────────────────────────────────────┐
│                        React App                          │
│                                                           │
│  ┌────────────────────────────────────────────────────┐   │
│  │               App.jsx (Router)                     │   │
│  │  ┌──────────────────────────────────────────────┐  │   │
│  │  │            Navbar Component                  │  │   │
│  │  │  • Home • Single Detection • Bulk Detection  │  │   │
│  │  └──────────────────────────────────────────────┘  │   │
│  │                                                    │   │
│  │  ┌──────────────────────────────────────────────┐  │   │
│  │  │                  Routes                      │  │   │
│  │  │  ┌────────────┐  ┌──────────┐  ┌─────────┐ │ │  |   │
│  │  │  │   Home     │  │  Single  │  │  Bulk   │ │ │  |   │
│  │  │  │   Page     │  │  Detect  │  │ Detect  │ │ │  |   │
│  │  │  └────────────┘  └──────────┘  └─────────┘ │ │  |   │
│  │  └──────────────────────────────────────────────┘  │   │
│  └────────────────────────────────────────────────────┘   │
│                           │                               │
│                           ↓                               │
│  ┌────────────────────────────────────────────────────┐   │
│  │         @gradio/client Integration                 │   │
│  │  • Client.connect()                                │   │
│  │  • client.predict()                                │   │
│  │  • handle_file()                                   │   │
│  └────────────────────────────────────────────────────┘   │
└───────────────────────────────────────────────────────────┘
                            │
                            ↓
            ┌──────────────────────────────┐
            │   Gradio Backend API         │
            │   (Hugging Face Spaces)      │
            └──────────────────────────────┘
```

## 📁 Project Structure

```
front/
├── public/                          # Static assets
│   ├── _redirects                  # Netlify redirect rules
│   ├── dataset_details.json        # Dataset metadata
│   └── vite.svg                    # Vite logo
│
├── src/
│   ├── components/
│   │   ├── home/                   # Homepage component
│   │   │   ├── Home.jsx           # Main landing page
│   │   │   └── Home.css           # Homepage styles
│   │   │
│   │   ├── navbar/                 # Navigation component
│   │   │   ├── Navbar.jsx         # Navigation bar
│   │   │   └── Navbar.css         # Navbar styles
│   │   │
│   │   ├── navpage1/               # Single detection page
│   │   │   ├── Single.jsx         # Single message classifier
│   │   │   └── Single.css         # Single page styles
│   │   │
│   │   └── navpage2/               # Bulk detection page
│   │       ├── Bulkk.jsx          # Bulk CSV classifier
│   │       └── Bulkk.css          # Bulk page styles
│   │
│   ├── assets/                     # Images and icons
│   │   └── react.svg
│   │
│   ├── App.jsx                     # Main app component with routing
│   ├── main.jsx                    # React DOM entry point
│   └── index.css                   # Global styles and CSS variables
│
├── .gitignore                      # Git ignore rules
├── eslint.config.js                # ESLint configuration
├── index.html                      # HTML entry point
├── package.json                    # Node dependencies
├── package-lock.json               # Locked dependency versions
├── vite.config.js                  # Vite configuration
└── README.md                       # This file
```

---

##  State Management

### Single Detection States

| State | Type | Purpose |
|-------|------|---------|
| `text` | string | User input message |
| `modelSelect` | string | Selected ML model |
| `loading` | boolean | Loading indicator |
| `result` | object | Classification result |
| `error` | string | Error messages |
| `client` | object | Gradio client instance |

### Bulk Detection States

| State | Type | Purpose |
|-------|------|---------|
| `file` | File | Uploaded CSV file |
| `loading` | boolean | Processing indicator |
| `uploadingToGithub` | boolean | GitHub upload status |
| `summary` | string | Summary statistics |
| `combinedResults` | object | All model predictions |
| `ensembleResults` | object | Ensemble predictions |
| `charts` | object | Performance metric images |
| `error` | string | Error messages |
| `client` | object | Gradio client instance |
| `githubUrl` | string | Uploaded file URL |

---

##  API Integration

### Gradio Client Setup

```javascript
import { Client, handle_file } from "@gradio/client";

// Initialize connection
const client = await Client.connect("AavV4/Spam_Detection");
```

### API Endpoints

#### 1. Single Text Classification

```javascript
const result = await client.predict("/classify_single_text", {
  text: "Your message here",
  model_select: "Ensemble"
});

// Response: [prediction: string, probability: number]
```

#### 2. Bulk File Classification

```javascript
const fileHandle = await handle_file(githubRawUrl);
const result = await client.predict("/bulk_classify_file", {
  file: fileHandle
});

// Response: [
//   summary: string,
//   combinedResults: DataFrame,
//   ensembleResults: DataFrame,
//   bilstmChart: Image,
//   rlChart: Image,
//   puChart: Image,
//   ganChart: Image,
//   ensembleChart: Image
// ]
```

---

### Design Principles

1. **Glassmorphism**: Backdrop blur effects
2. **Gradient Accents**: Linear gradients for emphasis
3. **Smooth Animations**: 0.3s ease transitions
4. **Dark Theme**: Professional dark color scheme
5. **Responsive Grid**: Auto-fit layouts

### Key CSS Features

- Box shadows for depth
- Border radius for modern look
- Hover effects for interactivity
- Loading animations
- Responsive breakpoints

---

##  Installation

### Prerequisites

- Node.js 18+ and npm

### Install Dependencies

```bash
cd front
npm install
```

### Dependencies Overview

```json
{
  "dependencies": {
    "@gradio/client": "^2.0.0-dev.0",  // Gradio API client
    "axios": "^1.7.9",                  // HTTP requests
    "react": "^18.3.1",                 // UI framework
    "react-dom": "^18.3.1",             // React DOM
    "react-router-dom": "^6.28.2"       // Routing
  }
}
```

---

##  Development

### Start Development Server

```bash
npm run dev
```

Server runs at: `http://localhost:5173`

---

##  Build & Deployment

### Build for Production

```bash
npm run build
```

Output: `dist/` directory

### Deployment Options

#### 1. Netlify

```bash
# netlify.toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

```

### GitHub Token Setup

1. Go to GitHub Settings → Developer settings → Personal access tokens
2. Generate new token (PAT for one dummy repo for storing files in it, only contents read-write permissions)
3. Select scopes: `repo` (Full control of private repositories)
4. Copy token and add to Bulkk.jsx file

⚠️ **SECURITY WARNING**: The GitHub token in `Bulkk.jsx` is exposed client-side. 
Use a token with minimal permissions (read/write to one dummy repo only).
Never use a token with access to important repositories.

```

---

##  User Flows

### Single Detection Flow

```
User enters text → Selects model → Clicks submit →
Frontend validates input → Connects to Gradio client →
Sends prediction request → Backend processes →
Returns result → Display prediction & probability
```

### Bulk Detection Flow

```
User uploads CSV → Validates file format →
Uploads to GitHub → Gets raw URL →
Sends to Gradio with file handle →
Backend processes all messages →
Returns summary, predictions, charts →
Display tables and visualizations
```

---

##  Testing

### Manual Testing Checklist

- [ ] Single message classification works
- [ ] All models return correct predictions
- [ ] File upload accepts only CSV files
- [ ] Bulk processing displays all results
- [ ] Charts render correctly
- [ ] Error messages display properly
- [ ] Navigation works across all pages
- [ ] Responsive design on mobile
- [ ] Loading states show correctly
- [ ] GitHub upload succeeds

---

##  Troubleshooting

### Common Issues

**1. Gradio Client Connection Failed**
```
Error: Failed to connect to the ML service

Solution:
- Check if backend is running
- Verify Hugging Face Space URL
- Check network connection
```

**2. CSV Upload Fails**
```
Error: Failed to upload to GitHub

Solution:
- Verify GITHUB_TOKEN (make sure it has limited permissions and no sensitive data)
- as Github Token is publically exposed
- Check token permissions (needs 'repo' scope)
- Ensure repository exists
```

**3. Charts Not Displaying**
```
Solution:
- Check browser console for image URL errors
- Verify backend returns valid image data
- Clear browser cache
```

**4. Build Errors**
```
Error: Module not found

Solution:
npm install
npm run build
```

---
>>>>>>> front/main
