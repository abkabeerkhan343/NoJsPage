import { onRequest, onCall } from "firebase-functions/v2/https";
import { onDocumentCreated } from "firebase-functions/v2/firestore";
import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

initializeApp();

const db = getFirestore();
const auth = getAuth();

// HTTP Cloud Function for processing orders
export const processOrder = onRequest(async (request, response) => {
  try {
    const { cartItems, customerInfo } = request.body;
    
    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      response.status(400).json({ error: "Cart items are required" });
      return;
    }

    // Calculate total
    let total = 0;
    for (const item of cartItems) {
      const productDoc = await db.collection('products').doc(item.productId).get();
      if (productDoc.exists) {
        const product = productDoc.data();
        total += parseFloat(product?.price || '0') * item.quantity;
      }
    }

    // Create order
    const order = {
      customerInfo,
      items: cartItems,
      total: total.toFixed(2),
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    const orderRef = await db.collection('orders').add(order);

    response.json({
      success: true,
      orderId: orderRef.id,
      total: total.toFixed(2)
    });
  } catch (error) {
    console.error('Order processing error:', error);
    response.status(500).json({ 
      error: "Failed to process order",
      details: error instanceof Error ? error.message : String(error)
    });
  }
});

// Callable Cloud Function for getting order status
export const getOrderStatus = onCall(async (request) => {
  try {
    const { orderId } = request.data;
    
    if (!orderId) {
      throw new Error('Order ID is required');
    }

    const orderDoc = await db.collection('orders').doc(orderId).get();
    
    if (!orderDoc.exists) {
      throw new Error('Order not found');
    }

    return {
      success: true,
      order: {
        id: orderDoc.id,
        ...orderDoc.data()
      }
    };
  } catch (error) {
    console.error('Get order status error:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to get order status');
  }
});

// Firestore trigger - automatically update product inventory when order is created
export const updateInventoryOnOrder = onDocumentCreated("orders/{orderId}", async (event) => {
  try {
    const orderData = event.data?.data();
    
    if (!orderData || !orderData.items) {
      console.log('No order data or items found');
      return;
    }

    // Update inventory for each product in the order
    const batch = db.batch();
    
    for (const item of orderData.items) {
      const productRef = db.collection('products').doc(item.productId);
      const productDoc = await productRef.get();
      
      if (productDoc.exists) {
        const productData = productDoc.data();
        const currentInventory = productData?.inventory || 0;
        const newInventory = Math.max(0, currentInventory - item.quantity);
        
        batch.update(productRef, { 
          inventory: newInventory,
          lastSold: new Date().toISOString()
        });
      }
    }

    await batch.commit();
    console.log(`Inventory updated for order ${event.params.orderId}`);
  } catch (error) {
    console.error('Error updating inventory:', error);
  }
});

// HTTP Cloud Function for sending newsletter
export const sendNewsletter = onRequest(async (request, response) => {
  try {
    const { subject, content, testEmail } = request.body;
    
    if (!subject || !content) {
      response.status(400).json({ error: "Subject and content are required" });
      return;
    }

    // Get all newsletter subscribers
    const subscribersSnapshot = await db.collection('newsletter').get();
    const subscribers = subscribersSnapshot.docs.map(doc => doc.data());

    if (testEmail) {
      // Send test email only
      console.log(`Sending test newsletter to ${testEmail}:`, { subject, content });
      response.json({
        success: true,
        message: `Test newsletter sent to ${testEmail}`,
        subscriberCount: 1
      });
      return;
    }

    // In a real implementation, you would use a service like SendGrid, Mailgun, etc.
    console.log(`Sending newsletter to ${subscribers.length} subscribers:`, { subject, content });
    
    // Log newsletter sending (in real app, this would actually send emails)
    await db.collection('newsletterLogs').add({
      subject,
      content,
      recipientCount: subscribers.length,
      sentAt: new Date().toISOString(),
      status: 'sent'
    });

    response.json({
      success: true,
      message: `Newsletter sent to ${subscribers.length} subscribers`,
      subscriberCount: subscribers.length
    });
  } catch (error) {
    console.error('Newsletter sending error:', error);
    response.status(500).json({ 
      error: "Failed to send newsletter",
      details: error instanceof Error ? error.message : String(error)
    });
  }
});

// Callable Cloud Function for product analytics
export const getProductAnalytics = onCall(async (request) => {
  try {
    // Get all products
    const productsSnapshot = await db.collection('products').get();
    const products = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // Get recent orders to calculate popular products
    const ordersSnapshot = await db.collection('orders')
      .orderBy('createdAt', 'desc')
      .limit(100)
      .get();

    const productSales: { [key: string]: number } = {};
    
    ordersSnapshot.docs.forEach(doc => {
      const orderData = doc.data();
      if (orderData.items) {
        orderData.items.forEach((item: any) => {
          productSales[item.productId] = (productSales[item.productId] || 0) + item.quantity;
        });
      }
    });

    // Calculate analytics
    const analytics = {
      totalProducts: products.length,
      totalOrders: ordersSnapshot.size,
      popularProducts: Object.entries(productSales)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5)
        .map(([productId, sales]) => ({
          productId,
          sales,
          product: products.find(p => p.id === productId)
        })),
      lowInventoryProducts: products.filter(p => (p.inventory || 0) < 10),
      categorySales: {}
    };

    return {
      success: true,
      analytics
    };
  } catch (error) {
    console.error('Analytics error:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to get analytics');
  }
});