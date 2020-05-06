// 1. Use a factory function to create pet objects. The factory should let us create and use pets like this:

let pudding = createPet("Cat", "Pudding");
console.log(`I am a ${pudding.animal}. My name is ${pudding.name}.`);
pudding.sleep(); // I am sleeping
pudding.wake();  // I am awake

let neptune = createPet("Fish", "Neptune");
console.log(`I am a ${neptune.animal}. My name is ${neptune.name}.`);
neptune.sleep(); // I am sleeping
neptune.wake();  // I am awake

function createPet(animal, name) {
  return {
    animal,
    name,

    sleep() {
      console.log('I am sleeping');
    },

    wake() {
      console.log('I am awake');
    },
  };
}

// 2. Use the OLOO pattern to create an object prototype that we can use to create pet objects. The prototype should let us create and use pets like this:

let PetPrototype = {
  sleep() {
    console.log('I am sleeping');
  },

  wake() {
    console.log('I am awake');
  },

  init(animal, name) { // init returns a reference to `pudding` object
    this.animal = animal;
    this.name = name;
    return this; // the execution context is `pudding` object
  },
};

let pudding = Object.create(PetPrototype).init("Cat", "Pudding");
console.log(`I am a ${pudding.animal}. My name is ${pudding.name}.`);
pudding.sleep(); // I am sleeping
pudding.wake();  // I am awake
console.log(pudding.init("Cat", "Pudding")); // { animal: 'Cat', name: 'Pudding' }

let neptune = Object.create(PetPrototype).init("Fish", "Neptune");
console.log(`I am a ${neptune.animal}. My name is ${neptune.name}.`);
neptune.sleep(); // I am sleeping
neptune.wake();  // I am awake


