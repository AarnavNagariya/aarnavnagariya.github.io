# Table of Contents

1. [Bellman-Ford Algorithm](#bellman-ford-algorithm)
   - [Key Idea](#key-idea)
   - [Simplest Implementation](#simplest-implementation)
   - [Improved Implementation](#improved-implementation-with-early-exit-and-path-reconstruction)

2. [Dijkstra's Algorithm](#dijkstras-algorithm)
   - [Key Idea](#key-idea)
   - [Simplest Implementation](#simplest-implementation-1)
   - [Restoring Shortest Paths](#restoring-shortest-paths)
   - [Optimizing Dijkstra for Sparse Graphs](#optimizing-dijkstra-for-sparse-graphs)
     - [Priority Queue Implementation](#priority-queue-implementation)
     

# Bellman-Ford Algorithm

- **Problem**: Given a weighted directed graph with `V` vertices and `E` edges, and a source vertex `v`, find the shortest path from `v` to all other vertices, even in graphs with negative weight edges.
- **Detects Negative Cycles**: If a negative weight cycle exists, the algorithm will indicate that the shortest path to some vertices doesn't exist.

### Key Idea:
1. Initialize a distance array `d` where `d[v] = 0` for the source vertex `v` and all other distances set to infinity.
2. Relax all edges `(a, b)` for `n-1` phases, where `n` is the number of vertices. Relaxation updates `d[b] = min(d[b], d[a] + c)` where `c` is the edge weight.
3. After `n-1` phases, the distances in `d` represent the shortest paths. If there's a negative cycle, it can be detected in the next phase.

### Algorithm Implementation:

#### Simplest Version:

```cpp
int n;
vector<Edge> edges;
vector<int> d;

void bellmanFord(int v)
{
    d.resize(n, INF);
    d[v] = 0;
    for (int i = 0; i < n - 1; i++)
        for (auto e : edges)
            if (d[e.a] < INF)
                d[e.b] = min(d[e.b], d[e.a] + e.cost);
}
```

#### Improved Version with Early Exit and Path Reconstruction:

```cpp
int n;
vector<Edge> edges;
vector<int> d, p;

void bellmanFord(int v)
{
    d.resize(n, INF);
    p.resize(n, -1);
    d[v] = 0;
    bool flag;
    for (int i = 0; i < n - 1; i++)
    {
        flag = false;
        for (auto e : edges)
            if (d[e.a] < INF && d[e.a] + e.cost < d[e.b])
            {
                d[e.b] = d[e.a] + e.cost;
                p[e.b] = e.a;
                flag = true;
            }
        if (!flag)
            break;  // No relaxation means we can stop early
    }
}
```

---

# Dijkstra's Algorithm

- **Problem**: Given a weighted graph with non-negative edge weights, find the shortest paths from a starting vertex `s` to all other vertices.

### Key Idea:
1. Initialize a distance array `d` where `d[s] = 0` and all other distances are infinity.
2. Use a boolean array `visited` to track vertices that have been processed.
3. At each step, pick the unvisited vertex `v` with the smallest `d[v]`, mark it as visited, and relax all its outgoing edges.

### Algorithm Implementation:

```cpp
int n;
vector<vector<pair<int, int>>> adj;
vector<int> d, p;
vector<bool> visited;

void dijkstra(int s)
{
    d[s] = 0;
    for (int i = 0; i < n; i++)
    {
        int v = -1; // vertex with min distance
        for (int j = 0; j < n; j++)
            if (!visited[j] && (v == -1 || d[j] < d[v]))
                v = j;
        if (d[v] == INF)
            break;  // unreachable vertices
        visited[v] = true;
        for (auto edge : adj[v])
        {
            int to = edge.first;
            int len = edge.second;
            if (d[v] + len < d[to])
            {
                d[to] = d[v] + len;
                p[to] = v;
            }
        }
    }
}

vector<int> restorePath(int s, int t)
{
    vector<int> path;
    for (int v = t; v != s; v = p[v])
        path.push_back(v);
    path.push_back(s);
    reverse(path.begin(), path.end());
    return path;
}
```

---

### Optimizing Dijkstra for Sparse Graphs

- For sparse graphs, use more efficient data structures like **Priority Queues** or **Fibonacci Heaps** to improve the selection of the vertex with the smallest distance.

#### Priority Queue Implementation:

```cpp
int n;
vector<vector<pair<int, int>>> adj;
vector<int> d, p;

void dijkstra(int s)
{
    d[s] = 0;
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> q;
    q.push({0, s});
    while (!q.empty())
    {
        int v = q.top().second;
        q.pop();
        for (auto edge : adj[v])
        {
            int to = edge.first;
            int len = edge.second;
            if (d[v] + len < d[to])
            {
                d[to] = d[v] + len;
                p[to] = v;
                q.push({d[to], to});
            }
        }
    }
}
```