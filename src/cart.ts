import { findById } from "./catalog.js";
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

export function removeFromCart(cart: Cart, id: number ) {
    const cartItem = cart.find((item) => item.id === id);
    if (cartItem) {
        if (cartItem.quantity > 1) {
            cartItem.quantity -= 1;
        }
        else {
            const index = cart.indexOf(cartItem)
            cart.splice(index, 1)
        }
    }
}