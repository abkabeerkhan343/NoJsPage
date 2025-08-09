import { type User, type InsertUser, type Category, type InsertCategory, type Product, type InsertProduct, type CartItem, type InsertCartItem, type NewsletterSubscriber, type InsertNewsletterSubscriber, type ProductWithCategory, type CartItemWithProduct } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Categories
  getCategories(): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;

  // Products
  getProducts(options?: { categoryId?: string; search?: string; featured?: boolean; limit?: number }): Promise<ProductWithCategory[]>;
  getProduct(id: string): Promise<ProductWithCategory | undefined>;
  getProductBySlug(slug: string): Promise<ProductWithCategory | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;

  // Cart
  getCartItems(sessionId: string): Promise<CartItemWithProduct[]>;
  addToCart(item: InsertCartItem): Promise<CartItem>;
  updateCartItem(id: string, quantity: number): Promise<CartItem | undefined>;
  removeFromCart(id: string): Promise<void>;
  clearCart(sessionId: string): Promise<void>;

  // Newsletter
  subscribeToNewsletter(subscriber: InsertNewsletterSubscriber): Promise<NewsletterSubscriber>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private categories: Map<string, Category>;
  private products: Map<string, Product>;
  private cartItems: Map<string, CartItem>;
  private newsletterSubscribers: Map<string, NewsletterSubscriber>;

  constructor() {
    this.users = new Map();
    this.categories = new Map();
    this.products = new Map();
    this.cartItems = new Map();
    this.newsletterSubscribers = new Map();
    
    // Initialize with sample data
    this.initializeData();
  }

  private initializeData() {
    // Categories
    const categories: Category[] = [
      {
        id: "home-garden",
        name: "Home & Garden",
        slug: "home-garden",
        description: "Sustainable solutions for your living space",
        imageUrl: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
      },
      {
        id: "personal-care",
        name: "Personal Care",
        slug: "personal-care",
        description: "Natural beauty and wellness products",
        imageUrl: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
      },
      {
        id: "kitchen",
        name: "Kitchen",
        slug: "kitchen",
        description: "Eco-friendly cooking and dining essentials",
        imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
      },
      {
        id: "fashion",
        name: "Fashion",
        slug: "fashion",
        description: "Sustainable clothing and accessories",
        imageUrl: "https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
      }
    ];

    categories.forEach(category => this.categories.set(category.id, category));

    // Products
    const products: Product[] = [
      {
        id: "bamboo-toothbrush-set",
        name: "Bamboo Toothbrush Set",
        slug: "bamboo-toothbrush-set",
        description: "Made from sustainably sourced bamboo, these toothbrushes are completely biodegradable and perfect for eco-conscious families. Each set includes 4 toothbrushes with different colored bristles for easy identification.",
        shortDescription: "Set of 4 biodegradable bamboo toothbrushes",
        price: "24.99",
        originalPrice: "29.99",
        categoryId: "personal-care",
        imageUrl: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        imageUrls: [
          "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=150"
        ],
        inStock: true,
        stockQuantity: 50,
        rating: "5.0",
        reviewCount: 128,
        features: ["100% biodegradable bamboo handle", "Medium softness bristles", "Plastic-free packaging", "Set of 4 different colors"],
        isFeatured: true,
        createdAt: new Date()
      },
      {
        id: "organic-cotton-tote",
        name: "Organic Cotton Tote Bag",
        slug: "organic-cotton-tote",
        description: "Durable and stylish eco-friendly shopping bag made from 100% organic cotton. Perfect for grocery shopping, beach trips, or everyday use.",
        shortDescription: "Durable and stylish eco-friendly shopping bag",
        price: "18.99",
        originalPrice: null,
        categoryId: "fashion",
        imageUrl: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        imageUrls: [
          "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
        ],
        inStock: true,
        stockQuantity: 25,
        rating: "4.5",
        reviewCount: 89,
        features: ["100% organic cotton", "Reinforced handles", "Machine washable", "Spacious design"],
        isFeatured: true,
        createdAt: new Date()
      },
      {
        id: "stainless-steel-water-bottle",
        name: "Stainless Steel Water Bottle",
        slug: "stainless-steel-water-bottle",
        description: "Insulated stainless steel water bottle that keeps drinks hot or cold for hours. BPA-free and perfect for outdoor activities.",
        shortDescription: "Insulated bottle keeps drinks hot or cold for hours",
        price: "32.99",
        originalPrice: null,
        categoryId: "kitchen",
        imageUrl: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        imageUrls: [
          "https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
        ],
        inStock: true,
        stockQuantity: 30,
        rating: "5.0",
        reviewCount: 156,
        features: ["Double-wall insulation", "BPA-free", "Leak-proof design", "24-hour cold retention"],
        isFeatured: true,
        createdAt: new Date()
      },
      {
        id: "beeswax-food-wraps",
        name: "Beeswax Food Wraps",
        slug: "beeswax-food-wraps",
        description: "Reusable alternative to plastic wrap made from organic cotton and natural beeswax. Perfect for wrapping sandwiches, cheese, and leftovers.",
        shortDescription: "Reusable alternative to plastic wrap - set of 3",
        price: "22.99",
        originalPrice: null,
        categoryId: "kitchen",
        imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        imageUrls: [
          "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
        ],
        inStock: true,
        stockQuantity: 40,
        rating: "4.0",
        reviewCount: 73,
        features: ["Natural beeswax coating", "Organic cotton base", "Washable and reusable", "Set of 3 sizes"],
        isFeatured: true,
        createdAt: new Date()
      }
    ];

    products.forEach(product => this.products.set(product.id, product));
  }

  // Users
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id,
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  // Categories
  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return Array.from(this.categories.values()).find(category => category.slug === slug);
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = randomUUID();
    const category: Category = { ...insertCategory, id };
    this.categories.set(id, category);
    return category;
  }

  // Products
  async getProducts(options: { categoryId?: string; search?: string; featured?: boolean; limit?: number } = {}): Promise<ProductWithCategory[]> {
    let products = Array.from(this.products.values());

    if (options.categoryId) {
      products = products.filter(product => product.categoryId === options.categoryId);
    }

    if (options.search) {
      const searchLower = options.search.toLowerCase();
      products = products.filter(product => 
        product.name.toLowerCase().includes(searchLower) ||
        product.description?.toLowerCase().includes(searchLower) ||
        product.shortDescription?.toLowerCase().includes(searchLower)
      );
    }

    if (options.featured) {
      products = products.filter(product => product.isFeatured);
    }

    if (options.limit) {
      products = products.slice(0, options.limit);
    }

    // Add category information
    return products.map(product => ({
      ...product,
      category: product.categoryId ? this.categories.get(product.categoryId) : undefined
    }));
  }

  async getProduct(id: string): Promise<ProductWithCategory | undefined> {
    const product = this.products.get(id);
    if (!product) return undefined;

    return {
      ...product,
      category: product.categoryId ? this.categories.get(product.categoryId) : undefined
    };
  }

  async getProductBySlug(slug: string): Promise<ProductWithCategory | undefined> {
    const product = Array.from(this.products.values()).find(p => p.slug === slug);
    if (!product) return undefined;

    return {
      ...product,
      category: product.categoryId ? this.categories.get(product.categoryId) : undefined
    };
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = randomUUID();
    const product: Product = { 
      ...insertProduct, 
      id,
      createdAt: new Date()
    };
    this.products.set(id, product);
    return product;
  }

  // Cart
  async getCartItems(sessionId: string): Promise<CartItemWithProduct[]> {
    const items = Array.from(this.cartItems.values()).filter(item => item.sessionId === sessionId);
    
    return items.map(item => {
      const product = this.products.get(item.productId);
      if (!product) throw new Error(`Product not found: ${item.productId}`);
      
      return {
        ...item,
        product
      };
    });
  }

  async addToCart(insertItem: InsertCartItem): Promise<CartItem> {
    // Check if item already exists
    const existingItem = Array.from(this.cartItems.values()).find(
      item => item.sessionId === insertItem.sessionId && item.productId === insertItem.productId
    );

    if (existingItem) {
      // Update quantity
      existingItem.quantity += insertItem.quantity;
      return existingItem;
    }

    const id = randomUUID();
    const item: CartItem = {
      ...insertItem,
      id,
      createdAt: new Date()
    };
    this.cartItems.set(id, item);
    return item;
  }

  async updateCartItem(id: string, quantity: number): Promise<CartItem | undefined> {
    const item = this.cartItems.get(id);
    if (!item) return undefined;

    item.quantity = quantity;
    return item;
  }

  async removeFromCart(id: string): Promise<void> {
    this.cartItems.delete(id);
  }

  async clearCart(sessionId: string): Promise<void> {
    Array.from(this.cartItems.entries()).forEach(([id, item]) => {
      if (item.sessionId === sessionId) {
        this.cartItems.delete(id);
      }
    });
  }

  // Newsletter
  async subscribeToNewsletter(insertSubscriber: InsertNewsletterSubscriber): Promise<NewsletterSubscriber> {
    const id = randomUUID();
    const subscriber: NewsletterSubscriber = {
      ...insertSubscriber,
      id,
      subscribedAt: new Date()
    };
    this.newsletterSubscribers.set(id, subscriber);
    return subscriber;
  }
}

export const storage = new MemStorage();
