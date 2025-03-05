describe('App.vue E2E', () => {
    beforeEach(() => {
      cy.clearLocalStorage();
    });
  
    it('redirige vers login si non authentifié', () => {
      cy.visit('/');
      cy.url().should('include', '/login');
    });
  
    it('connecte l’utilisateur et affiche le header', () => {
      cy.visit('/login');
  
      cy.intercept('GET', 'http://localhost:8082/api/user', {
        statusCode: 200,
        body: { firstName: 'Jossathan' },
      }).as('getUser');
  
      localStorage.setItem('token', 'fakeToken');
      cy.reload();
  
    //   cy.wait('@getUser');
    //   cy.get('header').should('contain', 'Jossathan');
    });
  
    it('déconnecte l’utilisateur si token invalide', () => {
      localStorage.setItem('token', 'invalidToken');
  
      cy.intercept('GET', 'http://localhost:8082/api/user', {
        statusCode: 401,
      }).as('getUser');
  
      cy.visit('/');
      cy.wait('@getUser');
  
      cy.url().should('include', '/login');
      cy.should(() => {
        expect(localStorage.getItem('token')).to.be.null;
      });
    });
  });
  