Cypress.Commands.add('getElementFromSidebar', (element) => {
    // //Нахожу все элементы в сайдбаре
    cy.get('.product-item')
        //Фильтрую элементы по названию
        .filter(`:contains(${element.name.trim()})`)
        //Фильтрую элементы по валюте
        .filter(`:contains(${element.currency.trim()})`)
})