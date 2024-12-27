# Table of Contents

- [Introduction to Classes](#class)
  - [Member Methods](#member-methods)
  - [Constructor](#constructor)
  - [Access Specifier](#access-specifier)
  - [Getter and Setter Methods](#getter-and-setter-methods)
---


# Class

A class is a blueprint of a customized data type containing different primitive data types along with functionalities operating on them.

```cpp
// Create a Car class with some attributes
class Car {
  public: // access specifier
    string brand; // data member
    string model;
    int year;
        
    int get_car_age() { // member method
        return 2022 - year;
    }

  private: // access specifier
    string designer;        
};

int main() {
  // Instantiate an object of Car
  Car carObj1;

  carObj1.brand = "BMW";
  carObj1.model = "X5";
  carObj1.year = 1999;

  // Instantiate another object of Car
  Car carObj2;

  carObj2.brand = "Ford";
  carObj2.model = "Mustang";
  carObj2.year = 1969;

  // Print attribute values
  cout << carObj1.brand << " " << carObj1.model << " " << carObj1.year << "\n";
  cout << carObj2.brand << " " << carObj2.model << " " << carObj2.year << "\n";

  // Call a method
  cout << carObj1.get_car_age() << endl;

  return 0;
}
```

## Member Methods

Methods are **functions** that belong to the class.

There are two ways to define functions that belong to a class:

- **Inside class definition**

    ```cpp
    class MyClass {        // The class
      public:              // Access specifier
        void myMethod() {  // Method/function defined inside the class
          cout << "Hello World!";
        }
    };

    int main() {
      MyClass myObj;     // Create an object of MyClass
      myObj.myMethod();  // Call the method
      return 0;
    }
    ```

- **Outside class definition**

    To define a function outside the class definition, you have to declare it inside the class and then define it outside of the class. This is done by specifying the name of the class, followed by the **scope resolution** `::` operator, followed by the name of the function:

    ```cpp
    class MyClass {        // The class
      public:              // Access specifier
        void myMethod();   // Method/function declaration
    };

    // Method/function definition outside the class
    void MyClass::myMethod() {
      cout << "Hello World!";
    }

    int main() {
      MyClass myObj;     // Create an object of MyClass
      myObj.myMethod();  // Call the method
      return 0;
    }
    ```

## Constructor

A constructor in C++ is a **special method** that is automatically called when an object of a class is created. To create a constructor, define a method with **the same name as the class.**

```cpp
class Car {        // The class
  public:          // Access specifier
    string brand;  // Attribute
    string model;  // Attribute
    int year;      // Attribute

    Car(string x, string y, int z) { // Constructor with parameters
      brand = x;
      model = y;
      year = z;
    }
};

int main() {
  // Create Car objects and call the constructor with different values
  Car carObj1("BMW", "X5", 1999);
  Car carObj2("Ford", "Mustang", 1969);

  // Print values
  cout << carObj1.brand << " " << carObj1.model << " " << carObj1.year << "\n";
  cout << carObj2.brand << " " << carObj2.model << " " << carObj2.year << "\n";
  return 0;
}
```

There are **three** types of constructor:

1. **Default constructor** is the constructor which doesn’t take any argument. It has no parameters. It is automatically declared whenever a Class is defined. However, it can be overridden by manually declaring it.

    ```cpp
    class Car {        // The class
      public:          // Access specifier
        string brand;  // Attribute
        string model;  // Attribute
        int year;      // Attribute

        Car() { cout << "New Car Created"; } // default constructor
    };

    int main() {
        Car myCar;
        return 0;
    }
    ```

2. **Parameterized Constructor** takes arguments to initialize an object when it is created. To create a parameterized constructor, simply add parameters to it the way you would to any other function. When you define the constructor’s body, use the parameters to initialize the object.

    ```cpp
    class Car {        // The class
      public:          // Access specifier
        string brand;  // Attribute
        string model;  // Attribute
        int year;      // Attribute

        Car(string x, string y, int z) { // Constructor with parameters
          brand = x;
          model = y;
          year = z;
        }
    };

    int main() {
        Car carObj1("BMW", "X5", 1999);
        return 0;
    }
    ```

    For parameterized constructors, the object can be declared both **explicitly** and **implicitly**:

    ```cpp
    Car c = Car("BMW", "X5", 1999); // Explicit call
    // OR
    Car c("BMW", "X5", 1999);       // Implicit call
    ```

3. **Copy Constructor** is a member function which initializes an object using another object of the same class.

    ```cpp
    class Point {
    private:
        int x, y;
    public:
        // Parameterized constructor
        Point(int x1, int y1) { x = x1; y = y1; }

        // Copy constructor
        Point(const Point &p1) { x = p1.x; y = p1.y; }

        int getX() { return x; }
        int getY() { return y; }
    };

    int main() {
        Point p1(10, 15); // Normal constructor is called here
        Point p2(p1);     // Copy constructor is called here

        // Access values assigned by constructors
        cout << "p1.x = " << p1.getX() << ", p1.y = " << p1.getY() << endl;
        cout << "p2.x = " << p2.getX() << ", p2.y = " << p2.getY() << endl;

        return 0;
    }
    ```

## Access Specifier

In C++, there are three access specifiers:

- `public` - members are accessible from outside the class.
- `private` - members cannot be accessed (or viewed) from outside the class **(other than friend functions).**
- `protected` - members cannot be accessed from outside the class, however, they can be accessed in inherited classes. You will learn more about [Inheritance](https://www.w3schools.com/cpp/cpp_inheritance.asp) later.

### Examples

1. **Private**

    ```cpp
    class Circle {  
        // private data member
    private:
        double radius;

        // public member function   
    public:   
        double compute_area() {
            // Member function can access private
            // data member radius
            return 3.14 * radius * radius;
        }
    };

    // main function
    int main() {
        // Creating object of the class
        Circle obj;

        // Trying to access private data member
        // directly outside the class
        obj.radius = 1.5;

        cout << "Area is: " << obj.compute_area();
        return 0;
    }
    ```

    **Output:**

    ```cpp
    In function 'int main()':
    11:16: error: 'double Circle::radius' is private
             double radius;
                    ^
    31:9: error: within this context
         obj.radius = 1.5;
             ^
    ```

2. **Protected**

    ```cpp
    // Base class
    class Parent {  
        // Protected data members
    protected:
        int id_protected;
    };

    // Subclass or derived class from public base class
    class Child : public Parent {
    public:
        void setId(int id) {
            // Child class is able to access the inherited
            // protected data members of base class
            id_protected = id;
        }

        void displayId() {
            cout << "id_protected is: " << id_protected << endl;
        }
    };

    // main function
    int main() {
        Child obj1;

        // Member function of the derived class can
        // access the protected data members of the base class
        obj1.setId(81);
        obj1.displayId();

        return 0;
    }
    ```

    **Output:**

    ```cpp
    id_protected is: 81
    ```

### Getter and Setter Methods

We use getter and setter methods to access private variables outside the class. This is done to realize encapsulation.

```cpp
class Circle {  
    // Private data member
private:
    double radius;

    // Public member function   
public:   
    double get_radius() { // Getter method
        // Member function can access private
        // data member radius
        return radius;
    }

    void set_radius(double arg_radius) { // Setter method
        radius = arg_radius;
    }
};

// main function
int main() {
    // Creating object of the class
    Circle obj;

    // Trying to access private data member
    // directly outside the class
    obj.set_radius(1.5);
    cout << "Radius is: " << obj.get_radius() << endl;
    return 0;
}
```

**Output:**

```cpp
Radius is: 1.5
```

