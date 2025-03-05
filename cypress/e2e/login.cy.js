describe("Login Page", () => {
  beforeEach(() => {
    cy.visit("/login"); // Assurez-vous que la route est correcte
  });

  it("Affiche la page de connexion", () => {
    cy.contains("Connexion").should("be.visible");
    cy.contains("Inscription").should("be.visible");
  });

  it("Change vers l'onglet inscription", () => {
    cy.contains("Inscription").click();
    cy.get("button.active").should("contain", "Inscription");
  });

  it("Empêche l'inscription si les mots de passe sont différents", () => {
    cy.contains("Inscription").click();
    cy.get('input[placeholder="Mot de passe"]').type("12345678");
    cy.get('input[placeholder="Confirmer le mot de passe"]').type("87654321");
    cy.get("form").submit();
    cy.contains("Les mots de passe ne correspondent pas.").should("be.visible");
  });

  it("Se connecte avec des identifiants valides", () => {
    cy.intercept("PUT", "http://api_projet:8082/api/auth/login", {
      statusCode: 200,
      body: { token: "fake-jwt-token" },
    });

    cy.get('input[placeholder="Email"]').type("test@example.com");
    cy.get('input[placeholder="Mot de passe"]').type("password123");
    cy.get("form").submit();

    cy.url().should("include", "/create-project");
  });

  it("Affiche un message d'erreur avec des identifiants invalides", () => {
    cy.intercept("PUT", "http://api_projet:8082/api/auth/login", {
      statusCode: 401,
      body: { message: "Identifiants invalides" },
    });

    cy.get('input[placeholder="Email"]').type("test@example.com");
    cy.get('input[placeholder="Mot de passe"]').type("wrongpassword");
    cy.get("form").submit();

    cy.contains("Identifiants invalides").should("be.visible");
  });
});
