// Testing Object Equality
// In JavaScript, comparing two objects either with == or === checks for object identity. 
// In other words, the comparison evaluates to true if it's the same object on either side of == or ===. 
// This is a limitation, in a sense, because sometimes we need to check if two objects have 
// the same key/value pairs. JavaScript doesn't give us a way to do that.

// Write a function objectsEqual that accepts two object arguments and 
// returns true or false depending on whether the objects have the same key/value pairs.

function objectsEqual(obj1, obj2) {
  let k1 = Object.keys(obj1).sort();
  let k2 = Object.keys(obj2).sort();
  let keyMatch = k1.every((value, idx) => value === k2[idx]);

  let v1 = Object.values(obj1).sort();
  let v2 = Object.values(obj2).sort();
  let valueMatch = v1.every((value, idx) => value === v2[idx]);

  return  keyMatch && valueMatch;
}

console.log(objectsEqual({a: 'foo'}, {a: 'foo'}));                      // true
console.log(objectsEqual({a: 'foo', b: 'bar'}, {a: 'foo'}));            // false
console.log(objectsEqual({}, {}));                                      // true
console.log(objectsEqual({a: 'foo', b: undefined}, {a: 'foo', c: 1}));  // false
console.log(objectsEqual({a: 'foo', c: 1}, {c: 1, a: 'foo'}));          // true

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

// One limitation of both solutions: when the value is an object
console.log(objectsEqual({pet: {dog: 'menger'}}, {pet: {dog: 'menger'}})); // false
// should return true
