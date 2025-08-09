import Link from 'next/link'
import { searchProducts } from '../actions/cart'
import { cookies } from 'next/headers'

export function Header() {
  const cartCount = 3; // This should be calculated from server-side cart

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2">
              <i className="fas fa-leaf text-green-600 text-2xl"></i>
              <span className="text-2xl font-bold text-gray-900">EcoMart</span>
            </Link>
          </div>
          
          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-primary font-medium">Home</Link>
            <Link href="/products" className="text-gray-700 hover:text-primary font-medium">Products</Link>
            <Link href="/categories" className="text-gray-700 hover:text-primary font-medium">Categories</Link>
            <Link href="/about" className="text-gray-700 hover:text-primary font-medium">About</Link>
            <Link href="/contact" className="text-gray-700 hover:text-primary font-medium">Contact</Link>
          </nav>
          
          {/* Search Form */}
          <div className="flex-1 max-w-lg mx-4">
            <form method="GET" action="/search" className="relative">
              <input 
                type="search" 
                name="q" 
                placeholder="Search products..." 
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                Search
              </button>
            </form>
          </div>
          
          {/* Cart and Account */}
          <div className="flex items-center space-x-4">
            <Link href="/account" className="text-gray-700 hover:text-primary">
              <i className="fas fa-user text-lg"></i>
              <span className="sr-only">Account</span>
            </Link>
            <Link href="/cart" className="text-gray-700 hover:text-primary relative">
              <i className="fas fa-shopping-cart text-lg"></i>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs px-1.5 py-0.5">
                  {cartCount}
                </span>
              )}
              <span className="sr-only">Shopping Cart</span>
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button type="button" className="text-gray-700 hover:text-primary">
              <i className="fas fa-bars text-xl"></i>
              <span className="sr-only">Open menu</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-gray-200 bg-white">
        <div className="px-4 py-2 space-y-2">
          <Link href="/" className="block py-2 text-gray-700 hover:text-primary font-medium">Home</Link>
          <Link href="/products" className="block py-2 text-gray-700 hover:text-primary font-medium">Products</Link>
          <Link href="/categories" className="block py-2 text-gray-700 hover:text-primary font-medium">Categories</Link>
          <Link href="/about" className="block py-2 text-gray-700 hover:text-primary font-medium">About</Link>
          <Link href="/contact" className="block py-2 text-gray-700 hover:text-primary font-medium">Contact</Link>
        </div>
      </div>
    </header>
  )
}
