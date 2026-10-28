export interface Wallet {
    balance: number
}

export function addBalance(wallet: Wallet, value: number) {
    if (Number.isNaN(value) || value < 0) {
        return
    }
    wallet.balance += value;
}

export function withdrawBalance(wallet: Wallet, value: number) {
    if (Number.isNaN(value) || value <= 0 || value > wallet.balance) {
        return false
    }
    wallet.balance -= value;
    return true
}
export function resetBalance(wallet: Wallet) {
    wallet.balance = 0;
}