const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/connection');
const SalesModel = require('../../../models/salesModel');
  
  describe('salesModels', () => {
    describe('#getAllSales', () => {
      describe('Quando a tabela `Sales` não tiver dados!', () => {       
        const salesMock = [];  

        before(() => {  
          sinon.stub(connection, 'query').resolves([salesMock]);
        });

        after(() => {
          connection.query.restore();
        });

        it('retornar um array vazia',async () => {
          const sales = await SalesModel.getAllSales();
          expect(sales).to.be.deep.eq(salesMock);
        });
       
   }); 
   describe('Quando exister dados na tabela `Sales`', () => { 
    const allSalesMock = [
      { saleId: 1,
        date:  `2022-02-23T21:11:51.000Z`,
        productId: 1,
        quantity: 10,        
      }
    ];      
    before(() => {          
      sinon.stub(connection, 'query').resolves([allSalesMock]);
    });

    after(() => {
      connection.query.restore();
    });

    it('deve retornar os elementos esperados', async () => {
      const allSales = await SalesModel.getAllSales();
      expect(allSales).to.deep.equal(allSalesMock);
    });

   });
  });
    describe('#CreatSales', () => { 

      const salesMock = { inserted: { id: 1 } };

    before(() => {
      sinon.stub(connection, 'query').resolves([ { insertId: salesMock.inserted.id } ]);
    });

    after(() => {
      connection.query.restore();
    })
      
    it('deve retornar um objeto com o atributo id', async () => {
      const { id } = salesMock.inserted;
      const sales = await SalesModel.creatSalesProduct(id);

      expect(sales).to.deep.eq(salesMock.inserted);
    });
    });
  });
    