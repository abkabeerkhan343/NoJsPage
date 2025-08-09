# Overview

EcoMart is a full-stack e-commerce web application focused on sustainable and eco-friendly products that works completely without JavaScript enabled. The application features an Express.js server with server-side rendering (SSR) using EJS templates and inline CSS, backed by Firebase integration including Firestore database, Firebase Authentication, and Cloud Functions. The system supports product browsing, category filtering, shopping cart functionality, user authentication, and newsletter subscriptions with complete accessibility when JavaScript is disabled.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

The frontend is built with server-side rendering (SSR) using Express.js and EJS templates. The application works completely without JavaScript enabled for maximum accessibility. Key architectural decisions include:

- **Express.js with EJS Templates**: Server-side rendering with template functions that generate complete HTML pages
- **Inline CSS**: All styling is embedded directly in HTML to ensure proper rendering without external CSS files
- **Progressive Enhancement**: Full functionality without JavaScript, with optional JavaScript enhancements
- **Form-Based Interactions**: All user interactions use HTML forms with POST/GET requests to server endpoints
- **Session-Based State**: Shopping cart and user state managed via Express sessions and cookies

## Backend Architecture

The backend follows a clean separation of concerns with Express.js handling HTTP requests and a storage abstraction layer:

- **Express.js Server**: Handles API routes with middleware for request logging and error handling
- **Storage Abstraction**: IStorage interface allows switching between in-memory storage (development) and database storage (production)
- **Drizzle ORM**: Type-safe database operations with PostgreSQL dialect
- **Session-based Cart**: Shopping cart tied to browser sessions via HTTP cookies
- **RESTful API**: Clear endpoint structure for products, categories, cart, and newsletter operations

## Data Storage Solutions

The application uses Firebase Firestore as the primary database with a hybrid storage approach:

- **Firebase Firestore**: NoSQL document database for production data storage with real-time capabilities
- **Firestore Storage Interface**: Custom storage abstraction that implements the IStorage interface
- **Hybrid Fallback**: Falls back to in-memory storage when Firebase credentials are not available
- **Authentication Integration**: Firebase Authentication for email/password user management
- **Cloud Functions**: Server-side processing for order handling, inventory updates, and analytics

## Development Architecture

The project uses Express.js with TypeScript for server-side development:

- **Express.js Server**: Handles all HTTP requests, form submissions, and page rendering
- **TypeScript**: Full type safety across server and shared code with proper interface definitions
- **Template Functions**: Server-side HTML generation with embedded CSS for JavaScript-free operation
- **Session Management**: Express sessions with memory store for cart and user state persistence

# External Dependencies

## Firebase Services
- **Firebase Firestore**: NoSQL document database for scalable data storage with real-time capabilities
- **Firebase Authentication**: Email/password authentication with secure user management
- **Firebase Cloud Functions**: Serverless backend processing for orders, inventory, and analytics
- **Firebase Admin SDK**: Server-side Firebase integration for secure operations

## UI/Component Libraries
- **shadcn/ui**: Comprehensive React component library built on Radix UI primitives
- **Radix UI**: Accessible, unstyled UI primitives for complex components
- **Tailwind CSS**: Utility-first CSS framework for consistent styling
- **Lucide React**: Icon library for consistent iconography

## Development Tools
- **Vite**: Fast development server with hot module replacement
- **ESBuild**: Fast JavaScript bundler for production builds
- **TypeScript**: Static type checking across the entire codebase
- **React Query**: Server state management for API calls (configured but not actively used)

## Image and Asset Management
- **Unsplash**: External image hosting for product and category images
- **Next.js Image**: Optimized image loading with automatic format conversion

## Form and Validation
- **React Hook Form**: Form state management and validation
- **Hookform Resolvers**: Integration between React Hook Form and validation libraries
- **Zod**: Runtime type validation for forms and API data

The architecture prioritizes developer experience with type safety, fast development cycles, and clear separation between client and server concerns. The storage abstraction allows for easy testing and development while maintaining production database capabilities.