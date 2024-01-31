![Bakbutiken Logo](https://i.ibb.co/D7tqwZf/bakbutiken.png)

## Table of Contents

1. [About](#about)
2. [Getting Started](#getting-started)
   - [Dependencies](#dependencies)
   - [Frontend](#frontend)
      - [Minimum Requirements](#minimum-requirements-for-frontend)
      - [Browsers Compatibility](#browsers-compatibility-for-frontend)
   - [Backend](#backend)
      - [Minimum Requirements](#minimum-requirements-for-backend)
      - [Other Considerations](#other-considerations-for-backend)
   - [Installation](#installation)
      - [Installation Steps](#installation-steps)
3. [Usage](#usage)
4. [Features](#features)
   - [Homepage](#homepage)
   - [All Products Page](#all-products-page)
   - [Single Product Page](#single-product-page)
   - [Cart Functionality](#cart-functionality)
   - [Cart Page](#cart-page)
   - [Checkout Page](#checkout-page)
   - [Success Page](#success-page)
   - [Admin Page](#admin-page)

## About

Bakbutiken is an e-commerce store providing a different variety of baking supplies to customers.
The project is a culmination of my journey in full-stack development, presented as a final exam e-commerce project. This venture seamlessly integrates MongoDB Atlas to manage products, orders, and user authentication. On the backend, Node.js and Express join forces to craft robust endpoints, while the frontend comes to life with the dynamic capabilities of React.

## Getting Started

# Dependencies

# Frontend

- React: ^18.2.0
- React Router DOM: ^6.21.1
- Axios: ^1.6.3
- Bootstrap: ^5.3.2
- Date-fns: ^3.3.1
- Lottie-web: ^5.12.2
- React Bootstrap: ^2.10.0
- React Hook Form: ^7.49.3
- Sass: ^1.69.6
- Web Vitals: ^2.1.4

## Minimum Requirements:

- Node.js: The JavaScript runtime

## Browsers Compatibility:

These settings define the supported browser versions for both production and development environments.

Production:
Greater than 0.2%
Not dead
Not Opera Mini all

Development:
Last 1 Chrome version
Last 1 Firefox version
Last 1 Safari version

# Backend

- Bcrypt: ^5.1.1
- CORS: ^2.8.5
- Dotenv: ^16.3.1
- Express: ^4.18.2
- Express Session: ^1.17.3
- MongoDB: ^6.3.0
- Node-fetch: ^3.3.2

## Minimum Requirements:

- Node.js: The JavaScript runtime

# Other Considerations:

Database: The MongoDB server should be accessible

### Installation

# Installation steps

1. Clone the repository: https://github.com/ZoeMesaros/bakbutiken

2. Place the provided `config.env` file in the root of the backend folder.

3. Open a split terminal and navigate to each folder:

4. Run npm install in both folders

5. Run both folders to start the server side and the client.

# Usage

To access the admin panel, please follow these steps:

1. Navigate to the login page at localhost:3000/login.
2. Use the following credentials:
   Username: admin
   Password: admin
3. Once successfully logged in, proceed to the admin panel through the /admin route.

## Features:

- **Homepage:** Showcase newly added items and best sellers.

- **All Products Page:** Display all products and allow users to browse based on category.

- **Single Product Page:** View detailed information about a specific product.

- **Cart Functionality:** Easily manage the shopping cart by adding, increasing, or decreasing product quantities.

- **Cart Page:** Display all items in the cart, including a summary for calculating the total price based on the added products.

- **Checkout Page:** Streamlined process for making a purchase, featuring a total cart summary, input fields for personal information, and various payment methods.

- **Success Page:** Confirmation page displayed upon successful completion of a purchase.

- **Admin Page:** Dedicated area for administrators to view and manage orders.
