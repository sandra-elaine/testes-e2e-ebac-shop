/// <reference types="cypress" />
import EnderecoPage from '../support/page_objects/endereco.page'

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */

    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
        //TODO 
        cy.visit('produtos')
        var quantidade = 1

        //Escolher e adicionar ao Carrinho produtos com Comandos Customizados
        cy.addProdutos('Ajax Full-Zip Sweatshirt', 'L', 'Blue', quantidade)
        cy.get('#primary-menu > .menu-item-629 > a').click()

        cy.addProdutos('Arcadio Gym Short', 32, 'Black', quantidade)
        cy.get('#primary-menu > .menu-item-629 > a').click()

        cy.addProdutos('Argus All-Weather Tank', 'S', 'Gray', quantidade)
        cy.get('#primary-menu > .menu-item-629 > a').click()

        cy.addProdutos('Atlas Fitness Tank', 'M', 'Blue', quantidade)

        //Visualizar carrinho
        cy.get('.woocommerce-message > .button').click()

        //Concluir compra
        cy.get('.checkout-button').click()

        //Tela do Checkout
        cy.get('.woocommerce-form-login-toggle > .woocommerce-info').should('contain', 'Já está cadastrado?')

        //login
        cy.get('.showlogin').click()
        cy.fixture('perfil').then((dados) => {
            cy.login(dados.usuario, dados.senha)
        });

        //Utilizando Page Objects para preencher o Endereço do Faturamento
        EnderecoPage.PreencherEnderecoDetalhesFaturamento('Debora', 'Penimpedo', 'EbacEbacEbacEbacAOBA', 'Brasil', 'AV celso', '30545885588558855885', 'Praia Grande', 'Roraima', '03063000', '1199558866', 'deborapenimpedo@gmail.com')

        cy.get('#order_comments').clear().type('Notas sobre seu pedido, por exemplo, informações especiais sobre entrega')
        cy.get('#payment_method_bacs').check()
        cy.get('#terms').check()
        cy.get('#place_order').click({ force: true })
        cy.get('.page-title').should('contain', 'Pedido recebido')

    });
});
