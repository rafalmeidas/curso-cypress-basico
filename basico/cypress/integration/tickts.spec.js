describe('Tickets', () => {
  beforeEach(() =>
    cy.visit('https://ticket-box.s3.eu-central-1.amazonaws.com/index.html')
  );

  // inputs
  it('fills all the text input fields', () => {
    const firstName = 'Rafael';
    const lastName = 'Almeida';

    cy.get('#first-name').type(firstName);
    cy.get('#last-name').type(lastName);
    cy.get('#email').type('testing_cypress@teste.com.br');
    cy.get('#requests').type('Vegetarian');
    cy.get('#signature').type(`${firstName} ${lastName}`);
  });

  // select
  it('select two tickets', () => {
    cy.get('#ticket-quantity').select('2');
  });

  // radio button
  it("select 'vip' ticket type", () => {
    cy.get('#vip').check();
  });

  // checkbox
  it("selects 'social media' checkbox", () => {
    cy.get('#social-media').check();
  });
  it("selects 'friend', and 'publication', then uncheck 'friend'", () => {
    cy.get('#friend').check();
    cy.get('#publication').check();

    cy.get('#friend').uncheck();
  });

  it("has TICKETBOX header's heading", () => {
    cy.get('header h1').should('contain', 'TICKETBOX');
  });

  it('alerts on invalid email', () => {
    cy.get('#email').as('email').type('teste-email.com');

    cy.get('#email.invalid').as('invalidEmail').should('exist');

    cy.get('@email').clear().type('teste@gmail.com');

    cy.get('#email.invalid').should('not.exist');
  });

  it('fills and reset the form', () => {
    const firstName = 'Rafael';
    const lastName = 'Almeida';
    const fullName = `${firstName} ${lastName}`;

    cy.get('#first-name').type(firstName);
    cy.get('#last-name').type(lastName);
    cy.get('#email').type('testing_cypress@teste.com.br');
    cy.get('#ticket-quantity').select('2');
    cy.get('#vip').check();
    cy.get('#friend').check();
    cy.get('#requests').type('Jaca');

    cy.get('.agreement p').should(
      'contain',
      `I, ${fullName}, wish to buy 2 VIP tickets.`
    );

    cy.get('#agree').click();
    cy.get('#signature').type(fullName);

    cy.get("button[type='submit']")
      .as('submitButton')
      .should('not.be.disabled');

    cy.get("button[type='reset']").as('resetButton').click();

    cy.get('@submitButton').should('be.disabled');
  });

  it.only('fills mandatory dields using support command', () => {
    const customer = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe2021@example.com',
    };

    cy.fillMandatoryFields(customer);

    cy.get("button[type='submit']")
      .as('submitButton')
      .should('not.be.disabled');

    cy.get('#agree').uncheck();

    cy.get('@submitButton').should('be.disabled');
  });
});
