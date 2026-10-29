import { findById } from "./catalog.js";

export interface CartItem {
    id: number;
    price: number;
    quantity: number;
}

export type Cart = CartItem[];

export function addToCart(cart: Cart, id: number) {
    const item = findById(id);
    if  (item?.inStock) {
        const itemFound = cart.find((item) => item.id === id) 
        if (itemFound) {
            itemFound.quantity += 1;
        }
        else {
            cart.push({id: id, price: item.price, quantity: 1})
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
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
}

export function clearCart(cart: Cart) {
    cart.length = 0;
}