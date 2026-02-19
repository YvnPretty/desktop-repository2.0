class DulceriaManager {
    constructor() {
        this.dulces = JSON.parse(localStorage.getItem('dulces')) || [];
    }

    obtenerTodos() {
        return this.dulces;
    }

    obtener(id) {
        return this.dulces.find(d => d.id === id);
    }

    agregar(dulce) {
        dulce.id = Date.now().toString();
        this.dulces.push(dulce);
        this.guardar();
    }

    actualizar(id, dulceActualizado) {
        const index = this.dulces.findIndex(d => d.id === id);
        if (index !== -1) {
            this.dulces[index] = { ...this.dulces[index], ...dulceActualizado };
            this.guardar();
        }
    }

    eliminar(id) {
        this.dulces = this.dulces.filter(d => d.id !== id);
        this.guardar();
    }

    guardar() {
        localStorage.setItem('dulces', JSON.stringify(this.dulces));
    }
}

const manager = new DulceriaManager();
const app = document.getElementById('app');

function renderHome() {
    const dulces = manager.obtenerTodos();
    app.innerHTML = `
        <nav>
            <a href="#" onclick="renderHome()">🍭 Inicio</a>
            <a href="#" onclick="renderCreate()">➕ Agregar Dulce</a>
        </nav>
        <div class="content">
            <h1>🍬 Inventario de Dulces 🍬</h1>
            ${dulces.length > 0 ? `
                ${dulces.map(dulce => `
                    <div class="item">
                        <h2>${escapeHtml(dulce.nombre)}</h2>
                        <p><strong>Tipo:</strong> ${escapeHtml(dulce.tipo)}</p>
                        <p class="price">Precio: $${escapeHtml(dulce.precio)}</p>
                        <p>Stock: ${escapeHtml(dulce.stock)} unidades</p>
                        <div class="actions">
                            <a href="#" class="btn-edit" onclick="renderEdit('${dulce.id}')">✏️ Editar</a>
                            <a href="#" class="btn-delete" onclick="eliminarDulce('${dulce.id}')">🗑️ Borrar</a>
                        </div>
                    </div>
                `).join('')}
            ` : '<p style="text-align:center; font-size:1.2em;">¡No hay dulces registrados! Empieza agregando uno.</p>'}
        </div>
    `;
}

function renderCreate() {
    app.innerHTML = `
        <nav>
            <a href="#" onclick="renderHome()">🍭 Inicio</a>
            <a href="#" onclick="renderCreate()">➕ Agregar Dulce</a>
        </nav>
        <div class="content">
            <h1>✨ Nuevo Dulce ✨</h1>
            <form onsubmit="handleCreate(event)">
                <label>Nombre del Dulce</label>
                <input type="text" name="nombre" placeholder="Ej: Paleta Payaso" required>
                
                <label>Tipo / Categoría</label>
                <select name="tipo" required>
                    <option value="Chocolate">Chocolate</option>
                    <option value="Caramelo">Caramelo</option>
                    <option value="Gomita">Gomita</option>
                    <option value="Chicle">Chicle</option>
                    <option value="Picante">Picante</option>
                    <option value="Otro">Otro</option>
                </select>

                <label>Precio ($)</label>
                <input type="number" name="precio" placeholder="0.00" step="0.50" required>

                <label>Cantidad en Stock</label>
                <input type="number" name="stock" placeholder="0" required>

                <button type="submit">Guardar Dulce</button>
            </form>
        </div>
    `;
}

function renderEdit(id) {
    const dulce = manager.obtener(id);
    if (!dulce) return renderHome();

    app.innerHTML = `
        <nav>
            <a href="#" onclick="renderHome()">🍭 Inicio</a>
            <a href="#" onclick="renderCreate()">➕ Agregar Dulce</a>
        </nav>
        <div class="content">
            <h1>✏️ Editar Dulce</h1>
            <form onsubmit="handleEdit(event, '${id}')">
                <label>Nombre del Dulce</label>
                <input type="text" name="nombre" value="${escapeHtml(dulce.nombre)}" required>
                
                <label>Tipo / Categoría</label>
                <select name="tipo" required>
                    <option value="Chocolate" ${dulce.tipo === 'Chocolate' ? 'selected' : ''}>Chocolate</option>
                    <option value="Caramelo" ${dulce.tipo === 'Caramelo' ? 'selected' : ''}>Caramelo</option>
                    <option value="Gomita" ${dulce.tipo === 'Gomita' ? 'selected' : ''}>Gomita</option>
                    <option value="Chicle" ${dulce.tipo === 'Chicle' ? 'selected' : ''}>Chicle</option>
                    <option value="Picante" ${dulce.tipo === 'Picante' ? 'selected' : ''}>Picante</option>
                    <option value="Otro" ${dulce.tipo === 'Otro' ? 'selected' : ''}>Otro</option>
                </select>

                <label>Precio ($)</label>
                <input type="number" name="precio" value="${escapeHtml(dulce.precio)}" step="0.50" required>

                <label>Cantidad en Stock</label>
                <input type="number" name="stock" value="${escapeHtml(dulce.stock)}" required>

                <button type="submit">Actualizar Dulce</button>
            </form>
        </div>
    `;
}

function handleCreate(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    manager.agregar({
        nombre: formData.get('nombre'),
        tipo: formData.get('tipo'),
        precio: formData.get('precio'),
        stock: formData.get('stock')
    });
    alert('¡Dulce agregado exitosamente! 🍬');
    renderHome();
}

function handleEdit(event, id) {
    event.preventDefault();
    const formData = new FormData(event.target);
    manager.actualizar(id, {
        nombre: formData.get('nombre'),
        tipo: formData.get('tipo'),
        precio: formData.get('precio'),
        stock: formData.get('stock')
    });
    alert('¡Dulce actualizado! ✨');
    renderHome();
}

function eliminarDulce(id) {
    if (confirm('¿Estás seguro de que quieres borrar este dulce? 😢')) {
        manager.eliminar(id);
        renderHome();
    }
}

function escapeHtml(text) {
    if (!text) return '';
    return text.toString()
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// Initial render
renderHome();
