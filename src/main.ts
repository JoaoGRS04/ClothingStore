import { products } from "./products.js";

const list = document.querySelector<HTMLUListElement>("#product-list");

if (list) {
  list.innerHTML = products
    .map((p) => `<li>${p.name} - R$ ${p.price.toFixed(2)}</li>`)
    .join("");
}