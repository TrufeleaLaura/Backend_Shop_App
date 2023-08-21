export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
}


export interface User{
    id:number,
    firstName:string,
    lastName:string,
    email:string,
    password:string,
    address:string,
    phoneNumber:string,
    gender:string,
    birthDate:string,
}
export interface CartItem{
    productId: number;
    quantity: number;
    total: number;
    price:number;
    title:string;
    thumbnail:string;
    discountPercentage:number;
    discountedPrice:number;
}

export interface Cart {
    userId: number;
    total:number;
    discountedTotal:number;
    totalProducts:number;
    totalQuantity:number;
    products: CartItem[];
}

