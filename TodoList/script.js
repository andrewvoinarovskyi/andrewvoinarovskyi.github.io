const todoListElement = document.querySelector('#list');
const TRASH = '\u{1F5D1}';
class todoItem {
    constructor (id, titleOrObject, description, deadline, done) {
        if (typeof titleOrObject === 'object') {
            this.id = id;
            Object.assign(this, titleOrObject);
            this.done = false;
        } else {
            this.id = id;
            this.title = titleOrObject;
            this.description = description;
            this.deadline = deadline ? new Date(deadline) : '';
            this.done = done;
        }
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

    // let checkbox = document.querySelectorAll('.checkbox');

    // checkbox.forEach(box => box.addEventListener('click', (event) => {
    //     box.parentElement.classList.toggle('done');
    // }));

    // let deleteButton = document.querySelectorAll('.delete');
    //
    // deleteButton.forEach(btn => btn.addEventListener('click', (event) => {
    //     deleteItem(btn.parentElement);
    //     event.stopPropagation();
    // }));
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
        const {id, title, description, deadline, done} = item;

        let checkbox = `<input class="checkbox" type="checkbox" ${done ? 'checked' : 'unchecked'} />`;
        let taskTitle = `<p class="title">${title.toUpperCase()}</p>`;
        let taskDescription = description ? `<p class="description">${description}</p>` : `<p class="description"></p>`;
        let taskDeadline = deadline ? `<p class="date${deadline <= Date.now() ? " overdue-date" : ''}">${deadline.toDateString()}</p>` : `<p class = "date"></p>`;

        const inner = `<section class="item${done ? ' done' : ''}" id="item_${id}">` + checkbox + taskTitle + taskDescription + taskDeadline + `<button class="delete">${TRASH}</button></section>`;

        todoListElement.innerHTML += inner;

        addCheckboxesFunctional();

        let deleteButton = document.querySelectorAll('.delete');

        deleteButton.forEach(btn => btn.addEventListener('click', (event) => {
            deleteItem(btn.parentElement);
            event.stopPropagation();
        }));
    }
}

function addCheckboxesFunctional () {
    let checkbox = document.querySelector('.item:last-child');

    checkbox.addEventListener('click', () => {
        checkbox.parentElement.classList.toggle('done')
    });
}

const todoItemForm = document.forms['todoItem'];

todoItemForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(todoItemForm);
    const lastId = todoList[todoList.length - 1].id;
    const todoitem = new todoItem(lastId + 1, Object.fromEntries(formData.entries()));
    todoList.push(todoitem);
    appendTodoItem(todoitem);
    todoItemForm.reset();
});