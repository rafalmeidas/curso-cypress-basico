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

  it.only('alerts on invalid email', () => {
    cy.get('#email').type('teste-email.com');

    cy.get('#email.invalid').should('exist');
  });
});
