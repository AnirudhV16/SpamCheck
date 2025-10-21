/** @format */
import React, { useState, useEffect } from "react";
import { Client } from "@gradio/client";
import "./Single.css";

const Single = () => {
  const [text, setText] = useState("");
  const [modelSelect, setModelSelect] = useState("Ensemble");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!text.trim()) {
      setError("Please enter some text");
      return;
    }

    setLoading(true);
    setResult(null);
    setError(null);

    try {
      // Call Gradio's classify_single_text function
      const result = await client.predict("/classify_single_text", {
        text: text,
        model_select: modelSelect,
      });

      // Assuming the result structure is similar to the previous fetch response
      const [prediction, probability] = result.data;

      setResult({
        prediction: prediction,
        probability: `${probability}%`
      });
      
    } catch (err) {
      console.error("Error:", err);
      setError(err.message || "An error occurred while processing your request");
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
            <option value="BiLSTM">BiLSTM</option>
            <option value="Reinforcement Learning">Reinforcement Learning</option>
            <option value="PU Learning">PU Learning</option>
            <option value="GAN BERT">GAN BERT</option>
            <option value="Ensemble">Ensemble Model</option>
          </select>

          <button className="button" type="submit" disabled={loading}>
            {loading ? "Processing..." : "Check Spam"}
          </button>
        </form>

        {loading && <div className="loading">Analyzing message...</div>}
        
        {result && (
          <div className="result">
            <strong>Prediction:</strong> <span>{result.prediction}</span>
            <br />
            <strong>Spam Probability:</strong> <span>{result.probability}</span>
          </div>
        )}
        
        {error && (
          <div className="result error">
            <strong>Error:</strong> <span>{error}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Single;
