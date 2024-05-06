var searchBtn = document.querySelector('.admin__menu-search-btn');

searchBtn.addEventListener('click', function() {
    var searchInput = document.querySelector('.admin__menu-search-inp').value.toLowerCase(); // Chuyển đổi đầu vào thành chữ thường
    var menuItems = $('.admin__menu-inf'); // Lấy tất cả các mục trong danh sách
    menuItems.each(function(index, item) {
        var menuItem = $(item);
        var menuItemName = menuItem.find('.admin__menu-name').text().toLowerCase(); // Chuyển đổi tên mục thành chữ thường
        var menuItemID = menuItem.find('.admin__menu-id').text().toLowerCase(); // Chuyển đổi ID mục thành chữ thường
        if (menuItemName.indexOf(searchInput) === -1 && menuItemID.indexOf(searchInput) === -1){
            menuItem.hide(); // Ẩn mục không khớp
        } else {
            menuItem.show(); // Hiển thị mục khớp
        }
    });
});
