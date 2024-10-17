import { mount } from '@vue/test-utils';
import App from '@/App.vue';

describe('PESEL Validation', () => {
  it('should invalidate a PESEL with less than 11 digits', () => {
    const wrapper = mount(App);
    wrapper.find('input').setValue('1234567890');
    wrapper.find('form').trigger('submit.prevent');
    expect(wrapper.html()).toContain('Numer PESEL musi zawierać dokładnie 11 cyfr.');
  });

  it('should invalidate a PESEL with non-digit characters', () => {
    const wrapper = mount(App);
    wrapper.find('input').setValue('12345abcde6');
    wrapper.find('form').trigger('submit.prevent');
    expect(wrapper.html()).toContain('Numer PESEL musi zawierać dokładnie 11 cyfr.');
  });

  it('should invalidate a PESEL with incorrect checksum', () => {
    const wrapper = mount(App);
    wrapper.find('input').setValue('44051401358'); // Niepoprawny PESEL (błędna cyfra kontrolna)
    wrapper.find('form').trigger('submit.prevent');
    expect(wrapper.html()).toContain('Numer PESEL jest nieprawidłowy.');
  });

  it('should validate a correct PESEL', () => {
    const wrapper = mount(App);
    wrapper.find('input').setValue('44051401359'); // Poprawny PESEL
    wrapper.find('form').trigger('submit.prevent');
    expect(wrapper.html()).toContain('Numer PESEL jest prawidłowy.');
  });
});
