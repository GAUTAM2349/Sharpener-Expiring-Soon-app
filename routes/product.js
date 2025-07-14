const express = require('express');
const router = express.Router();

const {
  createProduct,
  deleteProduct,
  updateProduct,
  getUpcomingExpiries,
} = require('../controllers/products');


router.post('/', createProduct);

router.get('/upcoming', getUpcomingExpiries);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
