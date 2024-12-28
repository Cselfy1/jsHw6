const userList = document.querySelector('.user-list');
const todoList = document.querySelector('.todo-list');

async function fetchUsers() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const users = await response.json();
        displayUsers(users);
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

function displayUsers(users) {
    userList.innerHTML = '';
    users.forEach(user => {
        const li = document.createElement('li');
        li.textContent = user.name;
        li.classList.add('user-item');
        li.dataset.userId = user.id;
        li.addEventListener('click', () => fetchTodos(user.id));
        userList.appendChild(li);
    });
}

async function fetchTodos(userId) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`);
        const todos = await response.json();
        displayTodos(todos);
    } catch (error) {
        console.error('Error fetching todos:', error);
    }
}

function displayTodos(todos) {
    todoList.innerHTML = '';
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.textContent = `${todo.title} (${todo.completed ? 'Completed' : 'Pending'})`;
        li.classList.add('todo-item');
        todoList.appendChild(li);
    });
}

fetchUsers();
