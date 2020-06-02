// Shouter
// Rewrite these two object types to use the class keyword, instead of direct prototype manipulation. 
// Person exposes method greeting which when called logs the the provided greeting text. 
// Shouter is a subtype of Person and is a bit loud so whatever he says is uppercased.

// function Person() {
// }
// Person.prototype.greeting = function(text) {
//   console.log(text);
// }

// function Shouter() {
//   Person.call(this);
// }
// Shouter.prototype = Object.create(Person.prototype)
// Shouter.prototype.greeting = function(text) {
//   Person.prototype.greeting.call(this, text.toUpperCase());
// }

// --- rewrite with class ---
class Person {
  greeting(text) {
    console.log(text);
  }
}

class Shouter extends Person {
  greeting(text) {
    super.greeting(text.toUpperCase()); // line of interest
  }
}


let person = new Person();
let shouter = new Shouter();

person.greeting("Hello. It's very nice to meet you."); // Hello. It's very nice to meet you
shouter.greeting("Hello my friend."); // HELLO MY FRIEND.
