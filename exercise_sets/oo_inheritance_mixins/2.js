// Start the Engine (part 1)
// Change the following code so that creating a new Truck automatically invokes startEngine.

class Vehicle {
  constructor(year) {
    this.year = year;
  }
}

class Truck extends Vehicle {
  constructor(year) {          // add this constructor
    super(year);
    this.startEngine();
  }

  startEngine() {
    console.log('Ready to go!');
  }
}

let truck = new Truck(2003);
console.log(truck.year); // 2003


// Expected output:

// Ready to go!
// 2003

/*

class Vehicle {
  startEngine() {
    console.log('Ready to go!')
  }
}

class Truck extends Vehicle {
  startEngine() {                     // method overriding
    console.log("I'm a truck! Let's go!")
  }
}

let truck = new Truck();
truck.startEngine(); // => "I'm a truck! Let's go!"


When working with pseudo-classical inheritance, it's possible for methods to overlap.
It's easy to shadow an inherited method like above example.

What if we want to shadow a property, but still have access to functionality from a parent class?
JS provides a reserved word: super

When you invoke super within constructor, it appears alone and must be used before this keyword
However, super keyword can also be used call functions on the object's parent, see Q3.

*/
