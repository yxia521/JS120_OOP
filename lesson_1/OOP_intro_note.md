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

  

