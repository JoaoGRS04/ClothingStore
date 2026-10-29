import { products, type Product , type Category} from "./products.js";
import { filterByCategory, formatPrice, findById, filterByPrice } from "./catalog.js";
import { addToCart, removeFromCart, getCartTotal, clearCart, type Cart } from "./cart.js";
import { addBalance, withdrawBalance, resetBalance, type Wallet } from "./wallet.js";
import { completePurchase, clearOrders, type Orders} from "./order.js";

const list = document.querySelector<HTMLUListElement>("#product-list");
const filter = document.querySelector<HTMLSelectElement>("#category-filter");
const details = document.querySelector<HTMLElement>("#product-details");
const priceInput = document.querySelector<HTMLInputElement>("#max-price");
const cartList = document.querySelector<HTMLUListElement>("#cart-list");
const cartTotal = document.querySelector<HTMLElement>("#cart-total");
const clear = document.querySelector<HTMLButtonElement>("#clear");
const balanceText = document.querySelector<HTMLElement>("#wallet-balance");
const balanceInput = document.querySelector<HTMLInputElement>("#balance-input");
const walletMessage = document.querySelector<HTMLElement>("#wallet-message");
const addBalanceButton = document.querySelector<HTMLButtonElement>("#add-balance");
const withdrawBalanceButton = document.querySelector<HTMLButtonElement>("#withdraw-balance");
const resetBalanceButton = document.querySelector<HTMLButtonElement>("#reset-balance");
const completePurchaseButton = document.querySelector<HTMLButtonElement>("#complete-purchase");
const orderMessage = document.querySelector<HTMLElement>("#order-message");
const ordersList = document.querySelector<HTMLUListElement>("#orders-list");
const ordersPanel = document.querySelector<HTMLElement>("#orders-panel");
const toggleOrdersButton = document.querySelector<HTMLButtonElement>("#toggle-orders");
const clearOrdersButton = document.querySelector<HTMLButtonElement>("#clear-orders");
const cart: Cart = [];
const myWallet: Wallet = {balance: 0};
const orders: Orders = [];
let productDetailsId: number | undefined;

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

function renderCart(): void {
  if (!cartList || !cartTotal) return;

  if (cart.length === 0) {
    cartList.innerHTML = "<li>Carrinho vazio.</li>";
    cartTotal.textContent = "";
    if (clear)
      clear.hidden = true;   
    if (completePurchaseButton)
      completePurchaseButton.hidden = true;
    return;
  }
  if (clear) 
    clear.hidden = false;
  if (completePurchaseButton)
      completePurchaseButton.hidden = false;
  cartList.innerHTML = cart
    .map((item) => {
      const product = findById(item.id);
      if (!product) return "";

      return `<li>${product.name} x${item.quantity} - ${formatPrice(item.price * item.quantity)}
        <button data-action="add" data-id="${item.id}">+</button>
        <button data-action="remove" data-id="${item.id}">-</button></li>`;
    })
    .join("");

  cartTotal.textContent = `Total: ${formatPrice(getCartTotal(cart))}`;
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
    <button data-action="add" data-id="${product.id}" ${product.inStock ? "" : "disabled"}>
    Adicionar ao carrinho
    </button>
  `;
  productDetailsId = product.id;
}

function renderWallet(): void {
  if (!balanceText) return;
  balanceText.textContent = `Saldo: ${formatPrice(myWallet.balance)}`;
}

function renderOrders(): void {
  if (!ordersList) return;

  if (orders.length === 0) {
    ordersList.innerHTML = "<li>Histórico vazio.</li>";
    if (clearOrdersButton) 
      clearOrdersButton.hidden = true;
    return;
  }
  if (clearOrdersButton) clearOrdersButton.hidden = false;
  ordersList.innerHTML = orders
    .map((order, index) => {
      const items = order
        .map((item) => {
          const product = findById(item.id);
          if (!product) return "";

          return `<li>${product.name} x${item.quantity} - ${formatPrice(item.price * item.quantity)}</li>`;
        })
        .join("");

      return `<li class="order">
        <strong>Pedido ${index + 1} - Total: ${formatPrice(getCartTotal(order))}</strong>
        <ul>${items}</ul>
      </li>`;
    })
    .reverse()
    .join("");
}

function showMessage(text: string): void {
  if (!walletMessage) return;
  walletMessage.textContent = text;
}

function showOrderMessage(text: string): void {
  if (!orderMessage) return;
  orderMessage.textContent = text;
}

function applyFilters(): void {
  const category = (filter?.value ?? "all") as Category | "all";
  let items = category === "all" ? products : filterByCategory(category);

   if (priceInput && priceInput.value !== "") {
    items = filterByPrice(Number(priceInput.value), items);
  }

  if (!items.some((p) => p.id === productDetailsId) && productDetailsId) {
    if (details) {
      details.innerHTML = "";
      productDetailsId = undefined;
    }
  }
  renderProducts(items);
}

filter?.addEventListener("change", applyFilters);
priceInput?.addEventListener("input", applyFilters);


list?.addEventListener("click", (event) => {
  const target = event.target as HTMLElement;
  const id = target.dataset.id;
  if (id === undefined) return;

  renderDetails(findById(Number(id)));
});

details?.addEventListener("click", (event) => {
  const target = event.target as HTMLElement;
  if (target.dataset.action !== "add") return;

  showOrderMessage("");
  addToCart(cart, Number(target.dataset.id));
  renderCart();
});

cartList?.addEventListener("click", (event) => {
  const target = event.target as HTMLElement;
  if (target.dataset.action !== "remove" && target.dataset.action !== "add") return;
  showOrderMessage("");
  if (target.dataset.action === "remove") {
    removeFromCart(cart, Number(target.dataset.id));
  }
  if (target.dataset.action === "add"){
    addToCart(cart, Number(target.dataset.id));
  }
  renderCart();
});

clear?.addEventListener("click", () => {
  showOrderMessage("");
  clearCart(cart);
  renderCart();
});

addBalanceButton?.addEventListener("click", () => {
  const ok = addBalance(myWallet, Number(balanceInput?.value));
  showMessage(ok ? "" : "Valor digitado inválido.");
  renderWallet();
});

withdrawBalanceButton?.addEventListener("click", () => {
  const ok = withdrawBalance(myWallet, Number(balanceInput?.value));
  showMessage(ok ? "" : "Valor digitado inválido.");
  renderWallet();
});

resetBalanceButton?.addEventListener("click", () => {
  resetBalance(myWallet);
  showMessage("");
  renderWallet();
});

completePurchaseButton?.addEventListener("click", () => {
  const ok = completePurchase(cart, myWallet, orders);
  showOrderMessage(ok ? "Compra finalizada com sucesso!" : "Saldo insuficiente.");
  renderWallet();
  renderCart();
  renderOrders();
});

toggleOrdersButton?.addEventListener("click", () => {
  if (!ordersPanel || !toggleOrdersButton) return;

  ordersPanel.hidden = !ordersPanel.hidden;
  toggleOrdersButton.textContent = ordersPanel.hidden
    ? "Visualizar histórico de pedidos"
    : "Fechar histórico de pedidos";
});

clearOrdersButton?.addEventListener("click", () => {
  clearOrders(orders);
  renderOrders();
});

applyFilters();
renderCart();
renderOrders();

