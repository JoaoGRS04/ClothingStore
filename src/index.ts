import { products, type Product, type Category } from "./products.js";
import promptSync from 'prompt-sync';
const prompt = promptSync();


function search_by_id(id: number){
    return products.find((product) => product.id === id);
}

function filter_by_category(category: Category){
    return products.filter((product) => product.category === category);
}

function filter_by_price(price: number){
    return products.filter((product) => product.price <= price);
}

