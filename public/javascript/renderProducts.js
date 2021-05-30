const GET_ALL_URL = "http://localhost:3010/api/v1/products/getall";
const POST_URL = "http://localhost:3010/api/v1/products/store";
const DELETE_URL = "http://localhost:3010/api/v1/products/delete/";
const UPDATE_URL = "http://localhost:3010/api/v1/products/update/";

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
                products.products.forEach(element => {
                    productList.innerHTML += `
                        <div class="card m-2">
                            <img src="https://picsum.photos/id/404/367/267"/>
                            <h3><span>${element.name}</span> - $<span>${element.price}</span></h3>
                            <div class="focus-content">
                                <p>${element.description}.<br/>
                                <i id="${element.id}" deleteButton class="fas fa-trash btn"></i>
                                 -
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
            console.log(resp)
            storeForm.reset()
            if (resp.errors) {
                resp.errors.forEach((element) => {
                    storeValidations.innerHTML += `
                    <p>${element.msg}</p>
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

showStoreForm.addEventListener('click', function() {
    formModal.style.display = 'block';
})

closeStoreForm.addEventListener('click', function () {
    formModal.style.display = 'none';
});

// Delete 
let modalIdProduct = null;
productList.addEventListener('click', (e) => {
    switch (e.target.classList[1]) {
        case "fa-trash":
            deleteProduct(DELETE_URL, e.target.id)
                ; break;
        case "fa-pen":
            modalIdProduct = e.target.id
            console.log(modalIdProduct);
            openEditModal(e.target)
            ; break;
    }
})

function deleteProduct(url, id) {
    const finalUrl = `${url}${id}`
    fetch(finalUrl, {
        method: "DELETE"
    }).then(() => {
        apiGetProducts(GET_ALL_URL)
    })
    
}

// Edit 

function openEditModal(target) {
    formModalEdit.style.display = 'block'
    seedModal(target)
}
function seedModal(target) {
    document.querySelector('#edit-name').value = target.offsetParent.childNodes[3].childNodes[0].textContent.trim();
    document.querySelector('#edit-price').value = target.offsetParent.childNodes[3].childNodes[2].textContent.trim();
    document.querySelector('#edit-description').value = target.parentElement.textContent.trim()
}
const formModalEdit = document.querySelector('#edit-form-modal');
const closeEditForm = document.querySelector('#close-edit-modal');
const closeEditFormButton = document.querySelector('#close-edit-modal-close');
const editForm = document.querySelector('#edit-form');

closeEditForm.addEventListener('click', function () {  
    formModalEdit.style.display = 'none'; //Crear funcion cerrar edit modal
});
closeEditFormButton.addEventListener('click', function () {  
    formModalEdit.style.display = 'none'; //Crear funcion cerrar edit modal
});


function apiEditProduct() {
    const finalUrl = UPDATE_URL + modalIdProduct
    console.log(finalUrl);
    const formData = new FormData(editForm)
    fetch(finalUrl, {
        method: "PUT",
        body: formData
    })
    return false;
}