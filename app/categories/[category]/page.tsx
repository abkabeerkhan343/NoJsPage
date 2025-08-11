import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { ProductCard } from '../../components/ProductCard'
import { getCategoryBySlug, getProducts } from '../../lib/products'

interface CategoryPageProps {
  params: Promise<{ category: string }>
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const category = await getCategoryBySlug(resolvedParams.category)

  if (!category) {
    return {
      title: 'Category Not Found - EcoMart',
    }
  }

  return {
    title: `${category.name} - EcoMart`,
    description: category.description || `Browse our ${category.name.toLowerCase()} products.`,
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = await params

  const [category, products] = await Promise.all([
    getCategoryBySlug(resolvedParams.category),
    getProducts({ categoryId: resolvedParams.category }),
  ])

  if (!category) {
    notFound()
  }

  return (
    <div className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{category.name}</h1>
          {category.description && (
            <p className="text-gray-600 text-lg">{category.description}</p>
          )}
          <p className="text-gray-600 mt-2">
            {products.length} product{products.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">No products found</h2>
            <p className="text-gray-600 mb-8">
              Sorry, there are no products available in this category at the moment.
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
