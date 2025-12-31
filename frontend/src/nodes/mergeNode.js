// mergeNode.js
// Node for merging multiple data sources

import { useState } from "react";
import { FiGitMerge } from "react-icons/fi";
import { BaseNode, NodeField, NodeSelect } from "./BaseNode";

export const MergeNode = ({ id, data }) => {
  const [mergeStrategy, setMergeStrategy] = useState(
    data?.mergeStrategy || "concat"
  );

  return (
    <BaseNode
      id={id}
      title="Merge"
      icon={FiGitMerge}
      inputs={[{ id: "input1" }, { id: "input2" }, { id: "input3" }]}
      outputs={[{ id: "merged" }]}
      accentColor="#0891b2"
    >
      <NodeField label="Strategy">
        <NodeSelect
          value={mergeStrategy}
          onChange={(e) => setMergeStrategy(e.target.value)}
          options={[
            { value: "concat", label: "Concatenate" },
            { value: "join", label: "Join with Separator" },
            { value: "array", label: "Create Array" },
            { value: "object", label: "Merge Objects" },
          ]}
        />
      </NodeField>
      <div
        style={{
          fontSize: "10px",
          color: "#94a3b8",
          textAlign: "center",
          marginTop: "4px",
        }}
      >
        Combines up to 3 inputs
      </div>
    </BaseNode>
  );
};
