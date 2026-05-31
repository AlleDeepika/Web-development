const products = [
  {
    name: "Headphones",
    price: "₹999",
    image: "https://via.placeholder.com/200"
  },
  {
    name: "Smart Watch",
    price: "₹1999",
    image: "https://via.placeholder.com/200"
  },
  {
    name: "Shoes",
    price: "₹1499",
    image: "https://via.placeholder.com/200"
  }
];

const productList = document.getElementById("product-list");

if (productList) {
  products.forEach(product => {
    const card = document.createElement("div");

    card.className = "card";

    card.innerHTML = `
      <img src="${product.image}">
      <h3>${product.name}</h3>
      <p>${product.price}</p>
      <button>Add to Cart</button>
    `;

    productList.appendChild(card);
  });
}