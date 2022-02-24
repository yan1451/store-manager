const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/connection');
const productModels = require('../../../models/productModels');

  describe('productsModels', () => {
    describe('#getAll', () => {
    describe('Quando a tabela `Products` não tiver dados!', () => {      
      const productsMock = [];
      before(() => {        
        sinon.stub(connection, 'execute').resolves([productsMock]);
      });

      after(() => {
        connection.execute.restore();
      });

      it('retornar um array vazia',async () => {
        const products = await productModels.getAll();
        expect(products).to.be.deep.eq([]);
      });
    });

    describe('Quando a Tabela `Products` tiver dados', () => { 
      const productsMock = [ { id: 1, name: "macarrao", quantity: 100 } ];

      before(() => {
        sinon.stub(connection, 'execute').resolves([productsMock]);
      });

      after(() => {
        connection.execute.restore();
      });

      it('deve retornar os elementos esperados', async () => {
          const products = await productModels.getAll();
          expect(products).to.deep.equal(productsMock);
      });
    });
 }); 
  describe('#CreateProducts', () => { 

    const productsMock = { inserted: { id: 1, name: "macarrao", quantity: 100 } };

    before(() => {
      sinon.stub(connection, 'execute').resolves([ { insertId: productsMock.inserted.id } ]);
    });
      

    after(() => { 
      connection.execute.restore();
    })
    it('deve retornar um objeto com os atributos id, name, quantity', async () => {
      const { name, quantity } = productsMock.inserted;
      const products = await productModels.createProduct(name, quantity);

      expect(products).to.deep.eq(productsMock.inserted);
    });

   });

  
});
    