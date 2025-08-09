import Link from 'next/link'
import { subscribeToNewsletter } from '../actions/newsletter'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <i className="fas fa-leaf text-green-500 text-2xl"></i>
              <span className="text-2xl font-bold">EcoMart</span>
            </div>
            <p className="text-gray-300 mb-4">
              Your trusted source for sustainable and eco-friendly products that make a positive impact on the environment.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-facebook text-xl"></i>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-twitter text-xl"></i>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-instagram text-xl"></i>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-youtube text-xl"></i>
              </Link>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Shop</h4>
            <ul className="space-y-2">
              <li><Link href="/products" className="text-gray-300 hover:text-white">All Products</Link></li>
              <li><Link href="/categories/home-garden" className="text-gray-300 hover:text-white">Home & Garden</Link></li>
              <li><Link href="/categories/personal-care" className="text-gray-300 hover:text-white">Personal Care</Link></li>
              <li><Link href="/categories/kitchen" className="text-gray-300 hover:text-white">Kitchen</Link></li>
              <li><Link href="/categories/fashion" className="text-gray-300 hover:text-white">Fashion</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li><Link href="/help" className="text-gray-300 hover:text-white">Help Center</Link></li>
              <li><Link href="/shipping" className="text-gray-300 hover:text-white">Shipping Info</Link></li>
              <li><Link href="/returns" className="text-gray-300 hover:text-white">Returns</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-white">Contact Us</Link></li>
              <li><Link href="/size-guide" className="text-gray-300 hover:text-white">Size Guide</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-300 hover:text-white">About Us</Link></li>
              <li><Link href="/sustainability" className="text-gray-300 hover:text-white">Sustainability</Link></li>
              <li><Link href="/careers" className="text-gray-300 hover:text-white">Careers</Link></li>
              <li><Link href="/press" className="text-gray-300 hover:text-white">Press</Link></li>
              <li><Link href="/blog" className="text-gray-300 hover:text-white">Blog</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            <p>&copy; 2024 EcoMart. All rights reserved.</p>
          </div>
          <div className="flex space-x-6 text-sm">
            <Link href="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="text-gray-400 hover:text-white">Terms of Service</Link>
            <Link href="/cookies" className="text-gray-400 hover:text-white">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
