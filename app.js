
const productInput = document.querySelector(".add-product-input");
const addButton = document.querySelector(".add-product-btn")
const productList = document.querySelector(".products-list");
let quantity = document.querySelector(".quantity");
let totalInput = document.getElementById('total');

const arr = document.getElementsByClassName("price-product-input");
const countBtn = document.querySelector(".count-btn");

let quantityJs = 0;


addButton.addEventListener("click", addProduct);
//nie potafię uruchomić funkcji find total dla każdego inputaw
// momencie zmiany jego wartości czyli event change
countBtn.addEventListener("click", findTotal);
productList.addEventListener("click", deleteProduct);


function addProduct(event){
    event.preventDefault();
    productInput.classList.remove("warning");
    productInput.placeholder = "type a product";


    const productDiv = document.createElement("div");
    productDiv.classList.add("product");  

    const newProduct = document.createElement('li');
    newProduct.innerText = productInput.value;
    newProduct.classList.add('product-text') ;

        if ( productInput.value.length > 0) {

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

            } 
        else {
            productInput.classList.add("warning");
            productInput.placeholder = "can't be empty";
                }

}

function findTotal(){
    let tot = 0;
    for (let i = 0; i < arr.length; i++) {
        if(parseFloat(arr[i].value))
        tot += parseFloat(arr[i].value);
          }
          totalInput.innerHTML = tot.toFixed(2);
}


function deleteProduct(e){
    
    const item = e.target;

    if(item.classList[0] === "fas"){

        const product = item.parentElement;
            product.parentElement.remove();

        quantityJs--;
        quantity.innerText = quantityJs;
    }
    findTotal();
}
