# Table of Contents

1. [BFS (Breadth First Search)](#bfs-breadth-first-search)
    - BFS Algorithm
    - Print Shortest Path
2. [DFS (Depth First Search)](#dfs-depth-first-search)
    - DFS Algorithm
    - Classification of Edges
    - DFS with Entry and Exit Times

# BFS (Breadth First Search)

- BFS is a basic searching algorithm on graphs.
- The path found by BFS to any node is the shortest path to that node, i.e., the path with the smallest number of edges in an unweighted graph.
- Time Complexity: O(V + E), where V is the number of vertices and E is the number of edges.
- Space Complexity: O(V)
- The algorithm takes as input an unweighted graph and the source vertex `s`. The graph may be directed or undirected.
- We maintain a queue `q` that contains the vertices to be processed and a boolean array `used[]` to track visited vertices.
- Initially, the source vertex `s` is pushed into the queue, and `used[s] = true`. All other vertices are marked as not visited.
- Then, we loop until the queue is empty. In each iteration, we pop a vertex and iterate through all its neighbors. If a neighbor has not been visited, we mark it as visited and add it to the queue.
- We can calculate the distances of the shortest paths in the array `d[]` and maintain the parent array `p[]` to retrieve the shortest path.

```cpp
pair<vector<int>, vector<int>> BFS(vector<vector<int>> adj, int n, int s)
{
    queue<int> q;
    vector<bool> visited(n, false);
    vector<int> d(n, 0), p(n, -1);

    q.push(s);
    visited[s] = true;
    while (!q.empty())
    {
        int u = q.front();
        q.pop();
        for (int v : adj[u])
        {
            if (!visited[v])
            {
                visited[v] = true;
                d[v] = d[u] + 1;
                p[v] = u;
                q.push(v);
            }
        }
    }
    return {d, p};
}
```

- To display the shortest path from source to a vertex, perform BFS and use the parent array `p[]` to print the path:

```cpp
void printPath(vector<int> p, int u)
{
    if (u == -1)
        return;
    printPath(p, p[u]);
    cout << u << " ";
}
```

---

# DFS (Depth First Search)

- DFS is a basic searching algorithm on graphs.
- DFS finds the lexicographical first path in the graph from a source vertex `s` to each vertex.
- Time Complexity: O(V + E)
- Space Complexity: O(V)
- The idea is to explore as deep into the graph as possible and backtrack when no unvisited adjacent vertices are found.

```cpp
vector<bool> visited;

void DFS(vector<vector<int>> adj, int vertex)
{
    visited[vertex] = true;
    for (int i : adj[vertex])
        if (!visited[i])
            DFS(adj, i);
}
```

### Classification of Edges

- The edges of a graph are classified based on the entry and exit times of the nodes they connect. We perform DFS and classify the edges as follows:

#### If `v` is not visited:
- **Tree Edge:** If `v` is visited after `u`, the edge (u, v) is a tree edge. These edges form the DFS tree.

#### If `v` is visited before `u`:
- **Back Edge:** If `v` is an ancestor of `u`, the edge (u, v) is a back edge. Back edges complete a cycle, which can be used to detect cycles.
- **Forward Edge:** If `v` is a descendant of `u`, the edge (u, v) is a forward edge.
- **Cross Edge:** If `v` is neither an ancestor nor a descendant of `u`, the edge (u, v) is a cross edge.

> **Tip:** In undirected graphs, edges are either tree edges or back edges. Forward and cross edges only exist in directed graphs.

- To compute the entry and exit times, as well as the vertex colors, we use the following approach. We color the vertices with:
  - Color `0` if unvisited
  - Color `1` if visited (currently being processed)
  - Color `2` if exited

```cpp
vector<int> color, time_in, time_out;
int timer = 0;

void DFS(vector<vector<int>> adj, int vertex)
{
    time_in[vertex] = timer++;
    color[vertex] = 1; // entering
    for (int u : adj[vertex])
        if (color[u] == 0) // not visited
            DFS(adj, u);
    color[vertex] = 2; // exiting
    time_out[vertex] = timer++;
}
```

- Make sure to resize the global vectors before calling the DFS function.
