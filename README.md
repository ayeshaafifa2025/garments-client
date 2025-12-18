
Project Name: StitchFlow Tracker

Purpose:StitchFlow Tracker is a web-based platform designed for garment factories to manage orders and production efficiently. It allows buyers to place orders, managers to add and manage products, and admins to oversee operations. The system ensures transparency, smooth workflow, and real-time tracking from order placement to delivery, helping factories deliver high-quality products on time.

Live URL : https://admirable-marigold-63f073.netlify.app



Key Features:
1. Home Page

Includes a navigation bar with logo, main links, user avatar, and login/logout button.

Hero banner with a visually appealing image, descriptive text, and call-to-action button.

“Our Products” section displaying 6 products dynamically fetched from the database.

How It Works section describing the step-by-step workflow of the system.

Customer Feedback carousel showcasing user reviews.

Two extra sections highlighting system features or production benefits.

Footer with project description, quick links, and social media icons.

2. Authentication System

Firebase-based authentication for secure login and registration.

Public routes accessible without login: Home, About, Contact, Terms, Privacy.

Protected routes: Dashboard, Product Details, Booking/Order Form.

Users trying to access private routes without login are redirected to the Login page.

3. User Login & Registration

Login Page

Email and password fields with validation.

Google login integration.

Displays error messages for invalid credentials.

Register Page

Fields: Name, Email, PhotoURL, Role (Buyer/Manager), Status, Password.

Password validation: minimum 6 characters, at least one uppercase and lowercase letter.

Displays toast/sweetalert notifications upon success or error.

4. Dashboard & Role-Based Access

Admin Dashboard

Manage Users: Approve/suspend managers and buyers, view suspend reasons.

All Products: See all products in the system, update product info, toggle visibility on Home Page.

All Orders: View all orders, filter by status, and view order details.

Manager Dashboard

Add Product: Create products with name, description, category, price, images, demo video, MOQ, payment options.

Manage Products: Update or delete products created by the manager.

Pending Orders: Approve or reject pending orders.

Approved Orders: Add tracking updates for approved orders.

My Profile: View own profile info.

Buyer Dashboard

My Orders: View only orders placed by the logged-in user.

Track Order: View a timeline of order progress.

My Profile: Update personal info.

5. Product Details & Booking

Product details page shows image/video, description, category, price, available quantity, and minimum order.

Booking form auto-fills user info for logged-in users.

Order price calculated automatically based on quantity.

Online or cash payment handled according to manager’s selection.

6. Dynamic & Interactive Features

Customer feedback carousel using Swiper.

Dynamic titles for each page with React Helmet.

Toast notifications for success and error messages.

Loading spinner during API calls.

Responsive design for mobile, tablet, and desktop.

Theme toggle for light/dark mode.

Error page for invalid routes.

7. Technology Stack

Frontend: React.js, React Router, Tailwind CSS, DaisyUI

Authentication: Firebase Authentication

Forms & Validation: React Hook Form

Icons & Animations: React Icons, Swiper

Notifications: React Toastify, SweetAlert2

Charts & Analytics: Recharts

HTTP Requests: Axios, React Query

Build Tool: Vite

NPM Packages Used

firebase: For authentication, database, and profile management.

react-router: For client-side routing and role-based protected routes.

tailwindcss: For responsive utility-first styling.

daisyui: For ready-to-use UI components.

react-icons: To use vector icons across the app.

react-toastify: To show elegant pop-up notifications for success/error.

sweetalert2: For confirmation dialogs and alerts.

swiper: To implement dynamic sliders for feedback or product sections.

react-hook-form: For form validation and submission handling.

recharts: To display charts in manager/admin dashboards.

axios & react-query: For API calls and state management of server data.

