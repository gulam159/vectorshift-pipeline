// llmNode.js

import { FiCpu } from "react-icons/fi";
import { BaseNode } from "./BaseNode";

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      title="LLM"
      icon={FiCpu}
      inputs={[{ id: "system" }, { id: "prompt" }]}
      outputs={[{ id: "response" }]}
      accentColor="#6366f1"
    >
      <div
        style={{
          color: "#475569",
          fontSize: "12px",
          textAlign: "center",
          padding: "8px 0",
        }}
      >
        Large Language Model
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: "8px",
            fontSize: "10px",
            color: "#94a3b8",
          }}
        >
          <span>← System</span>
          <span>← Prompt</span>
        </div>
      </div>
    </BaseNode>
  );
};
