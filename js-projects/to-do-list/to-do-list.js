document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById('submit');
    const todoInput = document.getElementById('input');
    const todoList = document.getElementById('todo-list');

    // Load tasks from localStorage
    loadTasks();

    addButton.addEventListener('click', addTodo);

    todoInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTodo();
        }
    });

    function addTodo() {
        const todoText = todoInput.value.trim();
        if (todoText === '') {
            alert('Please enter a task');
            return;
        }

        const todo = {
            text: todoText,
            completed: false
        };

        const listItem = createTodoElement(todo);
        todoList.insertBefore(listItem, todoList.firstChild);

        saveTasks();

        todoInput.value = '';
        todoInput.focus();
    }

    function createTodoElement(todo) {
        const listItem = document.createElement('li');
        listItem.className = 'todo-item';
        if (todo.completed) {
            listItem.classList.add('completed');
        }

        const todoTextElement = document.createElement('div');
        todoTextElement.className = 'todo-text';
        todoTextElement.textContent = todo.text;
        listItem.appendChild(todoTextElement);

        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'button-container';

        const completeButton = document.createElement('button');
        completeButton.textContent = 'Complete';
        completeButton.className = 'complete-button';
        completeButton.addEventListener('click', function() {
            listItem.classList.add('completed');
            todo.completed = true;
            completeButton.disabled = true;
            saveTasks();
            triggerConfetti();
        });

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-button';
        removeButton.addEventListener('click', function() {
            todoList.removeChild(listItem);
            saveTasks();
        });

        const renameButton = document.createElement('button');
        renameButton.textContent = 'Rename';
        renameButton.className = 'rename-button';
        renameButton.addEventListener('click', function() {
            const newTodoText = prompt('Rename task:', todo.text);
            if (newTodoText !== null && newTodoText.trim() !== '') {
                todoTextElement.textContent = newTodoText;
                todo.text = newTodoText;
                saveTasks();
            }
        });

        buttonContainer.appendChild(completeButton);
        buttonContainer.appendChild(renameButton);
        buttonContainer.appendChild(removeButton);

        listItem.appendChild(buttonContainer);

        return listItem;
    }

    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('.todo-item').forEach(function(listItem) {
            const textElement = listItem.querySelector('.todo-text');
            tasks.push({
                text: textElement.textContent,
                completed: listItem.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(function(task) {
            const listItem = createTodoElement(task);
            todoList.appendChild(listItem);
        });
    }

    function triggerConfetti() {
        const confettiContainer = document.createElement('div');
        confettiContainer.className = 'confetti';
        document.body.appendChild(confettiContainer);

        for (let i = 0; i < 300; i++) {
            const confettiPiece = document.createElement('div');
            confettiPiece.className = 'confetti-piece';
            confettiPiece.style.left = Math.random() * 100 + 'vw';
            confettiPiece.style.width = Math.random() * 10 + 5 + 'px';
            confettiPiece.style.height = Math.random() * 10 + 5 + 'px';
            confettiPiece.style.backgroundColor = getRandomColor();
            confettiPiece.style.animationDelay = Math.random() * 0.5 + 's';
            confettiPiece.style.animationDuration = (Math.random() * 0.5 + 1.5) + 's';
            confettiContainer.appendChild(confettiPiece);
        }

        setTimeout(() => {
            document.body.removeChild(confettiContainer);
        }, 2000);
    }

    function getRandomColor() {
        const colors = ['#ff0a0a', '#0aff0a', '#0a0aff', '#ffff0a', '#ff0aff', '#0affff', '#ff7400', '#ff00ff', '#00ffcc', '#cccccc'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
});
