let myLibrary = [];

//Dom Elements

const newButton = document.querySelector('.new');
const buttonGroup = document.querySelector('.buttonGroup');
const returnButton = document.querySelector('#return');
const form = document.querySelector('.form');
const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const pagesInput = document.querySelector('#pages');
const isReadInput = document.querySelector('#isRead');
const submitButton = document.querySelector('#submit');
const formTitle = document.querySelector('.formWrapper')

// table dom el
const table = document.querySelector('.table');
const tbody = table.querySelector('tbody');

function Book(title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
}

function addBookToLibrary(){
  let title = titleInput.value;
  let author = authorInput.value;
  let pages = pagesInput.value;
  let read = getReadValue();
  let newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}

const populateStorage = () => {
  localStorage.setItem('library', JSON.stringify(myLibrary));
}

const getStorage = () => {
  myLibrary = JSON.parse(localStorage.getItem('library'));
}

const getReadValue = () => {
  if(form.querySelector('input[name="read"]:checked').value == 'yes') return true;
  else return false;
}

function toggleHiddenElements() {
  form.classList.toggle('hidden');
  table.classList.toggle('hidden');
  newButton.classList.toggle('hidden');
  buttonGroup.classList.toggle('hidden')
  formTitle.classList.toggle('hidden');
}

function createReadStatusTd(book) {
  let readStatusTd = document.createElement('td');
  let readStatusButton = document.createElement('button');
  readStatusButton.textContent = 'Change read status';
  readStatusButton.addEventListener('click', () => {
    book.read = !book.read;
    updateTable();
  })
  readStatusTd.appendChild(readStatusButton);
  return readStatusTd;
} 

const removeFromLibrary = (index) => {
  myLibrary.splice(index, 1)
  submitButton.removeEventListener('click', removeFromLibrary);
  updateTable();
}

const createEditTd = (book, index) => {
  let editTd = document.createElement('td');
  let editButton = document.createElement('button');
  editButton.textContent = 'Edit';
  editButton.addEventListener('click', () => {
    titleInput.value = book.title;
    authorInput.value = book.author
    pagesInput.value = book.pages
    book.read ? form.querySelector('#yes').checked = true : form.querySelector('#no').checked = true;
    toggleHiddenElements();
    updateTable();
    submitButton.addEventListener('click', removeFromLibrary);
  });
  editTd.appendChild(editButton);
  return editTd;
}

const createDeleteTd = (index) => {
  let deleteTd = document.createElement('td');
  let deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', () => {
    myLibrary.splice(index, 1);
    updateTable();
  });
  deleteTd.appendChild(deleteButton);
  return deleteTd;
}

function updateTable() {
  tbody.textContent = '';
  
  myLibrary.forEach((book, index) => {
    let row = document.createElement('tr');
    Object.keys(book).forEach(prop => {
      let newTd = document.createElement('td');
      newTd.textContent = book[prop];
      row.appendChild(newTd);
    });
    row.appendChild(createReadStatusTd(book));
    row.appendChild(createEditTd(book, index));
    row.appendChild(createDeleteTd(index));
    tbody.appendChild(row);
  })
  populateStorage();
}

// event listeners
submitButton.addEventListener('click', () => {
  addBookToLibrary();
  updateTable();
  toggleHiddenElements();
  console.log(myLibrary);
})

returnButton.addEventListener('click', () => {
  toggleHiddenElements();
})

newButton.addEventListener('click', () => {
  toggleHiddenElements();
})

if(!localStorage.getItem('library')) {
  populateStorage();
} else {
  getStorage();
}

updateTable();
;


// const theHobbit = new Book('The Hobbit', 'J.R.R Tolkien', 300, false);

// console.log(theHobbit.info())
