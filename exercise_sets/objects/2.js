// Buggy Code 2
// A grocery store uses a JavaScript function to calculate discounts on various items. 
// They are testing out various percentage discounts but are getting unexpected results. 
// Go over the code, and identify the reason why they aren't getting the expected discounted 
// prices from the function. Then, modify the code so that it produces the correct results.

let item = {
  name: 'Foo',
  description: 'Fusce consequat dui est, semper.',
  price: 50,
  quantity: 100,
  discount: function(percent) {
    let discount = this.price * percent / 100;

    return this.price - discount; // previous: this.price -= discount; return this.price
  },
};

console.log(item.discount(20));   // should return 40

console.log(item.discount(50));   // should return 25

console.log(item.discount(25));   // should return 37.5

// Every time we call `item.discount` method, the value of price property is updated
// It mutates item object.
// line 22 get calculated based on line 20. 
// So before new invocation, we need to make sure discount method will not mutate item object
