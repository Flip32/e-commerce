import React from 'react';
import { Product } from '../types';
import { useStore } from '../store/useStore';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
    product: Product;
    onOpenModal: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onOpenModal }) => {
    const addToCart = useStore((state) => state.addToCart);

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
            <div
                className="cursor-pointer"
                onClick={() => onOpenModal(product)}
            >
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                />
                <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                    <p className="text-gray-600 mt-1">{product.description}</p>
                    <p className="text-xl font-bold text-indigo-600 mt-2">
                        ${product.price.toFixed(2)}
                    </p>
                </div>
            </div>
            <div className="p-4 pt-0">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                    }}
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
                >
                    <ShoppingCart size={20} />
                    Add to Cart
                </button>
            </div>
        </div>
    );
};
