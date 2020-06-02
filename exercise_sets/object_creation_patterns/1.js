/*

Ancestors
Implement an ancestors method that returns the prototype chain (ancestors) 
of a calling object as an array of object names. Here's an example output:

*/

// name property added to make objects easier to identify

// I add a ancestors method to foo

let foo = {
  name: 'foo',

  ancestors() {
    let prototype = Object.getPrototypeOf(this);

    if (prototype.hasOwnProperty('name')) {
      return [prototype.name].concat(prototype.ancestors());
    }

    return ['Object.prototype'];
  }
};

let bar = Object.create(foo);
bar.name = 'bar';  // every new object create its own name property
let baz = Object.create(bar);
baz.name = 'baz';
let qux = Object.create(baz);
qux.name = 'qux';

console.log(qux.ancestors());  // returns ['baz', 'bar', 'foo', 'Object.prototype']
console.log(baz.ancestors());  // returns ['bar', 'foo', 'Object.prototype']
console.log(bar.ancestors());  // returns ['foo', 'Object.prototype']
console.log(foo.ancestors());  // returns ['Object.prototype']

/*
foo: { name: 'foo' }
bar: { name: 'bar' }
baz: { name: 'baz' }
qux: { name: 'qux' }

qux ---> baz ---> bar ---> foo ---> Object.prototype
*/

