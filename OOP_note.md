###lesson 1

- OOP: a style of programming that uses objects to organize a program (a programming paradigm)

  - Advantages
    - It lets programmers think about a problem at a higher-level of abstraction, which helps them break down and solve the problem
    - OOP helps programmer write programs that reduce the dependencies in a program, which makes maintenance easier
    - Done right, OOP makes code flexible, easy to understand, and easy to change

  - Disadvantages:
    - OOP programs are often much larger than the equivalent procedural program
    - OOP may lead to less efficient code; OOP programs may require more memories, disk space and computer power.

- Encapsulation: the idea of bundling or combining data and operations associated with that data in a single entity; that is, it's the grouping of related properties and methods in a single object

- How does encapsulation differ from encapsulation in most other OO languages?
  - In other languages, encapsulation concerns hiding details of an object from code that uses the obejct. An object should *only* expose the methods and properties that other objects need to use the encapsulated object.
  - However, JS doen't directly provide the means to limit exposure of methods and properties. There are ways to achieve a degree of access restriction, but they're not perfect.

- When object properties have *function values*, we call them **methods**.

- `this`
  
  - Suppose you change the variable name, calling a method with the original variable name will throw a reference error.
- when you use `this` inside a method, it refers to the object that contains the method
  
- Objects that are used to store state within another object are called **collaborator objects** or, **collaborators**. They can be objects, primitives like strings, numbers

  ```javascript
  let cat = {
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
    pet: cat,     // here cat is collaborator
  
    printName() {
      console.log(`My name is ${this.name}!`);
    },
  };
  ```
  

`pete` object has a collaborator object `cat` stored in its `pet` property.

When we need to access that `pet`, we can use `pete.pet` to reference the desired state or behavior: use `pete.pet` to call the `makeNoise` method, etc...

- Functions as object factories

  - you need to create hundreds or thousands of similar objects
  - One way to automate object creation is to use **object factories**: functions that create and return objects of a particular type

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

### lesson 2

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

### lesson 3

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
    - JS objects use sth called **prototypal inheritance**
    - prototype: the object that you inherit properties and methods from
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
  - :speaker: `b` doesn't receive any properties or methods of its own. Instead, it **delegates** property and method access to its prototype `a`. `b` is an emtpy object:

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

  - What really inside `b` is `[[prototype]]`.
  - JS objects use an *internal* property  `[[prototype]]` to keep track of their prototype. You can't access this internal property directly in your code. But you can access and replace its value like this:

  ```javascript
  > Object.getPrototypeOf(b);
  { foo: 1, bar: 2 }
  ```

  - :exclamation: Objects hold a **reference** to their prototype objects through their internal property `[[prototype]]`. If the object's prototype changes, the changes are observable in the inheriting object as well.

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

  - Methods on `Object.prototype`

    - `Object.prototype` object is **at the top of all** JS prototype chains. 

    - Its methods are available from any JS object. 3 useful methods (memorize)

      1) `Object.prototype. toString()`

      2) `Object.prototype.hasOwnProperty(prop)`

      3) `Object.prototype.isPropertyOf(obj)` determines if the obj is part of another object's prototype chain

- Object Without Prototypes

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

- Object Creation with Prototypes

  - OLOO pattern: **Objects Linking to Other Objects**
    - It uses prototypes and involves extracting properties common to all same type objects to a prototype object.
    - All objects of the same type inherit from that prototype

  - 1 big advantage of OLOO pattern over factory functions: memory efficiency

- Practice Problems -- *difference* of OLOO & factory function:

  - Objects created with the **OLOO** have a prototype object that contains the methods associated with the created objects. Since all pets created from the prototype share a single prototype object, they all share the same methods. With the factory function, each object has a copy of all the methods. Thus, objects created by OLOO are more efficient in terms of memory use.

  - Objects created with the **factory function** can have private state. Any state stored in the body of the factory function instead of in the returned object is private to the returned object. They can't be accessed or modified unless one of the object methods exposes the state. With OLOO, there is no way to define private state. All object state can be accessed and modified by outside code.

- Another way to create objects: **Object constructors**, or **constructors** for short

  - (Think of constructor as a factory that can create an endless number of objects of the same type)
  - **Define a constructor:** (nearly identical to define an ordinary function)

  ```javascript
  function Car(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
    this.started = false;
  
    this.start = function() {
      this.started = true;
    };
  
    this.stop = function() {
      this.started = false;
    };
  }
  ```

  Distinguishing features:

  ​	1) `Car`: convention, not a requirement.

  ​	2) use `this` to set the object's properties and methods

  ​	3) constructor doesn't have an explicit return value

  - Then, what object does `this` refer to? -- **its value depends on how we call the constructor function**:

  ```javascript
  let car1 = new Car('Toyota', 'Corolla', 2016);
  
  car1.make;    // 'Toyota'
  car1.started; // false
  car1.start();
  car1.started; // true
  ```

  `new` precedes the function invocation:

  ​	-- this combination of using `new` with a function call treats the function as a constructor.

  ​	-- it also returns the newly created object (here, `car1` object) even though our function doesn't have         	a `return` statement.

  - How JS works when invoke function with `new`:
    1. It creates an entirely new object.
    2. It sets the value of `this` to point to the new object, `car1`
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

    However, calling a method defined with concise syntax won't work:

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

  - Who can't be a constructor?

    - arrow function with `new` :do_not_litter: since they use their surrounding context as the value of `this`:

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

    

