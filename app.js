const productInput = document.querySelector(".add-product-input");
const addButton = document.querySelector(".add-product-btn")
const productList = document.querySelector(".products-list");
let quantity = document.querySelector(".quantity");
let totalInput = document.getElementById('total');
// console.log(productInput.value);
const arr = document.getElementsByClassName("price-product-input");
const countBtn = document.querySelector(".count-btn");
const speechBtn = document.querySelector(".speech-btn");
const stopSpeechBtn = document.querySelector(".stop");
// console.log(stopSpeechBtn);

let quantityJs = 0;
// let click = 0;

addButton.addEventListener("click", addProduct);
productList.addEventListener("click", deleteProduct);
document.addEventListener('DOMContentLoaded', getProductsStorage);

function addProduct(event) {
    event.preventDefault();
    productInput.classList.remove("warning");
    productInput.placeholder = "type a product";

    const productDiv = document.createElement("div");
    productDiv.classList.add("product");

    const newProduct = document.createElement('li');
    newProduct.innerText = productInput.value;
    newProduct.classList.add('product-text');
    if (productInput.value.length > 0) {

        productDiv.appendChild(newProduct);
        //local storage
        saveLocalTodos(productInput.value);

        const productPrice = document.createElement("li");
        productPrice.classList.add("product-price");
        const priceProductInput = document.createElement("input");
        priceProductInput.classList.add("price-product-input");
        // console.log(priceProductInput);
        priceProductInput.placeholder = "$";
        productDiv.appendChild(productPrice);
        productPrice.appendChild(priceProductInput);

        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class="fas fa-times"></i>';
        trashButton.classList.add("trash-btn");
        productDiv.appendChild(trashButton);
        productList.appendChild(productDiv);

        productInput.value = "";

        quantityJs++;
        quantity.innerText = quantityJs;

    } else {
        productInput.classList.add("warning");
        productInput.placeholder = "can't be empty";
    }
    //wywołanie funkcji findTotal na nowopowstałe inputy ceny(price) 
    for (let i = 0; i < arr.length; i++) {
        // console.log(arr[i]);
        arr[i].addEventListener('change', findTotal);
    }
}

function findTotal() {
    let tot = 0;
    for (let i = 0; i < arr.length; i++) {
        // console.log(arr[i].value);
        arr[i].value = arr[i].value.replace(/,/g, '.');
        if (parseFloat(arr[i].value))
            tot += parseFloat(arr[i].value);
    }
    totalInput.innerHTML = tot.toFixed(2);
}

function deleteProduct(e) {

    const item = e.target;

    if (item.classList[0] === "fas") {

        const product = item.parentElement;
        removeStorageProducts(product.parentElement);

        product.parentElement.remove();

        quantityJs--;
        quantity.innerText = quantityJs;
    }
    findTotal();
}
//local storage
function saveLocalTodos(productStorage) {
    let todos;
    //check if is there any lcoal storage
    if (localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    // console.log(productStorage);
    todos.push(productStorage);
    localStorage.setItem("todos", JSON.stringify(todos));

}

function getProductsStorage() {

    let todos;
    //check if is there any lcoal storage
    if (localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.forEach(function (productStorage) {

        const productDiv = document.createElement("div");
        productDiv.classList.add("product");
        const newProduct = document.createElement('li');
        newProduct.innerText = productStorage;
        newProduct.classList.add('product-text');

        productDiv.appendChild(newProduct);

        const productPrice = document.createElement("li");
        productPrice.classList.add("product-price");
        const priceProductInput = document.createElement("input");
        priceProductInput.classList.add("price-product-input");
        // console.log(priceProductInput);
        priceProductInput.placeholder = "$";
        productDiv.appendChild(productPrice);
        productPrice.appendChild(priceProductInput);

        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class="fas fa-times"></i>';
        trashButton.classList.add("trash-btn");
        productDiv.appendChild(trashButton);
        productList.appendChild(productDiv);

        productInput.value = "";

        quantityJs++;
        quantity.innerText = quantityJs;

        //wywołanie funkcji findTotal na nowopowstałe inputy ceny(price) 
        for (let i = 0; i < arr.length; i++) {
            // console.log(arr[i]);
            arr[i].addEventListener('change', findTotal);
        }
    });
}

function removeStorageProducts(productStorage) {

    let todos;
    //check if is there any lcoal storage
    if (localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    const todoIndex = productStorage.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}

//speech detection
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;
recognition.lang = 'pl-PL';

let click = false;

speechBtn.addEventListener('click', addProductViaSpeech);
stopSpeechBtn.addEventListener('click', function () {

    click = !click;
    // console.log(click);
    // console.log(recognition);
})
recognition.addEventListener('end', () => click ? recognition.stop() : recognition.start());

// recognition.addEventListener('end', recognition.start);



function addProductViaSpeech(event) {
    event.preventDefault();
    recognition.start();

    // recognition.stop();

    recognition.addEventListener('result', e => {
        const transcript = Array.from(e.results).map(result => result[0]).map(result => result.transcript).join('');
        console.log(transcript);
        if (e.results[0].isFinal) {
            // p = document.createElement('p');
            // words.appendChild(p);
            const productDiv = document.createElement("div");
            productDiv.classList.add("product");

            const newProduct = document.createElement('li');
            newProduct.innerText = transcript;
            newProduct.classList.add('product-text');

            productDiv.appendChild(newProduct);
            //local storage
            console.log(newProduct.innerText);
            saveLocalTodos(newProduct.innerText);

            const productPrice = document.createElement("li");
            productPrice.classList.add("product-price");
            const priceProductInput = document.createElement("input");
            priceProductInput.classList.add("price-product-input");
            // console.log(priceProductInput);
            priceProductInput.placeholder = "$";
            productDiv.appendChild(productPrice);
            productPrice.appendChild(priceProductInput);

            const trashButton = document.createElement("button");
            trashButton.innerHTML = '<i class="fas fa-times"></i>';
            trashButton.classList.add("trash-btn");
            productDiv.appendChild(trashButton);
            productList.appendChild(productDiv);

            productInput.value = "";

            quantityJs++;
            quantity.innerText = quantityJs;

            productInput.classList.add("warning");
            productInput.placeholder = "speak!";

            //wywołanie funkcji findTotal na nowopowstałe inputy ceny(price) 
            for (let i = 0; i < arr.length; i++) {
                // console.log(arr[i]);
                arr[i].addEventListener('change', findTotal);
            }
        }
    });

}


// stopSpeechBtn.addEventListener('click', function () {
//     recognition.stop();
//     console.log('Speech recognition has stopped.');
// });

//         productInput.value = "";

//         quantityJs++;
//         quantity.innerText = quantityJs;

//       productInput.classList.add("warning");
//         productInput.placeholder = "can't be empty";

//     //wywołanie funkcji findTotal na nowopowstałe inputy ceny(price) 
//     for (let i = 0; i < arr.length; i++) {
//         // console.log(arr[i]);
//         arr[i].addEventListener('change', findTotal);
//     }
// 