/** @format */
import React, { useState } from "react";
import "./Single.css";

const Single = () => {
  const [text, setText] = useState("");
  const [modelSelect, setModelSelect] = useState("bilstm");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const response = await fetch(
        "http://railback-production.up.railway.app/ml_api/classify/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text, modelSelect }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setResult({
        prediction: data.prediction,
        probability: (data.probability * 100).toFixed(2) + "%", // Display as percentage
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <h1 className="title">SPAM DETECTION TOOL</h1>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <label htmlFor="inputText">Enter Text:</label>
          <input
            className="input"
            type="text"
            id="inputText"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type your message here..."
            required
          />

          <label htmlFor="modelSelect">Select ML Model:</label>
          <select
            className="select"
            id="modelSelect"
            value={modelSelect}
            onChange={(e) => setModelSelect(e.target.value)}
          >
            <option value="bilstm">BiLSTM</option>
            <option value="rl">Reinforcement Learning</option>
            <option value="pu">PU Learning</option>
            <option value="ensemble">Ensemble Model</option>
          </select>

          <button className="button" type="submit">
            <i className="fas fa-paper-plane"></i> Check Spam
          </button>
        </form>

        {loading && <div className="loading">Loading...</div>}
        {result && (
          <div className="result">
            Prediction: <span>{result.prediction}</span>
            <br />
            Probability: <span>{result.probability}</span>
          </div>
        )}
        {error && (
          <div className="result error">
            Error: <span>{error}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Single;
