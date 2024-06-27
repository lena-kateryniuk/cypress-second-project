/// <reference types="cypress" />

describe('The Trucks Filter', () => {
  beforeEach(() => {
    cy.login().then(() => {
      cy.visit('/fleets/trucks');
    })
  })

  it('should have "number" filter that works correctly with valid search word', () => {
    let searchWord = 'Truck1';

    cy.intercept('GET', '/api/v1/trucks?number=Truck1&page=1&page_size=10&archived=false').as('getTrucks');
    cy.get('form').find('.v-row').children().contains('Main information');
    cy.get('[data-qa=number]').find('label').contains('Number').parent().type(searchWord);
    cy.get('[id=search--apply-btn]').click();
    cy.wait('@getTrucks').its('response.statusCode').should('eq', 200);
    cy.get('a[data-qa=truck-number]').each(($el) => {
      cy.wrap($el).should('contain.text', searchWord);
    })
  })

  it('should have "number" filter that works correctly with NOTvalid search word', () => {
    let searchWord = 'Truck78';

    cy.intercept('GET', '/api/v1/trucks?number=Truck78&page=1&page_size=10&archived=false').as('getTrucks');
    cy.get('[data-qa=number]').find('label').contains('Number').parent().type(searchWord);
    cy.get('[id=search--apply-btn]').click();
    cy.wait('@getTrucks').its('response.statusCode').should('eq', 200);
    cy.get('td[colspan=6]').contains('No data available')
  })
})

  