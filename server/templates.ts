import { ProductWithCategory, Category } from '@shared/schema'

const baseLayout = (title: string, content: string, additionalHead: string = '') => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: 'rgb(59 130 246)',
                        'primary-foreground': 'rgb(255 255 255)'
                    }
                }
            }
        }
    </script>
    ${additionalHead}
</head>
<body class="bg-gray-50 text-gray-900">
    <header class="bg-white shadow-sm border-b border-gray-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <div class="flex-shrink-0">
                    <a href="/" class="flex items-center space-x-2">
                        <i class="fas fa-leaf text-green-600 text-2xl"></i>
                        <span class="text-2xl font-bold text-gray-900">EcoMart</span>
                    </a>
                </div>
                
                <nav class="hidden md:flex space-x-8">
                    <a href="/" class="text-gray-700 hover:text-primary font-medium">Home</a>
                    <a href="/products" class="text-gray-700 hover:text-primary font-medium">Products</a>
                    <a href="/categories" class="text-gray-700 hover:text-primary font-medium">Categories</a>
                    <a href="/about" class="text-gray-700 hover:text-primary font-medium">About</a>
                    <a href="/contact" class="text-gray-700 hover:text-primary font-medium">Contact</a>
                </nav>
                
                <div class="flex-1 max-w-lg mx-4">
                    <form method="GET" action="/search" class="relative">
                        <input 
                            type="search" 
                            name="q" 
                            placeholder="Search products..." 
                            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                        <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                        <button type="submit" class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                            Search
                        </button>
                    </form>
                </div>
                
                <div class="flex items-center space-x-4">
                    <a href="/account" class="text-gray-700 hover:text-primary">
                        <i class="fas fa-user text-lg"></i>
                    </a>
                    <a href="/cart" class="text-gray-700 hover:text-primary relative">
                        <i class="fas fa-shopping-cart text-lg"></i>
                    </a>
                </div>
            </div>
        </div>
    </header>
    
    <main>
        ${content}
    </main>
    
    <footer class="bg-gray-900 text-white py-12 px-4 mt-16">
        <div class="max-w-7xl mx-auto">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div>
                    <div class="flex items-center space-x-2 mb-4">
                        <i class="fas fa-leaf text-green-500 text-2xl"></i>
                        <span class="text-2xl font-bold">EcoMart</span>
                    </div>
                    <p class="text-gray-300 mb-4">
                        Your trusted source for sustainable and eco-friendly products that make a positive impact on the environment.
                    </p>
                </div>
                
                <div>
                    <h4 class="text-lg font-semibold mb-4">Shop</h4>
                    <ul class="space-y-2">
                        <li><a href="/products" class="text-gray-300 hover:text-white">All Products</a></li>
                        <li><a href="/categories/home-garden" class="text-gray-300 hover:text-white">Home & Garden</a></li>
                        <li><a href="/categories/personal-care" class="text-gray-300 hover:text-white">Personal Care</a></li>
                        <li><a href="/categories/kitchen" class="text-gray-300 hover:text-white">Kitchen</a></li>
                        <li><a href="/categories/fashion" class="text-gray-300 hover:text-white">Fashion</a></li>
                    </ul>
                </div>
                
                <div>
                    <h4 class="text-lg font-semibold mb-4">Support</h4>
                    <ul class="space-y-2">
                        <li><a href="/help" class="text-gray-300 hover:text-white">Help Center</a></li>
                        <li><a href="/contact" class="text-gray-300 hover:text-white">Contact Us</a></li>
                    </ul>
                </div>
                
                <div>
                    <h4 class="text-lg font-semibold mb-4">Company</h4>
                    <ul class="space-y-2">
                        <li><a href="/about" class="text-gray-300 hover:text-white">About Us</a></li>
                        <li><a href="/sustainability" class="text-gray-300 hover:text-white">Sustainability</a></li>
                    </ul>
                </div>
            </div>
            
            <div class="border-t border-gray-800 mt-8 pt-8 text-center">
                <p class="text-gray-400 text-sm">&copy; 2024 EcoMart. All rights reserved.</p>
            </div>
        </div>
    </footer>
</body>
</html>
`

const generateProductCard = (product: ProductWithCategory) => `
<article class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
    <a href="/products/${product.slug}" class="block">
        <img 
            src="${product.imageUrl}" 
            alt="${product.name}" 
            class="w-full h-48 object-cover"
        />
        <div class="p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-2">${product.name}</h3>
            <p class="text-gray-600 text-sm mb-3">${product.shortDescription || ''}</p>
            <div class="flex justify-between items-center">
                <span class="text-2xl font-bold text-primary">$${product.price}</span>
                ${product.rating ? `
                <div class="flex items-center">
                    <div class="flex text-yellow-400">
                        ${Array.from({ length: 5 }, (_, i) => 
                            i < Math.floor(parseFloat(product.rating || '0')) 
                                ? '<i class="fas fa-star"></i>' 
                                : '<i class="far fa-star"></i>'
                        ).join('')}
                    </div>
                    <span class="text-gray-500 text-sm ml-2">(${product.reviewCount})</span>
                </div>
                ` : ''}
            </div>
        </div>
    </a>
    <div class="px-6 pb-6">
        <form action="/api/cart" method="POST">
            <input type="hidden" name="product_id" value="${product.id}" />
            <input type="hidden" name="quantity" value="1" />
            <button 
                type="submit" 
                class="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
                Add to Cart
            </button>
        </form>
    </div>
</article>
`

const generateCategoryCard = (category: Category) => `
<a href="/categories/${category.slug}" class="group block">
    <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        <img 
            src="${category.imageUrl}" 
            alt="${category.name} products" 
            class="w-full h-48 object-cover"
        />
        <div class="p-6">
            <h3 class="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary">
                ${category.name}
            </h3>
            <p class="text-gray-600">${category.description || ''}</p>
        </div>
    </div>
</a>
`

export const generateHomePage = (featuredProducts: ProductWithCategory[], categories: Category[]) => {
    const content = `
        <section class="bg-gradient-to-r from-green-600 to-blue-600 text-white">
            <div 
                class="relative bg-cover bg-center py-24 px-4" 
                style="background-image: linear-gradient(rgba(34, 197, 94, 0.8), rgba(37, 99, 235, 0.8)), url('https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080')"
            >
                <div class="max-w-4xl mx-auto text-center">
                    <h1 class="text-4xl md:text-6xl font-bold mb-6">
                        Sustainable Shopping Made Simple
                    </h1>
                    <p class="text-xl md:text-2xl mb-8 opacity-90">
                        Discover eco-friendly products that make a difference for you and the planet
                    </p>
                    <a 
                        href="/products" 
                        class="inline-block bg-white text-green-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        Shop Now
                    </a>
                </div>
            </div>
        </section>

        <section class="py-16 px-4">
            <div class="max-w-7xl mx-auto">
                <div class="text-center mb-12">
                    <h2 class="text-3xl font-bold text-gray-900 mb-4">Shop by Category</h2>
                    <p class="text-gray-600 text-lg">Find exactly what you're looking for</p>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    ${categories.map(category => generateCategoryCard(category)).join('')}
                </div>
            </div>
        </section>

        <section class="py-16 px-4 bg-white">
            <div class="max-w-7xl mx-auto">
                <div class="text-center mb-12">
                    <h2 class="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
                    <p class="text-gray-600 text-lg">Our most popular eco-friendly items</p>
                </div>
                
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    ${featuredProducts.map(product => generateProductCard(product)).join('')}
                </div>
                
                <div class="text-center mt-12">
                    <a 
                        href="/products" 
                        class="inline-block bg-primary text-white font-semibold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        View All Products
                    </a>
                </div>
            </div>
        </section>

        <section class="py-16 px-4 bg-gray-100">
            <div class="max-w-4xl mx-auto text-center">
                <h2 class="text-3xl font-bold text-gray-900 mb-4">Stay in the Loop</h2>
                <p class="text-gray-600 text-lg mb-8">Get updates on new sustainable products and eco-friendly tips</p>
                
                <form action="/api/newsletter" method="POST" class="max-w-md mx-auto flex gap-4">
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Enter your email" 
                        required
                        class="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    <button 
                        type="submit" 
                        class="bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium whitespace-nowrap"
                    >
                        Subscribe
                    </button>
                </form>
            </div>
        </section>
    `
    
    return baseLayout('EcoMart - Sustainable Shopping Made Simple', content)
}

export const generateProductsPage = (products: ProductWithCategory[], search?: string) => {
    const title = search ? `Search Results for "${search}" - EcoMart` : 'All Products - EcoMart'
    const heading = search ? `Search Results for "${search}"` : 'All Products'
    
    const content = `
        <div class="py-16 px-4">
            <div class="max-w-7xl mx-auto">
                <div class="text-center mb-12">
                    <h1 class="text-3xl font-bold text-gray-900 mb-4">${heading}</h1>
                    <p class="text-gray-600 text-lg">
                        ${products.length} product${products.length !== 1 ? 's' : ''} found
                    </p>
                </div>

                ${products.length === 0 ? `
                    <div class="text-center py-12">
                        <h2 class="text-xl font-semibold text-gray-900 mb-4">No products found</h2>
                        <p class="text-gray-600 mb-8">
                            ${search 
                                ? `Sorry, we couldn't find any products matching "${search}".`
                                : 'No products are currently available.'
                            }
                        </p>
                        <a 
                            href="/products" 
                            class="inline-block bg-primary text-white font-semibold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            View All Products
                        </a>
                    </div>
                ` : `
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        ${products.map(product => generateProductCard(product)).join('')}
                    </div>
                `}
            </div>
        </div>
    `
    
    return baseLayout(title, content)
}

export const generateProductPage = (product: ProductWithCategory) => {
    const discount = product.originalPrice 
        ? parseFloat(product.originalPrice) - parseFloat(product.price)
        : 0

    const content = `
        <div class="py-16 px-4">
            <div class="max-w-7xl mx-auto">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div>
                        <img 
                            src="${product.imageUrl}" 
                            alt="${product.name} - Main Image" 
                            class="w-full h-96 object-cover rounded-lg shadow-lg mb-4"
                        />
                        ${product.imageUrls && product.imageUrls.length > 1 ? `
                            <div class="grid grid-cols-4 gap-2">
                                ${product.imageUrls.slice(1, 5).map((imageUrl, index) => `
                                    <img 
                                        src="${imageUrl}" 
                                        alt="${product.name} - Image ${index + 2}" 
                                        class="w-full h-20 object-cover rounded border-2 border-gray-200 hover:border-primary cursor-pointer"
                                    />
                                `).join('')}
                            </div>
                        ` : ''}
                    </div>
                    
                    <div>
                        <h1 class="text-3xl font-bold text-gray-900 mb-4">${product.name}</h1>
                        
                        ${product.rating ? `
                            <div class="flex items-center mb-4">
                                <div class="flex text-yellow-400 mr-2">
                                    ${Array.from({ length: 5 }, (_, i) => 
                                        i < Math.floor(parseFloat(product.rating || '0')) 
                                            ? '<i class="fas fa-star"></i>' 
                                            : '<i class="far fa-star"></i>'
                                    ).join('')}
                                </div>
                                <span class="text-gray-600">(${product.reviewCount} reviews)</span>
                            </div>
                        ` : ''}
                        
                        <div class="mb-6">
                            <span class="text-3xl font-bold text-primary">$${product.price}</span>
                            ${product.originalPrice ? `
                                <span class="text-lg text-gray-500 line-through ml-2">$${product.originalPrice}</span>
                                <span class="text-sm text-green-600 ml-2 bg-green-100 px-2 py-1 rounded">
                                    Save $${discount.toFixed(2)}
                                </span>
                            ` : ''}
                        </div>
                        
                        <div class="mb-6">
                            <p class="text-gray-700 mb-4">${product.description}</p>
                            
                            ${product.features && product.features.length > 0 ? `
                                <ul class="text-gray-700 space-y-2">
                                    ${product.features.map(feature => `
                                        <li class="flex items-center">
                                            <i class="fas fa-check text-green-500 mr-2"></i>
                                            ${feature}
                                        </li>
                                    `).join('')}
                                </ul>
                            ` : ''}
                        </div>
                        
                        <form action="/api/cart" method="POST" class="mb-6">
                            <input type="hidden" name="product_id" value="${product.id}" />
                            
                            <div class="flex items-center space-x-4 mb-4">
                                <label for="quantity" class="text-gray-700 font-medium">Quantity:</label>
                                <select 
                                    name="quantity" 
                                    id="quantity" 
                                    class="border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
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
                                class="w-full bg-primary text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg mb-4"
                            >
                                Add to Cart - $${product.price}
                            </button>
                        </form>
                        
                        <div class="border-t border-gray-200 pt-6">
                            <div class="space-y-4">
                                <details class="group">
                                    <summary class="flex justify-between items-center cursor-pointer py-2 font-medium text-gray-900">
                                        <span>Shipping & Returns</span>
                                        <i class="fas fa-chevron-down group-open:rotate-180 transition-transform"></i>
                                    </summary>
                                    <div class="pt-2 text-gray-600">
                                        <p>Free shipping on orders over $50. 30-day return policy. Items must be in original condition.</p>
                                    </div>
                                </details>
                                
                                <details class="group">
                                    <summary class="flex justify-between items-center cursor-pointer py-2 font-medium text-gray-900">
                                        <span>Sustainability</span>
                                        <i class="fas fa-chevron-down group-open:rotate-180 transition-transform"></i>
                                    </summary>
                                    <div class="pt-2 text-gray-600">
                                        <p>Our products are sourced from sustainable materials and eco-friendly manufacturing processes.</p>
                                    </div>
                                </details>
                                
                                <details class="group">
                                    <summary class="flex justify-between items-center cursor-pointer py-2 font-medium text-gray-900">
                                        <span>Care Instructions</span>
                                        <i class="fas fa-chevron-down group-open:rotate-180 transition-transform"></i>
                                    </summary>
                                    <div class="pt-2 text-gray-600">
                                        <p>Follow the care instructions provided with your product to ensure longevity and maintain quality.</p>
                                    </div>
                                </details>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
    
    const additionalHead = `
        <meta name="description" content="${product.description || product.shortDescription}">
        <meta property="og:title" content="${product.name} - EcoMart">
        <meta property="og:description" content="${product.description || product.shortDescription}">
        ${product.imageUrl ? `<meta property="og:image" content="${product.imageUrl}">` : ''}
    `
    
    return baseLayout(`${product.name} - EcoMart`, content, additionalHead)
}

export const generateCategoryPage = (category: Category, products: ProductWithCategory[]) => {
    const content = `
        <div class="py-16 px-4">
            <div class="max-w-7xl mx-auto">
                <div class="text-center mb-12">
                    <h1 class="text-3xl font-bold text-gray-900 mb-4">${category.name}</h1>
                    ${category.description ? `<p class="text-gray-600 text-lg">${category.description}</p>` : ''}
                    <p class="text-gray-600 mt-2">
                        ${products.length} product${products.length !== 1 ? 's' : ''} found
                    </p>
                </div>

                ${products.length === 0 ? `
                    <div class="text-center py-12">
                        <h2 class="text-xl font-semibold text-gray-900 mb-4">No products found</h2>
                        <p class="text-gray-600 mb-8">
                            Sorry, there are no products available in this category at the moment.
                        </p>
                        <a 
                            href="/products" 
                            class="inline-block bg-primary text-white font-semibold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            View All Products
                        </a>
                    </div>
                ` : `
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        ${products.map(product => generateProductCard(product)).join('')}
                    </div>
                `}
            </div>
        </div>
    `
    
    const additionalHead = `
        <meta name="description" content="${category.description || `Browse our ${category.name.toLowerCase()} products.`}">
    `
    
    return baseLayout(`${category.name} - EcoMart`, content, additionalHead)
}

export const generateSearchPage = (products: ProductWithCategory[], query?: string) => {
    const title = query ? `Search Results for "${query}" - EcoMart` : 'Search - EcoMart'
    const heading = query ? `Search Results for "${query}"` : 'Search Products'
    
    const content = `
        <div class="py-16 px-4">
            <div class="max-w-7xl mx-auto">
                <div class="text-center mb-12">
                    <h1 class="text-3xl font-bold text-gray-900 mb-4">${heading}</h1>
                    ${query ? `
                        <p class="text-gray-600 text-lg">
                            ${products.length} product${products.length !== 1 ? 's' : ''} found
                        </p>
                    ` : ''}
                </div>

                ${!query ? `
                    <div class="text-center py-12">
                        <h2 class="text-xl font-semibold text-gray-900 mb-4">Enter a search term</h2>
                        <p class="text-gray-600 mb-8">
                            Use the search bar above to find eco-friendly products.
                        </p>
                    </div>
                ` : products.length === 0 ? `
                    <div class="text-center py-12">
                        <h2 class="text-xl font-semibold text-gray-900 mb-4">No products found</h2>
                        <p class="text-gray-600 mb-8">
                            Sorry, we couldn't find any products matching "${query}". Try a different search term or browse our categories.
                        </p>
                        <a 
                            href="/products" 
                            class="inline-block bg-primary text-white font-semibold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            View All Products
                        </a>
                    </div>
                ` : `
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        ${products.map(product => generateProductCard(product)).join('')}
                    </div>
                `}
            </div>
        </div>
    `
    
    const additionalHead = `
        <meta name="description" content="${query ? `Find eco-friendly products matching "${query}".` : 'Search for sustainable products on EcoMart.'}">
    `
    
    return baseLayout(title, content, additionalHead)
}