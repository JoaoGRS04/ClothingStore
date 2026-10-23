import { products, type Product , type Category} from "./products.js";
import { filterByCategory, formatPrice, findById, filterByPrice } from "./catalog.js";

const list = document.querySelector<HTMLUListElement>("#product-list");
const filter = document.querySelector<HTMLSelectElement>("#category-filter");
const details = document.querySelector<HTMLElement>("#product-details");
const priceInput = document.querySelector<HTMLInputElement>("#max-price");

function renderProducts(items: Product[]): void {
  if (!list) return;

  if (items.length === 0) {
  list.innerHTML = "<li>Nenhum produto encontrado.</li>";
  return;
  }

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
  let items = category === "all" ? products : filterByCategory(category);

   if (priceInput && priceInput.value !== "") {
    items = filterByPrice(Number(priceInput.value), items);
  }

  renderProducts(items);
}

filter?.addEventListener("change", applyFilters);
priceInput?.addEventListener("input", applyFilters);

applyFilters();

list?.addEventListener("click", (event) => {
  const target = event.target as HTMLElement;
  const id = target.dataset.id;
  if (id === undefined) return;

  renderDetails(findById(Number(id)));
});

