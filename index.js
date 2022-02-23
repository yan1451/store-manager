const express = require('express');
const bodyParser = require('body-parser');
const productControllers = require('./controllers/productsControllers');
const verifyname = require('./controllers/middlewares/verifyName');
const verifyQuantity = require('./controllers/middlewares/verifyQuantity');

const salesController = require('./controllers/salesController');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/sales', salesController.sealesCreate);
app.get('/sales', salesController.getSales);
app.get('/sales/:id', salesController.salesById);
app.put('/sales/:id', salesController.updateProduct);

app.get('/products/', productControllers.getAll);
app.get('/products/:id', productControllers.getById);
app.delete('/products/:id', productControllers.deletedeProduct);

app.use(verifyQuantity, verifyname);
app.post('/products', productControllers.createProduct);
app.put('/products/:id', productControllers.updateProduct);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
