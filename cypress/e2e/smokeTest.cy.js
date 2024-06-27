/// <reference types="cypress" />

describe('The Trucks Page', () => {
  beforeEach(() => {
    cy.login().then(() => {
      cy.visit('/fleets/trucks');
    })
  })

  it('should load successfully', () => {
    cy.request('/fleets/trucks').then((response) => {
      expect(response.status).to.eq(200);
    });
  })

  it('should have main components', () => {
    cy.get('div').contains('Trucks').should('be.visible');
    cy.get('button[id=create-truck-btn]').contains('Create new').should('be.visible')
    cy.get('form[role=presentation]').should('be.visible')
    cy.get('[data-qa=search-results]').contains(' results found')
    cy.get('table').should('exist').should('be.visible')
    cy.get('table').within(() => {
      cy.get('thead').should('be.visible');
      cy.get('tbody').should('be.visible');
      cy.get('tbody tr').should('have.length', 5)
    });
    cy.get('div[class=v-data-table-footer]').should('exist').should('be.visible')
  })


  it('should get information about tracks from response', () => {
    cy.intercept('GET', '/api/v1/trucks?page=1&page_size=10&archived=false').as('getTrucks');
    cy.wait('@getTrucks').its('response.statusCode').should('eq', 200);
    
    cy.get('@getTrucks').then(interception => {
      const response = interception.response.body
      const items = response.items

      items.forEach(item => {
          expect(item).to.have.property('number');
          expect(item).to.have.property('status');
          expect(item).to.have.property('driver');
          expect(item).to.have.property('trailer');
          expect(item).to.have.property('available_location');
          expect(item).to.have.property('current_location');
      }) 
    })
  })
})