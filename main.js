const myLibrary= [];

function Book(title, author, pages, read, uuId) {
    if (!new.target) {
        throw new Error("You must user de 'new' operator to call a constructor ");  
    };

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.uuId = uuId;
};

Book.prototype.info = function() {
    return `<p><strong>${this.title},</strong> written by ${this.author}, ${this.pages} pages, ${this.read ? "<span class=span1 style='color: red;'>Not read yet</span>" : "<span class=span2 style='color: green;'>Already read</span>"}</p>`;   
};

Book.prototype.toggleRead = function() {
  this.read = !this.read;
};


const btn = document.getElementById('addBook');
const dialog = document.getElementById('myDialog');
const btnCreateBook = document.getElementById('myform');
const container = document.getElementById('container');

btn.addEventListener('click', () => {
    dialog.showModal();
});

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read, crypto.randomUUID());
    myLibrary.push(newBook);
};

btnCreateBook.addEventListener('submit', (event) => {
    event.preventDefault();
    addBookToLibrary(title.value, author.value, pages.value, read.checked);
    renderBook();
    
    title.value = "";
    author.value = "";
    pages.value = "";
    read.checked = false;

    dialog.close();
});

function renderBook (){

    container.innerHTML = "";

    myLibrary.forEach( book => {
        const bookDiv = document.createElement('div');
        bookDiv.innerHTML = book.info();

        const btnRemove = document.createElement('button');
        btnRemove.textContent = 'Remove';
        
        btnRemove.dataset.uuId = book.uuId;

        const btnRead = document.createElement('button');
        btnRead.textContent = book.read ? "Read" : "Not Read";

        btnRead.dataset.uuId = book.uuId;

        btnRemove.addEventListener('click', (event) => {
            const idBook = event.currentTarget.dataset.uuId;
            const index = myLibrary.findIndex(book => book.uuId === idBook);
            if (index !== -1) { myLibrary.splice(index, 1)};
            renderBook(); 
        });      

        btnRead.addEventListener('click', (event) => {
        const idBook2 = event.currentTarget.dataset.uuId;
        const index = myLibrary.findIndex(book => book.uuId === idBook2);
        if (index !== -1) {myLibrary[index].toggleRead()
        btnRead.textContent = myLibrary[index].read ? "Read" : "Not Read"}
        renderBook(); 
        });

        container.appendChild(bookDiv);
        bookDiv.appendChild(btnRemove);
        bookDiv.appendChild(btnRead);
        
    });
    
};







