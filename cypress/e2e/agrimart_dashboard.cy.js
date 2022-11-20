/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe('Dashboard item checking', () => {
    beforeEach(() => {
      // Cypress starts out with a blank slate for each test
      // so we must tell it to visit our website with the `cy.visit()` command.
      // Since we want to visit the same URL at the start of all our tests,
      // we include it in our beforeEach function so that it runs before each test
      cy.visit('http://localhost:5000/admin/633194114f5e00100cac051c')
    })
  
    it('displays users statics', () => {
      cy.get('.Farmers').first().should('have.text', 'Farmers')
      cy.get('.Buyers').last().should('have.text', 'Buyers')
      cy.get('.Officers').last().should('have.text', 'Officers')
      cy.get('.POfficer').last().should('have.text', "Prime Officer's percentage")
    })

})