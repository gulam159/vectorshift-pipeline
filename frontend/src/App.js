import { Toaster } from "react-hot-toast";
import { PipelineToolbar } from "./toolbar";
import { PipelineUI } from "./ui";

function App() {
  return (
    <div className="app-container">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "14px",
          },
          success: {
            style: {
              background: "#ecfdf5",
              color: "#065f46",
              border: "1px solid #059669",
            },
            iconTheme: {
              primary: "#059669",
              secondary: "#ecfdf5",
            },
          },
          error: {
            style: {
              background: "#fef2f2",
              color: "#991b1b",
              border: "1px solid #dc2626",
            },
            iconTheme: {
              primary: "#dc2626",
              secondary: "#fef2f2",
            },
          },
        }}
      />
      <PipelineToolbar />
      <PipelineUI />
    </div>
  );
}

export default App;
