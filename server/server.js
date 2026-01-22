import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { products, reviews } from './products.js';

const app = express();
const port = 3000;

app
  .use(cookieParser())
  .use(bodyParser.json())
  .listen(port, () => {
    console.log(`Listening on port ${port}`);
  });

// Auth middleware - verifies Bearer token exists
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const bearerPattern = /^Bearer (.+)$/;
  if (authHeader && bearerPattern.test(authHeader) && authHeader.match(bearerPattern)[1]) {
    // Token exists, but not validated.
    // For this demo, we are just checking existence 
    // proceed to next middleware/route
    return next();
  }

  return res.status(401).json({ error: 'Unauthorized: Bearer token required' });
};

app.get('/api/xsrfEndpoint', (req, res, next) => {
  const csrfTokenSecret = 'top secret';
  res.cookie('XSRF-TOKEN', csrfTokenSecret, { httpOnly: false, sameSite: 'strict' });
  res.json({});
});

app.route('/api/products')
  .get((req, res) => {
    const query = req.query.q;

    let filteredProducts = products;

    // Filter products if query parameter is provided
    if (query) {
      filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Add the first review for each product
    const productsWithReview = filteredProducts.map(product => {
      const firstReview = reviews.find(r => r.productId === product.id);
      return {
        ...product,
        reviews: [firstReview ? {
          text: firstReview.review,
          id: firstReview.reviewId,
          user: firstReview.user
        } : null]
      };
    });

    res.json({ items: productsWithReview });
  });

app.route('/api/products/:id')
  .get((req, res) => {
    const productId = parseInt(req.params.id);
    const product = products.find(p => p.id === productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    return res.send(product);
  });

app.route('/api/products/:id/reviews')
  .get((req, res) => {
    const productId = parseInt(req.params.id);
    const product = products.find(p => p.id === productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const productReviews = reviews
      .filter(r => r.productId === productId)
      .map(r => ({ id: r.reviewId, user: r.user, text: r.review, video: r.video }));

    return res.send({ productId, reviews: productReviews });
  })
  .post(authMiddleware, (req, res) => {
    // should verify the CSRF Token cookie!
    const productId = parseInt(req.params.id);
    const product = products.find(p => p.id === productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const { review, user, video } = req.body;
    if (!review) {
      return res.status(400).json({ error: 'Review text is required' });
    }
    if (!user) {
      return res.status(400).json({ error: 'User name is required' });
    }

    // Find the next available review ID for this product
    const nextReviewId = reviews.filter(r => r.productId === productId).length + 1;

    const reviewObject = {
      productId: productId,
      reviewId: nextReviewId,
      user,
      review,
      video
    };
    reviews.push(reviewObject);

    return res.json({ id: reviewObject.reviewId, user: reviewObject.user, text: reviewObject.review, video: reviewObject.video });
  });
