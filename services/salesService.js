const salesModel = require('../models/salesModel');
const productModel = require('../models/productModels');

const verifyId = async (products) => {
  const findId = await products.find((product) => !product.productId);

  if (findId) return { codigo: 400, message: '"productId" is required' };
  return false;
};

const verifyExistId = async (products) => {
  const product = await products.find((p) => p.productId);
  const id = await productModel.getById(product.productId);
  console.log('product', product.productId);
  console.log(id);
  if (id.length === 0) {
    return { codigo: 404, message: 'product not found' };
  }
   return false;
};

const verifyQuantity = async (products) => {   
  const verifyQuantit = await products
  .find((product) => !product.quantity && product.quantity !== 0);

  if (verifyQuantit) return { codigo: 400, message: '"quantity" is required' };

  return false;
};

const verifyPositiveQuantity = async (products) => {  
  const quantity = await products
  .find((product) => typeof product.quantity !== 'number' || product.quantity < 1);

  if (quantity) {
    return { codigo: 422,
        message: '"quantity" must be greater than or equal to 1' }; 
   }

  return false;
};

const creatSales = async (products) => {
  const checkID = await verifyId(products);
  console.log(checkID);
  const checkQt = await verifyQuantity(products);  
  const verifyPositiveQtt = await verifyPositiveQuantity(products); 
   
  if (checkID) return checkID;
  if (checkQt) return checkQt;
  if (verifyPositiveQtt) return verifyPositiveQtt;
  const checkExistId = await verifyExistId(products);
  if (checkExistId) return checkExistId;

  const { id } = await salesModel.creatSales(new Date());
  const product = products.map(async ({ productId, quantity }) => {
    await salesModel.creatSalesProduct(id, productId, quantity);
  });
   await Promise.all(product);   
  return { 
    id,
    itemsSold: products,
  };
};

const getAllSales = async () => {
  const allSales = await salesModel.getAllSales();
  return allSales;
};

const salesById = async (id) => {
  const sales = await salesModel.getById(id);
  if (sales.length === 0) {
    return { codigo: 404, message: { message: 'Sale not found' } };
  } return {
    codigo: 200,
    message: sales,
  };
};

const updateProduct = async (id, salesList) => {
  const checkID = await verifyId(salesList);
  const checkQt = await verifyQuantity(salesList);  
  const verifyPositiveQtt = await verifyPositiveQuantity(salesList); 
   
  if (checkID) return checkID;
  if (checkQt) return checkQt;
  if (verifyPositiveQtt) return verifyPositiveQtt;
  const checkExistId = await verifyExistId(salesList);
  if (checkExistId) return checkExistId;

   const attSalesList = salesList.map(async ({ productId, quantity }) => {
    await salesModel.attSales(id, productId, quantity);
  });
   await Promise.all(attSalesList);   
  return { 
    saleId: id,
    itemUpdated: salesList,
  };  
};

module.exports = { 
  creatSales,
  getAllSales,
  salesById,
  updateProduct,
 };
