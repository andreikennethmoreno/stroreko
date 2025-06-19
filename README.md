# Storeco - Digital Products E-commerce Platform

A modern, fully responsive e-commerce platform specifically designed for digital products, offering seamless shopping experiences and comprehensive management tools.

## 📋 Project Summary

Storeco is a specialized e-commerce solution built to handle digital product sales efficiently. The platform eliminates traditional shipping complexities by focusing on instant digital delivery, providing customers with immediate access to their purchases while offering administrators powerful management capabilities.

## ✨ Key Features

### 🛍️ Customer Experience
- **Fully Mobile-Responsive Design** - Optimized for all devices and screen sizes
- **Advanced Product Discovery** - Robust search and filtering capabilities by categories (courses, guides, templates, portfolios) and price ranges
- **Dynamic Shopping Cart** - Real-time price updates, quantity adjustments, and item removal
- **Secure Payment Processing** - Integrated PayPal API with sandbox testing environment
- **Instant Digital Delivery** - Immediate download access upon purchase completion
- **User Account Management** - Registration, login, profile customization, and order history tracking

### 🔧 Administrative Tools
- **Comprehensive Admin Dashboard** - Complete oversight of orders, users, and products
- **Product Management** - Add, edit, delete products with direct file upload capabilities
- **User Management** - Monitor and manage customer accounts
- **Order Tracking** - Real-time order status and management
- **Search Functionality** - Efficient product and user search within admin panel

### 🎯 Specialized Features
- **Digital-First Architecture** - No shipping modules or physical delivery complications
- **Instant Fulfillment** - Download buttons available immediately after purchase
- **Category-Based Organization** - Structured product categorization for better navigation
- **Responsive Product Pages** - Detailed product information with mobile-optimized layouts

## 🚀 Technology Stack

- **Frontend**: Next.js with React and TypeScript
- **Authentication**: Stack Auth for user management
- **Database**: PostgreSQL with Prisma ORM
- **File Uploads**: UploadThing for digital product storage
- **Payment Integration**: PayPal API (Sandbox and Production)
- **Styling**: Tailwind CSS for responsive design
- **Architecture**: Modern full-stack Next.js application

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
- **Order** - Transaction records and order details
- **Category** - Product categorization system
- **Download** - Digital product download tracking

## 📖 Usage Guide

### For Customers
1. **Browse Products** - Use search and filtering options to find desired digital products
2. **Add to Cart** - Select products and adjust quantities as needed
3. **Checkout** - Complete purchase using PayPal integration
4. **Download** - Access purchased products immediately via download links

### For Administrators
1. **Access Admin Panel** - Login with admin credentials
2. **Manage Products** - Add new products, edit existing ones, or remove outdated items
3. **Monitor Orders** - Track all customer orders and payment statuses
4. **User Management** - Oversee customer accounts and activities

## 🏗️ System Architecture

### Core Components
- **Next.js App Router** - Modern routing and server-side rendering
- **Stack Auth Integration** - Comprehensive user authentication and management
- **Prisma ORM** - Type-safe database operations and migrations
- **UploadThing** - Secure file upload and storage for digital products
- **PayPal SDK** - Payment processing and transaction management
- **Tailwind CSS** - Utility-first styling and responsive design
- **TypeScript** - Type safety and enhanced developer experience

### Database Design
- **Users** - Managed by Stack Auth with custom profile extensions
- **Products** - Digital product details with UploadThing file references
- **Orders** - Transaction records with PayPal payment integration
- **Categories** - Product categorization and filtering system
- **Downloads** - Track digital product download access and history

## 🔒 Security Features

- **Stack Auth Integration** - Enterprise-grade authentication with session management
- **Environment Variable Protection** - Sensitive keys stored securely
- **PayPal Secure Payments** - Industry-standard payment processing
- **File Access Control** - Secure digital product download mechanisms
- **Admin Authorization** - Role-based access control for administrative functions
- **Input Validation** - TypeScript and Prisma schema validation
- **HTTPS Enforcement** - Secure data transmission

## 📱 Mobile Optimization

Storeco is built with a mobile-first approach, ensuring:
- Responsive layouts across all screen sizes
- Touch-friendly navigation and interactions
- Optimized loading speeds for mobile connections
- Seamless checkout process on mobile devices

## 🚀 Future Enhancements

- Multi-currency support
- Advanced analytics dashboard
- Customer review and rating system
- Bulk product upload functionality
- Advanced reporting capabilities
- Integration with additional payment gateways

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

*Storeco represents a forward-thinking, user-centric e-commerce solution specializing in the effective sale of digital products by addressing core functionalities required by both consumers and administrators while maintaining simplicity and responsiveness.*
