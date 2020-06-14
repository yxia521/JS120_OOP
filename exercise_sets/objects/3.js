// Testing Object Equality
// In JavaScript, comparing two objects either with == or === checks for object identity. 
// In other words, the comparison evaluates to true if it's the same object on either side of == or ===. 
// This is a limitation, in a sense, because sometimes we need to check if two objects have 
// the same key/value pairs. JavaScript doesn't give us a way to do that.

// Write a function objectsEqual that accepts two object arguments and 
// returns true or false depending on whether the objects have the same key/value pairs.

// check whether the keys are same and values are the same
// shallow equality
function objectsEqual(obj1, obj2) {
  return Object.keys(obj1).every(k => k === Object.keys(obj2).shift()) && Object.values(obj1).every(v => v === Object.values(obj2).shift());
}

console.log(objectsEqual({a: 'foo'}, {a: 'foo'}));                      // true
console.log(objectsEqual({a: 'foo', b: 'bar'}, {a: 'foo'}));            // false
console.log(objectsEqual({}, {}));                                      // true
console.log(objectsEqual({a: 'foo', b: undefined}, {a: 'foo', c: 1}));  // false


// One limitation of my solution: when the value is an object as well:
console.log(objectsEqual({pet: {dog: 'menger'}}, {pet: {dog: 'menger'}})); // false
// should return true

// --- LS sol ---

function objectsEqual(a, b) {
  if (a === b) {
    return true;
  }
  
  return (keysMatch(a, b) && valuesMatch(a, b));
}

function keysMatch(a, b) {
  let aKeys = Object.getOwnPropertyNames(a).sort();
  let bKeys = Object.getOwnPropertyNames(b).sort(); 
  
  if (aKeys.length !== bKeys.length) {
    return false;
  }

  return aKeys.every((key, index) => {
    return key === bKeys[index];
  });
}

function valuesMatch(a, b) {
  let aKeys = Object.getOwnPropertyNames(a).sort();
  let key;
  
  return aKeys.every(key => {
    return a[key] === b[key];
  });
}


