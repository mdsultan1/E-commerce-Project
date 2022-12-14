
const Product = require("../models/productModel")
const asyncHandler = require("express-async-handler")

const getProducts = asyncHandler(async(req,res) =>{
    const products = await Product.find({})
    res.json(products)
})

const getProductById   = asyncHandler(async (req,res) =>{

    const product = await Product.findById(req.params.id)

    if(product){
        res.json(product)

    }else{
        res.status(404).json({message:"Product not found in dB"})
    }

})
const deleteProduct   = asyncHandler(async (req,res) =>{

    const product = await Product.findById(req.params.id)

    if(product){
        
        await product.remove()
        res.json({message: "Product removed"})

    }else{
        res.status(404).json({message:"Product not found in dB"})
    }

})

const createProduct = asyncHandler(async(req,res) =>{

    const product = new Product({
        name : "sample name",
        price : 0,
        user: req.user._id,
        image: "/images/sample.jpg",
        brand: "sample brand",
        category: "sample category",
        countInStock:0,
        description: "sample description"

    })
    const createdProduct = await product.save()
    res.status(201).json(createdProduct)

})

const updateProduct = asyncHandler(async(req,res) =>{
   

    const {name,price, description,image,brand,category,countInStock } = req.body

    const product = await Product.findById(req.params.id)
    if (product){
        product.name = name
        product.price = price
        product.image = image
        product.brand = brand
        product.category = category
        product.countInStock = countInStock
        product.description = description
        
        const updatedProduct = await product.save()
        res.json(updatedProduct)
    }else{
        res.status(404)
        throw new Error("product not found")
    }

})

module.exports = {getProducts,getProductById,deleteProduct,createProduct,updateProduct}