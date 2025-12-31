// filterNode.js
// Node for filtering/transforming data

import { useState } from "react";
import { FiFilter } from "react-icons/fi";
import { BaseNode, NodeField, NodeInput, NodeSelect } from "./BaseNode";

export const FilterNode = ({ id, data }) => {
  const [filterType, setFilterType] = useState(data?.filterType || "contains");
  const [filterValue, setFilterValue] = useState(data?.filterValue || "");

  return (
    <BaseNode
      id={id}
      title="Filter"
      icon={FiFilter}
      inputs={[{ id: "input" }]}
      outputs={[{ id: "passed" }, { id: "failed" }]}
      accentColor="#0891b2"
    >
      <NodeField label="Filter Type">
        <NodeSelect
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          options={[
            { value: "contains", label: "Contains" },
            { value: "equals", label: "Equals" },
            { value: "startsWith", label: "Starts With" },
            { value: "endsWith", label: "Ends With" },
            { value: "regex", label: "Regex Match" },
          ]}
        />
      </NodeField>
      <NodeField label="Value">
        <NodeInput
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          placeholder="Filter value..."
        />
      </NodeField>
    </BaseNode>
  );
};
