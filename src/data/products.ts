import { Product } from '../types';

export const products: Product[] = [
    {
        id: '1',
        name: 'Premium Wireless Headphones',
        price: 299.99,
        description: 'High-quality wireless headphones with noise cancellation',
        type: 'Electronics',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
        details: [
            'Active Noise Cancellation',
            '30-hour battery life',
            'Premium sound quality',
            'Bluetooth 5.0'
        ]
    },
    {
        id: '2',
        name: 'Classic Denim Jacket',
        price: 89.99,
        description: 'Timeless denim jacket for any casual occasion',
        type: 'Clothing',
        image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&q=80',
        details: [
            '100% Cotton Denim',
            'Classic fit',
            'Button closure',
            'Multiple pockets'
        ]
    },
    {
        id: '3',
        name: 'Smart Watch Pro',
        price: 199.99,
        description: 'Advanced smartwatch with health tracking features',
        type: 'Electronics',
        image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=80',
        details: [
            'Heart rate monitoring',
            'Sleep tracking',
            'Water resistant',
            '5-day battery life'
        ]
    }
];
