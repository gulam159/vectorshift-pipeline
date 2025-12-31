// conditionalNode.js
// Node for branching logic (if/else)

import { useState } from "react";
import { FiHelpCircle } from "react-icons/fi";
import { BaseNode, NodeField, NodeInput, NodeSelect } from "./BaseNode";

export const ConditionalNode = ({ id, data }) => {
  const [operator, setOperator] = useState(data?.operator || "equals");
  const [compareValue, setCompareValue] = useState(data?.compareValue || "");

  return (
    <BaseNode
      id={id}
      title="Condition"
      icon={FiHelpCircle}
      inputs={[{ id: "input" }]}
      outputs={[{ id: "true" }, { id: "false" }]}
      accentColor="#0891b2"
    >
      <NodeField label="Operator">
        <NodeSelect
          value={operator}
          onChange={(e) => setOperator(e.target.value)}
          options={[
            { value: "equals", label: "== Equals" },
            { value: "notEquals", label: "!= Not Equals" },
            { value: "greaterThan", label: "> Greater Than" },
            { value: "lessThan", label: "< Less Than" },
            { value: "isEmpty", label: "Is Empty" },
            { value: "isNotEmpty", label: "Is Not Empty" },
          ]}
        />
      </NodeField>
      <NodeField label="Compare To">
        <NodeInput
          value={compareValue}
          onChange={(e) => setCompareValue(e.target.value)}
          placeholder="Value to compare..."
        />
      </NodeField>
    </BaseNode>
  );
};
