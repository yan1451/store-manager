const connection = require('./connection');

const createProduct = async (name, quantity) => {
    const [rows] = await connection.execute(
        'INSERT INTO StoreManager.products (name, quantity) VALUES (?, ?)',
        [name, quantity],
    );
    return { 
        id: rows.insertId, 
        name, 
        quantity,
    }; 
};

const searchProduct = async (name) => {
    const [rows] = await connection.execute(
        'SELECT * FROM StoreManager.products WHERE name = ?', 
        [name],
        );
    return rows[0];
};

const getAll = async () => {
    const [rows] = await connection.execute('SELECT * FROM StoreManager.products');
    return rows;
};

const getById = async (id) => {
    const [rows] = await connection.execute(
        'SELECT * FROM StoreManager.products WHERE id = ?', [id],
        );
    console.log('id', id);
    console.log('GetById', rows);
    return rows;
};

const attProduct = async (id, name, quantity) => {
    const [rows] = await connection.execute(
        'UPDATE StoreManager.products SET name = ?, quantity = ? WHERE id = ?',
        [name, quantity, id],
        );
    console.log(rows);
};

const deleteProduct = async (id) => {
    await connection.execute(
        'DELETE FROM StoreManager.products WHERE id = ?',
        [id],
    );
};

module.exports = {
    createProduct,
    searchProduct,
    getAll,
    getById,
    attProduct,
    deleteProduct,
};
