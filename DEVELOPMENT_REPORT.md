# DriveMech Web Application - Development Report

**Project:** DriveMech - Automotive Solutions Platform  
**Technology Stack:** Next.js 16, React 19, TypeScript, Redux Toolkit, Tailwind CSS  
**Report Date:** December 29, 2025

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
│   ├── app/                    # Next.js App Router (86+ pages)
│   ├── components/             # 235+ reusable components
│   ├── store/                  # Redux state management (20 slices)
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

- [Login](<file:///c:/Users/Lenovo/OneDrive/Documents/Projects/drivemech-webapplication/src/app/(drivemech)/auth/customer/login/page.tsx>)
- [Registration](<file:///c:/Users/Lenovo/OneDrive/Documents/Projects/drivemech-webapplication/src/app/(drivemech)/auth/customer/register/page.tsx>)
- [Email Verification](<file:///c:/Users/Lenovo/OneDrive/Documents/Projects/drivemech-webapplication/src/app/(drivemech)/auth/customer/verify/page.tsx>)
- [MPIN Creation & Management](<file:///c:/Users/Lenovo/OneDrive/Documents/Projects/drivemech-webapplication/src/app/(drivemech)/auth/customer/mpin/page.tsx>)
- [Forgot MPIN with Verification](<file:///c:/Users/Lenovo/OneDrive/Documents/Projects/drivemech-webapplication/src/app/(drivemech)/auth/customer/forgot-mpin/page.tsx>)
- [Account Confirmation](<file:///c:/Users/Lenovo/OneDrive/Documents/Projects/drivemech-webapplication/src/app/(drivemech)/auth/customer/confirm/page.tsx>)

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

- [Select Service Page](<file:///c:/Users/Lenovo/OneDrive/Documents/Projects/drivemech-webapplication/src/app/(drivemech)/customer/select-service/page.tsx>)
- Vehicle search with make, model, state, rego, postcode
- Service category selection (10+ categories)
- Add-on services (AC, Glass, Suspension, Battery, Spark Plugs, Roadside Assistance)
- Date & time slot selection
- Redux-powered form state management

**2. Workshop Selection**

- [Workshop Page](<file:///c:/Users/Lenovo/OneDrive/Documents/Projects/drivemech-webapplication/src/app/(drivemech)/customer/workshop/page.tsx>)
- Workshop cards with ratings, pricing, and features
- Filter by location, price, rating
- Workshop comparison
- Mechanic profiles

**3. Booking Details**

- [Booking Details Page](<file:///c:/Users/Lenovo/OneDrive/Documents/Projects/drivemech-webapplication/src/app/(drivemech)/customer/booking-details/page.tsx>)
- Service summary
- Workshop information
- Pricing breakdown
- Special instructions

**4. Payment Processing**

- [Payment Process Page](<file:///c:/Users/Lenovo/OneDrive/Documents/Projects/drivemech-webapplication/src/app/(drivemech)/customer/payment-process/page.tsx>)
- Multiple payment methods (Credit/Debit Card, UPI, Net Banking, Wallet)
- Dynamic schema validation based on payment method
- Secure payment integration
- [Booking Success Page](<file:///c:/Users/Lenovo/OneDrive/Documents/Projects/drivemech-webapplication/src/app/(drivemech)/customer/booking-success/page.tsx>)

**5. Order Tracking**

- [Track Booking Page](<file:///c:/Users/Lenovo/OneDrive/Documents/Projects/drivemech-webapplication/src/app/(drivemech)/customer/track-booking/page.tsx>)
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

- [Vehicles Page](<file:///c:/Users/Lenovo/OneDrive/Documents/Projects/drivemech-webapplication/src/app/(drivemech)/customer/profile/my-vehicles/page.tsx>)
- Add/Edit/Delete vehicles
- Set default vehicle
- Vehicle card display
- Service history per vehicle

**My Address:**

- [Address Page](<file:///c:/Users/Lenovo/OneDrive/Documents/Projects/drivemech-webapplication/src/app/(drivemech)/customer/profile/my-address/page.tsx>)
- Add/Edit/Delete addresses
- Set default address
- Address form with validation

**My Payments:**

- [Payments Page](<file:///c:/Users/Lenovo/OneDrive/Documents/Projects/drivemech-webapplication/src/app/(drivemech)/customer/profile/my-payments/page.tsx>)
- Payment history
- Transaction details
- Payment methods management

**My Settings:**

- [Settings Page](<file:///c:/Users/Lenovo/OneDrive/Documents/Projects/drivemech-webapplication/src/app/(drivemech)/customer/profile/my-settings/page.tsx>)
- Account settings
- Notification preferences
- Privacy settings
- Security options

#### Spare Parts Module

- [Spare Parts Checkout](<file:///c:/Users/Lenovo/OneDrive/Documents/Projects/drivemech-webapplication/src/app/(drivemech)/spare-parts/checkout/page.tsx>)
- Multi-tab checkout (Address, Review, Payment)
- Cart management with Redux
- Address form with Zod validation
- Payment processing
- [Checkout Success](<file:///c:/Users/Lenovo/OneDrive/Documents/Projects/drivemech-webapplication/src/app/(drivemech)/spare-parts/checkout/success/page.tsx>)

#### Towing Services

- Emergency towing request
- Location-based service
- Real-time driver tracking
- Estimated arrival time

#### Location & Maps

- [Location Selection](<file:///c:/Users/Lenovo/OneDrive/Documents/Projects/drivemech-webapplication/src/app/(drivemech)/location/page.tsx>)
- [Countries Page](<file:///c:/Users/Lenovo/OneDrive/Documents/Projects/drivemech-webapplication/src/app/(drivemech)/countries/page.tsx>) with states display
- [Maps Integration](<file:///c:/Users/Lenovo/OneDrive/Documents/Projects/drivemech-webapplication/src/app/(drivemech)/maps/page.tsx>)
- Interactive map with Leaflet/MapLibre
- City search functionality
- Verified garages display

---

### 3.3 Vendor Module

#### Vendor Dashboard

- [Dashboard Page](<file:///c:/Users/Lenovo/OneDrive/Documents/Projects/drivemech-webapplication/src/app/(drivemech)/vendor/dashboard/page.tsx>)
- Key metrics and analytics
- Recent bookings
- Revenue overview
- Quick actions

#### Operations Management

**Booking Diary:**

- Calendar view of bookings
- Appointment scheduling
- Status management
- **NEW**: Clickable booking cards with edit/delete functionality
- **NEW**: Redux-integrated state management with offline support

**Transaction Center:**

- **NEW**: Financial transactions management
- **NEW**: Payment tracking and filtering
- Invoice generation

**Spare Parts Management:**

- [Spare Parts Orders Page](<file:///c:/Users/Lenovo/OneDrive/Documents/Projects/drivemech-webapplication/src/app/(drivemech)/vendor/operations/spare-parts/page.tsx>)
- **NEW**: Complete orders dashboard with stats and status filters
- **NEW**: Detailed order view (`[id]/page.tsx`) with customer info, items, timeline, and stock alerts
- **NEW**: Dynamic action buttons based on order status (Start Packing, Mark as Ready, etc.)
- Inventory tracking & Order fulfillment

**Towing Services:**

- [Towing Services Page](<file:///c:/Users/Lenovo/OneDrive/Documents/Projects/drivemech-webapplication/src/app/(drivemech)/vendor/operations/towing-services/page.tsx>)
- Towing request management
- Driver assignment

**Inspections:**

- [Inspections Page](<file:///c:/Users/Lenovo/OneDrive/Documents/Projects/drivemech-webapplication/src/app/(drivemech)/vendor/operations/inspections/page.tsx>)
- Vehicle inspection forms
- Inspection reports

#### Management

**Customers:**

- [Customers Page](<file:///c:/Users/Lenovo/OneDrive/Documents/Projects/drivemech-webapplication/src/app/(drivemech)/vendor/management/customers/page.tsx>)
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

- [Loaner Cars Page](<file:///c:/Users/Lenovo/OneDrive/Documents/Projects/drivemech-webapplication/src/app/(drivemech)/vendor/inventory/loaner-cars/page.tsx>)
- Fleet management
- Availability tracking
- Booking system

#### Workshop Management

- [Manage Workshop Page](<file:///c:/Users/Lenovo/OneDrive/Documents/Projects/drivemech-webapplication/src/app/(drivemech)/vendor/manage-workshop/page.tsx>)
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

- [System Page](<file:///c:/Users/Lenovo/OneDrive/Documents/Projects/drivemech-webapplication/src/app/(drivemech)/vendor/configurations/system/page.tsx>)
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

- [Pricing Page](<file:///c:/Users/Lenovo/OneDrive/Documents/Projects/drivemech-webapplication/src/app/(drivemech)/vendor/pricing/page.tsx>)
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

(Sections 4.1 to 4.3 remain mostly unchanged, updated counts in Summary)

---

## 5. State Management (Redux)

### Redux Slices (20 Total)

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
18. **bookingDiary** - (New) Vendor booking calendar management
19. **configuration** - (New) System configurations and settings
20. **transactionCenter** - (New) Financial transaction operations

**Features:**

- Redux Persist for state persistence
- Type-safe actions and reducers
- Middleware for async operations
- Centralized state management
- **New**: Modular folder structure for type definitions

---

## 6. Form Validation & Schemas

(Sections 6 to 8 remain unchanged)

---

## 9. Recent Development Work

### UI Refinements & TypeScript Fixes (December 29, 2025)

**Critical Bug Fixes:**

- **Button Component TypeScript Error**: Fixed a critical TypeScript error in [`Button.tsx`](file:///c:/Users/Lenovo/OneDrive/Documents/Projects/drivemech-webapplication/src/components/ui/Button.tsx) where the `primary-blue` variant key was causing an arithmetic operation error. The hyphenated key needed to be quoted (`'primary-blue'`) to be a valid JavaScript object property.
  - **Error**: "The left-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type"
  - **Solution**: Wrapped the `primary-blue` key in quotes to make it a valid object key
  - **Impact**: Resolved TypeScript compilation errors across the entire application

**Settings Page UI Improvements:**

- **Settings Layout Refactoring**: Updated [`SettingsLayout.tsx`](<file:///c:/Users/Lenovo/OneDrive/Documents/Projects/drivemech-webapplication/src/app/(drivemech)/vendor/configurations/settings/SettingsLayout.tsx>) to use the standard `Tabs` component instead of `FilledTabs` for consistency
  - Removed unused imports (`FilledTabs`, `VendorCommonHeader`, `ArrowLeft`, `Search`, `Bell`, `Globe`)
  - Simplified the layout by removing the header section
  - Updated padding from `px-4` to `px-2` for a more compact design

- **My Profile Tab Enhancement**: Significantly improved the UI of [`MyProfileTab.tsx`](<file:///c:/Users/Lenovo/OneDrive/Documents/Projects/drivemech-webapplication/src/app/(drivemech)/vendor/configurations/settings/tabs/MyProfileTab.tsx>)
  - **Edit Button Styling**: Changed the "Edit" button variant from `primary` to `success` with a pencil icon for better visual clarity
  - **Account Information Layout**: Restructured the Account Information section to display items in a 3-column grid layout
    - Changed from vertical stacking to horizontal label-value pairs
    - Implemented `grid grid-cols-1 md:grid-cols-3 gap-6` for responsive 3-column layout
    - Each item displays label and value side-by-side with `flex items-center gap-2`
    - Ensures equal width distribution across all items
  - **Visual Consistency**: Improved spacing and alignment throughout the profile section

**Integrations Page Update:**

- **Padding Adjustment**: Updated [`integrations/page.tsx`](<file:///c:/Users/Lenovo/OneDrive/Documents/Projects/drivemech-webapplication/src/app/(drivemech)/vendor/configurations/integrations/page.tsx>) by removing default padding (`p-8` → `p-0`) for better layout control

**Technical Improvements:**

- Enhanced type safety by fixing object key syntax errors
- Improved component reusability by standardizing tab components
- Better responsive design with grid-based layouts
- Cleaner code structure with removed unused dependencies

### Spare Parts, Bug Fixes & Optimization (December 25, 2025)

**Major Feature: Spare Parts Orders Module**

- **Complete Dashboard**: Implemented full orders dashboard with statistics (Total Orders, Pending, Revenue), integrated search/filters, and a responsive orders table.
- **Detailed Order View**: Created a comprehensive detail view (`SparePartsOrderDetails`) featuring customer info, order items with quantity controls, stock alerts, visual timeline, and status-based dynamic action buttons.
- **Dynamic Routing**: Implemented Next.js dynamic routing (`[id]/page.tsx`) for accessing individual order details.
- **Schema Validation**: Defined robust Zod schemas for orders, items, timeline events, and stock alerts to ensure data integrity.

**System-Wide Bug Fixes & Optimization:**

- **Build Stabilization**: Resolved multiple critical TypeScript errors across the codebase to achieve a successful production build.
- **Form Date Handling**: Fixed date processing in `SupplierPartOrdersSection` and `NewInspectionForm` by correctly bridging Date objects with string-based schema requirements.
- **Schema Improvements**: Refined `inspection.schema.ts` by correcting boolean/array field definitions (removing problematic defaults) to satisfy Zod resolver types.
- **Hydration Error Resolution**: Fixed a "button inside button" hydration error in the `VehiclesPage` by restructuring navigation elements to use proper semantic HTML (divs with click handlers).
- **Production Build**: Verified application stability by successfully running a full Next.js production build (`npm run build`).

### Booking Diary & Redux Architecture (December 21, 2025)

**Operational Improvements:**

- **Booking Calendar**: Fully integrated with Redux for state management (`bookingDiarySlice`).
- **Offline Capability**: API calls temporarily mocked/commented for standalone development capability.
- **Enhanced UI**: Fixed week view scrolling, date serialization, and initial loading states.
- **Edit Functionality**: Added creating, editing, and deleting bookings directly from the calendar interface with `EditBookingDialog`.

**Architecture Restructuring:**

- **Redux Slice Organization**: Restructured vendor slices into a modular hierarchy (`operations`, `configurations`, `management`).
- **Type Definitions**: Reorganized generic types into feature-specific folders (`src/types/vendor/operations`, `src/types/vendor/configurations`).
- **New Slices**:
  - `bookingDiarySlice`: Managing calendar events (CRUD).
  - `configurationSlice`: Managing system settings, features, and integrations.
  - `transactionCenterSlice`: Managing financial transactions, invoicing, and payments.

**Transaction Center Foundation:**

- Created comprehensive types for transactions, filtering, and reporting.
- Implemented `transactionCenterSlice` with actions for filtering, pagination, and summary generation.
- Prepared for UI implementation of the Transaction list and details views.

### Latest Refactoring (December 20, 2025)

(Previous refactoring details retained)

---

## 11. Development Statistics

| Metric                | Count |
| --------------------- | ----- |
| **Total Pages**       | 127   |
| **Total Layouts**     | 10    |
| **Total App Files**   | 194   |
| **Components (TSX)**  | 456   |
| **Components (TS)**   | 5     |
| **Total Components**  | 461   |
| **Redux Store Files** | 23    |
| **Schemas**           | 33    |
| **Type Definitions**  | 23    |
| **SVG Icons**         | 47    |
| **Custom Hooks**      | 7     |

---

## 13. Future Development Opportunities

### Immediate Next Steps

- Implement UI for Transaction Center (List, Details, Filters).
- Develop Customer Management slice and interface.
- Integrate Workshop Configurations UI with the new `configurationSlice`.
- **Backend Integration**: Connect Spare Parts module to actual API endpoints.

---

## Conclusion

**Report Generated:** December 29, 2025
**Project Status:** Active Development
**Version:** 0.1.3
