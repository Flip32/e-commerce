import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { Trash2, ArrowLeft, ShoppingBag } from 'lucide-react';

export const Cart: React.FC = () => {
    const { cart, removeFromCart, updateQuantity } = useStore();
    const navigate = useNavigate();

    const total = cart.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
    );

    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
                <ShoppingBag size={48} className="text-gray-400 mb-4" />
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Your cart is empty</h2>
                <Link
                    to="/"
                    className="text-indigo-600 hover:text-indigo-700 flex items-center gap-2"
                >
                    <ArrowLeft size={20} />
                    Continue Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-3xl mx-auto px-4">
                <div className="flex items-center mb-8">
                    <Link to="/" className="text-gray-600 hover:text-gray-800 mr-4">
                        <ArrowLeft size={24} />
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-800">Shopping Cart</h1>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    {cart.map((item) => (
                        <div
                            key={item.product.id}
                            className="flex items-center py-4 border-b last:border-b-0"
                        >
                            <img
                                src={item.product.image}
                                alt={item.product.name}
                                className="w-20 h-20 object-cover rounded"
                            />
                            <div className="flex-1 ml-4">
                                <h3 className="text-lg font-semibold text-gray-800">
                                    {item.product.name}
                                </h3>
                                <p className="text-gray-600">${item.product.price.toFixed(2)}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <select
                                    value={item.quantity}
                                    onChange={(e) =>
                                        updateQuantity(item.product.id, parseInt(e.target.value))
                                    }
                                    className="rounded border p-1"
                                >
                                    {[1, 2, 3, 4, 5].map((num) => (
                                        <option key={num} value={num}>
                                            {num}
                                        </option>
                                    ))}
                                </select>
                                <button
                                    onClick={() => removeFromCart(item.product.id)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex justify-between mb-4">
                        <span className="text-lg font-semibold">Total:</span>
                        <span className="text-2xl font-bold text-indigo-600">
              ${total.toFixed(2)}
            </span>
                    </div>
                    <button
                        onClick={() => navigate('/checkout')}
                        className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition-colors"
                    >
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};
