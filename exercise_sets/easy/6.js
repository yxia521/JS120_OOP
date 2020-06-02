// Refactoring Vehicles
// Refactor these classes so they all use a common superclass, and inherit behavior as needed.

// Consider the following classes:
class Car {
  constructor(make, model) {
    this.make = make;
    this.model = model;
  }

  getWheels() {
    return 4;
  }

  info() {
    return `${this.make} ${this.model}`
  }
}

class Motorcycle {
  constructor(make, model) {
    this.make = make;
    this.model = model;
  }

  getWheels() {
    return 2;
  }

  info() {
    return `${this.make} ${this.model}`
  }
}

class Truck {
  constructor(make, model, payload) {
    this.make = make;
    this.model = model;
    this.payload = payload;
  }

  getWheels() {
    return 6;
  }

  info() {
    return `${this.make} ${this.model}`
  }
}


// ------ refactor ------
class Vehicles {
  constructor(make, model) {
    this.make = make;
    this.model = model;
  }

  info() {
    return `${this.make} ${this.model}`;
  }
}

class Car extends Vehicles {
  getWheels() {
    return 4;
  }
}

class Motorcycle extends Vehicles {
  getWheels() {
    return 2;
  }
}

class Truck extends Vehicles {
  constructor(make, model, payload) {
    super(make, model);
    this.payload = payload;
  }

  getWheels() {
    return 6;
  }
}

let car = new Car('BMW', 'Mini');
console.log(car.info());
console.log(car.getWheels());
