describe('test constructor page', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.visit('/');
  });

  cy.get('[data-cy=643d69a5c3f7b9001cfa0941]').as('main-ingredient');
  cy.get('[data-cy=643d69a5c3f7b9001cfa0942]').as('sauce-ingredient');
  cy.get('[data-cy=order-44890]').as('modal-order');
  cy.get('[data-cy=constructor-ingredients]').as('constructor');

  it('add constructor ingredient', () => {
    cy.get('@main-ingredient').contains('Добавить').click();
    cy.get('@sauce-ingredient').contains('Добавить').click();

    cy.get('[data-cy=constructor-ingredients]')
      .contains('Биокотлета из марсианской Магнолии')
      .should('exist');
    cy.get('[data-cy=constructor-ingredients]')
      .contains('Соус Spicy-X')
      .should('exist');
  });

  describe('ingredient modal', () => {
    it('test ingredient modal', () => {
      cy.get('@main-ingredient').click();
      cy.get('#modals')
        .contains('Биокотлета из марсианской Магнолии')
        .should('exist');
      cy.get('[data-cy=modal-close]').click();
      cy.get('#modals')
        .contains('Биокотлета из марсианской Магнолии')
        .should('not.exist');
    });
  });

  describe('create order', () => {
    beforeEach(() => {
      cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
      cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
      cy.intercept('POST', 'api/orders', { fixture: 'order.json' });
      cy.visit('/');
      window.localStorage.setItem('refreshToken', 'refreshToken');
      cy.setCookie('accessToken', 'accessToken');
    });

    it('test create order', () => {
      cy.get('[data-cy=643d69a5c3f7b9001cfa093c]').contains('Добавить').click();
      cy.get('@main-ingredient').contains('Добавить').click();
      cy.get('@sauce-ingredient').contains('Добавить').click();
      cy.get('[data-cy=create-order]').click();

      cy.get('@modal-order').contains('44890').should('exist');
      cy.get('[data-cy=modal-close]').last().focus().click();
      cy.get('@modal-order').should('not.exist');

      cy.get('@constructor')
        .contains('Краторная булка N-200i')
        .should('not.exist');
      cy.get('@constructor')
        .contains('Биокотлета из марсианской Магнолии')
        .should('not.exist');
      cy.get('@constructor').contains('Соус Spicy-X').should('not.exist');
    });
  });
});
