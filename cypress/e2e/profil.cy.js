describe('Test du Profil Utilisateur', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:8082/api/user', {
      statusCode: 200,
      body: { firstName: 'John', lastName: 'Doe', company: 'TechCorp', password: '' }
    }).as('getUser'); // Définir l'interception AVANT cy.visit()

    cy.intercept('GET', 'http://localhost:8082/api/companies', {
      statusCode: 200,
      body: [{ id: 1, name: 'TechCorp' }, { id: 2, name: 'BizInc' }]
    });

    cy.visit('/profil'); // Ensuite seulement, on visite la page

    cy.wait('@getUser', { timeout: 20000 }); // Augmenter le timeout si besoin
  });

  it('Affiche les informations du profil', () => {
    cy.get('input').first().should('be.visible').and('have.value', 'Doe');
  });
});
