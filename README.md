# e-Commerce Store - Admin Dashboard 🛒⚙

Admin Dashboard for an e-Commerce Store for electronic products 🎧📱💻.

## Description

With this app the administrator of the e-Commerce can manage the products with add, edit and remove options.

There is a category panel associated with properties of every product such as colour, size, storage capacity, etc.

**User feedback** has been implemented, such as success notifications or error dialogs, helps provide a better user experience by informing the admin about the outcome of their actions and ensuring they are aware of any errors or successful updates.

The web design aims to provide an intuitive and straightforward user experience. The color palette and text size are designed for intensive use, specifically tailored for an administrator. Additionally, the design is **responsive**, allowing it to be used on various devices.

<img src="https://i.ibb.co/VVrhmdp/ecommerce-admin-fullsize.jpg" width="500"> <img src="https://i.ibb.co/K0Hp9y4/ecommerce-admin-smallsize.jpg" width="194">

_Responsive design_

## Features

### Authentication

- NextAuth authentication with Google Provider.

### Dashboard

- Home page with user information.

### Products

- List of products.
- Add, edit and remove product options.

#### Add/Edit product

- Form to submit product name, category, properties, images, description and price.
- Sortable images list.
- User feedback with messages, modals and activity indicators.

  ![Sortable images](https://i.ibb.co/M7W081Z/ecommer-admin-sortableimages.gif "Sortable images")

### Categories

- Page to list and manage product categories and properties.

  ![Categories management](https://i.ibb.co/wKsFnVy/ecommerce-admin-categories-management.gif "Categories management")

## Tech

- ReactJS
- Next.js
- Tailwind
- NextAuth
- MongoDB
- Firebase

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/products](http://localhost:3000/api/products) and [http://localhost:3000/api/categories](http://localhost:3000/api/categories).

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

_Access to the api may be restricted._
