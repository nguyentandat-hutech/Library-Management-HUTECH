// SearchController.js - Xử lý tìm kiếm sách
class SearchController {
    constructor() {
        this.books = [
            { id: 1, title: "Lập trình Java", author: "Nguyễn Văn A" },
            { id: 2, title: "Cấu trúc dữ liệu", author: "Trần Thị B" },
            { id: 3, title: "Nhập môn Web", author: "Lê Văn C" }
        ];
    }

    // Hàm tìm kiếm theo từ khóa
    search(keyword) {
        console.log(`Đang tìm kiếm với từ khóa: ${keyword}`);
        // Lọc sách có tên chứa từ khóa (không phân biệt hoa thường)
        const results = this.books.filter(book => 
            book.title.toLowerCase().includes(keyword.toLowerCase())
        );
        return results;
    }
}

// Xuất class để file khác có thể dùng
// export default SearchController;