# Table of Contents

1. [Understanding Dynamic Programming (DP)](#understanding-dynamic-programming-dp)
2. [Key Concepts : State Variables and Decisions](#key-concepts)
3. [Famous Dynamic Programming Algorithms](#famous-dynamic-programming-algorithms)
4. [Recursion and Memoization](#recursion-and-memoization)
5. [Types of DP Problems](#types-of-dp-problems)
6. [DP Schema](#dp-schema)
7. [Bottom-Up vs. Top-Down](#bottom-up-vs-top-down)
8. [Example Problem: Ways to Write `N` as Sum of 1, 3, and 4](#example-problem-ways-to-write-n-as-sum-of-1-3-and-4)
9. [Solving Advanced DP Problems](#solving-advanced-dp-problems)
   - [Maximum Profit from Selling Wines](#problem-maximum-profit-from-selling-wines)
10. [Dimensional Dynamic Programming Techniques](#dimensional-dynamic-programming-techniques)
    - [Finding the Minimum-Cost Path in a 2-D Matrix](#11-finding-the-minimum-cost-path-in-a-2-d-matrix)
    - [Counting Paths in a 2-D Matrix (Unblocked Paths)](#12-counting-paths-in-a-2-d-matrix-unblocked-paths)
    - [Counting Paths with Blocked Cells](#13-counting-paths-with-blocked-cells)
    - [Edit Distance](#14-edit-distance)
11. [Minimum Cost from Sydney to Perth](#minimum-cost-from-sydney-to-perth)
12. [Economic Feasibility Study](#economic-feasibility-study)
13. [0/1 Knapsack Problem](#01-knapsack-problem)
14. [Sequence Alignment Problem](#sequence-alignment-problem)

---


# Understanding Dynamic Programming (DP)

Dynamic Programming (DP) is a method used to solve complex problems by breaking them into simpler sub-problems. This technique is particularly useful when sub-problems overlap, allowing us to store intermediate results and reuse them to save computation time.

---

## Key Concepts

### State Variables and Decisions
- A machine's state at time `t` can be determined using state variables.
- Certain points require decisions that transform these state variables. These decisions might depend on previous results to optimize future choices.

### Problem Breakdown
To identify a DP problem:
1. Break the problem into overlapping sub-problems.
2. Solve sub-problems iteratively or recursively while avoiding redundant computations.

---

## Famous Dynamic Programming Algorithms
1. **Unix diff**: Comparing two files.
2. **Bellman-Ford**: Shortest path routing in networks.
3. **TeX**: The ancestor of LaTeX.
4. **WASP**: Winning and Score Predictor.

### Core Idea
The essence of DP lies in **avoiding repeated work by remembering partial results**. This trade-off between time and space efficiency is widely applicable in real-life scenarios.

---

## Recursion and Memoization

Dynamic Programming combines:
1. **Recursion**: Expressing a problem in terms of its sub-problems.
2. **Memoization**: Storing results of sub-problems to avoid redundant calculations.

### Intuition
We trade **space for time** by storing intermediate results, thus reducing the need for repeated computations.

### Example: Fibonacci Numbers
The Fibonacci sequence:

```
Fibonacci(n) = 1, if n = 0 or n = 1
Fibonacci(n) = Fibonacci(n-1) + Fibonacci(n-2)
```

#### Recursive Implementation

```cpp
int fib(int n) {
    if (n < 2)
        return 1;
    return fib(n-1) + fib(n-2);
}
```

#### Dynamic Programming with Memoization

```cpp
void fib() {
    fibresult[0] = 1;
    fibresult[1] = 1;
    for (int i = 2; i < n; i++)
        fibresult[i] = fibresult[i-1] + fibresult[i-2];
}

```

---

## Types of DP Problems

1. **Optimization Problems**: Minimize or maximize a function's value.
2. **Combinatorial Problems**: Count the number of ways to do something or determine probabilities.

---

## DP Schema

1. Show the problem can be broken into optimal sub-problems.
2. Recursively define the solution using smaller sub-problems.
3. Solve iteratively in a bottom-up manner.
4. Construct the optimal solution from computed information.

---

## Bottom-Up vs. Top-Down

1. **Bottom-Up**: Start small and build up solutions.
   - Example: Learn programming → Practice → Compete → Improve → Excel.
2. **Top-Down**: Start with the big picture and break it down.
   - Example: Aim to excel → Work hard → Practice → Compete → Learn.

---

## Example Problem: Ways to Write `N` as Sum of 1, 3, and 4

### Recurrence Relation
Let `DPn` be the number of ways to write `N`:

```
DPn = DPn-1 + DPn-3 + DPn-4
```

Base cases:

```
DP0 = DP1 = DP2 = 1, DP3 = 2
```

### Implementation

```cpp
DP[0] = DP[1] = DP[2] = 1; DP[3] = 2;
for (int i = 4; i <= n; i++) {
    DP[i] = DP[i-1] + DP[i-3] + DP[i-4];
}

```

---

## Solving Advanced DP Problems

### Problem: Maximum Profit from Selling Wines
1. **Problem Description**: Sell wines over `N` years, either the leftmost or rightmost wine each year. Each wine's price increases by the year.
2. **Optimal Substructure**:
   - Use recursion to compute the maximum profit:
   
```cpp
   int profit(int be, int en) {
       if (be > en)
           return 0;
       int year = N - (en - be + 1) + 1;
       return max(
           profit(be + 1, en) + year * prices[be],
           profit(be, en - 1) + year * prices[en]
       );
   }
   
```
3. **Memoization**:
   
```cpp
   int cache[N][N]; // Initialize with -1
   int profit(int be, int en) {
       if (be > en)
           return 0;
       if (cache[be][en] != -1)
           return cache[be][en];
       int year = N - (en - be + 1) + 1;
       return cache[be][en] = max(
           profit(be + 1, en) + year * prices[be],
           profit(be, en - 1) + year * prices[en]
       );
   }
   
```

---

## Dimensional Dynamic Programming Techniques

### 1. Introduction

Dynamic programming is a powerful tool for solving various problems in grid-like structures. This guide covers solutions to some common problems involving grids and string manipulations:

1. Finding the minimum-cost path in a grid with a given cost matrix.
2. Calculating the number of ways to reach a specific cell from a starting point in a 2-D grid, with specified movement directions.
3. Determining the number of ways to reach a particular position, considering blocked cells.
4. Edit distance calculation between strings.

---

### 1.1 Finding the Minimum-Cost Path in a 2-D Matrix

**Problem Statement:**
Given a cost matrix `Cost[][]` where `Cost[i][j]` denotes the cost of visiting cell `(i,j)`, find the minimum-cost path to reach cell `(x,y)` from `(0,0)` under the condition that movement is restricted to one step right or one step down. All costs are positive integers.

**Solution:**
To determine the minimum cost of reaching `(i,j)`, the recurrence relation is:


```
MinCost(i,j) = min(MinCost(i-1,j), MinCost(i,j-1)) + Cost[i][j]

```

**Base Cases:**
1. Topmost row: `MinCost(0,j) = MinCost(0,j-1) + Cost[0][j]`
2. Leftmost column: `MinCost(i,0) = MinCost(i-1,0) + Cost[i][0]`

**Code Implementation:**

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int X = 10, Y = 10; // Assume a 10x10 matrix
    int Cost[X][Y], MinCost[X][Y];

    // Input cost matrix
    for (int i = 0; i < X; i++)
        for (int j = 0; j < Y; j++)
            cin >> Cost[i][j];

    MinCost[0][0] = Cost[0][0];

    for (int j = 1; j < Y; j++)
        MinCost[0][j] = MinCost[0][j-1] + Cost[0][j];
    for (int i = 1; i < X; i++)
        MinCost[i][0] = MinCost[i-1][0] + Cost[i][0];

    for (int i = 1; i < X; i++) {
        for (int j = 1; j < Y; j++) {
            MinCost[i][j] = min(MinCost[i-1][j], MinCost[i][j-1]) + Cost[i][j];
        }
    }

    cout << "Minimum cost from (0,0) to (X,Y) is " << MinCost[X-1][Y-1];
    return 0;
}

```

---

### 1.2 Counting Paths in a 2-D Matrix (Unblocked Paths)

**Problem Statement:**
Given an M x N grid, find the number of ways to reach cell `(i,j)` from `(0,0)` under the condition that you can only move one step right or one step down.

**Solution:**
The recurrence relation is:


```
NumWays(i,j) = NumWays(i-1,j) + NumWays(i,j-1)

```

**Base Cases:**
1. Topmost row: `NumWays(0,j) = 1`
2. Leftmost column: `NumWays(i,0) = 1`

**Code Implementation:**

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int X = 10, Y = 10; // Assume a 10x10 matrix
    int NumWays[X][Y];

    for (int i = 0; i < X; i++)
        NumWays[i][0] = 1;
    for (int j = 0; j < Y; j++)
        NumWays[0][j] = 1;

    for (int i = 1; i < X; i++) {
        for (int j = 1; j < Y; j++) {
            NumWays[i][j] = NumWays[i-1][j] + NumWays[i][j-1];
        }
    }

    cout << "Number of ways from (0,0) to (X,Y) is " << NumWays[X-1][Y-1];
    return 0;
}

```

---

### 1.3 Counting Paths with Blocked Cells

**Problem Statement:**
Given an M x N grid with P blocked cells, calculate the number of paths from `(1,1)` to `(M,N)`. Blocked cells are impassable.

**Solution:**
Blocked cells are marked as `-1`. If a cell is blocked, it contributes `0` to the number of paths.

**Code Implementation:**

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int M, N, P;
    cin >> M >> N >> P;

    long long Grid[M+1][N+1] = {0};

    for (int i = 0; i < P; i++) {
        int x, y;
        cin >> x >> y;
        Grid[x][y] = -1;
    }

    if (Grid[1][1] == -1) {
        cout << "0";
        return 0;
    }

    Grid[1][1] = 1;

    for (int i = 1; i <= M; i++) {
        for (int j = 1; j <= N; j++) {
            if (Grid[i][j] == -1) continue;

            if (i > 1 && Grid[i-1][j] != -1) Grid[i][j] += Grid[i-1][j];
            if (j > 1 && Grid[i][j-1] != -1) Grid[i][j] += Grid[i][j-1];
        }
    }

    cout << (Grid[M][N] >= 0 ? Grid[M][N] : 0);
    return 0;
}

```

---

### 1.4 Edit Distance

**Problem Statement:**
Given two strings `s1` and `s2`, calculate the minimum number of operations (insertions, deletions, replacements) required to convert `s1` into `s2`.

**Solution:**
Define `dp[i][j]` as the edit distance between the first `i` characters of `s1` and the first `j` characters of `s2`.

**Recurrence Relation:**
1. If `s1[i-1] == s2[j-1]`: 
   
```
dp[i][j] = dp[i-1][j-1]
```

2. Otherwise:
   
```
dp[i][j] = 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])
```

**Code Implementation:**

```cpp
#include <bits/stdc++.h>
using namespace std;

int editDistance(string s1, string s2) {
    int m = s1.size(), n = s2.size();
    vector<vector<int>> dp(m+1, vector<int>(n+1, 0));

    for (int i = 0; i <= m; i++) dp[i][0] = i;
    for (int j = 0; j <= n; j++) dp[0][j] = j;

    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (s1[i-1] == s2[j-1])
                dp[i][j] = dp[i-1][j-1];
            else
                dp[i][j] = 1 + min({dp[i-1][j], dp[i][j-1], dp[i-1][j-1]});
        }
    }

    return dp[m][n];
}

int main() {
    string s1, s2;
    cin >> s1 >> s2;
    cout << "Edit Distance: " << editDistance(s1, s2);
    return 0;
}

```

---

# Dynamic Programming Applications (Detailed Explanation)

Dynamic Programming (DP) is a powerful technique for solving optimization and feasibility problems by breaking them into smaller sub-problems, solving each sub-problem once, and reusing the results. Below are explanations of common DP problems with detailed approaches and code snippets.

---

## Minimum Cost from Sydney to Perth

### Problem Statement
You are given a graph where cities are nodes, and the cost of traveling between two cities is represented as weighted edges. The task is to find the minimum travel cost from Sydney (source node) to Perth (destination node).

### Approach
1. **Graph Representation**: 
   - Represent the cities and travel costs as an adjacency list. Each city is a node, and each road is a directed edge with a weight representing the cost.
   
2. **Dynamic Programming Table**:
   - Let `dp[u]` represent the minimum cost to travel from city `u` to Perth.

3. **Recurrence Relation**:
   - For each city `u`, the minimum cost to reach Perth is:
     ```
     dp[u] = min(cost(u, v) + dp[v]) for all neighbors v of u
     ```
   - This ensures we consider all possible routes from `u` to its neighboring cities and select the one with the minimum cost.

4. **Base Case**:
   - `dp[Perth] = 0` because the cost to reach Perth from itself is zero.

5. **Computation**:
   - Start from Perth and calculate the minimum cost for all other cities in reverse topological order, ensuring dependencies are already computed.

### Code Walkthrough
The provided code initializes the DP table with infinity (`INF`) and sets the cost to reach Perth as 0. It processes cities in reverse order to ensure that dependencies for each city are resolved before computation.

```cpp
#include <bits/stdc++.h>
using namespace std;

const int INF = 1e9;

int main() {
    int n, m; // Number of cities and roads
    cin >> n >> m;

    vector<vector<pair<int, int>>> adj(n);
    for (int i = 0; i < m; i++) {
        int u, v, cost;
        cin >> u >> v >> cost;
        adj[u].push_back({v, cost});
    }

    vector<int> dp(n, INF);
    dp[n-1] = 0; // Assuming Perth is the last city (n-1)

    for (int u = n-2; u >= 0; u--) {
        for (auto [v, cost] : adj[u]) {
            dp[u] = min(dp[u], cost + dp[v]);
        }
    }

    cout << "Minimum cost from Sydney to Perth: " << dp[0] << endl;
    return 0;
}
```

---

## Economic Feasibility Study

### Problem Statement
Given a set of investment opportunities, each with a specific cost and profit, determine the maximum profit achievable under a given budget constraint.

### Approach
1. **Modeling as a Knapsack Problem**:
   - Each investment is analogous to an item in the knapsack problem.
   - The cost of the investment is the "weight," and the profit is the "value."

2. **Dynamic Programming Table**:
   - Let `dp[b]` represent the maximum profit achievable with a budget of `b`.

3. **Recurrence Relation**:
   - For each investment `i`:
     ```
     dp[b] = max(dp[b], dp[b - cost[i]] + profit[i]) if cost[i] <= b
     ```

4. **Base Case**:
   - `dp[0] = 0`, as no budget means no profit.

5. **Computation**:
   - Iterate through each investment and update the DP table in reverse to avoid overwriting values.

### Code Walkthrough
The code initializes the DP table and iteratively updates it for each investment. It ensures that each budget is optimized for maximum profit.

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, budget;
    cin >> n >> budget;

    vector<int> cost(n), profit(n);
    for (int i = 0; i < n; i++) {
        cin >> cost[i] >> profit[i];
    }

    vector<int> dp(budget + 1, 0);

    for (int i = 0; i < n; i++) {
        for (int b = budget; b >= cost[i]; b--) {
            dp[b] = max(dp[b], dp[b - cost[i]] + profit[i]);
        }
    }

    cout << "Maximum profit with budget " << budget << ": " << dp[budget] << endl;
    return 0;
}
```

---

## 0/1 Knapsack Problem

### Problem Statement
Given `n` items, each with a weight and a value, determine the maximum value that can be achieved without exceeding a given weight capacity.

### Approach
1. **Dynamic Programming Table**:
   - Let `dp[w]` represent the maximum value achievable with a capacity of `w`.

2. **Recurrence Relation**:
   - For each item `i`:
     ```
     dp[w] = max(dp[w], dp[w - weight[i]] + value[i]) if weight[i] <= w
     ```

3. **Base Case**:
   - `dp[0] = 0`, as no capacity means no value.

4. **Computation**:
   - Iterate through each item and update the DP table in reverse to avoid overwriting values.

### Code Walkthrough
The code initializes the DP table and updates it for each item. The reverse iteration ensures that each weight capacity is optimized.

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, capacity;
    cin >> n >> capacity;

    vector<int> weight(n), value(n);
    for (int i = 0; i < n; i++) {
        cin >> weight[i] >> value[i];
    }

    vector<int> dp(capacity + 1, 0);

    for (int i = 0; i < n; i++) {
        for (int w = capacity; w >= weight[i]; w--) {
            dp[w] = max(dp[w], dp[w - weight[i]] + value[i]);
        }
    }

    cout << "Maximum value with capacity " << capacity << ": " << dp[capacity] << endl;
    return 0;
}
```

---

## Sequence Alignment Problem

### Problem Statement
Align two sequences by minimizing the cost of insertions, deletions, and substitutions. Costs are as follows:
- Match: 0
- Mismatch: 1
- Gap: 2

### Approach
1. **Dynamic Programming Table**:
   - Let `dp[i][j]` represent the minimum cost to align the first `i` characters of `seq1` with the first `j` characters of `seq2`.

2. **Recurrence Relation**:
   - If characters match:
     ```
     dp[i][j] = dp[i-1][j-1]
     ```
   - Otherwise:
     ```
     dp[i][j] = min(dp[i-1][j-1] + 1, dp[i-1][j] + 2, dp[i][j-1] + 2)
     ```

3. **Base Case**:
   - `dp[i][0] = i * gap_cost`
   - `dp[0][j] = j * gap_cost`

4. **Computation**:
   - Fill the DP table row by row, ensuring dependencies are already computed.

### Code Walkthrough
The code initializes the DP table and computes the minimum alignment cost by considering all possible operations: match, mismatch, and gap.

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    string seq1, seq2;
    cin >> seq1 >> seq2;

    int m = seq1.size(), n = seq2.size();
    vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));

    for (int i = 0; i <= m; i++) dp[i][0] = i * 2; // Gap cost
    for (int j = 0; j <= n; j++) dp[0][j] = j * 2; // Gap cost

    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (seq1[i-1] == seq2[j-1]) {
                dp[i][j] = dp[i-1][j-1];
            } else {
                dp[i][j] = min({dp[i-1][j-1] + 1, dp[i-1][j] + 2, dp[i][j-1] + 2});
            }
        }
    }

    cout << "Minimum cost to align sequences: " << dp[m][n] << endl;
    return 0;
}
```

---
