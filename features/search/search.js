// features/search/search.js

// 1. DỮ LIỆU GIẢ LẬP (MOCK DATA)
// Trong thực tế, dữ liệu này sẽ được lấy từ Backend hoặc file data.js chung
const mockBooksDatabase = [
    { id: 1, title: "Nhập môn Lập trình Python", author: "Nguyễn Văn A", category: "it", year: 2023, status: "available" },
    { id: 2, title: "Kinh tế Vĩ mô căn bản", author: "Trần Thị B", category: "economics", year: 2021, status: "borrowed" },
    { id: 3, title: "Dế Mèn Phiêu Lưu Ký", author: "Tô Hoài", category: "literature", year: 2020, status: "available" },
    { id: 4, title: "Clean Code - Mã sạch", author: "Robert C. Martin", category: "it", year: 2018, status: "available" },
    { id: 5, title: "Marketing căn bản", author: "Philip Kotler", category: "economics", year: 2022, status: "available" },
    { id: 6, title: "JavaScript: The Good Parts", author: "Douglas Crockford", category: "it", year: 2015, status: "borrowed" },
];

// 2. LẤY CÁC ELEMENT TỪ DOM
const searchInput = document.getElementById('searchInput');
const btnSearch = document.getElementById('btnSearchAction');
const categoryFilter = document.getElementById('categoryFilter');
const sortBySelect = document.getElementById('sortBy');
const resultsGrid = document.getElementById('searchResultsGrid');
const noResultsState = document.getElementById('noResultsState');
const loadingState = document.getElementById('loadingState');

// 3. HÀM XỬ LÝ CHÍNH (CORE FUNCTIONS)

/**
 * Hàm thực hiện tìm kiếm và lọc dữ liệu
 */
function performSearch() {
    // Hiển thị loading
    loadingState.classList.remove('hidden');
    resultsGrid.innerHTML = '';
    noResultsState.classList.add('hidden');

    // Lấy giá trị từ các input
    const keyword = searchInput.value.toLowerCase().trim();
    const categoryBox = categoryFilter.value;
    const sortOption = sortBySelect.value;

    // Giả lập độ trễ mạng (500ms) để thấy hiệu ứng loading
    setTimeout(() => {
        // --- Bước 1: Lọc dữ liệu ---
        let filteredBooks = mockBooksDatabase.filter(book => {
            // Lọc theo từ khóa (tìm trong tên sách HOẶC tên tác giả)
            const matchesKeyword = book.title.toLowerCase().includes(keyword) || 
                                   book.author.toLowerCase().includes(keyword);
            
            // Lọc theo thể loại
            const matchesCategory = categoryBox === 'all' || book.category === categoryBox;

            return matchesKeyword && matchesCategory;
        });

        // --- Bước 2: Sắp xếp dữ liệu ---
        sortResults(filteredBooks, sortOption);

        // --- Bước 3: Hiển thị kết quả ---
        displayResults(filteredBooks);
        
        // Ẩn loading
        loadingState.classList.add('hidden');
    }, 500);
}

/**
 * Hàm sắp xếp mảng kết quả
 */
function sortResults(booksArray, sortOption) {
    if (sortOption === 'titleAZ') {
        booksArray.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === 'newest') {
        // Giả sử ID lớn hơn là mới hơn
        booksArray.sort((a, b) => b.id - a.id);
    } else if (sortOption === 'yearDesc') {
        booksArray.sort((a, b) => b.year - a.year);
    }
}

/**
 * Hàm render HTML hiển thị danh sách sách
 */
function displayResults(books) {
    resultsGrid.innerHTML = ''; // Xóa kết quả cũ

    // Kiểm tra nếu không có kết quả
    if (books.length === 0) {
        noResultsState.classList.remove('hidden');
        return;
    } else {
        noResultsState.classList.add('hidden');
    }

    // Duyệt qua từng sách và tạo thẻ HTML
    books.forEach(book => {
        // Xác định trạng thái để đổi màu badge
        const statusClass = book.status === 'available' ? 'status-available' : 'status-borrowed';
        const statusText = book.status === 'available' ? 'Sẵn sàng' : 'Đang cho mượn';
        
        // Tạo template string cho thẻ sách
        const bookCardHTML = `
            <div class="book-card">
                <div class="book-cover">
                    <i class="fa-solid fa-book"></i> </div>
                <div class="book-info">
                    <span class="book-status ${statusClass}">${statusText}</span>
                    <h3 class="book-title">${book.title}</h3>
                    <div class="book-meta">
                        <i class="fa-solid fa-user-pen"></i> ${book.author}
                    </div>
                    <div class="book-meta">
                        <i class="fa-regular fa-calendar"></i> Năm: ${book.year}
                    </div>
                </div>
                <div class="book-action">
                    <button class="detail-btn" onclick="alert('Xem chi tiết sách ID: ${book.id}')">Xem chi tiết</button>
                </div>
            </div>
        `;
        
        // Thêm thẻ sách vào lưới kết quả
        resultsGrid.innerHTML += bookCardHTML;
    });
}

// 4. GÁN SỰ KIỆN (EVENT LISTENERS)
// Sự kiện click nút tìm kiếm
btnSearch.addEventListener('click', performSearch);

// Sự kiện nhấn Enter trong ô input
searchInput.addEventListener('keypress', (e) => {
    if(e.key === 'Enter') performSearch();
});

// Sự kiện thay đổi bộ lọc hoặc sắp xếp thì tự động tìm lại
categoryFilter.addEventListener('change', performSearch);
sortBySelect.addEventListener('change', performSearch);

// Gọi tìm kiếm lần đầu khi trang vừa tải (để hiển thị tất cả sách)
// document.addEventListener('DOMContentLoaded', performSearch); // Bỏ comment dòng này nếu muốn hiện sách ngay khi vào trang