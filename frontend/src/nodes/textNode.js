// textNode.js

import { useState, useEffect, useRef, useMemo } from "react";
import { FiFileText } from "react-icons/fi";
import { BaseNode, NodeField } from "./BaseNode";

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || "{{input}}");
  const textareaRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 220, height: 80 });

  // Parse variables from text - matches {{variableName}} pattern
  const variables = useMemo(() => {
    const regex = /\{\{([a-zA-Z_][a-zA-Z0-9_]*)\}\}/g;
    const matches = [];
    let match;

    while ((match = regex.exec(currText)) !== null) {
      // Only add unique variable names
      if (!matches.includes(match[1])) {
        matches.push(match[1]);
      }
    }

    return matches;
  }, [currText]);

  // Create input handles from detected variables
  const dynamicInputs = useMemo(() => {
    return variables.map((varName) => ({
      id: varName,
    }));
  }, [variables]);

  // Auto-resize based on content
  useEffect(() => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;

      // Reset height to auto to get the correct scrollHeight
      textarea.style.height = "auto";

      // Calculate new height based on content
      const newHeight = Math.max(60, textarea.scrollHeight);
      textarea.style.height = `${newHeight}px`;

      // Calculate width based on longest line
      const lines = currText.split("\n");
      const longestLine = lines.reduce(
        (a, b) => (a.length > b.length ? a : b),
        ""
      );
      const charWidth = 7.5; // Approximate character width in pixels
      const newWidth = Math.max(
        220,
        Math.min(400, longestLine.length * charWidth + 40)
      );

      setDimensions({
        width: newWidth,
        height: newHeight + 100, // Add padding for header and label
      });
    }
  }, [currText]);

  return (
    <BaseNode
      id={id}
      title="Text"
      icon={FiFileText}
      inputs={dynamicInputs}
      outputs={[{ id: "output" }]}
      accentColor="#d97706"
      style={{
        minWidth: dimensions.width,
      }}
    >
      <NodeField label="Text Content">
        <textarea
          ref={textareaRef}
          value={currText}
          onChange={(e) => setCurrText(e.target.value)}
          placeholder="Enter text... Use {{variableName}} for variables"
          style={{
            width: "100%",
            minHeight: "60px",
            padding: "8px 10px",
            border: "1px solid #e2e8f0",
            borderRadius: "6px",
            backgroundColor: "#f8fafc",
            color: "#0f172a",
            fontSize: "12px",
            outline: "none",
            resize: "none",
            overflow: "hidden",
            boxSizing: "border-box",
            fontFamily: "'JetBrains Mono', monospace",
            lineHeight: 1.5,
            transition: "border-color 0.15s ease, box-shadow 0.15s ease",
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "#6366f1";
            e.target.style.boxShadow = "0 0 0 3px rgba(99, 102, 241, 0.1)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "#e2e8f0";
            e.target.style.boxShadow = "none";
          }}
        />
      </NodeField>

      {/* Show detected variables */}
      {variables.length > 0 && (
        <div
          style={{
            fontSize: "10px",
            color: "#64748b",
            marginTop: "4px",
            display: "flex",
            flexWrap: "wrap",
            gap: "4px",
          }}
        >
          <span style={{ color: "#94a3b8" }}>Variables:</span>
          {variables.map((v) => (
            <span
              key={v}
              style={{
                backgroundColor: "#fef3c7",
                color: "#92400e",
                padding: "2px 6px",
                borderRadius: "4px",
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              {v}
            </span>
          ))}
        </div>
      )}
    </BaseNode>
  );
};
