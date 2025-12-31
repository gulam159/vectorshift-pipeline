# VectorShift Pipeline Builder

A visual node-based pipeline builder built with React and FastAPI.

![Pipeline Builder](https://img.shields.io/badge/React-18-blue) ![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-green) ![License](https://img.shields.io/badge/license-MIT-gray)

## Live Demo

- **Frontend**: [vectorshift-lovat.vercel.app](https://vectorshift-lovat.vercel.app)
- **Backend**: [vectorshift-pipeline.onrender.com](https://vectorshift-pipeline.onrender.com)

## Features

### Node Types

- **Input/Output** - Define pipeline entry and exit points
- **Text** - Dynamic text with variable support using `{{variable}}` syntax
- **LLM** - Configure AI model parameters
- **API** - HTTP request configuration
- **Filter/Merge/Conditional** - Logic and data flow control
- **Note** - Add documentation to your pipeline

### Core Functionality

- **Drag & Drop** - Intuitive node placement from categorized toolbar
- **Dynamic Connections** - Visual edge creation between node handles
- **Variable Detection** - Text nodes automatically create input handles for `{{variable}}`
- **DAG Validation** - Backend validates pipeline structure (detects cycles)
- **Responsive UI** - Clean light theme with smooth interactions

## Tech Stack

| Layer      | Technology                          |
| ---------- | ----------------------------------- |
| Frontend   | React 18, ReactFlow, Zustand        |
| Backend    | Python, FastAPI, Pydantic           |
| Styling    | CSS Variables, react-icons          |
| Deployment | Vercel (Frontend), Render (Backend) |

## Getting Started

### Prerequisites

- Node.js 18+
- Python 3.9+

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

Runs at `http://localhost:3000`

### Backend Setup

```bash
cd backend
pip install -r requirements.txt
python -m uvicorn main:app --reload
```

Runs at `http://localhost:8000`

## Project Structure

```
vectorshift/
├── frontend/
│   ├── src/
│   │   ├── nodes/          # Node components (BaseNode, TextNode, etc.)
│   │   ├── App.js          # Main application
│   │   ├── toolbar.js      # Draggable node palette
│   │   ├── ui.js           # ReactFlow canvas
│   │   ├── store.js        # Zustand state management
│   │   ├── submit.js       # Pipeline submission logic
│   │   └── index.css       # Global styles
│   └── package.json
├── backend/
│   ├── main.py             # FastAPI application
│   └── requirements.txt
└── README.md
```

## API Documentation

Interactive API docs available at: [vectorshift-pipeline.onrender.com/docs](https://vectorshift-pipeline.onrender.com/docs)

### `POST /pipelines/parse`

Validates pipeline structure and returns analysis.

**Request:**

```json
{
  "nodes": [...],
  "edges": [...]
}
```

**Response:**

```json
{
  "num_nodes": 5,
  "num_edge": 4,
  "is_dag": true
}
```

## Architecture Decisions

### Node Abstraction

All nodes extend a `BaseNode` component that handles:

- Consistent styling and layout
- Dynamic input/output handle positioning
- Accent color theming

### State Management

Zustand provides lightweight, performant state management for nodes and edges without Redux boilerplate.

### DAG Validation

Kahn's algorithm (topological sort) detects cycles in O(V + E) time complexity.

## Environment Variables

### Frontend (Vercel)

| Variable            | Description                         |
| ------------------- | ----------------------------------- |
| `REACT_APP_API_URL` | Backend API URL (no trailing slash) |

### Backend (Render)

| Variable          | Description                            |
| ----------------- | -------------------------------------- |
| `ALLOWED_ORIGINS` | Comma-separated frontend URLs for CORS |

## License

MIT
