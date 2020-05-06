// 1.
let qux = { foo: 1 };
let baz = Object.create(qux);
console.log(baz.foo + qux.foo); // 2
// Naturally, qux.foo returns 1 since qux has a foo property with that value. 
// However, baz doesn't have its "own" copy of the foo property. Thus, JavaScript 
// searches the prototype chain for a foo property and finds the property in qux. 
// Thus, baz.foo is also 1, and the sum of the two values is 2.


// 2.
let qux = { foo: 1 };
let baz = Object.create(qux);
baz.foo = 2;

console.log(baz.foo + qux.foo); // 3
// This code is very similar to that in problem 1. However, this time, we assign baz.foo to a value of 2. 
// Property assignment doesn't use the prototype chain; instead, it creates a new property in the baz object named foo.

// When we add baz.foo and qux.foo together, baz.foo returns the value of its "own" foo property, 
// while qux.foo returns the value of its "own" foo property. Thus, the result is 3.


// 3.
let qux = { foo: 1 };
let baz = Object.create(qux);
qux.foo = 2;

console.log(baz.foo + qux.foo); // 4
// This code is also very similar to problem 1. This time, though, we assign the value 2 to qux.foo. 
// Since baz doesn't have its "own" copy of the foo property, JavaScript uses the prototype chain to look up baz.foo, 
// and it finds the foo property in qux. The result is equivalent to 2 + 2, or 4.

// An important consideration when dealing with prototypes is that objects hold a reference to their prototype objects. 
// If the object's prototype changes in some way, the changes are observable in the inheriting object as well.


// 4. 
// Write a function that searches the prototype chain of an object for a given property and assigns it a new value. 
// If the property does not exist in any of the prototype objects, the function should do nothing. 
let fooA = { bar: 1 };
let fooB = Object.create(fooA);
let fooC = Object.create(fooB);

assignProperty(fooC, "bar", 2);
console.log(fooA.bar); // 2
console.log(fooC.bar); // 2

assignProperty(fooC, "qux", 3);
console.log(fooA.qux); // undefined
console.log(fooC.qux); // undefined
console.log(fooA.hasOwnProperty("qux")); // false
console.log(fooC.hasOwnProperty("qux")); // false

function assignProperty(obj, prop, value) {
  while (obj !== null) {
    if (obj.hasOwnProperty(prop)) {
      obj[prop] = value;
      break;
    }

    obj = Object.getPrototypeOf(obj);
  }
}


// 5.
let bar = { a: 1, b: 2 };
let foo = Object.create(bar);
foo.a = 3;
foo.c = 4;

// for/in loop iterates over all of the object's enumerable properties, 
// including those inside its prototype chain.
for (let property in foo) {
  console.log(`${property}: ${foo[property]}`);
}

// outputs:
// a: 3        // from foo
// c: 4        // from foo
// b: 2        // from bar

// loop only iterates over foo's "own" properties
Object.keys(foo).forEach(property => {
  console.log(`${property}: ${foo[property]}`);
});

// outputs:
// a: 3        // from foo
// c: 4        // from foo

// The two loops produce the same results only when the prototype chain doesn't contain enumerable properties.


// 6.
// How do you create an object that doesn't have a prototype?
let bareObject = Object.create(null);
// How can you determine whether an object has a prototype?
if (Object.getPrototypeOf(obj)) {
  // obj has a prototype
} else {
  // obj does not have a prototype
}
