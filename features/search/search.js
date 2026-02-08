// features/search/search.js
// Code search feature.
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
    switch(sortOption) {
        case 'title':
            booksArray.sort((a, b) => a.title.localeCompare(b.title));
            break;
        case 'year':
            booksArray.sort((a, b) => b.year - a.year); // Giảm dần theo năm
            break;
        case 'author':
            booksArray.sort((a, b) => a.author.localeCompare(b.author));
            break;
        default:
            // Không sắp xếp nếu không có lựa chọn hợp lệ
            break;
    }
}