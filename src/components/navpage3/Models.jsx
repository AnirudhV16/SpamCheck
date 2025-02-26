/** @format */

import React, { useEffect, useState } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import "./Models.css"; // Import CSS

// Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend
);

const Models = () => {
  const [metrics, setMetrics] = useState(null);
  const [datasetDetails, setDatasetDetails] = useState(null);

  // Fetch metrics.json and dataset_details.json
  useEffect(() => {
    fetch("/metrics.json")
      .then((response) => response.json())
      .then((data) => setMetrics(data))
      .catch((error) => console.error("Error fetching metrics:", error));

    fetch("/dataset_details.json")
      .then((response) => response.json())
      .then((data) => setDatasetDetails(data))
      .catch((error) =>
        console.error("Error fetching dataset details:", error)
      );
  }, []);

  if (!metrics || !datasetDetails) {
    return <div className="loading">Loading...</div>;
  }

  const accuracyData = {
    labels: ["Test Accuracy", "Adversarial Accuracy"],
    datasets: [
      {
        label: "Accuracy (%)",
        data: [
          (metrics.test_accuracy * 100).toFixed(2),
          (metrics.adversarial_accuracy * 100).toFixed(2),
        ],
        backgroundColor: ["#4caf50", "#ff9800"],
        borderColor: ["#388e3c", "#f57c00"],
        borderWidth: 1,
      },
    ],
  };

  const datasetDistribution = {
    labels: ["Training", "Validation", "Testing"],
    datasets: [
      {
        label: "Dataset Distribution",
        data: [
          datasetDetails.training_size,
          datasetDetails.validation_size,
          datasetDetails.test_size,
        ],
        backgroundColor: ["#42a5f5", "#66bb6a", "#ffa726"],
      },
    ],
  };

  const lossGraphData = {
    labels: metrics.epoch_details.map((epoch) => `Epoch ${epoch.epoch}`),
    datasets: [
      {
        label: "Training Loss",
        data: metrics.training_loss.map((loss) => (loss === null ? 0 : loss)),
        borderColor: "#ff5722",
        backgroundColor: "rgba(255, 87, 34, 0.2)",
        fill: true,
      },
      {
        label: "Validation Loss",
        data: metrics.validation_loss.map((loss) => (loss === null ? 0 : loss)),
        borderColor: "#3f51b5",
        backgroundColor: "rgba(63, 81, 181, 0.2)",
        fill: true,
      },
    ],
  };

  const confusionMatrixData = {
    labels: [
      "True Positive",
      "False Positive",
      "False Negative",
      "True Negative",
    ],
    datasets: [
      {
        label: "Confusion Matrix",
        data: [
          datasetDetails.confusion_matrix.true_positive,
          datasetDetails.confusion_matrix.false_positive,
          datasetDetails.confusion_matrix.false_negative,
          datasetDetails.confusion_matrix.true_negative,
        ],
        backgroundColor: ["#66bb6a", "#ef5350", "#29b6f6", "#ab47bc"],
      },
    ],
  };

  return (
    <div className="models-page">
      <h1>Model Details</h1>

      {/* Section 1: Model Overview */}
      <section className="model-overview">
        <h2>Model Overview</h2>
        <p>
          <strong>Model Name:</strong> DistilRoBERTa
          <br />
          <strong>Purpose:</strong> Spam Classification
          <br />
          <strong>Architecture:</strong> Transformer-based architecture
          optimized for binary classification tasks.
          <br />
          <strong>Framework:</strong> Hugging Face Transformers and PyTorch
        </p>
      </section>

      {/* Section 2: Training Details */}
      <section className="training-details">
        <h2>Training Details</h2>
        <p>
          <strong>Training Dataset Size:</strong> {datasetDetails.training_size}{" "}
          samples
          <br />
          <strong>Validation Dataset Size:</strong>{" "}
          {datasetDetails.validation_size} samples
          <br />
          <strong>Epochs:</strong> 5
          <br />
          <strong>Batch Size:</strong> 16
          <br />
          <strong>Optimizer:</strong> Adam
        </p>
        <div className="graph-container large line-chart">
          <Line
            data={lossGraphData}
            options={{
              responsive: true,
              plugins: { legend: { position: "top" } },
            }}
          />
        </div>
      </section>

      {/* Section 3: Testing Details */}
      <section className="testing-details">
        <h2>Testing Details</h2>
        <p>
          <strong>Test Dataset Size:</strong> {datasetDetails.test_size} samples
          <br />
          <strong>Test Accuracy:</strong>{" "}
          {(metrics.test_accuracy * 100).toFixed(2)}%
          <br />
          <strong>Adversarial Accuracy:</strong>{" "}
          {(metrics.adversarial_accuracy * 100).toFixed(2)}%
        </p>
        <div className="graph-container bar-chart">
          <Bar
            data={accuracyData}
            options={{
              responsive: true,
              plugins: { legend: { display: false } },
            }}
          />
        </div>
        <h3>Confusion Matrix</h3>
        <div className="graph-container pie-chart">
          <Pie data={confusionMatrixData} options={{ responsive: true }} />
        </div>
      </section>

      {/* Section 4: Dataset Details */}
      <section className="dataset-details">
        <h2>Dataset Details</h2>
        <p>
          <strong>Dataset Source:</strong> {datasetDetails.source}
          <br />
          <strong>Classes:</strong> {datasetDetails.classes.join(", ")}
        </p>
        <div className="graph-container pie-chart">
          <Pie data={datasetDistribution} options={{ responsive: true }} />
        </div>
      </section>
    </div>
  );
};

export default Models;
