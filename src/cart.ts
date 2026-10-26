import { products, type Product } from "./products.js";

export interface CartItem {
    id: number;
    quantity: number;
}

export type Cart = CartItem[];

export function addToCart(cart: Cart, id: number) {
    if  (products.find((p) => p.id === id)?.inStock) {
        const itemFound = cart.find((item) => item.id === id) 
        if (itemFound) {
            itemFound.quantity += 1;
        }
        else {
            cart.push({id: id, quantity: 1})
        }
    }
}