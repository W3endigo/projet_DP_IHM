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

  it('renders the profil page', async () => {
    mock.onGet('http://localhost:8082/api/user/participations').reply(200, {
      efirstName: 'John',
      lastName: 'Doe',
      company: 'Apple',
    });

    const wrapper = mount(ProfilView);
    await wrapper.vm.$nextTick();

  });

  it('show profil', async () => {
    mock.onGet('http://localhost:8082/api/user').reply(200, {
      firstName: 'John',
      lastName: 'Doe',
      company: 'Apple',
     
    });

    

    const wrapper = mount(ProfilView);
    await wrapper.vm.$nextTick();

  });

});
