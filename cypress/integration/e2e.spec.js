/// <reference types="cypress" />

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

        //Escolher e adicionar 4 produtos com Comandos Customizados
        cy.addProdutos('Ajax Full-Zip Sweatshirt', 'L', 'Blue', quantidade)
        cy.get('#primary-menu > .menu-item-629 > a').click()

        cy.addProdutos('Arcadio Gym Short', 32, 'Black', quantidade)
        cy.get('#primary-menu > .menu-item-629 > a').click()

        cy.addProdutos('Argus All-Weather Tank', 'S', 'Gray', 1)
        cy.get('#primary-menu > .menu-item-629 > a').click()

        cy.addProdutos('Atlas Fitness Tank', 'M', 'Blue', quantidade)

        //Visualizar carrinho
        cy.get('.woocommerce-message > .button').click()

        //Concluir compra
        cy.get('.checkout-button').click()

        //Checkout
        cy.get('.woocommerce-form-login-toggle > .woocommerce-info').should('contain', 'Já está cadastrado?')

        //login
        cy.get('.showlogin').click()
        cy.fixture('perfil').then((dados) => {
            cy.login(dados.usuario, dados.senha)
        });

        cy.get('#billing_first_name').clear().type('Debora')
        cy.get('#billing_last_name').clear().type('Penimpedo')
        cy.get('#billing_company').clear().type('EbacEbacEbacEbacAOBA')
        cy.get('#select2-billing_country-container').click().type('Brasil' + '{enter}')
        cy.get('#billing_address_1').clear().type('AV celso')
        cy.get('#billing_address_2').clear().type('30545885588558855885')
        cy.get('#billing_city').clear().click().type('Praia Grande')
        cy.get('#select2-billing_state-container').click().type('Roraima' + '{enter}')
        cy.get('#billing_postcode').clear().type('03063000')
        cy.get('#billing_phone').clear().type('1199558866')
        cy.get('#billing_email').clear().type('deborapenimpedo@gmail.com')
        cy.get('#order_comments').clear().type('Notas sobre seu pedido, por exemplo, informações especiais sobre entrega')

        cy.get('#payment_method_bacs').check()

        cy.get('#terms').check()

        cy.get('#place_order').click({ force: true })

        cy.get('.page-title').should('contain', 'Pedido recebido')






    });
});
