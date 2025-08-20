# Table of Contents

1. [Graphs Representation](#graphs-representation)
   - [Degree of Graph](#degree-of-graph)
   - [Representation](#representation)
     - [Adjacency Matrix](#adjacency-matrix)
     - [Adjacency List](#adjacency-list)

2. [Connected Components](#connected-components)
   
3. [Condensation Graph](#condensation-graph)
   - [Kosaraju Algorithm](#kosaraju-algorithm)
     - [Implementation](#implementation-of-kosaraju-algorithm)
    - [Condensation Graph Implementation](#condensation-graph-implementation)
4. [Strong Orientation](#strong-orientation)
   - [Extension](#extension)
   - [Implementation](#implementation)


# Graphs Representation

- A graph is a non-linear data structure consisting of nodes that have data and are connected to other nodes through edges.

![Image 1](../images/attachments/pasted-image-20240613032827.png) 
![Image 2](../images/attachments/pasted-image-20240613032852.png) 
![Image 3](../images/attachments/pasted-image-20240613132654.png)

- Nodes (vertices) are circles represented by numbers. The numbering can be done in any order, no specific order needs to be followed.
- An undirected graph is a graph where edges are bidirectional, with no direction associated with them. Pair of vertices to represent any edge is unordered.
- A directed graph is a graph where all the edges are directed from one node to another. Pair of vertices to represent an edge is ordered.
- A graph is called cyclic if we can start traversal from a node and end at the same node.

###### Degree of Graph

- It is the number of edges that go inside or outside that node.
- For undirected graphs, the degree of a node is the number of edges attached to that node.
- For directed graphs, indegree is the number of incoming edges and outdegree is the number of outgoing edges.
- Total degree of a graph is twice to number of edges.

### Representation

The two most commonly used representations for graphs are:

- Adjacency Matrix
- Adjacency List

#### Adjacency Matrix

An adjacency matrix of a graph is a 2-D array of size n x n, where n is the number of nodes in the graph. Here `adj[i][j] = 1` if the edge (v<sub>i</sub>, v<sub>j</sub>) is in the set of edge and `adj[i][j] = 0` if there is no such edge.

```cpp
int main()
{
        ios::sync_with_stdio(false);
        cin.tie(NULL);

        int n, m;
        cin >> n >> m;
        // adjacency matrix
        int adj[n+1][n+1];
        for (int i = 0; i < m; i++)
        {
                int u, v;
                cin >> u >> v;
                adj[u][v] = 1;
                adj[v][u] = 1; // remove this line if the graph is directed
        }

                return 0;
}
```

- Time Complexity: O(V)
- Space Complexity: O(V<sup>2</sup>)
- For weighted graphs, instead of updating the adjacency matrix value to 1, we update it to the corresponding weight of the edge `adj[u][v] = wt`.

#### Adjacency List

An adjacency list takes very less space compared to adjacency matrix. We associate with each node a list of nodes adjacent to it. We create an array of [[Vector]] of integers.

For directed graphs, if there is an edge between u and v, it means the edge only goes from u to v. This means v is the neighbor of u but vice versa is not true.

```cpp
int main()
{
        ios::sync_with_stdio(false);
        cin.tie(NULL);

        int n, m;
        cin >> n >> m;
        // adjacency list
        vector<int> adj[n + 1];
        for (int i = 0; i < m; i++)
        {
                int u, v;
                cin >> u >> v;
                adj[u].emplace_back(v);
                adj[v].emplace_back(u); // remove this line if the graph is directed
        }

                return 0;
}
```

- Space Complexity: O(2 x E) for undirected graphs and O(E) for directed graphs.
- For weighted graphs, instead of storing just the node number, we store pairs of node and weight, `vector<pair<int, int>> adj[n + 1]`.

# Connected Components:

> [!tip] Given an undirected graph G with V nodes and E edges, find in it all the connected components, i.e. several groups of vertices such that within a group each vertex can be reached from another and no path exists between different groups.

- We can use [[DFS]] or [[BFS]]. We will do a series of rounds of DFS.
- The first round will start from first node and all nodes in the first connected component will be traversed. Then we traverse the first unvisited node of the remaining nodes and run DFS on it thus finding the second connected component. Repeat the process until all nodes are visited.
- Time Complexity: O(V+E)

```cpp
vector<bool> visited;
vector<int> component;

void DFS(vector<vector<int>> adj, int vertex)
{
        visited[vertex] = true;
        component.emplace_back(vertex);
        for (int i : adj[vertex])
                if (!visited[i])
                        DFS(adj, i);
}

vector<vector<int>> connectedComponents(vector<vector<int>> adj)
{
        vector<vector<int>> components;
        for (int i = 0; i < adj.size(); i++)
        {
                if (!visited[i])
                {
                        component.clear();
                        DFS(adj, i);
                        components.emplace_back(component);
                }
        }
        return components;
}
```

## Condensation Graph

Given a directed graph G with vertices V and edges E:

**Strongly Connected Component:** is a maximal subset of vertices C such that any two vertices of this subset are reachable from each other. For any u, v ∈ C:

u → v, v → u

where → means existence of the path from first vertex to the second.

- Strongly connected components do not intersect each other and it is a partition of all graph vertices.
- Thus we can give a definition of condensation graph G<sup>SCC</sup> as a graph containing every strongly connected component as one vertex.
- Each vertex of the condensation graph corresponds to the SCC of graph G. There is an oriented edge between two vertices C<sub>i</sub> and C<sub>j</sub> of the condensation graph iff there are two vertices u ∈ C<sub>i</sub>, v ∈ C<sub>j</sub> such that there is an edge in initial graph (u, v).
- Condensation graph is acyclic. Suppose there is an edge between C and C', then there can't be an edge from C' to C.

### Kosaraju Algorithm

- Based on [[DFS]] with time complexity O(V+E) as it uses two DFS.
- We start at each vertex of the graph and run a DFS from every non-visited vertex. For each vertex we keep track of exit time `tout[v]`.
- The exit time `tout[C]` from the SCC C is the maximum of values `tout[v]` for all v ∈ C. Similarly, the entry time `tin[C]` from SCC C is the minimum of values `tin[v]` for all v ∈ C.
- Let C and C' be two different SCC and there be an edge (C, C') in the condensation graph between these two nodes. Then `tout[C] > tout[C']`. Depending on difference between `tin[C]` and `tin[C']`:
    - If the component C was reached first, it means that DFS comes at some vertex v ∈ C at some moment, but all other vertices of components C and C' were not visited yet. By condition there is an edge (C, C') in a condensation graph, so not only the entire component C is reachable from v but the whole component C' is reachable as well. It means that DFS that is running from vertex v will visit all vertices of components C and C', so they will be descendants for v in a DFS tree. For each vertex u ∈ C ∪ C', u ≠ v we have `tout[v] > tout[u]`.
    - If the component C' was visited first, it means that DFS comes at some vertex v ∈ C' at some moment, but all other vertices of components C and C' were not visited yet. By condition there is an edge (C, C') in the condensation graph, so because of acyclic property, there is no back path from C' to C, thus DFS from v will not reach vertices of C. It means that vertices of C will be visited by DFS later so `tout[C] > tout[C']`.
- If we sort all vertices v ∈ V in decreasing order of their exit time `tout[v]` then the first vertex u is going to belong to the **root** SCC and will have no incoming edges in the condensation graph. Now we run such search from u so that it will visit all vertices in this SCC, but not others. Doing so, we can gradually select all SCC. Remove all vertices corresponding to the first SCC and find the vertex with the largest `tout`, and then run this search from it.
- Consider transposed graph G<sup>T</sup> which is received from G by reversing the direction of each edge. This graph will have the same SCC as initial graph. Moreover, the condensation graph G<sup>SCC</sup> will also get transposed. Thus, there will be no edges from our root component to other components.

- For visiting the whole root SCC containing v, it is enough to run search from v in graph G<sup>T</sup>. This will visit all vertices of this SCC and only them. We can now proceed with the same method as done with G but run it on G<sup>T</sup>.

##### Implementation of Kosaraju Algorithm

1.  Run sequence of DFS of G which will return vertices with increasing tout, we store this in `order`.
2.  Build G<sup>T</sup>. Run series of DFS in the order determined by `order` (in decreasing order of tout). Every set of vertices, reached after the next search will be the next SCC.

We can compare the algorithm to that of [[Topological Sort]]. Step 1 of Kosaraju represents reversed topological sort of G. Also Kosaraju generates SCC by decreasing order of their exit times, thus it generates vertices of condensation graph in topological sort order.

```cpp
vector<bool> visited;
vector<int> order, component;
vector<vector<int>> adj, adj_rev;
int n;

void dfs1(int v)
{
    visited[v] = true;
    for (auto u : adj[v])
        if (!visited[u])
            dfs1(u);
    order.push_back(v); // order of vertices in reverse postorder
}

void dfs2(int v)
{
    visited[v] = true;
    component.push_back(v);
    for (auto u : adj_rev[v])
        if (!visited[u])
            dfs2(u);
}

int main()
{
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int m;
    cin >> n >> m;
    adj.resize(n);
    adj_rev.resize(n);
    for (int i = 0; i < m; i++)
    {
        int u, v;
        cin >> u >> v;
        adj[u - 1].emplace_back(v - 1);
        adj_rev[v - 1].emplace_back(u - 1);
    }

    visited.assign(n, false);
    order.clear();
    component.clear();

// First DFS to get the order of vertices in reverse postorder
    for (int i = 0; i < n; i++)
        if (!visited[i])
            dfs1(i);

    visited.assign(n, false);
    reverse(order.begin(), order.end());
    vector<vector<int>> scc;

// Second DFS to get the strongly connected components
    for (auto v : order)
        if (!visited[v])
        {
            dfs2(v);
            scc.push_back(component);
            component.clear();
        }

    return 0;
}
```

##### Condensation Graph Implementation

```cpp
vector<int> roots(n, 0), root_nodes; // roots[i] is the root node to the scc to which i belongs
vector<vector<int>> condensation(n);
// Second DFS to get the strongly connected components and condensation graph
for (auto v : order)
    if (!visited[v])
    {
        dfs2(v);
        int root = component.front(); // root of the component
        for (auto u : component)
            roots[u] = root;
        root_nodes.push_back(root); // add the root to the list of roots
        scc.push_back(component);
        component.clear();
    }

// Construct the condensation graph
for (int v = 0; v < n; v++)
    for (auto u : adj[v])
    {
        int root_v = roots[v], root_u = roots[u];
        if (root_v != root_u)
            condensation[root_v].push_back(root_u);
    }
```

Here, we select the root of each component as the first node in its list. This node will represent it's entire SCC in the condensation graph. `condensation` is the adjacency list of the `root_nodes`. We can traverse on `condensation` as our graph using only those nodes belonging to `root_nodes`.

Strong Orientation:

- A strong orientation of an undirected graph is an assignment of a direction to each edge that makes it a [[Connected Components#Kosaraju Algorithm|Strongly Connected Component]].
- This cannot be done to every graph. For example, a graph containing a [[Bridges & Articulation Points|Bridge]] can't be strongly oriented as it will become crossable in only one direction.
- Consider a [[DFS]] through a bridgeless connected graph. Clearly, we will each vertex. Since there are no bridges, we can remove any DFS tree edge and still be able to go from below the edge to above the edge by using a path that contains at least one back edge. Therefore, from any vertex, we can go to the root of the DFS tree. Also, from the root of the DFS tree, we can visit any vertex.
- To strongly orient a bridgeless connected graph, run a DFS on it and let the DFS tree edges point away from the DFS root and all other edges from the descendant to the ancestor in the DFS tree.
- The result that bridgeless connected graphs are exactly the graphs that have strong orientations is called **Robbins' Theorem**.

### Extension

- Consider an extension of the orientation problem, where we need to find a graph orientation so that the number of SCC's is minimal.
- Each graph component will be considered separately. Since only bridgeless graphs are strongly orientable, let's remove all bridges temporarily. We end up with some number of bridgeless components (components at beginning + number of bridges) and each can be strongly oriented.
- Since we were only allowed to orient edges and not remove them, we can orient the bridges arbitrarily.

#### Implementation

```cpp
int n;
vector<vector<pair<int, int>>> adj;
vector<pair<int, int>> edges;
vector<bool> edge_used;
vector<int> tin, low;
int timer;
string orient;
int bridge_cnt;

void findBridges(int v)
{
    timer = 0;
    low[v] = tin[v] = timer++;
    for (auto p : adj[v])
    {
        if (edge_used[p.second])
            continue;
        edge_used[p.second] = true;
        orient[p.second] = (v == edges[p.second].first) ? '>' : '<'; // dir is from v to nv
        int nv = p.first; // neighbour vertex
        if (tin[nv] == -1)
        {
            findBridges(nv);
            low[v] = min(low[v], low[nv]);
            if (low[nv] > tin[v]) // bridge between v and nv
                bridge_cnt++;
        }
        else
            low[v] = min(low[v], tin[nv]);
    }
}

int main()
{
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int m;
    cin >> n >> m;
    adj.resize(n);
    for (int i = 0; i < m; i++)
    {
        int u, v;
        cin >> u >> v;
        adj[u - 1].emplace_back(v - 1, i);
        adj[v - 1].emplace_back(u - 1, i);
        edges.emplace_back(u - 1, v - 1);
    }

    tin.assign(n, -1);
    low.assign(n, -1);
    edge_used.assign(m, false);
    orient.resize(m);
    bridge_cnt = 0;

    int num_components = 0;
    for (int v = 0; v < n; v++)
        if (tin[v] == -1)
        {
            findBridges(v);
            num_components++;
        }

    return 0;
}
```


# Strong Orientation:

- A strong orientation of an undirected graph is an assignment of a direction to each edge that makes it a [[Connected Components#Kosaraju Algorithm|Strongly Connected Component]].
- This cannot be done to every graph. For example, a graph containing a [[Bridges & Articulation Points|Bridge]] can't be strongly oriented as it will become crossable in only one direction.
- Consider a [[DFS]] through a bridgeless connected graph. Clearly, we will visit each vertex. Since there are no bridges, we can remove any DFS tree edge and still be able to go from below the edge to above the edge by using a path that contains at least one back edge. Therefore, from any vertex, we can go to the root of the DFS tree. Also, from the root of the DFS tree, we can visit any vertex.
- To strongly orient a bridgeless connected graph, run a DFS on it and let the DFS tree edges point away from the DFS root and all other edges from the descendant to the ancestor in the DFS tree.
- The result that bridgeless connected graphs are exactly the graphs that have strong orientations is called **Robbins' Theorem**.

### Extension

- Consider an extension of the orientation problem, where we need to find a graph orientation so that the number of SCC's is minimal.
- Each graph component will be considered separately. Since only bridgeless graphs are strongly orientable, let's remove all bridges temporarily. We end up with some number of bridgeless components (components at beginning + number of bridges) and each can be strongly oriented.
- Since we were only allowed to orient edges and not remove them, we can orient the bridges arbitrarily.

#### Implementation

```cpp
int n;
vector<vector<pair<int, int>>> adj;
vector<pair<int, int>> edges;
vector<bool> edge_used;
vector<int> tin, low;
int timer;
string orient;
int bridge_cnt;

void findBridges(int v)
{
    timer = 0;
    low[v] = tin[v] = timer++;
    for (auto p : adj[v])
    {
        if (edge_used[p.second])
            continue;
        edge_used[p.second] = true;
        orient[p.second] = (v == edges[p.second].first) ? '>' : '<'; // dir is from v to nv
        int nv = p.first; // neighbour vertex
        if (tin[nv] == -1)
        {
            findBridges(nv);
            low[v] = min(low[v], low[nv]);
            if (low[nv] > tin[v]) // bridge between v and nv
                bridge_cnt++;
        }
        else
            low[v] = min(low[v], tin[nv]);
    }
}

int main()
{
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int m;
    cin >> n >> m;
    adj.resize(n);
    for (int i = 0; i < m; i++)
    {
        int u, v;
        cin >> u >> v;
        adj[u - 1].emplace_back(v - 1, i);
        adj[v - 1].emplace_back(u - 1, i);
        edges.emplace_back(u - 1, v - 1);
    }

    tin.assign(n, -1);
    low.assign(n, -1);
    edge_used.assign(m, false);
    orient.resize(m);
    bridge_cnt = 0;

    int num_components = 0;
    for (int v = 0; v < n; v++)
        if (tin[v] == -1)
        {
            findBridges(v);
            num_components++;
        }

    return 0;
}
```
