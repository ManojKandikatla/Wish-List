//Element references
const productsContainer = document.getElementById("productContainer");
const cartcontainer = document.getElementById("cartContainer");
const feedbackElement = document.getElementById("feedback");
const clearcart = document.getElementById("ClearCart");
const sortBtn = document.getElementById("sorting");

//default products
const products = [
  {
    id: 1,
    name: "Laptop",
    price: 50000,
  },
  {
    id: 2,
    name: "Phone",
    price: 20000,
  },
  {
    id: 3,
    name: "TabLet",
    price: 5000,
  },
  {
    id: 4,
    name: "SmartWatch",
    price: 1000,
  },
  {
    id: 5,
    name: "HeadPhones",
    price: 500,
  },
];

const cart = [];

//clearing cart
clearcart.addEventListener("click", () => {
  cart.length = 0;
  renderCartDetails();
  updatefeedback("Cart Is Cleared", "Success");
});

//sorting cart
sortBtn.addEventListener("click", () => {
  cart.sort(function (item1, item2) {
    return item1.price - item2.price;
  });
  renderCartDetails();
});

function renderProductDetails() {
  products.forEach(function (product) {
    // <div class="product">
    //       <p>Laptop</p>
    //       <button>Add to Cart</button>
    //     </div>

    //   let productRow = `<div class="product">
    //         <p>${product.name} - Rs.${product.price}</P>
    //         <button> Add to Cart</button>
    //     </div>
    //         `;
    //   productsContainer.insertAdjacentHTML("beforeend", productRow);
    const { id, name, price } = product; //destructuring
    const divElement = document.createElement("div");
    divElement.className = "product";
    divElement.innerHTML = `<p>${name} - Rs.${price}</P><button onclick="addCart(${id})"> Add to Cart</button>
      `;
    productsContainer.appendChild(divElement);
  });
}

function renderCartDetails() {
  cartcontainer.innerHTML = ""; //making empty each time while pushing into cart
  cart.forEach(function (product) {
    const { id, name, price } = product; //destructure

    const cartRow = `<div class="product">
          <p>${name} - Rs.${price}</p>
          <button onclick="removeFromCart(${id})">Remove</button> 
        </div>`;
    cartcontainer.insertAdjacentHTML("beforeend", cartRow);
    //feedbackElement.textContent = `${name} is Added To Cart`;
  });
  //   let totalprice =0;
  //  for(let i=0;i<cart.length;i++){
  //   totalprice=totalprice+cart[i].price
  //  }

  //calculating total by reduce
  let totalprice = cart.reduce(function (accumulator, currentProd) {
    return accumulator + currentProd.price;
  }, 0); //initial accumulator value
  totalprice = document.getElementById(
    "totalprice"
  ).textContent = `Rs ${totalprice}`;
}

//destructuring
//Add to cart details
function addCart(ProductId) {
  const AvailableInCart = cart.some(function (product) {
    return product.id === ProductId; //checking if product is alredy avilable are not
  });
  if (AvailableInCart) {
    const productToAdd = products.find(function (product) {
      return product.id === ProductId;
    });
    updatefeedback(`${productToAdd.name} is Already Added To Cart..!`, "error");

    //feedbackElement.textContent = `${productToAdd.name} is Already Added To Cart..!`;
    return;
  } //retruns if alredy avaliable

  //console.log("add cart clicked",ProductId);
  const productToAdd = products.find(function (product) {
    return product.id === ProductId;
  });

  //console.log(productToAdd);
  cart.push(productToAdd);
  console.log(cart);
  renderCartDetails();

  updatefeedback(`${productToAdd.name} is Added To Cart`, "Success");
}

function removeFromCart(id) {
  const product = cart.find((product) => product.id === id);
  // const updatedCart=cart.filter(function(product){
  //   return product.id!==id //it will not remove unclicked one
  // });
  const productIndex = cart.findIndex((products) => products.id === id);
  cart.splice(productIndex, 1); //starting element,deleting element
  //console.log(updatedCart);
  updatefeedback(`${product.name} is removed From the Cart`, "error");
  renderCartDetails();
}

let timer;
function updatefeedback(msg, colourType) {
  clearTimeout(timer);
  feedbackElement.style.display = "block";

  if (colourType === "Success") {
    feedbackElement.style.backgroundColor = "rgb(5, 166, 5)";
    feedbackElement.style.color = "white";
  }
  if (colourType === "error") {
    feedbackElement.style.backgroundColor = "rgb(208, 39, 39)";
    feedbackElement.style.color = "white";
  }

  feedbackElement.textContent = msg;

  timer = setTimeout(function () {
    feedbackElement.style.display = "none";
  }, 1000);
}

//rendering products
renderProductDetails();
