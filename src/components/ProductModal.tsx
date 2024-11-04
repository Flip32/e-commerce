import React from 'react';
import { Product } from '../types';
import { X, ShoppingCart } from 'lucide-react';
import { useStore } from '../store/useStore';

interface ProductModalProps {
    product: Product;
    onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
    const addToCart = useStore((state) => state.addToCart);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="relative">
                    <button
                        onClick={onClose}
                        className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
                    >
                        <X size={24} />
                    </button>
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-64 object-cover"
                    />
                </div>
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-800">{product.name}</h2>
                    <p className="text-gray-600 mt-2">{product.description}</p>
                    <div className="mt-4">
                        <h3 className="font-semibold text-lg">Details:</h3>
                        <ul className="list-disc list-inside mt-2 space-y-1">
                            {product.details.map((detail, index) => (
                                <li key={index} className="text-gray-600">{detail}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="mt-6 flex items-center justify-between">
            <span className="text-2xl font-bold text-indigo-600">
              ${product.price.toFixed(2)}
            </span>
                        <button
                            onClick={() => {
                                addToCart(product);
                                onClose();
                            }}
                            className="bg-indigo-600 text-white py-2 px-6 rounded-md hover:bg-indigo-700 transition-colors flex items-center gap-2"
                        >
                            <ShoppingCart size={20} />
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
