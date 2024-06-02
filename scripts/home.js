const BASE_URL = 'http://localhost:5000';
const data = fetch(`${BASE_URL}/user`)
.then(res => res.json())
.then(data => {
  console.log(data);
  const logoutBtn = document.querySelector('.logout-btn');
  const loginBtn = document.querySelector('.login-btn');
  
  logoutBtn.addEventListener('click', async () => {
    const response = await fetch('/logout', {
      method: 'POST'
    });
    if (response.ok) {
      window.location.href = '/login';
    } else {
      alert('Logout failed!');
    }
  });
  
  if (data) {
    loginBtn.classList.add('hidden');
    if (logoutBtn.classList.contains('hidden')) {
      logoutBtn.classList.remove('hidden');
    }
  } else {
    logoutBtn.classList.add('hidden');
    if (loginBtn.classList.contains('hidden')) {
      loginBtn.classList.remove('hidden');
    }
  }
});
