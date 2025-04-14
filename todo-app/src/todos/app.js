import todoStore, {filters} from '../store/todo.store';
import html from './app.html?raw'
import { renderTodos, renderPending } from './use-cases';


const ElementIDs = {
    clearCompleted: '.clear-completed',
    TodoList: '.todo-list',
    newTodoInput: '#new-todo-input',
    TodoFilters: '.filtro',
    PendingCountLabel: '#pending-count',
}

/**
 * 
 * @param {String} elementId
 */
export const App = (elementId) => {
    const displayTodos = () => {
        const todos = todoStore.getTodos(todoStore.getCurrentFilter());
        renderTodos(ElementIDs.TodoList, todos)
        updatePendingCount();
    }

    const updatePendingCount = () => {
        renderPending( ElementIDs.PendingCountLabel );
    }
    // Cuando la funcion App() se llama
    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
        displayTodos();
    })();

    //Referencias HTML

    const newDescription = document.querySelector( ElementIDs.newTodoInput );
    const todoListUl = document.querySelector( ElementIDs.TodoList );
    const clearCompletedButton = document.querySelector( ElementIDs.clearCompleted );
    const filtersLIs = document.querySelectorAll( ElementIDs.TodoFilters )
    //Listeners
    newDescription.addEventListener('keyup', (event) => {

        if (event.keyCode !== 13) return;
        if (event.target.value.trim().length === 0) return;

        todoStore.addTodo(event.target.value);
        displayTodos();
        event.target.value = '';

    });

    todoListUl.addEventListener('click', (event) => {
        const element = event.target.closest('[data-id]')
        todoStore.toogleTodo( element.getAttribute('data-id') );
        displayTodos()

    });

    todoListUl.addEventListener('click', (event) => {
        
        const isDestroyElement = event.target.className === 'destroy';
        const element = event.target.closest('[data-id]');
        if ( !element || !isDestroyElement ) return;

        todoStore.deleteTodo( element.getAttribute('data-id') );
        displayTodos();
    })

    clearCompletedButton.addEventListener('click',() => {
        todoStore.deleteCompleted();
        displayTodos();
    })

    filtersLIs.forEach( element => {
        element.addEventListener('click', (element) => {
            filtersLIs.forEach((el) => el.classList.remove('selected'))
            element.target.classList.add('selected')

            switch ( element.target.text ) {
                case 'Todos':
                    todoStore.setFilter( filters.All );
                    break;
                case 'Pendientes':
                    todoStore.setFilter( filters.Pending );
                    break;
                case 'Completados':
                    todoStore.setFilter( filters.Completed );
                    break;
                default:
                    break;
            }
            displayTodos()
            
        });
    });
}