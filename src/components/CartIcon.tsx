import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Link } from 'react-router-dom';

export const CartIcon: React.FC = () => {
    const cart = useStore((state) => state.cart);
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <Link to="/cart" className="relative">
            <ShoppingCart size={24} className="text-gray-800" />
            {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {itemCount}
        </span>
            )}
        </Link>
    );
};
