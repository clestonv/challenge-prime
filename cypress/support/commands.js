// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('createAccount', ({email, password})=> {
    cy.get('a[href="/app/novaconta"]').click();
    cy.get('#floatingInput').type(email);
    cy.get('#floatingPassword').type(password);
    cy.get('button[type=button]').click();
    
});

Cypress.Commands.add('login', ({email, password})=> {
    cy.get('a[href="/app"]').click();
    cy.get('#floatingInput').type(email);
    cy.get('#floatingPassword').type(password);
    cy.get('button[type=button]').click();
});

Cypress.Commands.add('createProfile', ({nome, telefone, email, cep, numero, rua})=> {
    cy.get('#image-upload').selectFile('cypress/fixtures/img/profile.png', {force: true});
    cy.get('.form-control:eq(1)').type(nome) //Nome
    cy.get('.form-control:eq(2)').type(telefone) //Telefone
    cy.get('.form-control:eq(3)').type(email) //Email
    cy.get('.form-control:eq(4)').type(cep) //CEP
    cy.get('.form-control:eq(5)').type(numero) //Número
    cy.get('.form-control:eq(6)').type(rua) //Endereço
    cy.get('.form-control:eq(7)').type('Casa') //Complemento
    cy.get('.form-control:eq(8)').select('Brasil') //Country

    cy.get('input[value="masculino"]').click();
    cy.get('input[value="robot"]').click();
    cy.get('input[value="cypress"]').click();
    cy.get('input[value="appium"]').click();

    cy.get('button:eq(1)').click()
    cy.wait(2000)
});

Cypress.Commands.add('logout', ()=> {
    cy.get('a[class~=logout]').click();
    cy.get('.btn-danger-modal').click();
    cy.get('.h3').should('contain','Login');
})

Cypress.Commands.add('recoveryPassword', ({ email })=> {
    cy.visit('/');
    cy.get('a[href="/app"]').click();
    cy.get('[href="/app/resetsenha"]').click();
    cy.get('#floatingInput').type(email);
    cy.get('button[class~="btn-primary"]').should('contain','Enviar').click();
    cy.get('div[class~="alert-success"]').should('contain','Email enviado com sucesso');
})