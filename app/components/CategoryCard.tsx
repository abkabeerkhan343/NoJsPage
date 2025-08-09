import Link from 'next/link'
import Image from 'next/image'
import { Category } from '@shared/schema'

interface CategoryCardProps {
  category: Category
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/categories/${category.slug}`} className="group block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        <Image 
          src={category.imageUrl || ''} 
          alt={`${category.name} products`} 
          width={400}
          height={300}
          className="w-full h-48 object-cover"
        />
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary">
            {category.name}
          </h3>
          <p className="text-gray-600">{category.description}</p>
        </div>
      </div>
    </Link>
  )
}
