import { Todo } from '../todos/models/todo.model'

export const filters = {
    All: 'all',
    Completed: 'completed',
    Pending: 'Pending'
}

const state = {
    todos: [
        new Todo('Piedra del alma'),
        new Todo('Piedra del espacio'),
        new Todo('Piedra del tiempo'),
        new Todo('Piedra del poder'),
        new Todo('Piedra del realidad'),
    ],
    filter: filters.All,
}

const initStore = () => {
    loadStore();
    console.log('InitStore 🍍');
}

const loadStore = () => {
    
    if( !localStorage.getItem('state') ) return;

    const {todos = [], filter = filters.All} = JSON.parse(localStorage.getItem('state'));

    state.todos = todos;
    state.filter = filter;
    
}

const saveStateLocalStorage = () => {     
    localStorage.setItem('state', JSON.stringify(state))
}

const getTodos = (filter = filters.All) => {
    switch (filter) {
        case filters.All:
            return [...state.todos]
        case filters.Completed:
            return state.todos.filter(todo => todo.done)
        case filters.Pending:
            return state.todos.filter(todo => !todo.done)
        default:
            throw new Error(`Option ${filter} is not valid.`)
    }
}


/**
 * 
 * @param {String} description 
 */
const addTodo = (description) => {
    if (!description) throw new Error('Description is required')
    state.todos.push(new Todo(description));
    saveStateLocalStorage();
}

const toogleTodo = (todoId) => {
    state.todos = state.todos.map(todo => {
        if (todo.id === todoId) {
            todo.done = !todo.done;
        }
        return todo;
    })
    saveStateLocalStorage();
}

const deleteTodo = (todoId) => {
    state.todos = state.todos.filter(todo => todo.id !== todoId);
    saveStateLocalStorage();

}

const deleteCompleted = () => {
    state.todos = state.todos.filter(todo => !todo.done);
    saveStateLocalStorage();
}

/**
 * 
 * @param {filters} newFilter 
 */
const setFilter = (newFilter = filters.All) => {
    state.filter = newFilter;
    saveStateLocalStorage();

}

const getCurrentFilter = () => {
    return state.filter;
}

export default {
    addTodo,
    deleteCompleted,
    deleteTodo,
    getCurrentFilter,
    getTodos,
    initStore,
    loadStore,
    setFilter,
    toogleTodo,
}