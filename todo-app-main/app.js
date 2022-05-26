/////////theme button///////
const themeBtn = document.querySelector(".theme");

themeBtn.addEventListener("click", function (e) {
  const theme = e.target.classList[1];
  if (theme === "light") {
    themeBtn.classList.value = `theme dark`;
  } else {
    themeBtn.classList.value = `theme light`;
  }
  document.querySelector("html").classList.value = `${theme}-theme`;
  document.querySelector(
    ".theme-bg-mobile"
  ).srcset = `./images/bg-mobile-${theme}.jpg`;
  document.querySelector(
    ".theme-bg-desktop"
  ).srcset = `./images/bg-desktop-${theme}.jpg`;
});

/////////////////////////
const form = document.querySelector(".form");
const input = document.querySelector(".form-todo");
const tasks = document.querySelector(".options");
const total = document.querySelector(".options-number");

let itemsNumber = 0;
const addTodo = function () {
  let todoText = input.value;
  const html = `
                      <div class="options-item active all" draggable="true">
                        <div class="options-wrapper" >
                          <div class="options-check">
                            <img class="options-img hidden" src="./images/icon-check.svg" alt="" />
                          </div>
                          <p class="options-text">${todoText}</p>
                        </div>

                        <img class="options-cross hidden" onclick="deleteItem(event)" src="./images/icon-cross.svg" alt="" />
                      </div>
              `;

  tasks.insertAdjacentHTML("afterbegin", html);

  input.value = "";
  itemsNumber++;

  updateItems(itemsNumber);
  finishTask();
  clearCompleted();
  showAll();
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  addTodo();
  showX();
});

const showX = function () {
  const tasks = document.querySelectorAll(".options-item");

  tasks.forEach(function (item) {
    const activeItem = item.children[1];

    item.addEventListener("mouseover", function (e) {
      activeItem.classList.remove("hidden");
    });
    item.addEventListener("mouseleave", function (e) {
      activeItem.classList.add("hidden");
    });
  });
};

const deleteItem = function (e) {
  e.target.closest("div").remove();
  if (e.target.closest("div").classList.contains("active")) {
    itemsNumber--;
    updateItems(itemsNumber);
  }
};

const updateItems = function (num) {
  total.innerText = `${num} items left`;
};

const finishTask = function () {
  let item = document.querySelector(".options-wrapper");
  item.addEventListener("click", function () {
    item.querySelector(".options-img").classList.toggle("hidden");
    item.children[0].classList.toggle("active-check");
    item.children[1].classList.toggle("completed");
    item.parentElement.classList.toggle("completed-task");
    item.parentElement.classList.toggle("active");
    if (
      item.parentElement.classList.value === "options-item all completed-task"
    ) {
      itemsNumber--;
      updateItems(itemsNumber);
    } else {
      itemsNumber++;
      updateItems(itemsNumber);
    }
  });
};

const clearCompleted = function () {
  let arr = Array.from(tasks.children);

  const clearBtn = document.getElementById("delete-all");
  clearBtn.addEventListener("click", function () {
    arr
      .filter((el) => {
        return el.classList.contains("completed-task");
      })
      .map((el) => {
        return el.closest("div").remove();
      });
  });
};

const filterItems = function (e) {
  const btns = document.querySelectorAll(".options-btn");
  e.target.classList.add("active-btn");

  btns.forEach((btn) => {
    if (btn !== e.target) {
      btn.classList.remove("active-btn");
    }
  });

  let filter = e.target;
  let filterSpecific = filter.dataset.filter;

  Array.from(tasks.children).forEach((item) => {
    if (item.classList.contains(filterSpecific)) {
      item.classList.add("options-item");
      item.classList.remove("hidden");
    } else {
      item.classList.remove("options-item");
      item.classList.add("hidden");
    }
  });
};

const showAll = function () {
  Array.from(tasks.children).forEach((i) => {
    i.classList.remove("hidden");
    i.classList.add("options-item");
  });
  const btns = document.querySelector(".options-main");
  Array.from(btns.children).forEach((btn) => {
    btn.classList.remove("active-btn");
  });
  const btnsMob = document.querySelector(".options-mobile");
  Array.from(btnsMob.children).forEach((btn) => {
    btn.classList.remove("active-btn");
  });
  document.getElementById("active").classList.add("active-btn");
  document.getElementById("active-mobile").classList.add("active-btn");
};

const dropItems = document.getElementById("drop-items");
new Sortable(dropItems, {
  animation: 850,
});
