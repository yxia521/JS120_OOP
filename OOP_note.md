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

  

  

  