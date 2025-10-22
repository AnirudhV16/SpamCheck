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
  const [client, setClient] = useState(null);

  // Example messages
  const examples = [
    "Hey, I reached safely. Traffic was heavy but managed to get here on time. Let's meet tomorrow if you're free?",
    "Congratulations! You've been chosen for a free ₹2000 shopping voucher. Click http://rewardzmall.in to claim now!",
    "Dear Customer, as a valued member of our loyalty program, you have been pre-approved for a personal loan of up to ₹5,00,000 with zero processing fee and flexible EMI options. This offer is valid only till midnight! To apply, click http://instantloansecure.in or call 1800-999-4321. T&C apply."
  ];

  useEffect(() => {
    const initializeClient = async () => {
      const gradioClient = await Client.connect("AavV4/Spam_Detection");
      setClient(gradioClient);
    };

    initializeClient();
  }, []);

  const handleExampleClick = (exampleText) => {
    setText(exampleText);
    setResult(null);
    setError(null);
  };

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
      const result = await client.predict("/classify_single_text", {
        text: text,
        model_select: modelSelect,
      });

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
        {/* Example Buttons */}
        <div className="examples-section">
          <label>Try Examples:</label>
          <div className="example-buttons">
            {examples.map((example, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleExampleClick(example)}
                className="example-button"
              >
                Example {index + 1}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <label htmlFor="inputText">Enter Text:</label>
          <textarea
            className="input textarea"
            id="inputText"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type your message here..."
            required
            rows="5"
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