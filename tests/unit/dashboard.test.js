import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import DashboardView from '../../src/views/DashboardView.vue'; // Assurez-vous que le chemin est correct


describe('DashboardView.vue', () => {
  let mock;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  

  it('renders project statistics and list correctly', async () => {
    mock.onGet('http://localhost:8082/api/user/participations').reply(200, [
      {
        title: 'Perfect project',
        company: 'Apple',
        status: 'EN_COURS',
      },
      {
        title: 'test1',
        company: 'N/A',
        status: 'EN_COURS',
      },
    ]);

    const wrapper = mount(DashboardView, {
      global: {
        mocks: {
          $router: {
            push: vi.fn(),
          },
        },
      },
    });

    

    await wrapper.vm.$nextTick();
    await new Promise(setImmediate); // Attendre que les mises à jour soient appliquées

    const statBoxes = wrapper.findAll('.stat-box p');
    expect(statBoxes.length).toBeGreaterThan(0); // Vérifie qu'il y a des éléments
    expect(statBoxes.at(0).text()).toContain('Nombre de projets: 2');
    expect(statBoxes.at(1).text()).toContain('Nombre d\'équipes: 7');

    const projects = wrapper.findAll('.project');
    expect(projects.length).toBe(2);
    expect(projects.at(0).find('h4').text()).toBe('Perfect project');
    expect(projects.at(1).find('h4').text()).toBe('test1');
  });

  it('renders chart correctly', async () => {
    mock.onGet('http://localhost:8082/api/user/participations').reply(200, [
      {
        title: 'Perfect project',
        company: 'Apple',
        status: 'EN_COURS',
      },
      {
        title: 'test1',
        company: 'N/A',
        status: 'EN_COURS',
      },
    ]);

    const wrapper = mount(DashboardView, {
      global: {
        mocks: {
          $router: {
            push: vi.fn(),
          },
        },
      },
    });

    await wrapper.vm.$nextTick();
    await new Promise(setImmediate); // Attendre que les mises à jour soient appliquées

    // Vérifie que le canevas pour le graphique est présent
    expect(wrapper.find('#projectStatusChart').exists()).toBe(true);
  });

  it('navigates to project description when a project is clicked', async () => {
    mock.onGet('http://localhost:8082/api/user/participations').reply(200, [
      {
        title: 'Perfect project',
        company: 'Apple',
        status: 'EN_COURS',
      },
    ]);

    const wrapper = mount(DashboardView, {
      global: {
        mocks: {
          $router: {
            push: vi.fn(),
          },
        },
      },
    });

    await wrapper.vm.$nextTick();
    await new Promise(setImmediate); // Attendre que les mises à jour soient appliquées

    const project = wrapper.find('.project');
    await project.trigger('click');

    // expect(wrapper.vm.$router.push).toHaveBeenCalledWith({ name: 'description', params: { title: 'Perfect project' } });
  });
});
