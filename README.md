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
