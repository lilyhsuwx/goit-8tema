// 1.Створіть "закладки" — список посилань на важливі сторінки. Додавайте, видаляйте та редагуйте посилання в списку, зберігайте його в localStorage, щоб він залишався між сесіями. 

const inputEl = document.getElementById("bookmarkInput");
const btnEl = document.getElementById("addBookmarkBtn");
const listEl = document.getElementById("bookmarkList");


const  STORAGE_KEY = "inputValue"

const bookArray = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

createBookItems(bookArray);

btnEl.addEventListener("click", () => {
    const value = inputEl.value;
    bookArray.push(value);

    savedData();

    inputEl.value = "";
    createBookItems(bookArray);

});


function createBookItems(arr) {
    const item = arr.map((elem, index) => {
        return `<li id="${index}">
                    <a href="#">${elem}</a>
                    <div>
                        <button>Видалити</button>
                    </div>
                </li>`

    }).join("")
    listEl.innerHTML = item
};


listEl.addEventListener("click", (event) => {

    if(event.target.nodeName !== "BUTTON") {
        return
    }

    // const li = event.target.parentNode;
    const li = event.target.closest("li")
    
    console.log(li);
    
    const id =li.id
    console.log(id);
    bookArray.splice(id, 1);

    savedData();

    createBookItems(bookArray)

});


function savedData() {
   localStorage.setItem("STORAGE_KEY", JSON.stringify(bookArray)); 
};


// 2.Форма збереження даних

// Створіть просту форму з полями вводу і кнопкою, яка зберігає дані в localStorage. При наступному завантаженні сторінки зчитайте збережені дані з localStorage та відобразіть їх у відповідних полях вводу.

const username = document.getElementById("username");
const password = document.getElementById("password");
const saveBtn = document.getElementById("saveBtn");

saveBtn.addEventListener("click", () => {

    if (username.value === "" || password.value === "") {
        alert("Заповніть поле!");
        return;
    }

    let user = {
        name: username.value,
        password: password.value
    };

    localStorage.setItem("user", JSON.stringify(user));
});

let data = localStorage.getItem("user")

if (data) {
    let user = JSON.parse(data);

    username.value = user.name;
    password.value = user.password;
}



// 9. У файлі index.js підключіть масив даних і шаблон
// 10.Додайте поле пошуку для фільтрації продуктів

import {products} from "./data.js";
import template from "./template.hbs";

const root = document.getElementById("root");
const search = document.getElementById("search");

function render(items) {
  root.innerHTML = template({ products: items });
}

  render(products);

search.addEventListener("input", (a) => {

  const value = a.target.value.toLowerCase();

  const filtered = products.filter(product => product.name.toLowerCase().includes(value));

  render(filtered);
  
});