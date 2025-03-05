describe("Création de projet", () => {
    beforeEach(() => {
      cy.visit("/create-project"); // Assurez-vous que la route est correcte
    });
  
    it("Affiche le formulaire de création de projet", () => {
      cy.contains("Créer un nouveau projet");
      cy.get("form").should("exist");
    });
  
    it("Ajoute un participant", () => {
      cy.get("#participants").type("test@example.com");
      cy.get("button[type='button']").click();
      cy.contains("test@example.com").should("exist");
    });
  
    it("Soumet le formulaire correctement", () => {
      cy.get("#email_chef_project").type("chef@example.com");
      cy.get("#title").type("Nouveau Projet");
      cy.get("#description").type("Ceci est une description de test.");
      cy.get("#status").select("EN_COURS");
      cy.get("#start_date").type("2025-03-05");
      cy.get("#end_date").type("2025-03-10");
      cy.get("#companies").select("Apple");
      cy.get("#participants").type("membre@example.com{enter}");
  
      cy.get("button[type='submit']").click();
      cy.url().should("include", "/dashboard"); // Vérifie la redirection
    });
  });
  