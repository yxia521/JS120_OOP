/*

Only Pass the Year
Using the following code, allow Truck to accept a second argument upon instantiation. 
Name the parameter bedType and implement the modification so that Car continues 
to only accept one argument.

*/

class Vehicle {
  constructor(year) {
    this.year = year;
  }
}

// we add constuctor method to Truck instead of modifying constructor in Vehicle cuz
// we don't want Car to accept the bedType parameter.
class Truck extends Vehicle {
  constructor(year, bedType) {
    super(year);   // pass whaever arguments you want from parent class, so that Truck inherits
    this.bedType = bedType;
  }
}

class Car extends Vehicle {}

let truck1 = new Truck(2003, 'Short');
console.log(truck1.year);
console.log(truck1.bedType);

/*

Expected output:

2003
Short

*/
