const express = require("express");

const router = express.Router();

const ProductController = require("../controller/product.controller");

// getting a list of all projects

router.get("/", ProductController.getAllProducts);

// create a new product
router.post("/", ProductController.createNewProduct);
// getting a product by id
router.get("/:id", ProductController.findProductById);
// updating a product
router.patch("/:id", ProductController.updateAProduct);
// deleting a product
router.delete("/:id", ProductController.deleteAProduct);
module.exports = router;
