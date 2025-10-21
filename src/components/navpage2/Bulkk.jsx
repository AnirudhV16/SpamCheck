/** @format */
import React, { useState } from "react";
import axios from "axios";
import "./Bulkk.css";

const Bulkk = () => {
  const [file, setFile] = useState(null);
  const [models, setModels] = useState(null);
  const [ensemble, setEnsemble] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please upload a CSV file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setError(null);
      const response = await axios.post(
        "https://huggingface.co/spaces/AavV4/Spam_Detection_API/ml_api/bulkclassify/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.error) {
        setError(response.data.error);
      } else {
        setModels(response.data.models);
        setEnsemble(response.data.ensemble);
      }
    } catch (err) {
      setError("Error in file upload or processing.");
    }
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
          </div>
          <button type="submit" className="submit-btn">
            Classify
          </button>
        </form>

        {error && <div className="error">{error}</div>}

        {models && (
          <div className="model-results">
            {Object.entries(models).map(([modelName, modelData]) => (
              <div key={modelName} className="model-section">
                <h3>{modelName}</h3>
                <p>{modelData.description}</p>
                <div className="results-table">
                  <h4>Prediction Results</h4>
                  <table>
                    <thead>
                      <tr>
                        <th>SMS</th>
                        <th>Probability</th>
                      </tr>
                    </thead>
                    <tbody>
                      {modelData.table.map((row, index) => (
                        <tr key={index}>
                          <td>{row.sms}</td>
                          <td>{row.probability}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="chart">
                  <h4>Performance Metrics</h4>
                  <img
                    src={`data:image/png;base64,${modelData.chart}`}
                    alt="Metrics Chart"
                  />
                </div>
                <div className="metrics">
                  <h4>Classification Metrics</h4>
                  <p>
                    <strong>Accuracy:</strong> {modelData.metrics.accuracy}%
                  </p>
                  <p>
                    <strong>Precision:</strong> {modelData.metrics.precision}%
                  </p>
                  <p>
                    <strong>Recall:</strong> {modelData.metrics.recall}%
                  </p>
                  <p>
                    <strong>F1 Score:</strong> {modelData.metrics.f1_score}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {ensemble && (
          <div className="ensemble-section">
            <h3>Ensemble Model Results</h3>
            <div className="results-table">
              <h4>Final Prediction Table</h4>
              <table>
                <thead>
                  <tr>
                    <th>SMS</th>
                    <th>Final Classification</th>
                  </tr>
                </thead>
                <tbody>
                  {ensemble.table.map((row, index) => (
                    <tr key={index}>
                      <td>{row.sms}</td>
                      <td>{row.ensemble}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="chart">
              <h4>Ensemble Performance</h4>
              <img
                src={`data:image/png;base64,${ensemble.chart}`}
                alt="Ensemble Chart"
              />
            </div>
            <div className="metrics">
              <h4>Final Ensemble Metrics</h4>
              <p>
                <strong>Accuracy:</strong> {ensemble.metrics.accuracy}%
              </p>
              <p>
                <strong>Precision:</strong> {ensemble.metrics.precision}%
              </p>
              <p>
                <strong>Recall:</strong> {ensemble.metrics.recall}%
              </p>
              <p>
                <strong>F1 Score:</strong> {ensemble.metrics.f1_score}%
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bulkk;
