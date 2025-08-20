## Table of Contents

1. [Bubble Sort](#bubble-sort)
2. [Insertion Sort](#insertion-sort)
3. [Merge Sort](#merge-sort)
4. [Quick Sort](#quick-sort)
5. [Selection Sort](#selection-sort)


## Bubble Sort
- Works by repeatedly swapping the adjacent elements if they are in the wrong order.

```cpp
void bubbleSort(vector<int>& arr)
{
    int n = arr.size();
    for (int i = 0; i < n - 1; i++)
    {
        bool swapped = false;
        for (int j = 0; j < n - i - 1; j++)
        {
            if (arr[j] > arr[j + 1])
            {
                swap(arr[j], arr[j + 1]);
                swapped = true;
            }
        }
        if (!swapped)
            break;
    }
}
```

- Time Complexity: O(n^2)
- Space Complexity: O(1)
- Selection sort is an in-place algorithm, as it does not require extra space.

---

## Insertion Sort
- Works by iteratively inserting each element of an unsorted list into its correct position in a sorted portion of the list.

```cpp
void insertionSort(vector<int>& arr)
{
    int n = arr.size();
    for (int i = 1; i < n; i++)
    {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key)
        {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}
```

- Time Complexity: O(n^2)
- Space Complexity: O(1)
- Selection sort is an in-place algorithm, as it does not require extra space.

---

## Merge Sort
- Follows the divide-and-conquer approach.
- Works by recursively dividing the input array into smaller subarrays and sorting those subarrays, then merging them back together to obtain the sorted array.

```cpp
void mergeSort(vector<int>& arr, int l, int r)
{
    if (l >= r)
        return;
    int m = l + (r - l) / 2;
    mergeSort(arr, l, m);
    mergeSort(arr, m + 1, r);

    // merge
    vector<int> temp(r - l + 1);
    int i = l, j = m + 1, k = 0;
    while (i <= m && j <= r)
    {
        if (arr[i] <= arr[j])
            temp[k++] = arr[i++];
        else
            temp[k++] = arr[j++];
    }
    while (i <= m)
        temp[k++] = arr[i++];
    while (j <= r)
        temp[k++] = arr[j++];
    for (int i = l; i <= r; i++)
        arr[i] = temp[i - l];
}
```

- Time Complexity: O(n log n)
- Space Complexity: O(n)
- Merge sort is not an in-place sorting algorithm.

---

## Quick Sort
- Based on the divide-and-conquer algorithm that picks an element as a pivot and partitions the given array around the picked pivot by placing the pivot in its correct position in the sorted array.
- During partition, the pivot is placed in its correct position in the sorted array by putting all smaller elements to the left of the pivot, and all greater elements to the right of the pivot.
- There are many different choices for picking pivots which affects the performance of quick sort.

```cpp
int partition(vector<int>& arr, int l, int r)
{
    int pivot = arr[r]; // can be any element
    int i = l - 1;

    for (int j = l; j < r; j++)
    {
        if (arr[j] < pivot)
        {
            i++;
            swap(arr[i], arr[j]);
        }
    }

    swap(arr[i + 1], arr[r]);
    return i + 1;
}

void quickSort(vector<int>& arr, int l, int r)
{
    if (l < r)
    {
        int pi = partition(arr, l, r);

        quickSort(arr, l, pi - 1);
        quickSort(arr, pi + 1, r);
    }
}
```

- Time Complexity: O(n^2) in worst case but O(n log n) for average case.
- Space Complexity: O(n) due to the recursive call stack.
- Quick sort is an in-place algorithm, as it does not require extra space.

---

## Selection Sort
- Works by repeatedly selecting the smallest (or largest) element from the unsorted portion of the list and moving it to the sorted portion of the list.

```cpp
void selectionSort(vector<int>& arr)
{
    int n = arr.size();
    for (int i = 0; i < n-1; i++)
    {
        int minIndex = i;
        for (int j = i+1; j < n; j++)
        {
            if (arr[j] < arr[minIndex])
                minIndex = j;
        }
        swap(arr[i], arr[minIndex]);
    }
}
```

- Time Complexity: O(n^2)
- Space Complexity: O(1)
- Selection sort is an in-place algorithm, as it does not require extra space.

