import { ProductCard } from '../components/ProductCard'
import { getProducts } from '../lib/products'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'All Products - EcoMart',
  description: 'Browse our complete collection of eco-friendly and sustainable products for home, personal care, kitchen, and fashion.',
}

interface ProductsPageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const search = typeof searchParams.q === 'string' ? searchParams.q : undefined
  const category = typeof searchParams.category === 'string' ? searchParams.category : undefined

  const products = await getProducts({ search, categoryId: category })

  return (
    <div className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {search ? `Search Results for "${search}"` : 'All Products'}
          </h1>
          <p className="text-gray-600 text-lg">
            {products.length} product{products.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">No products found</h2>
            <p className="text-gray-600 mb-8">
              {search 
                ? `Sorry, we couldn't find any products matching "${search}".`
                : 'No products are currently available.'
              }
            </p>
            <a 
              href="/products" 
              className="inline-block bg-primary text-white font-semibold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors"
            >
              View All Products
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
