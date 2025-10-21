/** @format */
import React, { useState, useEffect } from "react";
import { Client } from "@gradio/client";
import "./Bulkk.css";

const Bulkk = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState(null);
  const [combinedResults, setCombinedResults] = useState(null);
  const [ensembleResults, setEnsembleResults] = useState(null);
  const [charts, setCharts] = useState({});
  const [error, setError] = useState(null);
  
  // Initialize the Gradio client
  const [client, setClient] = useState(null);

  useEffect(() => {
    const initializeClient = async () => {
      const gradioClient = await Client.connect("AavV4/Spam_Detection");
      setClient(gradioClient);
    };

    initializeClient();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setError("Please upload a CSV file");
      return;
    }

    setLoading(true);
    setError(null);
    setSummary(null);
    setCombinedResults(null);
    setEnsembleResults(null);
    setCharts({});

    try {
      // Read file as a Blob
      const reader = new FileReader();
      
      reader.onload = async (event) => {
        const fileData = event.target.result;

        try {
          // Call Gradio's bulk_classify_file function
          const result = await client.predict("/bulk_classify_file", {
            file: new Blob([fileData], { type: "text/csv" }), // Ensure the Blob is of type CSV
          });

          // Assuming the result structure is similar to the previous fetch response
          const output = result.data;

          // Extract results from the output array
          // [summary, combined_df, ensemble_df, chart1, chart2, chart3, chart4, ensemble_chart]
          const [
            summaryText,
            combinedData,
            ensembleData,
            bilstmChart,
            rlChart,
            puChart,
            ganChart,
            ensembleChart
          ] = output;

          setSummary(summaryText);
          setCombinedResults(combinedData);
          setEnsembleResults(ensembleData);
          
          setCharts({
            bilstm: bilstmChart?.url || bilstmChart,
            rl: rlChart?.url || rlChart,
            pu: puChart?.url || puChart,
            gan: ganChart?.url || ganChart,
            ensemble: ensembleChart?.url || ensembleChart
          });

          setLoading(false);
        } catch (err) {
          console.error("Processing error:", err);
          setError(err.message || "Error processing the file");
          setLoading(false);
        }
      };

      reader.onerror = () => {
        setError("Error reading file");
        setLoading(false);
      };

      reader.readAsArrayBuffer(file); // Read as ArrayBuffer for Blob creation

    } catch (err) {
      console.error("Error:", err);
      setError(err.message || "An error occurred");
      setLoading(false);
    }
  };

  const renderDataFrame = (data) => {
    if (!data || !data.headers || !data.data) return null;

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
                  <td key={cellIdx}>{cell}</td>
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
          </div>
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Processing..." : "Classify"}
          </button>
        </form>

        {loading && (
          <div className="loading">
            <p>Processing your file... This may take a few moments.</p>
          </div>
        )}

        {error && <div className="error">{error}</div>}

        {summary && (
          <div className="metrics">
            <h3>Summary</h3>
            <pre style={{ whiteSpace: 'pre-wrap' }}>{summary}</pre>
          </div>
        )}

        {combinedResults && (
          <div className="results-section">
            <h3>Combined Model Results</h3>
            {renderDataFrame(combinedResults)}
          </div>
        )}

        {ensembleResults && (
          <div className="results-section">
            <h3>Ensemble Model Results</h3>
            {renderDataFrame(ensembleResults)}
          </div>
        )}

        {Object.keys(charts).length > 0 && (
          <div className="charts-section">
            <h3>Performance Metrics</h3>
            
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
