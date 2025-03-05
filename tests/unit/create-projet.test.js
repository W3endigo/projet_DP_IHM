import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import CreateProjectView from "../../src/views/CreateProjectView.vue";

describe("CreateProjectView.vue", () => {
    beforeEach(() => {
        localStorage.setItem("token", "fake-jwt-token"); // Simule un token valide avant chaque test
      });
    
      it("soumet le formulaire avec les données correctes", async () => {
        const wrapper = mount(CreateProjectView);
    
        await wrapper.setData({
          form: {
            email_chef_project: "chef@example.com",
            title: "Nouveau Projet",
            description: "Description test",
            status: "EN_COURS",
            start_date: "2025-03-05",
            end_date: "2025-03-10",
            company: "Entreprise X",
            participants: [{ email: "test@example.com" }]
          }
        });
    
        await wrapper.find("form").trigger("submit.prevent");
    
        expect(wrapper.vm.errorMessage).toBeNull(); // Vérifie qu'il n'y a pas d'erreur d'authentification
      });
});
