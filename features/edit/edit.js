let currentBookId = null;

// Hàm tìm và đổ dữ liệu vào form
function loadBookData() {
    const idInput = document.getElementById('search-id').value;
    const books = getBooks();
    const msg = document.getElementById('msg');
    const form = document.getElementById('edit-form');

    const book = books.find(b => b.id == idInput);

    if (book) {
        currentBookId = book.id;
        document.getElementById('edit-title').value = book.title;
        document.getElementById('edit-author').value = book.author;
        document.getElementById('edit-category').value = book.category;
        document.getElementById('edit-status').value = book.status;
        
        form.style.display = 'block';
        msg.innerText = "";
    } else {
        form.style.display = 'none';
        msg.innerText = "Không tìm thấy sách với ID này!";
    }
}

// Xử lý sự kiện lưu form
document.getElementById('edit-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    let books = getBooks();
    const index = books.findIndex(b => b.id == currentBookId);

    if (index !== -1) {
        
        books[index].title = document.getElementById('edit-title').value;
        books[index].author = document.getElementById('edit-author').value;
        books[index].category = document.getElementById('edit-category').value;
        books[index].status = document.getElementById('edit-status').value;

   
        saveBooks(books);
        
        alert("Cập nhật thành công!");
        window.location.href = "../list/list.html"; 
    }
});