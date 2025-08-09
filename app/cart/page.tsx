import { Metadata } from 'next'
import { getCartItems } from '../lib/cart'
import { updateCartItem, removeFromCart } from '../actions/cart'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Shopping Cart - EcoMart',
  description: 'Review your selected eco-friendly products before checkout.',
}

export default async function CartPage() {
  const cartItems = await getCartItems()
  
  const subtotal = cartItems.reduce((sum, item) => 
    sum + (parseFloat(item.product.price) * item.quantity), 0
  )
  const tax = subtotal * 0.08 // 8% tax
  const total = subtotal + tax

  return (
    <div className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">
              Start shopping to add items to your cart.
            </p>
            <a 
              href="/products" 
              className="inline-block bg-primary text-white font-semibold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Start Shopping
            </a>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Cart Header */}
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                Your Shopping Cart ({cartItems.length} item{cartItems.length !== 1 ? 's' : ''})
              </h2>
            </div>
            
            {/* Cart Items */}
            <div className="divide-y divide-gray-200">
              {cartItems.map((item) => (
                <div key={item.id} className="px-6 py-4 flex items-center space-x-4">
                  <Image 
                    src={item.product.imageUrl || ''} 
                    alt={item.product.name} 
                    width={100}
                    height={100}
                    className="w-16 h-16 object-cover rounded"
                  />
                  
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{item.product.name}</h3>
                    <p className="text-sm text-gray-600">{item.product.shortDescription}</p>
                  </div>
                  
                  <form action={updateCartItem} className="flex items-center space-x-2">
                    <input type="hidden" name="item_id" value={item.id} />
                    <select 
                      name="quantity" 
                      defaultValue={item.quantity}
                      className="border border-gray-300 rounded px-2 py-1 text-sm"
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                    <button type="submit" className="text-xs bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded">
                      Update
                    </button>
                  </form>
                  
                  <div className="text-right">
                    <p className="font-medium text-gray-900">
                      ${(parseFloat(item.product.price) * item.quantity).toFixed(2)}
                    </p>
                    <form action={removeFromCart} className="inline">
                      <input type="hidden" name="item_id" value={item.id} />
                      <button type="submit" className="text-xs text-red-600 hover:text-red-800">
                        Remove
                      </button>
                    </form>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Cart Summary */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping:</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax:</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-300 pt-2">
                  <div className="flex justify-between font-semibold">
                    <span>Total:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 space-y-3">
                <a 
                  href="/checkout" 
                  className="w-full bg-primary text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium text-center block"
                >
                  Proceed to Checkout
                </a>
                <a 
                  href="/products" 
                  className="w-full bg-gray-200 text-gray-800 py-2 px-6 rounded-lg hover:bg-gray-300 transition-colors text-center block"
                >
                  Continue Shopping
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
