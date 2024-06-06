const loginForm = document.getElementById('loginForm');
const loginFormParent = document.getElementById('login-form-parent');

loginFormParent.addEventListener('submit', (event) => {
  alert('click');
})

loginForm.addEventListener('submit', async (event) => {
  event.stopPropagation();
  event.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const res = await fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  });

  const response = await res.json();

  console.log(response);

  if (res.ok) {
    window.location.href = '/';
    alert(response.message);
  } else {
    alert(response.message);
  }
});

const goHome = document.querySelector('.go-home-delay');
goHome.addEventListener('click', () => {
  goHome.textContent = 'Loading...';
  setTimeout(() => {
    window.location.href = '/';
  }, 2000);
})