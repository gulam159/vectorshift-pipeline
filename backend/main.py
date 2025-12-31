import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
from collections import defaultdict, deque


app = FastAPI()

# CORS configuration - allow frontend origins
allowed_origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class PipelineRequest(BaseModel):
    nodes: List[Dict[str, Any]]
    edges: List[Dict[str, Any]]


class PipelineResponse(BaseModel):
    num_nodes: int
    num_edge: int
    is_dag: bool


def is_dag(nodes: List[Dict], edges: List[Dict]) -> bool:
    if not nodes:
        return True
    
    # Build adjacency list and in-degree count
    node_ids = {node["id"] for node in nodes}
    adj = defaultdict(list)
    in_degree = defaultdict(int)
    
    # Initialize in-degree for all nodes
    for node_id in node_ids:
        in_degree[node_id] = 0
    
    # Build graph from edges
    for edge in edges:
        source = edge.get("source")
        target = edge.get("target")
        
        # Only consider edges between existing nodes
        if source in node_ids and target in node_ids:
            adj[source].append(target)
            in_degree[target] += 1
    
    # Kahn's algorithm: start with nodes that have no incoming edges
    queue = deque([node_id for node_id in node_ids if in_degree[node_id] == 0])
    visited_count = 0
    
    while queue:
        node = queue.popleft()
        visited_count += 1
        
        for neighbor in adj[node]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)
    
    # If we visited all nodes, there's no cycle (it's a DAG)
    return visited_count == len(node_ids)


@app.get("/")
def read_root():
    return {"Ping": "Pong"}


@app.post("/pipelines/parse")
def parse_pipeline(request: PipelineRequest) -> PipelineResponse:
    """
    Parse a pipeline and return analysis results.
    
    - num_nodes: Number of nodes in the pipeline
    - num_edges: Number of edges in the pipeline  
    - is_dag: Whether the pipeline forms a valid DAG (no cycles)
    """
    nodes = request.nodes
    edges = request.edges
    
    num_nodes = len(nodes)
    num_edges = len(edges)
    dag_check = is_dag(nodes, edges)
    
    return PipelineResponse(
        num_nodes=num_nodes,
        num_edge=num_edges,
        is_dag=dag_check
    )
