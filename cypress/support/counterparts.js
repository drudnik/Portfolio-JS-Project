//Тут храняться команды для функционала "Контрагенты"
//
//Проверка модального окна удаление контрагента/бенефициара
Cypress.Commands.add('checkModalContainer', (fixture) => {
    cy.get('#modal-container').within(() => {
        //Проверяю наличие заголовка модального окна
        cy.get('div.page-title').should('contain', fixture.modalContainerCounterparts)
        //Проверяю наличие крестика закрытия
        cy.get('app-svg-icon.page-title__svg')
            .find('use')
            .should('have.attr', 'href', fixture.svgCross)
        //Проверяю наличие кнопки "Удалить" и "Отменить" и их цвета
        cy.get('div.delete-modal__content').should('contain', fixture.modalContainerSummery)
        cy.get('div.delete-modal__controls').within(() => {
            cy.get('div.panel-form__button.undefined')
                .should('contain', ' Удалить')
                .and('have.css', 'background-image', `${Cypress.env('colorBlueGradient')}`)
            cy.get('div.panel-form__button.small-bordered')
                .should('contain', ' Отменить')
                .and('have.css', 'border', `1px solid ${Cypress.env('colorBlueSolid')}`)
        })
    })
})
//
// Проверяю логотип и ранее введенную информацию на странице "Контрагенты"
Cypress.Commands.add('checkCounterpartList', (fixture) => {
    cy.contains('div.counterpart-list__item', fixture.type["Наименование получателя или ИНН"])
        .within(() => {
            cy.get('div.counterpart-list__item__type')
                .find('use')
                .should('have.attr', 'href', fixture.check.image)
            if (fixture.type["ИНН получателя"] && fixture.type["КПП получателя"]) {
                cy.get('div.counterpart-list__item__info')
                    .within(() => {
                        cy.get('div.title').should('contain', fixture.type["Наименование получателя или ИНН"])
                        cy.get('div.description')
                            .should('contain', fixture.type["ИНН получателя"])
                            .and('contain', fixture.type["КПП получателя"])
                    })
            }
        })
})
//
//Проверяю логотип и ранее введенную информацию на странице "Контрагенты / Просмотр"
Cypress.Commands.add('checkCounterpartDetails', (fixture) => {
    cy.contains('div.counterpart-details__content', fixture.type["Наименование получателя или ИНН"])
        .within(() => {
            cy.get('app-svg-icon.counterpart-details__content__icon')
                .find('use')
                .should('have.attr', 'href', fixture.check.image)
            if (fixture.type["ИНН получателя"] && fixture.type["КПП получателя"]) {
                cy.get('div.counterpart-details__content__info')
                    .within(() => {
                        cy.get('div.counterpart-details__content__info__fullname').should('contain', fixture.type["Наименование получателя или ИНН"])
                        cy.get('div.counterpart-details__content__info__requisites')
                            .should('contain', fixture.type["ИНН получателя"])
                            .and('contain', fixture.type["КПП получателя"])
                    })
            }
        })
})
//Создаю определенное количество контрагентов
Cypress.Commands.add('createSomeCounterpartsApi', (i, fixture) => {
    while (i) {
        cy.request('POST', `${Cypress.config('baseUrl')}rest/___________`, {
            "fullname": fixture.type["Наименование получателя или ИНН"],
            "inn": Number(fixture.type["ИНН получателя"]) + i,
            "kpp": fixture.type["КПП получателя"],
            "accList": [
                {
                    "accNumber": fixture.type["Счет получателя"],
                    "bankBik": fixture.type["БИК банка получателя"]
                }
            ],
            "corrType": fixture.check["corrType"]
        })
        i--;
    }
})
//Создаю контрагента через API
Cypress.Commands.add('createCounterpartsApi', (fixture) => {
    cy.request('POST', `${Cypress.config('baseUrl')}rest/___________`, {
        "fullname": fixture.type["Наименование получателя или ИНН"],
        "inn": fixture.type["ИНН получателя"],
        "kpp": fixture.type["КПП получателя"],
        "accList": [
            {
                "accNumber": fixture.type["Счет получателя"],
                "bankBik": fixture.type["БИК банка получателя"]
            }
        ],
        "corrType": fixture.check["corrType"]
    })
})
//Удаляю все контрагенты через API
Cypress.Commands.add('deleteAllCounterparts', () => {
    function getArray(restResult) {
        let result = [];
        const resultType = getTypeOf(restResult);
        switch (resultType) {
            case 'Array':
                result = restResult.slice();
                break;
            case 'Object':
                result = Object.keys(resultType).length ? [restResult] : [];
                break;
            case 'String':
            case 'Number':
                result = Array.of(restResult);
                break;
            default:
                break;
        }
        return result;
    }
    function getTypeOf(obj) {
        return {}.toString.call(obj).slice(8, -1);
    }
    let counterpartsList = [];
    //Получаю список контрагентов
    cy.request('GET', `${Cypress.config('baseUrl')}rest/___________`).then((response) => {
        //Загоняю респонс в переменную
        counterpartsList = getArray(response.body?.corrDicElementUl)
        //Удаляю контрагенты
        counterpartsList.forEach(item => {
            cy.request({
                method: 'DELETE',
                url: `rest/___________/${item.id}`
            })
        })
    })
})
//Клик по кебаб-меню "Контрагенты"
Cypress.Commands.add('clickKebabMenuСounterpart', (name) => {
    cy.get('div.counterpart-list__item__controls').within(() => {
        cy.get('app-menu-select.actions').click()
        cy.contains('div.menu-select-item__title', name).click()
    })
})
//Клик по кебаб-меню "Контрагенты / Просмотр"
Cypress.Commands.add('clickKebabMenuDetails', (name) => {
    cy.get('div.counterpart-details').within(() => {
        cy.get('app-menu-select.actions').click()
        cy.contains('div.menu-select-item__title', name).click()
    })
})