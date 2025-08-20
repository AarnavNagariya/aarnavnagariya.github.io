# Table of Contents

1. [Dutch National Flag Algorithm](#dutch-national-flag-algorithm)
2. [Kadane's Algorithm](#kadenes-algorithm)
3. [Longest Subarray with Sum K](#longest-subarray-with-sum-k)
   - [Positives Only](#positives-only)
   - [Positives & Negatives](#positives-and-negatives)
   - [k = 0](#k-0)
4. [Moore's Voting Algorithm](#moores-voting-algorithm)
5. [Extended Voting Algorithm](#extended-voting-algorithm)
6. [Pascal's Triangle](#pascals-triangle)
   - [Finding an Element](#finding-an-element)
   - [Finding a Row](#finding-a-row)

--- 


# Dutch National Flag Algorithm

> **Tip:** Given an array consisting of only 0's, 1's, and 2's, write an algorithm to **in-place sort** the array in a single pass with O(N) time complexity and constant space.
- This algorithm uses 3 pointers: low, mid, and high, with the following rules:
  - `arr[0..low-1]` contains 0
  - `arr[low..mid-1]` contains 1
  - `arr[high+1..n-1]` contains 2
- The middle part `arr[mid..high]` is the unsorted segment.
- Initially, low and mid are placed at index 0, and high is placed at index n-1.

```cpp
void dutchNatFlagSort(vector<int>& arr)
{
	int n = arr.size();
	int low = 0, mid = 0, high = n - 1;
	while (mid <= high)
	{
		if (arr[mid] == 0)
		{
			swap(arr[low], arr[mid]);
			low++;
			mid++;
		}
		else if (arr[mid] == 1)
			mid++;
		else
		{
			swap(arr[mid], arr[high]);
			high--;
		}
	}
}
```

---

# Kadane's Algorithm

> **Tip:** Given an integer array, find the contiguous subarray (containing at least one number) which has the largest sum. Return the sum and print the subarray.
- Iterate through the array and add each element to a `sum` variable.
- After updating `sum`, compare it with the maximum value encountered so far.
- If `sum` becomes negative, reset it to 0 and continue.

```cpp
long long maxSumKadane(vector<int> arr)
{
	long long n = arr.size();
	long long max_sum = LONG_MIN; // maximum sum
	long long sum = 0;
	int temp_start, start, end;
	for (int i = 0; i < n; i++)
	{
		if (sum == 0)
			temp_start = i; // start of the subarray
		sum += arr[i];
		if (sum > max_sum)
		{
			max_sum = sum;
			start = temp_start;
			end = i;
		}
		sum = max(0ll, sum);
	}
	// Optional: print the subarray
	for (int i = start; i <= end; i++)
		cout << arr[i] << " ";
	cout << endl;
	return max_sum;
}
```
- Time Complexity: O(N)
- Space Complexity: O(1)

---


# Longest Subarray with Sum K

### Positives Only

> **Tip:** Given an array with only non-negative values and a sum k, find the length of the longest subarray that sums to k.

#### Method 1 (Hashing)
- Use a hash map to efficiently find the longest subarray with a sum of k.
- The hash map `pre_sum_map` stores prefix sums and their corresponding indices.
- If the prefix sum becomes `sum - k`, the subarray sum will be k.

```cpp
int getLongestSubarray(vector<int> a, long long k)
{
	int n = a.size();
	map<long long, int> pre_sum_map;
	long long sum = 0;
	int max_len = 0;
	for (int i = 0; i < n; i++)
	{
		// calculate prefix sum till index i
		sum += a[i];
		// if prefix sum is k, update max_len
		if (sum == k)
			max_len = max(max_len, i + 1);
		// if prefix sum is not k, check if (sum - k) is present in map
		long long rem = sum - k;
		// if (sum - k) is present in map, update max_len
		if (pre_sum_map.find(rem) != pre_sum_map.end())
			max_len = max(max_len, i - pre_sum_map[rem]);
		// Edge Case: if sum is not present in map, add it to map
		if (pre_sum_map.find(sum) == pre_sum_map.end())
			pre_sum_map[sum] = i;
	}
	return max_len;
}
```
- Time Complexity: O(N)
- Space Complexity: O(N)

#### Method 2 (2 Pointers)
- Use two pointers `left` and `right`, initially pointing to index 0.
- Move the `right` pointer forward, adding to the sum.
- If the sum exceeds k, move the `left` pointer forward to shrink the subarray size.
- Track the longest subarray when the sum equals k.

```cpp
int getLongestSubarray(vector<int> a, long long k)
{
	int n = a.size();
	int left = 0, right = 0; // two pointers
	long long sum = 0;
	int max_len = 0;
	while (right < n)
	{
		sum += a[right];
		while (sum > k && left <= right)
		{
			sum -= a[left];
			left++;
		}
		if (sum == k)
			max_len = max(max_len, right - left + 1);
		// move right pointer forward
		right++;
	}
	return max_len;
}
```
- Time Complexity: O(2×N)
- Space Complexity: O(1)

---

### Positives & Negatives
> **Tip:** Given an array with both positive and negative integers and a sum k, find the length of the longest subarray that sums to k.
- This approach is the same as the method for the **Positives Only** case.

---

### k = 0
> **Tip:** Given an array containing both positive and negative integers, find the length of the longest subarray that has a sum equal to 0.
- Store the prefix sum of every element, and if the prefix sum at two different elements is the same, the subarray between them has a sum of zero.

```cpp
int getLongestSubarrayZero(vector<int> a)
{
	int n = a.size();
	unordered_map<int, int> mp; // sum, index
	int max_len = 0, sum = 0;
	for (int i = 0; i < n; i++)
	{
		sum += a[i];
		if (sum == 0)
			max_len = i + 1;
		else
		{
			if (mp.find(sum) != mp.end())
				max_len = max(max_len, i - mp[sum]);
			else
				mp[sum] = i;
		}
	}
	return max_len;
}
```
- Time Complexity: O(N)
- Space Complexity: O(N)

---

# Moore's Voting Algorithm

> **Tip:** Given an array of N integers, return the element that occurs more than N/2 times.
- Track two variables: `count` and `element`.
- `element` is the value expected to be the answer.
- `count` tracks the count of `element`.
- If `count` is 0, set the current element as `element` and increase `count`.
- If the current element matches `element`, increase `count`; otherwise, decrease `count`.
- At the end, `element` is the answer, if it occurs more than N/2 times.

```cpp
int majorityElement(vector<int> v)
{
	int n = v.size();
	int count = 0;
	int element;
	for (int i = 0; i < n; i++)
	{
		if (count == 0)
		{
			element = v[i];
			count++;
		}
		else if (element == v[i])
			count++;
		else
			count--;
	}
	// Optional: Check if stored element is majority
	int freq = 0;
	for (int i = 0; i < n; i++)
		if (element == v[i])
			freq++;
	if (freq > (n / 2))
		return element;
	else
		return -1;
}
```
- Time Complexity: O(2×N)
- Space Complexity: O(1)

---

### Extended Voting Algorithm

> **Tip:** Given an array of N integers, return the elements that occur more than N/3 times.
- Track four variables: `cnt1`, `cnt2`, `el1`, and `el2`.
- Traverse the array and update `cnt1` and `cnt2` based on conditions.
- After the first pass, check the frequencies of `el1` and `el2` in another loop.

```cpp
vector<int> majorityElement(vector<int> v)
{
	int n = v.size();
	int cnt1 = 0, cnt2 = 0;
	int el1, el2;
	for (int i = 0; i < n; i++)
	{
		if (cnt1 == 0 && el2 != v[i])
		{
			cnt1++;
			el1 = v[i];
		}
		else if (cnt2 == 0 && el1 != v[i])
		{
			cnt2++;
			el2 = v[i];
		}
		else if (el1 == v[i])
			cnt1++;
		else if (el2 == v[i])
			cnt2++;
		else
		{
			cnt1--;
			cnt2--;
		}
	}
	vector<int> ans;
	cnt1 = 0;
	cnt2 = 0;
	for (int i = 0; i < n; i++)
	{
		if (v[i] == el1)
			cnt1++;
		else if (v[i] == el2)
			cnt2++;
	}
	if (cnt1 > n / 3)
		ans.push_back(el1);
	if (cnt2 > n / 3)
		ans.push_back(el2);
	return ans;
}
```
- Time Complexity: O(2×N)
- Space Complexity: O(1)

---


# Pascal's Triangle

In the Pascal's Triangle, the k-th entry in the n-th row is denoted by `C(n, k)` (1 indexed).
We can see the downward construction of the Pascal's Triangle using the formula:
```
C(n, k) = C(n-1, k-1) + C(n-1, k)
```
where `0 <= k <= n`. This is known as **Pascal's Rule**.

**Classic formula**:
```
C(n, r) = n! / (r! * (n - r)!)
```

**Optimized formula**:
```
C(n, r) = (n * (n - 1) * (n - 2) * ... * (n - r + 1)) / (r * (r - 1) * ... * 1)
```

```cpp
int nCr(int n, int r)
{
	long long res = 1;
	for (int i = 0; i < r; i++)
	{
		res *= n - i;
		res /= i + 1;
	}
	return res;
}
```

---

### Finding an Element

> **Tip:** Given the row number r and column number c, return the corresponding element in Pascal's Triangle.

```cpp
int pascalTriangleElement(int r, int c)
{
	return nCr(r - 1, c - 1);
}
```
- Time Complexity: O(c) where c is the column number.
- Space Complexity: O(1)

---

### Finding a Row

> **Tip:** Given the row number r, return the corresponding row in Pascal's Triangle.

```cpp
vector<int> pascalTriangleRow(int r)
{
	vector<int> result;
	int res = 1;
	result.push_back(res);
	for (int i = 1; i < r; i++)
	{
		res *= (r - i);
		res /= i;
		result.push_back(res);
	}
	return result;
}
```
