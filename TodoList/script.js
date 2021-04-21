const todoListElement = document.querySelector('#list');
const TRASH = '\u{1F5D1}';
class todoItem {
    constructor (id, title, description, dueDate, done) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate ? new Date (dueDate) : '';
        this.done = done;
    }
}

let todoList = [
    new todoItem(1, `describe array of todos`, 'some description', '', true),
    new todoItem(2, `add todos in array`, 'some another description', '2021-05-01', false),
    new todoItem(3, `make output's layout`, '', '2021-04-19', false),
];

render(todoList);

function render (list) {
    todoListElement.innerHTML = "";

    list.forEach(appendTodoItem);

    let checkbox = document.querySelectorAll('.checkbox');

    checkbox.forEach(box => box.addEventListener('click', (event) => {
        box.parentElement.classList.toggle('done');
    }));

    let deleteButton = document.querySelectorAll('.delete');

    deleteButton.forEach(btn => btn.addEventListener('click', (event) => {
        deleteItem(btn.parentElement);
        event.stopPropagation();
    }));
}

function hideMade() {
    document.querySelector('#list').classList.toggle('only-open');
}

function deleteItem(element) {
    todoList = todoList.filter(todoItem => todoItem['id'].toString() !== element.id.split('_')[1]);
    element.parentElement.removeChild(element);
}

function appendTodoItem(item) {
    if (item !== null) {
        const {id, title, description, dueDate, done} = item;

        let checkbox = `<input class="checkbox" type="checkbox" ${done ? 'checked' : 'unchecked'} />`;
        let taskTitle = `<p class="title">${title.toUpperCase()}</p>`;
        let taskDescription = description ? `<p class="description">${description}</p>` : `<p class="description"></p>`;
        let taskDueDate = dueDate ? `<p class="date${dueDate <= Date.now() ? " overdue-date" : ''}">${dueDate.toDateString()}</p>` : `<p class = "date"></p>`;

        const inner = `<section class="item${done ? ' done' : ''}" id="item_${id}">` + checkbox + taskTitle + taskDescription + taskDueDate + `<button class="delete">${TRASH}</button></section>`;

        todoListElement.innerHTML += inner;
    }
}