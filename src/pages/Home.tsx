import React, { useState } from 'react';
import { ProductCard } from '../components/ProductCard';
import { ProductModal } from '../components/ProductModal';
import { CartIcon } from '../components/CartIcon';
import { products } from '../data/products';
import { Product, ProductType } from '../types';

const productTypes: ProductType[] = ['Electronics', 'Clothing', 'Books', 'Home', 'Sports'];

export const Home: React.FC = () => {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [selectedType, setSelectedType] = useState<ProductType | 'all'>('all');

    const filteredProducts = selectedType === 'all'
        ? products
        : products.filter(product => product.type === selectedType);

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-800">Modern Shop</h1>
                    <CartIcon />
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 py-8">
                <div className="mb-8">
                    <div className="flex gap-2 overflow-x-auto pb-4">
                        <button
                            onClick={() => setSelectedType('all')}
                            className={`px-4 py-2 rounded-full ${
                                selectedType === 'all'
                                    ? 'bg-indigo-600 text-white'
                                    : 'bg-white text-gray-600 hover:bg-gray-100'
                            }`}
                        >
                            All
                        </button>
                        {productTypes.map((type) => (
                            <button
                                key={type}
                                onClick={() => setSelectedType(type)}
                                className={`px-4 py-2 rounded-full whitespace-nowrap ${
                                    selectedType === type
                                        ? 'bg-indigo-600 text-white'
                                        : 'bg-white text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onOpenModal={setSelectedProduct}
                        />
                    ))}
                </div>
            </main>

            {selectedProduct && (
                <ProductModal
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                />
            )}
        </div>
    );
};
