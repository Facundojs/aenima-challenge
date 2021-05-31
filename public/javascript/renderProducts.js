const GET_ALL_URL = "http://localhost:3010/api/v1/products/getall";
const POST_URL = "http://localhost:3010/api/v1/products/store";
const DELETE_URL = "http://localhost:3010/api/v1/products/delete/";
const UPDATE_URL = "http://localhost:3010/api/v1/products/update/";
let itemsRendered = "";
const productList = document.querySelector("#product-list");
function apiGetProducts(url) {
    productList.innerHTML  =""
    const headerTotal = document.querySelector("#header-total");
    fetch(url)
        .then((res) => res.json())
        .then((products) => {
            if (products.conectionError) {
                productList.innerHTML += `${products.conectionError.msg}`
            } else if(!products.products) {
                productList.innerHTML += `${products.msg}`
            } else {
                itemsRendered = products.products;
                products.products.forEach(element => {
                    productList.innerHTML += `
                        <div class="card m-2">
                            <img src="../public/images/${element.image}">
                            <h3 class="border-top"><span class="h5">${element.name}</span> - $<span>${element.price}</span></h3>
                            <div class="focus-content">
                                <p>${element.description}.<br/>
                                <i id="${element.id}" deleteButton class="fas fa-trash btn"></i>
                                 
                                <i id="${element.id}" editButton class="fas fa-pen btn"></i>
                                </p>
                            </div>
                        </div>
                    `
                });
                headerTotal.innerHTML = `Total: ${products.total}`
            }
        })
}
window.addEventListener('load', apiGetProducts(GET_ALL_URL))
const storeForm = document.querySelector("#store-form");
const storeValidations = document.querySelector("#store-validations");

function apiStoreProduct() {
    storeValidations.innerHTML = ""
    const formData = new FormData(storeForm)
    const fetchConfig = {
        method: 'POST',
        body: formData
    };
    fetch(POST_URL, fetchConfig)
    .then((res)=> res.json())
        .then((resp) => {
            storeForm.reset()
            if (resp.errors) {
                resp.errors.forEach((element) => {
                    storeValidations.innerHTML += `
                    <div>${element.msg}</div>
                    `
                })
                return false
            }
            return false
        })
    return false;
}

// Store modal

const formModal = document.querySelector('#store-form-modal');
const showStoreForm = document.querySelector('#add-product');
const closeStoreForm = document.querySelector('#close-modal');

function openStoreModal() {
    formModal.style.display = 'block';
}
function closeStoreModal() {
    formModal.style.display = 'none';
}

showStoreForm.addEventListener('click', function () {
    closeEditModal()
    openStoreModal()
});

closeStoreForm.addEventListener('click', function () {
    closeStoreModal()
});

// Delete 
let modalIdProduct = null;
productList.addEventListener('click', (e) => {
    switch (e.target.classList[1]) {
        case "fa-trash":
            deleteProduct(DELETE_URL, e.target.id);
            ; break;
        case "fa-pen":
            modalIdProduct = e.target.id;
            openEditModal(e.target)
                ; break;
    }
});

function deleteProduct(url, id) {
    const finalUrl = `${url}${id}`;
    fetch(finalUrl, {
        method: "DELETE"
    }).then(() => {
        apiGetProducts(GET_ALL_URL)
    });
    
};

// Edit 

function openEditModal(target) {
    formModalEdit.style.display = 'block';
    seedModal(target);
}
function seedModal(target) {
    document.querySelector('#edit-name').value = target.offsetParent.childNodes[3].childNodes[0].textContent.trim();
    document.querySelector('#edit-price').value = target.offsetParent.childNodes[3].childNodes[2].textContent.trim();
    document.querySelector('#edit-description').value = target.parentElement.textContent.trim();
}
const formModalEdit = document.querySelector('#edit-form-modal');
const closeEditForm = document.querySelector('#close-edit-modal');
const closeEditFormButton = document.querySelector('#close-edit-modal-close');
const editForm = document.querySelector('#edit-form');

closeEditForm.addEventListener('click', function () {  
    closeEditModal();
});
closeEditFormButton.addEventListener('click', function () {  
    closeEditModal();
});

function closeEditModal() {
    formModalEdit.style.display = 'none';
};
const editValidations = document.querySelector("#edit-validations");

function apiEditProduct() {
    editValidations.innerHTML = "";
    const finalUrl = UPDATE_URL + modalIdProduct;
    const formData = new FormData(editForm);
    fetch(finalUrl, {
        method: "PUT",
        body: formData
    })
    .then((res)=>res.json())
        .then((response) => {
            if (response.errors) {
                response.errors.forEach((element) => {
                    editValidations.innerHTML += `
                    <div>${element.msg}</div>
                    `
                });
            } else {
                closeEditModal();
            };
    })
    return false;
}

const searchBar = document.querySelector("#search-bar");

searchBar.addEventListener('keyup', function (event) {
    // console.log(searchBar.value);
    productList.innerHTML = "";
    const valueToFind = (searchBar.value).toLowerCase();
    itemsRendered.filter((element) => {
        if ((element.name).toLowerCase().includes(valueToFind) ||
            element.price.includes(valueToFind) ||
            (element.description).toLowerCase().includes(valueToFind)
        ){
            productList.innerHTML += `
            <div class="card m-2">
                <img src="../public/images/${element.image}">
                <h3 class="border-top"><span class="h5">${element.name}</span> - $<span>${element.price}</span></h3>
                <div class="focus-content">
                    <p>${element.description}.<br/>
                    <i id="${element.id}" deleteButton class="fas fa-trash btn"></i>
                     
                    <i id="${element.id}" editButton class="fas fa-pen btn"></i>
                    </p>
                </div>
            </div>
        `
        }
    })
})