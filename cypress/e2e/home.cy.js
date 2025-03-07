describe('Home Page', () => {
    beforeEach(() => {
      cy.visit('/');
    });
  
    it('renders the home page correctly', () => {
      cy.get('.title').should('contain.text', 'Liste des projets');
      cy.get('.dashboard-button').should('contain.text', 'Mes projets');
    });
  
    it('fetches and displays projects', () => {
      cy.intercept('GET', 'http://localhost:8082/api/user/participations', {
        statusCode: 200,
        body: [
          { id: 1, title: 'Project 1', company: 'Company A', status: 'EN_COURS', start_date: '2025-01-01', end_date: '2025-12-31', participants: [{ email: 'participant1@example.com' }] },
          { id: 2, title: 'Project 2', company: 'Company B', status: 'TERMINE', start_date: '2024-01-01', end_date: '2024-12-31', participants: [{ email: 'participant2@example.com' }] }
        ]
      }).as('getProjects');
  
      cy.wait('@getProjects', { timeout: 20000 });
      cy.get('.project').should('have.length', 2);
      cy.get('.project').first().contains('Project 1');
    });
  
    it('filters projects by name', () => {
      cy.intercept('GET', 'http://localhost:8082/api/user/participations', {
        statusCode: 200,
        body: [
          { id: 1, title: 'Project 1', company: 'Company A', status: 'EN_COURS', start_date: '2025-01-01', end_date: '2025-12-31', participants: [{ email: 'participant1@example.com' }] },
          { id: 2, title: 'Project 2', company: 'Company B', status: 'TERMINE', start_date: '2024-01-01', end_date: '2024-12-31', participants: [{ email: 'participant2@example.com' }] }
        ]
      }).as('getProjects');
  
      cy.wait('@getProjects', { timeout: 20000 });
      cy.get('input[type="text"]').type('Project 1');
      cy.get('.project').should('have.length', 1);
      cy.get('.project').first().contains('Project 1');
    });
  
    it('navigates to the project details page', () => {
      cy.intercept('GET', 'http://localhost:8082/api/user/participations', {
        statusCode: 200,
        body: [
          { id: 1, title: 'Project 1', company: 'Company A', status: 'EN_COURS', start_date: '2025-01-01', end_date: '2025-12-31', participants: [{ email: 'participant1@example.com' }] }
        ]
      }).as('getProjects');
  
      cy.wait('@getProjects', { timeout: 20000 });
      cy.get('.project').first().click();
    //   cy.url().should('include', '/project-description');  // Vérifier la route après clic
    });
  });
  