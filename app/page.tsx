import Link from 'next/link'
import Image from 'next/image'
import { ProductCard } from './components/ProductCard'
import { CategoryCard } from './components/CategoryCard'
import { subscribeToNewsletter } from './actions/newsletter'
import { getProducts, getCategories } from './lib/products'

export default async function HomePage() {
  const [featuredProducts, categories] = await Promise.all([
    getProducts({ featured: true, limit: 4 }),
    getCategories()
  ])

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div 
          className="relative bg-cover bg-center py-24 px-4" 
          style={{
            backgroundImage: "linear-gradient(rgba(34, 197, 94, 0.8), rgba(37, 99, 235, 0.8)), url('https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080')"
          }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Sustainable Shopping Made Simple
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Discover eco-friendly products that make a difference for you and the planet
            </p>
            <Link 
              href="/products" 
              className="inline-block bg-white text-green-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop by Category</h2>
            <p className="text-gray-600 text-lg">Find exactly what you're looking for</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-gray-600 text-lg">Our most popular eco-friendly items</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link 
              href="/products" 
              className="inline-block bg-primary text-white font-semibold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 px-4 bg-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Stay in the Loop</h2>
          <p className="text-gray-600 text-lg mb-8">Get updates on new sustainable products and eco-friendly tips</p>
          
          <form action={subscribeToNewsletter} className="max-w-md mx-auto flex gap-4">
            <input 
              type="email" 
              name="email" 
              placeholder="Enter your email" 
              required
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <button 
              type="submit" 
              className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </>
  )
}
