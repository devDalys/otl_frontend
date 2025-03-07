describe('Тестирование критических компонентов сервиса', () => {
  let linkUrl: string = '';
  const password = 'somepassword';
  const content = 'Автотест для проверки функционала!' + Date.now();

  it('Проверяем создание ссылки:', async () => {
    cy.visit('http://localhost:3000/');
    const contentField = cy.getByTestId('contentField');
    const passwordField = cy.getByTestId('passwordField');

    contentField.type(content);
    passwordField.type(password);

    const button = cy.getByTestId('createButton');
    button.click();

    cy.getByTestId('successScreen').should('be.visible');

    const value: string = await new Promise((res) => {
      cy.getByTestId('successFullCreateInput')
        .invoke('val')
        .then((value) => res(value as string));
    });

    expect(typeof value === 'string').equal(true);
    linkUrl = value;
  });
  it('Проверяем открытие ссылки:', () => {
    cy.visit(linkUrl);

    const passwordField = cy.getByTestId('passwordForOpen');
    passwordField.type(password);

    const openButton = cy.getByTestId('openButton');
    openButton.click();

    const contentField = cy.getByTestId('openedContent');
    contentField.should('contain.text', content);
  });
});
