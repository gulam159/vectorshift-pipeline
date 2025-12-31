// noteNode.js
// A simple sticky note node for annotations

import { useState } from "react";
import { FiMessageSquare } from "react-icons/fi";
import { BaseNode, NodeTextarea } from "./BaseNode";

export const NoteNode = ({ id, data }) => {
  const [note, setNote] = useState(data?.note || "");

  return (
    <BaseNode
      id={id}
      title="Note"
      icon={FiMessageSquare}
      // No inputs or outputs - just a comment/annotation node
      inputs={[]}
      outputs={[]}
      accentColor="#d97706"
      style={{
        backgroundColor: "#fffbeb",
        border: "1px solid #fcd34d",
      }}
    >
      <NodeTextarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Add a note..."
        rows={3}
      />
    </BaseNode>
  );
};
