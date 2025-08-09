import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { generateHomePage, generateProductsPage, generateProductPage, generateCategoryPage, generateSearchPage, generateAccountPage, generateCartPage, generateAboutPage, generateContactPage } from "./templates";

export async function registerRoutes(app: Express): Promise<Server> {
  // Server-side rendered HTML routes  
  app.get("/", async (req, res) => {
    try {
      const [featuredProducts, categories] = await Promise.all([
        storage.getProducts({ featured: true, limit: 4 }),
        storage.getCategories()
      ])
      
      const html = generateHomePage(featuredProducts, categories)
      res.send(html)
    } catch (error) {
      res.status(500).send("Error loading homepage")
    }
  })

  app.get("/products", async (req, res) => {
    try {
      const search = req.query.q as string
      const category = req.query.category as string
      const products = await storage.getProducts({ search, categoryId: category })
      
      const html = generateProductsPage(products, search)
      res.send(html)
    } catch (error) {
      res.status(500).send("Error loading products")
    }
  })

  app.get("/products/:slug", async (req, res) => {
    try {
      const product = await storage.getProductBySlug(req.params.slug)
      if (!product) {
        return res.status(404).send("Product not found")
      }
      
      const html = generateProductPage(product)
      res.send(html)
    } catch (error) {
      res.status(500).send("Error loading product")
    }
  })

  app.get("/categories/:slug", async (req, res) => {
    try {
      const [category, products] = await Promise.all([
        storage.getCategoryBySlug(req.params.slug),
        storage.getProducts({ categoryId: req.params.slug })
      ])
      
      if (!category) {
        return res.status(404).send("Category not found")
      }
      
      const html = generateCategoryPage(category, products)
      res.send(html)
    } catch (error) {
      res.status(500).send("Error loading category")
    }
  })

  app.get("/search", async (req, res) => {
    try {
      const query = req.query.q as string
      const products = query ? await storage.getProducts({ search: query }) : []
      
      const html = generateSearchPage(products, query)
      res.send(html)
    } catch (error) {
      res.status(500).send("Error loading search")
    }
  })

  app.get("/account", async (req, res) => {
    try {
      const queryParams = new URLSearchParams(req.url?.split('?')[1] || '')
      const html = generateAccountPage(queryParams)
      res.send(html)
    } catch (error) {
      res.status(500).send("Error loading account page")
    }
  })

  app.get("/cart", async (req, res) => {
    try {
      // In a real app, this would get cart items from session
      const html = generateCartPage([])
      res.send(html)
    } catch (error) {
      res.status(500).send("Error loading cart")
    }
  })

  app.get("/about", async (req, res) => {
    try {
      const html = generateAboutPage()
      res.send(html)
    } catch (error) {
      res.status(500).send("Error loading about page")
    }
  })

  app.get("/contact", async (req, res) => {
    try {
      const html = generateContactPage()
      res.send(html)
    } catch (error) {
      res.status(500).send("Error loading contact page")
    }
  })

  // Cart operations
  app.post("/api/cart", async (req, res) => {
    try {
      const { product_id, quantity } = req.body
      // For now, just redirect back with success message
      // In a real app, this would save to session/database
      res.redirect(req.get('referer') || '/products')
    } catch (error) {
      res.status(500).send("Error adding to cart")
    }
  })

  // Newsletter signup
  app.post("/api/newsletter", async (req, res) => {
    try {
      const { email } = req.body
      await storage.subscribeNewsletter({ email })
      res.redirect('/?subscribed=true')
    } catch (error) {
      res.status(500).send("Error subscribing to newsletter")
    }
  })

  // Authentication routes
  app.post("/api/auth/signup", async (req, res) => {
    try {
      const { name, email, password } = req.body
      
      if (!name || !email || !password) {
        return res.status(400).send("All fields are required")
      }
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(email)
      if (existingUser) {
        return res.redirect('/account?error=user_exists')
      }
      
      // Create user (password hashing would be handled by Firebase Auth)
      await storage.createUser({ name, email })
      
      res.redirect('/account?success=account_created')
    } catch (error) {
      console.error('Signup error:', error)
      res.redirect('/account?error=signup_failed')
    }
  })

  app.post("/api/auth/signin", async (req, res) => {
    try {
      const { email, password } = req.body
      
      if (!email || !password) {
        return res.status(400).send("Email and password are required")
      }
      
      // In a real implementation, this would verify credentials with Firebase Auth
      const user = await storage.getUserByEmail(email)
      if (!user) {
        return res.redirect('/account?error=invalid_credentials')
      }
      
      // Set session or JWT token here
      res.redirect('/account?success=signed_in')
    } catch (error) {
      console.error('Signin error:', error)
      res.redirect('/account?error=signin_failed')
    }
  })

  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, subject, message } = req.body
      // In a real app, this would send an email or save to database
      console.log('Contact form submission:', { name, email, subject, message })
      res.redirect('/contact?success=message_sent')
    } catch (error) {
      res.status(500).send("Error sending message")
    }
  })

  // API routes for Next.js to use
  
  // Products
  app.get("/api/products", async (req, res) => {
    try {
      const { category, search, featured, limit } = req.query;
      const products = await storage.getProducts({
        categoryId: category as string,
        search: search as string,
        featured: featured === 'true',
        limit: limit ? parseInt(limit as string) : undefined
      });
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  app.get("/api/products/:id", async (req, res) => {
    try {
      const product = await storage.getProduct(req.params.id);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch product" });
    }
  });

  // Categories
  app.get("/api/categories", async (req, res) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch categories" });
    }
  });

  app.get("/api/categories/:slug", async (req, res) => {
    try {
      const category = await storage.getCategoryBySlug(req.params.slug);
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }
      res.json(category);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch category" });
    }
  });

  // Cart
  app.get("/api/cart/:sessionId", async (req, res) => {
    try {
      const items = await storage.getCartItems(req.params.sessionId);
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch cart items" });
    }
  });

  app.post("/api/cart", async (req, res) => {
    try {
      const item = await storage.addToCart(req.body);
      res.json(item);
    } catch (error) {
      res.status(500).json({ error: "Failed to add item to cart" });
    }
  });

  app.put("/api/cart/:id", async (req, res) => {
    try {
      const { quantity } = req.body;
      const item = await storage.updateCartItem(req.params.id, quantity);
      if (!item) {
        return res.status(404).json({ error: "Cart item not found" });
      }
      res.json(item);
    } catch (error) {
      res.status(500).json({ error: "Failed to update cart item" });
    }
  });

  app.delete("/api/cart/:id", async (req, res) => {
    try {
      await storage.removeFromCart(req.params.id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to remove cart item" });
    }
  });

  // Newsletter
  app.post("/api/newsletter", async (req, res) => {
    try {
      const subscriber = await storage.subscribeToNewsletter(req.body);
      res.json(subscriber);
    } catch (error) {
      res.status(500).json({ error: "Failed to subscribe to newsletter" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
