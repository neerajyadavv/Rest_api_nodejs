const mongoose = require("mongoose");
const creatError = require("http-errors");
const Product = require("../Models/product.model");
module.exports = {
  getAllProducts: async (req, res, next) => {
    try {
      const result = await Product.find({}, { __v: 0 });
      res.send(result);
    } catch (error) {
      console.log(error.message);
    }
  },
  createNewProduct: async (req, res, next) => {
    try {
      const product = new Product(req.body);
      const result = await product.save();
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error.name === "ValidationError") {
        next(createError(422, error.message));
        return;
      }
      next(error);
    }

    //   const product = new Product({
    //     name: req.body.name,
    //     price: req.body.price,
    //   });
    //   product
    //     .save()
    //     .then((result) => {
    //       console.log(result);
    //       res.send(result);
    //     })
    //     .catch((err) => {
    //       console.log(err.message);
    //     });
  },
  findProductById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const product = await Product.findById(id);
      if (!product) {
        throw createError(404, "product does not exist");
      }
      res.send(product);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, "invalid product id"));
        return;
      }
      next(error);
    }
  },
  updateAProduct: async (req, res, next) => {
    const id = req.params.id;
    try {
      const update = req.body;
      const options = { new: true };
      const result = await Product.findByIdAndUpdate(id, update, options);
      if (!result) {
        throw createError(404, "product does not exist");
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, "invalid product ID"));
        return;
      }
      next(error);
    }
  },

  deleteAProduct: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await Product.findByIdAndDelete(id);
      if (!result) {
        throw createError(404, "product does not exist");
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, "invalid product id"));
        return;
      }
      next(error);
    }
  },
};
