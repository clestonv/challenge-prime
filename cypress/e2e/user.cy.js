/// <reference types="cypress" />

const criarPessoa = require('../support/utils');
describe('Gestão de Clientes', () => {

  beforeEach(() => {
    cy.visit('/')  
  })
  it('CT001 - Criar uma nova Conta com Sucesso', () => {
    const user = criarPessoa()
    console.log(user);

    
    cy.createAccount({ email: user.email, password: user.password });
    cy.get('.h3').should('contain','Login');
  });

  it('CT002 - Validar criação de uma conta com Email já cadastrado', () => {
    
    cy.createAccount({ email: 'teste@teste.com', password: '1234546' });    
    cy.get('.alert').should('be.visible').and('contain.text','Esse email já está em uso por outra conta');
  });
  it('CT003 - Realizar Login com sucesso', () => {
    
    cy.login({email: 'oliveira@oliveira.com', password: '123456'});    
    cy.get('h1').should('be.visible').and('contain.text','Gestão de Clientes');
  });
  it('CT004 - Validar Login com senha inválida', () => {
    
    cy.login({email: 'oliveira@teste.com', password: '1234565'});
    cy.get('.alert').should('be.visible').and('contain.text','E-mail ou senha inválida.');
  });
  it('CT005 - Realizar Cadastro de Clientes com sucesso na aba Perfil', () => {
    
    const user = criarPessoa()
    console.log(user);
    cy.login({email: 'oliveira@oliveira.com', password: '123456'});        
    cy.get('h1').should('be.visible').and('contain.text','Gestão de Clientes');

    cy.get('.nav-link:eq(2)').click();

    cy.createProfile({nome: user.fullname, telefone: user.fone, email: user.email, cep: user.cep, numero: user.numero, rua: user.rua});

    cy.get(`tbody tr td:contains(${user.fone})`).next().get('td i:eq(1)').click({force: true});
    cy.get('.sweet-alert a[class~=btn-danger]').click();
  });
  it('CT006 — Validar Pesquisa de Cliente recém cadastrado e exibição dos dados em tela', () => {
    
    const user = criarPessoa()
    console.log(user);
    cy.login({email: 'oliveira@oliveira.com', password: '123456'});        
    cy.get('h1').should('be.visible').and('contain.text','Gestão de Clientes');

    cy.get('.nav-link:eq(2)').click();

    cy.createProfile({nome: user.fullname, telefone: user.fone, email: user.email, cep: user.cep, numero: user.numero, rua: user.rua});

    cy.get('i[class~="red"]').should('be.visible');
    cy.get('input[placeholder="Pesquisar por nome"]').type(user.fullname)
    cy.wait(1000);
    cy.get('#button-addon2').click()
    cy.get('div.modal-content-cliente').should('be.visible')
    
    cy.wait(1000);
    cy.get('.dados_cliente p:eq(0)').contains(user.fullname).should('be.visible');
    cy.get('.dados_cliente p:eq(1)').contains(user.email).should('be.visible');
    cy.get('.dados_cliente p:eq(2)').contains(user.fone).should('be.visible');
  });
  it('CT007 - Editar Cliente através do botão na listagem de clientes', () => {
    
    const user = criarPessoa()
    console.log(user);
    cy.login({email: 'oliveira@oliveira.com', password: '123456'});   
    
    cy.get('h1').should('be.visible').and('contain.text','Gestão de Clientes');

    cy.get('.nav-link:eq(2)').click();

    cy.createProfile({nome: user.fullname, telefone: user.fone, email: user.email, cep: user.cep, numero: user.numero, rua: user.rua});

    cy.contains(user.fone).next().find('a[href*="/app/editarcliente"]').click();

    const userEdit = criarPessoa()

    cy.get('input#exampleInputEmail1:eq(1)').type(userEdit.fullname);
    cy.get('input#exampleInputEmail1:eq(2)').type(userEdit.email);
    cy.get('input#exampleInputEmail1:eq(3)').type(userEdit.fone);
    cy.get('#formFile').selectFile('cypress/fixtures/img/profile02.png', {force: true});

    cy.get('button.btn-primary').click()

  });


  it('CT008 - Validar Cadastro de Clientes com Email inválido na aba Perfil', () => {
    
    const user = criarPessoa()
    console.log(user);
    cy.login({email: 'oliveira@oliveira.com', password: '123456'});   
    
    cy.get('h1').should('be.visible').and('contain.text','Gestão de Clientes');

    cy.get('.nav-link:eq(2)').click();

    cy.createProfile({nome: user.fullname, telefone: user.fone, email: 'email.teste.com', cep: user.cep, numero: user.numero, rua: user.rua});

    // Validando a mensagem de erro no email invalido
    cy.get('input[type="email"]:invalid').should('have.length', 1)
    cy.get('input[type="email"]:invalid').then(($input) => {
      console.log($input[0].validationMessage)
      expect($input[0].validationMessage).to.eq('Inclua um "@" no endereço de e-mail. "email.teste.com" está com um "@" faltando.')
    })
  });
  
  it('CT009 - Validar preenchimento de campos obrigatórios na aba Perfil', () => {
    
    const user = criarPessoa()
    console.log(user);
    cy.login({email: 'oliveira@oliveira.com', password: '123456'});   
    
    cy.get('h1').should('be.visible').and('contain.text','Gestão de Clientes');

    cy.get('.nav-link:eq(2)').click();

    cy.get('button:eq(1)').should('be.disabled');

    cy.createProfile({nome: user.fullname, telefone: user.fone, email: user.email, cep: user.cep, numero: user.numero, rua: user.rua});

    cy.get('button:eq(1)').should('be.enabled');

  });
  
  it('CT010 - Realizar Logout com sucesso ao clicar em "Finalizar"', () => {
    
    const user = criarPessoa()
    console.log(user);
    cy.login({email: 'oliveira@oliveira.com', password: '123456'});   
    
    cy.get('h1').should('be.visible').and('contain.text','Gestão de Clientes');

    cy.logout();

  });

  it('CT011 - Recuperar senha de acesso', () => {
    
    cy.recoveryPassword({email: 'oliveira@teste.com'});    

  });

  it('CT012 - Validar preenchimento "Informações do Candidato" ao clicar em "Finalizar e Enviar"', () => {
    
    const user = criarPessoa()
    console.log(user);
    cy.login({email: 'oliveira@oliveira.com', password: '123456'});  

    cy.get('h1').should('be.visible').and('contain.text','Gestão de Clientes');

    cy.get('a[class~=logout]').click();

    cy.get('button[class~="btn-primary-modal"]').should('contain','Enviar').click();
    //cy.wait(10000)
    cy.get('form button[class~="btn-primary-modal"]').should('contain','Salvar').and('be.disabled');

    cy.get('input[id=nome]').type('Oliveira Belo');
    cy.get('input[id=telefone]').type('41997181207');
    cy.get('input[id=githubLink]').type('www.google.com');
    cy.get('input[id=nomeRecrutador]').type('Kelly');
    
    cy.get('form button[class~="btn-primary-modal"]').should('contain','Salvar').and('be.enabled').click();

    cy.get('div[class~="alert-success"]').should('be.visible').and('contain','As informações foram registradas com sucesso!');
  });

})