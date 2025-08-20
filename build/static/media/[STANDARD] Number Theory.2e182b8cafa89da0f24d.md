Currently the website does not support latex rendering, so the following content is a markdown version. <br><br>

## Table of Contents

1. [Binary Exponentiation](#binary-exponentiation)
2. [Bit Manipulation](#bit-manipulation)
3. [Divisors](#divisors)
4. [Euclidean Algorithm](#euclidean-algorithm)
5. [Euler's Totient Function](#eulers-totient-function)
6. [Fermat's Little Theorem](#fermats-little-theorem)
7. [Fibonacci Computation](#fibonacci-computation)
8. [Integer Factorization](#integer-factorization)
9. [Linear Congruence Equation](#linear-congruence-equation)
10. [Linear Diophantine Equation](#linear-diophantine-equation)
11. [Linear Sieve](#linear-sieve)
12. [Modular Inverse](#modular-inverse)
13. [Primality Tests](#primality-tests)
14. [Sieve of Eratosthenes](#sieve-of-eratosthenes)
15. [Submask Enumeration](#submask-enumeration)

---

## Binary Exponentiation
Calculates `A^B` in `O(\log B)` instead of usual `O(B)`
- **Case 1:** If `B = 0`, result will always be `1`.
- **Case 2:** If `B` is even, then we calculate `((A^2)^{\frac{B}{2}})`.
- **Case 3:** If `B` is odd, then we calculate `(A \times (A^{\frac{B-1}{2}}) ^ 2)`.


```cpp
long long binpow(long long A, long long B) // recursive (slower)
{
    if (B == 0)
        return 1;
    long long res = binpow(A, B / 2);
    if (B & 1) // Odd
        return res * res * A;
    else
        return res * res;
}

```


```cpp
long long binpow(long long a, long long b) // iterative (faster)
{
    long long res = 1;
    while (b)
	{
        if (b & 1) 
			res = res * a;
        a = a * a;
        b >>= 1;
    }
    return res;
}

```


```cpp
long long binpow(long long a, long long b, long long m)
{
	a %= m;
	long long res = 1;
	while (b)
	{
		if (b & 1)
			res = res * a % m;
		a = a * a % m;
		b >>= 1;
	}
	return res;
}

```
## Applying A Permutation `k` Times
Given a sequence of a certain length, apply a given permutation to it `k` times.
To do this, raise the permutation to it's `k`-th power using binary exponentiation, and then apply it to the sequence. This takes a time complexity of `O(n\log k)`.

```cpp
vector<int> applyPermutation(vector<int> seq, vector<int> perm)
{
	vector<int> new_seq(seq.size());
	for (int i = 0; i < seq.size(); i++)
	{
		new_seq[i] = seq[perm[i]];
	}
	return new_seq;
}

vector<int> permute(vector<int> seq, vector<int> perm, long long k)
{
	while (k > 0)
	{
		if (k & 1)
		{
			seq = applyPermutation(seq, perm);
		}
		perm = applyPermutation(perm, perm);
		k >>= 1;
	}
	return seq;
}

```
> [!tip] This task can be solved more efficiently in linear time by building the permutation graph and considering each cycle independently. You could then compute `k` modulo the size of the cycle and find the final position for each number which is part of this cycle.
## Multiplying Big Numbers Modulo `m`
When multiplying two big numbers, `a` and `b` modulo `m`, the product may be too big to fit in the data-type. So we use a variation of binary exponentiation to compute `a \cdot b \pmod m`.
``
a\cdot b =
\begin{cases}
0 & \text{if `a=0`}\\
2\cdot\frac{a}{2}\cdot b & \text{if `a>0` and `a` even}\\
2\cdot\frac{a-1}{2}\cdot b + b & \text{if `a>0` and `a` odd}
\end{cases}
``


## Bit Manipulation
# Binary Number
A binary number is a number expressed in the base-`2` numeral system.
We say that a certain bit is **set** if it is `1` and **cleared** if it is `0`.
The binary number `(a_ka_{k-1}\dots a_1a_0)_2` represents the number:
``(a_ka_{k-1}\dots a_1a_0)_2 = 2^ka_k+2^{k-1}a_{k-1}\cdots2^1a_1+2^0a_0``
CPU's are very fast manipulating bits with specific operations.

```cpp
unsigned int unigned_number = 13;
assert(unsigned_number == 0b1101);

int positive_signed_number = 13; // 32-bit
assert(positive_signed_number == 0b1101);

short negative_signed_number = -13; // 16-bit
assert(negative_signed_number == 0b1111'1111'1111'0011); // Two's Complement

```
### Bitwise Operators
All these operators are instant on a CPU for fixed-length integers.
- `&` : The bitwise AND operator.
- `|` : The bitwise inclusive OR operator.
- `^` : The bitwise exclusive OR (XOR) operator.
- `~` : The bitwise complement (NOT) operator.
### Shift Operators
- `>>` : `a >> b` shifts the binary representation of `a` by `b` bits to the right. Represents integer division by `2^b`.
- `<<` : `a << b` shifts the binary representation of `a` by `b` bits to the left by appending zero's. Represents multiplication by `2^b`. Because of fixed-length integer, if we shift left too much, the bits start dropping and we will end up with `0`.
## Tricks
##### Set/Flip/Clear/Check a Bit
- `1 << x` is a number with only the `x^{\text{th}}` bit set.
- `~(1 << x)` is a number with all the bits set except the `x^{\text{th}}` bit.
- `n | (1 << x)` sets the `x^{\text{th}}` bit in the number `n`.
- `n ^ (1 << x)` flips the `x^{\text{th}}` bit in the number `n`.
- `n & ~(1 << x)` clears the `x^{\text{th}}` bit in the number `n`.
- `(n >> x) & 1` checks if the `x^{\text{th}}` bit is set in the number `n`
##### Check if Number Divisible by `2^k`

```cpp
bool isDivisibleByPowerOf2(int n, int k)
{
	int power_of_2 = 1 << k;
	return !(n & (power_of_2 - 1));
}

```
#### Brian Kernighan's Algorithm
Using this, we can count the number of bits set.
The idea is to consider only the set bits of an integer by turning off it's rightmost set bit (after counting it), so the next iteration of the loop considers the next rightmost bit.

```cpp
int countSetBits(int n)
{
	int count = 0;
	while (n)
	{
		n &= n - 1; // clears the rightmost set bit
		count++;
	}
	return count;
}

```
### Standard Library
The following operations are supported since C++20:
- `has_single_bit` : checks if the number is a power of `2`.
- `bit_ciel` / `bit_floor` : round up/down to the closest power of `2`.
- `rotl` / `rotr` : rotate the bits in the number.
- `countl_zero` / `countr_zero` / `countl_one` / `countr_one` : count the leading/trailing zero's/one's.
- `popcount` : count the number of set bits.

## Divisors
> [!tip] For any integer `n > 1`, there cannot be more than one prime divisor of `n` that is greater than `\sqrt n`.
## Number of Divisors
If the prime factorization of `n = p_1^{e_1}\cdot p_2^{e_2}\dots p_k^{e_k}`, where `p_i` are distinct prime numbers, then the number of divisors is:
``d(n) = (e_1+1)(e_2+1)\dots(e_k+1)``
`d(n)` is a multiplicative function:
``d(ab) = d(a)\cdot d(b)``

```cpp
long long numDivisors(long long num)
{
	long long total = 1;
	for (int i = 2; (long long)i*i <= num; i++)
	{
		if (num % i == 0)
		{
			int e = 0;
			do
			{
				num /= i;
				e++;
			} while (num % i == 0);
			total *= e + 1;
		}
	}
	if (num > 1) // if a prime > sqrt(n) remains
		total *= 2;
	return total;
}

```
## Sum of Divisors
If the prime factorization of `n = p_1^{e_1}\cdot p_2^{e_2}\dots p_k^{e_k}`, where `p_i` are distinct prime numbers, then the sum of divisors is:
``\sigma(n) = \frac{p_1^{e_1+1}-1}{p_1-1}\cdot\frac{p_2^{e_2+1}-1}{p_2-1}\dots\frac{p_k^{e_k+1}-1}{p_k-1}\cdot``
`\sigma(n)` is a multiplicative function:
``\sigma(ab) = \sigma(a)\cdot \sigma(b)``

```cpp
long long sumDivisors(long long num)
{
	long long total = 1;
	for (int i = 2; (long long)i*i <= num; i++)
	{
		if (num % i == 0)
		{
			int e = 0;
			do
			{
				num /= i;
				e++;
			} while (num % i == 0);
			long long sum = 0, pow = 1;
			do
			{
				sum += pow;
				pow *= i;
			} while (e-- > 0);
			total *= sum;
		}
	}
	if (num > 1)
		total *= num + 1;
	return total;
}

```

## Euclidean Algorithm
Given two non-negative integers `a` and `b`, Euclidean Algorithm helps find the GCD for both.
``
\gcd(a, b) =
\begin{cases}
a, & \text{if } b = 0\\
\gcd(b, a\bmod{b}), & \text{otherwise}
\end{cases}
``
#### Implementation

```cpp
// recursive (slower)
int gcdRecursive1(int a, int b)
{
	if (b == 0)
	{
		return a;
	}
	else
	{
		return gcd(b, a % b);
	}
}

int gcdRecursive2(int a, int b)
{
	return b ? gcd(b, a % b) : a;
}

// iterative (faster)
int gcdIterative(int a, int b)
{
	while (b)
	{
		a %= b;
		swap(a, b);
	}
	return a;
}

```

> [!tip] Always use C++ inbuilt [[Tricks#Inbuilt GCD|GCD]] function.
## Time Complexity
- The time complexity of Euclidean Algorithm is estimated by Lame's Theorem, which establishes a connection between the Euclidean Algorithm and the [[Fibonacci Computation]].
- Consecutive Fibonacci Numbers are the worst case input for Euclidean Algorithm.
- Given that the Fibonacci Numbers grow exponentially, the Euclidean Algorithm works in `O\Big(\log\big(\min(a, b)\big)\Big)`.
### LCM
``
\DeclareMathOperator{\lcm}{lcm}
a\cdot b = \lcm(a,b)\cdot\gcd(a,b)
``

```cpp
int lcm(int a, int b)
{
	return (a / gcd(a, b)) * b; // avoids integer overflow
}

```
# Binary GCD
- The slow part of the algorithm is the modulo operations. These are a lot slower than the simple addition, subtraction or bitwise operations. So we use some properties to implement a faster binary GCD function (same as the inbuilt GCD function).
- If both numbers are even, then we can factor out a `2` from both and compute the GCD of the remaining.
  `\gcd(2a, 2b) = 2\gcd(a, b)`
- If one of the numbers is even and other is odd, then we can remove the factor of `2` from the even one.
  `\gcd(2a, b) = \gcd(a, b)`
- If both numbers are odd, then we can subtract one number from the other and calculate GCD.
  `gcd(a, b) = \gcd(a-b, b)`

```cpp
int gcdBinary(int a, int b)
{
	if (!a || !b)
	{
		return a | b; // if either one of a or b is 0, return the non-zero value
	}
	unsigned shift = __builtin_ctz(a | b); // calculates the number of trailing zeroes in binary form of a | b
	a >>= __builtin_ctz(a); // remove trailing zeroes from 
	do
	{
		b >>= __builtin_ctz(b);
		if (a > b)
		{
			swap(a, b);
		}
		b -= a;
	}
	while (b);
	return a << shift;
}

```
# Extended Euclidean Algorithm
The extended euclidean algorithm also represents the GCD in terms of coefficients of `a` and `b` which are `x` and `y` respectively.
``a\cdot x + b\cdot y = \gcd(a, b)``
- Denoting the GCD of `a` and `b` with `g`.
- The euclidean algorithm ends with `b=0` and `a=g`. For these parameters, `(x, y) = (1, 0)`.
- We now need to figure out how the coefficients change during the transition of parameters from `(a, b)` to `(b, a\bmod b)`.
- We can represent `a\bmod b` as:
``
a\bmod b = a - \left\lfloor\frac{a}{b}\right\rfloor \cdot b
``
- Assuming coefficients `(x, y)` for `(a, b)` , and `(x', y')` for `(b, a\bmod b)`:
``
\begin{align}
&a\cdot x+b\cdot y &= g\tag{1}\\
&b\cdot x'+(a\bmod b)\cdot y' &= g\\
\implies\quad &b\cdot x'+\left(a - \left\lfloor\frac{a}{b}\right\rfloor \cdot b\right)\cdot y' &= g\\
\implies\quad &a\cdot y'+b\cdot\left(x' - y'\cdot\left\lfloor\frac{a}{b}\right\rfloor\right) &= g\tag{2}\\
\end{align}
``
- Comparing equations `(1)` and `(2)`:
``
\begin{align}
x &= y'\\
y &= x'-y'\cdot\left\lfloor\frac{a}{b}\right\rfloor
\end{align}
``
### Implementation

```cpp
// Recursive
int gcdExtendedRecursive(int a, int b, int& x, int& y)
{
	if (b == 0)
	{
		x = 1;
		y = 0;
		return a;
	}
	int x1, y1;
	int d = gcdExtendedRecursive(b, a % b, x1, y1);
	x = y1;
	y = x1 - y1*(a/b);
	return d;
}

// Iterative
int gcdExtendedIterative(int a, int b, int& x, int& y)
{
	x = 1, y = 0;
	int x1 = 0, y1 = 1, a1 = a, b1 = b;
	while (b1)
	{
		int q = a1 / b1;
		tie(x, x1) = make_tuple(x1, x - q*x1);
		tie(y, y1) = make_tuple(y1, y - q*y1);
		tie(a1, b1) = make_tuple(b1, a1 - q*b1);
	}
	return a1;
}

```

## Euler's Totient Function
- Euler's Totient Function aka **Phi-Function `\phi(n)`**, counts the number of integers between `1` and `n` inclusive, which are coprime to `n`. `1` is coprime to every number.
#### Properties:
- If `p` is a prime number, then `\gcd(p, q) = 1` for all `1\le q < p`. Therefore:
``\phi(p) = p-1``
- If `p` is a prime number and `k \ge 1`, then there are exactly `\large\frac{p^k}{p}` numbers between `1` and `p^k` that are divisible by `p`. Therefore:
``\phi(p^k) = p^k - p^{k-1}``
- If `a` and `b` are coprime, then:
``\phi(ab) = \phi(a)\cdot\phi(b)``
This relation follows from the [[Chinese Remainder Theorem]]. It guarantees that for each `0\le x<a` and each `0\le y<b`, there exists a unique `0\le z<ab` with `z \equiv x\pmod a` and `z\equiv y\pmod b`.
It can be shown that `z` is coprime to `ab` if and only if `x` is coprime to `a` and `y` is coprime to `b`.
Therefore the amount of integers coprime to `ab` is equal to the product of amounts of `a` and `b`.
- In general, for not coprime `a` and `b`, the equation is:
``\phi(ab) = \phi(a)\cdot\phi(b)\cdot\frac{d}{\phi(d)}``
where `d=\gcd(a, b)`
- Thus using the above properties, we can compute `\phi(n)` through the factorization of `n`.
If `n = p_1^{a_1}\cdot p_2^{a_2}\dots p_k^{a_k}` where `p_i` are prime factors of `n`:
``
\begin{align}
\phi(n) &= \phi(p_1^{a_1})\cdot \phi(p_2^{a_2})\dots \phi(p_k^{a_k})\\
&= (p_1^{a_1} - p_1^{a_1-1})\cdot (p_2^{a_2} - p_2^{a_2-1})\dots (p_k^{a_k} - p_k^{a_k-1})\\
&= p_1^{a_1}\left(1-\frac{1}{p_1}\right)\cdot p_2^{a_2}\left(1-\frac{1}{p_2}\right)\dots p_k^{a_k}\left(1-\frac{1}{p_k}\right)\\
&= n\cdot \left(1-\frac{1}{p_1}\right)\cdot \left(1-\frac{1}{p_2}\right)\dots \left(1-\frac{1}{p_k}\right)
\end{align}
``

```cpp
int phi(int n)
{
	int result = n;
	for (int i = 2; i*i <= n; i++)
	{
		if (n % i == 0)
		{
			while (n % i == 0)
				n /= i;
			result -= result / i;
		}
	}
	if (n > 1)
		result -= result / n;
	return result;
}

```
### `\phi(i)` from `[1; n]`
If we need `\phi(i)` for all numbers `[1; n]`, then factorizing all numbers isn't efficient. We therefore use the same idea as [[Sieve of Eratosthenes]].
We find all prime numbers and then, for each `i` update the `result` of all `i` that are divisible by that prime number.
The time complexity is the same as that of Sieve of Eratosthenes: `O(n\log\log n)`

```cpp
vector<int> phiSieve(int n)
{
	vector<int> phi(n + 1);
	for (int i = 0; i <= n; i++)
		phi[i] = i;
	for (int i = 2; i <= n; i++)
	{
		if (phi[i] == i)
		{
			for (int j = i; j <= n; j += i)
				phi[j] -= phi[j] / i;
		}
	}
	return phi;
}

```
### Divisor Sum Property
Established by Gauss:
``\large \sum_{d | n}\phi(d) = n``
Here the sum is over all positive divisors `d` of `n`.
We can use this divisor sum property to compute the totient of all numbers between `1` and `n`. This implementation has slightly worse time complexity of `O(n\log n)`.

```cpp
vector<int> phiDivisorSum(int n)
{
	vector<int> phi(n + 1);
	phi[0] = 0;
	phi[1] = 1;
	for (int i = 2; i <= n; i++)
		phi[i] = i - 1;
	for (int i = 2; i <= n; i++)
		for (int j = 2*i; i <= n; j += i)
			phi[j] -= phi[i];
	return phi;
}

```
## Euler's Theorem
Euler's Theorem states:
``a^{\phi(m)}\equiv 1\pmod m``
if `a` and `m` are coprime.
In the case when `m` is prime, Euler's theorem turns into [[Fermat's Little Theorem]]:
``a^{m-1}\equiv 1\pmod m``
As immediate consequence we also get the equivalence:
``a^n\equiv a^{n\bmod\phi(m)}\pmod m``
This allows computing `x^n\bmod m` for very big `n`, especially if `n` is the result of another computation, as it computes `n` under a modulo.

---

https://cp-algorithms.com/algebra/phi-function.html

## Fermat's Little Theorem
If `p` is a prime number, then for any integer `a`, the number `a^p - a` is an integer multiple of `p`.
``
a^p \equiv a \pmod{p}
``
If `a` and `p` are coprime:
``a^{p-1} \equiv 1 \pmod p``

## Fibonacci Computation
The Fibonacci Sequence is defined as follows: `F_0 = 0, F_1 = 1, F_n = F_{n-1} + F_{n-2}`.
Fibonacci numbers have the following properties:
- **Cassini's Identity:** `F_{n-1} \cdot F_{n+1} - F_n^2 = (-1)^n`
- **Addition Rule:** `F_{n+k} = F_k \cdot F_{n+1} + F_{k-1} \cdot F_n`
- When `k=n`, `F_{2n} = F_n(F_{n+1} + F_{n-1})`. By induction, for any positive integer `k`, `F_{nk}` is multiple of `F_n`. The inverse is also true: if `F_m` is multiple of `F_n`, then `m` is a multiple of `n`.
- **GCD Identity:** `\text{GCD}(F_m, F_n) = F_{\text{GCD}(m, n)}`
- Fibonacci numbers are the worst possible inputs for [[Euclidean Algorithm]] according to Lame's Theorem.
- **Binet's Formula:** `\Large{F_n = \frac{\left(\frac{1+\sqrt 5}{2}\right)^n - \left(\frac{1-\sqrt 5}{2}\right)^n}{\sqrt 5}}`, for `n > 1`, since the `2^{\text{nd}}` term approaches `0` exponentially: `\Large{F_n = \frac{\left(\frac{1+\sqrt 5}{2}\right)^n}{\sqrt 5}}`
### Matrix Form of Fibonacci Numbers
``
\begin{pmatrix}
F_{n+1} & F_n\\
F_n & F_{n-1}
\end{pmatrix}
=
\begin{pmatrix}
1 & 1\\
1 & 0
\end{pmatrix} ^ n
``
Using [[Binary Exponentiation]] in above, we can calculate `F_n` in `O(\log n)` time.
#### Fast Doubling Method
By expanding the above formula for `n=2k`:
``
\begin{pmatrix}
F_{2k+1} & F_2k\\
F_2k & F_{2k-1}
\end{pmatrix}
=
\begin{pmatrix}
1 & 1\\
1 & 0
\end{pmatrix} ^ {2k}
=
\begin{pmatrix}
F_{k+1} & F_k\\
F_k & F_{k-1}
\end{pmatrix} ^ {2}
``
we can find the following simpler equations:
``
\begin{align}
&F_{2k+1} = F_{k+1}^2 + F_k^2\\
&F_{2k} = F_{k}(2F_{k+1} - F_k)
\end{align}
``
Using the above two equation, Fibonacci numbers can be calculated easily:

```cpp
pair<int, int> fib(int n) 
{
	if (n == 0)
		return {0, 1};
	auto p = fib(n >> 1);
	int a = p.first;
	int b = p.second;
	
	int c = a * (2*b - a);
	int d = b*b + a*a;
	if (n & 1)
		return {d, c+d};
	else
		return {c, d};
}

```
The above code returns `F_n` and `F_{n+1}` as a pair.
### Fibonacci Coding
According to Zeckendorf's theorem, any natural number `n` can be uniquely represented as a sum of Fibonacci Numbers:
``N = F_{k_1} + F_{k_2} + \dots + F_{k_r}``
such that `k_n \ge k_{n+1}+2, k_r \ge 2`, meaning that the representation cannot use two consecutive Fibonacci Numbers.
Any number can be uniquely encoded in the Fibonacci Encoding, we describe this representation with binary codes `d_0d_1d_2\dots d_s1`, where `d_i` is `1` if `F_{i+2}` is used in the representation. The code is appended by a `1` to indicate the end of the code word. This is the only occurrence where two consecutive `1`-bits appear.
``
\begin{eqnarray}
1    &=& 1       &=& F_2         &=& (11)_F\\
2    &=& 2       &=& F_3         &=& (011)_F\\
3    &=& 3       &=& F_4         &=& (0011)_F\\
4    &=& 3+1     &=& F_4+F_2     &=& (1011)_F\\
5    &=& 5       &=& F_5         &=& (00011)_F\\
6    &=& 5+1     &=& F_5+F_2     &=& (10011)_F\\
7    &=& 5+2     &=& F_5+F_3     &=& (01011)_F\\
8    &=& 8       &=& F_6         &=& (000011)_F\\
19   &=& 13+5+1  &=& F_7+F_5+F_2 &=& (1001011)_F
\end{eqnarray}
``
The encoding of any integer `n` can be done by the following greedy algorithm:
1. Iterate through the Fibonacci numbers in descending order to find the largest Fibonacci number less than or equal to `n`. Suppose this is `F_i`.
2. Subtract `F_i` from `n` and put a `1` in the `i-2` position from left (0-indexed).
3. Repeat until there is no remainder.
4. Add a `1` to the rightmost end.
## Periodicity
The Fibonacci sequence modulo `p` is periodic.
The periodic sequence always starts with `F_0,F_1 \equiv 0,1`.
### Pisano Period
The pisano period refers to the periodic sequence of Fibonacci numbers taken modulo a positive integer `p`. The length of the repeating sequence of Fibonacci numbers modulo `p` is called the pisano period of `p`.
###### Definition
The Pisano Period `\pi(p)` is the length of the cycle in the sequence of Fibonacci numbers modulo `p`.
If the Fibonacci sequence modulo `p` is given by:
``F(n) \mod p``
then the Pisano Period `\pi(p)` is the smallest positive integer `k` such that:
``F(n+k)\equiv F(n)\pmod p``
for all integers `n`.

## Integer Factorization
## Trial Division
- Divide by each possible divisor `d`.
- Test divisors `2\le d \le \sqrt n`, with a time complexity `O(\sqrt n)`.
- The smallest divisor must be prime, we remove the factored number and continue the process.
- If no divisor found in the range `[2; \sqrt n]`, then the number has to be prime.

```cpp
vector<long long> factorTrialDivision(long long n)
{
	vector<long long> factorization;
	for (long long d = 2; d*d <= n; d++)
	{
		while (n % d == 0)
		{
			factorization.emplace_back(d);
			n /= d;
		}
	}
	if (n > 1) // prime numbers
		factorization.emplace_back(n);
	return factorization;
}

```
### Wheel Factorization
- Optimization of the trial division.
- One we know that the number is not divisible by 2, we don't check other even numbers. After factoring out 2 and getting an odd number, we simply start with 3 and only consider other odd divisors.
- When extended further, if the number is not divisible by 3, we can also ignore all other multiples of 3.
- Simply, we can also ignore all multiples of 5 once the number isn't divisible by 5.
- Effectively, we ignore all multiples of 2, 3, 5. It can be shown that the remaining numbers form a pattern represented in the below code.
- It is best to store the skipping strides.
- If we add more primes, better optimizations will be reached but the skipping stride array will become larger.

```cpp
vector<long long> factorWheel(long long n)
{
	vector<long long> factorization;
	for (int d : {2, 3, 5})
	{
		while (n % d == 0)
		{
			factorization.emplace_back(d);
			n /= d;
		}
	}
	
	static array<int, 8> increments = {4, 2, 4, 2, 4, 6, 2, 6};
	int i = 0;
	for (long long d = 7; d*d <= n; d += increments[i++])
	{
		while (n % d == 0)
		{
			factorization.emplace_back(d);
			n /= d;
		}
		if (i == 8) // loop through increments
			i = 0;
	}
	
	if (n > 1)
		factorization.emplace_back(n);
	return factorization;
}

```
#### Precomputed Primes
- Extension of the wheel factorization.
- We only test for prime numbers as divisors.
- We precompute all prime numbers using [[Sieve of Eratosthenes]] until `\sqrt n` and test them individually.

```cpp
vector<long long> primes;

vector<long long> factorPrecomputed(long long n)
{
	vector<long long> factorization;
	for (long long d : primes)
	{
		if (d*d > n)
			break
		while (n % d == 0)
		{
			factorization.emplace_back(d);
			n /= d;
		}
	}
	if (n > 1)
		factorization.emplace_back(n);
	return factorization
}

```
## Fermat's Factorization Method
- We can write an odd composite number `n = p\cdot q` as the difference of two squares `n = a^2 - b^2 = (a - b)(a + b)`.
``n = \left(\frac{p+q}{2}\right)^2 - \left(\frac{p-q}{2}\right)^2``
- Fermat's factorization method tries to exploit this fact by guessing the first square `a^2`, and checking if the remaining part, `b^2 = a^2 - n`, is also a square number. If it is, then we have found the factors `a-b` and `a+b` of `n`.

```cpp
int factorFermat(int n)
{
	int a = ceil(sqrt(n));
	int b2 = a*a - n; // b^2 = a^2 - n
	int b = round(sqrt(b2));
	while (b*b != b2)
	{
		a++;
		b2 = a*a - n;
		b = round(sqrt(b2));
	}
	return a - b;
}

```
- This method can be very fast if the deference between the factors `p` and `q` is small. The algorithm runs in time `O(|p-q|)` complexity.
- In practice, this method isn't used because once factors become further apart, it is extremely slow.
---
https://cp-algorithms.com/algebra/factorization.html

## Linear Congruence Equation
The equation is of the form:
``ax\equiv b\pmod n``
where `a`, `b` and `n` are given integers and `x` is an unknown integer.
We need to find the value of `x` from the interval `[0; n-1]`.
### Solution by finding [[Modular Inverse]]
Consider a simpler case where `a` and `n` are coprime. Then we can find the modular inverse of `a` and get a unique solution:
``x\equiv b\cdot a^{-1}\pmod n``
Consider the case where `a` and `n` are not coprime. Then the solution will not always exist. Let `g=\gcd(a, n)` which would be greater than one.
Then, if `b` is not divisible by `g`, there is no solution. If `g` divides `b`, then by dividing both sides of the equation by `g`, we receive:
``a'x\equiv b'\pmod{n'}``
in which `a'` and `n'` are already coprime. We get `x'` as solution for `x`. It is clear that `x'` will also be a solution of the original equation. However, it will not be the only solution. The original equation will have exactly `g` solutions:
``x_i = (x'+in')\pmod{n}\quad \text{for }i=0,1\dots g-1``
Therefore, the number of solutions of the linear congruence equation is equal to either `g` or to `0`.
### Solution using [[Euclidean Algorithm#Extended Euclidean Algorithm|Extended Euclidean Algorithm]]
We can rewrite the equation to the following Diophantine Equation:
``ax+nk = b``
where `x` and `k` are unknown integers.
The method of solving this is described in the article of [[Linear Diophantine Equation]].
This method is equivalent to the Modular Inverse method.

## Linear Diophantine Equation
A Linear Diophantine Equation (in two variables) is an equation of the general form:
``ax+by=c``
where `a, b, c` are given integers and `x, y` are unknown integers.
### Degenerate Case
A degenerate case is when `a=b=0`. Either we have no solutions or infinitely many solutions, depending on whether `c=0` or not.
### Analytic Solution
When `a\ne 0` and `b\ne 0`, the equation can be equivalently treated as either of the following:
``
\begin{align}
ax\equiv c\pmod b\\
by\equiv c\pmod a
\end{align}
``
Without loss of generality, assume that `b\ne 0` and consider the first equation. When `a` and `b` are co-prime, the solution to it is given as:
``x\equiv ca^{-1}\pmod b``
where `a^{-1}` is the [[Modular Inverse]] of `a` modulo `b`.
When `a` and `b` are not co-prime, values of `ax` modulo `b` for all integer `x` are divisible by `g=gcd(a, b)`, so the solution only exists when `c` is divisible by `g`. In such a case, one of the solutions can be found by reducing the equation by `g`:
``\left(\frac{a}{g}\right)x\equiv \left(\frac{c}{g}\right) \pmod{b/g}``
By the definition of `g`, the numbers `\frac{a}{g}` and `\frac{b}{g}` are co-prime, so the solution is given explicitly as:
``
\begin{align}
x &\equiv \left(\frac{c}{g}\right)\left(\frac{a}{g}\right)^{-1}\pmod{b/g}\\
y &= \frac{c-ax}{b}
\end{align}
``
### Algorithmic Solution
To find one solution of the Diophantine Equation with 2 unknowns, we use the [[Euclidean Algorithm#Extended Euclidean Algorithm|Extended Euclidean Algorithm]].
First, assume that `a` and `b` are non-negative:
``ax_g+by_g=g``
If `c` is divisible by `g=\gcd(a, b)`, then the diophantine equation has a solution, otherwise it does not have any solution.
Assuming `c` is divisible by `g`:
``ax_g\cdot\frac{c}{g}+by_g\cdot\frac{c}{g} = c``
Therefore, **one of the solutions** of the diophantine equation is:
``
\begin{align}
x_0 &= x_g\cdot{c}{g}\\
y_0 &= y_g\cdot{c}{g}
\end{align}
``

```cpp
int gcdExtendedRecursive(int a, int b, int& x, int& y)
{
	if (b == 0)
	{
		x = 1;
		y = 0;
		return a;
	}
	int x1, y1;
	int d = gcd(b, a % b, x1, y1);
	x = y1;
	y = x1 - y1*(a/b);
	return d;
}

bool findAnySolution(int a, int b, int c, int& x0, int& y0, int& g)
{
	g = gcdExtendedRecursive(abs(a), abs(b), x0, y0);
	if (c % g)
		return false;
	x0 *= c / g;
	y0 *= c / g;
	// handle negative inputs
	if (a < 0)
		x0 = -x0;
	if (b < 0)
		y0 = -y0;
	return true;
}

```
#### Getting All Solutions
We now have `x_0, y_0` which satisfy he following:
``ax_0+by_0=c``
We can see that adding `k\cdot \frac{b}{g}` to `x_0` while subtracting `k\cdot\frac{a}{g}` from `y_0` does not break the equality:
``
a\left(x_0+k\frac{b}{g}\right)+b\left(y_0-k\frac{a}{g}\right)
= ax_0+by_0 = c
``
From this, we can find all the solutions of the diophantine equation, which are of the form:
``
\begin{align}
x &= x_0+k\frac{b}{g}\\
y &= y_0-k\frac{a}{g}
\end{align}
``

## Linear Sieve
- Linear Sieve deals with finding all prime numbers in a segment `[2; n]`.
- The standard way of solving this is to use the [[Sieve of Eratosthenes]], but that has runtime `O(n\log\log n)`.
- This algorithm also calculates factorizations of all numbers in the segment `[2; n]` as a side effect that can be helpful.
- The weakness of linear sieve is using more memory. It makes sense to use this algorithm only for numbers up to order `10^7`.
#### Algorithm
Goal is to calculate Minimum Prime Factor `\text{lp}[i]` for every `i` in the segment `[2; n]`. Also store the list of all the found prime numbers in `\text{pr}[]`.
1. Initialize the values of `\text{lp}[i]` with zeros, assuming all numbers are prime.
2. Iterate `i` through numbers `2` to `n`:
	- If `\text{lp}[i] = 0`, `i` is prime, meaning we haven't found any smaller factors for it. Assign `\text{lp}[i] = i` and append `i` to the end of list `\text{pr}[]`.
	- If `\text{lp}[i] \ne 0`, `i` is composite and its minimum prime factor is `\text{lp}[i]`.
3. Update values of `\text{lp}[]` for the indexes divisible by `i`.
	1. Consider the numbers `x_j = i\cdot p_j`, where `p_j` are all prime numbers less than or equal to `\text{lp}[i]`.
	2. Update values of `\text{lp}[x_j] = p_j` for all above `x_j`.

```cpp
pair<vector<int>, vector<int>> linearSieve(int n)
{
	vector<int> lp(n + 1), pr;
	for (int i = 2; i <= n; i++)
	{
		if (lp[i] == 0)
		{
			lp[i] = i;
			pr.push_back(i);
		}
		for (int j = 0; i * pr[j] <= n; j++)
		{
			lp[i * pr[j]] = pr[j];
			if (pr[j] == lp[i])
				break;
		}
	}
	return {lp, pr};
}

```

## Modular Inverse
- A modular multiplicative inverse of an integer `a` is an integer `x` such that `a\cdot x` is congruent to `1` modular some modulus `m`.
``a\cdot x\equiv 1\mod m``
- We can denote `x` simply with `a^{-1}`.
- Modular inverse does not always exist. Modular inverse exists if and only if `a` and `m` are coprime.
### Modular Inverse using [[Euclidean Algorithm#Extended Euclidean Algorithm|Extended Euclidean Algorithm]]
Consider the following equation with unknown `x` and `y`:
``ax+my=1``
This is a [[Linear Diophantine Equation]] in two variables.
Since `a` and `m` are coprime, `\gcd(a, m) = 1` fits the equation in [[Euclidean Algorithm#Extended Euclidean Algorithm|Extended Euclidean Algorithm]].
Taking modulo `m` on both sides, we get rid of the term `my`:
``ax\equiv 1\mod m``
Therefore, the modular inverse of `a` is `x`.

```cpp
int modInverseExtendedEuclidean(int a, int m)
{
	int x, y;
	int g = gcdExtendedEuclidean(a, m, x, y);
	if (g != 1) // No Solution
		return 0;
	return (x % m + m) % m;
}

```
### Modular Inverse using [[Binary Exponentiation]]
This method uses [[Euler's Totient Function#Euler's Theorem|Euler's Theorem]] which states that:
``a^{\phi(m)}\equiv 1\mod m``
if `a` and `m` are coprime.
If `m` is a prime number, this simplifies to [[Fermat's Little Theorem]]:
``a^{m-1}\equiv 1\mod m``
Multiply both sides of Euler's Theorem equivalence by `a^{-1}`:
- For an arbitrary (but coprime) modulus `m`: `a^{\phi(m)-1}\equiv a^{-1}\mod m`
- For a prime modulus `m`: `a^{m-2}\equiv a^{-1}\mod m`
From the above results, we can easily find modular inverse using binary exponentiation which works in `O(\log m)`.
However, in the case when `m` is not a prime number, we need to calculate Euler Phi Function, which involves factorization of `m` (hard). Only if the prime factorization of `m` is known, then the complexity of this method remains `O(\log m)`.
### Modular Inverse using Euclidean Division
Given a prime modulus `m > a` (or apply modulo to make it smaller in 1 step), according to Euclidean Division:
``m=ka+r``
where `k = \left\lfloor\frac{m}{a}\right\rfloor` and `r=m\bmod a`, then
``
\begin{align}
& \implies & 0          & \equiv k \cdot a + r   & \mod m \\
& \iff & r              & \equiv -k \cdot a      & \mod m \\
& \iff & r \cdot a^{-1} & \equiv -k              & \mod m \\
& \iff & a^{-1}         & \equiv -k \cdot r^{-1} & \mod m
\end{align}
``
Note that this does not hold if `m` is not prime, since the existence of `a^{-1}` does not imply the existence of `r^{-1}` in general.

```cpp
int modInversePrime(int a, int m) // if m is prime
{
	return a <= 1 ? a : m - (long long)(m/a) * modInverse(m % a) % m;
}

```
The time complexity of this recursion is not known but it is extremely fast.
Applying this, we can also precompute the modular inverse for every number in the range `[1; m-1]` in `O(m)`

```cpp
vector<int> modInverseRangePrime(int a, int m) // if m is prime
{
	vector<int> inv(n);
	inv[1] = 1;
	for (int i = 2; i < m; i++)
		inv[i] = m - (long long)(m/i) * inv[m % i] % m;
	return inv;
}

```
### Modular Inverse for Array of Numbers
Suppose we have an array of invertible numbers `x_1, x_2\dots x_n`. Instead of computing the inverse for every number, we can expand the fraction by the prefix product (excluding itself) and suffix product (excluding itself), and end up only computing a single inverse instead.
``
\begin{align}
x_i^{-1} = \frac{1}{x_i} &= \frac{\prod\limits_{1}^{i-1}x_j\cdot 1\cdot\prod\limits_{i+1}^{n}x_j}{\prod\limits_{1}^{i-1}x_j\cdot x_i\cdot\prod\limits_{i+1}^{n}x_j}\\
&= \frac{\text{prefix}_{i-1}\cdot\text{suffix}_{i+1}}{\prod\limits_1^nx_j}\\
&= \text{prefix}_{i-1}\cdot\text{suffix}_{i+1}\cdot\left(\prod\limits_1^nx_j\right)^{-1}
\end{align}
``
Therefore, we can just compute the modular inverse for product of all numbers and then multiply it by the prefix product and suffix product excluding the number itself.

```cpp
vector<int> modInverseArray(vector<int> a, int m)
{
	vector<int> inv(a.size());
	if (a.size() == 0)
		return inv;
	long long prod = 1;
	for (int i = 0; i < a.size(); i++)
	{
		inv[i] = prod;
		prod = (prod * a[i]) % m;
	}
	int x, y;
	int g = gcdExtendedEuclidean(prod, m, x, y);
	if (g != 1) // No Solution
	{
		for (int i = 0; i < a.size(); i++)
			inv[i] = -1;
		return inv;
	}
	x = (x % m + m) % m;
	for (int i = a.size() - 1; i >= 0; i--)
	{
		inv[i] = (inv[i] * x) % m;
		x = (x * a[i]) % m;
	}
	return inv;
}

```

## Primality Tests
Primality test algorithms determine if a number `n` is prime or not.
## Trial Division
- A composite number has at least one additional divisor other than `1` and `n` (the number itself), let's call this this divisor `d`.
- This means that `\frac{n}{d}` is also a divisor of `n`.
- Either `d` or `\frac{n}{d}` is `\le \sqrt n`.
- We find a non-trivial divisor by checking if any of the numbers between `2` and `\sqrt n` is a divisor of `n`.
- Time complexity is `O(\sqrt n)`.

```cpp
bool isPrimeTrial(int n)
{
	for (int d = 2; d*d <= n; d++)
	{
		if (n % d == 0)
			return false;
	}
	return x >= 2;
}

```
## Fermat Primality Test
- This is a probabilistic test based on [[Fermat's Little Theorem]].
- We pick an integer `a` such that `2\le a\le p-2`, and check if the equation holds or not. If it doesn't hold, we know that `p` cannot be a prime number. Here, the base `a` will be called a **Fermat Witness** for the compositeness of `p`.
- However, it is possible that the equation holds for a composite number. So if the equation holds, we don't have proof for primality. We only can say that `p` is **probably** a prime. If it turns out that `p` was composite, we call the base `a` a **Fermat Liar**.
- The test will be repeated several times with random choices for `a`, if we find no Fermat Witness, it is very likely that the number is in fact prime.
- There exist some composite numbers `p`, where `a^{p-1}\equiv 1 \pmod p` holds for all `a` coprime to `p`. Such numbers are called **Carmichael Numbers**. The Fermat Primality test can identify these numbers only if we choose a base `a` with `\gcd(a, p) \ne 1`.
- There are very few Carmichael numbers, only 646 exist below `10^9`.

```cpp
bool isPrimeFermat(int n, int iter=10)
{
	if (n < 4)
		return n == 2 || n == 3;
	for (int i = 0; i < iter; i++)
	{
		int a = 2 + rand() % (n - 3); // a in [2, n-2]
		if (binpow(a, n-1, n) != 1)
			return false;
	}
	return true;
}

```
Use [[Binary Exponentiation]] to efficiently compute  `a^{n-1}\bmod n`.
## Miller-Rabin Primality Test
Extends the ideas from Fermat Primality Test. Time complexity is `\le O((\ln n)^2)`.
For an odd number `n`, `n-1` is even, so we factor out all powers of `2`:
``n-1 = 2^s\cdot d``
where `d` is odd.
This allows us to factorize the equation of Fermat's little theorem:
``
\large{
\begin{align}
a^{n-1}&\equiv 1 \bmod n \iff a^{2^sd} - 1\equiv 0 \bmod n\\
&\iff \left(a^{2^{s-1}d}+1\right)\left(a^{2^{s-1}d}-1\right)\equiv 0 \bmod n\\
&\iff \left(a^{2^{s-1}d}+1\right)\left(a^{2^{s-2}d}+1\right)\left(a^{2^{s-2}d}-1\right)\equiv 0 \bmod n\\
&\vdots\\
&\iff \left(a^{2^{s-1}d}+1\right)\left(a^{2^{s-2}d}+1\right)\cdots\left(a^{2^{0}d}+1\right)\left(a^{2^{0}d}-1\right)\equiv 0 \bmod n
\end{align}
}
``
If `n` is prime, then `n` has to divide one of these factors.
For a base `2\le a\le n-2` we check if either:
``\Large a^d\equiv 1\mod n``
holds or
``\Large a^{2^rd}\equiv -1\mod n``
holds for some `0\le r\le s-1`
- If we find a base `a` which doesn't satisfy any of the above equalities, then we find a witness for the compositeness of `n`. Therefore, it will be proven that `n` is not a prime number.
- It is however possible that the set of equations is satisfied for a composite number. In that case, the base `a` is called a strong liar.
  If a base `a` satisfies any one of the equations, `n` is only strong probable prime.
  There are no numbers where all non-trivial bases lie. It is possible to show that at most `\frac{1}{4}` of the bases can be strong liars.
- If `n` is composite, we have a probability of `\ge 75\%` that a random base will tell us that it is composite.
- By doing multiple iterations, choosing different random bases, we can tell with very high probability if the number is truly prime or if it is composite.

```cpp
bool checkComposite(int n, int a, int d, int s)
{
	int x = binpow(a, d, n);
	if (x == 1 || x == n - 1)
		return false;
	for (int i = 1; i < s; i++)
	{
		x = x * x % n;
		if (x == n - 1)
			return false;
	}
	return true;
}

bool isPrimeMillerRabin(int n, int iter=10)
{
	if (n < 4)
		return n == 2 || n == 3;
	int d = n - 1, s = 0; // n-1 = 2^s * d
	while ((d & 1) == 0)
	{
		d >>= 1;
		s++;
	}
	for (int i = 0; i < iter; i++)
	{
		int a = 2 + rand() % (n - 3);
		if (checkComposite(n, a, d, s))
			return false;
	}
	return true;
}

```
>[!tip] Before doing the Miller-Rabin test, we can test additionally if one of the first few prime numbers is a divisor. 88% of all numbers have a prime factor smaller than 100.
### Deterministic Version
Miller-Rabin showed that it is possible to make the algorithm deterministic by only checking all bases, time complexity `\le O((\ln n)^2)`.
Bach later showed that it is only necessary to test all bases `a \le 2(\ln n)^2`.
However, it turns out that for testing a 32-bit integer, it is only necessary to check the first 4 prime bases. And for testing a 64-bit integer, it is enough to check the first 12 prime bases.

```cpp
bool isPrimeDeterministic(int n)
{
	if (n < 2)
		return false;
	int d = n - 1, s = 0;
	while ((d & 1) == 0)
	{
		d >>= 1;
		s++;
	}
	for (int a : {2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37})
	{
		if (n == a)
			return true;
		if (checkComposite(n, a, d, s))
			return false;
	}
	return true;
}

```

## Sieve of Eratosthenes
Sieve of Eratosthenes is an algorithm for finding all the prime numbers in a segment `[1;n]` using `O(n\log\log n)` time complexity.
#### Steps:
1. At the beginning, we write down all numbers between `2` and `n`.
2. Mark `2` as prime. Mark all proper multiples of `2` as composite.
3. Find the next number that hasn't been marked composite and mark it as prime. Then mark all proper multiples of this new prime number as composite.
4. Repeat the step `3` until we have processed all numbers in the row.

```cpp
vector<bool> sieveOfEratosthenes(int n)
{
	vector<bool> is_prime(n + 1, true);
	is_prime[0] = is_prime[1] = false; // 0 and 1 are not prime numbers
	for (int i = 2; (long long)i*i <= n; i++)
	{
		if (is_prime[i])
		{
			for (int j = i*i; j <= n; j += i)
			{
				is_prime[j] = false;
			}
		}
	}
	return is_prime;
}

```
- `long long` is used to ensure `i^2` doesn't overflow the size of `int`.
- Start sifting from `i^2` till `n`, because the numbers below `i^2` would have been already marked by smaller primes.
### Find primes in a range
- Lets say we need to find all prime numbers in a range `[L, R]` of small size (range of the order of `10^7`), where `L, R` may be very large (order of `10^{12}`).
- To solve this, we use the idea of the Segmented Sieve.
- We pre-generate all primes up to `\sqrt R`, and use those to mark all composite numbers in the segment `[L, R]`.

```cpp
vector<bool> segmentedSieve(long long L, long long R)
{
    // generate all primes up to sqrt(R)
    long long lim = sqrt(R);
    vector<bool> mark(lim + 1, false);
    vector<long long> primes;
    for (long long i = 2; i <= lim; i++)
    {
        if (!mark[i])
        {
            primes.emplace_back(i);
            for (long long j = i * i; j <= lim; j += i)
                mark[j] = true;
        }
    }

    // create sieve for segment
    vector<bool> is_prime(R - L + 1, true);
    for (long long prime : primes)
        for (long long j = max(prime*prime, ((L+prime-1)/prime) * prime);
        j <= R; j += prime)
        {
            is_prime[j - L] = false;
        }
    if (L == 1)
        is_prime[0] = false;
    return is_prime;
}

```


## Submask Enumeration
## Enumerating All Submasks of a Given Mask
Given a bitmask `m`, you want to efficiently iterate through all of its submasks, that is, masks `s` in which only bits that were included in mask `m` are set. A submask `s` is any mask that can be formed by clearing some (or none) of the set bits of `m` to `0`.
We can iterate through the submasks using below implementations:

```cpp
for (int s = m; s; s = (s-1)&m)
{
	// code here
}

```
The above loop iterates all submasks of `m` without repetition and in descending order.
Suppose we have a current bitmask `s`, and we want to move on to the next bitmask, by subtracting `1` from the mask `s`, we clear the rightmost set bit and set all bits to the right of it. This gives us the largest number less than `s`. Then we remove all the "extra" `1` bits that are not included in `m` and therefore shouldn't be part of submask by taking bitwise AND to get the next largest bitmask in descending order.
### Iterating Through All Masks with their Submasks
In many problems, we iterate through all bitmasks and for each mask, iterate through all of its submasks:

```cpp
for (int m = 0; m < (1<<n); m++)
{
	for (int s = m; s; s = (s-1)&m)
	{
		// code here
	}
}

```
The inner loop executes a total of `O(3^n)` iterations.
##### Proof:
Note that if mask `m` has `k` set bits, then it will have `2^k` submasks. As we have a total of `\binom{n}{k}` masks with `k` set bits, the total number of combinations for for all `s` and `m` will be:
``\sum\limits_{k=0}^{n}\binom{n}{k}\cdot2^k = (1+2)^n = 3^n``

