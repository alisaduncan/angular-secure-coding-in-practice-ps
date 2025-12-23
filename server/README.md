# Express Backend Server

Express API server for managing products and reviews for a bakery shop application.

## Installation

```bash
npm ci
```

## Running the Server

```bash
npm start        # Start the server
npm run dev      # Start with nodemon (auto-reload)
```

The server runs on `http://localhost:3000`.

## API Endpoints

### Products
- `GET /api/products` - Get all products (supports `?q=search` query parameter)
- `GET /api/products/:id` - Get product by ID

### Reviews
- `GET /api/products/:id/reviews` - Get reviews for a product
- `POST /api/products/:id/reviews` - Add a review (requires `review`, `user`, and optional `videoId` in request body)

### Security
- `GET /api/xsrfEndpoint` - Get XSRF token cookie

## Features

- Bearer token authentication middleware
- Product search functionality
- In-memory data storage for products and reviews
