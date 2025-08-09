import { ProductWithCategory, Category } from '@shared/schema'

export async function getProducts(options: {
  search?: string
  categoryId?: string
  featured?: boolean
  limit?: number
} = {}): Promise<ProductWithCategory[]> {
  try {
    const params = new URLSearchParams()
    
    if (options.search) params.append('search', options.search)
    if (options.categoryId) params.append('category', options.categoryId)
    if (options.featured) params.append('featured', 'true')
    if (options.limit) params.append('limit', options.limit.toString())

    const response = await fetch(`${process.env.API_URL || 'http://localhost:5000'}/api/products?${params}`)
    
    if (!response.ok) {
      throw new Error('Failed to fetch products')
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

export async function getProduct(id: string): Promise<ProductWithCategory | null> {
  try {
    const response = await fetch(`${process.env.API_URL || 'http://localhost:5000'}/api/products/${id}`)
    
    if (!response.ok) {
      return null
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}

export async function getProductBySlug(slug: string): Promise<ProductWithCategory | null> {
  try {
    // For now, assume slug and id are the same. In a real app, you'd have a separate endpoint
    const products = await getProducts()
    return products.find(p => p.slug === slug) || null
  } catch (error) {
    console.error('Error fetching product by slug:', error)
    return null
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    const response = await fetch(`${process.env.API_URL || 'http://localhost:5000'}/api/categories`)
    
    if (!response.ok) {
      throw new Error('Failed to fetch categories')
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const response = await fetch(`${process.env.API_URL || 'http://localhost:5000'}/api/categories/${slug}`)
    
    if (!response.ok) {
      return null
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching category:', error)
    return null
  }
}
