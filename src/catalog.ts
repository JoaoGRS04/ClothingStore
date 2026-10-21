import { products, type Category, type Product } from "./products.js";

export function findById(id: number): Product | undefined {
  return products.find((product) => product.id === id);
}

export function filterByCategory(category: Category): Product[] {
  return products.filter((product) => product.category === category);
}

export function filter_by_price(price: number){
    return products.filter((product) => product.price <= price);
}