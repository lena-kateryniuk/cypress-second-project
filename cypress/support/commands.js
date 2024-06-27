// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add('login', () => {
    cy.visit('/login');
    cy.get('input[type=email]').type(Cypress.env('email'));
    cy.get('input[type=password]').type(Cypress.env('password'));
    cy.get('button[type=button]').click().then(() => {
        cy.get('button').find('span').contains('Test User').should('be.visible')
    })
});