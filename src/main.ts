import { products, type Product , type Category} from "./products.js";
import { filterByCategory, formatPrice, findById } from "./catalog.js";

const list = document.querySelector<HTMLUListElement>("#product-list");
const filter = document.querySelector<HTMLSelectElement>("#category-filter");
const details = document.querySelector<HTMLElement>("#product-details");

function renderProducts(items: Product[]): void {
  if (!list) return;

  list.innerHTML = items
    .map((p) => {
      const stock = p.inStock ? "" : " (sem estoque)";
      return `<li><button data-id="${p.id}">${p.name}</button> - ${formatPrice(p.price)}${stock}</li>`;
    })
    .join("");
}
function renderDetails(product: Product | undefined): void {
  if (!details) return;

  if (!product) {
    details.innerHTML = "<p>Produto não encontrado.</p>";
    return;
  }

  details.innerHTML = `
    <h3>${product.name}</h3>
    <p>Preço: ${formatPrice(product.price)}</p>
    <p>${product.inStock ? "Em estoque" : "Sem estoque"}</p>
  `;
}

function applyFilters(): void {
  const category = (filter?.value ?? "all") as Category | "all";
  const items = category === "all" ? products : filterByCategory(category);

  renderProducts(items);
}

filter?.addEventListener("change", applyFilters);

applyFilters();

list?.addEventListener("click", (event) => {
  const target = event.target as HTMLElement;
  const id = target.dataset.id;
  if (id === undefined) return;

  renderDetails(findById(Number(id)));
});

