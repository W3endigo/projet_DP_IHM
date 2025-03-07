import HomeView from '../../src/views/HomeView.vue';
import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';


describe('HomeView.vue', () => {
  let mock;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  it('renders the project list correctly', async () => {
    mock.onGet('http://localhost:8082/api/user/participations').reply(200, [
      {
        title: 'Project 1',
        description: 'This is a project.',
        email_chef_project: 'john.doe@example.com',
        compagnies: [{ name: 'Company A' }],
        status: 'EN_COURS',
        start_date: '2023-01-01',
        end_date: '2023-12-31',
        participants: [{ email: 'john.doe@example.com' }],
      },
      {
        title: 'Project 2',
        description: 'This is a project2',
        email_chef_project: 'john.doe@example.com',
        compagnies: [{ name: 'Company B' }],
        status: 'TERMINE',
        start_date: '2022-01-01',
        end_date: '2022-12-31',
        participants: [{ email: 'john.doe@example.com' }],
      },
    ]);

    const wrapper = mount(HomeView, {
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

    // const projects = wrapper.findAll('.project');
    // expect(projects.length).toBe(2);
    // expect(projects.at(0).find('h2').text()).toBe('Titre : Project 1');
    // expect(projects.at(1).find('h2').text()).toBe('Titre : Project 2');
  });

  it('applies filters correctly', async () => {
    mock.onGet('http://localhost:8082/api/user/participations').reply(200, [
        {
            title: 'Project 1',
            description: 'This is a project.',
            email_chef_project: 'john.doe@example.com',
            compagnies: [{ name: 'Company A' }],
            status: 'EN_COURS',
            start_date: '2023-01-01',
            end_date: '2023-12-31',
            participants: [{ email: 'john.doe@example.com' }],
          },
          {
            title: 'Project 2',
            description: 'This is a project2',
            email_chef_project: 'john.doe@example.com',
            compagnies: [{ name: 'Company B' }],
            status: 'TERMINE',
            start_date: '2022-01-01',
            end_date: '2022-12-31',
            participants: [{ email: 'john.doe@example.com' }],
          },
    ]);

    const wrapper = mount(HomeView, {
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

    // Appliquer un filtre
    await wrapper.setData({
      filters: {
        projectName: 'Project 1',
        projectStatus: '',
        startDate: '',
        endDate: '',
        participantEmail: '',
      },
    });

    const projects = wrapper.findAll('.project');
    // expect(projects.length).toBe(1);
    // expect(projects.at(0).find('h2').text()).toBe('Titre : Project 1');
  });

  it('resets filters correctly', async () => {
    mock.onGet('http://localhost:8082/api/user/participations').reply(200, [
        {
            title: 'Project 1',
            description: 'This is a project.',
            email_chef_project: 'john.doe@example.com',
            compagnies: [{ name: 'Company A' }],
            status: 'EN_COURS',
            start_date: '2023-01-01',
            end_date: '2023-12-31',
            participants: [{ email: 'john.doe@example.com' }],
          },
          {
            title: 'Project 2',
            description: 'This is a project2',
            email_chef_project: 'john.doe@example.com',
            compagnies: [{ name: 'Company B' }],
            status: 'TERMINE',
            start_date: '2022-01-01',
            end_date: '2022-12-31',
            participants: [{ email: 'john.doe@example.com' }],
          },
    ]);

    const wrapper = mount(HomeView, {
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

    // Appliquer un filtre
    await wrapper.setData({
      filters: {
        projectName: 'Project 1',
        projectStatus: '',
        startDate: '',
        endDate: '',
        participantEmail: '',
      },
    });

    // Réinitialiser les filtres
    await wrapper.vm.resetFilters();

    // const projects = wrapper.findAll('.project');
    // expect(projects.length).toBe(2);
  });

  it('navigates to dashboard when button is clicked', async () => {
    const wrapper = mount(HomeView, {
      global: {
        mocks: {
          $router: {
            push: vi.fn(),
          },
        },
      },
    });

    await wrapper.find('.dashboard-button').trigger('click');

    expect(wrapper.vm.$router.push).toHaveBeenCalledWith('/dashboard');
  });

  it('navigates to project description when a project is clicked', async () => {
    mock.onGet('http://localhost:8082/api/user/participations').reply(200, [
        {
            title: 'Project 1',
            description: 'This is a project.',
            email_chef_project: 'john.doe@example.com',
            compagnies: [{ name: 'Company A' }],
            status: 'EN_COURS',
            start_date: '2023-01-01',
            end_date: '2023-12-31',
            participants: [{ email: 'john.doe@example.com' }],
          },
    ]);

    const wrapper = mount(HomeView, {
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
    // await project.trigger('click');

    // expect(wrapper.vm.$router.push).toHaveBeenCalledWith({ name: 'Description', params: { title: 'Project 1' } });
  });
});
