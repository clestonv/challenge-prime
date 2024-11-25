const { fakerPT_BR } = require('@faker-js/faker');

function extrairNumeros(string) {
    return string.replace(/\D/g, '');
}
  
  

function criarPessoa() {
    return {
        username: fakerPT_BR.person.firstName(),
        lastname: fakerPT_BR.person.lastName(),
        fullname: fakerPT_BR.person.fullName(),
        email: fakerPT_BR.internet.email(),
        fone: extrairNumeros(fakerPT_BR.phone.number()),
        password: fakerPT_BR.internet.password(),
        cep: fakerPT_BR.address.zipCode(),
        rua: fakerPT_BR.address.street(),
        numero: fakerPT_BR.number.int({ min: 10, max: 100}),
    };
}

module.exports = criarPessoa;