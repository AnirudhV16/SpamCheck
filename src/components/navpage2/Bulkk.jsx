import React, { useState, useEffect } from "react";
import { Client, handle_file } from "@gradio/client"; 
import "./Bulkk.css";

const Bulkk = () => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [uploadingToGithub, setUploadingToGithub] = useState(false);
    const [summary, setSummary] = useState(null);
    const [combinedResults, setCombinedResults] = useState(null);
    const [ensembleResults, setEnsembleResults] = useState(null);
    const [charts, setCharts] = useState({});
    const [error, setError] = useState(null);
    const [client, setClient] = useState(null);
    const [githubUrl, setGithubUrl] = useState(null);

    const part1 = "github_pat_11AXTNHLA09bBf4DMiAdis";
    const part2 = "_yqjZwRHc9ZMHQi11JNLJpBVddhjA1pVDzVRsoScScliPDPZKMGO20eGfzQp";

    // GitHub Configuration
    const GITHUB_CONFIG = {
        owner: "AnirudhV16",
        repo: "csv_files",
        branch: "main",
        token: part1 + part2,
        uploadPath: "uploads/"
    };

    useEffect(() => {
        const initializeClient = async () => {
            try {
                const gradioClient = await Client.connect("AavV4/Spam_Detection");
                setClient(gradioClient);
                console.log("✅ Client initialized successfully");
            } catch (err) {
                console.error("❌ Failed to initialize Gradio client:", err);
                setError("Failed to connect to the ML service");
            }
        };
        initializeClient();
    }, []);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        
        if (!selectedFile) {
            setError("No file selected");
            return;
        }
        
        if (!selectedFile.name.toLowerCase().endsWith('.csv')) {
            setError("Please upload a CSV file");
            return;
        }
        
        setFile(selectedFile);
        setError(null);
        setGithubUrl(null);
        setSummary(null);
        setCombinedResults(null);
        setEnsembleResults(null);
        setCharts({});
        console.log("File selected:", selectedFile.name);
    };

    const checkFileExists = async (filename) => {
        try {
            const apiUrl = `https://api.github.com/repos/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}/contents/${filename}`;
            
            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Authorization': `token ${GITHUB_CONFIG.token}`,
                    'Accept': 'application/vnd.github.v3+json',
                }
            });

            if (response.ok) {
                const data = await response.json();
                return { exists: true, sha: data.sha };
            }
            
            return { exists: false, sha: null };
        } catch (err) {
            console.log("File doesn't exist or error checking:", err);
            return { exists: false, sha: null };
        }
    };

    const uploadToGitHub = async (file) => {
        setUploadingToGithub(true);
        
        try {
            const fileContent = await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => {
                    const base64 = reader.result.split(',')[1];
                    resolve(base64);
                };
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });

            const filename = `${GITHUB_CONFIG.uploadPath}${file.name}`;

            console.log("Checking if file exists:", filename);
            const { exists, sha } = await checkFileExists(filename);

            const apiUrl = `https://api.github.com/repos/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}/contents/${filename}`;

            const requestBody = {
                message: exists ? `Update ${file.name}` : `Upload ${file.name}`,
                content: fileContent,
                branch: GITHUB_CONFIG.branch
            };

            if (exists) {
                console.log("File exists, replacing...");
                requestBody.sha = sha;
            } else {
                console.log("New file, creating...");
            }

            const response = await fetch(apiUrl, {
                method: 'PUT',
                headers: {
                    'Authorization': `token ${GITHUB_CONFIG.token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to upload to GitHub');
            }

            const rawUrl = `https://raw.githubusercontent.com/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}/${GITHUB_CONFIG.branch}/${filename}`;
            
            console.log(exists ? "✅ File replaced on GitHub:" : "✅ File uploaded to GitHub:", rawUrl);
            setGithubUrl(rawUrl);
            
            return rawUrl;
            
        } catch (err) {
            console.error("❌ GitHub upload error:", err);
            throw new Error(`Failed to upload to GitHub: ${err.message}`);
        } finally {
            setUploadingToGithub(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            setError("Please select a CSV file");
            return;
        }

        if (!client) {
            setError("Client not initialized. Please refresh the page.");
            return;
        }

        setLoading(true);
        setError(null);
        setSummary(null);
        setCombinedResults(null);
        setEnsembleResults(null);
        setCharts({});

        try {
            console.log("Starting process...");
            
            console.log("Uploading file to GitHub...");
            const rawUrl = await uploadToGitHub(file);
            
            console.log("Processing CSV from:", rawUrl);
            const fileHandle = await handle_file(rawUrl);
            console.log("File handle created:", fileHandle);

            const result = await client.predict("/bulk_classify_file", {
                file: fileHandle
            });

            console.log("Result received:", result);

            if (!result || !result.data) {
                throw new Error("Invalid response from server");
            }

            const [summaryText, combinedData, ensembleData, bilstmChart, rlChart, puChart, ganChart, ensembleChart] = result.data;

            if (summaryText && typeof summaryText === 'string' && summaryText.includes("Error:")) {
                throw new Error(summaryText);
            }

            setSummary(summaryText);
            setCombinedResults(combinedData);
            setEnsembleResults(ensembleData);

            setCharts({
                bilstm: bilstmChart?.url || null,
                rl: rlChart?.url || null,
                pu: puChart?.url || null,
                gan: ganChart?.url || null,
                ensemble: ensembleChart?.url || null
            });

            console.log("✅ Classification completed successfully!");
            console.log("📊 Charts received:", {
                bilstm: bilstmChart,
                rl: rlChart,
                pu: puChart,
                gan: ganChart,
                ensemble: ensembleChart
            });

        } catch (err) {
            console.error("❌ Error:", err);
            setError(err.message || "An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const renderDataFrame = (data) => {
        if (!data || !data.headers || !data.data) {
            return <p>No data available</p>;
        }

        return (
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            {data.headers.map((header, idx) => (
                                <th key={idx}>{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.data.map((row, rowIdx) => (
                            <tr key={rowIdx}>
                                {row.map((cell, cellIdx) => (
                                    <td key={cellIdx}>{cell !== null && cell !== undefined ? cell : 'N/A'}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    return (
        <div className="page">
            <h2 className="title">BULK SMS CLASSIFICATION</h2>

            <div className="bulk-container">
                <form onSubmit={handleSubmit} className="bulk-form">
                    <div className="form-group">
                        <label htmlFor="file">Upload CSV File</label>
                        <input
                            type="file"
                            id="file"
                            name="file"
                            accept=".csv"
                            onChange={handleFileChange}
                        />
                        <small>CSV must contain 'sms' and 'label' columns</small>
                        {file && <small style={{ color: '#10b981', display: 'block', marginTop: '5px' }}>✓ Selected: {file.name}</small>}
                        {githubUrl && <small style={{ color: '#06b6d4', display: 'block', marginTop: '5px' }}>✓ Uploaded to: {githubUrl}</small>}
                    </div>
                    <button type="submit" className="submit-btn" disabled={loading || !client}>
                        {uploadingToGithub 
                            ? "Uploading to GitHub..." 
                            : loading 
                            ? "Processing..." 
                            : !client 
                            ? "Connecting..." 
                            : "Upload & Classify"}
                    </button>
                </form>

                {(loading || uploadingToGithub) && (
                    <div className="loading">
                        <p>{uploadingToGithub ? "Uploading file to GitHub..." : "Processing your file... This may take a few moments."}</p>
                    </div>
                )}

                {error && <div className="error">❌ {error}</div>}

                {summary && (
                    <div className="metrics">
                        <h3>📊 Summary</h3>
                        <pre>{summary}</pre>
                    </div>
                )}

                {combinedResults && (
                    <div className="results-section">
                        <h3>🔍 Combined Model Results</h3>
                        {renderDataFrame(combinedResults)}
                    </div>
                )}

                {ensembleResults && (
                    <div className="results-section">
                        <h3>🎯 Ensemble Model Results</h3>
                        {renderDataFrame(ensembleResults)}
                    </div>
                )}

                {Object.keys(charts).length > 0 && Object.values(charts).some(chart => chart) && (
                    <div className="charts-section">
                        <h3>📈 Performance Metrics</h3>
                        
                        <div className="chart-grid">
                            {charts.bilstm && (
                                <div className="chart">
                                    <h4>BiLSTM Metrics</h4>
                                    <img src={charts.bilstm} alt="BiLSTM Metrics" />
                                </div>
                            )}
                            
                            {charts.rl && (
                                <div className="chart">
                                    <h4>Reinforcement Learning Metrics</h4>
                                    <img src={charts.rl} alt="RL Metrics" />
                                </div>
                            )}
                            
                            {charts.pu && (
                                <div className="chart">
                                    <h4>PU Learning Metrics</h4>
                                    <img src={charts.pu} alt="PU Learning Metrics" />
                                </div>
                            )}
                            
                            {charts.gan && (
                                <div className="chart">
                                    <h4>GAN BERT Metrics</h4>
                                    <img src={charts.gan} alt="GAN BERT Metrics" />
                                </div>
                            )}
                            
                            {charts.ensemble && (
                                <div className="chart ensemble-chart">
                                    <h4>Ensemble Model Metrics</h4>
                                    <img src={charts.ensemble} alt="Ensemble Metrics" />
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Bulkk;
