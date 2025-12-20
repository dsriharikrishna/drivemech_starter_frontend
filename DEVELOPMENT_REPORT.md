# DriveMech Web Application - Development Report

**Project:** DriveMech - Automotive Solutions Platform  
**Technology Stack:** Next.js 16, React 19, TypeScript, Redux Toolkit, Tailwind CSS  
**Report Date:** December 20, 2025

---

## Executive Summary

DriveMech is a comprehensive automotive solutions platform built with modern web technologies. The application serves two primary user types: **Customers** (vehicle owners seeking services) and **Vendors** (automotive service providers). The platform facilitates service bookings, spare parts sales, towing services, insurance management, and complete workshop operations.

---

## 1. Technology Stack & Architecture

### Core Technologies
- **Framework:** Next.js 16.0.10 (App Router)
- **UI Library:** React 19.2.0
- **Language:** TypeScript 5.9.3
- **Styling:** Tailwind CSS 4
- **State Management:** Redux Toolkit 2.9.2 with Redux Persist
- **Form Management:** React Hook Form 7.66.1 with Zod 4.1.13 validation
- **Animation:** Framer Motion 12.23.24
- **Maps:** Leaflet 1.9.4, MapLibre GL 5.13.0

### Development Tools
- **Icons:** Lucide React, Phosphor React
- **Carousel:** Embla Carousel
- **Rich Text Editor:** TipTap
- **HTTP Client:** Axios 1.13.1
- **Cookie Management:** js-cookie

---

## 2. Project Structure

```
drivemech-webapplication/
├── src/
│   ├── app/                    # Next.js App Router (84+ pages)
│   ├── components/             # 218+ reusable components
│   ├── store/                  # Redux state management (17 slices)
│   ├── schemas/                # Zod validation schemas
│   ├── types/                  # TypeScript type definitions
│   ├── constants/              # Application constants
│   ├── hooks/                  # Custom React hooks
│   ├── services/               # API service layer
│   └── utils/                  # Utility functions
├── public/
│   ├── images/                 # Image assets
│   └── svgs/                   # 47+ SVG icons
```

---

## 3. Feature Development Overview

### 3.1 Authentication System

**Dual User Authentication Flow**

#### Customer Authentication
- [Login](file:///c:/Users/Lenovo/OneDrive/Documents/Projects/drivemech-webapplication/src/app/(drivemech)/auth/customer/login/page.tsx)
- [Registration](file:///c:/Users/Lenovo/OneDrive/Documents/Projects/drivemech-webapplication/src/app/(drivemech)/auth/customer/register/page.tsx)
- [Email Verification](file:///c:/Users/Lenovo/OneDrive/Documents/Projects/drivemech-webapplication/src/app/(drivemech)/auth/customer/verify/page.tsx)
- [MPIN Creation & Management](file:///c:/Users/Lenovo/OneDrive/Documents/Projects/drivemech-webapplication/src/app/(drivemech)/auth/customer/mpin/page.tsx)
- [Forgot MPIN with Verification](file:///c:/Users/Lenovo/OneDrive/Documents/Projects/drivemech-webapplication/src/app/(drivemech)/auth/customer/forgot-mpin/page.tsx)
- [Account Confirmation](file:///c:/Users/Lenovo/OneDrive/Documents/Projects/drivemech-webapplication/src/app/(drivemech)/auth/customer/confirm/page.tsx)

#### Vendor Authentication
- Complete parallel authentication flow for vendors
- Separate registration, verification, and MPIN management
- Role-based access control

**Technical Implementation:**
- Form validation using Zod schemas
- Redux state management for auth state
- Cookie-based session management
- Protected route middleware

---

### 3.2 Customer Module

#### Landing Page & Home
- **Hero Section** with vehicle search
- **Services Section** showcasing available services
- **How It Works** guide
- **Key Features** presentation
- **Insurance Partners** display
- **Customer Garage** section
- **Spare Parts** showcase
- **Play Store** download section
- **Banner** promotions

#### Service Booking Flow

**1. Service Selection**
- [Select Service Page](file:///c:/Users/Lenovo/OneDrive/Documents/Projects/drivemech-webapplication/src/app/(drivemech)/customer/select-service/page.tsx)
- Vehicle search with make, model, state, rego, postcode
- Service category selection (10+ categories)
- Add-on services (AC, Glass, Suspension, Battery, Spark Plugs, Roadside Assistance)
- Date & time slot selection
- Redux-powered form state management

**2. Workshop Selection**
- [Workshop Page](file:///c:/Users/Lenovo/OneDrive/Documents/Projects/drivemech-webapplication/src/app/(drivemech)/customer/workshop/page.tsx)
- Workshop cards with ratings, pricing, and features
- Filter by location, price, rating
- Workshop comparison
- Mechanic profiles

**3. Booking Details**
- [Booking Details Page](file:///c:/Users/Lenovo/OneDrive/Documents/Projects/drivemech-webapplication/src/app/(drivemech)/customer/booking-details/page.tsx)
- Service summary
- Workshop information
- Pricing breakdown
- Special instructions

**4. Payment Processing**
- [Payment Process Page](file:///c:/Users/Lenovo/OneDrive/Documents/Projects/drivemech-webapplication/src/app/(drivemech)/customer/payment-process/page.tsx)
- Multiple payment methods (Credit/Debit Card, UPI, Net Banking, Wallet)
- Dynamic schema validation based on payment method
- Secure payment integration
- [Booking Success Page](file:///c:/Users/Lenovo/OneDrive/Documents/Projects/drivemech-webapplication/src/app/(drivemech)/customer/booking-success/page.tsx)

**5. Order Tracking**
- [Track Booking Page](file:///c:/Users/Lenovo/OneDrive/Documents/Projects/drivemech-webapplication/src/app/(drivemech)/customer/track-booking/page.tsx)
- Real-time status updates
- Timeline visualization
- Estimated completion time

#### Customer Profile Management

**My Orders** - Comprehensive order management across 4 categories:

**Services Orders:**
- [Services Tab](file:///c:/Users/Lenovo/OneDrive/Documents/Projects/drivemech-webapplication/src/components/customer/profile/orders/tabs/services/ServicesTab.tsx)
- Order details with service breakdown
- Download invoice functionality
- Write reviews and ratings
- Raise complaints
- Order status tracking

**Spare Parts Orders:**
- [Spares Tab](file:///c:/Users/Lenovo/OneDrive/Documents/Projects/drivemech-webapplication/src/components/customer/profile/orders/tabs/spares/SparesTab.tsx)
- Product details and specifications
- Return request functionality
- Return tracking with timeline
- Download spare invoice
- Product reviews

**Towing Services Orders:**
- [Towing Tab](file:///c:/Users/Lenovo/OneDrive/Documents/Projects/drivemech-webapplication/src/components/customer/profile/orders/tabs/towing/TowingTab.tsx)
- Driver details with photo and contact
- Live tracking
- Driver reviews
- Complaint management
- Invoice download

**Insurance Orders:**
- [Insurance Tab](file:///c:/Users/Lenovo/OneDrive/Documents/Projects/drivemech-webapplication/src/components/customer/profile/orders/tabs/insurance/InsuranceTab.tsx)
- Policy details and coverage
- Add nominee functionality
- Modify policy options
- File insurance claims
- Premium impact calculator
- Policy summary cards

**My Vehicles:**
- [Vehicles Page](file:///c:/Users/Lenovo/OneDrive/Documents/Projects/drivemech-webapplication/src/app/(drivemech)/customer/profile/my-vehicles/page.tsx)
- Add/Edit/Delete vehicles
- Set default vehicle
- Vehicle card display
- Service history per vehicle

**My Address:**
- [Address Page](file:///c:/Users/Lenovo/OneDrive/Documents/Projects/drivemech-webapplication/src/app/(drivemech)/customer/profile/my-address/page.tsx)
- Add/Edit/Delete addresses
- Set default address
- Address form with validation

**My Payments:**
- [Payments Page](file:///c:/Users/Lenovo/OneDrive/Documents/Projects/drivemech-webapplication/src/app/(drivemech)/customer/profile/my-payments/page.tsx)
- Payment history
- Transaction details
- Payment methods management

**My Settings:**
- [Settings Page](file:///c:/Users/Lenovo/OneDrive/Documents/Projects/drivemech-webapplication/src/app/(drivemech)/customer/profile/my-settings/page.tsx)
- Account settings
- Notification preferences
- Privacy settings
- Security options

#### Spare Parts Module
- [Spare Parts Checkout](file:///c:/Users/Lenovo/OneDrive/Documents/Projects/drivemech-webapplication/src/app/(drivemech)/spare-parts/checkout/page.tsx)
- Multi-tab checkout (Address, Review, Payment)
- Cart management with Redux
- Address form with Zod validation
- Payment processing
- [Checkout Success](file:///c:/Users/Lenovo/OneDrive/Documents/Projects/drivemech-webapplication/src/app/(drivemech)/spare-parts/checkout/success/page.tsx)

#### Towing Services
- Emergency towing request
- Location-based service
- Real-time driver tracking
- Estimated arrival time

#### Location & Maps
- [Location Selection](file:///c:/Users/Lenovo/OneDrive/Documents/Projects/drivemech-webapplication/src/app/(drivemech)/location/page.tsx)
- [Countries Page](file:///c:/Users/Lenovo/OneDrive/Documents/Projects/drivemech-webapplication/src/app/(drivemech)/countries/page.tsx) with states display
- [Maps Integration](file:///c:/Users/Lenovo/OneDrive/Documents/Projects/drivemech-webapplication/src/app/(drivemech)/maps/page.tsx)
- Interactive map with Leaflet/MapLibre
- City search functionality
- Verified garages display

---

### 3.3 Vendor Module

#### Vendor Dashboard
- [Dashboard Page](file:///c:/Users/Lenovo/OneDrive/Documents/Projects/drivemech-webapplication/src/app/(drivemech)/vendor/dashboard/page.tsx)
- Key metrics and analytics
- Recent bookings
- Revenue overview
- Quick actions

#### Operations Management

**Booking Diary:**
- Calendar view of bookings
- Appointment scheduling
- Status management

**Transaction Center:**
- Financial transactions
- Payment tracking
- Invoice generation

**Spare Parts Management:**
- Inventory tracking
- Order fulfillment
- Stock alerts

**Towing Services:**
- [Towing Services Page](file:///c:/Users/Lenovo/OneDrive/Documents/Projects/drivemech-webapplication/src/app/(drivemech)/vendor/operations/towing-services/page.tsx)
- Towing request management
- Driver assignment

**Inspections:**
- [Inspections Page](file:///c:/Users/Lenovo/OneDrive/Documents/Projects/drivemech-webapplication/src/app/(drivemech)/vendor/operations/inspections/page.tsx)
- Vehicle inspection forms
- Inspection reports

#### Management

**Customers:**
- [Customers Page](file:///c:/Users/Lenovo/OneDrive/Documents/Projects/drivemech-webapplication/src/app/(drivemech)/vendor/management/customers/page.tsx)
- Customer database
- Service history
- Communication logs

**Vehicles:**
- Vehicle records
- Service history per vehicle
- Maintenance schedules

**Employees:**
- Staff management
- Role assignments
- Performance tracking

#### Inventory Management

**Suppliers:**
- Supplier database
- Purchase orders
- Supplier performance

**Stock:**
- Inventory tracking
- Stock levels
- Reorder alerts

**Stock Take:**
- Physical inventory count
- Reconciliation
- Variance reporting

**Loaner Cars:**
- [Loaner Cars Page](file:///c:/Users/Lenovo/OneDrive/Documents/Projects/drivemech-webapplication/src/app/(drivemech)/vendor/inventory/loaner-cars/page.tsx)
- Fleet management
- Availability tracking
- Booking system

#### Workshop Management
- [Manage Workshop Page](file:///c:/Users/Lenovo/OneDrive/Documents/Projects/drivemech-webapplication/src/app/(drivemech)/vendor/manage-workshop/page.tsx)
- Workshop profile
- Service offerings
- Pricing management
- Operating hours

#### Reports & Analytics

**Reports:**
- Comprehensive reporting dashboard
- Custom date ranges
- Export functionality

**Customer Reports:**
- Customer analytics
- Retention metrics
- Satisfaction scores

**Business Reports:**
- Revenue analysis
- Service trends
- Performance metrics

#### Configurations

**System Configurations:**
- [System Page](file:///c:/Users/Lenovo/OneDrive/Documents/Projects/drivemech-webapplication/src/app/(drivemech)/vendor/configurations/system/page.tsx)
- System settings
- Business rules
- Workflow configurations

**Integrations:**
- Third-party integrations
- API management
- Webhook configurations

**Settings:**
- General settings
- Notification preferences
- Security settings

#### Vendor Pricing
- [Pricing Page](file:///c:/Users/Lenovo/OneDrive/Documents/Projects/drivemech-webapplication/src/app/(drivemech)/vendor/pricing/page.tsx)
- Subscription plans
- Billing cycle selection (Monthly/Yearly)
- Dynamic pricing with Redux
- Payment card integration
- Services count management

#### Vendor Onboarding
- Multi-step onboarding process
- Business information collection
- Document verification
- Workshop setup

---

## 4. Component Architecture

### 4.1 Layout Components

**VendorSidebar** - Recently refactored into modular components:
- [VendorSidebar.tsx](file:///c:/Users/Lenovo/OneDrive/Documents/Projects/drivemech-webapplication/src/components/Layout/VendorSidebar.tsx)
- [NavItem.tsx](file:///c:/Users/Lenovo/OneDrive/Documents/Projects/drivemech-webapplication/src/components/Layout/VendorSidebar/NavItem.tsx)
- [SubMenuItem.tsx](file:///c:/Users/Lenovo/OneDrive/Documents/Projects/drivemech-webapplication/src/components/Layout/VendorSidebar/SubMenuItem.tsx)
- [SidebarHeader.tsx](file:///c:/Users/Lenovo/OneDrive/Documents/Projects/drivemech-webapplication/src/components/Layout/VendorSidebar/SidebarHeader.tsx)
- [UserProfile.tsx](file:///c:/Users/Lenovo/OneDrive/Documents/Projects/drivemech-webapplication/src/components/Layout/VendorSidebar/UserProfile.tsx)
- [NavigationMenu.tsx](file:///c:/Users/Lenovo/OneDrive/Documents/Projects/drivemech-webapplication/src/components/Layout/VendorSidebar/NavigationMenu.tsx)
- [navItems.ts](file:///c:/Users/Lenovo/OneDrive/Documents/Projects/drivemech-webapplication/src/components/Layout/VendorSidebar/navItems.ts)

**Features:**
- Accordion navigation with nested submenus
- Active state management
- Auto-expand on route match
- Responsive design
- Icon integration

### 4.2 Reusable UI Components

**Form Components:**
- Custom input fields
- Dropdown selectors
- Date/time pickers
- File upload
- Rich text editor (TipTap)

**Display Components:**
- Cards (Service, Workshop, Order, Vehicle)
- Tables with sorting/filtering
- Modals and dialogs
- Toast notifications
- Loading states

**Navigation Components:**
- Breadcrumbs
- Tabs
- Pagination
- Scrollable tabs with arrows

### 4.3 Feature-Specific Components

**Booking Components:**
- Service selection cards
- Workshop comparison
- Time slot picker
- Booking summary

**Profile Components:**
- Avatar menu
- Profile sidebar
- Settings sections
- Order cards

**Workshop Components:**
- Mechanic cards
- Service listings
- Pricing displays
- Rating systems

---

## 5. State Management (Redux)

### Redux Slices (17 Total)

1. **auth** - Authentication state
2. **booking** - Booking flow state
3. **cart** - Shopping cart for spare parts
4. **helpers** - UI helpers (sidebar, modals)
5. **home** - Home page state
6. **location** - Location selection
7. **notification** - Notifications
8. **order** - Order management
9. **payment** - Payment processing
10. **pricing** - Vendor pricing plans
11. **services** - Service selection
12. **spare-parts** - Spare parts catalog
13. **towing-services** - Towing requests
14. **ui** - Global UI state
15. **user** - User profile data
16. **vehicle** - Vehicle information
17. **workshop** - Workshop data

**Features:**
- Redux Persist for state persistence
- Type-safe actions and reducers
- Middleware for async operations
- Centralized state management

---

## 6. Form Validation & Schemas

### Zod Validation Schemas

**Authentication Schemas:**
- Login validation
- Registration validation
- MPIN creation/verification
- Email verification

**Customer Schemas:**
- Vehicle search
- Service selection
- Booking details
- Address form
- Payment form
- Review submission

**Checkout Schema:**
- Multi-step validation
- Address validation
- Payment method validation

**Towing Schema:**
- Emergency request
- Location validation
- Contact information

**Partner Schemas:**
- Vendor registration
- Workshop setup

---

## 7. Constants & Configuration

### Application Constants

1. **booking.constants.ts** - Booking-related constants
2. **cookies.ts** - Cookie configuration
3. **location.constants.ts** - Location data
4. **payment.constants.ts** - Payment methods and gateways
5. **products.constants.ts** - Product categories
6. **service.constants.ts** - Service types and add-ons
7. **spare-parts.constants.ts** - Spare parts categories
8. **vehicle.constants.ts** - Vehicle makes, models, states
9. **workshop.constants.ts** - Workshop features and amenities

---

## 8. Key Features & Highlights

### 8.1 Advanced Features

✅ **Multi-step Forms** with state persistence  
✅ **Real-time Tracking** for bookings and deliveries  
✅ **Dynamic Pricing** with Redux integration  
✅ **File Upload** for documents and images  
✅ **Rich Text Editor** for descriptions  
✅ **Map Integration** for location services  
✅ **Payment Gateway** integration  
✅ **Review & Rating** system  
✅ **Complaint Management** workflow  
✅ **Return & Refund** processing  
✅ **Insurance Claims** management  
✅ **Invoice Generation** and download  

### 8.2 User Experience

✅ **Responsive Design** - Mobile, tablet, desktop  
✅ **Smooth Animations** with Framer Motion  
✅ **Loading States** and skeletons  
✅ **Error Handling** with user-friendly messages  
✅ **Form Validation** with instant feedback  
✅ **Accessibility** considerations  
✅ **SEO Optimization** with Next.js metadata  

### 8.3 Developer Experience

✅ **TypeScript** for type safety  
✅ **Component Modularity** for reusability  
✅ **Code Splitting** for performance  
✅ **Environment Variables** for configuration  
✅ **ESLint** for code quality  
✅ **Git Version Control**  

---

## 9. Recent Development Work

### Latest Refactoring (December 20, 2025)

**VendorSidebar Component Separation:**
- Extracted accordion logic into `NavItem` component
- Created `SubMenuItem` for nested navigation
- Separated `SidebarHeader` and `UserProfile` components
- Moved navigation data to `navItems.ts` configuration
- Improved code maintainability and reusability

**Benefits:**
- Better separation of concerns
- Easier to test individual components
- Simplified main sidebar component
- Improved code readability

---

## 10. Asset Management

### Public Assets

**Images:**
- Workshop photos
- Vehicle images
- Logo and branding
- Promotional banners

**SVGs (47+ icons):**
- Service icons
- Feature icons
- UI icons
- Navigation icons

---

## 11. Development Statistics

| Metric | Count |
|--------|-------|
| **Total Pages** | 84+ |
| **Components** | 218+ |
| **Redux Slices** | 17 |
| **Schemas** | 17+ |
| **Constants Files** | 10 |
| **Type Definitions** | 16+ |
| **SVG Icons** | 47+ |
| **Custom Hooks** | 8 |

---

## 12. Technical Achievements

### Performance Optimizations
- Next.js App Router for optimal routing
- Image optimization with Next.js Image
- Code splitting and lazy loading
- Redux state persistence
- Efficient re-rendering with React 19

### Code Quality
- TypeScript for type safety
- Zod for runtime validation
- ESLint for code standards
- Component-based architecture
- Separation of concerns

### Scalability
- Modular component structure
- Centralized state management
- Reusable utility functions
- Configuration-driven features
- API service layer

---

## 13. Future Development Opportunities

### Potential Enhancements
- Real-time notifications with WebSockets
- Progressive Web App (PWA) features
- Advanced analytics dashboard
- AI-powered service recommendations
- Multi-language support
- Dark mode theme
- Mobile app development
- API documentation
- Unit and integration testing
- Performance monitoring

---

## Conclusion

The DriveMech web application represents a comprehensive, production-ready automotive solutions platform. The development demonstrates:

- **Modern Architecture** with Next.js 16 and React 19
- **Robust State Management** with Redux Toolkit
- **Type Safety** with TypeScript
- **Form Validation** with Zod
- **Responsive Design** with Tailwind CSS
- **Modular Components** for maintainability
- **Dual User Flows** for customers and vendors
- **Complete Feature Set** from booking to payment to tracking

The application is well-structured, scalable, and ready for production deployment with comprehensive features covering the entire automotive service ecosystem.

---

**Report Generated:** December 20, 2025  
**Project Status:** Active Development  
**Version:** 0.1.0
