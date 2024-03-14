const express = require('express')
const router = express.Router()
const Product = require('../models/product')
const Category = require('../models/category')
const getProduct = require('../middleware/getProduct')
const authenticationToken = require('../middleware/authenticationToken')

router.get('/', async (req, res) => {
  const products = await Product.aggregate([
    {
      $lookup: {
        from: 'Categories',
        localField: 'categoryId',
        foreignField: '_id',
        as: 'category',
      },
    },
    {
      $unwind: '$category',
    },
    {
      $project: {
        _id: 1,
        productName: 1,
        categoryId: 1,
        unitsInStock: 1,
        unitPrice: 1,
        categoryName: '$category.categoryName',
      },
    },
  ])
})

router.get('/:id', authenticationToken, getProduct, async (req, res) => {
  res.send(res.product)
})

router.post('/', authenticationToken, async (req, res) => {
  console.log(req.body.products)
  const product = new Product({
    productName: req.body.productName,
    description: req.body.description,
    categoryId: req.body.categoryId,
    unitsInStock: req.body.unitsInStock,
    unitPrice: req.body.unitPrice,
  })
  product
    .save()
    .then((data) => {
      res.json(data)
    })
    .catch((err) => res.json({ message: err }))
})

router.post('/bulk-insert', async (req, res) => {
  const products = req.body.products.map((prd) => ({
    productId: prd.productId,
    productName: prd.productName,
    description: prd.description,
    categoryId: prd.categoryId,
    unitsInStock: prd.unitsInStock,
    unitPrice: prd.unitPrice,
  }))

  Product.insertMany(products)
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json({ message: err }))
})

router.patch('/:id', authenticationToken, getProduct, async (req, res) => {
  if (req.body.productName != null) {
    res.product.productName = req.body.productName
  }
  if (req.body.description != null) {
    res.product.description = req.body.description
  }
  if (req.body.categoryId != null) {
    res.product.categoryId = req.body.categoryId
  }
  if (req.body.unitsInStock != null) {
    res.product.unitsInStock = req.body.unitsInStock
  }
  if (req.body.unitPrice != null) {
    res.product.unitPrice = req.body.unitPrice
  }
  try {
    const updatedproduct = await res.product.save()
    res.json(updatedproduct)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

router.delete('/:id', authenticationToken, getProduct, async (req, res) => {
  try {
    await res.product.deleteOne()
    res.json(res.product._id)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.get('/category/:categoryId', authenticationToken, async (req, res) => {
  try {
    const products = await Product.find({ categoryId: req.params.categoryId })
    if (products.length == 0) {
      res.status(404).json({ message: 'No products found for the category' })
    }

    res.json(products)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// router.get('/bulk-categories/', authenticationToken, async (req, res) => {
//     try {
//         const products = await Product.find();
//         res.json(products);
//     }
//     catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

router.get('/deneme', async (req, res) => {
  try {
    const products = await Product.find()
    const categories = await Category.find()

    let index = 0
    for (let i = 0; i < products.length; i += categories.length) {
      for (let j = i; j < i + categories.length && j < products.length; j++) {
        products[j].categoryId = categories[index]._id
        await products[j].save()
      }
      index++
      if (index >= categories.length) {
        index = 0
      }
    }

    res.json(products)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router
