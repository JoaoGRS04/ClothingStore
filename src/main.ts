import { products, type Product } from "./products.js";
import { formatPrice } from "./catalog.js";

const list = document.querySelector<HTMLUListElement>("#product-list");

function renderProducts(items: Product[]): void {
  if (!list) return;

  list.innerHTML = items
    .map((p) => {
      const stock = p.inStock ? "" : " (sem estoque)";
      return `<li>${p.name} - ${formatPrice(p.price)}${stock}</li>`;
    })
    .join("");
}

renderProducts(products);