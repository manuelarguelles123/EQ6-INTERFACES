document.addEventListener('DOMContentLoaded', () => {
    const current = localStorage.getItem('currentUser');
    if (!current) {
      alert('Debes iniciar sesión primero.');
      window.location.href = 'login.html';
      return;
    }
  
    const fields = {
      firstName: document.getElementById('first-name'),
      lastName:  document.getElementById('last-name'),
      country:   document.getElementById('country'),
      state:     document.getElementById('state'),
      email:     document.getElementById('email'),
    };
  
    const newUserField = document.getElementById('new-username');
    const newPassField = document.getElementById('new-password');
  
    const savedProfile = JSON.parse(
      localStorage.getItem(`profile_${current}`)
    ) || {};
    Object.keys(fields).forEach(key => {
      if (savedProfile[key] !== undefined) {
        fields[key].value = savedProfile[key];
      }
    });
  
    
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const userObj = usuarios.find(u => u.username === current);
    if (userObj) {
      newUserField.value = userObj.username;
      newPassField.value = userObj.password;
    }

    const headerH1 = document.querySelector('.profile-info h1');
    const fullName = `${savedProfile.firstName} ${savedProfile.lastName}`.trim();
    headerH1.textContent = fullName || current;
  
    function saveProfileAndCreds() {
      const profileToSave = {};
      Object.keys(fields).forEach(key => {
        profileToSave[key] = fields[key].value;
      });
      localStorage.setItem(
        `profile_${current}`,
        JSON.stringify(profileToSave)
      );
      const updatedUsername = newUserField.value.trim();
      const updatedPassword = newPassField.value;
  
      if (!updatedUsername || !updatedPassword) {
        alert('El usuario y la contraseña no pueden estar vacíos.');
        return;
      }
  
      if (
        updatedUsername !== current &&
        usuarios.some(u => u.username === updatedUsername)
      ) {
        alert('Ese nombre de usuario ya existe.');
        return;
      }
  
      const idx = usuarios.findIndex(u => u.username === current);
      if (idx !== -1) {
        usuarios[idx].username = updatedUsername;
        usuarios[idx].password = updatedPassword;
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
  
        localStorage.setItem('currentUser', updatedUsername);
  
        alert('Perfil y credenciales actualizados. Por favor, vuelve a iniciar sesión.');
        localStorage.removeItem('currentUser');
        window.location.href = 'login.html';
      } else {
        alert('Error al actualizar credenciales.');
      }
    }
  
    document.querySelectorAll('.save-btn')
            .forEach(btn => btn.addEventListener('click', saveProfileAndCreds));
  });  