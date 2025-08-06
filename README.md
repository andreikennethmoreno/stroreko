# Storeco - Digital Products E-commerce Platform

A modern, fully responsive e-commerce platform specifically designed for digital products, offering seamless shopping experiences, comprehensive management tools, and integrated payment processing with PayPal.

## 📋 Project Summary

Storeco is a specialized e-commerce solution built to handle digital product sales efficiently. The platform combines instant digital delivery with traditional shipping address management, providing customers with immediate download access to their purchases while maintaining comprehensive order tracking and shipping information for administrative purposes.

## ✨ Key Features

### 🛍️ Customer Experience
- **Fully Mobile-Responsive Design** - Optimized for all devices and screen sizes
- **Advanced Product Discovery** - Robust search and filtering capabilities by categories (code projects, mini-courses, PDF guides, productivity templates, reference snippets) and price ranges
- **Dynamic Shopping Cart** - Real-time price updates, quantity adjustments, and item removal
- **Secure Payment Processing** - Integrated PayPal API with sandbox and production environments
- **Instant Digital Delivery** - Immediate download access upon purchase completion
- **User Account Management** - Registration, login, profile customization, order history tracking, and shipping address management
- **Shipping Address Management** - Add, edit, and manage multiple shipping addresses through an intuitive dialog interface
- **Order History & Tracking** - Comprehensive order management with detailed product information and download links

### 🔧 Administrative Tools
- **Comprehensive Admin Dashboard** - Complete oversight of orders, users, and products
- **Product Management** - Add, edit, delete products with direct file upload capabilities via UploadThing
- **User Management** - Monitor and manage customer accounts
- **Order Tracking** - Real-time order status and management
- **Search Functionality** - Efficient product and user search within admin panel
- **Role-Based Access Control** - Secure admin authentication with environment-based credentials

### 🎯 Specialized Features
- **Digital-First Architecture** - No shipping modules or physical delivery complications
- **Instant Fulfillment** - Download buttons available immediately after purchase
- **Category-Based Organization** - Five main categories: Code Projects, Mini-Courses, PDF Guides, Productivity Templates, Reference Snippets
- **Responsive Product Pages** - Detailed product information with mobile-optimized layouts
- **Advanced Cart Management** - Select specific items for checkout with real-time total calculations
- **Address Validation** - Checkout process requires shipping address before payment processing

## 🚀 Technology Stack

- **Frontend**: Next.js with React and TypeScript
- **Authentication**: Stack Auth for user management
- **Database**: PostgreSQL with Prisma ORM
- **File Uploads**: UploadThing for digital product storage and image management
- **Payment Integration**: PayPal API (Sandbox and Production)
- **Styling**: Tailwind CSS for responsive design
- **Architecture**: Modern full-stack Next.js application
- **UI Components**: Radix UI with shadcn/ui component library

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL database
- PayPal Developer Account
- Stack Auth account
- UploadThing account

### Installation Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/storeco.git
   cd storeco
   ```

2. **Install Dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure Environment Variables**
   Create a `.env.local` file in the root directory:
   ```bash
   # Stack Auth Configuration
   NEXT_PUBLIC_STACK_PROJECT_ID=your_stack_project_id
   NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY=your_stack_publishable_key
   STACK_SECRET_SERVER_KEY=your_stack_secret_key

   # Database Configuration
   DATABASE_URL=postgresql://username:password@localhost:5432/storeco_db

   # UploadThing Configuration
   UPLOADTHING_TOKEN=your_uploadthing_token

   # PayPal Configuration
   NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_paypal_client_id
   PAYPAL_CLIENT_SECRET=your_paypal_client_secret
   PAYPAL_API_URL=https://api-m.sandbox.paypal.com  # Use https://api-m.paypal.com for production

   # Admin Configuration
   ADMIN_ID=your_admin_user_id
   ADMIN_EMAIL=admin@yourstore.com
   ```

4. **Database Setup**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Run database migrations
   npx prisma db push
   
   # Optional: Seed the database
   npx prisma db seed
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Access the Application**
   - Frontend: `http://localhost:3000`
   - Admin Dashboard: `http://localhost:3000/admin`
   - User Management: `http://localhost:3000/admin/users`
   - Product Management: `http://localhost:3000/admin/myproducts`

### Service Configuration Guides

#### Stack Auth Setup
1. Visit [Stack Auth Dashboard](https://app.stack-auth.com)
2. Create a new project or use existing one
3. Copy the Project ID and API keys to your environment file
4. Configure authentication methods (email/password, OAuth providers)

#### UploadThing Setup
1. Create account at [UploadThing](https://uploadthing.com)
2. Create a new app and get your token
3. Configure file upload settings for digital products
4. Set appropriate file size limits and allowed file types

#### PayPal Integration Setup
1. Create a PayPal Developer account at https://developer.paypal.com
2. Create a new application in the sandbox environment
3. Copy the Client ID and Secret to your environment configuration
4. For production, create a live application and update the API URL
5. Test transactions using PayPal's sandbox test accounts

### Database Schema
The application uses Prisma ORM with PostgreSQL. Key tables include:
- **User** - Customer and admin accounts (managed by Stack Auth)
- **Product** - Digital product information and file references
- **CartItem** - Shopping cart management with user associations
- **Order** - Transaction records and order details
- **OrderItem** - Individual items within orders with pricing history
- **Category** - Product categorization system
- **ShippingAddress** - User shipping information management

## 📖 Usage Guide

### For Customers
1. **Browse Products** - Use advanced search and filtering options across five product categories
2. **Add to Cart** - Select products with real-time cart updates and quantity management
3. **Manage Addresses** - Add and manage shipping addresses through the user-friendly dialog
4. **Selective Checkout** - Choose specific cart items for purchase with dynamic total calculations
5. **PayPal Payment** - Secure payment processing with address validation
6. **Instant Access** - Download purchased products immediately from the orders page
7. **Order History** - Track all purchases with detailed product information and download links

### For Administrators
1. **Access Admin Panel** - Login with environment-configured admin credentials
2. **Product Management** - Create, edit, and delete products with image upload capabilities
3. **Inventory Dashboard** - View comprehensive product statistics and analytics
4. **Order Monitoring** - Track all customer orders with detailed transaction information
5. **User Management** - View and manage all registered users in the system
6. **Role-Based Access** - Secure admin-only areas with proper authentication checks

## 🏗️ System Architecture

### Core Components
- **Next.js App Router** - Modern routing and server-side rendering
- **Stack Auth Integration** - Comprehensive user authentication and management
- **Prisma ORM** - Type-safe database operations and migrations
- **UploadThing** - Secure file upload and storage for digital products
- **PayPal SDK** - Payment processing and transaction management
- **Tailwind CSS** - Utility-first styling and responsive design
- **TypeScript** - Type safety and enhanced developer experience
- **Radix UI** - Accessible component primitives with shadcn/ui styling

### Database Design
- **Users** - Managed by Stack Auth with custom profile extensions
- **Products** - Digital product details with UploadThing file references
- **CartItems** - User-specific shopping cart management
- **Orders** - Transaction records with PayPal payment integration
- **OrderItems** - Detailed order line items with historical pricing
- **Categories** - Product categorization and filtering system
- **ShippingAddresses** - User address management for order fulfillment

### Key Features Implementation
- **Cart Management** - Selective item checkout with real-time calculations
- **Address Management** - CRUD operations for shipping addresses with validation
- **Payment Flow** - PayPal integration with address requirement validation
- **Admin Controls** - Environment-based role authentication and management
- **File Management** - UploadThing integration for product images and downloads

## 🔒 Security Features

- **Stack Auth Integration** - Enterprise-grade authentication with session management
- **Environment Variable Protection** - Sensitive keys stored securely
- **PayPal Secure Payments** - Industry-standard payment processing
- **File Access Control** - Secure digital product download mechanisms
- **Admin Authorization** - Role-based access control for administrative functions
- **Environment-Based Admin** - Admin credentials managed through environment variables
- **Input Validation** - TypeScript and Prisma schema validation
- **HTTPS Enforcement** - Secure data transmission

## 📱 Mobile Optimization

Storeco is built with a mobile-first approach, ensuring:
- Responsive layouts across all screen sizes
- Touch-friendly navigation and interactions
- Optimized loading speeds for mobile connections
- Seamless checkout process on mobile devices
- Mobile-responsive admin dashboard
- Touch-optimized cart and address management

## 🚀 Future Enhancements

- Multi-currency support
- Advanced analytics dashboard
- Customer review and rating system
- Bulk product upload functionality
- Advanced reporting capabilities
- Integration with additional payment gateways
- Automated email notifications for orders
- Advanced inventory management features
- Customer wishlist functionality

## 👥 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Support

For support and questions:
- Create an issue on GitHub
- Contact the development team
- Check the documentation wiki

## 👨‍💻 Developer

**Andrei Kenneth Moreno** - Lead Developer, Group 5

---

*Storeco represents a comprehensive, user-centric e-commerce solution specializing in digital product sales with advanced cart management, secure payment processing, and intuitive address management - delivering professional-grade functionality while maintaining simplicity and exceptional user experience.*
