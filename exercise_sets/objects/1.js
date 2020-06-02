// Buggy Code 1
// The code below is expected to output the following when run:

let helloVictor = createGreeter('Victor');
helloVictor.greet('morning');
// Good Morning Victor

function createGreeter(name) {
  return {
    name: name,
    morning: 'Good Morning',
    afternoon: 'Good Afternoon',
    evening: 'Good Evening',
    greet: function(timeOfDay) {
      let msg = '';
      switch (timeOfDay) {
        case 'morning':
          msg += `${this.morning} ${name}`;   // add this
          break;
        case 'afternoon':
          msg += `${this.afternoon} ${name}`; // add this
          break;
        case 'evening':
          msg += `${this.evening} ${name}`;   // add this
          break;
      }

      console.log(msg);
    },
  };
}

// However, it instead results in an error. What is the problem with the code? 
// Why isn't it producing the expected results?

// The problem is that it didn't use `this` keyword to access the properties of the object
// returned by calling createGreeter function.

// We don't have to add this to name, because, name refers to the string argument
// passed to createGreeter function.
// Add this to name -- this.name -- makes sense as well. this.name refers to the value of
// property name, which is the same thing as name.
