// Bibliotecas
const request = require('supertest');
const sinon = require('sinon');
const { expect } = require('chai');

// Aplicação
const app = require( '../../app');

//Mock
const tranferService = require('../../service/transferService');

// Testes
describe('Transfer Controller', () =>{
    describe('POST /transfers', () => {

        it('Quando informo remetente e destinário inexistente recebo 400', async () => {
            const resposta = await request(app)
                .post('/transfer')
                .send({
                    from: "carol",
                    to: "je",
                    amount: 100
                });

            expect(resposta.status).to.equal(400);
            expect(resposta.body).to.have.property('error', 'Usuário remetente ou destinatário não encontrado');
        });

        it('Usando Mocks: Quando informo remetente e destinário inexistente recebo 400', async () => {
            // Mocar apenas a funçao transfer do Service
            const tranferServiceMock = sinon.stub(tranferService, 'transfer'); // foda-se o transfer, a partir de agora vai usar a mensagem abaixo e morre o sinon apos isso
            tranferServiceMock.throws(new Error ('Usuário remetente ou destinatário não encontrado'))

            const resposta = await request(app)
                .post('/transfer')
                .send({
                    from: "carol",
                    to: "je",
                    amount: 100
                });

            expect(resposta.status).to.equal(400);
            expect(resposta.body).to.have.property('error', 'Usuário remetente ou destinatário não encontrado');

            //Reseto mock
            sinon.restore();
        });
    });

    describe ('GET /transfers', () =>{
        // Its ficam aqui
    });
});
