function signup(event) {
    event.preventDefault();
    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirmPassword').value;
    
    // Kiểm tra xem người dùng đã nhập đầy đủ thông tin đăng ký chưa
    if (!username || !email || !password || !confirmPassword) {
        alert("Vui lòng nhập đầy đủ thông tin đăng ký");
        return;
    }

    if (password !== confirmPassword) {
        alert("Mật khẩu không khớp!");
        return;
    }

    var userData = localStorage.getItem(username);
    if (userData !== null) {
        alert("Tài khoản đã tồn tại!");
        return;
    }

    var user = {
        username: username,
        email: email,
        password: password,
    };

    var json = JSON.stringify(user);
    localStorage.setItem(username, json);
    alert("Đăng ký thành công!");
}


// Thêm tài khoản admin vào localStorage
function addAdminAccount() {
    var admin = {
        username: "admin",
        password: "admin123", 
    };
    var json = JSON.stringify(admin);
    localStorage.setItem("admin", json);
}

// loginn
function login(event) {
    event.preventDefault();
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    
    // Kiểm tra xem người dùng đã nhập đầy đủ thông tin đăng nhập chưa
    if (!username || !password) {
        alert("Vui lòng nhập đầy đủ thông tin đăng nhập");
        return;
    }
    
    // Kiểm tra nếu người dùng là admin
    if (username === "admin" && password === "admin123") {
        alert("Đăng nhập thành công với tài khoản admin");
        window.location.href = "admin.html"; // Chuyển hướng đến trang admin.html
        return;
    }
    
    var userData = localStorage.getItem(username);
    
    if(userData === null) {
        alert("Tài khoản không tồn tại");
    } else {
        var data = JSON.parse(userData);
        if (username === data.username && password === data.password) {
            alert("Đăng nhập thành công");
            window.location.href = "index.html"; // Chuyển hướng đến trang index.html khi đăng nhập thành công với tài khoản người dùng thông thường
        } else {
            alert("Thông tin đăng nhập không đúng");
        }
    }
}

// Thêm tài khoản admin khi tài khoản chưa tồn tại
if (localStorage.getItem("admin") === null) {
    addAdminAccount();
}
