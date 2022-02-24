const productsController = require('../../../controllers/productsControllers');
const productsService = require('../../../services/productServices');
const sinon = require('sinon');
const { expect } = require("chai");

describe('Controllers Products', () => { 
  describe('productsControllers', () => { 
    describe('#getAll', () => { 
      describe('quando a tabela não possuir dados', () => { 
        const productsMock = [];
        const req = {};
        const res = {};

        before(() => {
          res.status = sinon.stub().returns(res);
          res.json = sinon.stub();

          sinon.stub(productsService, 'getAll').resolves(productsMock);
        });

        after(() => {
          productsService.getAll.restore();
        });

        it('deve chamar a função `res.status` com o status 200', async () => {
          await productsController.getAll(req, res);
          expect(res.status.calledWith(200)).to.be.true;
        });


        it('deve chamar a função `res.json` com um array vazia', async () => {
          await productsController.getAll(req, res);
          expect(res.json.calledWith(productsMock)).to.be.true;
        });

       });
      describe('Quando a tabela possuir dados', () => {
        const req = {};
        const res = {};

        const allProductsMock = [{ id: 1, name: "macarrao", quantity: 100 }];

        
        before(() => {
          res.status = sinon.stub().returns(res);
          res.json = sinon.stub();

          sinon.stub(productsService, 'getAll').resolves(allProductsMock);
        });

        after(() => {
          productsService.getAll.restore();
        });
        
        it('deve chamar a função `res.status` com o valor 200', async () => {
          await productsController.getAll(req, res);
          expect(res.status.calledWith(200)).to.be.true;

        });

        it('deve chamar a função `res.json` com os elementos esperados', async () => {
          await productsController.getAll(req, res);
          expect(res.json.calledWith(allProductsMock)).to.be.true;
        });
        });
     });
   });
 });