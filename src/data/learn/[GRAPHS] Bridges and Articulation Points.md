# Table of Contents

1. [Bridges](#bridges)
   - [Key Idea](#key-idea)
   - [Conditions](#conditions)
   - [Algorithm Implementation](#algorithm-implementation)
2. [Articulation Points](#articulation-points)
   - [Key Idea](#key-idea-1)
   - [Algorithm Implementation](#algorithm-implementation-1)
3. [Additional Resources](#additional-resources)


# Bridges and Articulation Points

## Bridges

- A **bridge** (or cut-edge) is an edge in an undirected graph, which, when removed, increases the number of connected components (disconnects the graph).
- The algorithm to find all bridges is based on **DFS** (Depth First Search) and has a time complexity of O(V + E), where V is the number of vertices and E is the number of edges.

### Key Idea:
- Pick an arbitrary vertex `root` and run DFS from it.
- An edge (v, to) is a bridge if none of the vertices reachable from `to` (or its descendants in DFS) can reach `v` or any of its ancestors via a back edge. This means there's no other way from `v` to `to` except through the edge (v, to).

### Conditions:
- Let `tin[v]` be the entry time of vertex `v`.
- `low[v]` represents the smallest `tin` value reachable from vertex `v`. It is calculated based on:
  - `tin[v]`
  - `tin[p]`, for all back edges (v, p)
  - `low[to]`, for each child `to` of `v` in the DFS tree.
  
- The edge (v, to) is a bridge if `low[to] > tin[v]`.

### Algorithm Implementation:

```cpp
vector<bool> visited;
vector<int> tin, low;
int timer;

void dfs(vector<vector<int>> adj, vector<pair<int, int>> &bridges, int v, int p = -1)
{
    visited[v] = true;
    tin[v] = low[v] = timer++;
    for (int to : adj[v])
    {
        if (to == p) continue;  // Skip the parent
        if (visited[to])
            low[v] = min(low[v], tin[to]);  // Back edge
        else
        {
            dfs(adj, bridges, to, v);
            low[v] = min(low[v], low[to]);
            if (low[to] > tin[v])  // Bridge condition
                bridges.emplace_back(v, to);
        }
    }
}

vector<pair<int, int>> findBridges(vector<vector<int>> adj, int n)
{
    timer = 0;
    visited.assign(n, false);
    tin.assign(n, -1);
    low.assign(n, -1);
    vector<pair<int, int>> bridges;
    for (int i = 0; i < n; i++)
        if (!visited[i])
            dfs(adj, bridges, i);
    return bridges;
}
```

---

## Articulation Points

- An **articulation point** (or cut vertex) is a vertex in an undirected graph that, when removed along with its edges, increases the number of connected components (disconnects the graph).
- The algorithm for finding articulation points is similar to the one for finding bridges.

### Key Idea:
- Pick an arbitrary vertex `root` and run DFS from it.
- At any point during DFS, if a vertex `v != root` has a child `to` such that `low[to] >= tin[v]`, then `v` is an articulation point.
- If `v == root`, it is an articulation point if it has more than one child in the DFS tree.

### Algorithm Implementation:

```cpp
vector<bool> visited;
vector<int> tin, low;
int timer;

void dfs(vector<vector<int>> adj, vector<int> &cut_points, int v, int p = -1)
{
    visited[v] = true;
    tin[v] = low[v] = timer++;
    int children = 0;
    for (int to : adj[v])
    {
        if (to == p) continue;  // Skip the parent
        if (visited[to])
            low[v] = min(low[v], tin[to]);  // Back edge
        else
        {
            dfs(adj, cut_points, to, v);
            low[v] = min(low[v], low[to]);
            if (low[to] >= tin[v] && p != -1)  // Articulation point condition
                cut_points.push_back(v);
            children++;
        }
    }
    if (p == -1 && children > 1)  // Special case for root
        cut_points.push_back(v);
}

vector<int> findCutPoints(vector<vector<int>> adj, int n)
{
    timer = 0;
    visited.assign(n, false);
    tin.assign(n, -1);
    low.assign(n, -1);
    vector<int> cut_points;
    for (int i = 0; i < n; i++)
        if (!visited[i])
            dfs(adj, cut_points, i);
    return cut_points;
}
```

---

### Additional Resources:
- [Bridges Online](https://cp-algorithms.com/graph/bridge-searching-online.html)
