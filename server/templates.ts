import { ProductWithCategory, Category } from '@shared/schema'

const baseLayout = (title: string, content: string, additionalHead: string = '') => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1f2937; }
        .container { max-width: 1280px; margin: 0 auto; padding: 0 1rem; }
        .grid { display: grid; gap: 2rem; }
        .grid-cols-1 { grid-template-columns: 1fr; }
        .grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
        .grid-cols-4 { grid-template-columns: repeat(4, 1fr); }
        @media (min-width: 640px) { .sm\\:grid-cols-2 { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 768px) { .md\\:grid-cols-2 { grid-template-columns: repeat(2, 1fr); } .md\\:flex { display: flex; } }
        @media (min-width: 1024px) { .lg\\:grid-cols-4 { grid-template-columns: repeat(4, 1fr); } .lg\\:grid-cols-2 { grid-template-columns: repeat(2, 1fr); } }
        
        .bg-white { background-color: white; }
        .bg-gray-50 { background-color: #f9fafb; }
        .bg-gray-100 { background-color: #f3f4f6; }
        .bg-gray-900 { background-color: #111827; }
        .bg-primary { background-color: #3b82f6; }
        .bg-green-600 { background-color: #059669; }
        .bg-blue-600 { background-color: #2563eb; }
        .bg-green-100 { background-color: #dcfce7; }
        
        .text-white { color: white; }
        .text-gray-300 { color: #d1d5db; }
        .text-gray-400 { color: #9ca3af; }
        .text-gray-500 { color: #6b7280; }
        .text-gray-600 { color: #4b5563; }
        .text-gray-700 { color: #374151; }
        .text-gray-900 { color: #111827; }
        .text-primary { color: #3b82f6; }
        .text-green-500 { color: #10b981; }
        .text-green-600 { color: #059669; }
        .text-yellow-400 { color: #fbbf24; }
        
        .p-4 { padding: 1rem; }
        .p-6 { padding: 1.5rem; }
        .px-2 { padding-left: 0.5rem; padding-right: 0.5rem; }
        .px-3 { padding-left: 0.75rem; padding-right: 0.75rem; }
        .px-4 { padding-left: 1rem; padding-right: 1rem; }
        .px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
        .px-8 { padding-left: 2rem; padding-right: 2rem; }
        .py-1 { padding-top: 0.25rem; padding-bottom: 0.25rem; }
        .py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
        .py-3 { padding-top: 0.75rem; padding-bottom: 0.75rem; }
        .py-12 { padding-top: 3rem; padding-bottom: 3rem; }
        .py-16 { padding-top: 4rem; padding-bottom: 4rem; }
        .py-24 { padding-top: 6rem; padding-bottom: 6rem; }
        .pt-2 { padding-top: 0.5rem; }
        .pt-6 { padding-top: 1.5rem; }
        .pt-8 { padding-top: 2rem; }
        .pb-6 { padding-bottom: 1.5rem; }
        .pl-10 { padding-left: 2.5rem; }
        .pr-4 { padding-right: 1rem; }
        
        .m-4 { margin: 1rem; }
        .mb-2 { margin-bottom: 0.5rem; }
        .mb-3 { margin-bottom: 0.75rem; }
        .mb-4 { margin-bottom: 1rem; }
        .mb-6 { margin-bottom: 1.5rem; }
        .mb-8 { margin-bottom: 2rem; }
        .mb-12 { margin-bottom: 3rem; }
        .mt-2 { margin-top: 0.5rem; }
        .mt-8 { margin-top: 2rem; }
        .mt-12 { margin-top: 3rem; }
        .mt-16 { margin-top: 4rem; }
        .ml-2 { margin-left: 0.5rem; }
        .mr-2 { margin-right: 0.5rem; }
        .mx-auto { margin-left: auto; margin-right: auto; }
        .mx-4 { margin-left: 1rem; margin-right: 1rem; }
        
        .w-full { width: 100%; }
        .h-16 { height: 4rem; }
        .h-20 { height: 5rem; }
        .h-48 { height: 12rem; }
        .h-96 { height: 24rem; }
        .max-w-lg { max-width: 32rem; }
        .max-w-md { max-width: 28rem; }
        .max-w-4xl { max-width: 56rem; }
        .max-w-7xl { max-width: 80rem; }
        
        .flex { display: flex; }
        .flex-1 { flex: 1; }
        .flex-shrink-0 { flex-shrink: 0; }
        .items-center { align-items: center; }
        .justify-between { justify-content: space-between; }
        .justify-center { justify-content: center; }
        .space-x-2 > * + * { margin-left: 0.5rem; }
        .space-x-4 > * + * { margin-left: 1rem; }
        .space-x-8 > * + * { margin-left: 2rem; }
        .space-y-2 > * + * { margin-top: 0.5rem; }
        .space-y-4 > * + * { margin-top: 1rem; }
        
        .text-sm { font-size: 0.875rem; }
        .text-lg { font-size: 1.125rem; }
        .text-xl { font-size: 1.25rem; }
        .text-2xl { font-size: 1.5rem; }
        .text-3xl { font-size: 1.875rem; }
        .text-4xl { font-size: 2.25rem; }
        .text-6xl { font-size: 3.75rem; }
        .font-medium { font-weight: 500; }
        .font-semibold { font-weight: 600; }
        .font-bold { font-weight: 700; }
        
        .rounded { border-radius: 0.25rem; }
        .rounded-lg { border-radius: 0.5rem; }
        .overflow-hidden { overflow: hidden; }
        .shadow-sm { box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05); }
        .shadow-md { box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); }
        .shadow-lg { box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1); }
        
        .border { border-width: 1px; }
        .border-2 { border-width: 2px; }
        .border-b { border-bottom-width: 1px; }
        .border-t { border-top-width: 1px; }
        .border-gray-200 { border-color: #e5e7eb; }
        .border-gray-300 { border-color: #d1d5db; }
        
        .relative { position: relative; }
        .absolute { position: absolute; }
        .left-3 { left: 0.75rem; }
        .right-2 { right: 0.5rem; }
        .top-1\\/2 { top: 50%; }
        .transform { transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); }
        .-translate-y-1\\/2 { --tw-translate-y: -50%; }
        
        .block { display: block; }
        .inline-block { display: inline-block; }
        .hidden { display: none; }
        @media (min-width: 768px) { .md\\:flex { display: flex; } }
        
        .object-cover { object-fit: cover; }
        .text-center { text-align: center; }
        .line-through { text-decoration: line-through; }
        .opacity-90 { opacity: 0.9; }
        
        .transition-colors { transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out; }
        .transition-shadow { transition: box-shadow 0.15s ease-in-out; }
        .transition-transform { transition: transform 0.15s ease-in-out; }
        
        .cursor-pointer { cursor: pointer; }
        .whitespace-nowrap { white-space: nowrap; }
        
        /* Buttons and Forms */
        button, input[type="submit"] {
            padding: 0.75rem 1.5rem;
            border: none;
            border-radius: 0.5rem;
            font-weight: 500;
            cursor: pointer;
            transition: background-color 0.15s ease-in-out;
        }
        
        button.bg-primary, input[type="submit"].bg-primary {
            background-color: #3b82f6;
            color: white;
        }
        
        button.bg-primary:hover, input[type="submit"].bg-primary:hover {
            background-color: #2563eb;
        }
        
        input[type="text"], input[type="email"], input[type="search"], select {
            padding: 0.75rem;
            border: 1px solid #d1d5db;
            border-radius: 0.5rem;
            width: 100%;
        }
        
        input:focus, select:focus {
            outline: none;
            border-color: #3b82f6;
            box-shadow: 0 0 0 3px rgb(59 130 246 / 0.1);
        }
        
        /* Links */
        a {
            text-decoration: none;
            color: inherit;
        }
        
        a:hover {
            color: #3b82f6;
        }
        
        /* Hero gradient */
        .hero-bg {
            background: linear-gradient(135deg, #059669 0%, #2563eb 100%);
            color: white;
        }
        
        /* Cards */
        .card {
            background: white;
            border-radius: 0.5rem;
            box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
            overflow: hidden;
            transition: box-shadow 0.15s ease-in-out;
        }
        
        .card:hover {
            box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
        }
        
        /* Details/Summary */
        details summary {
            cursor: pointer;
        }
        
        details[open] summary .fa-chevron-down {
            transform: rotate(180deg);
        }
        
        /* Star ratings */
        .star-rating {
            color: #fbbf24;
        }
        
        /* Responsive */
        @media (max-width: 767px) {
            .hidden { display: none; }
            .text-4xl { font-size: 2rem; }
            .text-6xl { font-size: 3rem; }
            .py-24 { padding-top: 4rem; padding-bottom: 4rem; }
        }
    </style>
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
        <section class="hero-bg">
            <div class="py-24 px-4" style="background-image: linear-gradient(rgba(34, 197, 94, 0.8), rgba(37, 99, 235, 0.8)), url('https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080'); background-size: cover; background-position: center;"
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