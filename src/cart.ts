import { findById } from "./catalog.js";

export interface CartItem {
    id: number;
    quantity: number;
}

export type Cart = CartItem[];

export function addToCart(cart: Cart, id: number) {
    if  (findById(id)?.inStock) {
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

export function getCartTotal(cart: Cart) {
    const total = cart.reduce((acc, item) => {
        const product = findById(item.id)
        if (!product)
            return acc + 0;
        return acc + (product.price * item.quantity)
    }, 0);
    return total;
}