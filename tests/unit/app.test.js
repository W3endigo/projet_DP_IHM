import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import App from '../../src/App.vue';
import Header from '../../src/components/Header.vue';
import LoginView from '../../src/views/LoginView.vue';
import axios from 'axios';

vi.mock('axios');

describe('App.vue', () => {
    let pushMock;
  
    beforeEach(() => {
      localStorage.clear();
      pushMock = vi.fn();
    });
  
    it('affiche LoginView si non connecté', async () => {
      const wrapper = mount(App, {
        global: {
          mocks: { $router: { push: pushMock } },
        },
      });
      expect(wrapper.findComponent(LoginView).exists()).toBe(true);
      expect(wrapper.findComponent(Header).exists()).toBe(false);
    });
  
    it('affiche Header et router-view si connecté', async () => {
      localStorage.setItem('token', 'fakeToken');
      axios.get.mockResolvedValue({ data: { firstName: 'John' } });
  
      const wrapper = mount(App, {
        global: {
          mocks: { $router: { push: pushMock } },
        },
      });
      await wrapper.vm.checkAuth(); 
  
      expect(wrapper.findComponent(Header).exists()).toBe(true);
      expect(wrapper.findComponent(LoginView).exists()).toBe(false);
    });
  
    it('supprime le token et redirige si l’authentification échoue', async () => {
      localStorage.setItem('token', 'invalidToken');
      axios.get.mockRejectedValue(new Error('Unauthorized'));
  
      const wrapper = mount(App, {
        global: {
          mocks: { $router: { push: pushMock } },
        },
      });
  
      await wrapper.vm.checkAuth();
      expect(localStorage.getItem('token')).toBeNull();
      expect(pushMock).toHaveBeenCalledWith('/login'); // Vérifie que la redirection est appelée
    });
  
    it('gère correctement handleLoginSuccess', async () => {
      const wrapper = mount(App, {
        global: {
          mocks: { $router: { push: pushMock } },
        },
      });
  
      wrapper.vm.handleLoginSuccess('John');
  
      expect(wrapper.vm.isLoggedIn).toBe(true);
      expect(wrapper.vm.userFirstName).toBe('John');
    });
  });