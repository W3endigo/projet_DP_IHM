import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Description from '../../src/views/Description.vue';

describe('Description.vue', () => {
  let mock;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  it('renders project details correctly', async () => {
    mock.onGet('http://localhost:8082/api/user/participations').reply(200, [
      {
        title: 'Perfect project',
        description: 'This is a project.',
        email_chef_project: 'john.doe@example.com',
        status: 'EN_COURS',
        start_date: '09-11-2024',
        end_date: '18-03-2025',
        participants: [{ email: 'john.doe@example.com' }],
        compagnies: [{ name: 'Apple' }],
      },
    ]);

    const wrapper = mount(Description, {
      global: {
        mocks: {
          $route: {
            params: { title: 'Perfect project' },
          },
          $router: {
            push: vi.fn(),
          },
        },
      },
    });

    await wrapper.vm.$nextTick();
    await new Promise(setImmediate); // Attendre que les mises à jour soient appliquées

    expect(wrapper.find('.project-title').text()).toBe('Perfect project');
    expect(wrapper.find('.project-details').exists()).toBe(true);

    const details = wrapper.findAll('.project-details p');
    expect(details.at(0).text()).toContain('Description: This is a project.');
    expect(details.at(1).text()).toContain('Chef de projet: john.doe@example.com');
    expect(details.at(2).text()).toContain('Statut actuel: EN_COURS');
    expect(details.at(3).text()).toContain('Date de début: 09-11-2024');
    expect(details.at(4).text()).toContain('Date de fin: 18-03-2025');

    const participantList = wrapper.findAll('.project-details ul li');
    expect(participantList.at(0).text()).toBe('john.doe@example.com');

    expect(details.at(6).text()).toContain('Entreprise : Apple');
  });

  it('shows loading message when project is not loaded', async () => {
    mock.onGet('http://localhost:8082/api/user/participations').reply(200, []);

    const wrapper = mount(Description, {
      global: {
        mocks: {
          $route: {
            params: { title: 'Non-existent project' },
          },
          $router: {
            push: vi.fn(),
          },
        },
      },
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.find('.project-details').exists()).toBe(false);
    expect(wrapper.text()).toContain('Chargement des détails du projet...');
  });

  it('navigates back to home when button is clicked', async () => {
    const wrapper = mount(Description, {
      global: {
        mocks: {
          $route: {
            params: { title: 'Perfect project' },
          },
          $router: {
            push: vi.fn(),
          },
        },
      },
    });

    await wrapper.find('.back-button').trigger('click');

    // Vérifie que la méthode push a été appelée avec le bon argument
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith('/home');
  });
});
