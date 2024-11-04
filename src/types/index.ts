export type ProductType = 'Electronics' | 'Clothing' | 'Books' | 'Home' | 'Sports';

export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    type: ProductType;
    image: string;
    details: string[];
}

export interface CartItem {
    product: Product;
    quantity: number;
}

export interface UserData {
    email: string;
    name: string;
    cpf: string;
    address: Address;
    billingAddress?: Address;
}

export interface Address {
    street: string;
    number: string;
    complement?: string;
    city: string;
    state: string;
    zipCode: string;
}

export interface PaymentData {
    method: 'credit' | 'pix' | 'boleto';
    cardNumber?: string;
    cardHolder?: string;
    expiryDate?: string;
    cvv?: string;
}
