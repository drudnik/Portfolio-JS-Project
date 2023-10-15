//ТУТ ХРАНЯТЬСЯ ВСЕ API МЕТОДЫ

//Метод логина на Тест
Cypress.Commands.add('loginTestApi', (token) => {
    cy.request({
        method: 'POST',
        url: `${Cypress.config('baseUrl')}rest/___________`,
        headers: {
            "Authorization": Cypress.env(token),

        },
        body: {}
    }).then((response) => {
        expect(response.status).to.equal(200);
    });
})
//Метод логина на Препрод
Cypress.Commands.add('loginApi', (token) => {
    cy.request({
        method: 'POST',
        url: `${Cypress.config('baseUrl')}rest/___________`,
        headers: {
            'Authorization': Cypress.env(token),
        },
        body: {}
    }).then((response) => {
        expect(response.status).to.equal(200);
    });
})
//Смена компании через API
Cypress.Commands.add('changeCompanyApi', (idCompany) => {
    cy.request("PUT", `${Cypress.config('baseUrl')}rest/___________/${idCompany}`);
    cy.reload()
})