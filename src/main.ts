import { products, type Product , type Category} from "./products.js";
import { filterByCategory, formatPrice } from "./catalog.js";

const list = document.querySelector<HTMLUListElement>("#product-list");
const filter = document.querySelector<HTMLSelectElement>("#category-filter");

function renderProducts(items: Product[]): void {
  if (!list) return;

  list.innerHTML = items
    .map((p) => {
      const stock = p.inStock ? "" : " (sem estoque)";
      return `<li>${p.name} - ${formatPrice(p.price)}${stock}</li>`;
    })
    .join("");
}
if (filter) {
  filter.addEventListener("change", () => {
    const value = filter.value as Category | "all";
    const items = value === "all" ? products : filterByCategory(value);
    renderProducts(items);
  });
}
renderProducts(products);