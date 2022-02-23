const productServices = require('../services/productServices');

const createProduct = async (req, res) => {
    const { name, quantity } = req.body;
    const product = await productServices.create(name, quantity);

    res.status(product.codigo).json(product.message);
};

const getAll = async (req, res) => {
    const products = await productServices.getAll();
    res.status(200).json(products);
};

const getById = async (req, res) => {
    const { id } = req.params;
    const productId = await productServices.getById(id);
    res.status(productId.codigo).json(productId.message);
};

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const updateProducts = await productServices.updateProduct(id, name, quantity);
    console.log('controlers', updateProducts);
    res.status(updateProducts.codigo).json(updateProducts.message);
};

const deletedeProduct = async (req, res) => {
    const { id } = req.params;
    const deleteProduct = await productServices.deleteProduct(id);
    res.status(deleteProduct.codigo).json(deleteProduct.message);
};

module.exports = {
    createProduct,
    getAll,
    getById,
    updateProduct,
    deletedeProduct,
};
