const express = require('express');
const router = express.Router();

const {
  createProduct,
  deleteProduct,
  updateProduct,
  getUpcomingExpiries,
} = require('../controllers/products');

const upload = require('../middlewares/multer'); 
// const loggedinUsersOnly = require('../middlewares/loggedinUsersOnly');
router.post(
  '/',
  upload.single('image'),
  (req, res, next) => {
    console.log("yes it reached to route");
    next();
  },
  createProduct
);

router.get('/upcoming',(req,res,next)=>{console.log("came inside router"); next()}, getUpcomingExpiries);
router.put('/:id', upload.single('image'), updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
