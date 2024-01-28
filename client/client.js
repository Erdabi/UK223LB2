document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
      loginForm.addEventListener('submit', (event) => {
          event.preventDefault();
          const username = document.getElementById('username').value;
          const password = document.getElementById('password').value;
          console.log('Login mit:', username, password);
          sendLoginRequest(username, password);
      });
  }

  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
      registerForm.addEventListener('submit', (event) => {
          event.preventDefault();
          const username = document.getElementById('newUsername').value;
          const password = document.getElementById('newPassword').value;
          console.log('Registrieren mit:', username, password);
          sendRegisterRequest(username, password);
      });
  }
});

const sendLoginRequest = (username, password) => {
  console.log('Anfrage an den Server senden: Login');
};

const sendRegisterRequest = (username, password) => {
  console.log('Anfrage an den Server senden: Registrierung');
};
