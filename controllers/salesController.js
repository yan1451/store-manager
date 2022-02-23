const salesService = require('../services/salesService');

const sealesCreate = async (req, res) => {
  const products = req.body;

  const sales = await salesService.creatSales(products);
  if (typeof sales.message === 'string') {
    return res.status(sales.codigo).json({ message: sales.message }); 
  }
    return res.status(201).json(sales);
};

const getSales = async (req, res) => {
  const allSales = await salesService.getAllSales();
  res.status(200).json(allSales);
};

const salesById = async (req, res) => {
  const { id } = req.params;
  const salesId = await salesService.salesById(id);
  res.status(salesId.codigo).json(salesId.message);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const salesList = req.body;
  const updateProducts = await salesService.updateProduct(id, salesList);
  console.log('controlers', updateProducts);
  if (typeof updateProducts.message === 'string') {
    return res.status(updateProducts.codigo).json({ message: updateProducts.message }); 
  }
    return res.status(200).json(updateProducts);
};

module.exports = { 
  sealesCreate,
  getSales,
  salesById,
  updateProduct,
};