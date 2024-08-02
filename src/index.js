const express = require('express');
const db = require('./config/db');
const app = express();
const port = 3000;

app.use(express.json());

const authentificator = require('./routes/auth/auth');
const todos = require('./routes/todos/todos');
const user = require('./routes/user/user');

app.post('/register', authentificator.register);
app.post('/login', authentificator.login);
app.post('/todos', todos.createTodo);

app.get('/todos', todos.findTodo);
app.get('/todos/:id', todos.findTodoByID);
app.get('/user', user.getUser);
app.get('/user/todos', user.getTodoByUser);
app.get('/users/:id_or_email', user.getUserByIdOrEmail);

app.put('/todos/:id', todos.updateTodoByID);
app.put('/users/:id', user.updateUserByID);

app.delete('/todos/:id', todos.deleteTodoByID);
app.delete('/users/:id', user.deleteUserByID);

app.listen(port, () => {

    console.log(`Server is running on port ${port}`);

});
