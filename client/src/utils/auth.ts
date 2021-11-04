import { capitalize } from './index';

export const validateAuthForms = <T>(fields: string[], values: T) => {
  const errors: Partial<T> = {};

  fields.forEach((field) => {
    if (!(values as any)[field]) {
      (errors as any)[field] = `${capitalize(
        field === 'passwordconfirm' ? 'Confirming Password' : field
      )} is required`;
    }
  });

  return errors;
};
