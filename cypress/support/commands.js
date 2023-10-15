//Авторизация с сохранением сессии
Cypress.Commands.add('loginStand', (login, password) => {
    cy.session('Создание сессии авторизации', () => {
        cy.visit("/")
        cy.get('input[data-qa="1658988187497"][type="text"]').type(Cypress.env(login), { log: false })
        cy.get('input[data-qa="1658988187497"][type="password"]').type(Cypress.env(password), { log: false })
        cy.get('div[data-qa="1658987981978"]').click()
        cy.url().should('contain', 'desktop')
    })
})
//Ожидание появления элемента на странице 
Cypress.Commands.add('waitUntil', (element) => {
    cy.get(element).should('be.visible')
})

//Метод поиска ключа в localStorage
Cypress.Commands.add('getLocalStorageValue', (key) => {
    cy.window().then((win) => {
        const value = win.localStorage.getItem(key);
        return value.should('exist')
    });
})
//Метод для выбора любого элемента из хедера на главном меню
Cypress.Commands.add('openHeaderTab', () => {
    cy.contains('div[class="main-menu__content-wrapper"] *', tabName).click()
})
//Переход в раздел через бургер меню
Cypress.Commands.add('openBurgerTab', (tabName) => {
    cy.get('.hamburger-menu__icon.closed use').click()
    cy.contains('div[data-qa="1658842269986"].main-menu__content div ', tabName).click()
})
//Метод для работы с зеленым тостом 
Cypress.Commands.add('checkGreenToastInfo', (text) => {
    cy.get('div.toast-wrapper-text')
        .should('have.text', text);
    cy.get('.toast')
        .should('have.css', 'background-image', 'linear-gradient(270deg, rgb(0, 168, 67) 0%, rgb(31, 208, 113) 100%)');
    cy.get('.toast-svg > svg > use').click()
})
//Метод для работы с красным тостом 
Cypress.Commands.add('checkRedToastInfo', (text) => {
    cy.get('div.toast-wrapper-text')
        .should('have.text', text);
    cy.get('.toast')
        .should('have.css', 'background-image', 'linear-gradient(270deg, rgb(243, 144, 52) 0%, rgb(255, 39, 39) 100%)');
    cy.get('.toast-svg > svg > use').click()
})
//Заполнение формы тестовыми данными
Cypress.Commands.add('fillForm', (fixture) => {
    cy.url().then((url) => {
        Object.entries(fixture).forEach(([key, value]) => {
            cy.contains('label.dynamic-input', `${key}`)
                .find('div.dynamic-input__placeholder')
                .type(`${value}`);
        });
    });
});
//Проверка заполненых полей в форме в разделе "Контрагенты"
Cypress.Commands.add('checkFormInput', (fixture) => {
    cy.url().then((url) => {
        Object.entries(fixture.type).forEach(([key, value]) => {
            cy.contains('label.dynamic-input', `${key}`)
                .find('div.dynamic-input__overlay.ng-star-inserted')
                .children()
                .invoke('val')
                .should('not.be.empty')
                .then(sometext => expect(sometext).to.equal(`${value}`));
        });
        //Проверка поля "Название банка получателя"
        cy.contains('label.dynamic-input', 'Название банка получателя')
            .find('div.dynamic-input__overlay.ng-star-inserted')
            .children()
            .invoke('val')
            .then(sometext => expect(sometext).to.equal(fixture.check.bankName));
    });
})
//
//Модифицирую номер счета accNumber в формате "00000 000 0 00000000000"
function modificationAccNumberSpace(accNumber) {
    const str = accNumber;
    let newAccNumber = '';
    str.split('').forEach((letter, index) => {
        if (index === 5 || index === 8 || index === 9) {
            newAccNumber += ' ' + letter
        } else {
            newAccNumber += letter
        }
    })
    return newAccNumber
}
//Модифицирую номер счета accNumber в формате "00000 000 0 00000000000"
Cypress.Commands.add('modificationAccNumberSpace', (accNumber) => {
    const str = accNumber;
    let newAccNumber = '';
    str.split('').forEach((letter, index) => {
        if (index === 5 || index === 8 || index === 9) {
            newAccNumber += ' ' + letter
        } else {
            newAccNumber += letter
        }
    })
    return newAccNumber
})
//Модифицирую номер счета accNumber в формате "00000.000.0.00000000000"
Cypress.Commands.add('modificationAccNumberDot', (accNumber) => {
    const str = accNumber;
    let newAccNumber = '';
    str.split('').forEach((letter, index) => {
        if (index === 5 || index === 8 || index === 9) {
            newAccNumber += '.' + letter
        } else {
            newAccNumber += letter
        }
    })
    return newAccNumber
})
//
//Проверяю буфер обмена (РАБОТАЕТ ТОЛЬКО НА CHROME и ELECTRON)
Cypress.Commands.add('checkClipboard', text => {
    cy.window().its('navigator.clipboard')
        .then((clip) => clip.readText())
        .should('equal', text)
})
