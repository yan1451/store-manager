const { expect } = require("chai");
const salesModels = require("../../../models/salesModel");
const salesServices = require('../../../services/salesService');
const sinon = require('sinon');

describe('ServicesSales', () => {
  describe('salesServices', () => {
    describe('#getAllSales', () => {
      describe('Quando a tabela não tiver dados!', () => {
        const salesMock = {};
        before(() => {
          sinon.stub(salesModels, 'getAllSales').resolves(salesMock);
        });

        after(() => {
          salesModels.getAllSales.restore();
        });

        it('Retorne um Objeto vazio!', async () => {
          const sales = await salesServices.getAllSales();
          expect(sales).to.be.deep.eq(salesMock);
        });

      });

      describe('Quando a tabela tiver dados!', () => {
        const allSalesMock = [
          { saleId: 1,
            date:  `2022-02-23T21:11:51.000Z`,
            productId: 1,
            quantity: 10,        
          }
        ]; 

        before(() => {
          sinon.stub(salesModels, 'getAllSales').resolves(allSalesMock);
        });
        after(() => {
          salesModels.getAllSales.restore();
        });
        it('Retorne os dados esperados!', async () => {
          const sales = await salesServices.getAllSales();
          expect(sales).to.deep.eq(allSalesMock);
        });
      });
    });

    
  });
});