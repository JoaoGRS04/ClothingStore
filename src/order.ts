import {type Cart, getCartTotal} from "./cart.js"
import { type Wallet, withdrawBalance } from "./wallet.js"

export type Orders = Cart[]

export function completePurchase(cart: Cart, wallet: Wallet, orders: Orders) :boolean {
    const totalPrice = getCartTotal(cart);
    const orderResult = withdrawBalance(wallet, totalPrice);
    if (!orderResult) 
        return false;
    orders.push([...cart]);
    cart.length = 0;
    return true;
}

export function clearOrders(orders: Orders) :void {
    orders.length = 0;
}