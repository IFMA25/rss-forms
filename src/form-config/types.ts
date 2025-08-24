import type { z } from 'zod';
import { formSchema } from './validation-zod';

export type DataForm = z.infer<typeof formSchema>;
export type FormFieldName = keyof DataForm;

export interface FormField {
  name: FormFieldName;
  placeholder: string;
  type:
    | 'text'
    | 'email'
    | 'number'
    | 'password'
    | 'checkbox'
    | 'file'
    | 'select';
  options?: string[];
  autocomplete?: boolean;
}
