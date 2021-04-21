class todoItem {
    constructor (id, title, description, dueDate, done) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate ? new Date (dueDate) : '';
        this.done = done;
    }
}

function appendTodoItem(item) {
    const {id, title, description, dueDate, done} = item;

    let taskDescription = description ? `<p class="description">${description}</p>` : `<p class="description"></p>`;
    let taskDueDate = dueDate ? `<p class="date${dueDate <= Date.now() ? " overdue-date": ''}">${dueDate.toDateString()}</p>` :`<p class = "date"></p>`;
    let checkbox = `<input type="checkbox"${done ? ' checked' : 'unchecked'} />`;
    let taskTitle = `<p class="title${done ? ' line-through' : ''}">${title.toUpperCase()}</p>`;
    const inner = `<section id="item_${id}">` + checkbox + taskTitle + taskDescription + taskDueDate + `</p></section>`;

    console.log(inner);
    todoListElement.innerHTML += inner;
}

let todoList = [
    new todoItem(1, `describe array of todos`, 'some description', '', true),
    new todoItem(2, `add todos in array`, 'some another description', '2021-05-01', false),
    new todoItem(3, `make output's layout`, '', '2021-04-19', false),
];

const todoListElement = document.querySelector('#list');


todoList.forEach(appendTodoItem);
