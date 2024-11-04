import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

export const Success: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
                <CheckCircle size={64} className="text-green-500 mx-auto mb-6" />
                <h1 className="text-2xl font-bold text-gray-800 mb-4">
                    Order Completed Successfully!
                </h1>
                <p className="text-gray-600 mb-8">
                    Thank you for your purchase. We'll send you an email with your order details
                    and tracking information.
                </p>
                <Link
                    to="/"
                    className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700"
                >
                    Continue Shopping
                </Link>
            </div>
        </div>
    );
};
