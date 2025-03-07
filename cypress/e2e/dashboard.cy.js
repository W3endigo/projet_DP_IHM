describe('DashboardView Component', () => {
    beforeEach(() => {
      cy.intercept('GET', 'http://localhost:8082/api/user/participations', {
        fixture: 'projects.json',
      }).as('getProjects');
  
      cy.visit('/dashboard');
      cy.wait('@getProjects');
    });
  
    it('displays project statistics and list correctly', () => {
      cy.contains('.stat-box p', 'Nombre de projets: 2');
      cy.contains('.stat-box p', 'Nombre d\'équipes: 7');
  
      cy.get('.project').should('have.length', 2);
      cy.contains('.project h4', 'Perfect project');
      cy.contains('.project h4', 'Perfect project2');
    });
  
    it('renders chart correctly', () => {
      cy.get('#projectStatusChart').should('exist');
    });
  
    it('navigates to project description when a project is clicked', () => {
      cy.get('.project').first().click();
      cy.url().should('include', '/project/Perfect%20project');
    });
  });
  