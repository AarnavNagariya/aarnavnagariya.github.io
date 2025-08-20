# Sparse Table

- Sparse table is a data structure that allows answering range queries.
- It can answer most range queries in O(log n), but its true power is answering range minimum queries (or equivalent range maximum queries) in O(1) time.
- The array must be immutable. If any element in the array changes, the entire data structure needs to be recomputed.
- Any non-negative number can be represented as a sum of decreasing powers of 2. Similarly, any interval can be represented as a union of intervals with lengths that are decreasing powers of 2.

## Precomputation

- We use a 2-dimensional array for storing the answers to precomputed queries.
- `st[i][j]` will store the answer for the range [j, j+2^i-1] of length 2^i.
- The size of the 2-dimensional array will be (K+1)×MAXN.
- K must satisfy K ≥ floor(log2(MAXN)), where MAXN is the largest array length we want to handle.
- For arrays with length ≤ 10^7 elements, K=25 is a good value.

```cpp
int st[K + 1][MAXN];
```

- We can generate the table efficiently using dynamic programming:

```cpp
// Copy all elements from array into the first row of sparse table
copy(array.begin(), array.end(), st[0]); // intervals of length 1

for (int i = 1; i <= K; i++)
    for (int j = 0; j + (1<<i) <= N; j++)
        st[i][j] = f(st[i-1][j], st[i-1][j + (1 << (i - 1))]);
```

The function `f` will depend on the type of query. For range sum queries, it will compute the sum. For range minimum queries, it will compute the minimum.

- Time Complexity: O(N * log N)

### Range Sum Queries

- To find the sum of all values in a range, use `f(x, y) = x + y`, where `f` is the precomputation function.
- To answer the sum query for the range [L, R], we iterate over all powers of 2, starting from the biggest one. As soon as we find a power of 2 smaller or equal to the range length (R-L+1), we process that part of the range.

```cpp
#define MAXN 1000000
#define K 25
long long st[K + 1][MAXN];

long long f(long long x, long long y)
{
    return x + y;
}

void precompute(vector<int> array)
{
    int N = array.size();
    copy(array.begin(), array.end(), st[0]);

    for (int i = 1; i <= K; i++)
        for (int j = 0; j + (1 << i) <= N; j++)
            st[i][j] = f(st[i-1][j], st[i-1][j + (1 << (i - 1))]);
}

long long query(int L, int R)
{
    long long sum = 0;
    for (int i = K; i >= 0; i--)
    {
        if ((1 << i) <= R - L + 1)
        {
            sum = f(sum, st[i][L]);
            L += 1 << i;
        }
    }
    return sum;
}
```

- Time Complexity: O(log MAXN)

### Range Minimum Queries (RMQ)

- For range minimum queries, we split the range into two overlapping ranges of equal length and compute the minimum for each range.
- During precomputation: `f(x, y) = min(x, y)`.

```cpp
#define MAXN 1000000
#define K 25
long long st[K + 1][MAXN];

// Pre C++20
int log2_floor(unsigned long long i)
{
    return i ? __builtin_clzll(1) - __builtin_clzll(i) : -1;
}

long long f(long long x, long long y)
{
    return min(x, y);
}

void precompute(vector<int> array)
{
    int N = array.size();
    copy(array.begin(), array.end(), st[0]);

    for (int i = 1; i <= K; i++)
        for (int j = 0; j + (1 << i) <= N; j++)
            st[i][j] = f(st[i-1][j], st[i-1][j + (1 << (i - 1))]);
}

long long query(int L, int R)
{
    int i = log2_floor(R - L + 1);
    return f(st[i][L], st[i][R - (1 << i) + 1]);
}
```

- Time Complexity: O(1)