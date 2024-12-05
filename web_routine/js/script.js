const sliderItem = document.querySelectorAll('.slider-item');
const sliderItems = document.querySelector('.slider-items');
const arrowRight = document.querySelector('.bx.bx-right-arrow-alt');
const arrowLeft = document.querySelector('.bx.bx-left-arrow-alt');
const Menubar = document.querySelector('.header-bar-icon');
const headerNav = document.querySelector('.header-nav');


// Để ảnh slider thành hàng ngang
for (let index = 0; index < sliderItem.length; index++) {
    sliderItem[index].style.left = index * 100 + "%";
}

// Click slider
let i = 0;
if (arrowRight!=null && arrowLeft !=null) {


arrowRight.addEventListener('click', () => {
    i++;
    if (i < sliderItem.length ) {
        sliderItems.style.left = -i * 100 + "vw";
    } else {
        return false;
    }
});
arrowLeft.addEventListener('click', () => {
    if (i <= 0) {
        return false;
    } else {
        i--;
        sliderItems.style.left = -i * 100 + "%";
    }
});

// Hàm tự động chạy slider
function autoSlider() {
    if (i < sliderItem.length - 1) {
        i++;
    } else {
        i = 0;
    }
    sliderItems.style.left = -i * 100 + "%";
}
}
// Tự động chạy slider mỗi giây
setInterval(autoSlider, 3000);

// Menu bar Responsive
Menubar.addEventListener('click', () => {
    headerNav.classList.toggle('active');
});

var imgPosition = document.querySelectorAll(".aspect-ratio-169 img")
var imgContainer = document.querySelector(".aspect-ratio-169")
var dotItems = document.querySelectorAll(".dot")
var dotActive = document.querySelector(".active2")
var imgNumber = imgPosition.length;
var index = 0;

imgPosition.forEach(function (image, imageIndex) {
    image.style.left = imageIndex * 100 + "%";
    
    dotItems[imageIndex].addEventListener("click", function () {
        // Gọi hàm slider khi người dùng nhấp vào các nút tròn
        slider(imageIndex);
    });
});

function imgSlide() {
    index++;
    if (index >= imgNumber) {
        index = 0;
    }
    slider(index);
}

// Hàm slider để điều khiển cả slide và các nút tròn
function slider(index) {
    imgContainer.style.left = "-" + index * 100 + "%";

    // Loại bỏ lớp active từ tất cả các nút tròn
    dotItems.forEach(function (dot) {
        dot.classList.remove("active2");
    });

    // Thêm lớp active cho nút tròn được chọn
    dotItems[index].classList.add("active2");
}


setInterval(imgSlide, 3000);

// click chi tiết sản phẩm
const imageSamll =document.querySelectorAll('.product-images-items img')
const imageMain =document.querySelector('.main-image')
for (let index = 0; index < imageSamll.length; index++) {
    imageSamll[index].addEventListener('click',()=>{
        imageMain.src=imageSamll[index].src
        

    })
}





document.addEventListener("DOMContentLoaded", function() {
    // Thêm sự kiện cho tất cả các nút tăng/giảm số lượng sản phẩm
    var quanPlus = document.querySelectorAll('.bx-plus');
    var quanMinus = document.querySelectorAll('.bx-minus');
    var quanInput = document.querySelectorAll('.quantity-input');

    for (let i = 0; i < quanPlus.length; i++) {
        // Thêm sự kiện cho nút tăng
        quanPlus[i].addEventListener('click', function() {
            let qty = parseInt(quanInput[i].value);
            qty++;
            quanInput[i].value = qty;
            updateCartTotal();
        });

        // Thêm sự kiện cho nút giảm
        quanMinus[i].addEventListener('click', function() {
            let qty = parseInt(quanInput[i].value);
            if (qty > 1) {
                qty--;
                quanInput[i].value = qty;
                updateCartTotal();
            }
        });
    }
});



function updateCartTotal() {
    var totalPrice = 0;
    // Lặp qua từng sản phẩm trong giỏ hàng
    var items = document.querySelectorAll(".cart-section-left-detail tbody tr");
    items.forEach(function(item) {
        var price = parseFloat(item.querySelector(".hot-product-item-price p").innerText.replace(",", "").replace(" đ", ""));
        var quantity = parseInt(item.querySelector(".quantity-input").value);
        totalPrice += price * quantity;
    });

    // Hiển thị tổng tiền
    var totalSpan = document.querySelector(".product-detail-right-tinh-tong span");
    if (totalSpan) {
        totalSpan.textContent = formatMoney(totalPrice);
    }
}

// Hàm định dạng số tiền sang định dạng tiền tệ
function formatMoney(amount) {
    return amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + ' đ';
}



//--------------------- xóa sp  và tổng tiền sản phẩm 
document.addEventListener("DOMContentLoaded", function() {
    updateCartTotal();

    // Thêm sự kiện cho nút Cập Nhật Giỏ Hàng
    document.querySelector(".main-btn").addEventListener("click", function() {
        // Cập nhật tổng tiền
        updateCartTotal();
    });

    // Thêm sự kiện cho các nút tăng/giảm số lượng sản phẩm
    document.querySelector(".bx-plus").addEventListener("click", function() {
        updateCartTotal();
    });

    document.querySelector(".bx-minus").addEventListener("click", function() {
        updateCartTotal();
    });

    document.querySelector(".quantity-input").addEventListener("input", function() {
        updateCartTotal();
    });

    // Thêm sự kiện cho nút Xóa
    var removeButtons = document.querySelectorAll(".cart-section-left-detail tbody tr button");
    removeButtons.forEach(function(button) {
        button.addEventListener("click", function() {
            removeItem(this); // Gọi hàm xóa sản phẩm
            updateCartTotal(); // Cập nhật tổng tiền sau khi xóa
        });
    });
});




// Cập nhật tổng giá tiền khi thay đổi số lượng sản phẩm
function calculateTotalPrice(element) {
    var row = element.parentNode.parentNode;
    var quantity = parseInt(row.querySelector('.quantity-input').value);
    var price = parseInt(row.querySelector('.hot-product-item-price p').innerText);
    var totalPrice = quantity * price;
    row.querySelector('.product-detail-right-tong-tien').innerText = totalPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}



// Xóa sản phẩm khỏi giỏ hàng
function removeItem(button) {
    var row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
    updateCartTotal();
}

// click user  vao login
document.addEventListener("DOMContentLoaded", function() {
   
    document.getElementById("userIcon").addEventListener("click", function() {
       
        window.location.href = "login.html";
    });
});


// click chuyen sanpham trang sp
var leftbtntwo = document.querySelector(".bxs-chevron-left");
var rightbtntwo = document.querySelector(".bxs-chevron-right");
var productsContent = document.querySelector(".products-collect-content");
var productItems = document.querySelectorAll(".products-content-items");
var totalPages = productItems.length; // Số lượng trang hiện có
var index = 0; 

leftbtntwo.addEventListener("click", function () {
    index = (index === 0) ? totalPages - 1 : index - 1;
    updateSlidePosition();
});

rightbtntwo.addEventListener("click", function () {
    index = (index === totalPages - 1) ? 0 : index + 1;
    updateSlidePosition();
});

function updateSlidePosition() {
    var newPosition = -index * 100 + "%";
    productsContent.style.transform = "translateX(" + newPosition + ")";
}







// click danh mục
document.getElementById("click-danhmuc").addEventListener("click", function() {
    var categories = document.querySelector(".product-categories");
    if (categories.style.display === "flex") {
        categories.style.display = "none";
    } else {
        categories.style.display = "flex";
    }
});

