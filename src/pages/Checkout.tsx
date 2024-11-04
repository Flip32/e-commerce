import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { useForm } from 'react-hook-form';
import { UserData, PaymentData } from '../types';
import { CreditCard, QrCode, Receipt } from 'lucide-react';

export const Checkout: React.FC = () => {
    const [step, setStep] = useState<'user-info' | 'payment'>('user-info');
    const [sameBillingAddress, setSameBillingAddress] = useState(true);
    const [paymentMethod, setPaymentMethod] = useState<'credit' | 'pix' | 'boleto'>('credit');

    const navigate = useNavigate();
    const { cart, setUserData, setPaymentData, clearCart } = useStore();
    const { register, handleSubmit, formState: { errors } } = useForm<UserData>();

    const total = cart.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
    );

    const onUserInfoSubmit = (data: UserData) => {
        if (sameBillingAddress) {
            data.billingAddress = data.address;
        }
        setUserData(data);
        setStep('payment');
    };

    const onPaymentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const paymentData: PaymentData = {
            method: paymentMethod,
            ...(paymentMethod === 'credit' && {
                cardNumber: (e.target as any).cardNumber.value,
                cardHolder: (e.target as any).cardHolder.value,
                expiryDate: (e.target as any).expiryDate.value,
                cvv: (e.target as any).cvv.value,
            }),
        };
        setPaymentData(paymentData);
        clearCart();
        navigate('/success');
    };

    if (cart.length === 0) {
        navigate('/');
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-3xl mx-auto px-4">
                <h1 className="text-2xl font-bold text-gray-800 mb-8">Checkout</h1>

                {step === 'user-info' ? (
                    <form onSubmit={handleSubmit(onUserInfoSubmit)} className="space-y-6">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Name
                                    </label>
                                    <input
                                        {...register('name', { required: true })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                    />
                                    {errors.name && (
                                        <span className="text-red-500 text-sm">Name is required</span>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        {...register('email', { required: true })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        CPF
                                    </label>
                                    <input
                                        {...register('cpf', { required: true })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Street
                                    </label>
                                    <input
                                        {...register('address.street', { required: true })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Number
                                        </label>
                                        <input
                                            {...register('address.number', { required: true })}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Complement
                                        </label>
                                        <input
                                            {...register('address.complement')}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            City
                                        </label>
                                        <input
                                            {...register('address.city', { required: true })}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            State
                                        </label>
                                        <input
                                            {...register('address.state', { required: true })}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        ZIP Code
                                    </label>
                                    <input
                                        {...register('address.zipCode', { required: true })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                    />
                                </div>
                            </div>

                            <div className="mt-4">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={sameBillingAddress}
                                        onChange={(e) => setSameBillingAddress(e.target.checked)}
                                        className="rounded border-gray-300 text-indigo-600"
                                    />
                                    <span className="ml-2 text-sm text-gray-600">
                    Use this address for billing
                  </span>
                                </label>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700"
                            >
                                Continue to Payment
                            </button>
                        </div>
                    </form>
                ) : (
                    <form onSubmit={onPaymentSubmit} className="space-y-6">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                            <div className="space-y-4">
                                <div className="flex gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setPaymentMethod('credit')}
                                        className={`flex-1 p-4 border rounded-lg flex items-center gap-2 ${
                                            paymentMethod === 'credit'
                                                ? 'border-indigo-600 bg-indigo-50'
                                                : 'border-gray-300'
                                        }`}
                                    >
                                        <CreditCard />
                                        Credit Card
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setPaymentMethod('pix')}
                                        className={`flex-1 p-4 border rounded-lg flex items-center gap-2 ${
                                            paymentMethod === 'pix'
                                                ? 'border-indigo-600 bg-indigo-50'
                                                : 'border-gray-300'
                                        }`}
                                    >
                                        <QrCode />
                                        PIX
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setPaymentMethod('boleto')}
                                        className={`flex-1 p-4 border rounded-lg flex items-center gap-2 ${
                                            paymentMethod === 'boleto'
                                                ? 'border-indigo-600 bg-indigo-50'
                                                : 'border-gray-300'
                                        }`}
                                    >
                                        <Receipt />
                                        Boleto
                                    </button>
                                </div>

                                {paymentMethod === 'credit' && (
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Card Number
                                            </label>
                                            <input
                                                name="cardNumber"
                                                required
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Card Holder
                                            </label>
                                            <input
                                                name="cardHolder"
                                                required
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Expiry Date
                                                </label>
                                                <input
                                                    name="expiryDate"
                                                    placeholder="MM/YY"
                                                    required
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">
                                                    CVV
                                                </label>
                                                <input
                                                    name="cvv"
                                                    required
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {paymentMethod === 'pix' && (
                                    <div className="text-center p-8">
                                        <QrCode size={200} className="mx-auto mb-4" />
                                        <p className="text-gray-600">
                                            Scan the QR code to complete your payment
                                        </p>
                                    </div>
                                )}

                                {paymentMethod === 'boleto' && (
                                    <div className="text-center p-8">
                                        <Receipt size={48} className="mx-auto mb-4" />
                                        <p className="text-gray-600">
                                            A boleto will be generated after you complete the order
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                            {cart.map((item) => (
                                <div
                                    key={item.product.id}
                                    className="flex justify-between py-2 border-b last:border-b-0"
                                >
                  <span>
                    {item.product.name} x {item.quantity}
                  </span>
                                    <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                            <div className="mt-4 flex justify-between font-bold">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                        </div>

                        <div className="flex justify-between">
                            <button
                                type="button"
                                onClick={() => setStep('user-info')}
                                className="text-indigo-600 hover:text-indigo-700"
                            >
                                Back to Information
                            </button>
                            <button
                                type="submit"
                                className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700"
                            >
                                Complete Order
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};
