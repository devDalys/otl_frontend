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

  it('Проверяем создание ссылки', () => {
    cy.visit('/');
    cy.getByTestId('contentField').type(content);
    cy.getByTestId('passwordField').type(password);

    cy.getByTestId('createButton').click();

    cy.getByTestId('successScreen').should('be.visible');

    cy.getByTestId('successFullCreateInput').then((value) => {
      const url = value.attr('content');
      cy.log(`Созданная ссылка: ${url}`);
      expect(typeof url === 'string').equal(true);
      linkUrl = url as string;
    });
  });

  it('Проверяем открытие ссылки', () => {
    //Чтобы не стреляли рейтлимиты
    cy.wait(1000);

    cy.visit(linkUrl);

    cy.getByTestId('passwordForOpen').type(password);

    cy.getByTestId('openButton').click();

    cy.getByTestId('openedContent').should('contain.text', content);
  });
});
