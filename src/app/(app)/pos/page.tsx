"use client";

import { useState, useEffect } from "react";
import { products, POSProduct } from "@/lib/products";
import { Search, ShoppingCart, Plus, Minus, X, Pill, Dumbbell, FileText, Package } from "lucide-react";
import { redirectToCheckout } from "@/hooks/useStripe";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";

interface CartItem extends POSProduct {
  quantity: number;
}

export default function POSPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<"CARD" | "CASH" | "INSURANCE">("CARD");
  const [showCashModal, setShowCashModal] = useState(false);
  const [cashReceived, setCashReceived] = useState("");
  const { data: session } = useSession();
  const searchParams = useSearchParams();

  // Check for successful payment
  useEffect(() => {
    if (searchParams.get('success') === 'true') {
      toast.success('Payment successful!');
      setCart([]);
    } else if (searchParams.get('canceled') === 'true') {
      toast.error('Payment canceled');
    }
  }, [searchParams]);

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === "ALL" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (product: POSProduct) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    toast.success(`Added ${product.name} to cart`);
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(cart.map(item =>
      item.id === productId
        ? { ...item, quantity: Math.max(0, item.quantity + delta) }
        : item
    ).filter(item => item.quantity > 0));
  };

  const removeFromCart = (productId: string) => {
    setCart(cart.filter(item => item.id !== productId));
    toast.success('Item removed from cart');
  };

  const clearCart = () => {
    setCart([]);
    toast.success('Cart cleared');
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.085; // 8.5% tax
  const total = subtotal + tax;

  const handleCheckout = async () => {
    if (cart.length === 0) {
      toast.error('Cart is empty');
      return;
    }

    if (paymentMethod === "CARD") {
      const items = cart.map(item => ({
        id: item.id,
        name: item.name,
        description: item.description,
        price: item.price,
        quantity: item.quantity,
      }));
      await redirectToCheckout(items, session?.user?.email || undefined);
    } else if (paymentMethod === "CASH") {
      setShowCashModal(true);
    } else if (paymentMethod === "INSURANCE") {
      toast.success('Insurance payment processing (demo)');
      setTimeout(() => {
        setCart([]);
        toast.success('Transaction completed!');
      }, 2000);
    }
  };

  const completeCashSale = () => {
    const received = parseFloat(cashReceived);
    if (isNaN(received) || received < total) {
      toast.error('Insufficient amount');
      return;
    }

    const change = received - total;
    toast.success(`Sale completed! Change: $${change.toFixed(2)}`);
    setShowCashModal(false);
    setCashReceived("");
    setCart([]);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'HEALTH_PLAN': return <FileText className="w-5 h-5" />;
      case 'SUPPLEMENT': return <Pill className="w-5 h-5" />;
      case 'WELLNESS': return <Dumbbell className="w-5 h-5" />;
      case 'SERVICE': return <Package className="w-5 h-5" />;
      default: return <Package className="w-5 h-5" />;
    }
  };

  const categoryColors: Record<string, string> = {
    'ALL': 'bg-gray-100 text-gray-700 hover:bg-gray-200',
    'HEALTH_PLAN': 'bg-blue-100 text-blue-700 hover:bg-blue-200',
    'SUPPLEMENT': 'bg-green-100 text-green-700 hover:bg-green-200',
    'WELLNESS': 'bg-purple-100 text-purple-700 hover:bg-purple-200',
    'SERVICE': 'bg-orange-100 text-orange-700 hover:bg-orange-200',
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Left Sidebar - Categories & Search */}
      <aside className="w-64 bg-white border-r border-gray-200 p-4 overflow-y-auto">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Categories</h2>

        {/* Search */}
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="space-y-2">
          {['ALL', 'HEALTH_PLAN', 'SUPPLEMENT', 'WELLNESS', 'SERVICE'].map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left
                ${selectedCategory === category
                  ? 'bg-pink-50 text-pink-600 border-2 border-pink-500'
                  : categoryColors[category]}
              `}
            >
              {getCategoryIcon(category)}
              <span className="font-medium">
                {category.replace('_', ' ').split(' ').map(w => w.charAt(0) + w.slice(1).toLowerCase()).join(' ')}
              </span>
            </button>
          ))}
        </div>
      </aside>

      {/* Center - Product Grid */}
      <main className="flex-1 overflow-y-auto p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Point of Sale</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg hover:scale-105 transition-all cursor-pointer"
              onClick={() => addToCart(product)}
            >
              <div className="flex items-center justify-center w-16 h-16 bg-pink-100 rounded-lg mb-4 mx-auto">
                {getCategoryIcon(product.category)}
              </div>
              <h3 className="font-bold text-gray-900 mb-2 text-center">{product.name}</h3>
              <p className="text-sm text-gray-600 mb-3 text-center">{product.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-pink-600">${product.price.toFixed(2)}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product);
                  }}
                  className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors text-sm font-medium"
                >
                  Add to Cart
                </button>
              </div>
              <div className="mt-3">
                <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${categoryColors[product.category]}`}>
                  {product.category.replace('_', ' ')}
                </span>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No products found</p>
          </div>
        )}
      </main>

      {/* Right Sidebar - Cart */}
      <aside className="w-96 bg-white border-l border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Shopping Cart</h2>
            <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">{cart.length}</span>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingCart className="w-16 h-16 text-gray-300 mb-4" />
              <p className="text-gray-500">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map(item => (
                <div key={item.id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-600">${item.price.toFixed(2)} each</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-600"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-8 h-8 bg-white border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-12 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-8 h-8 bg-white border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="text-lg font-bold text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 border-t border-gray-200 space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Tax (8.5%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t border-gray-200">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value as any)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                <option value="CARD">Card (Stripe)</option>
                <option value="CASH">Cash</option>
                <option value="INSURANCE">Insurance</option>
              </select>
            </div>

            <button
              onClick={clearCart}
              className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Clear Cart
            </button>

            <button
              onClick={handleCheckout}
              className="w-full px-6 py-3 bg-pink-500 text-white rounded-lg font-medium hover:bg-pink-600 transition-colors"
            >
              Checkout
            </button>
          </div>
        )}
      </aside>

      {/* Cash Payment Modal */}
      {showCashModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Cash Payment</h2>

            <div className="mb-6">
              <div className="flex justify-between text-lg mb-2">
                <span className="text-gray-700">Total Due:</span>
                <span className="font-bold text-gray-900">${total.toFixed(2)}</span>
              </div>

              <label className="block text-sm font-medium text-gray-700 mb-2">Amount Received</label>
              <input
                type="number"
                value={cashReceived}
                onChange={(e) => setCashReceived(e.target.value)}
                placeholder="0.00"
                step="0.01"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-lg"
                autoFocus
              />

              {cashReceived && parseFloat(cashReceived) >= total && (
                <div className="mt-4 p-4 bg-green-50 rounded-lg">
                  <div className="flex justify-between text-green-900">
                    <span className="font-medium">Change:</span>
                    <span className="font-bold text-xl">
                      ${(parseFloat(cashReceived) - total).toFixed(2)}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowCashModal(false);
                  setCashReceived("");
                }}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={completeCashSale}
                className="flex-1 px-4 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors font-medium"
              >
                Complete Sale
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
