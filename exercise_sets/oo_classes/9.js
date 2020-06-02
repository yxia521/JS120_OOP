// Generic Greeting (part 1)
// Modify the following code so that Hello! I'm a cat! is logged when Cat.genericGreeting is invoked.

class Cat {
  static genericGreeting() {
    console.log("Hello! I'm a cat!");
  }
}

Cat.genericGreeting();

// Expected output:

// Hello! I'm a cat!

/*

To invoke static methods, they MUST be called on the class itself, 
not an instance of the class. If we invoke a static method on an instance of the class, 
we'll get a TypeError:

class Cat {
  static genericGreeting() {
    console.log("Hello! I'm a cat!");
  }
}  

let kitty = new Cat();
kitty.genericGreeting(); // => kitty.genericGreeting is not a function

*/
