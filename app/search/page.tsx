import { ProductCard } from '../components/ProductCard'
import { getProducts } from '../lib/products'
import { Metadata } from 'next'

interface SearchPageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const query = typeof searchParams.q === 'string' ? searchParams.q : ''
  
  return {
    title: query ? `Search Results for "${query}" - EcoMart` : 'Search - EcoMart',
    description: query ? `Find eco-friendly products matching "${query}".` : 'Search for sustainable products on EcoMart.',
  }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = typeof searchParams.q === 'string' ? searchParams.q : ''
  const products = query ? await getProducts({ search: query }) : []

  return (
    <div className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {query ? `Search Results for "${query}"` : 'Search Products'}
          </h1>
          {query && (
            <p className="text-gray-600 text-lg">
              {products.length} product{products.length !== 1 ? 's' : ''} found
            </p>
          )}
        </div>

        {!query ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Enter a search term</h2>
            <p className="text-gray-600 mb-8">
              Use the search bar above to find eco-friendly products.
            </p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">No products found</h2>
            <p className="text-gray-600 mb-8">
              Sorry, we couldn't find any products matching "{query}". Try a different search term or browse our categories.
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
