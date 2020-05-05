let cats = {
  names: [ 'Butterscotch', 'Pudding', 'Fluffy' ],
 foo() {
  [1, 2, 3].forEach(number => {
    console.log(`${number}: ${this.names[number - 1]}`);
  }, this);
}
}
cats.foo();
