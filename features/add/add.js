/* add.js - Logic xử lý thêm sách mới */

// Lấy các phần tử DOM
const form = document.getElementById('add-book-form');
const messageBox = document.getElementById('message-box');

// Hàm hiển thị thông báo
function showMessage(message, type = 'success') {
    messageBox.textContent = message;
    messageBox.className = `message-box ${type}`;
    messageBox.classList.remove('hidden');

    // Tự động ẩn thông báo sau 5 giây
    setTimeout(() => {
        messageBox.classList.add('hidden');
    }, 5000);
}

// Hàm validate dữ liệu đầu vào
function validateBookData(bookId, title, author, category, status) {
    // Kiểm tra mã sách phải là số dương
    if (!bookId || bookId <= 0) {
        showMessage('Mã sách phải là số dương!', 'error');
        return false;
    }

    // Kiểm tra tên sách không được rỗng
    if (!title || title.trim() === '') {
        showMessage('Tên sách không được để trống!', 'error');
        return false;
    }

    // Kiểm tra tác giả không được rỗng
    if (!author || author.trim() === '') {
        showMessage('Tác giả không được để trống!', 'error');
        return false;
    }

    // Kiểm tra thể loại phải được chọn
    if (!category || category === '') {
        showMessage('Vui lòng chọn thể loại sách!', 'error');
        return false;
    }

    // Kiểm tra trạng thái phải được chọn
    if (!status || status === '') {
        showMessage('Vui lòng chọn trạng thái sách!', 'error');
        return false;
    }

    return true;
}

// Hàm kiểm tra mã sách đã tồn tại chưa
function isBookIdExists(bookId, books) {
    return books.some(book => book.id === parseInt(bookId));
}

// Hàm xử lý thêm sách mới
function handleAddBook(event) {
    event.preventDefault(); // Ngăn form submit mặc định

    // Lấy giá trị từ form
    const bookId = document.getElementById('book-id').value;
    const bookTitle = document.getElementById('book-title').value;
    const bookAuthor = document.getElementById('book-author').value;
    const bookCategory = document.getElementById('book-category').value;
    const bookStatus = document.getElementById('book-status').value;

    // Validate dữ liệu
    if (!validateBookData(bookId, bookTitle, bookAuthor, bookCategory, bookStatus)) {
        return;
    }

    // Lấy danh sách sách hiện tại
    const books = getBooks();

    // Kiểm tra mã sách đã tồn tại chưa
    if (isBookIdExists(bookId, books)) {
        showMessage(`Mã sách ${bookId} đã tồn tại! Vui lòng nhập mã khác.`, 'error');
        document.getElementById('book-id').focus();
        return;
    }

    // Tạo object sách mới
    const newBook = {
        id: parseInt(bookId),
        title: bookTitle.trim(),
        author: bookAuthor.trim(),
        category: bookCategory,
        status: bookStatus
    };

    // Thêm sách vào danh sách
    books.push(newBook);

    // Lưu vào localStorage
    try {
        saveBooks(books);

        // Hiển thị thông báo thành công
        showMessage(`✓ Thêm sách "${newBook.title}" thành công!`, 'success');

        // Reset form sau 1.5 giây
        setTimeout(() => {
            form.reset();
            document.getElementById('book-id').focus();
        }, 1500);

    } catch (error) {
        showMessage('Lỗi khi lưu dữ liệu! Vui lòng thử lại.', 'error');
        console.error('Error saving book:', error);
    }
}

// Hàm xử lý reset form
function handleReset() {
    messageBox.classList.add('hidden');

    // Focus vào trường mã sách sau khi reset
    setTimeout(() => {
        document.getElementById('book-id').focus();
    }, 100);
}

// Hàm kiểm tra và hiển thị warning nếu có nhiều sách cùng tên
function checkDuplicateTitle(title) {
    const books = getBooks();
    const sameTitleBooks = books.filter(book =>
        book.title.toLowerCase().trim() === title.toLowerCase().trim()
    );

    if (sameTitleBooks.length > 0) {
        showMessage(
            `⚠ Cảnh báo: Đã có ${sameTitleBooks.length} sách cùng tên "${title}" trong thư viện!`,
            'warning'
        );
    }
}

// Gắn sự kiện cho form
form.addEventListener('submit', handleAddBook);
form.addEventListener('reset', handleReset);

// Kiểm tra tên sách trùng khi người dùng nhập xong
let titleCheckTimeout;
document.getElementById('book-title').addEventListener('input', function (e) {
    clearTimeout(titleCheckTimeout);
    const title = e.target.value.trim();

    if (title.length > 3) {
        titleCheckTimeout = setTimeout(() => {
            checkDuplicateTitle(title);
        }, 1000);
    }
});

// Focus vào trường mã sách khi trang load
window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('book-id').focus();
    console.log('Add Book Page - Ready ✓');
});

// Xử lý phím tắt
document.addEventListener('keydown', (e) => {
    // Ctrl + S để submit form
    if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        form.dispatchEvent(new Event('submit'));
    }

    // Escape để reset form
    if (e.key === 'Escape') {
        e.preventDefault();
        form.reset();
        messageBox.classList.add('hidden');
    }
});
