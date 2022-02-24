const { expect } = require("chai");
const productsModels = require("../../../models/productModels");
const ProductsService = require('../../../services/productServices');
const sinon = require('sinon');

describe('ServicesProducts', () => {
  describe('ProductsService', () => {
    describe('#getAll', () => {
      describe('Quando a tabela não tiver dados!', () => {
        const productsMock = [];
        before(() => {
          sinon.stub(productsModels, 'getAll').resolves(productsMock);
        });

        after(() => {
          productsModels.getAll.restore();
        });

        it('Retorne um array vazio!', async () => {
          const products = await ProductsService.getAll();
          expect(products).to.be.deep.eq(products);
        });

      });

      describe('Quando a tabela tiver dados!', () => {
        const allProductsMock = [{ id: 1, name: "macarrao", quantity: 100 }];

        before(() => {
          sinon.stub(productsModels, 'getAll').resolves(allProductsMock);
        });
        after(() => {
          productsModels.getAll.restore();
        });
        it('Retorne os dados esperados!', async () => {
          const products = await ProductsService.getAll();
          expect(products).to.deep.eq(allProductsMock);
        });
      });
    });
  });
});