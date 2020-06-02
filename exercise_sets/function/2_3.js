/*
The Franchise
The method franchise.allMovies is supposed to return the following array:

[
  'How to Train Your Dragon 1',
  'How to Train Your Dragon 2',
  'How to Train Your Dragon 3'
]

Explain why this method will not return the desired object? 
Try fixing this problem by taking advantage of JavaScript lexical scoping rules.
*/

let franchise = {
  name: 'How to Train Your Dragon',
  allMovies: function() {
    return [1, 2, 3].map(function(number) {
      return this.name + ' ' + number;
    });
  },
};

console.log(franchise.allMovies());

/*

function inside map is an inner function, which forms a nested relationship with outside function. 
JS strips method context even though we invoke franchise.allMovies as a method.
So JS sets the global object as the execution context for it, 
instead of the object we used to call the method - franchise. 
As a result, this.name resolves to undefined.

To fix:

1) handbound - use arrow function as the callback

let franchise = {
  name: 'How to Train Your Dragon',
  allMovies: function() {
    return [1, 2, 3].map(number => {
      return this.name + ' ' + number;
    });
  },
};

2) the lexical scoping rule - the variable defined in an outerscope can be accessed in an inner scope

let franchise = {
  name: 'How to Train Your Dragon',
  allMovies: function() {
    let self = this;
    return [1, 2, 3].map(function(number) {
      return self.name + ' ' + number;
    });
  },
};

3) handbound - use bind

let franchise = {
  name: 'How to Train Your Dragon',
  allMovies: function() {
    return [1, 2, 3].map(function(number) {
      return this.name + ' ' + number;
    }.bind(this));
  },
};

4) use optional argument for map

let franchise = {
  name: 'How to Train Your Dragon',
  allMovies: function() {
    return [1, 2, 3].map(function(number) {
      return this.name + ' ' + number;
    }, this);
  },
};

*/
