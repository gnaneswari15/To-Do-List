document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    // Function to add a new task
    function addTask(taskText) {
        const taskItem = document.createElement('li');
        taskItem.textContent = taskText;
        taskItem.addEventListener('click', toggleTask);
        taskList.appendChild(taskItem);
    }

    // Function to toggle task completion
    function toggleTask() {
        this.classList.toggle('completed');
        saveTasks();
    }

    // Function to save tasks to local storage
    function saveTasks() {
        const tasks = [];
        const taskItems = document.querySelectorAll('#taskList li');
        taskItems.forEach(taskItem => {
            tasks.push(taskItem.textContent);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to load tasks from local storage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks'));
        if (tasks) {
            tasks.forEach(task => addTask(task));
        }
    }

    // Function to prompt user to continue adding tasks or view saved tasks
    function promptNextAction() {
        const continueAdding = confirm('Do you want to continue adding tasks?');
        if (continueAdding) {
            taskInput.value = '';
            taskInput.focus();
        } else {
            showSavedTasks();
        }
    }

    // Function to display saved tasks
    function showSavedTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks'));
        if (tasks) {
            alert('Saved Tasks:\n' + tasks.join('\n'));
        } else {
            alert('No tasks saved.');
        }
    }

    // Event listener for the Add Task button
    addTaskBtn.addEventListener('click', function() {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTask(taskText);
            saveTasks();
            promptNextAction();
        }
    });

    // Event listener for pressing Enter key to add task
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            const taskText = taskInput.value.trim();
            if (taskText !== '') {
                addTask(taskText);
                saveTasks();
                promptNextAction();
            }
        }
    });

    // Load tasks from local storage when the page loads
    loadTasks();
});
