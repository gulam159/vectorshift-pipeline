// submit.js

import { useState } from "react";
import { FiPlay, FiLoader } from "react-icons/fi";
import toast from "react-hot-toast";
import { useStore } from "./store";

export const SubmitButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);

  const isDisabled = nodes.length === 0 || isLoading;

  const handleSubmit = async () => {
    if (isDisabled) return;

    setIsLoading(true);

    try {
      const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";
      const response = await fetch(`${API_URL}/pipelines/parse`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nodes, edges }),
      });

      if (!response.ok) {
        throw new Error("Failed to parse pipeline");
      }

      const data = await response.json();

      // Show toast with results
      if (data.is_dag) {
        toast.success(
          `Pipeline is valid! ${data.num_nodes} nodes, ${data.num_edge} edges`
        );
      } else {
        toast.error(
          `Pipeline has cycles! ${data.num_nodes} nodes, ${data.num_edge} edges`
        );
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(
        "Failed to connect to backend. Make sure the server is running."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="submit-container">
      <button
        type="button"
        className="submit-button"
        onClick={handleSubmit}
        disabled={isDisabled}
        title={nodes.length === 0 ? "Add nodes to run pipeline" : ""}
      >
        {isLoading ? (
          <FiLoader size={16} className="spin" />
        ) : (
          <FiPlay size={16} />
        )}
        <span>{isLoading ? "Analyzing..." : "Run Pipeline"}</span>
      </button>
    </div>
  );
};
