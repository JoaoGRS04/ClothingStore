type Category = "shirt" | "pants" | "jacket" | "shoes"


interface Product {
    id: number;
    name: string;
    price: number;
    category: Category;
    inStock : boolean;
}

const products: Product = [
    {
    id: 1,
    name: "Blue shirt",
    price: 50,
    category: "shirt",
    inStock: true
    },
    {
    id: 2,
    name: "Red pants",
    price: 75,
    category: "pants",
    inStock: true
    },
    {
    id: 3,
    name: "Green jacket",
    price: 80,
    category: "jacket",
    inStock: false
    },
    {
    id: 4,
    name: "Black shoes",
    price: 100,
    category: "shoes",
    inStock: true
    }
]

function find_by_id(id: number){
    return products.find((product) => product.id === id);
}

function filter_by_category(category: Category){
    return products.filter((product) => product.category === category);
}

function filter_by_price(price: number){
    return products.filter((product) => product.price <= price);
}
