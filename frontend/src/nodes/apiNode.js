// apiNode.js
// Node for making API calls

import { useState } from "react";
import { FiGlobe } from "react-icons/fi";
import { BaseNode, NodeField, NodeInput, NodeSelect } from "./BaseNode";

export const APINode = ({ id, data }) => {
  const [url, setUrl] = useState(data?.url || "");
  const [method, setMethod] = useState(data?.method || "GET");

  return (
    <BaseNode
      id={id}
      title="API Call"
      icon={FiGlobe}
      inputs={[{ id: "headers" }, { id: "body" }]}
      outputs={[{ id: "response" }, { id: "status" }]}
      accentColor="#0891b2"
    >
      <NodeField label="Method">
        <NodeSelect
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          options={[
            { value: "GET", label: "GET" },
            { value: "POST", label: "POST" },
            { value: "PUT", label: "PUT" },
            { value: "DELETE", label: "DELETE" },
          ]}
        />
      </NodeField>
      <NodeField label="URL">
        <NodeInput
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://api.example.com"
        />
      </NodeField>
    </BaseNode>
  );
};
