# Pitara – Curated Craft & Gift E-Commerce Platform

**Pitara** is a full-stack e-commerce web application built to showcase and sell curated craft and gift items. It supports seamless shopping for users and provides powerful admin tools for managing products, categories, orders, and users.

---

## Features

### User Side

- **Browse Products** – Explore curated handmade products by category or all at once.
- **Search & Filter** – Find items by name, category, or keywords.
- **Cart Management** – Add, update, or remove items from the cart.
- **Wishlist** – Save your favorite products for later.
- **Checkout** – Simulate secure purchase flow.
- **Order History** – View past orders and details.
- **Authentication** – Register & login securely.

### Admin Side

- **Dashboard View** – Overview of products, users, and orders.
- **Manage Products** – Add, edit (with image previews), delete products with multiple image uploads.
- **Manage Categories** – Add/edit/delete categories with image upload support.
- **Manage Users** – View, edit, delete registered users.
- **Manage Admins** – Add, edit, delete admins with roles (Product Manager, Site Manager).
- **View Orders** – Track all orders placed by users.
- **Image Uploads** – Images are handled via `multer` and stored in `server/uploads`.

---

## Tech Stack

| Layer       | Technologies |
|-------------|--------------|
| Frontend    | React.js, Axios, React Router, CSS Modules |
| Backend     | Node.js, Express.js, Multer |
| Database    | MongoDB (Mongoose ODM) |
| Auth        | Bcrypt |
| Tools       | Vite, Postman, MongoDB Atlas |

---

## Getting Started

### 1. Clone the Repo

git clone https://github.com/your-username/pitara-ecommerce.git  
cd Pitara-ECommerce

### 2. Create .env in the server/ folder with MongoDB URI and PORT
PORT=5000  
MONGODB_URI=mongodb+srv://<your-cluster>

### 3. Set Up the Backend

cd server  
npm install  
npm run dev

### 4. Set Up the Frontend

cd client  
npm install  
npm run dev


## Future Enhancements

- Stripe/PayPal payment integration
- Product reviews and ratings
