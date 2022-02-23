const productsModels = require('../models/productModels');

const create = async (name, quantity) => {
  let product = await productsModels.searchProduct(name);
  if (!product) { 
    product = await productsModels.createProduct(name, quantity);
    return {
      codigo: 201,
      message: product,
    };
  } 
    return {
    codigo: 409, 
    message: { message: 'Product already exists' },
  };
};

const getAll = async () => {
  const products = await productsModels.getAll();
  return products;
};

const getById = async (id) => {
  const product = await productsModels.getById(id);
  if (product.length === 0) {
    return { codigo: 404, message: { message: 'Product not found' } };
  } return {
    codigo: 200,
    message: product[0],
  };
};

const updateProduct = async (id, name, quantity) => { 
  const searchById = await productsModels.getById(id);
  const AtualizarP = await productsModels.attProduct(id, name, quantity);
  console.log('update', AtualizarP);  
  if (searchById.length === 0) {
    return { codigo: 404, message: { message: 'Product not found' } };
  } return {
    codigo: 200,
    message: { id, name, quantity },
  };
};

const deleteProduct = async (id) => {
  const searchById = await productsModels.getById(id);
  if (searchById.length === 0) {
    return { codigo: 404, message: { message: 'Product not found' } };
  } await productsModels.deleteProduct(id);
    return {
    codigo: 204,
    message: searchById[0],
  };
};

module.exports = {
  create,
  getAll,
  getById,
  updateProduct,
  deleteProduct,
};