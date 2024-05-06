var registerBtn = document.getElementById('registerBtn');
var backBtn = document.getElementById('backBtn');
var loginSubmitBtn = document.getElementById('loginSubmit');
var registerSubmitBtn = document.getElementById('registerSubmit');
var loginFrm = document.querySelector('.login');
var registerFrm = document.querySelector('.register');

registerBtn.addEventListener('click', function(event) {
    console.log('registerBtn clicked');
    event.preventDefault();
    loginFrm.style.display = 'none';
    registerFrm.style.display = 'block';
});

backBtn.addEventListener('click', function(event) {
    event.preventDefault();
    loginFrm.style.display = 'block';
    registerFrm.style.display = 'none';
});

loginSubmitBtn.addEventListener('click', function(event) {
    event.preventDefault();
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    if(username === '' || password === '') {
        alert('Vui lòng nhập đầy đủ thông tin');
        return;
    }
    fetch('/login/check', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
    .then(response => response.json())
    .then(data => {
        if(data.message === 'User not found') {
            alert('Không tồn tại tài khoản này, vui lòng nhập lại');
        }
        if(data.message === 'Invalid password') {
            alert('Sai mật khẩu, vui lòng nhập lại');
        }
        if(data.message === 'Login successful') {
            if(data.type === 'admin') {
                window.location.href = '/admin';
            }
            if(data.type === 'user') {
                window.location.href = '/user';
            }
        }
    });
});

registerSubmitBtn.addEventListener('click', function(event) {
    event.preventDefault();
    var username = document.getElementById('username-rgt').value;
    var password = document.getElementById('password-rgt').value;
    var name = document.getElementById('name-rgt').value;
    if(username === '' || password === '' || name === '') {
        alert('Vui lòng nhập đầy đủ thông tin');
        return;
    }
    fetch('/login/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password,
            name: name
        })
    })
    .then(response => response.json())
    .then(data => {
        if(data.message === 'User created') {
            alert('Tạo tài khoản thành công');
            loginFrm.style.display = 'block';
            registerFrm.style.display = 'none';
        }
        if(data.message === 'User exists') {
            alert('Tài khoản đã tồn tại, vui lòng chọn tên khác');
        }
    });
});