
## Table of Contents

1. [Array](#array)
2. [Deque](#deque)
3. [Forward List](#forward-list)
4. [Iterators](#iterators)
5. [List](#list)
6. [Map](#map)
7. [Multimap](#multimap)
8. [Multiset](#multiset)
9. [Pair](#pair)
10. [Priority Queue](#priority-queue)
11. [Queue](#queue)
12. [Set](#set)
13. [Stack](#stack)
14. [Unordered Map](#unordered-map)
15. [Unordered Multimap](#unordered-multimap)
16. [Unordered Multiset](#unordered-multiset)
17. [Unordered Set](#unordered-set)
18. [Vector](#vector)

---


## Array
- Array classes knows its size, whereas C-style arrays lack this property. So when passing to functions, we don't need to pass size as a separate parameter.
- C-style arrays have a risk of [array being decayed into a pointer](https://www.geeksforgeeks.org/what-is-array-decay-in-c-how-can-it-be-prevented/). Array classes don't decay into pointers.

## Syntax


```cpp
array<object_type, size> variable_name;
```


### Functions

```cpp
array<int, 6> arr = {1, 2, 3, 4, 5, 6};

// at() is used to access the element at an index
arr.at(3);
// we can also use [] operator like C-style arrays
arr[3];

// front() returns reference to the first element of array
arr.front();

// back() returns reference to the last element of array
arr.back();

// size() returns the number of elements in array
arr.size();

// swap() swaps all elements of one array with other
a1.swap(a2);

// empty() returns true if array size is 0 else returns false
arr.empty();

// fill() fills the entire array with a value
arr.fill(0);
```


## Deque
- Double-Ended Queues are containers with the feature of expansion and contraction on both ends.
- Similar to **Vector** but are more efficient in case of insertion and deletion of elements.
- Unlike vectors, contiguous storage allocation may not be guaranteed.
- Deque functions are the same as vector functions with an addition of push and pop operations for both front and back.
- Accessing elements is `O(1)`, insertion and removal of elements in middle is `O(N)`, insertion or removal of elements at start and end is `O(1)`.

## Syntax

```cpp
deque<object_type> variable_name;
```


## Forward List
- Implements singly **Linked List**. Forward lists are more useful in insertion, removal and moving operations (like sorting).
- It differs from the [List] by the fact that forward list keeps track of the location of only the next element while list keeps track of both next and previous elements, thus increasing storage space.
- The drawback is that it cannot be iterated backward and its individual elements cannot be accessed directly.

## Syntax

```cpp
forward_list<object_type> variable_name;
```


### Functions

```cpp
forward_list<int> l;

// assign() assigns new elements by replacing current elements and resizing the container
l.assign(10, 0); // replaces first 10 elements with 0
l.assign({1, 2, 3});
l1.assign(l2.begin(), l2.end()); // copies elements from l2 into l1

// push_front() and emplace_front() adds a new element at the beginning of the container
l.push_front(1);
l.emplace_front(2);

// pop_front() removes the first element of the container
l.pop_front();

// insert_after() and emplace_after() inserts elements after any position.
l.insert_after(itr, {1, 2, 3});
l.emplace_after(itr, 4);

// erase_after() erases elements from a particular position
l.erase_after(itr);
l.erase_after(itr_start, itr_end); // erases all values between itr_start and itr_end

// remove() removes all occurrences of element
l.remove(2);

// clear() deletes all elements in container
l.clear();
```


## Iterators
Iterators are used to point at the memory addresses of STL containers. They are primarily used in sequences. They reduce the complexity and execution time of the program.

## Syntax

```cpp
vector<int> v = { 1, 2, 3, 4, 5 };
vector<int>::iterator ptr; // iterator to a vector<int>

ptr = v.begin(); // returns the beginning position of vector
ptr = v.end(); // returns the after end position of the container

advance(ptr, 3); // advances pointer, now pointing to v[0+3]

auto next_itr = next(ptr, 1); // new pointer returned advanced by 1 position
auto prev_itr = prev(ptr, 1); // new pointer returned decremented by 1 position

ptr += 1; // avoid using this as this does not work if memory is non-contiguous
ptr++; // works also for non-contiguous memory alocation

cout << *ptr << '\n'; // *ptr is used to access the value by reference
```


## List
- Lists are sequence containers that allow non-contiguous memory allocation.
- As compared to **Vector**, the list has slow traversal, but once a position has been found, insertion and deletion happen in `O(1)`.
- Lists have faster insert and delete operations as compared to both arrays and vectors.
- Normally we use a [Doubly Linked List](https://www.geeksforgeeks.org/introduction-and-insertion-in-a-doubly-linked-list/). To implement a Singly Linked List, we use a **Forward List**.
- Has only sequential access, random access to any middle element is not possible.

## Syntax

```cpp
list<object_type> variable_name;
```


### Functions

```cpp
list<int> l;

// front() returns the value of the first element in the list
l.front();

// back() returns the value of the last element in the list
l.back();

// push_front() and emplace_front() adds a new element at the beginning of the list
l.push_front(1);
l.emplace_front(1);

// push_back() and emplace_back() adds a new element at the end of the list
l.push_back(2);
l.emplace_back(2);

// pop_front() removes the first element of the list
l.pop_front();

// pop_back() removes the last element of the list
l.pop_back();

// insert() inserts given number of elements before the position mentioned
l.insert(itr, 10, 0); // inserts 10 elements with value 0 before itr

// emplace() inserts an element at a given position
l.emplace(itr, 2);

// begin() returns an iterator pointing to the first element of the list
l.begin();

// end() returns an iterator pointing to the element theoretically after the last element
l.end();

// empty() returns 1 if container is empty else 0
l.empty();

// erase() removes a single element or a range of elements
l.erase(itr);

// assign() assigns new elements by replacing current elements and resizing the container
l.assign(10, 0); // replaces first 10 elements with 0
l1.assign(l2.begin(), l2.end()); // copies elements from l2 into l1

// remove() removes all the elements from the list which are equal to given value
l.remove(2);

// reverse() reverses the list
l.reverse();
```


## Map
- Maps are containers that store elements in a mapped fashion.
- Each element has a key value and a mapped value.
- No two mapped values can have the same key values.

## Syntax

```cpp
map<key_type, value_type> variable_name;
```


### Functions

```cpp
map<string, int> m;

// inserting elements in a map, can use insert() and emplace() interchangebly
m["One"] = 1;
m.insert(pair<string, int>("Two", 2));
m.emplace(make_pair("Three", 3));
m.emplace({"Four", 4});
m.emplace("Five", 5);

// count() returns true if key is present else false
m.count("Four");

// find() returns an iterator to the element with matching key
pair<string, int>* p = m.find("Three"); // p->first gives the key, p->second gives the value

// size() returns the size of the map
m.size();

// empty() returns true if map is empty else returns false
m.empty();

// begin() returns an iterator to the first element in the map
m.begin();

// end() returns an iterator to the theoretical element that follows the last element in the map
m.end();

// clear() removes all elements from map
m.clear();
```


## Multimap
- Multimap is similar to **Map** with the addition that multiple elements can have the same keys.
- It is not required that the key-value and mapped-value pairs be unique.
- Multimap keeps all the keys in sorted order always.

## Syntax

```cpp
multimap<key_type, value_type> variable_name;
```


### Functions

```cpp
multimap<int, int> m;

// clear() removes all elements from container
m.clear();

// empty() returns true if container is empty else false
m.empty();

// swaps() swaps the values in two containers
m1.swap(m2);

// size() returns the number of elements in container
m.size();

// insert() and emplace() add key-value pair to the container
m.insert(1, 2);
m.emplace(1, 4);

// begin() returns an iterator to the first element in the container
m.begin();

// end() returns an iterator to the theoretical element that follows the last element in the container
m.end();

// count() returns the number of matches with the key
m.count(1);

// erase() removes a key from the multimap (and all values associated with that key)
m.erase(1);
m.erase(itr); // erases just the key-value pair with that iterator
m.erase(itr_start, itr_end); // erases all key-value pairs in range

// find() returns an iterator to the key provided (first occurred)
m.find(1);
```


## Multiset
- Multiset is a type of container similar to **Set**, with the exception that multiple elements can have the same values.
- Values are arranged in ascending order by default.

```cpp
multiset<object_type> variable_name;

// decreasing order multiset
multiset<object_type, greater<object_type>> variable_name;
```

## Syntax

```cpp
multiset<int> s;

// begin() returns an iterator to the first element in set
s.begin();

// end() returns an iterator to the theoretical element that follows the last element in the multiset
s.end();

// size() returns the size of the set
s.size();

// empty() returns true if the set is empty else false
s.empty();

// insert() and emplace() insert new elements to the set
s.insert(2);
s.emplace(2);
s.emplace(itr, 2);

// erase() removes an element
s.erase(itr);
s.erase(2);

// clear() removes all elements from set
s.clear();

// find() returns an iterator to the element in set
s.find(2);

// count() returns the number of elements having same value as parameter
s.count(2);
```


## Pair
- Pair is used to combine two values of any data types.
- It is used if we want to store tuples.
- The first element is referenced as `first` and the second element is referenced as `second`.
- Pairs can be assigned, copied and compared.
- The array of objects allocated in a **Map** or **Hash Map** is of type pair.

## Syntax

```cpp
pair<object_type1, object_type2> variable_name;
```


### Functions

```cpp
// different ways of initializing pairs
pair<int, int> p1(1, 2);
pair<int, int> p2 = make_pair(3, 4);
pair<int, int> p3(p2);
pair<int, int> p4 = p3;
pair<int, int> p5 = {5, 6};
pair<int, int> p6;
p6.first = 7;
p6.second = 8;
pair<int, int>* p7 = new pair<int, int>(9, 10); // pointer

// accessing values of pair class
p1.first;
p1.second;

// accessing values of pair pointer
p7->first;
p7->second;

// swap() swaps contents of 2 pairs with same types
p1.swap(p2);
```


## Priority Queue
- Priority Queue is a container designed such that the first element of the queue is either the greatest or the smallest of all elements in the queue, and elements are in non-increasing or non-decreasing order.
- The top element is always the greatest by default (can also change it to smallest).
- Priority Queue is built on top of the max heap and use an **Array** or **Vector** as an internal structure. It is the implementation of **Heap** data structure.

## Syntax

```cpp
priority_queue<object_type> variable_name;

// min heap for priority queue
priority_queue<object_type, vector<object_type>, greater<object_type>> variable_name;
```


### Functions

```cpp
priority_queue<int> q;

// empty() returns true if container is empty else false
q.empty();

// size() returns the size of the container
q.size();

// top() returns a reference to the topmost element of queue
q.top();

// push() and emplace() inserts a new element at the end of queue
q.push(1);
q.emplace(2);

// swap() swaps the contents of two containers of same data type
q1.swap(q2);
```


## Queue
- Queues are container adaptors that operate in a First In First Out (FIFO) type of arrangement.
- Elements are inserted at the back (end) and are deleted from the front (start).
- Queues use an encapsulated object of **Deque** or **List** as its underlying container.

## Syntax

```cpp
queue<object_type> variable_name;
```


### Functions

```cpp
queue<int> q;

// empty() returns true if container is empty else false
q.empty();

// size() returns the size of container
q.size();

// swap() swaps the contents of two containers of same data type
q1.swap(q2);

// push() and emplace() adds a new element to the end of container
q.push(2);
q.emplace(2);

// front() returns a reference to the first element of container
q.front();

// back() returns a reference to the last element of container
q.back();

// pop() deletes the first element of container
q.pop();
```


## Set
- A set is a container that stores unique elements in a specific sorted order.
- Every operation on a set takes `O(1)` complexity in the average case and takes `O(N)` in the worst case.
- Sets follow **Binary Search Tree** implementation.
- The values in a set are unindexed.
- By default, the set is sorted in ascending order. However, we can change the sorting order.
- Time complexity for insertion and deletion of elements in a set is `O(\log N)`.

## Syntax

```cpp
set<object_type> variable_name;

// change sorting order to descending
set<object_type, greater<object_type>> variable_name;
```


### Functions

```cpp
set<int> s;
set<string> str;

// insert() and emplace() inserts an element in the set
s.insert(1);
s.emplace(2);

// begin() returns an iterator pointing to the first element in the set
s.begin();

// end() returns an iterator to the theoretical element after the last element
s.end();

// count() returns 1 if the element is present in the container otherwise 0
s.count(1);

// clear() deletes all the elements in the set
s.clear();

// find() searches an element in the set
s.find(1);

// erase() deletes a single element
s.erase(s.begin());
s.erase(2);

// size() returns the size of the set
s.size();

// empty() checks if the set is empty or not
s.empty();
```


##
## Examples

```cpp
#include<bits/stdc++.h>

using namespace std;

int main()
{
	set < int > s;
	for (int i = 1; i <= 10; i++)
	{
		s.insert(i);
	}

	cout << "Elements present in the set: ";
	for (auto it = s.begin(); it != s.end(); it++)
	{
		cout << * it << " ";
	}
	cout << endl;
	int n = 2;
	if (s.find(2) != s.end())
		cout << n << " is present in set" << endl;

	s.erase(s.begin());
	cout << "Elements after deleting the first element: ";
	for (auto it = s.begin(); it != s.end(); it++)
	{
		cout << * it << " ";
	}
	cout << endl;
	
	cout << "The size of the set is: " << s.size() << endl;

	if (s.empty() == false)
		cout << "The set is not empty " << endl;
	else
		cout << "The set is empty" << endl;
	s.clear();
	cout << "Size of the set after clearing all the elements: " << s.size();
}
```



## Stack
- Stacks are containers with Last In First Out (LIFO), where a new element is added at top and an element is removed from top itself.
- Stack uses either **Vector**, **Deque** (default) or **List** as its underlying container.

## Syntax

```cpp
stack<object_type> variable_name;
```


### Functions

```cpp
stack<int> s;

// empty() returns true if stack is empty else false
s.empty();

// size() returns the size of the stack
s.size();

// top() returns a reference to the top most element
s.top();

// push() and emplace() inserts an element to the top of stack
s.push(2);
s.emplace(3);

// pop() deletes the topmost element from stack
s.pop();
```


## Unordered Map
- Unordered Map is a container that stores key-value and mapped-value pairs, like **Map**.
- Internally, unordered map is implemented using **Hash Table**, the key provided is hashed into indices of a hash table which is why performance depends on the hash function.
- On average, the cost of search, insert and delete is `O(1)`.

## Syntax

```cpp
unordered_map<object_type1, object_type2> variable_name;
```


### Functions

```cpp
unordered_map<string, int> m;

// insert(), emplace() and [] can be used to insert elements
m.insert("a", 1);
m.emplace("b", 2);
m["c"] = 3;

// begin() returns an iterator to the first element in the container
m.begin();

// end() returns an iterator to the theoretical element after the last element in the container
m.end();

// bucket() returns the bucket number wehre the key is located
m.bucket("a");

// bucket_count() returns the number of buckets in the container
m.bucket_count();

// bucket_size() returns the number of elements in a bucket (given bucket_number)
m.bucket_size(i);

// find() returns an iterator to the key
m.find("a");

// empty() returns true if the container is empty else false
m.empty();

// erase() erases a key in the container
m.erase("a");
```


##
## Unordered Map vs **Unordered Set**
|                           Unordered Map                           |                           Unordered Set                            |
| :---------------------------------------------------------------: | :----------------------------------------------------------------: |
|         Contains elements in the form of key-value pairs          | Contains independent values, used to see presence/absence of a set |
| Operator `[]` can be used to extract corresponding value to a key |    Searching for an element is done using the `find()` function    |


##
## Unordered Map vs **Map**
|                            Unordered Map                            |                             Map                              |
| :-----------------------------------------------------------------: | :----------------------------------------------------------: |
|                   Key can be stored in any order                    |               Ordered sequence of unique keys                |
| Implements an unbalanced tree structure, so order is not maintained | Implements a balanced tree structure, so order is maintained |
|          Time complexity of operations is generally `O(1)`          |    Time complexity of operations is generally `O(\log N)`    |



## Unordered Multimap
- The limitation with **Unordered Map** is that we cannot store duplicates in it.
- The internal implementation is the same as unordered map but for duplicate keys, another count value is maintained with each key-value pair.
- Pairs with the same keys come together in the data structure but pairs with the same values aren't guaranteed to come together.

## Syntax

```cpp
unordered_multimap<object_type1, object_type2> variable_name;
```


### Functions

```cpp
unordered_multimap<string, int> m;

// begin() returns an iterator to the first element in the container or one of its buckets
m.begin();

// end() returns an iterator to the theoretical element after the last element
m.end();

// count() returns the number of elements in container whose key matches with parameter
m.count("a");

// clear() clears the contents of container
m.clear();

// size() returns the number of elements in the container
m.size();

// swap() swaps the contents of two containers
m1.swap(m2);

// find() returns an iterator to the element with matching key
m.find("a");

// bucket_size() returns the number of elements in a bucket
m.bucket_size(i);

// bucket() returns the bucket number with a matchin key
m.bucket("a");

// bucket_count() returns the total number of buckets in container
m.bucket_count();

// empty() ertuns true if container is empty else false
m.empty();

// emplace() inserts a key-value pair in the container
m.emplace("a", 1);
```


## Unordered Multiset
- The unordered multiset is an unordered container that works similarly to an **Unordered Set**. The only difference is that we can store multiple copies of the same key in this container.
- It is also implemented using a **Hash Table** so time complexity of operations is `O(1)` on average and `O(N)` in the worst case.

## Syntax

```cpp
unordered_multiset<object_type> variable_name;
```


### Functions

```cpp
unordered_multiset<int> s;

// insert() and emplace() inserts new elements
s.insert(1);
s.emplace(2);
s.emplace(2);

// begin() returns an iterator pointing to the first element 
// in the container or the first element in one of its buckets
s.begin();

// end() returns an iterator pointing to the position immediately after the last element in the container
s.end();

// empty() returns true if container is empty otherwise false
s.empty();

// find() returns an iterator that points to the element position
s.find(1);

// clear() clears the contents of the container
s.clear();

// count() returns count of elements equal to given value
s.count(1);

// size() returns the count of elements in container
s.size();

// erase() removes a single element, or all elements with a value, or a range of elements
s.erase(2); // erases all elements with value 2
s.erase(itr);
s.erase(itr_start, itr_end);

// swap() swaps two containers
s1.swap(s2);

// equal_range() returns a pair, where first is iterator to 
// first position of element and second is iterator to last position of element
s.equal_range(2);
```


##
## Examples

```cpp
#include<bits/stdc++.h>

using namespace std;
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(NULL);
	
	unordered_multiset < int > s;
	s = {1, 2, 1, 1, 2, 3, 4, 5, 3, 3, 2, 1, 2, 1, 3, 2, 3, 4, 2, 1, 1, 1};
	
	cout << "Elements present in the unordered_multiset: ";
	for (auto i : s)
		cout << i << " ";
	cout << endl;
	
	cout << "Number of elements present in the unordered_multiset: " << s.size() << endl;
	
	cout << "Deleting all elements with value 2: ";
	s.erase(2);
	for (auto i : s)
		cout << i << " ";
	cout << endl;
	
	cout << "Deleting one copy of element with value 1: ";
	s.erase(s.find(1));
	for (auto i : s)
		cout << i << " ";
	cout << endl;
}
```


## Unordered Set
- An unordered set is a container that stores unique elements in no particular order.
- It is implemented using a **Hash Table** where keys are hashed into indices of a hash table so that the insertion is always randomized.
- Every operation on an unordered set takes `O(1)` complexity in the average case and takes `O(N)` in the worst case which depends on the internally used hash function.


## Syntax

```cpp
unordered_set<object_type> variable_name;
```


### Functions

```cpp
unordered_set<int> s;
unordered_set<string> str;

// insert() and emplace() inserts an element in the unordered set
s.insert(1);
s.insert(2);
s.emplace(3);

// begin() returns an iterator pointing to the first element in the unordered set
s.begin();

// end() returns an iterator to the theoretical element after the last element
s.end();

// count() returns 1 if the element is present in the container otherwise 0
s.count(2);

// clear() deletes all the elements in unordered set
s.clear();

// find() searches an element in the unordered set
s.find(2);

// erase() deletes a single element or elements in a particular range
s.erase(s.begin());

// size() returns the size of the unordered set
s.size();

// empty() checks if the unordered set is empty or not
s.empty();
```


##
## Examples

```cpp
#include<bits/stdc++.h>

using namespace std;

int main()
{
	unordered_set < int > s;
	for (int i = 1; i <= 10; i++)
	{
		s.insert(i);
	}

	cout << "Elements present in the unordered set: ";
	for (auto it = s.begin(); it != s.end(); it++)
	{
		cout << * it << " ";
	}
	cout << endl;
	int n = 2;
	if (s.find(2) != s.end())
		cout << n << " is present in unordered set" << endl;

	s.erase(s.begin());
	cout << "Elements after deleting the first element: ";
	for (auto it = s.begin(); it != s.end(); it++)
	{
		cout << * it << " ";
	}
	cout << endl;
	
	cout << "The size of the unordered set is: " << s.size() << endl;

	if (s.empty() == false)
		cout << "The unordered set is not empty " << endl;
	else
	    cout << "The unordered set is empty" << endl;
	s.clear();
	cout << "Size of the unordered set after clearing all the elements: " << s.size();
}
```

|                                      Set                                       |                              Unordered Set                               |
| :----------------------------------------------------------------------------: | :----------------------------------------------------------------------: |
|                       Stores elements in a sorted order                        |                   Stores elements in an unsorted order                   |
|                 Uses **Binary Search Tree** for implementation                 |                  Uses **Hash Table** for implementation                  |
| More than one element can be erased by giving the starting and ending iterator | Only that element can be erased for which the iterator position is given |



## Vector
- Vectors are dynamic arrays that have the ability to change size whenever elements are added or deleted from them. Vector elements can be easily accessed and traversed using iterators.
- A vector stores elements in contiguous memory locations.
- Inserting at the end takes differential time, as the array may need to be extended.
- Removing the last element takes constant time as no resizing happens.
- Inserting and removing at the beginning or in middle is linear in time.

## Syntax

```cpp
vector<object_type> variable_name;

// initialization using list
vector<object_type> variable_name({value1, value2, value3});

// initializing every element of the vector the same value with given size
vector<object_type> variable_name(size, value);

// initialization from another vector
vector<object_type> new_vector(old_vector);
```


### Functions

```cpp
vector<int> v1;
vector<string> v2;

// begin() returns an iterator pointing to the first element of the vector
auto itr = v1.begin();

// end() returns an iterator pointing to the element theoretically after the last element of the vector
auto itr = v1.end();

// push_back() and emplace_back() insert the element at the end of the vector
v1.push_back(1);
v1.emplace_back(2);

// insert() and emplace() are used to insert an element at a specific location
v1.insert(itr, 5);
v1.emplace(itr, 5);

// erase() is used to delete a specific element
v1.erase(itr);

// pop_back() deletes the last element of the vector and returns it
v1.pop_back();

// front() returns a reference to the first element of the vector
v1.front();

// back() returns a reference to the last element of the vector
v1.back();

// clear() deletes all the elements from the vector
v1.clear();

// empty() checks if the vector is empty or not
v1.empty();

// size() returns the size of the vector
v1.size();

// swap() swaps the contents of one vector with another vector of same type. Sizes may differ
v1.swap(v2);
```


##
## Examples

```cpp
#include<bits/stdc++.h>

using namespace std;

int main()
{
	vector < int > v;

	for (int i = 0; i < 10; i++)
	{
		v.push_back(i); //inserting elements in the vector
	}

	cout << "the elements in the vector: ";
	for (auto it = v.begin(); it != v.end(); it++)
	    cout << * it << " ";

	cout << "\nThe front element of the vector: " << v.front();
	cout << "\nThe last element of the vector: " << v.back();
	cout << "\nThe size of the vector: " << v.size();
	cout << "\nDeleting element from the end: " << v[v.size() - 1];
	v.pop_back();

	cout << "\nPrinting the vector after removing the last element:" << endl;
	for (int i = 0; i < v.size(); i++)
		cout << v[i] << " ";

	cout << "\nInserting 5 at the beginning:" << endl;
	v.insert(v.begin(), 5);
	cout << "The first element is: " << v[0] << endl;
	cout << "Erasing the first element" << endl;
	v.erase(v.begin());
	cout << "Now the first element is: " << v[0] << endl;

	if (v.empty())
		cout << "\nvector is empty";
	else
		cout << "\nvector is not empty" << endl;

	v.clear();
	cout << "Size of the vector after clearing the vector: " << v.size();
}
```
