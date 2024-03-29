const todoContainer = document.querySelector('.main__todo-container');
let clearBtn = document.querySelector('.clear-todo-list');
const listsId = document.querySelector('.lists-id');
var form = document.querySelector('#main__form');
let inputText = form.elements.input;
const itemsKey = "items-list";
let storageArr = []



form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (inputText.value.trim() !== '') {
        let todoText = new Todo(inputText.value)
        storageArr.push(todoText)
        addItemToToDo(todoText)
        updateIds();
        inputText.value = ''
    } else {
        return null
    }
    
})

function saveToLocalStorage() {
    localStorage.setItem(itemsKey, JSON.stringify(storageArr));
}
function loadFromLocalStorage() {
    storageArr = JSON.parse(localStorage.getItem(itemsKey)) || []
    todoContainer.innerHTML = ''
    storageArr.forEach(item => {
        addItemToToDo(item)
    })
}
function clearLocalStorage() {
    localStorage.removeItem(itemsKey)
    storageArr = []
    todoContainer.innerHTML = '';
}

saveBtn.addEventListener('click', saveToLocalStorage);
loadBtn.addEventListener('click', loadFromLocalStorage);
localStorageClear.addEventListener('click', clearLocalStorage)

function addItemToToDo(item) {
    const itemId = storageArr.indexOf(item) + 1;
    todoContainer.innerHTML += `<ul class="main__todo-container-lists" data-id="${itemId}">
                                    <div class='lists-id'>${itemId}</div>    ${item.input}
                                    <div class="lists-block-text-and-img">
                                        <div class="div-for-img-check">
                                            <img class="img-check" src="img/check.png" alt="">
                                        </div>
                                        <div data-delete='delete' class="div-for-img-bin">
                                            <img class="img-bin" src="img/bin.png" alt="">
                                        </div>
                                    </div>
                                </ul>`
}


function updateIds() {
    const todoItems = document.querySelectorAll('.main__todo-container-lists');
    todoItems.forEach((item, index) => {
        item.dataset.id = index + 1;
        item.querySelector('.lists-id').textContent = index + 1;
    });
}

clearBtn.addEventListener('click', () => {
    todoContainer.innerHTML = ''
})


todoContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('img-check')) {
        e.target.closest('.main__todo-container-lists').classList.toggle('main__todo-container-lists-checked')
    }
    if (e.target.classList.contains('img-bin')) {
        const todoItem = e.target.closest('.main__todo-container-lists');
        const itemId = parseInt(todoItem.dataset.id);
        storageArr.splice(itemId - 1, 1);
        todoItem.remove();
        updateIds();
    }
})


const filterDropdown = document.querySelector('.filter_todo');

filterDropdown.addEventListener('change', filterTodo);

function filterTodo() {
    const todos = document.querySelectorAll('.main__todo-container-lists');

    todos.forEach(todo => {
        switch (filterDropdown.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains('main__todo-container-lists-checked')) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains('main__todo-container-lists-checked')) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}

class Todo {
    static count = 1
    constructor(inputText) {
        this.input = inputText
        this.id = Todo.count++
    }
}

/// STYLES

