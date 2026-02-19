class ItemManager {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('items')) || [];
    }

    getAll() {
        return this.items;
    }

    get(id) {
        return this.items.find(item => item.id === id);
    }

    add(item) {
        item.id = Date.now().toString(); // Simple ID generation
        this.items.push(item);
        this.save();
    }

    update(id, updatedItem) {
        const index = this.items.findIndex(item => item.id === id);
        if (index !== -1) {
            this.items[index] = { ...this.items[index], ...updatedItem };
            this.save();
        }
    }

    delete(id) {
        this.items = this.items.filter(item => item.id !== id);
        this.save();
    }

    save() {
        localStorage.setItem('items', JSON.stringify(this.items));
    }
}

const itemManager = new ItemManager();
const app = document.getElementById('app');

function renderHome() {
    const items = itemManager.getAll();
    app.innerHTML = `
        <nav>
            <a href="#" onclick="renderHome()">Home</a>
            <a href="#" onclick="renderCreate()">Add Item</a>
        </nav>
        <div class="content">
            <h1>Items</h1>
            ${items.length > 0 ? `
                ${items.map(item => `
                    <div class="item">
                        <h2>${escapeHtml(item.name)}</h2>
                        <p>${escapeHtml(item.description)}</p>
                        <a href="#" onclick="renderEdit('${item.id}')">Edit</a>
                        <a href="#" onclick="deleteItem('${item.id}')">Delete</a>
                    </div>
                `).join('')}
            ` : '<p>No items found. Add one!</p>'}
        </div>
    `;
}

function renderCreate() {
    app.innerHTML = `
        <nav>
            <a href="#" onclick="renderHome()">Home</a>
            <a href="#" onclick="renderCreate()">Add Item</a>
        </nav>
        <div class="content">
            <h1>Add New Item</h1>
            <form onsubmit="handleCreate(event)">
                <label>Name</label>
                <input type="text" name="name" required>
                <label>Description</label>
                <textarea name="description"></textarea>
                <button type="submit">Save</button>
            </form>
        </div>
    `;
}

function renderEdit(id) {
    const item = itemManager.get(id);
    if (!item) return renderHome();

    app.innerHTML = `
        <nav>
            <a href="#" onclick="renderHome()">Home</a>
            <a href="#" onclick="renderCreate()">Add Item</a>
        </nav>
        <div class="content">
            <h1>Edit Item</h1>
            <form onsubmit="handleEdit(event, '${id}')">
                <label>Name</label>
                <input type="text" name="name" value="${escapeHtml(item.name)}" required>
                <label>Description</label>
                <textarea name="description">${escapeHtml(item.description)}</textarea>
                <button type="submit">Update</button>
            </form>
        </div>
    `;
}

function handleCreate(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    itemManager.add({
        name: formData.get('name'),
        description: formData.get('description')
    });
    renderHome();
}

function handleEdit(event, id) {
    event.preventDefault();
    const formData = new FormData(event.target);
    itemManager.update(id, {
        name: formData.get('name'),
        description: formData.get('description')
    });
    renderHome();
}

function deleteItem(id) {
    if (confirm('Are you sure?')) {
        itemManager.delete(id);
        renderHome();
    }
}

function escapeHtml(text) {
    if (!text) return '';
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// Initial render
renderHome();
