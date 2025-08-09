import Link from 'next/link'
import Image from 'next/image'
import { ProductWithCategory } from '@shared/schema'
import { addToCart } from '../actions/cart'

interface ProductCardProps {
  product: ProductWithCategory
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <Link href={`/products/${product.slug}`} className="block">
        <Image 
          src={product.imageUrl || ''} 
          alt={product.name} 
          width={400}
          height={300}
          className="w-full h-48 object-cover"
        />
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
          <p className="text-gray-600 text-sm mb-3">{product.shortDescription}</p>
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-primary">${product.price}</span>
            {product.rating && (
              <div className="flex items-center">
                <div className="flex text-yellow-400">
                  {Array.from({ length: 5 }, (_, i) => (
                    <i 
                      key={i} 
                      className={i < Math.floor(parseFloat(product.rating || '0')) ? 'fas fa-star' : 'far fa-star'}
                    />
                  ))}
                </div>
                <span className="text-gray-500 text-sm ml-2">({product.reviewCount})</span>
              </div>
            )}
          </div>
        </div>
      </Link>
      <div className="px-6 pb-6">
        <form action={addToCart}>
          <input type="hidden" name="product_id" value={product.id} />
          <input type="hidden" name="quantity" value="1" />
          <button 
            type="submit" 
            className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Add to Cart
          </button>
        </form>
      </div>
    </article>
  )
}
