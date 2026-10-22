import { products, type Category, type Product } from "./products.js";

export function findById(id: number): Product | undefined {
  return products.find((product) => product.id === id);
}

export function filterByCategory(category: Category): Product[] {
  return products.filter((product) => product.category === category);
}

export function filterByPrice(price: number, items: Product[]){
    return items.filter((product) => product.price <= price);
}

export function formatPrice(price: number){
  return `R$ ${price.toFixed(2).replace(".", ",")}`;
}