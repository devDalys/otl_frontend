describe('Тестирование критических компонентов сервиса', () => {
  it('Тестирование создания ссылки', () => {
    cy.visit('http://localhost:3000/');
    const contentField = cy.getByTestId('contentField');
    const passwordField = cy.getByTestId('passwordField');

    contentField.type('Автотест для проверки функционала!');
    passwordField.type('somepassword');

    const button = cy.getByTestId('createButton');
    button.click();

    cy.getByTestId('successScreen').should('be.visible');
  });
});
