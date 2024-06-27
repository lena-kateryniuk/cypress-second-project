/// <reference types="cypress" />

describe('The Dims & payload column', () => {
  beforeEach(() => {
    cy.login().then(() => {
      cy.visit('/fleets/trucks');
    })
  })

  it.only('should display correct information in the table', () => {
    cy.intercept('GET', '/api/v1/trucks?page=1&page_size=10&archived=false').as('getTrucks');
    cy.wait('@getTrucks').its('response.statusCode').should('eq', 200);
    cy.get('@getTrucks').then(interception => {
      const response = interception.response.body
      const items = response.items;

        items.forEach((item, index) => {
          if (item.trailer) { 
            const trailer = item.trailer;
            cy.get('div[class=v-table__wrapper]') 
              .find('tbody tr') 
              .eq(index) 
              .within(() => {
                cy.get('[data-qa=truck-trailer-dims]').should('contain.text', trailer.length.toString());
                cy.get('[data-qa=truck-trailer-dims]').should('contain.text', trailer.min_height.toString());
                cy.get('[data-qa=truck-trailer-dims]').should('contain.text', trailer.min_width.toString())
                cy.get('[data-qa=truck-trailer-dims]').siblings().should('contain.text', trailer.payload.toString() + ' lbs');
              });
          } else {
            cy.log(`Property trailer in item with index ${index} equal null.`);
          }
        })
    })
  })
})