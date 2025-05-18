let usuarios = JSON.parse(localStorage.getItem('usuarios'));
if (!Array.isArray(usuarios)) {
  usuarios = [
    { username: "admin", password: "1234" },
    { username: "test",  password: "test123" }
  ];
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
}
function validarLogin() {
  usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!username || !password) {
    alert('Por favor, complete todos los campos.');
    return;
  }

  const usuarioValido = usuarios.find(
    user => user.username === username && user.password === password
  );

  if (usuarioValido) {
    localStorage.setItem('currentUser', usuarioValido.username);

    if (!localStorage.getItem(`profile_${usuarioValido.username}`)) {
      const defaultProfile = {
        firstName: usuarioValido.username,
        lastName: '',
        country: 'mx',
        state: 'nl',
        email: `${usuarioValido.username}@uanl.com.mx`
      };
      localStorage.setItem(
        `profile_${usuarioValido.username}`,
        JSON.stringify(defaultProfile)
      );
    }

    alert('Login exitoso');
    redirectToIndex();
  } else {
    alert('Error: Usuario o contraseña incorrectos');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const loginBtn = document.getElementById('login-btn');
  if (loginBtn) {
    loginBtn.addEventListener('click', event => {
      event.preventDefault();
      validarLogin();
    });
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  const body = document.body;
  if (localStorage.getItem('dark-mode') === 'enabled') {
    body.classList.add('dark-mode');
  }
  darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
      localStorage.setItem('dark-mode', 'enabled');
    } else {
      localStorage.setItem('dark-mode', 'disabled');
    }
  });
});

function redirectToIndex() {
  window.location.href = "index.html";
}