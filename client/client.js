document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      sendLoginRequest(username, password);
    });
  }

  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const username = document.getElementById('newUsername').value;
      const password = document.getElementById('newPassword').value;
      sendRegisterRequest(username, password);
    });
  }
});

const sendLoginRequest = (username, password) => {
  fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  })
  .then(response => {
    if (response.ok) {
      window.location.href = '/twitter.html'; // Weiterleitung zur Twitter-Seite
    } else {
      throw new Error('Login fehlgeschlagen');
    }
  })
  .catch(error => console.error('Fehler bei der Anfrage:', error));
};

const sendRegisterRequest = (username, password) => {
  fetch('/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  })
  .then(response => response.text())
  .then(data => console.log(data))
  .catch(error => console.error('Fehler bei der Anfrage:', error));
};