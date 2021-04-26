const todoListElement = document.querySelector('#list');
const TRASH = '\u{1F5D1}';

class todoItem {
    constructor (idOrObject, title, description, dueDate, done) {
        if (typeof idOrObject === 'object') {
            Object.assign(this, idOrObject);
            this.done = false;
        } else {
            this.id = idOrObject;
            this.title = title;
            this.description = description;
            this.dueDate = dueDate ? new Date(dueDate) : '';
            this.done = done;
        }
    }
}

function listController(e) {
    deleteItem(e);
    changeDone(e);
}

function deleteItem (e) {
    if (e.target.nodeName === 'BUTTON') {
        e.currentTarget.removeChild(e.target.parentElement);

        let item = e.target.parentElement;
        let id = item.id.split('_')[1];

        deleteTodoItem(id);
    }
}

function changeDone (e) {
    if (e.target.className === 'checkbox') {
        let item = e.target.parentElement;
        let id = item.id.split('_')[1];

        item.classList.toggle('done');

        closeOrOpen(id, item.classList.contains('done'));
    }
}

function appendTodoItem(item) {
    const {id, title, description, dueDate, done} = item;
    let deadline;
    if (dueDate !== null) {
        deadline = new Date(dueDate);
    } else {
        deadline = null;
    }

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
    const item = new todoItem(Object.fromEntries(formData.entries()));
    item.dueDate = new Date(item.dueDate);
    createTodoItem(item)
        .then(appendTodoItem, alert)
        .then(todoItemForm.reset());
});


const todoListEndpoint = 'http://127.0.0.1:5000/lists/1';
const slash = '/';

fetch(todoListEndpoint)
    .then(response => response.json())
    .then(todoItem => todoItem.forEach(appendTodoItem))
    .catch(handleError)

function handleError() {
    todoListElement.innerText = "Can't load contacts :(";
}

function createTodoItem(todoItem) {
    return fetch(todoListEndpoint, {
        method: 'POST',
        headers:  {
            'Content-Type': 'application/json-patch+json'
        },
        body: JSON.stringify(todoItem)
    })
        .then(response => response.json())
}

function closeOrOpen(id, isDone) {
    return fetch(todoListEndpoint + slash + id, {
        method: 'PATCH',
        headers:  {
            'Content-Type': 'application/json-patch+json'
        },
        body: JSON.stringify([{ op : "replace", path : "/done", value : isDone }])
});
}

function deleteTodoItem(id) {
    return fetch(todoListEndpoint + slash + id, {
        method: 'DELETE',
    });
}