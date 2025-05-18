// ================= FUNCIONALIDADES DE NOTAS =================

// Función para guardar notas
function saveNote() {
    const notesInput = document.querySelector(".notes-input");
    const notesList = document.querySelector(".notes-list");

    if (!notesInput || !notesList) return;

    const noteContent = notesInput.innerHTML.trim(); // Usar innerHTML para conservar el formato

    if (noteContent) {
        if (selectedNote) {
            // Si hay una nota seleccionada, actualízala
            selectedNote.innerHTML = noteContent;

            // Actualizar en localStorage
            const savedNotes = JSON.parse(localStorage.getItem("notesHistory")) || [];
            const noteIndex = savedNotes.findIndex((note) => note === selectedNote.dataset.originalText);
            if (noteIndex !== -1) {
                savedNotes[noteIndex] = noteContent;
                localStorage.setItem("notesHistory", JSON.stringify(savedNotes));
            }

            // Limpiar la selección
            selectedNote.classList.remove("selected");
            selectedNote = null;
        } else {
            // Si no hay una nota seleccionada, crea una nueva
            const noteItem = document.createElement("li");
            noteItem.classList.add("note-item"); // Agregar la clase note-item
            noteItem.innerHTML = noteContent; // Usar innerHTML para conservar el formato
            noteItem.dataset.originalText = noteContent; // Guardar el texto original para referencia

            notesList.appendChild(noteItem);

            // Guardar la nota en localStorage
            const savedNotes = JSON.parse(localStorage.getItem("notesHistory")) || [];
            savedNotes.push(noteContent);
            localStorage.setItem("notesHistory", JSON.stringify(savedNotes));
        }

        notesInput.innerHTML = ""; // Limpiar el cuadro de entrada
    } else {
        alert("No puedes guardar una nota vacía.");
    }
}

// Función para cargar notas desde localStorage
function loadNotes() {
    const notesList = document.querySelector(".notes-list");

    if (!notesList) return;

    const savedNotes = JSON.parse(localStorage.getItem("notesHistory")) || [];

    notesList.innerHTML = "";
    savedNotes.forEach((note) => {
        const noteItem = document.createElement("li");
        noteItem.classList.add("note-item"); // Asegurarse de que tenga la clase note-item
        noteItem.innerHTML = note; // Usar innerHTML para conservar el formato
        noteItem.dataset.originalText = note; // Guardar el texto original para referencia
        notesList.appendChild(noteItem);
    });
}

// Función para manejar la edición de notas
function editNote() {
    const notesInput = document.querySelector(".notes-input");

    if (selectedNote) {
        // Cargar el contenido de la nota seleccionada en el cuadro de entrada
        notesInput.innerHTML = selectedNote.innerHTML; // Usar innerHTML para conservar el formato
    } else {
        alert("Selecciona una nota para editar.");
    }
}

// Función para borrar notas
function deleteNote() {
    if (selectedNote) {
        const savedNotes = JSON.parse(localStorage.getItem("notesHistory")) || [];
        const updatedNotes = savedNotes.filter((note) => note !== selectedNote.innerHTML);
        localStorage.setItem("notesHistory", JSON.stringify(updatedNotes));

        selectedNote.remove();
        selectedNote = null;
        toggleEditDeleteButtons(false);
    } else {
        alert("Selecciona una nota para borrar.");
    }
}

// Función para habilitar/deshabilitar botones de edición y eliminación
function toggleEditDeleteButtons(enable) {
    const editButton = document.getElementById("edit-note-btn");
    const deleteButton = document.getElementById("delete-note-btn");

    if (editButton && deleteButton) {
        editButton.disabled = !enable;
        deleteButton.disabled = !enable;
    }
}

// Manejar la selección de notas
let selectedNote = null;

function setupNotesSelection() {
    const notesList = document.querySelector(".notes-list");
    if (notesList) {
        notesList.addEventListener("click", (e) => {
            if (e.target.tagName === "LI") {
                // Eliminar la clase 'selected' de la nota previamente seleccionada
                if (selectedNote) {
                    selectedNote.classList.remove("selected");
                }

                // Asignar la nueva nota seleccionada
                selectedNote = e.target;
                selectedNote.classList.add("selected");

                // Habilitar los botones de edición y eliminación
                toggleEditDeleteButtons(true);
            }
        });
    }
}
// Función para habilitar/deshabilitar botones de edición y eliminación
function toggleEditDeleteButtons(enable) {
    const editButton = document.getElementById("edit-note-btn");
    const deleteButton = document.getElementById("delete-note-btn");

    if (editButton && deleteButton) {
        editButton.disabled = !enable;
        deleteButton.disabled = !enable;
    }
}

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
  }
  
  document.getElementById('logout-btn')
  .addEventListener('click', (e) => {
    e.preventDefault();
    logout();
  });

// Vincular eventos al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    loadNotes();
    toggleEditDeleteButtons(false);
    setupNotesSelection();

    // Vincular botones de formato
    const boldButton = document.getElementById("bold-btn");
    const italicButton = document.getElementById("italic-btn");
    const underlineButton = document.getElementById("underline-btn");
    const bulletsButton = document.getElementById("bullets-btn");
    const numberedButton = document.getElementById("numbered-btn");
    const fontSizeIncreaseButton = document.getElementById("font-size-increase-btn");
    const fontSizeDecreaseButton = document.getElementById("font-size-decrease-btn");
    const editor = document.getElementById("editor");

    // Función para aplicar negritas
    if (boldButton) {
        boldButton.addEventListener("click", () => {
            document.execCommand("bold", false, null);
            editor.focus();
        });
    }

    // Función para aplicar cursiva
    if (italicButton) {
        italicButton.addEventListener("click", () => {
            document.execCommand("italic", false, null);
            editor.focus();
        });
    }

    // Función para aplicar subrayado
    if (underlineButton) {
        underlineButton.addEventListener("click", () => {
            document.execCommand("underline", false, null);
            editor.focus();
        });
    }

    // Función para aplicar viñetas
    if (bulletsButton) {
        bulletsButton.addEventListener("click", () => {
            document.execCommand("insertUnorderedList", false, null);
            editor.focus();
        });
    }

    // Función para aplicar numeración
    if (numberedButton) {
        numberedButton.addEventListener("click", () => {
            document.execCommand("insertOrderedList", false, null);
            editor.focus();
        });
    }

    // Función para aumentar el tamaño de fuente
    if (fontSizeIncreaseButton) {
        fontSizeIncreaseButton.addEventListener("click", () => {
            document.execCommand("fontSize", false, "5"); // Tamaño 5 equivale a un tamaño grande
            editor.focus();
        });
    }

    // Función para disminuir el tamaño de fuente
    if (fontSizeDecreaseButton) {
        fontSizeDecreaseButton.addEventListener("click", () => {
            document.execCommand("fontSize", false, "2"); // Tamaño 2 equivale a un tamaño pequeño
            editor.focus();
        });
    }
});

// ================= FUNCIONALIDADES DE TEMAS =================
document.addEventListener("DOMContentLoaded", () => {
    const themeToggleBtn = document.getElementById("theme-toggle-btn");
    const themeIcon = themeToggleBtn.querySelector("i"); // Selecciona el ícono dentro del botón

    // Cargar el tema guardado en localStorage
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
        themeIcon.classList.remove("fa-moon");
        themeIcon.classList.add("fa-sun");
        themeToggleBtn.title = "Modo Claro"; // Cambia el título del botón
    }

    // Alternar el modo oscuro al hacer clic en el botón
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");

            // Cambiar el ícono y el título del botón
            const isDarkMode = document.body.classList.contains("dark-mode");
            if (isDarkMode) {
                themeIcon.classList.remove("fa-moon");
                themeIcon.classList.add("fa-sun");
                themeToggleBtn.title = "Modo Claro"; // Cambia el título del botón
            } else {
                themeIcon.classList.remove("fa-sun");
                themeIcon.classList.add("fa-moon");
                themeToggleBtn.title = "Modo Oscuro"; // Cambia el título del botón
            }

            // Guardar la preferencia en localStorage
            localStorage.setItem("theme", isDarkMode ? "dark" : "light");
        });
    }
});

// ================= FUNCIONALIDADES DE VISTAS =================
document.addEventListener("DOMContentLoaded", () => {
    const gridViewBtn = document.getElementById("grid-view-btn");
    const listViewBtn = document.getElementById("list-view-btn");
    const courseContainer = document.getElementById("course-container");

    if (gridViewBtn && listViewBtn && courseContainer) {
        // Cambiar a vista en cuadrícula
        gridViewBtn.addEventListener("click", () => {
            courseContainer.classList.remove("course-list");
            courseContainer.classList.add("course-grid");

            gridViewBtn.classList.add("active");
            listViewBtn.classList.remove("active");
        });

        // Cambiar a vista en lista
        listViewBtn.addEventListener("click", () => {
            courseContainer.classList.remove("course-grid");
            courseContainer.classList.add("course-list");

            listViewBtn.classList.add("active");
            gridViewBtn.classList.remove("active");
        });
    }
});


document.addEventListener("DOMContentLoaded", () => {
    const notificationsBtn = document.getElementById("notifications-btn");
    const notificationsModal = document.getElementById("notifications-modal");
    const closeNotifications = document.getElementById("close-notifications");

    // Mostrar cuadro de notificaciones
    if (notificationsBtn && notificationsModal) {
        notificationsBtn.addEventListener("click", () => {
            notificationsModal.classList.add("active"); // Mostrar el cuadro
        });
    }

    // Cerrar cuadro de notificaciones
    if (closeNotifications && notificationsModal) {
        closeNotifications.addEventListener("click", () => {
            notificationsModal.classList.remove("active"); // Ocultar el cuadro
        });
    }

    // Cerrar el cuadro al hacer clic fuera de él
    document.addEventListener("click", (e) => {
        if (
            notificationsModal.classList.contains("active") &&
            !notificationsModal.querySelector(".modal-content").contains(e.target) &&
            !notificationsBtn.contains(e.target)
        ) {
            notificationsModal.classList.remove("active");
        }
    });    
});

