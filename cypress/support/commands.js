
// Signup Command
Cypress.Commands.add('signup',  (username, email, password) => {
    
    cy.get('#username').click().type(username);
    cy.get('input[type="email"]').eq(0).type(email);
    cy.get('#password').type(password);
    cy.get('.button').click();

});

// Mock the captcha response
Cypress.Commands.add('mockRecaptcha', () => {
    cy.window().then(win => {
      win.grecaptcha = {
          ready: (callback) => callback(),
          execute: () => {
            return new Promise((resolve) => {
          resolve('fake-token'); // This simulates the token you would get from reCAPTCHA
        });
        }
     };
   });
});
