import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Metadata } from 'next'
import { getProductBySlug } from '../../lib/products'
import { addToCart } from '../../actions/cart'

interface ProductPageProps {
  params: { id: string }
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await getProductBySlug(params.id)
  
  if (!product) {
    return {
      title: 'Product Not Found - EcoMart',
    }
  }

  return {
    title: `${product.name} - EcoMart`,
    description: product.description || product.shortDescription,
    openGraph: {
      title: `${product.name} - EcoMart`,
      description: product.description || product.shortDescription,
      images: product.imageUrl ? [{ url: product.imageUrl }] : [],
    },
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductBySlug(params.id)

  if (!product) {
    notFound()
  }

  const discount = product.originalPrice 
    ? parseFloat(product.originalPrice) - parseFloat(product.price)
    : 0

  return (
    <div className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <Image 
              src={product.imageUrl || ''} 
              alt={`${product.name} - Main Image`} 
              width={800}
              height={600}
              className="w-full h-96 object-cover rounded-lg shadow-lg mb-4"
            />
            {product.imageUrls && product.imageUrls.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.imageUrls.slice(1, 5).map((imageUrl, index) => (
                  <Image 
                    key={index}
                    src={imageUrl} 
                    alt={`${product.name} - Image ${index + 2}`} 
                    width={200}
                    height={150}
                    className="w-full h-20 object-cover rounded border-2 border-gray-200 hover:border-primary cursor-pointer"
                  />
                ))}
              </div>
            )}
          </div>
          
          {/* Product Information */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
            
            {product.rating && (
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400 mr-2">
                  {Array.from({ length: 5 }, (_, i) => (
                    <i 
                      key={i} 
                      className={i < Math.floor(parseFloat(product.rating || '0')) ? 'fas fa-star' : 'far fa-star'}
                    />
                  ))}
                </div>
                <span className="text-gray-600">({product.reviewCount} reviews)</span>
              </div>
            )}
            
            <div className="mb-6">
              <span className="text-3xl font-bold text-primary">${product.price}</span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-gray-500 line-through ml-2">${product.originalPrice}</span>
                  <span className="text-sm text-green-600 ml-2 bg-green-100 px-2 py-1 rounded">
                    Save ${discount.toFixed(2)}
                  </span>
                </>
              )}
            </div>
            
            <div className="mb-6">
              <p className="text-gray-700 mb-4">{product.description}</p>
              
              {product.features && product.features.length > 0 && (
                <ul className="text-gray-700 space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <i className="fas fa-check text-green-500 mr-2"></i>
                      {feature}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            
            {/* Add to Cart Form */}
            <form action={addToCart} className="mb-6">
              <input type="hidden" name="product_id" value={product.id} />
              
              <div className="flex items-center space-x-4 mb-4">
                <label htmlFor="quantity" className="text-gray-700 font-medium">Quantity:</label>
                <select 
                  name="quantity" 
                  id="quantity" 
                  className="border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
              
              <button 
                type="submit" 
                className="w-full bg-primary text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg mb-4"
              >
                Add to Cart - ${product.price}
              </button>
            </form>
            
            {/* Product Information Tabs */}
            <div className="border-t border-gray-200 pt-6">
              <div className="space-y-4">
                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer py-2 font-medium text-gray-900">
                    <span>Shipping & Returns</span>
                    <i className="fas fa-chevron-down group-open:rotate-180 transition-transform"></i>
                  </summary>
                  <div className="pt-2 text-gray-600">
                    <p>Free shipping on orders over $50. 30-day return policy. Items must be in original condition.</p>
                  </div>
                </details>
                
                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer py-2 font-medium text-gray-900">
                    <span>Sustainability</span>
                    <i className="fas fa-chevron-down group-open:rotate-180 transition-transform"></i>
                  </summary>
                  <div className="pt-2 text-gray-600">
                    <p>Our products are sourced from sustainable materials and eco-friendly manufacturing processes.</p>
                  </div>
                </details>
                
                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer py-2 font-medium text-gray-900">
                    <span>Care Instructions</span>
                    <i className="fas fa-chevron-down group-open:rotate-180 transition-transform"></i>
                  </summary>
                  <div className="pt-2 text-gray-600">
                    <p>Follow the care instructions provided with your product to ensure longevity and maintain quality.</p>
                  </div>
                </details>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
