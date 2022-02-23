const connection = require('./connection');

 const creatSalesProduct = async (saleId, productId, quantity) => {
     const query = `INSERT INTO StoreManager.sales_products 
     (sale_id, product_id, quantity) VALUES (?,?,?)`;
    const [saleProduct] = await connection.query(query, [saleId, productId, quantity]);
    console.log(saleProduct);
    console.log(saleProduct);
    return { id: saleProduct.insertId };
  };

const creatSales = async (date) => {
  const [rows] = await connection.query(
    `INSERT INTO StoreManager.sales (id, date)
    VALUES (id, ?);`, 
    [date],
  );
  return { id: rows.insertId };  
};

const getAllSales = async () => {
  const [rows] = await connection
  .query(`SELECT sale_id as saleId,date, product_id as productId, quantity 
    FROM StoreManager.sales_products INNER JOIN StoreManager.sales 
    ON sales_products.sale_id = sales.id`);
  return rows;
};

const getById = async (id) => {
  const [rows] = await connection.execute(
    `SELECT date, product_id as productId, quantity 
    FROM StoreManager.sales 
    INNER JOIN StoreManager.sales_products ON sales.id = sales_products.sale_id WHERE id = ?`, [id],
      );
  return rows;
};

const attSales = async (SaleId, productId, quantity) => {
  const [rows] = await connection.execute(
      'UPDATE StoreManager.sales_products SET product_id = ?, quantity = ? WHERE sale_id = ?',
      [productId, quantity, SaleId],
      );
  console.log(rows);
};

module.exports = {
  creatSalesProduct,
  creatSales,
  getAllSales,
  getById,
  attSales,
}; 
