class Library {
   constructor () {
      this.items = [];
   }

   addBook(title, author, isbn) {
      this.items.push({title:title.toLowerCase(), author:author.toLowerCase(), isbn:isbn.toLowerCase(), isAvailable:true});
   }

   borrowBook(isbn){
      const borrowedBook = this.items.find(item => item.isbn === isbn);

      if (!borrowedBook) {
         return "Sorry!! We don't the the book on our library.";
      }

      if (borrowedBook.isbn === isbn){
         if (borrowedBook.isAvailable) {
         
         borrowedBook.isAvailable = false;
      } else {
         return `The book ${isbn} is already borrowed. Please Try Again Later. Thank You!!`;
      }
      }
   };

   returnBook(isbn){
      // check if book exists
      const returnedBook = this.items.find(item => item.isbn === isbn);

      if(!returnedBook) {
         return "The book is not ours"
      };
      if(returnedBook.isAvailable){
         return "The book was never borrowed"
      } else {
         returnedBook.isAvailable = true;
      }
   }

   searchByAuthor(author){
      return this.items.filter(item => item.author === author.toLowerCase());
   }
      
}

const library = new Library();

// Add books
library.addBook("1984", "George Orwell", "123456");
library.addBook("Animal Farm", "George Orwell", "123457");
library.addBook("To Kill a Mockingbird", "Harper Lee", "123458");
library.addBook("The Great Gatsby", "F. Scott Fitzgerald", "123459");

console.log("=== TESTING BORROW ===");
console.log(library.borrowBook("123456"));
// ✅ Output: "You borrowed '1984'"

console.log(library.borrowBook("123456"));
// ✅ Output: "The book 123456 is already borrowed..."

console.log(library.borrowBook("999999"));
// ✅ Output: "Sorry!! We don't have the book in our library."

console.log("\n=== TESTING RETURN ===");
console.log(library.returnBook("123456"));
// ✅ Output: "'1984' has been returned"

console.log(library.returnBook("123456"));
// ✅ Output: "The book was never borrowed"

console.log(library.returnBook("888888"));
// ✅ Output: "The book is not ours"

console.log("\n=== TESTING SEARCH ===");
console.log(library.searchByAuthor("George Orwell"));
// ✅ Output: [
//   { title: '1984', author: 'george orwell', isbn: '123456', isAvailable: true },
//   { title: 'animal farm', author: 'george orwell', isbn: '123457', isAvailable: true }
// ]

console.log(library.searchByAuthor("Harper Lee"));
// ✅ Output: [
//   { title: 'to kill a mockingbird', author: 'harper lee', isbn: '123458', isAvailable: true }
// ]

console.log(library.searchByAuthor("Unknown Author"));
// ✅ Output: [] (empty array)
