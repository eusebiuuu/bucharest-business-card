const todoForm = document.getElementById('todoForm');
const taskInput = document.getElementById('taskInput');
const todoList = document.getElementById('todoList');
const submitBtn = document.querySelector('#submit-todolist');
const indexInput = document.querySelector('#todolist-input');

const loadTasks = () => {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => {
    addTaskToDOM(task);
  });
};

const saveTask = (task) => {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

const removeTask = (taskText) => {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks = tasks.filter(task => task.content !== taskText);
  console.log(tasks);
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

const addTaskToDOM = (task) => {
  const li = document.createElement('li');
  li.style.borderColor = task.border;
  const span = document.createElement('span');
  span.textContent = task.content;
  const button = document.createElement('button');
  button.textContent = 'Delete';

  button.addEventListener('click', (e) => {
    const taskItem = e.currentTarget.parentElement;
    removeTask(taskItem.querySelector('span').textContent);
    taskItem.remove();
  });

  li.appendChild(span);
  li.appendChild(button);
  todoList.appendChild(li);
};

todoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const taskText = taskInput.value;
  addTaskToDOM({content: taskText, border: 'black' });
  saveTask({content: taskText, border: 'black' });
  taskInput.value = '';
});

loadTasks();

function generateRandomNumber() {
  const LIM = 256;
  return Math.floor(Math.random() * LIM);
}

function generateRandomColor() {
  return `rgb(${generateRandomNumber()}, ${generateRandomNumber()}, ${generateRandomNumber()})`;
}

submitBtn.addEventListener('click', () => {
  const idx = indexInput.value;
  indexInput.value = '';
  if (idx === '') {
    console.log('Input gol. Nici o valoare introdusa');
    return;
  }
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const numIdx = parseInt(idx, 10);
  if (tasks.length <= numIdx || numIdx < 0) {
    console.log('Index invalid');
    return;
  }
  const task = todoList.children[numIdx];
  task.style.borderColor = generateRandomColor();
  const styles = getComputedStyle(task);
  tasks[numIdx].border = styles.borderColor;
  localStorage.setItem('tasks', JSON.stringify(tasks));
  console.log(`Noua culoare a marginii este ${styles.borderColor}`);
})

setInterval(() => {
  console.log('Current tasks:', JSON.parse(localStorage.getItem('tasks')) || []);
}, 10000);