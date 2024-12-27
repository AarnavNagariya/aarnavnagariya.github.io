# Table of Contents

1. [Abstract Classes in C++](#abstract-classes-in-c)
2. [Example of Pure Virtual Function](#example-of-pure-virtual-function)
3. [Consequences of Pure Virtual Functions](#consequences-of-pure-virtual-functions)
   - [Abstract Base Classes](#abstract-base-classes)
   - [Cannot Instantiate Abstract Classes](#cannot-instantiate-abstract-classes)
   - [Derived Classes Must Implement Pure Virtual Functions](#derived-classes-must-implement-pure-virtual-functions)
4. [Example 1: Animal Class with Pure Virtual Function](#example-1-animal-class-with-pure-virtual-function)
5. [Interface Classes](#interface-classes)
   - [Example of an Interface Class](#example-of-an-interface-class)
   - [Implementing Interface Classes](#implementing-interface-classes)
6. [Example of Using Interface Classes](#example-of-using-interface-classes)
7. [Example of Multiple Interfaces in C++](#example-of-multiple-interfaces-in-c)
8. [Conclusion](#conclusion)

---

### Abstract Classes in C++

An **abstract class** is a class that contains at least one **pure virtual function**. A pure virtual function is declared by assigning the function definition `= 0` instead of providing a body for it. Abstract classes cannot be instantiated directly, and they are meant to be inherited by derived classes, which must provide implementations for the pure virtual functions.

#### Example of Pure Virtual Function

```cpp
class Base
{
public:
    virtual int getValue() const = 0; // pure virtual function
};
```

In the above example, `getValue()` is a pure virtual function. It has no body, and any derived class must provide an implementation for `getValue()` in order for it to be instantiated.

### Consequences of Pure Virtual Functions

1. **Abstract Base Classes**: Any class containing one or more pure virtual functions becomes an **abstract base class**. This means you cannot create an instance of the class directly.
  
    Example:
    ```cpp
    class Animal
    {
    public:
        virtual const char* speak() const = 0; // pure virtual function
    };
    ```

2. **Cannot Instantiate Abstract Classes**: You cannot instantiate a class that has at least one pure virtual function. The compiler will prevent this by throwing an error.

    Example:
    ```cpp
    Animal animal; // Error: Cannot instantiate abstract class
    ```

3. **Derived Classes Must Implement Pure Virtual Functions**: In order for a derived class to be instantiated, it must provide implementations for all of the pure virtual functions inherited from its base class.

    Example:
    ```cpp
    class Cow : public Animal
    {
    public:
        const char* speak() const override { return "Moo"; }
    };
    ```

### Example 1: Animal Class with Pure Virtual Function

```cpp
class Animal
{
protected:
    std::string m_name;

public:
    Animal(const std::string& name) : m_name{name} {}
    virtual const char* speak() const = 0; // pure virtual function
    const std::string& getName() const { return m_name; }
    virtual ~Animal() = default;
};

class Cow : public Animal
{
public:
    Cow(const std::string& name) : Animal{name} {}
    const char* speak() const override { return "Moo"; }
};

int main()
{
    Cow cow{"Betsy"};
    std::cout << cow.getName() << " says " << cow.speak() << '\n'; // Output: Betsy says Moo
}
```

In this example:
- `Animal` is an abstract class because `speak()` is a pure virtual function.
- `Cow` provides the implementation for `speak()`, allowing it to be instantiated and used.

### Interface Classes

An **interface class** is a special type of abstract class where all functions are pure virtual. Interface classes define only the method signatures, and the derived classes must provide the implementation for those methods.

#### Example of an Interface Class

```cpp
class IErrorLog
{
public:
    virtual bool openLog(const char* filename) = 0;
    virtual bool closeLog() = 0;
    virtual bool writeError(const char* errorMessage) = 0;
    virtual ~IErrorLog() = default;
};
```

In this example:
- `IErrorLog` is an interface class because all its functions are pure virtual.
- Any class inheriting from `IErrorLog` must implement these methods.

#### Implementing Interface Classes

```cpp
class FileErrorLog : public IErrorLog
{
public:
    bool openLog(const char* filename) override { /* implementation */ }
    bool closeLog() override { /* implementation */ }
    bool writeError(const char* errorMessage) override { /* implementation */ }
};

class ScreenErrorLog : public IErrorLog
{
public:
    bool openLog(const char* filename) override { return true; }
    bool closeLog() override { return true; }
    bool writeError(const char* errorMessage) override { std::cout << errorMessage << std::endl; return true; }
};
```

Here, both `FileErrorLog` and `ScreenErrorLog` implement the methods declared in the `IErrorLog` interface. This allows you to pass an instance of either class to functions that expect an `IErrorLog` reference.

### Example of Using Interface Classes

```cpp
#include <cmath> // for sqrt()
double mySqrt(double value, IErrorLog &log)
{
    if (value < 0.0)
    {
        log.writeError("Tried to take square root of value less than 0");
        return 0.0;
    }
    else
    {
        return std::sqrt(value);
    }
}
```

In this example, the function `mySqrt()` can work with any class that implements the `IErrorLog` interface. This makes the code more flexible and allows for different error logging mechanisms (e.g., to a file, screen, or email).

### Example of Multiple Interfaces in C++

```cpp
class IShape
{
public:
    virtual double area() const = 0; // pure virtual function
};

class Circle : public IShape
{
private:
    double radius;
public:
    Circle(double r) : radius(r) {}
    double area() const override { return 3.14159 * radius * radius; }
};

class Rectangle : public IShape
{
private:
    double height, width;
public:
    Rectangle(double h, double w) : height(h), width(w) {}
    double area() const override { return height * width; }
};

int main()
{
    IShape* shapes[2];
    shapes[0] = new Circle(5);
    shapes[1] = new Rectangle(4, 6);

    for (int i = 0; i < 2; i++)
    {
        std::cout << "Area of shape " << i << " is " << shapes[i]->area() << std::endl;
    }

    return 0;
}
```

Here:
- `IShape` is an interface class for shapes, and both `Circle` and `Rectangle` implement the `area()` method.
- The shapes can be treated polymorphically using a pointer to `IShape`, allowing flexibility to add new shape types in the future.

### Conclusion

- **Abstract classes** provide a way to define a base class with abstract functionality (via pure virtual functions) that must be implemented by derived classes.
- **Interface classes** are a special case of abstract classes where every function is pure virtual. They are used to define a contract that derived classes must follow, without specifying any implementation details.
- Using abstract classes and interfaces allows for greater flexibility, modularity, and maintainability in your code by decoupling the definition from the implementation.