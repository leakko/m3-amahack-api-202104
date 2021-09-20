const Product = require("../models/Product.model");
const Review = require("../models/Review.model");
const createError = require("http-errors");

module.exports.listProducts = (req, res, next) => {
  Product.find()
    .then((products) => res.json(products))
    .catch(next);
};

module.exports.productDetail = (req, res, next) => {
  Product.findById(req.params.id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
        model: "User",
      },
    })
    .then((product) => {
      if (!product) {
        next(createError(404));
      } else {
        res.json(product);
      }
    })
    .catch(next);
};

module.exports.addReview = (req, res, next) => {
  const review = {
    ...req.body,
    author: req.currentUser,
    product: req.params.id,
  };
  Review.create(review)
    .then((review) => {
      return review.populate("author");
    })
    .then((review) => {
      res.json(review);
    })
    .catch(next);
};
