// inputNode.js

import { useState } from "react";
import { FiDownload } from "react-icons/fi";
import { BaseNode, NodeField, NodeInput, NodeSelect } from "./BaseNode";

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.inputName || id.replace("customInput-", "input_")
  );
  const [inputType, setInputType] = useState(data.inputType || "Text");

  return (
    <BaseNode
      id={id}
      title="Input"
      icon={FiDownload}
      outputs={[{ id: "value" }]}
      accentColor="#059669"
    >
      <NodeField label="Name">
        <NodeInput
          value={currName}
          onChange={(e) => setCurrName(e.target.value)}
          placeholder="Input name"
        />
      </NodeField>
      <NodeField label="Type">
        <NodeSelect
          value={inputType}
          onChange={(e) => setInputType(e.target.value)}
          options={[
            { value: "Text", label: "Text" },
            { value: "File", label: "File" },
          ]}
        />
      </NodeField>
    </BaseNode>
  );
};
