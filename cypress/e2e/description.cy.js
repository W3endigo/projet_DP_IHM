describe('Description Component', () => {
    beforeEach(() => {
      cy.intercept('GET', 'http://localhost:8082/api/user/participations', {
        fixture: 'projects.json',
      }).as('getProjects');
  
      cy.visit('/project/Perfect%20project');
      cy.wait('@getProjects');
    });
  
    it('displays project details correctly', () => {
      cy.contains('h1', 'Perfect project');
      cy.contains('p', 'Description: This is a project.');
      cy.contains('p', 'Chef de projet: john.doe@example.com');
      cy.contains('p', 'Statut actuel: EN_COURS');
      cy.contains('p', 'Date de début: 09-11-2024');
      cy.contains('p', 'Date de fin: 18-03-2025');
      cy.contains('li', 'john.doe@example.com');
      cy.contains('p', 'Entreprise : Apple');
    });
  
    it('navigates back to home when button is clicked', () => {
      cy.contains('button', 'Retour aux projets').click();
      cy.url().should('include', '/home');
    });
  });
  