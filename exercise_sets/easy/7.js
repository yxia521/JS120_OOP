// What Will This Do?
// What will the following code log?

class Something {
  constructor() {
    this.data = "Hello";
  }

  dupData() {
    return this.data + this.data;
  }

  static dupData() {
    return "ByeBye";
  }
}

let thing = new Something();
console.log(Something.dupData()); // "ByeBye"
console.log(thing.dupData());     // "HelloHello"

// line 13 is a static method, so we can call it directly with constructor itself.
// line 9 is a instance memeber of the class, it has to be called on the instance 
// we create by calling constructor with `new` keyword.
