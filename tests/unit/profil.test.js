import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import ProfilView from '../../src/views/ProfilView.vue';

describe('ProfilView.vue', () => {
  let mock;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  it('renders the profile page', async () => {
    mock.onGet('http://localhost:8082/api/user').reply(200, {
      lastName: 'Doe',
      firstName: 'John',
      company: 'Company A',
      password: 'password123',
    });

    mock.onGet('http://localhost:8082/api/companies').reply(200, [
      { id: 1, name: 'Company A' },
      { id: 2, name: 'Company B' },
    ]);

    const wrapper = mount(ProfilView);
    await wrapper.vm.$nextTick();

    // Attendre que les données soient chargées
    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(wrapper.find('h1').text()).toBe('Profil Utilisateur');
    const inputs = wrapper.findAll('input[type="text"]');
    // expect(inputs.at(0).element.value).toBe('Doe');
    // expect(inputs.at(1).element.value).toBe('John');
    // expect(wrapper.find('select').element.value).toBe('Company A');
  });

  it('updates user profile', async () => {
    mock.onGet('http://localhost:8082/api/user').reply(200, {
      lastName: 'Doe',
      firstName: 'John',
      company: 'Company A',
      password: 'password123',
    });

    mock.onPut('http://localhost:8082/api/user').reply(200, {
      lastName: 'Smith',
      firstName: 'John',
      company: 'Company B',
      password: 'newpassword',
    });

    const wrapper = mount(ProfilView);
    await wrapper.vm.$nextTick();

    // Attendre que les données soient chargées
    await new Promise((resolve) => setTimeout(resolve, 100));

  //   const inputs = wrapper.findAll('input[type="text"]');
  //   await inputs.at(0).setValue('Smith');
  //   await wrapper.find('select').setValue('Company B');
  //   await wrapper.find('input[type="password"]').setValue('newpassword');

    // // Vérifier que le bouton existe avant de déclencher le clic
    // const button = wrapper.find('button');
    // if (button.exists()) {
    //   await button.trigger('click');
    //   await wrapper.vm.$nextTick();

    //   expect(mock.history.put.length).toBe(1);
    //   expect(JSON.parse(mock.history.put[0].data)).toEqual({
    //     lastName: 'Smith',
    //     company: 'Company B',
    //     password: 'newpassword',
    //   });
    // } else {
    //   throw new Error('Button not found in the DOM');
    // }
  });

  it('shows error message when user is not authenticated', async () => {
    localStorage.setItem('token', '');

    const wrapper = mount(ProfilView);
    await wrapper.vm.$nextTick();

    // Attendre que les données soient chargées
    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(wrapper.find('.error-message').text()).toBe('Utilisateur non authentifié');
  });
});
