import { db, isFirebaseConfigured } from './firebase';
import { IStorage } from './storage';
import type { Product, ProductWithCategory, Category, User, CartItem, NewsletterSubscriber, InsertProduct, InsertCategory, InsertUser, InsertCartItem, InsertNewsletterSubscriber } from '../shared/schema';

export class FirestoreStorage implements IStorage {
  
  async getProducts(options?: { search?: string; categoryId?: string; featured?: boolean; limit?: number }): Promise<ProductWithCategory[]> {
    if (!db) throw new Error('Firebase not configured');
    
    try {
      let query = db.collection('products');
      
      if (options?.categoryId) {
        query = query.where('categoryId', '==', options.categoryId);
      }
      
      if (options?.featured) {
        query = query.where('featured', '==', true);
      }
      
      if (options?.limit) {
        query = query.limit(options.limit);
      }
      
      const snapshot = await query.get();
      let products: ProductWithCategory[] = [];
      
      snapshot.forEach(doc => {
        products.push({ id: doc.id, ...doc.data() } as ProductWithCategory);
      });
      
      // Filter by search term if provided
      if (options?.search) {
        const searchLower = options.search.toLowerCase();
        products = products.filter(product => 
          product.name.toLowerCase().includes(searchLower) ||
          product.description?.toLowerCase().includes(searchLower) ||
          product.shortDescription?.toLowerCase().includes(searchLower)
        );
      }
      
      return products;
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  }

  async getProductById(id: string): Promise<ProductWithCategory | null> {
    if (!db) throw new Error('Firebase not configured');
    
    try {
      const doc = await db.collection('products').doc(id).get();
      return doc.exists ? { id: doc.id, ...doc.data() } as ProductWithCategory : null;
    } catch (error) {
      console.error('Error fetching product:', error);
      return null;
    }
  }

  async getProductBySlug(slug: string): Promise<ProductWithCategory | null> {
    if (!db) throw new Error('Firebase not configured');
    
    try {
      const snapshot = await db.collection('products').where('slug', '==', slug).limit(1).get();
      if (snapshot.empty) return null;
      
      const doc = snapshot.docs[0];
      return { id: doc.id, ...doc.data() } as ProductWithCategory;
    } catch (error) {
      console.error('Error fetching product by slug:', error);
      return null;
    }
  }

  async createProduct(product: InsertProduct): Promise<ProductWithCategory> {
    if (!db) throw new Error('Firebase not configured');
    
    try {
      const docRef = await db.collection('products').add(product);
      const doc = await docRef.get();
      return { id: doc.id, ...doc.data() } as ProductWithCategory;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  }

  async updateProduct(id: string, product: Partial<InsertProduct>): Promise<ProductWithCategory | null> {
    if (!db) throw new Error('Firebase not configured');
    
    try {
      await db.collection('products').doc(id).update(product);
      const doc = await db.collection('products').doc(id).get();
      return doc.exists ? { id: doc.id, ...doc.data() } as ProductWithCategory : null;
    } catch (error) {
      console.error('Error updating product:', error);
      return null;
    }
  }

  async deleteProduct(id: string): Promise<boolean> {
    if (!db) throw new Error('Firebase not configured');
    
    try {
      await db.collection('products').doc(id).delete();
      return true;
    } catch (error) {
      console.error('Error deleting product:', error);
      return false;
    }
  }

  async getCategories(): Promise<Category[]> {
    if (!db) throw new Error('Firebase not configured');
    
    try {
      const snapshot = await db.collection('categories').get();
      const categories: Category[] = [];
      
      snapshot.forEach(doc => {
        categories.push({ id: doc.id, ...doc.data() } as Category);
      });
      
      return categories;
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  }

  async getCategoryById(id: string): Promise<Category | null> {
    if (!db) throw new Error('Firebase not configured');
    
    try {
      const doc = await db.collection('categories').doc(id).get();
      return doc.exists ? { id: doc.id, ...doc.data() } as Category : null;
    } catch (error) {
      console.error('Error fetching category:', error);
      return null;
    }
  }

  async getCategoryBySlug(slug: string): Promise<Category | null> {
    if (!db) throw new Error('Firebase not configured');
    
    try {
      const snapshot = await db.collection('categories').where('slug', '==', slug).limit(1).get();
      if (snapshot.empty) return null;
      
      const doc = snapshot.docs[0];
      return { id: doc.id, ...doc.data() } as Category;
    } catch (error) {
      console.error('Error fetching category by slug:', error);
      return null;
    }
  }

  async createCategory(category: InsertCategory): Promise<Category> {
    if (!db) throw new Error('Firebase not configured');
    
    try {
      const docRef = await db.collection('categories').add(category);
      const doc = await docRef.get();
      return { id: doc.id, ...doc.data() } as Category;
    } catch (error) {
      console.error('Error creating category:', error);
      throw error;
    }
  }

  async getUserById(id: string): Promise<User | null> {
    if (!db) throw new Error('Firebase not configured');
    
    try {
      const doc = await db.collection('users').doc(id).get();
      return doc.exists ? { id: doc.id, ...doc.data() } as User : null;
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
  }

  async getUserByEmail(email: string): Promise<User | null> {
    if (!db) throw new Error('Firebase not configured');
    
    try {
      const snapshot = await db.collection('users').where('email', '==', email).limit(1).get();
      if (snapshot.empty) return null;
      
      const doc = snapshot.docs[0];
      return { id: doc.id, ...doc.data() } as User;
    } catch (error) {
      console.error('Error fetching user by email:', error);
      return null;
    }
  }

  async createUser(user: InsertUser): Promise<User> {
    if (!db) throw new Error('Firebase not configured');
    
    try {
      const docRef = await db.collection('users').add({
        ...user,
        createdAt: new Date().toISOString(),
      });
      const doc = await docRef.get();
      return { id: doc.id, ...doc.data() } as User;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  async addToCart(item: InsertCartItem): Promise<CartItem> {
    if (!db) throw new Error('Firebase not configured');
    
    try {
      const docRef = await db.collection('cartItems').add(item);
      const doc = await docRef.get();
      return { id: doc.id, ...doc.data() } as CartItem;
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  }

  async getCartItems(sessionId: string): Promise<CartItem[]> {
    if (!db) throw new Error('Firebase not configured');
    
    try {
      const snapshot = await db.collection('cartItems').where('sessionId', '==', sessionId).get();
      const items: CartItem[] = [];
      
      snapshot.forEach(doc => {
        items.push({ id: doc.id, ...doc.data() } as CartItem);
      });
      
      return items;
    } catch (error) {
      console.error('Error fetching cart items:', error);
      return [];
    }
  }

  async updateCartItem(id: string, quantity: number): Promise<CartItem | null> {
    if (!db) throw new Error('Firebase not configured');
    
    try {
      await db.collection('cartItems').doc(id).update({ quantity });
      const doc = await db.collection('cartItems').doc(id).get();
      return doc.exists ? { id: doc.id, ...doc.data() } as CartItem : null;
    } catch (error) {
      console.error('Error updating cart item:', error);
      return null;
    }
  }

  async removeFromCart(id: string): Promise<boolean> {
    if (!db) throw new Error('Firebase not configured');
    
    try {
      await db.collection('cartItems').doc(id).delete();
      return true;
    } catch (error) {
      console.error('Error removing from cart:', error);
      return false;
    }
  }

  async clearCart(sessionId: string): Promise<boolean> {
    if (!db) throw new Error('Firebase not configured');
    
    try {
      const snapshot = await db.collection('cartItems').where('sessionId', '==', sessionId).get();
      const batch = db.batch();
      
      snapshot.docs.forEach(doc => {
        batch.delete(doc.ref);
      });
      
      await batch.commit();
      return true;
    } catch (error) {
      console.error('Error clearing cart:', error);
      return false;
    }
  }

  async subscribeNewsletter(subscriber: InsertNewsletterSubscriber): Promise<NewsletterSubscriber> {
    if (!db) throw new Error('Firebase not configured');
    
    try {
      // Check if already subscribed
      const existing = await db.collection('newsletter').where('email', '==', subscriber.email).limit(1).get();
      if (!existing.empty) {
        const doc = existing.docs[0];
        return { id: doc.id, ...doc.data() } as NewsletterSubscriber;
      }
      
      const docRef = await db.collection('newsletter').add({
        ...subscriber,
        subscribedAt: new Date().toISOString(),
      });
      const doc = await docRef.get();
      return { id: doc.id, ...doc.data() } as NewsletterSubscriber;
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      throw error;
    }
  }

  // Initialize Firestore with sample data if collections are empty
  async initializeData(): Promise<void> {
    if (!db) return;
    
    try {
      // Check if categories exist
      const categoriesSnapshot = await db.collection('categories').limit(1).get();
      if (categoriesSnapshot.empty) {
        console.log('Initializing Firestore with sample data...');
        
        // Add categories
        const categories = [
          {
            name: 'Home & Garden',
            slug: 'home-garden',
            description: 'Sustainable products for your home and garden',
            imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300'
          },
          {
            name: 'Personal Care',
            slug: 'personal-care',
            description: 'Eco-friendly personal care products',
            imageUrl: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300'
          },
          {
            name: 'Kitchen',
            slug: 'kitchen',
            description: 'Sustainable kitchen essentials',
            imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300'
          },
          {
            name: 'Fashion',
            slug: 'fashion',
            description: 'Sustainable fashion and accessories',
            imageUrl: 'https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300'
          }
        ];
        
        const categoryPromises = categories.map(category => 
          db.collection('categories').add(category)
        );
        await Promise.all(categoryPromises);
        
        // Add sample products
        const products = [
          {
            name: 'Bamboo Toothbrush Set',
            slug: 'bamboo-toothbrush-set',
            description: 'Set of 4 eco-friendly bamboo toothbrushes with soft bristles. Biodegradable and sustainable alternative to plastic toothbrushes.',
            shortDescription: 'Set of 4 eco-friendly bamboo toothbrushes',
            price: '19.99',
            originalPrice: null,
            categoryId: 'personal-care',
            imageUrl: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
            featured: true,
            rating: '4.8',
            reviewCount: 127
          },
          {
            name: 'Organic Cotton Tote Bag',
            slug: 'organic-cotton-tote-bag',
            description: 'Durable organic cotton tote bag perfect for shopping and everyday use. Machine washable and built to last.',
            shortDescription: 'Durable organic cotton tote bag',
            price: '24.99',
            originalPrice: '29.99',
            categoryId: 'fashion',
            imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
            featured: true,
            rating: '4.6',
            reviewCount: 89
          }
        ];
        
        const productPromises = products.map(product => 
          db.collection('products').add(product)
        );
        await Promise.all(productPromises);
        
        console.log('Sample data initialized in Firestore');
      }
    } catch (error) {
      console.error('Error initializing Firestore data:', error);
    }
  }
}