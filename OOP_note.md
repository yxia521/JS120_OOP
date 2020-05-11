##lesson 1

Structure: 

- OOP (includes encapsulations) --->
- Collaborator objects (which is collaborator?) --->
- Factory Functions  (1st way to automate object creation) --->

---

- OOP: a **style** of programming that uses **objects** to organize a program (a programming paradigm)

  - Advantages
    - It lets programmers think about a problem at a higher-level of abstraction, which helps them break down and solve the problem
    - OOP helps programmer write programs that reduce the dependencies in a program, which makes maintenance easier
    - Done right, OOP makes code flexible, easy to understand, and easy to change

  - Disadvantages:
    - OOP programs are often much larger than the equivalent procedural program
    - OOP may lead to less efficient code; OOP programs may require more memories, disk space and computer power.

- **Encapsulation**: 

  - the idea of **bundling data and operations** associated with that data in **a single entity**; 
  - (that is, it's the grouping of related properties and methods in a single object.)

- How does JS encapsulation differ from encapsulation in most other OO languages?
  - In other languages, encapsulation concerns hiding details of an object from code that uses the obejct. An object should *only* expose the methods and properties that other objects need to use the encapsulated object.
  - However, JS doen't directly provide the means to limit exposure of methods and properties. There are ways to achieve a degree of access restriction, but they're not perfect.

- **methods**

  - **object properties** have *function values*

- `this`
  
  - Suppose you change the variable name, calling a method with the original variable name will throw a reference error.
  
  - when you use `this` inside a method, it refers to the object that contains the method
  
- **Objects** that are used to store state **within** another object are called **collaborator objects** or, **collaborators**. 

  - Collaborators `cat` work in collaboration with the object `pete` to which they belong.
  - They can be objects, primitives -- like strings, numbers
  
  ```javascript
  let cat = {   // cat is collaborator
    name: 'Fluffy',
  
    makeNoise() {  // this is a method
      console.log('Meow! Meow!');
    },
  
    eat() {
      // implementation
    },
  };
  
  let pete = {
    name: 'Pete',
    pet: cat,     // cat is collaborator
  
    printName() {
      console.log(`My name is ${this.name}!`);
    },
  };
  ```
  
  `pete` object has a collaborator object `cat` stored in its `pet` property.
  
  When we need to access that `pet`, we can use `pete.pet` to reference the desired state or behavior: use `pete.pet` to call the `makeNoise` method, etc...

####1st way to automate object creation:

- **Functions as object factories**

  - When you need to create thousands of similar objects
  - One way to automate object creation is to use **object factories: functions that create and return objects of a particular type**

  ```javascript
  function createCar(make, fuelLevel, engineOn) {
    // To be implemented by you.
  }
  
  let raceCar1 = createCar('BMW', 0.5, false);
  raceCar1.drive();
  
  let raceCar2 = createCar('Ferrari', 0.7, true);
  raceCar2.drive();
  ```

  `createCar` function handles the similarities, while each invocation specifies the differences with arguments.

- RPS

  - The classical approach to planning an OO application:
    - write a textual description of the problem
    - extract the significant nouns and verbs from the description
    - Organize and associate the verbs with the nouns

  - Then, once we've organized our nouns and verbs into objects, we need an engine to orchestrate the objects. The engine is where the procedural program flow should be. e.g.:

    ```javascript
    const RPSGame = {
      play() {
        displayWelcomeMessage();
        humanChooseMove();
        computerChooseMove();
        displayWinner();
        displayGoodbyeMessage();
      },
    };
    ```

- Within method, when property and value have the same name, we can use a shorthand notation.

  ```javascript
  function createBook(title, author) {
    return {
      title,    // same as `title: title,`
      author,
      getDescription() {
        return `${this.title} was written by ${this.author}.`;
      },
    };
  }
  ```

##lesson 2

Structure:

- Function Expressions, declarations --->

- Higher Order Functions --->

- The Global Object --->

- The value of `this` -- current execution context of a function/method

  - Implicit ( Function Execution Context ): global object

  - Explicit ( Method Execution Context ) with `call` `apply`: the object used to call the method

- Hard **permanently** Binding to Change Contexts: `bind` --->

- Different scenarios of Context Loss (memorize)

---

- functions invoked before **function declarations**:

  - function declarations always *require* a name, so they can never be anonymous

  - JS engine runs the code in two passes.
    - 1st pass: **hoisting**
    - 2nd pass: execute the code

- **function expressions**:

  ```javascript
  (function foo() {
  
  });
  ```

  - You can test whether a function definition is a function declaration by trying to call it before the declaration. You can't call a function expression until after the expression is evaluated

  - Typically, we assign a function expression to a variable or object property, or return it to a function calling:

  ```javascript
  let prompt = function() {   // assign function expression to a variable
    
  };
  
  [1, 2, 3].forEach(function(elem) {  // pass to another function
    console.log(elem);
  });
  
  function makeIncrementer(increment) {
    return function(value) {   // return it to caller
      return value + increment; 
    }
  }
  ```

  :speaker: We can define function expressions without giving them a name => such unnamed functions: **anonymous functions**. (Not a necessity)

  - `prompt` is NOT the function name, we assign an *unnamed* function to the `prompt` variable.

- Arrow functions: no declaration syntax for them.
  - *arrow functions are always function expressions*
  - arrow functions are always anonymous
  - Arrow functions are either immediately invoked, assigned to variables or properties, or passed around as arguments and return values. 

- First Class Functions

  - Functions of *all kinds*, can be treated as values:

  ```javascript
  function say(words) {
    console.log(words);
  }
  let speak = say;
  speak('Howdy!'); // logs 'Howdy'
  ```

  :speaker: We **declare** a function `say` and **assign** it to the variable `speak`. We then **invoke** the function using `speak` **as a handle**.

  Note that we can still call the function using `say` as well -- both `say` and `speak` refer to the same function.

  - Example 2:

  ```javascript
  function logNum(num) {
    console.log('Number:' + num);
  }
  [1, 2, 3].forEach(logNum);
  // Number: 1
  // Number: 2
  // Number: 3
  ```

  We're passing the function `logNum` as an argument to the `forEach` method, which calls it three times.

  With each invocation of `logNum`, `forEach` passes it one of the array elements as an argument.

  :speaker: We don't use invocation syntax `()`, when passing `logNum` as an argument to `forEach`. If we did, it would throw a `TypeError` since `forEach` expects a function (callback function); instead of passing a function, though, we would be passing `undefined`, the return value of `logNum()`

  The code is functionally identical to:

  ```javascript
  [1, 2, 3].forEach(function logNum(num) { // we are using a function expression
    console.log('Number:' + num);
  });
  ```

-  All functions have a type of `"function"`, which is a kind of object with properties and methods.

- Higher Order Function, has at least one of the following properties:
  - It takes a function as an argument - for example, `map`, is a higher-order function since it takes another function as an argument
  - It returns a function

- The global object: avaiable everywhere in your program

  - JS creates a global object when it starts running

  - In Node.js, the global object is the object named `global`

  - in the browser, it's the `window` object

  - whenever you assign a value to a variable without using the `let`, `const`, or `var` keywords, the variable gets added to the global object as a property:

    ```javascript
    foo = 'bar';
    global.foo; // => 'bar' (in Node)
    window.foo; // => 'bar' (in a browser)
    ```

    You can even access such variables `foo` without using the `global` object as the caller:

    ```javascript
    foo; // => 'bar' (without global, identical to global.foo)
    ```

  - You need to know JS gets all those global entities like `NaN`, `Infinity`, `setTimeout` from its global object. It's not often that you'll need to modify it, but you'll sometimes use it to set properties in Node.

- **Implicit and Explicit Execution Context**

  - **Execution context**, or **context** -- is a concept that refers to the **environment** in which a function executes. In JS, it most commonly refers to the current value of `this`

  - Execution context: the value of `this` when that code executes.

    :speaker:**The context depends on how the function or method was invoked.**

  - 2 ways to set the context when calling a function or method:

    1) **Explicit**: the execution context that you set explicitly

    2) **Implicit**: the execution context that JS sets implicitly when your code doesn't provide an explicit context.

  - Setting the execution context is called **binding `this`** or **setting the binding**.
    - A binding is sth that ties two things together
    - it refers to: a call binds `this` to a specific object when the function or method is called.

  - Implicit:

    ```javascript
    function foo() {
      console.log("this refers to: " + this);
    }
    
    foo();
    // this refers to: [object global]
    ```

    JS sets the binding for `this` to the global object. or say, JS binds `this` to the global object.

  - Explicit: **method execution context**  (It's not entirely clear whether this is implicit or explicit context, but, for our purposes, we can call it explicit context since we're calling the method on a specific object.)

    ```javascript
    let foo = {
      bar: function() {
        console.log(this);
      }
    };
    foo.bar(); // { bar: [Function: bar] }
    ```

    - The execution context inside a method call is the object used to call the method: the `foo` object

    :exclamation:However, here, `foo.bar()` is considered a method call since we *call it as a method*; we use the method call syntax `object.method()`.

    `bar` can be called in other ways that change the context:

    ```javascript
    let baz = foo.bar;
    baz(); // Object [global] {...}
    ```

    We assign the `foo.bar` method to the `baz` variable. `foo.bar` property and `baz` variable now refer to the same function object.

    Again, the execution context is determined entirely by how a function or a method is called. Since we are calling `baz` as a standalone function, its execution context is the global object, NOT the `foo` object.

  - Explicit Function and Method Execution Context

    - Summary: 
      - when you invoke a function with parentheses, JS uses the global objects as *implicit context*;
      - when you invoke a method, it uses the object that you used to call the method as *explicit context*.

    - However, you can provide an explicit context to any function or method using `call` & `apply`

  - Explicit Execution Context with `call`

    ```javascript
    let obj1 = {
      logNum() {
        console.log(this.num);
      }
    };
    
    let obj2 = {
      num: 42
    };
    
    obj1.logNum.call(obj2); // 42 (Meanwhile, invoke the function, so sth logs out)
    ```

  - Explicit Execution Context with `apply`

    - works in the same way, only difference: `apply` uses an array to pass any arguments to the function.

    ```javascript
    someObject.someMethod.apply(context, [arg1, arg2, ...]);
    ```

  - **Hard (permanently)** Binding Function with Contexts: besides `call` & `apply` , we can use a 3rd way to specify the execution context -- **`bind`**

    - `bind`'s context is the original function, and it **returns a new function** that calls the original function with the context supplied to bind as its first argument.
    - The new function is **permanently** bound to the object passed as `bind`'s first argument.

    ```javascript
    function sumNum(num1) {
      return this.num + num1;
    }
    
    let obj = {
      num: 42
    };
    
    let sumNum2 = sumNum.bind(obj); // Unlike call, bind doesn't invoke function
    sumNum2(5); // => 47
    ```

    :speaker: A trap: `bind` does NOT permanently alter the original function. Remember that `bind` returns a new function, and that new function is permanently context-bound to the object provided as the first argument to `bind`. *The original function isn't changed and doesn't have its context changed.*

    We can check this by taking a look at what `sumNum2` is:

    ```javascript
    > sumNum;   // original function never change
    [Function: sumNum]
    > sumNum2;	// new function context-bound to the obj
    [Function: bound sumNum]
    ```

    - It's also important to understand that `bind` does not contradict our repeated statement that context is determined entirely based on how you call a function or method, not where you call it or how you define it. Technically, `bind` defines a new function. However, when we call that function, its implementation calls the original function using `apply`. Thus, it's still the "how" of the call that determines the context, not the definition or location.

    Example:

    ```javascript
    let greetings = {
      morning: 'Good morning, ',
      afternoon: 'Good afternoon, ',
      evening: 'Good evening, ',
    
      greeting: function(name) {
        let currentHour = (new Date()).getHours();
    
        if (currentHour < 12) {
          console.log(this.morning + name);
        } else if (currentHour < 18) {
          console.log(this.afternoon + name);
        } else {
          console.log(this.evening + name);
        }
      }
    };
    
    let spanishWords = {
      morning: 'Buenos dias, ',
      afternoon: 'Buenas tardes, ',
      evening: 'Buena noches, '
    };
    
    let spanishGreeter = greetings.greeting.bind(spanishWords);
    
    spanishGreeter('Jose');
    spanishGreeter('Juan');
    ```

    We bind the `greeting` function to the `spanishWords` object and assign the result to `spanishGreeter` variable. When we call `spanishGreeter`, JS uses `spanishWords` as the context. Thus, last line will log sth like `'Buenos trades, Juan'`.

- Practice: what will this code log?

  ```javascript
  let obj = {
    message = 'JavaScript',
  };
  
  function foo() {
    console.log(this.message);
  }
  
  foo.bind(obj);
  ```

  Nothing. Unlike `call` and `apply`, `bind` doesn't invoke the function used to call it. 

  If you wan to see the results, can refactor like this:

  ```javascript
  let foo2 = foo.bind(obj);
  foo2(); // logs 'JavaScript' (returns the value of `console.log(this.message);`)
  ```

  If use `call` to change the context to `obj`

  ```javascript
  foo.call(obj); // logs 'JavaScript' (cuz call invoke the function)
  ```

  :speaker: Notice that here we use `foo` instead of `foo()`:

  	- `foo` is the function
  	- `foo()` is the return value of `console.log(this.message);`, which is `undefined`, so it will raise a type error: `TypeError: Cannot read property 'call' of undefined`

  Example 2:

  ```javascript
  let obj = {
    a: 2,
    b: 3,
  };
  
  function foo() {
    return this.a + this.b;
  }
  
  let bar = foo.bind(obj);
  
  console.log(foo()); // NaN
  console.log(bar()); // 5
  ```

  - `this.a` , `this.b` returns `undefined` (not string `'undefined'`), so `undefined` + `undefined` is `NaN`
  - Why do we use `foo()` within `console.log`, so far like what I always write inside a function, I `return` something, (instead of `console.log` like the previous example). We want to log the return value of the function, use `foo()`
  - `console.log(foo)` will log  `[Function: foo]` cuz you just need to see the function `foo`

- Dealing with 'Context Loss'

  - Funtions don't lose their execution context in reality, but may not be the context that you expect.

##lesson 3

Structure:

- Object prototypes
- Because of disadvantage of factory functions, **2nd way** to create object with **prototypes** -- **OLOO**
- Further, we can do better: constructors with `prototype` property -- `Dog.prototype`
  - Static & instance members

- Sub-typing with Constructors & Prototypes
- Built-in Constructors
- Classes
- Mix-ins
- Polymorphism
  - Inheritance & duck-typing are 2 main forms

---

- Review: Object factories = factory functions = factory object creation pattern
  
  - advantage: a simple way to create related objects based on a predefined template
  - Disadvantage: 
    - Memory efficiency: Every object created with a factory function has **a full copy of all the methods**, which places a heavy **load on system memory**
  - Inability to classify newly created objects: There's no way to learn **whether we create an object with a factory function**. At best, you can see some specific characteristics of an object, but you can't identify the "type" of the object, don't know if you use the right kind of object.
  
- **Object Prototypes**

  1) Factory function as one way to automate object creation 

  - An object factory serves two purposes:
    - it returns objects that represent data of a specific type.
    - it reuses code.

  2) Another way to extract code into one place, to automate object creation is prototypes

  - **Prototypes:** (object)
    - **prototypal inheritance**: the idea that an inheriting object can inherit properties and methods from its prototype.
    - `Object.create` creates a new object that inherits properties from an existing object.

  ```javascript
  let a = {
    foo: 1,
    bar: 2,
  };
  
  let b = Object.create(a);
  b.foo; // => 1
  ```

  - `a`: the prototype object; `b`: the inheriting object
  - `Object.create` takes an object -- prototype object -- as an argument, returns a new object. We assign this object to `b` variable.
  - The newly created object has access to **all** the properties and methods that prototype provides.
  - :speaker: `b` doesn't receive any properties or methods of its own. **`b` *delegates* property and method access to its prototype `a`. **
  - `b` is an emtpy object:

  ```javascript
  > let a = { foo: 1, bar: 2 }
  undefined
  
  > let b = Object.create(a)
  undefined
  
  > b.foo
  1
  
  > b // an empty object, b doesn't have any properties of its own
  {}
  
  console.log(a.hasOwnProperty('foo')); // => true
  console.log(b.hasOwnProperty('foo')); // => false
  ```

  - What really inside `b` is a **hidden internal** property -- `[[prototype]]`.

  - How to access a prototype?

    - You can't access this internal property directly in your code like a normal property: ❌

    ```javascript
    b.[[prototype]];      // incorrect
    b["[[prototype]]"];   // incorrect
    ```

    - you can: ✔️

    ```javascript
    > Object.getPrototypeOf(b);
    { foo: 1, bar: 2 }
    ```

  - :exclamation: **Objects hold a *reference* to their prototype objects through their internal property `[[prototype]]`. If the object's prototype changes, the changes are observable in the inheriting object as well.**

  ```javascript
  let a = {
    foo: 1,
    bar: 2,
  };
  
  let b = {};
  Object.setPrototypeOf(b, a);  // these two lines is the same as Object.create(a)
  console.log(b.foo); // => 1
  
  a.foo = 42;
  console.log(b.foo); // => 42
  
  a.baz = 12;
  console.log(b.baz); // => 12
  ```

  - The Default Prototype
    - `Object.prototype` -- the prototype object of `Object` constructor
  - The Prototype Chain

  ```javascript
  let a = {
    foo: 1,
  };
  
  let b = {
    bar: 2,
  };
  
  let c = {
    baz: 3,
  };
  
  Object.setPrototypeOf(c, b);
  Object.setPrototypeOf(b, a);
  
  console.log(c.bar); // => 2
  console.log(c.foo); // => 1
  ```

  `b` is the prototype of `c`, `a` is the prototype of `b`; (you can't say )

  All properties that you can access on `a` or `b` are now available on `c`

  Objects `b` and `a` are **part of** the **prototype chain** of object `c`;

  The complete prototype chain also includes the default prototype, which is the prototype of object `a` in this case -- `Object.prototype`, since the prototype of `Object.prototype` is `null`, the complete prototype chain looks like:

  ```javascript
  c ---> b ---> a ---> Object.prototype ---> null
  ```

  - Property Look-Up in the Prototype Chain

    - When you access a property on an object, JS first looks for an "own" property with that name on the object. If the object does not define the specified property, JavaScript looks for it in the object's prototype. If it can't find the property there, it next looks in the prototype's prototype. This process continues until it finds the property or it reaches `Object.prototype`. If `Object.prototype` also doesn't define the property, the property access evaluates to `undefined`.

    ```javascript
    let a = {
      foo: 1,
    };
    
    let b = {
      foo: 2,
    };
    
    Object.setPrototypeOf(b, a);
    let c = Object.create(b);  // c ---> b ---> a
    
    console.log(c.foo); // => 2;
    ```

    If we set `foo` on `c` to a different value:

    ```javascript
    c.foo = 42;
    ```

    Object `b` wasn't mutated.

    When assigning a property on a JavaScript object, it always treats the property as an "own" property. Even if the prototype chain already has a property with that name, it assigns the "own" property. Here, `foo` becomes an "own" property of `c`: (recall that `c` is empty object, doesn't have property `foo` before, it delegates the property access to its prototype)

    Even if `c` adds another property that `b` doesn't have, `b` is still the prototype of `c`

    ```javascript
    console.log(c.hasOwnProperty('foo')); // => true
    c; // => { foo: 42 }
    
    c.baz = 99;
    b.isPrototypeOf(c); // => true
    ```

  *The discussion of inheriting properties from other objects applies to methods as well. Methods in JavaScript are merely properties that refer to functions. Thus, when we talk about object properties, we also mean methods.*

  - `for/in` loop includes properties from its prototype chain

  - `Object.keys` only returns an object's "own" properties

  - Methods on `Object.prototype`

    - `Object.prototype` object is **at the top of all** JS prototype chains. 

    - Its methods are available from any JS object. 3 useful methods (memorize)

      1) `Object.prototype.toString()`

      2) `Object.prototype.hasOwnProperty(prop)`

      3) `Object.prototype.isPropertyOf(obj)` determines if the obj is part of another object's prototype chain

- Object Without Prototypes -- "bare" object

  - Though we say that all JS objects have a prototype, the prototype chain ends with `Object.prototype`, we can create an object without prototype:

  - set the prototype to `null`:

    ```javascript
    > let a = Object.create(null);
    undefined
    
    > Object.getPrototypeof(a);
    null
    ```

  - `a` doesn't have access to Object methods like `hasOwnProperty` or `toString`, it also doesn't have a prototype chain ends with `Object.prototype`
  
- Create a "bare" object is unusual, but you need to be wary of this situation

#### 2nd way to create object:

- Object Creation with Prototypes

  - OLOO pattern: **Objects Linking to Other Objects**
    - A prototype contain:

      - common properties;

      - uncommon properties inside `init` methods, which takes arguments as customization

    ```javascript
    let carPrototype = {
      start: function() {        // common property for all car objects
        this.started = true;
      },
    
      stop: function() {         // common property
        this.started = false;
      },
    
      init(make, model, year) {  // uncommon, customize for each car object
        this.make = make;
        this.model = model;
        this.year = year;
        return this;             // this refers to car1
      },
    };
    
    let car1 = Object.create(carPrototype).init('Toyota', 'Corolla', 2016);
    ```

    - 1 big advantage of OLOO pattern over factory functions: memory efficiency

- **Difference of OLOO & factory function:**

  - Objects created with the **OLOO** have a prototype object that contains the methods associated with the created objects. Since all pets created from the prototype share a single prototype object, they all share the same methods. With the factory function, each object has a copy of all the methods. Thus, objects created by OLOO are more efficient in terms of memory use.

  - Objects created with the **factory function** can have private state. Any state stored in the body of the factory function instead of in the returned object is private to the returned object. They can't be accessed or modified unless one of the object methods exposes the state. With OLOO, there is no way to define private state. All object state can be accessed and modified by outside code.

####3rd way to create objects: 

- **Object constructors**, or **constructors** for short

  - (Think of constructor as a factory that can create an endless number of objects of the same type)
  - **Define a constructor:** (nearly identical to define an ordinary function)

  ```javascript
  function Car(make, model, year) {   // capitalize Car
    this.make = make;									// use this to set object's properties/methods
    this.model = model;
    this.year = year;
    this.started = false;
  
    this.start = function() {
      this.started = true;
    };
  
    this.stop = function() {
      this.started = false;
    };
  }																		// doesn't have an explicit return value
  ```

  Distinct features of constructors than ordinary functions:

  ​	1) `Car`: convention, not a requirement.

  ​	2) use `this` to set the object's properties and methods

  ​	3) constructor doesn't have an explicit return value

  - **`this`'s value depends on how we call the constructor function**:

  ```javascript
  let car1 = new Car('Toyota', 'Corolla', 2016); // create a newly object,assign it to car1
  
  car1.make;    // 'Toyota'
  car1.started; // false
  car1.start();
  car1.started; // true
  ```

  `new` precedes the function invocation:

  ​	-- this combination of using `new` with a function call treats the function as a constructor.

  ​	-- it also **returns the newly created object** (here, assign it to `car1`, set the execution context to `car1`) even though our function doesn't have a `return` statement.

  - **How JS works when invoke constructor function with `new`:**
    
    1. It creates an entirely new object.
    2. It sets the value of `this` to point to the new object
    3. It invokes the function. Since `this` refers to the new object, we use it within the function to set the object's properties and methods.
  4. Finally, once the function finishes running, `new` returns the new object. We're now free to use it in any manner we want.
    
  - Who can be a constructor?

    - can use `new` to call almost any JS functions that you create:

    ```javascript
    let foo = {
      Car: function(make, model, year) { // complete syntax
        this.make = make;
        this.model = model;
        this.year = year;
      }
    };
    
    let car1 = new foo.Car('Toyota', 'Camry', 2019);
    car1.make; //=> 'Toyota'
    ```

  - Who can't be a constructor? ❌

    - Calling a method defined with concise syntax won't work: **so constructor must be written in a complete syntax**

    ```javascript
    let foo = {
      Car(make, model, year) {    // concise method
        this.make = make;
        this.model = model;
        this.year = year;
      }
    };
    
    new foo.Car(); //=> Uncaught TypeError: foo.Car is not a constructor
    ```

    - arrow function with `new` since **they use their surrounding context as the value of `this`:**

    ```javascript
    let Car = (make, model, year) => {
      this.make = make;
      this.model = model;
      this.year = year;
    }
    
    new Car(); // TypeError: Car is not a constructor
    ```

    - Many not all built-in objects and methods:

    ```javascript
    new console.log(); //=> Uncaught TypeError: console.log is not a constructor
    new Math();        //=> Uncaught TypeError: Math is not a constructor
    new parseInt("3"); //=> Uncaught TypeError: parseInt is not a constructor
    
    new Date();        //=> 2019-06-26T02:50:20.191Z
    ```

  - Constructors With Explicit Return Values

    - Rule: if explicit `return` an **object**, return that object; otherwise, return our desired new object.

    For example:

    ```javascript
    function Cat(name, breed, weight) {
      this.name = name;
      this.breed = breed;
      this.weight = weight;
    
      return 'a cat';           // constructor doesn't return an object
    }
    
    let fluffy = new Cat('fluffy', 'Persian', 15);
    fluffy.weight; // 15
    ```

    ```javascript
    function Cat(name, breed, weight) {
      this.name = name;
      this.breed = breed;
      this.weight = weight;
    
      return { foo: 1 };         // constructor returns an object
    }
    
    let fluffy = new Cat('fluffy', 'Persian', 15);
    fluffy.weight; // undefined
    fluffy;        // { foo: 1 }
    ```

- Supplying Constructor Arguments with Plain Objects

  - It's getting more error-prone, when constructor grows with more arguments:

    ```javascript
    function Car(make, model, year, color, passengers, convertible, mileage) {
      this.make = make;
      this.model = model;
      this.year = year;
      this.color = color;
      this.passengers = passengers;
      this.convertible = convertible;
      this.mileage = mileage;
      this.started = false;
    
      this.drive = function() {
        this.started = true;
      };
    
      // rest of the methods
    }
    ```
  - Solution: wrap up those arguments to an object, then constructor passes this object as argument:

    ```javascript
    let civicArgs = {
      make: 'Honda',
      model: 'Civic',
      year: 2016,
      color: 'black',
      passengers: 5,
      convertible: false,
      mileage: 16000
    }
    
    let civic = new Car(civicArgs); // here
    ```

  - Of course, that means we need to make some changes to `Car` constructor as well:

    ```javascript
    function Car(args) {
        this.make = args.make; // here
        this.model = args.model;
        this.year = args.year;
        this.color = args.color;
        this.passengers = args.passengers;
        this.convertible = args.convertible;
        this.mileage = args.mileage;
        this.started = false;
      
        this.drive = function() {
          this.started = true;
        };
      
        // rest of methods
      }
    ```

  - Further simplify:

    ```javascript
      function Car(args) {
        Object.assign(this, args); // use Object.assign
      
        this.drive = function() {
          this.started = true;
        };
      
        // rest of the methods
      }
    ```

  - A drawback of `Object.assign`:  the `args` object may contain properties that the car object doesn't need.

- Determining an Object's Type

  - we use `new` to create an object, we say that this object is an **instance** of a `Car` constructor
  - use `instanceof` to check whether a given constructor create an object:

    ```javascript
    let civicArgs = {
      make: 'Honda',
      model: 'Civic',
      year: 2016,
      color: 'black',
      passengers: 5,
      convertible: false,
      mileage: 16000
    };
    
    let civic = new Car(civicArgs);  // civic is an instance of constructor Car
    
    if (civic instanceof Car) {
      console.log("It's a car!"); // yes!
    } else {
      console.log("It's not a car.");
    }
    ```
  - `instanceof` operator requires the object to the right to have a `prototype` property, i.e., **a constructor function or class**, if you want the left object is an instance of the right.

  - instance is transitive:

    ```javascript
    fluffy --> Cat --> Animal
    ```

    In a prototype chain, `Cat` is prototype of `fluffy` , `Animal` is prototype of `Cat`, we can say `fluffy` is an instance of `Animal`

- `new` and Implicit Execution Context
  
- when you call a constructor function with `new`, its implicit context is the new object.
  
- **Constructors with Prototypes**

  - Main idea: **prototype** includes the **common methods, constructor** includes **properties/methods unique for each newly created object.**

  - Reason why use constructions with prototype:
    - **Memory inefficiency**: When use constructor functions as factories to create objects, `bark` method remains the same in all, and every time we create an object, the runtime create a new copy of this method:

  ```javascript
  function Dog(name, breed, weight) {
    this.name = name;
    this.breed = breed;
    this.weight = weight;
  
    this.bark = function() {
      console.log(this.weight > 20 ? 'Woof!' : 'Yip!');
    };
  }
  
  let maxi = new Dog('Maxi', 'German Shepherd', 32);
  let dexter = new Dog('Dexter', 'Rottweiler', 50);
  let biggie = new Dog('Biggie', 'Whippet', 9);
  
  maxi.bark(); // 'Woof!'
  ```

  We can check that each dog object has their own `bark` method:

  ```javascript
  maxi.hasOwnProperty('bark');   // true
  dexter.hasOwnProperty('bark'); // true
  biggie.hasOwnProperty('bark'); // true
  ```

  So, we need to use prototypes to share that `bark` methods

  - **Method Delegation** to Prototype: means that we can share methods by putting them in the prototype object.

  Here `bark` can be defined inside a prototype object:

  ```javascript
  let DogPrototype = {
    bark() {            // put bark inside a prototype
      console.log(this.weight > 20 ? 'Woof!' : 'Yip!');
    }
  };
  
  function Dog(name, breed, weight) {
    Object.setPrototypeOf(this, DogPrototype); // this is each dog object
    this.name = name;
    this.breed = breed;
    this.weight = weight;
  }
  ```

  We set `DogPrototype` as the prototype of the newly created dog object.

  We can then continue to use our constructor without change:

  ```javascript
  let maxi = new Dog('Maxi', 'German Shepherd', 32);
  let dexter = new Dog('Dexter', 'Rottweiler', 50);
  let biggie = new Dog('Biggie', 'Whippet', 9);
  
  maxi.bark(); // 'Woof!'
  ```

  This time, the `bark` method isn't defined on the individual objects, each dog object doesn't have its "own" `bark` method: (`bark` is in prototype)

  ```javascript
  maxi.hasOwnProperty('bark');   // false
  dexter.hasOwnProperty('bark'); // false
  biggie.hasOwnProperty('bark'); // false
  ```

  **The `DogPrototype` has the only copy of the method; all dog objects delegate `bark` to the `DogPrototype` prototype.**

  - Furthermore, can write as constructor and prototype pairing:
    - Assign the prototype object to a `myPrototype` property of the `Dog` function.
    - Thus, all dog **instances** are supposed to inherit from the `Dog.myPrototype` prototype object.

  ```javascript
  // Delete DogPrototype
  
  function Dog(name, breed, weight) {
    Object.setPrototypeOf(this, Dog.myPrototype); // myPrototype is a property of Dog
    this.name = name;
    this.breed = breed;
    this.weight = weight;
  }
  
  Dog.myPrototype = {             // Dog.myPrototype is prototype now
    bark() {
      console.log(this.weight > 20 ? 'Woof!' : 'Yip!');
    }
  };
  
  // all dog instances:
  let maxi = new Dog('Maxi', 'German Shepherd', 32); 
  let dexter = new Dog('Dexter', 'Rottweiler', 50);
  let biggie = new Dog('Biggie', 'Whippet', 9);
  maxi.bark(); // 'Woof!'
  
  maxi.hasOwnProperty('bark');   // false
  dexter.hasOwnProperty('bark'); // false
  biggie.hasOwnProperty('bark'); // false
  ```

- The Constructor `prototype` Property (invisible)

  Distinct: they're not the same thing

  | constructor's prototype object = function prototype          | object prototype                                             |
  | :----------------------------------------------------------- | :----------------------------------------------------------- |
  | Constructors are functions --> All function objects have a `prototoype` property, we call it **function prototype**  ( JS only use it when you call function as a constructor ) | If `bar` is an object, then the object from which `bar` inherits is the **object prototype** |
  | `Dog.prototype; // => Dog {}`                                |                                                              |
  | Is a function object that the constructor uses as *the object prototype* for the object it creates | By default, JS sets object prototype to constructor's prototype object in constructor's `prototype` property |

  Related: 

  - When you call constructor with `new`, JS **sets the new object's prototype to the current value of constructor's `prototype` property**
  - By default, constructor functions **set** *the object prototype* **to** the *constructor's prototype object*. (Which is stored in `prototype` property)
  - Each object that the constructor creates inherits from the constructor's prototype object.
  - The constructor stores its prototype object in its `prototype` property
  - For example, if the constructor's name is `Dog`, then `Dog.prototype` references the constructor's prototype object. 

  ---

  - JS **only** uses the `prototype` property when you call that function as a constructor, so we can further refactor our code by using this property:

  ```javascript
  function Dog(name, breed, weight) {
    // deleted Object.setPrototypeOf(this, Dog.myPrototype);
    this.name = name;
    this.breed = breed;
    this.weight = weight;
  }
  
  Dog.prototype.bark = function() { // here! Put bark method inside constructor's prototype
    console.log(this.weight > 20 ? 'Woof!' : 'Yip!');
  };
  
  let maxi = new Dog('Maxi', 'German Shepherd', 32);
  maxi.bark(); // 'Woof!'
  
  let biggie = new Dog('Biggie', 'Whippet', 9);
  biggie.bark(); // 'Yip!'
  ```

  This code does:

  1. It creates an entirely new object.
  2. **It sets `Foo.prototype` as the prototype for the new object. That is, the new object inherits from the object referenced by `Foo.prototype`.**
  3. It sets the execution context (`this`) for the function to point to the new object.
  4. It invokes the function.
  5. It returns the new object unless the function returns another **object**

- An interesting fact:

  - A constructor has a `prototype` property
  - A constructor's prototype has a `constructor` property
  - Below code returns the constructor function itself, make sense!

  ```javascript
  Dog.prototype.constructor; // => [Function: Dog]
  ```

- Overring Constructor's Prototype

  - Similarly, **as how we override the ordinary object prototype:**

  ```javascript
  let maxi = new Dog('Maxi', 'German Shepherd', 32);
  let dexter = new Dog('Dexter', 'Rottweiler', 50);
  
  dexter.bark = function() {     // overrides bark method from Dog.prototype
    console.log('WOOF!')
  }
  
  maxi.bark();   // Woof!
  dexter.bark(); // WOOF!
  dexter.hasOwnProperty('bark'); // true, dexter has its own bark method
  ```

  The `dexter` object now has its own `bark` method that **overrides** the `bark` method from `Dog.prototype`.

  Each time we call `bark` on `dexter`, JS looks for `dexter` first, since it finds it there, it won't look up the prototype. (exactly same logic as we treat an ordinary object prototype chain)

- Static vs. Instance Members

  - `name`, `breed`, `age` properties, and `bark` method are **instance members** of `Dog` constructor or the dog objects.
  - Since such properties and methods require an **instance** of the object created by the `Dog` constructor, i.e., **create an object first, then access these properties/methods thru this object**
  - You can't access `age` on the `Dog` constructor since it's not defined directly on the constructor:

  ```javascript
  Dog.age; // undefined
  ```

  - An **instance** is just another term for **objects** created using a constructor.
    - `dexter` is an instance of `Dog`
    - `age`, `bark` are instance members of `Dog`

  - **Static members** are defined and accessed directly on the constructor.

    - They are properties and methods that belong to dogs in general, not a specific dog.
    - For example, you want add a general info to all dogs:

    ```javascript
    Dog.averageLifeSpan = 12;
    ```

---

- Sub-Typing with Constructors & Prototypes

  - Why we need *inheritance* in an application:question:

    For example, We have a drawing application that lets the user work with shapes:

  ```javascript
  function Rectangle(length, width) {
    this.length = length;
    this.width = width;
  };
  
  Rectangle.prototype.getArea = function() {
    return this.length * this.width;
  };
  
  Rectangle.prototype.toString = function() {
    return `[Rectangle ${this.length} x ${this.width}]`;
  };
  
  let rect = new Rectangle(10, 5);
  rect.getArea();  // 50
  rect.toString(); // "[Rectangle 10 x 5]"
  ```

  Suppose we also needs squares:

  ```javascript
  function Square(size) {
    this.length = size;
    this.width = size;
  }
  
  Square.prototype.getArea = function() {
    return this.length * this.width;
  };
  
  Square.prototype.toString = function() {
    return `[Square ${this.length} x ${this.width}]`;
  };
  
  let sqr = new Square(5);
  sqr.getArea();     // => 25
  sqr.toString();    // => "[Square 5 x 5]"
  ```

  You can see that there's some code duplication, particularly, `Square.prototype.getArea` and `Rectangle.prototype.getArea` are identical.

  :a: We can use *prototypal inheritance* here.

  Think about: `Square` is a **sub-type** of `Rectangle` (where the length and width are the same), `Rectangle` is a **super-type** of `Square`

  ```javascript
  function Square(size) {
    this.length = size;
    this.width = size;
  }
  
  Square.prototype = Object.create(Rectangle.prototype); // here
  
  Square.prototype.toString = function() {
    return `[Square ${this.length} x ${this.width}]`;
  };
  
  let sqr = new Square(5);
  sqr.getArea();     // => 25
  sqr.toString();    // => "[Square 5 x 5]"
  ```

  A function's`prototype` property is writable, we can **reassign `Square.prototype` to an object that inherits from `Rectangle.prototype`. ** Now the prototype chain looks like:

  ```javascript
  sqr ---> Square.prototype ---> Rectangle.prototype ---> Object.prototype
  ```

  All objects created by `Square` constructor inherits from `Square.prototype`, which inherits from `Rectangle.prototype`.

  Since `toString` must be distinct for squares, we override it in `Square.prototype`, i.e., we customize `Square.prototype.toString`

  - Restoring the `constructor` property

    - One side-effect of above sub-type approach is that `constructor` property on square objects `sqr` points `Rectangle` when it should point to `Square`:

    ```javascript
    sqr.constructor === Rectangle; // true
    ```

    To fix this, we manually reassign `Square.prototype.constructor` to `Square`:

    ```javascript
    function Square(size) {
      this.length = size;
      this.width = size;
    }
    
    Square.prototype = Object.create(Rectangle.prototype);
    Square.prototype.constructor = Square;    // here
    
    Square.prototype.toString = function() {
      return `[Square ${this.length} x ${this.width}]`;
    }
    
    let sqr = new Square(5);
    sqr.getArea();              // => 25
    sqr.toString();             // => "[Square 5 x 5]"
    sqr.constructor === Square; // => true    here!
    ```
    
  - When we talk about *inheritance* in JS, we generally mean **pseudo-classical inheritance** -- a constructor's prototype(`Square`) inherits from another constructor's (`Rectangle`) prototype; i.e., **a sub-type inherits from a super-type**

---

- 2 types of String

  - String primitives

  - String objects: create by `String` constructor

    - Different?

    ```javascript
    'abc' === 'abc';                         // true, string primitives
    new String('abc') === new String('abc'); // false, string objects
    ```

  - When you call `String` without `new`, it returns a new string:

    ```javascript
    let str = String('abc');
    typeof str;     // 'string'
    str; // 'abc'
    ```

  - When `String` takes a non-string values as arguments, it converts the value to a string and returns it:

    ```javascript
    > String([1, 2, 3])
    '[1,2,3]'
    
    > String(a => a * a)
    'a => a * a'
    ```

- ES6 Classes

  - **Classes**: a more natural way to create constructors and prototypes

  - 2 ways of defining classes: *declarations and expressions*

  - :one: **Class Declarations:** simplest way:

    ```javascript
    class Rectangle {                   // class keyword, no ()
      constructor(length, width) {      // previous constructor function
        this.length = length;
        this.width = width;
      }                                 // no comma
       
      getArea() {                       // previous method in prototype 
        return this.length * this.width;
      }
      
      toString() {                      // previous method in prototype 
        return `[Rectangle ${this.width * this.length}]`;
      }
    }
    
    let rec1 = new Rectangle(10, 5);    // new keyword is a must
    rec1.getArea();
    ```

    - No commas between each element of the class
    - the syntax looks similar to concise method definition in object literals
    - Now the constructor is a method, named `constructor`, instead of being a standalone function.


  - It behaves almost identical to following *constructor/prototype pairing:*

    ```javascript
    function Rectangle(length, width) {   // constructor --> constructor()
      this.length = length;
      this.width = width;
    }
    
    Rectangle.prototype.getArea = function() {
      return this.length * this.width;
    };
    
    Rectangle.prototype.toString = function() {
      return `[Rectangle ${this.length} x ${this.width}]`;
    };
    
    let rec1 = new Rectangle(10, 5);
    rec1.getArea();
    ```

  - :two: **Class Expressions**

    ```javascript
    let Rectangle = class {
      constructor(length, width) {
        this.length = length;
        this.width = width;
      }
      
      getArea() {
        return this.length * this.width;
      }
    
      toString() {
        return `[Rectangle ${this.width * this.length}]`;
      }
    };
    ```

  - Identifying An Object's Type

    Recall: 1) Using `instanceof`

     			2) Using `constructor` property on the object

    ```javascript
    // omitted class code
    
    let rec1 = new Rectangle(10, 5);
    rec1.getArea();
    typeof Rectangle;          // "function"
    rec1 instanceof Rectangle; // true
    rec1.constructor === Rectangle; // true
    ```

  - Classes as First-Class Citizens

    - In programming, a **first-class citizen** is a value that can be:
      - passed into a function
      - returned from a function
      - assigned to a variable

    - Like functions, classes are also first-class values:

    ```javascript
    function createObject(classDef) {
      return new classDef();
    }
    
    class Foo {
      sayHi() {
        console.log('Hi!');
      }
    }
    
    let obj = createObject(Foo);  // class Foo passed as an argument
    obj.sayHi(); //=> logs 'Hi!'
    ```

    Recall `typeof Rectangle` is `"function"`, means **classes are just functions**, since functions are first class values, so are classes.

  - Inheritance with Classes

    Previous constructor/prototype example:

    ```javascript
    function Rectangle(length, width) {
      this.length = length;
      this.width = width;
    }
    
    Rectangle.prototype.getArea = function() {
      return this.length * this.width;
    };
    
    Rectangle.prototype.toString = function() {
      return `[Rectangle ${this.length} x ${this.width}]`;
    };
    
    function Square(size) {
      Rectangle.call(this, size, size);
    }
    
    Square.prototype = Object.create(Rectangle.prototype);
    Square.prototype.constructor = Square;
    
    Square.prototype.toString = function() {
      return `[Square ${this.length} x ${this.width}]`;
    };
    ```

    Now rewrite it with class:

    ```javascript
    class Rectangle {
      constructor(length, width) {
        this.length = length;
        this.width = width;
      }
    
      getArea() {
        return this.length * this.width;
      }
    
      toString() {
        return `[Rectangle ${this.width * this.length}]`;
      }
    }
    
    class Square extends Rectangle {  // Square inherits from Rectangle
      constructor(size) {
        super(size, size);
      }
    
      toString() {
        return `[Square] ${this.width * this.length}`;
      }
    }
    ```

    - `extends` signifies that the class  `Square` inherits from the class `Rectangle`
    - `super`, when called inside the `constructor` method, refers to the constructor method for the parent class, here, `super(size, size)` performs the same as: `Rectangle.call(this, size, size);` in constructor/prototype example

    - You don't need to use `super` in every subclass, but if you call it, it should be the first thing in the constructor.

  - Define **static methods** on classes by using `static` keyword:

    ```javascript
    class Rectangle {
      constructor(length, width) {
        this.length = length;
        this.width = width;
      }
    
      static getDescription() {   // here
        return 'A rectangle is a geometrical shape with 4 sides';
      }
    
      getArea() {
        return this.length * this.width;
      }
    
      toString() {
        return `[Rectangle ${this.width * this.length}]`;
      }
    }
    ```

    Static methods can be called directly on the class:

    ```javascript
    Rectangle.getDescription();
    // => A rectangle is a geometrical shape with 4 sides
    ```

- Code Reuse with Mixins

  - Classes can extend only one other class; objects can only inherit from one other object. This limitation makes it difficult to model certain domains using class or constructor-based inheritance.
  - You can use **mix-ins to share behavior between otherwise unrelated classes.**
  - **Mix-ins**: 
    - a pattern that adds methods and properties from one object to another
    - copies the members of one object to another with `Object.assign` or similar techniques.

  - Example: objects that can belong to multiple and distinct classes

    - A dog is a mammal, but it's also a swimmer:

    ```javascript
    const swimmerMixin = {
      swim() {
        return 'swimming'
      }
    }
    
    class Mammal {}
    class Pet {}
    
    class Dog extends Mammal {
      constructor(name) {
        super();
        this.name = name;
      }
    }
    
    Object.assign(Dog.prototype, swimmerMixin);  // mix-in
    
    class Fish extends Pet {
      constructor() {
        super();
      }
    }
    
    Object.assign(Fish.prototype, swimmerMixin); // mix-in
    ```

    We've created a `swimmerMixin` object that has a `swim` method. To mix it into our `Dog` and `Fish` classes, we've used `Object.assign` to add the methods from `swimmerMixin` to the prototype objects of both classes.

- Polymorphism

  - the ability of objects with **different types** to respond the **same method invocation**

  - Polymorphism Through Inheritance

    ```javascript
    class Animal {
      eat() {
        // generic eat method
      }
    }
    
    class Fish extends Animal {
      eat() {
        // eating specific to fish
      }
    }
    
    class Cat extends Animal {
      eat() {
        // eating specific to cat
      }
    }
    
    function feedAnimal(animal) {
      animal.eat();
    }
    
    let animalArray = [new Animal(), new Fish(), new Cat()];
    
    animalArray.forEach(animal => {
      feedAnimal(animal);
    });
    ```

    Every object in the array is a different animal, but the client code -- the code that uses those objects -- can treat each as a generic animal, e.g., something that can eat. The interface for this class hierarchy lets us work with all of those types in the same way even though the implementations may be dramatically different. **That is polymorphism**.

  - If we don't use polymorphism, the code will be like:

    ```javascript
    class Animal {
      eat() {
        // generic eat method
      }
    }
    
    class Fish extends Animal {
      ingest() {       // here
        // eating specific to fish
      }
    }
    
    class Cat extends Animal {
      devour() {      // here
        // eating specific to cat
      }
    }
    
    function feedAnimal(animal) {
      if (animal instanceof Fish) {  // nightmare
        animal.ingest();
      } else if (animal instanceof Cat) {
        animal.devour();
      } else if (animal instanceof Animal) {
        animal.eat();
      }
    }
    
    animalArray = [new Animal(), new Fish(), new Cat()];
    
    animalArray.forEach(animal => {
      feedAnimal(animal);
    });
    ```

  - An example of polymorphism: `toString` method. 

    - The `Object` type provides a default implementation of `toString()` that other types inherit. Other types can also implement a custom version of the method -- **override** the method -- that returns a string representation of the corresponding object.

    - Without customization, `toString` returns the string `'[object Object]'` when called on an object. With customization:

  ```javascript
  > [1, 2, 3].toString()
  '1,2,3'
  
  > (new Date()).toString()
  'Fri Jun 28 2019 20:50:13 GMT-0700 (Pacific Daylight Time)'
  ```

  - Inheritance & duck-typing are 2 main forms of polymorphism

- Lesson 3 Quiz

  1)

  ```javascript
  class Critter {}
  class Snake extends Critter {}
  class Rattler extends Snake {}
  ```

  - `Critter` is a super-type of both `Snake` and `Rattler`
  - `Rattler` is a sub-type of both `Snake`  and `Critter` 

  2)

  ```javascript
  let arr1 = new Array(1, 2, 3);
  let arr2 = Array(1, 2, 3);
  
  console.log(arr1 === arr2); // => false
  ```

  - When creating array with `Array` constructor, `new` keyword is optional.
  - so, `arr1` and `arr2` are identical in types and values.

  3)

  ```javascript
  let str1 = new String("abc");
  let str2 = String("abc");
  
  console.log(str1 === str2); // => false, different in type
  ```

  - `str1`: `[String: 'abc']` -- an object
  - `str2`: `'abc'` -- a primitive value
  - But functionally, the two act like objects, so that you can do for both:  `str1.toUpperCase()` or `str2.toUpperCase()`

