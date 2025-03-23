const nameField = 'Autotest';
const contentField = `Какой-то текст для автотеста, который будет прогоняться раз в час. Конкретно сейчас время ${new Date().toLocaleString()}`;
const emailField = 'autotest@mail.ru';

describe('Тестирование страницы помощи', () => {
  it('Проверяем отправку формы помощи', () => {
    cy.visit('/help');
    cy.getByTestId('helpName').type(nameField);
    cy.getByTestId('helpContent').type(contentField);
    cy.getByTestId('helpEmail').type(emailField);
    cy.getByTestId('helpSubmitButton').click();

    cy.getByTestId('formNotification').should('be.visible');

    cy.getByTestId('helpName').should('be.empty');
    cy.getByTestId('helpContent').should('be.empty');
    cy.getByTestId('helpEmail').should('be.empty');
  });
});
