type Category = "shirt" | "pants" | "jacket" | "shoes"


interface Product {
    id: number;
    name: string;
    price: number;
    category: Category;
    inStock : boolean;
}
