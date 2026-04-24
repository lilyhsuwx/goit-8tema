// 1.Створіть "закладки" — список посилань на важливі сторінки. Додавайте, видаляйте та редагуйте посилання в списку, зберігайте його в localStorage, щоб він залишався між сесіями. 

const bookmarkInput = document.getElementById("bookmarkInput");
const addBookmarkBtn = document.getElementById("addBookmarkBtn");
const bookmarkList = document.getElementById("bookmarkList");

let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) ;

function show() {
  bookmarkList.innerHTML = "";

  for (let i = 0; i < bookmarks.length; i++) {
    let li = document.createElement("li");

    let a = document.createElement("a");
    a.href = bookmarks[i];
    a.textContent = bookmarks[i];

    let btn = document.createElement("button");
    btn.textContent = "X";
    btn.classList.add("delete");

    btn.addEventListener("click", () => {
      bookmarks.splice(i, 1);
      localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
      show();
    });

    li.appendChild(a);
    li.appendChild(btn);
    bookmarkList.appendChild(li);
  }
}

addBookmarkBtn.addEventListener("click", () => {
  let value = bookmarkInput.value.trim();

  if (value === "") {
    alert("Поле не може бути пустим!");
    return;
  }

  bookmarks.push(value);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

  bookmarkInput.value = "";
  show();
});

show();


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