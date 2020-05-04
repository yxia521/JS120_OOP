// 1 we're creating duplicated books
let book1 = {
  Title: 'Mythos',
  Author: 'Stephen Fry',

  behavior() {
    console.log(`${this.Title} was written by ${this.Author}.`);
  }
}

let book2 = {
  Title: 'Me Talk Pretty One Day',
  Author: 'David Sedaris',

  behavior() {
    console.log(`${this.Title} was written by ${this.Author}.`);
  }
}

let book3 = {
  Title: "Aunts aren't Gentlemen",
  Author: 'PG Wodehouse',

  behavior() {
    console.log(`${this.Title} was written by ${this.Author}.`);
  }
}

book1.behavior();
book2.behavior();
book3.behavior();

// 3 implement a factory function
function createBook(title, author) {
  return {
    title: title,
    author: author,
    getDescription() {
      return `${this.title} was written by ${this.author}.`;
    },
  };
}

let book1 = createBook('Mythos', 'Stephen Fry');
let book2 = createBook('Me Talk Pretty One Day', 'David Sedaris');
let book3 = createBook("Aunts aren't Gentlemen", 'PG Wodehouse');

book1.getDescription();  // "Mythos was written by Stephen Fry."
book2.getDescription();  // "Me Talk Pretty One Day was written by David Sedaris."
book3.getDescription();  // "Aunts aren't Gentlemen was written by PG Wodehouse"

// use shorthand notation when a property and a variable have the same name:
function createBook(title, author) {
  return {
    title,    // same as `title: title,`
    author,
    getDescription() {
      return `${this.title} was written by ${this.author}.`;
    },
  };
}

// 4 Update the factory function so that it returns a book object that includes a property read that has an initial value of false.
function createBook(title, author, read) {
  return {
    title,    
    author,
    read: false,

    getDescription() {
      return `${this.title} was written by ${this.author}.`;
    },
  };
}

// 5 Modify the factory function to use an optional read parameter with a default value of false.
function createBook(title, author, read = false) {
  return {
    title,
    author,
    read,

    getDescription() {
      return `${this.title} was written by ${this.author}.`;
    },
  };
}

let book1 = createBook('Mythos', 'Stephen Fry');
let book2 = createBook('Me Talk Pretty One Day', 'David Sedaris', false);
let book3 = createBook("Aunts aren't Gentlemen", 'PG Wodehouse', true);

console.log(book1.read); // => false
console.log(book2.read); // => false
console.log(book3.read); // => true

// 6 Let's add a method, readBook, that marks a book object as read by setting the read property to true:
function createBook(title, author, read = false) {
  return {
    title,
    author,
    read,

    getDescription() {
      return `${this.title} was written by ${this.author}.`;
    },

    readBook() {
      this.read = true;
    },
  };
}

let book1 = createBook('Mythos', 'Stephen Fry');
book1.readBook();
console.log(book1.read); // => true

// 7 Finally, let's update getDescription function to reflect the read state directly, For instance:
function createBook(title, author, read = false) {
  return {
    title,
    author,
    read,

    readBook() {
      this.read = true;
    },
    
    getDescription() {
      return `${this.title} was written by ${this.author}. ` + `I ${this.read ? 'have': "haven't"} read it.`
    },
  };
}

let book1 = createBook('Mythos', 'Stephen Fry');
console.log(book1.getDescription()); // Mythos was written by David Fry. I haven't read it.
book1.readBook();
console.log(book1.getDescription()); // Mythos was written by David Fry. I have read it.

