const GET_ALL_URL = "http://localhost:3010/api/v1/products/getall";
const POST_URL = "http://localhost:3010/api/v1/products/store";
const DELETE_URL = "http://localhost:3010/api/v1/products/delete/";

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
                            <h3>${element.name} - $${element.price}</h3>
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
const storeFormSubmit = document.querySelector("#store-form-submit");

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

productList.addEventListener('click', (e) => {
    switch (e.target.classList[1]) {
        case "fa-trash":
            deleteProduct(DELETE_URL, e.target.id)
                ; break;
        case "fa-pen": console.log('pen'); break;
    }
})

function deleteProduct(url, id) {
    const finalUrl = `${url}${id}`
    fetch(finalUrl, {
        method: "DELETE"
    }).then(() => {
        apiGetProducts(GET_ALL_URL)
    })
    console.log(finalUrl);
}