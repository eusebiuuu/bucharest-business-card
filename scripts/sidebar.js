const sidebar = document.querySelector('.sidebar');
const overlay = document.querySelector('.overlay');
const openSidebar = document.querySelector('.sidebar-open');
const closeSidebar = document.querySelector('.sidebar-close');
const sidebarList = document.querySelector('.sidebar-btns');

let options = ['home', 'parks', 'todolist', 'cafes', 'sports'];
let currentOption = 'home';

function changeContent(newOption) {
  currentOption = newOption;
  options.forEach(elem => {
    const containerClass = `.${elem}-container`;
    const container = document.querySelector(containerClass);
    if (elem != currentOption) {
      container.classList.add('hidden');
    } else if (container.classList.contains('hidden')) {
      container.classList.remove('hidden');
    }
  })
}

function closeTheSidebar() {
  overlay.classList.add('hidden');
  sidebar.classList.add('translate');
}

changeContent('home');

options.forEach(elem => {
  const newListItem = document.createElement('li');
  const sidebarBtn = document.createElement('button');
  sidebarBtn.innerHTML = elem;
  sidebarBtn.addEventListener('click', () => {
    changeContent(elem);
    closeTheSidebar();
  })
  newListItem.appendChild(sidebarBtn);
  sidebarList.appendChild(newListItem);
})

openSidebar.addEventListener('click', () => {
  overlay.classList.remove('hidden');
  sidebar.classList.remove('translate');
});

closeSidebar.addEventListener('click', () => {
  closeTheSidebar();
});
