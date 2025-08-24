import type { FormField } from './types';

export const configComponent: FormField[] = [
  {
    name: 'name',
    placeholder: 'Name',
    type: 'text',
  },
  {
    name: 'age',
    placeholder: 'Age',
    type: 'number',
  },
  {
    name: 'email',
    placeholder: 'E-mail',
    type: 'email',
  },
  {
    name: 'password1',
    placeholder: 'Password',
    type: 'password',
  },
  {
    name: 'password2',
    placeholder: 'Repeat password',
    type: 'password',
  },
  {
    name: 'gender',
    placeholder: 'Gender',
    type: 'select',
    options: ['male', 'female'],
  },
  {
    name: 'acceptTnC',
    placeholder: 'Accept Terms and Conditions',
    type: 'checkbox',
  },
  {
    name: 'picture',
    placeholder: 'Upload Picture',
    type: 'file',
  },
  {
    name: 'country',
    placeholder: 'Country',
    type: 'text',
    autocomplete: true,
  },
];
