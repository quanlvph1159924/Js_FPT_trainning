var btnOpen = document.querySelector('.open-modal-btn');
var modal = document.querySelector('.modal2');
var iconClose = document.querySelector('.modal__header i');
var btnClose = document.querySelector('.modal__footer .btn_close');
var pencilClose = document.querySelector('.btn-pencil');
var btnSave = document.querySelector('.modal__footer .btn-save');

function toggleModal() {
    modal.classList.toggle('hide')
}

btnOpen.addEventListener('click', toggleModal)
iconClose.addEventListener('click', toggleModal)
btnClose.addEventListener('click', toggleModal)
modal.addEventListener('click', function (e) {
    if (e.target == e.currentTarget) {
        toggleModal();
    }
})

let updateId = 0;


let product = [
    // {
    //     'id': "1",
    //     'name': "Quan le",
    //     'email': "quan@gmail.com",
    //     'address': "nghe an",
    //     'phone': "04324838423"
    // },
    // {
    //     'id': "2",
    //     'name': "Quan le",
    //     'email': "quan@gmail.com",
    //     'address': "nghe an",
    //     'phone': "04324838423"
    // },
    // {
    //     'id': "3",
    //     'name': "Quan le",
    //     'email': "quan@gmail.com",
    //     'address': "nghe an",
    //     'phone': "04324838423"
    // },
    // {
    //     'id': "4",
    //     'name': "Quan le",
    //     'email': "quan@gmail.com",
    //     'address': "nghe an",
    //     'phone': "04324838423"
    // },
    // {
    //     'id': "5",
    //     'name': "Quan le",
    //     'email': "quan@gmail.com",
    //     'address': "nghe an",
    //     'phone': "04324838423"
    // }
];
// localStorage.setItem('product', JSON.stringify(product));

let perPage = 5;
let totalPage = Math.ceil(product.length / perPage);
console.log("111", totalPage);
let start = 0;
let end = perPage;
const btnNext = document.querySelector('.btn_next');
const btnPre = document.querySelector('.btn_previous');

function clearForm() {
    document.getElementById('name').value = null;
    document.getElementById('email').value = null;
    document.getElementById('address').value = null;
    document.getElementById('phone').value = null;
}

function checkEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function nameValid() {
    var name = document.getElementById('name').value;

    if (_.isEmpty(name)) {
        document.getElementById('name-error').innerHTML = 'Vui lòng nhập tên!'
    } else if (name.trim().length <= 2) {
        document.getElementById('name-error').innerHTML = 'Tên không được ít hơn 2 kí tự!'
    } else if (name.trim().length > 50) {
        document.getElementById('name-error').innerHTML = 'Tên không được nhiều hơn 50 kí tự!'
    } else {
        document.getElementById('name-error').innerHTML = "";
        return true;
    }
}


function emailValid() {
    var email = document.getElementById('email').value;

    if (_.isEmpty(email)) {
        document.getElementById('email-error').innerHTML = 'Vui lòng nhập email!'
    } else if (!checkEmail(email)) {
        document.getElementById('email-error').innerHTML = 'Email không đúng định dạng!'
    } else {
        document.getElementById('email-error').innerHTML = "";
        return true;
    }
}

function phoneValid() {
    var phone = document.getElementById('phone').value;

    if (_.isEmpty(phone)) {
        document.getElementById('phone-error').innerHTML = 'Vui lòng nhập số điện thoại!'
    } else if (9 < phone.length > 11) {
        document.getElementById('phone-error').innerHTML = 'Số điện thoại không đúng!'
    } else if (!Number(phone)) {
        document.getElementById('phone-error').innerHTML = 'Bạn nhập không phải số!'
    }
    else {
        document.getElementById('phone-error').innerHTML = ''
        return true;
    }
}

function addProduct() {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var address = document.getElementById('address').value;
    var city = document.getElementById('country').value;
    var wards = document.getElementById('wards').value;
    var district = document.getElementById('district').value;
    var phone = document.getElementById('phone').value;
    var arr = JSON.parse(localStorage.getItem("product"));

    if (nameValid() && emailValid() && phoneValid() == true) {
        product.push({
            id: arr ? Number(arr.length) + 1 : 1,
            name: name,
            email: email,
            address: address,
            city: city,
            wards: wards,
            district: district,
            phone: phone
        });
        if (product == false) {
            alert("Thêm người dùng thất bại!");
        } else {
            alert("Thêm người dùng thành công!");
            toggleModal();
            localStorage.setItem('product', JSON.stringify(product));
        }
        clearForm();
    }
    renderList();
}

function deleteProduct(id) {
    var product = localStorage.getItem('product') ? JSON.parse(localStorage.getItem('product')) : [];
    var isSuccess = confirm(`Bạn muốn xóa ${id}`);

    if (isSuccess) {
        for (let i = 0; i < product.length; i++) {
            if (product[i].id == id) {
                product.splice(i, 1);
                alert("Xoa thanh cong!");
                break;
            }
        }
    }
    localStorage.setItem('product', JSON.stringify(product));
    renderList();
}


function renderList() {
    let userList = localStorage.getItem('product') ? JSON.parse(localStorage.getItem('product')) : [];
    if (product === 0) {
        return false;
    }
    let tableContent = `
    <table>
    <tr>
        <td>Id</td>
        <td>Name</td>
        <td>Email</td>
        <td>Action</td>
    </tr>
    </table>`;

    product = userList;
    totalPage = Math.ceil(product.length / perPage);
    console.log("2222", totalPage);
    product.forEach((val, idx) => {
        if (idx >= start && idx < end) {
            idx++;

            tableContent += `<tr>
        <td>${val.id}</td>
        <td>${val.name}</td>
        <td>${val.email}</td>
        <td><button class="btn-trash" onclick="deleteProduct(${val.id})">
                                        <ion-icon name="trash-outline"></ion-icon>
                                    </button>
                                        <button class="btn-pencil" onclick = "openUpdateDialog(${val.id})">
                                        <ion-icon name="pencil-outline"></ion-icon>
                                        </button>
                                    </td>
        </tr>`
        }
    })
    document.getElementById('testelement').innerHTML = tableContent;
}

function openUpdateDialog(id) {
    toggleModal();
    // var products = localStorage.getItem('product') ? JSON.parse(localStorage.getItem('product')) : [];
    for (let i = 0; i < product.length; i++) {
        if (product[i].id == id) {
            updateId = id;
            document.getElementById("name").value = product[i].name;
            document.getElementById("email").value = product[i].email;
            document.getElementById("phone").value = product[i].phone;
            document.getElementById("address").value = product[i].address;
        }
    }
}

function update() {
    localStorage.getItem('product') ? JSON.parse(localStorage.getItem('product')) : [];
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var address = document.getElementById('address').value;
    var city = document.getElementById('country').value;
    var wards = document.getElementById('wards').value;
    var district = document.getElementById('district').value;
    var phone = document.getElementById('phone').value;

    newProduct = {
        id: updateId,
        name: name,
        email: email,
        address: address,
        city: city,
        wards: wards,
        district: district,
        phone: phone
    }
    for (let i = 0; i < product.length; i++) {

        if (product[i].id == updateId) {
            if (nameValid() && emailValid() && phoneValid() == true) {
                product.splice(i, 1, newProduct);
                alert("Update thành công!")
                break;
            }
        }
    }
    toggleModal();
    localStorage.setItem('product', JSON.stringify(product));
    renderList();
}


function renderSearch(array) {
    console.log("array", array);
    let data = localStorage.getItem('product') ? JSON.parse(localStorage.getItem('product')) : [];
    let tableContent = `
    <table>
    <tr>
        <td>Id</td>
        <td>Name</td>
        <td>Email</td>
        <td>Action</td>
    </tr>
    </table>`;

    product = data;
    array.map((val, idx) => {
        idx++;

        tableContent += `<tr>
        <td>${val.id}</td>
        <td>${val.name}</td>
        <td>${val.email}</td>
        <td><button class="btn-trash" onclick="deleteProduct(${val.id})">
                                        <ion-icon name="trash-outline"></ion-icon>
                                    </button>
                                        <button class="btn-pencil" onclick = "openUpdateDialog(${val.id})">
                                        <ion-icon name="pencil-outline"></ion-icon>
                                        </button>
                                    </td>
                                    
        </tr>`

    })
    document.getElementById('testelement').innerHTML = tableContent;
}

function searchUser() {
    let product = localStorage.getItem('product') ? JSON.parse(localStorage.getItem('product')) : [];

    var finput = document.getElementById('search').value;

    // var search1 = value.name && value.email

    let userSearch = product.filter(value => {
        return value.name.toLowerCase().includes(finput.toLowerCase().trim()) || value.email.toLowerCase().includes(finput.toLowerCase().trim())
    })
    // let emailSearch = product.filter(value => {
    //     return value.email.toLowerCase().includes(finput.toLowerCase().trim())
    // })
    // console.log(userSearch);
    renderSearch(userSearch);
    // renderSearch(emailSearch);
}
renderList();

let currentPage = 1;
btnNext.addEventListener('click', () => {
    if (currentPage < totalPage) {
        currentPage++;
    }
    start = (currentPage - 1) * 5;
    end = currentPage * perPage;
    renderList();
})

btnPre.addEventListener('click', () => {
    currentPage--;
    if (currentPage <= 1) {
        currentPage = 1;
    }
    start = (currentPage - 1) * perPage;
    end = currentPage * perPage;
    renderList();
})

