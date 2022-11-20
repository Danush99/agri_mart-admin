/// <reference types="cypress" />

context('Actions', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/')
    })
  
    // https://on.cypress.io/interacting-with-elements
  
    it('Giving email inputs', () => {
      // https://on.cypress.io/type
      cy.get('.action-email')
        .type('fake@email.com').should('have.value', 'fake@email.com')
  
        // .type() with special character sequences
        .type('{leftarrow}{rightarrow}{uparrow}{downarrow}')
        .type('{del}{selectall}{backspace}')
  
        // .type() with key modifiers
        .type('{alt}{option}') //these are equivalent
        .type('{ctrl}{control}') //these are equivalent
        .type('{meta}{command}{cmd}') //these are equivalent
        .type('{shift}')
  
        // Delay each keypress by 0.1 sec
        .type('slow.typing@email.com', { delay: 100 })
        .should('have.value', 'slow.typing@email.com')
  
    })

    it('Giving password inputs', () => {
        // https://on.cypress.io/focus
        cy.get('.action-focus').focus()
          .should('have.class', 'focus')
    })

})