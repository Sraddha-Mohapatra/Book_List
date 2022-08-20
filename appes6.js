class Book{
    constructor(title,author,isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}
class UI{
    addBookToList(book){
            const list = document.getElementById("book-list");
            // Create tr element
            const row = document.createElement("tr");
            // Insert cols
            row.innerHTML = `
              <td>${book.title}</td>
              <td>${book.author}</td>
              <td>${book.isbn}</td>
              <td><a href="#" class="delete">X<a></td>
            `;
            list.appendChild(row);
        }
    showAlert(message,className){
            //create div
            const div = document.createElement("div");
            //Add classes
            div.className = `alert ${className}`;
            //Add text
            div.appendChild(document.createTextNode(message));
            //get parent
            const container = document.querySelector(".container");
            //get form
            const form = document.querySelector("#book-form");
            //insert alert
            container.insertBefore(div, form);
            //timeout
            setTimeout(function () {
              document.querySelector(".alert").remove();
             }, 3000);
        }
        deleteBook(target){
            if (target.className === "delete") {
                target.parentElement.parentElement.remove();
              }
        }
        clearFields(){
            document.getElementById("title").value = "";
            document.getElementById("author").value = "";
            document.getElementById("isbn").value = "";
           
        }
}
// local storage class
class store{
        static getBooks(){
            let books;
            if(localStorage.getItem('books') === null){
                books = [];
            }
            else{
                books = JSON.parse(localStorage.getItem('books'));
            }
            return books;
        }
        static displayBooks(){

            books.forEach(function(book){
              const ui = new UI;

              //Add book to UI
              ui.addBookToList(book);
            });
        }
        static addBook(book){
            const books = store.getBooks();

            books.push(book);
            localStorage.setItem('books', JSON.stringify(books));
        }
        
        static removeBook(isbn){
            const books = store.getBooks();

            books.forEach(function(book){
              if(book.isbn === isbn){
                books.splice(index,1)
              }
            });
            localStorage.setItem('books',JSON.stringify(books));
        }

}
// Event Listeners for add book
document.getElementById("book-form").addEventListener("submit", function (e) {
    // Get form values
    const title = document.getElementById("title").value,
      author = document.getElementById("author").value,
      isbn = document.getElementById("isbn").value;
  
    // Instantiate book
    const book = new Book(title, author, isbn);
  
    // Instantiate UI
    const ui = new UI();
  
    //validate
    if (title === "" || author === "" || isbn === "") {
      //Error alert
      ui.showAlert("please fill in all fields", "error");
    } else {
      // Add book to list
      ui.addBookToList(book);

      //add to local storage
      store.addBook(book);
      //show success
      ui.showAlert("book added", "success");
  
      // Clear fields
      ui.clearFields();
    }
  
    e.preventDefault();
  });
  
  //event listner for delete
  document.getElementById("book-list").addEventListener("click", function (e) {
    //instantiated UI
    const ui = new UI();

    //delete book
    ui.deleteBook(e.target);

    //remove book from ls
    store.removeBook(e.target.parentElement.previousElementSibling);
    //show alert
    ui.showAlert("book removed!", "success");
    e.preventDefault();
  });
  


