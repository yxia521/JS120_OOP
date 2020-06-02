// What is This
// Read the following code carefully. What do you think is logged on line 7. 
// Try to answer the question before you run the code.

let person = {
  firstName: 'Rick ',
  lastName: 'Sanchez',
  fullName: this.firstName + this.lastName,
};

console.log(person.fullName);

// NaN
// This is simply a get-the-value-of-a-property problem. person.fullName refers to the 
// value of this property, there's no method invocation nor function invocation, 
// this refers to the global object, global object does not have the firstName/lastName
// properties, as a result, both this.firstName & this.lastName resolve to undefined,
// undefined + undefined returns NaN

// Anywhere outside a function, this is bound to global object. If this is used inside
// a function, the value of this depends on how the function is invoked.
