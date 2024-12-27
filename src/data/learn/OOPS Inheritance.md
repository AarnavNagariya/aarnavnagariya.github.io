
# Inheritance

Inheritance is a process in which one class acquires all the properties and behaviors of its parent class. In such a way, you can reuse, extend or modify the attributes and behaviors which are defined in other classes.

In C++, the class which inherits the members of another class is called **derived class** and the class whose members are inherited is called **base class**. The derived class is the specialized class for the base class.

```cpp
// Syntax illustrating Inheritance in C++

// Base class
class Parent
{
public:
	int id_p;
};

// Sub class inheriting from Base Class(Parent)
class Child : public Parent // note the use of access specifier here;
{
public:
	int id_c;
};

// main function
int main()
{
	Child ch;
		
	// An object of class child has all data members
	// and member functions of class parent
	ch.id_c = 7;
	ch.id_p = 91;
	cout << "Child id is: " << ch.id_c << '\n';
	cout << "Parent id is: " << ch.id_p << '\n';
		
	return 0;
}
```

**The Access Specifier Table for Inheritance**

The access specifier used while inheriting a class, affects the access specification of member variables inherited from the parent class in the following way:

| Base class member<br>access specifier | Type of Inheritance |       |       |
| :---------------------------------- | :------------------ | :---- | :---- |
|                                     | Public              | Protected | Private |
| **Public**                            | Public              | Protected | Private |
| **Protected**                         | Protected           | Protected | Private |
| **Private**                           | Not accessible<br>(Hidden) | Not accessible<br>(Hidden) | Not accessible<br>(Hidden) |

```cpp
// C++ Implementation to show that a derived class
// doesn’t inherit access to private data members.
// However, it does inherit a full parent object.
class A
{
	public:
	    int x;
	protected:
	    int y;
	private:
	    int z;
};
 
class B : public A
{
    // x is public
    // y is protected
    // z is not accessible from B
};
 
class C : protected A
{
    // x is protected
    // y is protected
    // z is not accessible from C
};
 
class D : private A    // 'private' is default for classes
{
    // x is private
    // y is private
    // z is not accessible from D
};
```

### 💡**How do you call the constructor of base class from the constructor of derived class?**

**Base class constructors are automatically called for you if they have no argument**. If you want to call a superclass constructor with an argument, you must use the subclass's constructor [**initialization list**](https://en.cppreference.com/w/cpp/language/constructor).

```cpp
class SuperClass
{
    public:
				
        SuperClass(int foo)
        {
            // do something with foo
        }
};

class SubClass : public SuperClass
{
    public:

        SubClass(int foo, int bar)
        : SuperClass(foo)    // Call the superclass constructor in the subclass' initialization list.
        {
            // do something with bar
        }
};
```

## Different Types of Inheritance

### Single Inheritance

In single inheritance, a class is allowed to inherit from only one class. i.e. one sub class is inherited by one base class only.

```cpp
// base class
class Vehicle {
  public:
    Vehicle()
    {
      cout << "This is a Vehicle\n";
    }
};
 
// sub class derived from a single base classes
class Car : public Vehicle {
 
};
 
// main function
int main()
{  
    // Creating object of sub class will
    // invoke the constructor of base classes
		// only if they do not have any parameters
    Car obj;
    return 0;
}
```

### output?

```cpp
This is a Vehicle
```

### Multiple Inheritance

**Multiple Inheritance:** Multiple Inheritance is a feature of C++ where a class can inherit from more than one classes. i.e one **sub class** is inherited from more than one **base classes**.

```cpp
// first base class
class Vehicle {
public:
	Vehicle()
	{
	cout << "This is a Vehicle\n";
	}
};

// second base class
class FourWheeler {
public:
	FourWheeler()
	{
	cout << "This is a 4 wheeler Vehicle\n";
	}
};

// sub class derived from two base classes
class Car : public Vehicle, public FourWheeler {

};

// main function
int main()
{
	// Creating object of sub class will
	// invoke the constructor of base classes.
	Car obj;
	return 0;
}
```

### output?

```cpp
This is a Vehicle
This is a 4 wheeler vehicle
```

### Multi-level Inheritance

In this type of inheritance, a derived class is created from another derived class.

```cpp
// base class
class Vehicle
{
public:
	Vehicle()
	{
	cout << "This is a Vehicle\n";
	}
};

// first sub_class derived from class vehicle
class fourWheeler: public Vehicle
{ public:
	fourWheeler()
	{
	cout << "Objects with 4 wheels are vehicles\n";
	}
};
// sub class derived from the derived base class fourWheeler
class Car: public fourWheeler {
public:
	Car()
	{
	cout << "Car has 4 Wheels\n";
	}
};

// main function
int main()
{
	// Creating object of sub class will
	// invoke the constructor of base classes.
	Car obj;
	return 0;
}
```

### output?

```cpp
This is a Vehicle
Objects with 4 wheels are vehicles
Car has 4 Wheels
```

### 💡What is the order of construction of derived classes?

[Look here](https://www.learncpp.com/cpp-tutorial/order-of-construction-of-derived-classes/)

## Problem of Diamond Inheritance: a special case

<div style="text-align:center">
	<img src="../images/projects/diamond_inheritance.jpg" alt="Need of Containership in C" width="50%">
</div>



```cpp
class ClassA {
public:
	int a;
};

class ClassB : public ClassA {
public:
	int b;
};

class ClassC : public ClassA {
public:
	int c;
};

class ClassD : public ClassB, public ClassC {
public:
	int d;
};

int main()
{
	ClassD obj;

	// obj.a = 10;				 // Statement 1, Error
	// obj.a = 100;				 // Statement 2, Error

	// We use the scope resolution here
	obj.ClassB::a = 10; // Statement 3
	obj.ClassC::a = 100; // Statement 4

	obj.b = 20;
	obj.c = 30;
	obj.d = 40;

	cout << " a from ClassB : " << obj.ClassB::a;
	cout << "\n a from ClassC : " << obj.ClassC::a;

	cout << "\n b : " << obj.b;
	cout << "\n c : " << obj.c;
	cout << "\n d : " << obj.d << '\n';
}
```

### output

```cpp
a from ClassB : 10
a from ClassC : 100
b : 20
c : 30
d : 40
```

**Better solution:** **The `virtual` Inheritance**

Virtual base classes are used in virtual inheritance in a way of preventing multiple “instances” of a given class appearing in an inheritance hierarchy when using multiple inheritances.

```cpp
class A {
public:
    int a;
    A() // constructor
    {
        a = 10;
    }
};
  
class B : public virtual A {
};
  
class C : public virtual A {
};
  
class D : public B, public C {
};
  
int main()
{
    D object; // object creation of class d
    cout << "a = " << object.a << endl;
  
    return 0;
}
```

### output?

```cpp
a is 10
```

### 💡**Is multiple inheritance more trouble than it’s worth?**

As it turns out, most of the problems that can be solved using multiple inheritance can be solved using single inheritance as well. Many object-oriented languages (eg. Smalltalk, PHP) do not even support multiple inheritance. Many relatively modern languages such as Java and C# restrict classes to single inheritance of normal classes, but allow multiple inheritance of interface classes (which we will talk about later). The driving idea behind disallowing multiple inheritance in these languages is that it simply makes the language too complex, and ultimately causes more problems than it fixes.

### 💡Can we assign a Base pointer or reference to a Derived object?

Turns out, we can!

```cpp
class Base
{
protected:
    int m_value {};

public:
    Base(int value)
        : m_value{ value }
    {
    }

    std::string_view getName() const { return "Base"; }
    int getValue() const { return m_value; }
};

class Derived: public Base
{
public:
    Derived(int value)
        : Base{ value }
    {
    }

    std::string_view getName() const { return "Derived"; }
    int getValueDoubled() const { return m_value * 2; }
};

int main()
{
    Derived derived{ 5 };
    std::cout << "derived is a " << derived.getName() << " and has value " << derived.getValue() << '\n';

    Derived& rDerived{ derived };
    std::cout << "rDerived is a " << rDerived.getName() << " and has value " << rDerived.getValue() << '\n';

    Derived* pDerived{ &derived };
    std::cout << "pDerived is a " << pDerived->getName() << " and has value " << pDerived->getValue() << '\n';

		// These are both legal!
	  Base& rBase{ derived };
    std::cout << "rBase is a " << rBase.getName() << " and has value " << rBase.getValue() << '\n';
    
		Base* pBase{ &derived };
		std::cout << "pBase is a " << pBase->getName() << " and has value " << pBase->getValue() << '\n';

    return 0;
}
```

### output?

```cpp
derived is a Derived and has value 5
rDerived is a Derived and has value 5
pDerived is a Derived and has value 5
rBase is a Base and has value 5
pBase is a Base and has value 5
```

This result may not be quite what you were expecting at first!

It turns out that because `rBase` and `pBase` are a Base reference and pointer, they can only see members of Base (or any classes that Base inherited). So even though `Derived::getName()` shadows (hides) `Base::getName()` for Derived objects, the Base pointer/reference can not see `Derived::getName()`. Consequently, they call `Base::getName()`, which is why `rBase` and `pBase` report that they are a Base rather than a Derived.

**Note** that this also means it is not possible to call `Derived::getValueDoubled()` using `rBase` or `pBase`. They are unable to see anything in Derived.