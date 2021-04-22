const todoListElement = document.querySelector('#list');
const TRASH = '\u{1F5D1}';
class todoItem {
    constructor (id, titleOrObject, description, deadline, done) {
        // if (typeof titleOrObject === 'object') {
        //     this.id = id;
        //     Object.assign(this, titleOrObject);
        //     this.done = false;
        // } else {
        this.id = id;
        this.title = titleOrObject;
        this.description = description;
        this.deadline = deadline ? new Date(deadline) : '';
        this.done = done;
        // }
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
}

function listController(e) {
    deleteItem(e);
    checkDone(e);

}

function deleteItem (e) {
    if (e.target.nodeName === 'BUTTON') {
        e.currentTarget.removeChild(e.target.parentElement);
        todoList = todoList
            .filter(todoItem => todoItem['id'].toString() !== e.target.parentElement.id.split('_')[1]);
    }
}

function checkDone (e) {
    if (e.target.className === 'checkbox') {
        let item = e.target.parentElement;
        let id = item.id.split('_')[1] - 1;

        item.classList.toggle('done');

        todoList[id].done = !todoList[id].done;
    }
}

function appendTodoItem(item) {

    const {id, title, description, deadline, done} = item;

    let checkbox = `<input class="checkbox" type="checkbox" ${done ? 'checked' : ''} />`;
    let taskTitle = `<p class="title">${title.toUpperCase()}</p>`;
    let taskDescription = description ? `<p class="description">${description}</p>` : `<p class="description"></p>`;
    let taskDeadline = deadline ? `<p class="date${deadline <= Date.now() ? " overdue-date" : ''}">${deadline.toDateString()}</p>` : `<p class = "date"></p>`;

    const inner = `<section class="item${done ? ' done' : ''}" id="item_${id}">` + checkbox + taskTitle + taskDescription + taskDeadline + `<button class="delete">${TRASH}</button></section>`;

    todoListElement.innerHTML += inner;
}

function hideMade() {
    document.querySelector('#list').classList.toggle('only-open');
}

const todoItemForm = document.querySelector('#todoItem');

todoItemForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(todoItemForm);
    console.log(formData);
    const lastId = !!todoList[todoList.length - 1].id ? todoList[todoList.length - 1].id : 1;
    const todoitem = new todoItem(lastId + 1, formData.get('title'), formData.get('description'), formData.get('deadline'), false);
    todoList.push(todoitem);
    appendTodoItem(todoitem);
    todoItemForm.reset();
});