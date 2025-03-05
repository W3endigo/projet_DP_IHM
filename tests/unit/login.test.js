import { describe, it, expect, beforeEach, vi } from "vitest";
import { mount } from "@vue/test-utils";
import LoginView from "../../src/views/LoginView.vue";
import axios from "axios";

// Mock Axios
vi.mock("axios");

describe("LoginView.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(LoginView);
  });

  it("affiche la page de connexion par défaut", () => {
    expect(wrapper.find("button.active").text()).toBe("Connexion");
  });

  it("change d'onglet lorsque 'Inscription' est cliqué", async () => {
    await wrapper.findAll("button")[1].trigger("click"); // Clique sur "Inscription"
    expect(wrapper.find("button.active").text()).toBe("Inscription");
  });

  it("affiche un message d'erreur si les mots de passe ne correspondent pas", async () => {
    await wrapper.findAll("button")[1].trigger("click"); // Aller sur "Inscription"

    // Remplir les champs
    await wrapper.find('input[placeholder="Mot de passe"]').setValue("12345678");
    await wrapper.find('input[placeholder="Confirmer le mot de passe"]').setValue("87654321");

    await wrapper.find("form").trigger("submit.prevent");

    expect(wrapper.find(".error-message").text()).toBe("Les mots de passe ne correspondent pas.");
  });

  it("appelle l'API de connexion avec les bonnes données", async () => {
    axios.put.mockResolvedValue({ data: { token: "fake-jwt-token" } });

    await wrapper.find('input[placeholder="Email"]').setValue("test@example.com");
    await wrapper.find('input[placeholder="Mot de passe"]').setValue("password123");

    await wrapper.find("form").trigger("submit.prevent");

    expect(axios.put).toHaveBeenCalledWith("http://api_projet:8082/api/auth/login", {
      email: "test@example.com",
      password: "password123",
    });
  });

  it("affiche un message d'erreur en cas d'échec de connexion", async () => {
    axios.put.mockRejectedValue({ response: { data: { message: "Identifiants invalides" } } });

    await wrapper.find('input[placeholder="Email"]').setValue("test@example.com");
    await wrapper.find('input[placeholder="Mot de passe"]').setValue("wrongpassword");

    await wrapper.find("form").trigger("submit.prevent");

    expect(wrapper.find(".error-message").text()).toBe("Identifiants invalides");
  });
});
