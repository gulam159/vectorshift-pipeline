// toolbar.js

import { useState } from "react";
import { DraggableNode } from "./draggableNode";
import { SubmitButton } from "./submit";
import {
  FiDownload,
  FiUpload,
  FiCpu,
  FiFileText,
  FiGlobe,
  FiFilter,
  FiGitMerge,
  FiHelpCircle,
  FiMessageSquare,
} from "react-icons/fi";

// Define node categories with their nodes
const nodeCategories = {
  General: [
    { type: "customInput", label: "Input", icon: FiDownload },
    { type: "customOutput", label: "Output", icon: FiUpload },
    { type: "text", label: "Text", icon: FiFileText },
    { type: "note", label: "Note", icon: FiMessageSquare },
  ],
  Logic: [
    { type: "filter", label: "Filter", icon: FiFilter },
    { type: "merge", label: "Merge", icon: FiGitMerge },
    { type: "conditional", label: "Condition", icon: FiHelpCircle },
  ],
  LLMs: [{ type: "llm", label: "LLM", icon: FiCpu }],
  Integrations: [{ type: "api", label: "API", icon: FiGlobe }],
};

const tabs = Object.keys(nodeCategories);

export const PipelineToolbar = () => {
  const [activeTab, setActiveTab] = useState("General");

  return (
    <div className="toolbar">
      <div className="toolbar-header">
        <div className="toolbar-logo">
          <div className="toolbar-logo-icon">
            <img
              src="https://framerusercontent.com/images/PUVFaa9JKxr86MtwPIPVKLjAY.png"
              alt="VectorShift"
              width={36}
              height={36}
            />
          </div>
          <div>
            <div className="toolbar-title">VectorShift</div>
            <div className="toolbar-subtitle">Pipeline Builder</div>
          </div>
        </div>

        <SubmitButton />
      </div>

      {/* Tabs */}
      <div className="toolbar-tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`toolbar-tab ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Nodes for active tab */}
      <div className="toolbar-nodes">
        {nodeCategories[activeTab].map((node) => (
          <DraggableNode
            key={node.type}
            type={node.type}
            label={node.label}
            icon={node.icon}
          />
        ))}
      </div>
    </div>
  );
};
