describe('test constructor page', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.visit('/');
  });

  it('add constructor ingredient', () => {
    cy.get('[data-cy=643d69a5c3f7b9001cfa0941]').contains('Добавить').click();
    cy.get('[data-cy=643d69a5c3f7b9001cfa0942]').contains('Добавить').click();

    cy.get('[data-cy=constructor-ingredients]')
      .contains('Биокотлета из марсианской Магнолии')
      .should('exist');
    cy.get('[data-cy=constructor-ingredients]')
      .contains('Соус Spicy-X')
      .should('exist');
  });

  describe('ingredient modal', () => {
    it('test ingredient modal', () => {
      cy.get('[data-cy=643d69a5c3f7b9001cfa0941]').click();
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
      cy.get('[data-cy=643d69a5c3f7b9001cfa0941]').contains('Добавить').click();
      cy.get('[data-cy=643d69a5c3f7b9001cfa0942]').contains('Добавить').click();
      cy.get('[data-cy=create-order]').click();

      cy.get('[data-cy=order-44890]').contains('44890').should('exist');
      cy.get('[data-cy=modal-close]').last().focus().click();
      cy.get('[data-cy=order-44890]').should('not.exist');

      cy.get('[data-cy=constructor-ingredients]')
        .contains('Краторная булка N-200i')
        .should('not.exist');
      cy.get('[data-cy=constructor-ingredients]')
        .contains('Биокотлета из марсианской Магнолии')
        .should('not.exist');
      cy.get('[data-cy=constructor-ingredients]')
        .contains('Соус Spicy-X')
        .should('not.exist');
    });
  });
});
