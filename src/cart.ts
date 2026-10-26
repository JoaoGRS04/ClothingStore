import { products, type Product } from "./products.js";

export interface CartItem {
    id: number;
    quantity: number;
}

export type Cart = CartItem[];

export function addToCart(cart: Cart, id: number) {
    if  (products.find((p) => p.id === id)?.inStock) {
        cart.push({id: id, quantity: 1})
    }
}