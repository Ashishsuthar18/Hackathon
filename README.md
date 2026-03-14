# CoreInventory – Inventory Management System

CoreInventory is a modular Inventory Management System developed as a hackathon prototype to streamline product and stock management operations within an organization. The system replaces manual tracking methods such as spreadsheets or registers with a centralized digital interface that provides real-time visibility into inventory.

The application enables users to manage products, track stock levels, and monitor inventory operations through a structured dashboard.

---

## Project Overview

The system is designed to simulate a real-world warehouse inventory workflow. Users can create products, manage stock inflow and outflow, and monitor inventory statistics through a dashboard.

The application demonstrates the core concepts of an inventory system including product management, stock tracking, and operational visibility.

---

## Key Features

Product Management

* Create and manage product records
* Store product details including name, SKU, category, unit, and stock quantity
* Display products in a structured table

Inventory Dashboard

* Display total number of products
* Display total available stock
* Identify products with low stock levels

Stock Operations

* Add stock when goods are received
* Reduce stock when products are dispatched
* Automatically update inventory values

Low Stock Monitoring

* Identify products with stock levels below the threshold

Client-side Data Storage

* LocalStorage is used for quick prototype data storage during demonstration

---

## Technology Stack

Frontend
HTML
CSS
JavaScript

Backend
Node.js
Express.js

Database (Planned Integration)
MongoDB

---

## System Architecture

The system follows a simple web application architecture:

Frontend Interface
Handles user interaction, product management interface, and dashboard visualization.

Backend Server
Provides API routes for product and inventory operations.

Database Layer
Stores persistent product and inventory data (MongoDB integration planned).

---

## Project Structure

```
IMS-Hackathon
│
├── backend
│   ├── models
│   │   ├── Product.js
│   │   └── User.js
│   │
│   ├── routes
│   │   ├── auth.js
│   │   ├── products.js
│   │   └── stock.js
│   │
│   ├── middleware
│   │   └── auth.js
│   │
│   ├── server.js
│   └── package.json
│
├── frontend
│   ├── css
│   │   └── style.css
│   │
│   ├── js
│   │   └── dashboard.js
│   │
│   ├── login.html
│   └── dashboard.html
│
└── README.md
```

---

## Installation and Setup

1. Clone the repository

```
git clone https://github.com/Ashishsuthar18/hackathon.git
```

2. Navigate to the backend directory

```
cd backend
```

3. Install dependencies

```
npm install
```

4. Start the server

```
npm start
```

5. Open the frontend interface

Open the following file in a browser:

frontend/login.html

## Demo Credentials

Username = admin
```
Password = admin123
```

## Future Enhancements

The current system is a prototype and can be extended with the following features:

* Multi-warehouse inventory management
* Real-time database integration
* Role-based authentication and authorization
* Inventory analytics dashboard
* Product search and filtering
* Automated reorder alerts
* Barcode scanning integration
