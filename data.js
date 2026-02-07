
const defaultBooks = [
    { id: 101, title: "Lập trình Windows", author: "HUTECH", category: "CNTT", status: "Còn sách" },
    { id: 102, title: "Kinh tế chính trị Mác-Lênin", author: "Bộ Giáo Dục", category: "Giáo dục", status: "Đã mượn" },
    { id: 103, title: "Cấu trúc dữ liệu và Giải thuật", author: "Nguyễn Văn A", category: "CNTT", status: "Còn sách" },
    { id: 104, title: "Phát triển ứng dụng J2EE", author: "Trần Thị B", category: "Lập trình", status: "Đã mượn" },
    { id: 105, title: "Kiểm thử phần mềm", author: "Lê Văn C", category: "CNTT", status: "Còn sách" },
    { id: 106, title: "An toàn và Bảo mật thông tin", author: "Phạm Văn D", category: "Bảo mật", status: "Còn sách" },
    { id: 107, title: "Thiết kế giao diện Figma", author: "Ngô Thị E", category: "Thiết kế", status: "Đã mượn" },
    { id: 108, title: "Lập trình di động Flutter", author: "Google Team", category: "Di động", status: "Còn sách" }
];


function getBooks() {
    const data = localStorage.getItem('hutech_library_data');
    if (!data) {
        localStorage.setItem('hutech_library_data', JSON.stringify(defaultBooks));
        return defaultBooks;
    }
    return JSON.parse(data);
}


function saveBooks(booksArray) {
    localStorage.setItem('hutech_library_data', JSON.stringify(booksArray));
}

getBooks();