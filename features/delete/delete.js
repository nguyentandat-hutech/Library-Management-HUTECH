// delete.js

document.addEventListener('DOMContentLoaded', function () {
    renderBooks();
});

function renderBooks() {
    const books = getBooks(); // Hàm từ data.js
    const tbody = document.getElementById('books-body');
    tbody.innerHTML = '';

    if (books.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;">Không có sách nào trong hệ thống!</td></tr>';
        return;
    }

    books.forEach(book => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${book.id}</td>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.category}</td>
            <td>${book.status}</td>
            <td>
                <button class="btn-delete" onclick="deleteBook(${book.id})">Xóa</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function deleteBook(id) {
    if (confirm(`Bạn có chắc chắn muốn xóa sách có ID: ${id} không?`)) {
        let books = getBooks();

        // Lọc bỏ sách có id trùng khớp
        const newBooks = books.filter(book => book.id !== id);

        // Lưu lại vào localStorage
        saveBooks(newBooks);

        // Hiển thị thông báo
        const msgDiv = document.getElementById('message');
        msgDiv.innerText = `Đã xóa thành công sách ID ${id}`;
        msgDiv.className = 'message success';

        // Render lại bảng
        renderBooks();

        // Tự động xóa thông báo sau 3s
        setTimeout(() => {
            msgDiv.innerText = '';
        }, 3000);
    }
}
