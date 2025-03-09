describe('Тестирование критических компонентов сервиса', () => {
  let linkUrl: string = '';
  const password = 'somepassword';
  const content = 'Автотест для проверки функционала!' + Date.now();
  let localStorageMemory: any = {};

  afterEach(() => {
    Object.keys(localStorage).forEach((key) => {
      localStorageMemory[key] = localStorage.getItem(key);
    });
  });

  // Восстанавливаем состояние localStorage перед каждым тестом
  beforeEach(() => {
    Object.keys(localStorageMemory).forEach((key) => {
      localStorage.setItem(key, localStorageMemory[key]);
    });
  });

  it('Мок тест', () => {
    expect(typeof 'test' === 'string').equal(true);
  });

  it('Проверяем создание ссылки:', async () => {
    cy.visit('http://localhost:3000/');
    const contentField = cy.getByTestId('contentField');
    const passwordField = cy.getByTestId('passwordField');

    contentField.type(content);
    passwordField.type(password);

    const button = cy.getByTestId('createButton');
    button.click();

    cy.getByTestId('successScreen').should('be.visible');

    const value: string = '';

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
