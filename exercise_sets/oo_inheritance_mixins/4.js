/*

Start the Engine (part 2)
Given the following code, modify startEngine in Truck by appending 'Drive fast, please!' 
to the return value of startEngine in Vehicle. The 'fast' in 'Drive fast, please!' 
should be the value of speed.

*/

class Vehicle {
  startEngine() {
    return 'Ready to go!';
  }
}

class Truck extends Vehicle {
  startEngine(speed) {
    return super.startEngine() + ` Drive ${speed}, please!`; // Note: super. dot notation, instead of ()
  }
}

let truck = new Truck();
console.log(truck.startEngine('fast'));


// Expected output:
// Ready to go! Drive fast, please!
