# Polymorphism

**In C++ polymorphism is mainly divided into two types:**

- Compile time Polymorphism
- Runtime Polymorphism

## **Compile time polymorphism**

This type of polymorphism is resolved at compilation stage. It is also called static and early binding. Examples are- 

- **Method Overloading**: When there are multiple methods with same name but different parameters then these functions are said to be **overloaded**. Methods can be overloaded by **change in number of arguments** or/and **change in type of arguments**.

```cpp
class Geeks
{
    public:
        
    // function with 1 int parameter
    void func(int x)
    {
        cout << "value of x is " << x << endl;
    }
        
    // function with same name but 1 double parameter
    void func(double x)
    {
        cout << "value of x is " << x << endl;
    }
        
    // function with same name and 2 int parameters
    void func(int x, int y)
    {
        cout << "value of x and y is " << x << ", " << y << endl;
    }
};
    
int main() {
        
    Geeks obj1;
        
    // Which function is called will depend on the parameters passed
    // The first 'func' is called 
    obj1.func(7);
        
    // The second 'func' is called
    obj1.func(9.132);
        
    // The third 'func' is called
    obj1.func(85,64);
    return 0;
}
```

### ouput?

```jsx
value of x is 7
value of x is 9.132
value of x and y is 85, 64
```

Another example of method overloading is when the **derived class methods have same name as the base class methods**. 

```cpp
class base
{
public:
    void print ()
    { cout<< "print base class" <<endl; }
    
    void show ()
    { cout<< "show base class" <<endl; }
};
    
class derived:public base
{
public:
    void print ()
    { cout<< "print derived class" <<endl; }
    
    void show ()
    { cout<< "show derived class" <<endl; }
};
    
//main function
int main() 
{
    base b;
    derived d;
            
    b.print(); 
    d.print(); 
    
    return 0;
}
```

### output?

```cpp
print base class
print derived class
```

In both the above examples, the compiler decides the linking of appropriate method (since multiple methods with same name are available) at compile time. So, this is called **Compile time Polymorphism.**

- **Operator Overloading**: (Will be discussed later)

### Runtime Polymorphism

This kind of polymorphism is resolved at runtime. Its also called Dynamic binding or Late binding.

The `virtual` keyword forces the linking of methods to happen during run-time instead of compile time.

- **Method Overriding**

```cpp
class base
{
public:
        // virtual keyword makes the print() function a virtual function
    virtual void print ()
    { cout<< "print base class" <<endl; }
    
    void show ()
    { cout<< "show base class" <<endl; }
};
    
class derived:public base
{
public:
    void print () //print () is a virtual function in base class. Thus this overriding is runtime. 
    { cout<< "print derived class" <<endl; }
    
    void show ()
    { cout<< "show derived class" <<endl; }
};
    
//main function
int main() 
{
        base b;
    derived d;
        // no ambiguity, base class object calls base class methods
        b.print();
        b.show();

        
        
        base *bptr;
        bptr = &d;
        // BE CAUTIOS NOW, we assigned derived object address to base pointer

    //virtual function, binded at runtime (Runtime polymorphism)
    bptr->print(); 
        
    // Non-virtual function, binded at compile time
    bptr->show(); 
    
    return 0;
}
```

### ouptut?

```jsx
print base class
show base class
print derived class
show base class
```

When the virtual keyword is used, the **compiler does not decide** the appropriate method/function to be linked. It lets the run-time decide this based on the type of object which invokes the method. Thus, it is called **Run-time Polymorphism**

**Note:** the words **Overriding** and **Overloading** are associated with **Compile time** and **Run time** **polymorphism** respectively.

Using the above example, what is the output of the code when `sound()` is defined as a virtual function in `Animal` ?

### What is the output of this code?

```cpp
class Animal{
    public:

        virtual string sound(){
            return "I am animal, I dont know what to speak";
        }

};

class Cow : public Animal{
    public:
        string sound(){
            return "Moo";
        }
};

class Tiger : public Animal{
    public:
        string sound(){
            return "Roar";
        }
};

void speak(Animal* anyAnimal){

        cout << anyAnimal->sound() << endl;
}

int main(){
    Tiger tigerObject = Tiger();
    Cow cowObject = Cow();
    Animal animalObject = Animal();
    
    speak(&cowObject);
    speak(&tigerObject);
        speak(&animalObject);

    return 0;
}
```

### output?

```cpp
Moo
Roar
I am animal, I dont know what to speak
```

```python
class Animal{
    public:

        virtual string sound(){
            return "I am animal, I dont know what to speak";
        }
            int get(){
                    return 1
            }

};

class Cow : public Animal{
    public:
        string sound(){
            return "Moo";
        }
        int get(){
                    return 2
            }
};

class Tiger : public Animal{
    public:
        string sound(){
            return "Roar";
        }
        int get(){
                    return 3
            }
};

void speak(Animal* anyAnimal){

        cout << anyAnimal->sound() << endl;
        cout << anyAnimal->get() << endl;
}

int main(){
    Tiger tigerObject = Tiger();
    Cow cowObject = Cow();
    Animal animalObject = Animal();
    
    speak(&cowObject);
    speak(&tigerObject);
        speak(&animalObject);

    return 0;
}
```

### 💡What would be the output if the sound method of Animal class was not virtual?

Comment here!

### 💡Why would someone ever assign a base pointer to the address of a derived object in their sane mind? Are virtual functions useless and just used to make lives difficult?

The virtual keyword in C++ is used to enable runtime polymorphism or late binding. It allows the program to determine at runtime which implementation of a function to use, based on the actual type of the object that the function is called on. This is useful in situations where you have a hierarchy of classes that share a common interface, but have different implementations of the same function.

A real-world example of this could be a game engine that has different types of game objects, such as enemies, obstacles, and power-ups. Each of these objects shares a common interface, but they have different behavior when it comes to things like movement, collision detection, and rendering. By using virtual functions, we can define a base class for all game objects and then have different implementations of the same functions in each subclass.

Here's an example of how virtual functions might be used in a game engine:

```cpp
class GameObject {
public:
    virtual void update(){
                // some default update
        }
    virtual void render(){
                // some default update
        }
};

class Enemy : public GameObject {
public:
    void update() override {
        // Update enemy position and behavior
    }

    void render() override {
        // Render enemy sprite
    }
};

class Obstacle : public GameObject {
public:
    void update() override {
        // Obstacle doesn't move, so no update necessary
    }

    void render() override {
        // Render obstacle sprite
    }
};

class PowerUp : public GameObject {
public:
    void update() override {
        // Update power-up behavior (e.g. flashing)
    }

    void render() override {
        // Render power-up sprite
    }
};
```

In this example, we have a base class **`GameObject`** that defines two virtual functions: **`update()`** and **`render()`**. The **`Enemy`**, **`Obstacle`**, and **`PowerUp`** classes inherit from **`GameObject`** and provide their own implementations of these functions.

At runtime, we might have a collection of game objects that includes instances of all three classes. In the perpetually running game loop, we can iterate over this collection and call the **`update()`** and **`render()`** functions on each object. Because these functions are virtual, the program will automatically use the correct implementation based on the actual type of each object.

```cpp

std::vector<GameObject*> gameObjects;

gameObjects.push_back(new Enemy());
gameObjects.push_back(new Obstacle());
gameObjects.push_back(new PowerUp());

// INSIDE THE GAME LOOP
for (GameObject* gameObject : gameObjects) {
    gameObject->update();
    gameObject->render();
}
```

In this example, the **`update()`** and **`render()`** functions will be called on each object in the collection, and the correct implementation will be used for each object based on its actual type. **This allows us to write code that works with a variety of different game objects without needing to know the details of each object's implementation.**

### Wait! We just used the same `virtual` keyword for inheritance(diamond problem) and polymorphism(for runtime polymorphism) both. What is this mess?

**Virtual inheritance** and **virtual functions** are two different concepts in C++ that serve different purposes. Don’t get confused between them.

**Virtual inheritance is used to avoid the diamond problem** that arises in multiple inheritance. The diamond problem occurs when a class is derived from two or more classes that have a common base class. In this case, the common base class is inherited more than once, which can cause ambiguity and conflicts in the derived class. Virtual inheritance solves this problem by ensuring that there is only one instance of the common base class in the derived class hierarchy.

On the other hand, **virtual functions are used to achieve runtime polymorphism in C++**. A virtual function is a function that can be overridden in a derived class, and the function call is resolved at runtime based on the actual type of the object. Virtual functions are declared using the "virtual" keyword in the base class, and they are overridden in the derived class using the same keyword.

So, in summary, virtual inheritance is used to avoid the diamond problem in multiple inheritance, while virtual functions are used to achieve runtime polymorphism in C++.
