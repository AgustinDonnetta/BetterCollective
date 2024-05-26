const { faker } = require('@faker-js/faker');

describe('Sign-Up form tests', () => {

  beforeEach('', () => {
    cy.visit('/')
  })

  it('01 Should succesfully sign up into the web page ', () => {
    //Captcha Bypass
    cy.mockRecaptcha();
    //Get a random name
    function generateRandomUsername() {
      let username = faker.internet.userName().toLowerCase();
      username = username.replace(/[^a-z0-9]/g, ''); // Remove non-alphanumeric characters
      while (!/^[a-z0-9]+$/.test(username)) { // Ensure username contains only letters and numbers
          username = faker.internet.userName().toLowerCase().replace(/[^a-z0-9]/g, '');
      }
      return username;
  }   
    const randomUsername = generateRandomUsername();
    // Get a random email
    const randomEmail = faker.internet.email();
    
    // Steps
    cy.signup(randomUsername,randomEmail,Cypress.env('password'));

    // Expected result
    cy.url().should('contain', 'https://rotogrinders.com/pages/welcome-to-rotogrinders-477777')
    cy.get('h1').should('contain', 'Welcome to RotoGrinders! Thanks for signing up!')
  });

  it('02 Should try to sign up with an existing username', () => {
    cy.mockRecaptcha();
    // Get a random email
    const randomEmail = faker.internet.email(); 

    cy.signup("agudonnetta",randomEmail,Cypress.env('password'))

    //Expected result
    cy.get('.notification').should("contain", "That username is already taken.")
  });

  it('03 Should try to sign up without a username ', () => {
    cy.mockRecaptcha();

    //Steps
    cy.get('input[type="email"]').eq(0).type("email@mail.com");
    cy.get('#password').type("password");
    cy.get('.button').click();

    //Expected result
    cy.get('.notification').should("contain", "A username is required")
    cy.get('#password').should("be.empty")
  });

  it('04 Should try to sign up with a username containing spaces ', () => {
    cy.mockRecaptcha();
    // Get a random email
    const randomEmail = faker.internet.email(); 

    cy.signup("Agustin Donnetta",randomEmail,Cypress.env('password'))

    //Expected result
    cy.get('.notification').should("contain", "Your username may only contain letters and numbers.")
    cy.get('#password').should("be.empty")
  });

  it('05 Should try to sign up with a username containing special characters', () => {
    cy.mockRecaptcha();
    // Get a random email
    const randomEmail = faker.internet.email(); 

    cy.signup("Agus123!",randomEmail,Cypress.env('password'))

    //Expected result
    cy.get('.notification').should("contain", "Your username may only contain letters and numbers.")
    cy.get('#password').should("be.empty")
  });

  it('06 Should try to sign up with an existing email ', () => {
    cy.mockRecaptcha();
    //Get a random name
    function generateRandomUsername() {
      let username = faker.internet.userName().toLowerCase();
      username = username.replace(/[^a-z0-9]/g, ''); // Remove non-alphanumeric characters
      while (!/^[a-z0-9]+$/.test(username)) { // Ensure username contains only letters and numbers
          username = faker.internet.userName().toLowerCase().replace(/[^a-z0-9]/g, '');
      }
      return username;
  }    
    const randomUsername = generateRandomUsername();
    
    //Steps
    cy.signup(randomUsername,"agu.donnetta@gmail.com",Cypress.env('password'));

    // Expected result
    cy.get('.notification').should("contain", "That email is already taken.")
  });


  it('07 Should try to sign up with an invalid email ', () => {
    cy.mockRecaptcha();
    //Get a random name
    function generateRandomUsername() {
      let username = faker.internet.userName().toLowerCase();
      username = username.replace(/[^a-z0-9]/g, ''); // Remove non-alphanumeric characters
      while (!/^[a-z0-9]+$/.test(username)) { // Ensure username contains only letters and numbers
          username = faker.internet.userName().toLowerCase().replace(/[^a-z0-9]/g, '');
      }
      return username;
  }    
    const randomUsername = generateRandomUsername();
    
    //Steps
    cy.signup(randomUsername,"agu.donnetta",Cypress.env('password'));

    // Expected result
    cy.get('input[type="email"]:invalid')
      .should('exist')
      .and('have.prop', 'validationMessage')
      .then((validationMessage) => {
        expect(validationMessage).to.include("Please include an '@' in the email address.");
      });

  });

  it('08 Should try to signup without an email ', () => {
    cy.mockRecaptcha();
    
    //Steps
    cy.get('#username').click().type("bestusernameever");
    cy.get('#password').type("password");
    cy.get('.button').click();

    // Expected result
    cy.get('.notification').should("contain", "An email is required")

  });

  it('09 Should try to signup without a password ', () => {
    cy.mockRecaptcha();
    
    //Steps
    cy.get('#username').click().type("bestusernameever");
    cy.get('input[type="email"]').eq(0).type('email@mail.com');
    cy.get('.button').click();

    // Expected result
    cy.get('.notification').should("contain", "A password is required")

  });

})