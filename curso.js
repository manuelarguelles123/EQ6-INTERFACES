// ================= FUNCIONALIDADES DE NOTAS =================

// Función para mostrar/ocultar el cuadro de notas en el margen derecho
function toggleNotes() {
    const notesContainer = document.querySelector(".floating-notes-container");

    if (!notesContainer) {
        console.error("El contenedor de notas no se encontró en el DOM.");
        return;
    }

    // Alternar la visibilidad del cuadro de notas
    if (notesContainer.classList.contains("hidden")) {
        // Posicionar el cuadro en el margen derecho
        notesContainer.style.position = "fixed";
        notesContainer.style.top = "10%"; // 10% desde la parte superior de la pantalla
        notesContainer.style.right = "10px"; // 10px desde el margen derecho
        notesContainer.style.left = "auto"; // Asegurarse de que no esté alineado a la izquierda
        notesContainer.style.zIndex = "1000"; // Asegurarse de que esté encima de todos los elementos
        notesContainer.style.display = "block";
        notesContainer.classList.remove("hidden");
    } else {
        notesContainer.style.display = "none";
        notesContainer.classList.add("hidden");
    }
}

// Función para guardar notas
function saveNote() {
    const notesInput = document.querySelector(".notes-input");
    const notesList = document.querySelector(".notes-list");

    if (!notesInput || !notesList) {
        console.error("No se encontró el área de entrada o la lista de notas en el DOM.");
        return;
    }

    const noteContent = notesInput.innerText.trim();

    if (noteContent) {
        // Crear un nuevo elemento de lista para la nota
        const noteItem = document.createElement("li");
        noteItem.textContent = noteContent;

        // Agregar la nota a la lista visible
        notesList.appendChild(noteItem);

        // Guardar la nota en localStorage
        const savedNotes = JSON.parse(localStorage.getItem("notesHistory")) || [];
        savedNotes.push(noteContent);
        localStorage.setItem("notesHistory", JSON.stringify(savedNotes));

        // Limpiar el área de entrada
        notesInput.innerText = "";
    } else {
        alert("No puedes guardar una nota vacía.");
    }
}

// Función para cargar notas desde localStorage
function loadNotes() {
    const notesList = document.querySelector(".notes-list");

    if (!notesList) {
        console.error("No se encontró la lista de notas en el DOM.");
        return;
    }

    const savedNotes = JSON.parse(localStorage.getItem("notesHistory")) || [];

    // Limpiar la lista antes de cargar
    notesList.innerHTML = "";

    // Agregar cada nota guardada a la lista visible
    savedNotes.forEach((note) => {
        const noteItem = document.createElement("li");
        noteItem.textContent = note;
        notesList.appendChild(noteItem);
    });
}

// Función para manejar la edición de notas
let selectedNote = null;

function editNote() {
    if (selectedNote) {
        const newNote = prompt("Edita tu nota:", selectedNote.innerText);
        if (newNote) {
            const savedNotes = JSON.parse(localStorage.getItem("notesHistory")) || [];
            const noteIndex = savedNotes.indexOf(selectedNote.innerText);
            if (noteIndex !== -1) {
                savedNotes[noteIndex] = newNote;
                localStorage.setItem("notesHistory", JSON.stringify(savedNotes));
            }

            selectedNote.innerText = newNote;
        }
    } else {
        alert("Selecciona una nota para editar.");
    }
}
 
// Función para borrar notas
function deleteNote() {
    if (selectedNote) {
        const savedNotes = JSON.parse(localStorage.getItem("notesHistory")) || [];
        const updatedNotes = savedNotes.filter((note) => note !== selectedNote.innerText);
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
function setupNotesSelection() {
    const notesList = document.querySelector(".notes-list");
    if (notesList) {
        notesList.addEventListener("click", (e) => {
            if (e.target.tagName === "LI") {
                if (selectedNote) {
                    selectedNote.classList.remove("selected");
                }
                selectedNote = e.target;
                selectedNote.classList.add("selected");

                toggleEditDeleteButtons(true);
            }
        });
    }
}

// ================= FUNCIONALIDADES DE FORMATO =================

// Función para aplicar negritas
function applyBold() {
    document.execCommand("bold");
}

// Función para agregar viñetas
function applyBullets() {
    document.execCommand("insertUnorderedList");
}

// Función para aumentar el tamaño de letra
function increaseFontSize() {
    document.execCommand("fontSize", false, "5"); // Tamaño 5 es más grande
}

// ================= FUNCIONALIDADES DE LA BARRA LATERAL =================

// Función para mostrar/ocultar submenús
function toggleSubmenu(element) {
    const submenu = element.nextElementSibling;
    const icon = element.querySelector("i");
    if (submenu.style.display === "block") {
        submenu.style.display = "none";
        icon.classList.remove("fa-chevron-up");
        icon.classList.add("fa-chevron-down");
    } else {
        submenu.style.display = "block";
        icon.classList.remove("fa-chevron-down");
        icon.classList.add("fa-chevron-up");
    }
}

// Función para cambiar entre pestañas
function showTab(tab) {
    const courseContent = document.getElementById("course-content");
    const resourcesContent = document.getElementById("resources-content");
    const tabButtons = document.querySelectorAll(".tab-btn");

    // Mostrar/Ocultar contenido según la pestaña seleccionada
    if (tab === "course") {
        courseContent.style.display = "block";
        resourcesContent.style.display = "none";
    } else if (tab === "resources") {
        courseContent.style.display = "none";
        resourcesContent.style.display = "block";
    }

    // Actualizar la clase activa en los botones
    tabButtons.forEach((button) => {
        if (button.textContent.trim() === (tab === "course" ? "Esquema de Curso" : "Recursos")) {
            button.classList.add("active");
        } else {
            button.classList.remove("active");
        }
    });
}

// Redimensionar la barra lateral
const resizer = document.querySelector('.resizer');
const sidebar = document.querySelector('.sidebar');
const dashboard = document.querySelector('.dashboard');

let isResizing = false;

resizer.addEventListener('mousedown', (e) => {
    isResizing = true;
    document.body.style.cursor = 'col-resize';
    document.addEventListener('mousemove', resizeSidebar);
    document.addEventListener('mouseup', stopResizing);
});

function resizeSidebar(e) {
    if (!isResizing) return;

    const newWidth = e.clientX;
    if (newWidth > 150 && newWidth < 600) { // Limita el ancho entre 150px y 600px
        sidebar.style.width = `${newWidth}px`;
        dashboard.style.gridTemplateColumns = `${newWidth}px 5px 1fr`; // Ajusta dinámicamente el diseño
    }
}

function stopResizing() {
    isResizing = false;
    document.body.style.cursor = 'default';
    document.removeEventListener('mousemove', resizeSidebar);
    document.removeEventListener('mouseup', stopResizing);
}

// ================= INICIALIZACIÓN =================

document.addEventListener("DOMContentLoaded", () => {
    // Vincular el Botón 1 al cuadro de notas
    const notesButton = document.querySelector(".header-btn.notes-btn");
    if (notesButton) {
        notesButton.addEventListener("click", toggleNotes);
        console.log("El Botón 1 está vinculado correctamente al cuadro de notas.");
    } else {
        console.error("El Botón 1 no se encontró en el DOM.");
    }

    // Cargar notas desde localStorage
    loadNotes();

    // Configurar selección de notas
    setupNotesSelection();

    // Vincular botones de formato
    const boldButton = document.getElementById("bold-btn");
    const bulletsButton = document.getElementById("bullets-btn");
    const fontSizeButton = document.getElementById("font-size-btn");

    if (boldButton) boldButton.addEventListener("click", applyBold);
    if (bulletsButton) bulletsButton.addEventListener("click", applyBullets);
    if (fontSizeButton) fontSizeButton.addEventListener("click", increaseFontSize);
});
// Inicializar el editor Quill
const editor = new Quill('#editor', {
    theme: 'snow',
    placeholder: 'Escribe tu nota aquí...',
    modules: {
        toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['clean']
        ]
    }
});

// Guardar una nota
function saveNote() {
    const content = editor.root.innerHTML;
    if (!content || content === '<p><br></p>') return;

    const notes = JSON.parse(localStorage.getItem('notes') || '[]');
    notes.push(content);
    localStorage.setItem('notes', JSON.stringify(notes));
    editor.setContents([]); // Limpiar el editor
    renderNotes();
}

// Eliminar una nota
function deleteNote(index) {
    const notes = JSON.parse(localStorage.getItem('notes') || '[]');
    notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    renderNotes();
}

// Editar una nota
function editNote(index) {
    const notes = JSON.parse(localStorage.getItem('notes') || '[]');
    const content = notes[index];
    editor.root.innerHTML = content;
    notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    renderNotes();
}

// Renderizar las notas
function renderNotes() {
    const container = document.getElementById('note-list');
    container.innerHTML = '';
    const notes = JSON.parse(localStorage.getItem('notes') || '[]');
    notes.forEach((note, index) => {
        const div = document.createElement('div');
        div.className = 'note-item';

        const preview = document.createElement('div');
        preview.className = 'note-preview';
        preview.innerHTML = note;

        const actions = document.createElement('div');
        actions.className = 'note-actions';

        const editBtn = document.createElement('button');
        editBtn.innerText = 'Editar';
        editBtn.onclick = () => editNote(index);

        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'Eliminar';
        deleteBtn.onclick = () => deleteNote(index);

        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);
        div.appendChild(preview);
        div.appendChild(actions);
        container.appendChild(div);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const themeToggleBtn = document.getElementById("theme-toggle-btn");
    const themeIcon = themeToggleBtn.querySelector("i"); // Selecciona el ícono dentro del botón

    // Cargar el tema guardado en localStorage
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
        themeIcon.classList.remove("fa-moon");
        themeIcon.classList.add("fa-sun"); // Cambia al ícono de sol para el modo claro
    }

    themeToggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");

        // Cambiar el ícono del botón
        const isDarkMode = document.body.classList.contains("dark-mode");
        if (isDarkMode) {
            themeIcon.classList.remove("fa-moon");
            themeIcon.classList.add("fa-sun"); // Cambia al ícono de sol
        } else {
            themeIcon.classList.remove("fa-sun");
            themeIcon.classList.add("fa-moon"); // Cambia al ícono de luna
        }

        // Guardar la preferencia en localStorage
        localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    });
});