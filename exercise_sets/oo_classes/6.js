// Hello, Sophie! (part 2)
// Using the code from the previous exercise, move the greeting from the constructor method 
// to an instance method named greet that logs a greeting to the console when invoked.

// Code:

class Cat {
  constructor(name) {
    this.name = name;
  }

  greet() {
    console.log(`Hello! My name is ${this.name}!`);
  }
}

let kitty = new Cat('Sophie');
kitty.greet();

// Expected output:

// Hello! My name is Sophie!
