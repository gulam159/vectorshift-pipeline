// BaseNode.js
// A flexible base component for creating pipeline nodes

import { Handle, Position } from "reactflow";

/**
 * BaseNode - A reusable node component that provides consistent structure
 *
 * @param {string} id - Node ID from ReactFlow
 * @param {string} title - Display title for the node
 * @param {React.ComponentType} icon - Icon component from react-icons
 * @param {Array} inputs - Array of input handle configs: [{ id: string, label?: string, style?: object }]
 * @param {Array} outputs - Array of output handle configs: [{ id: string, label?: string, style?: object }]
 * @param {React.ReactNode} children - Content to render inside the node
 * @param {object} style - Additional styles for the node container
 * @param {string} accentColor - Accent color for the node header
 */
export const BaseNode = ({
  id,
  title,
  icon: Icon,
  inputs = [],
  outputs = [],
  children,
  style = {},
  accentColor,
}) => {
  // Calculate handle positions for even distribution
  const getHandleStyle = (index, total) => {
    if (total === 1) return { top: "50%" };
    const percentage = ((index + 1) / (total + 1)) * 100;
    return { top: `${percentage}%` };
  };

  // Default accent color
  const accent = accentColor || "#6366f1";

  return (
    <div
      className="base-node"
      style={{
        minWidth: 220,
        minHeight: 80,
        border: "1px solid #e2e8f0",
        borderRadius: "12px",
        backgroundColor: "#ffffff",
        color: "#0f172a",
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: "13px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
        overflow: "hidden",
        ...style,
      }}
    >
      {/* Input Handles */}
      {inputs.map((input, index) => (
        <Handle
          key={input.id}
          type="target"
          position={Position.Left}
          id={`${id}-${input.id}`}
          style={{
            ...getHandleStyle(index, inputs.length),
            width: 12,
            height: 12,
            backgroundColor: "#ffffff",
            border: "2px solid #6366f1",
            transition: "all 0.15s ease",
            ...input.style,
          }}
        />
      ))}

      {/* Node Header */}
      <div
        className="node-header"
        style={{
          padding: "10px 14px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          backgroundColor: `${accent}08`,
          borderBottom: "1px solid #e2e8f0",
        }}
      >
        {Icon && (
          <span
            style={{
              width: 28,
              height: 28,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#f8fafc",
              borderRadius: "8px",
              border: `1px solid ${accent}30`,
              color: accent,
            }}
          >
            <Icon size={16} />
          </span>
        )}
        <span
          style={{
            fontWeight: 600,
            color: "#0f172a",
            letterSpacing: "-0.01em",
          }}
        >
          {title}
        </span>
      </div>

      {/* Node Content */}
      <div
        className="node-content"
        style={{
          padding: "12px 14px",
        }}
      >
        {children}
      </div>

      {/* Output Handles */}
      {outputs.map((output, index) => (
        <Handle
          key={output.id}
          type="source"
          position={Position.Right}
          id={`${id}-${output.id}`}
          style={{
            ...getHandleStyle(index, outputs.length),
            width: 12,
            height: 12,
            backgroundColor: "#ffffff",
            border: "2px solid #059669",
            transition: "all 0.15s ease",
            ...output.style,
          }}
        />
      ))}
    </div>
  );
};

/**
 * Field Components - Reusable form elements for node content
 */

export const NodeField = ({ label, children }) => (
  <div style={{ marginBottom: "10px" }}>
    {label && (
      <label
        style={{
          display: "block",
          fontSize: "10px",
          color: "#64748b",
          marginBottom: "6px",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          fontWeight: 500,
        }}
      >
        {label}
      </label>
    )}
    {children}
  </div>
);

export const NodeInput = ({ value, onChange, placeholder, type = "text" }) => (
  <input
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    style={{
      width: "100%",
      padding: "8px 10px",
      border: "1px solid #e2e8f0",
      borderRadius: "6px",
      backgroundColor: "#f8fafc",
      color: "#0f172a",
      fontSize: "12px",
      outline: "none",
      boxSizing: "border-box",
      transition: "border-color 0.15s ease, box-shadow 0.15s ease",
      fontFamily: "'Space Grotesk', sans-serif",
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
);

export const NodeSelect = ({ value, onChange, options }) => (
  <select
    value={value}
    onChange={onChange}
    style={{
      width: "100%",
      padding: "8px 10px",
      border: "1px solid #e2e8f0",
      borderRadius: "6px",
      backgroundColor: "#f8fafc",
      color: "#0f172a",
      fontSize: "12px",
      outline: "none",
      cursor: "pointer",
      fontFamily: "'Space Grotesk', sans-serif",
      appearance: "none",
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "right 10px center",
      paddingRight: "32px",
    }}
  >
    {options.map((opt) => (
      <option key={opt.value} value={opt.value}>
        {opt.label}
      </option>
    ))}
  </select>
);

export const NodeTextarea = ({ value, onChange, placeholder, rows = 3 }) => (
  <textarea
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    rows={rows}
    style={{
      width: "100%",
      padding: "8px 10px",
      border: "1px solid #e2e8f0",
      borderRadius: "6px",
      backgroundColor: "#f8fafc",
      color: "#0f172a",
      fontSize: "12px",
      outline: "none",
      resize: "vertical",
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
);

export default BaseNode;
