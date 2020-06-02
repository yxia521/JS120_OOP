// Moving
// You have the following classes.

// these three classes are unrelated but want to have a shared method walk, so mix-in is a good choice
const walkMixin = {
  walk() {
    return `${this.name} ${this.gait()} forward`;
  }
};


class Person {
  constructor(name) {
    this.name = name;
    Object.assign(this, walkMixin);  // changes here
  }

  gait() {
    return "strolls";
  }

}

class Cat {
  constructor(name) {
    this.name = name;
    Object.assign(this, walkMixin);
  }

  gait() {
    return "saunters";
  }
}

class Cheetah {
  constructor(name) {
    this.name = name;
    Object.assign(this, walkMixin);
  }

  gait() {
    return "runs";
  }
}

// You need to modify the code so that this works: You are only allowed to write one new method to do this

let mike = new Person("Mike");
console.log(mike.walk());
// "Mike strolls forward"

let kitty = new Cat("Kitty");
console.log(kitty.walk());
// "Kitty saunters forward"

let flash = new Cheetah("Flash");
console.log(flash.walk());
// "Flash runs forward"

