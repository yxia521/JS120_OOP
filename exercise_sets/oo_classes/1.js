/*
Name the Constructor
Update the following code so that, instead of logging the values, 
each statement logs the name of the constructor to which it belongs.
*/

console.log(Object.getPrototypeOf("Hello").constructor.name);
console.log(Object.getPrototypeOf([1,2,3]).constructor.name);
console.log(Object.getPrototypeOf({name: 'Srdjan'}).constructor.name);

/*
Expected output:

String
Array
Object

--- ls sol ---

console.log("Hello".constructor.name);
console.log([1,2,3].constructor.name);
console.log({name: 'Srdjan'}.constructor.name);

The result between mine and this sol is identical:
"Hello".constructor                           => [Function: String]
Object.getPrototypeOf("Hello").constructor    => [Function: String]

We can write it short (instead of Object.getPrototype...) is because JS uses prototype chain
to look up for the constructor property, the instance object "Hello", [1,2,3] {name: 'Srdjan'}
created by these constructors don't have their own constructor property, but JS searches in
the prototype chain and finds it their prototype objects, so we can directly call constructor
on all instances objects. 
*/


