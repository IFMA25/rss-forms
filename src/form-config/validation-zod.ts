import { z } from 'zod';

export const formSchema = z
  .object({
    name: z
      .string()
      .regex(
        /^[A-Z][a-zA-Z]*(\s[A-Z][a-zA-Z]*)*$/,
        'The name must start with a capital letter!'
      ),
    age: z.preprocess(
      (val) => {
        if (typeof val === 'string') {
          const num = Number(val);
          return isNaN(num) ? undefined : num;
        }
        return val;
      },
      z.number().refine((val) => val > 0, { message: 'Enter age' })
    ),
    email: z.string().email('Incorrect e-mail'),
    password1: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/,
        'Password must be at least 8 characters and include 1 uppercase, 1 lowercase, 1 number, 1 special character'
      ),
    password2: z.string(),
    gender: z
      .string()
      .refine((val) => val === 'male' || val === 'female', {
        message: 'Please select a gender',
      })
      .transform((val) => val as 'male' | 'female'),
    acceptTnC: z.boolean().refine((val) => val === true, {
      message: 'You must accept the Terms and Conditions',
    }),
    picture: z
      .any()
      .refine((fileList) => fileList && fileList.length > 0, {
        message: 'Picture is required',
      })
      .refine(
        (fileList) => {
          if (!fileList || fileList.length === 0) return true;
          const file = fileList[0];
          return ['image/png', 'image/jpeg'].includes(file.type);
        },
        {
          message: 'Only PNG or JPEG allowed',
        }
      )
      .refine(
        (fileList) => {
          if (!fileList || fileList.length === 0) return true;
          const file = fileList[0];
          const maxSize = 2 * 1024 * 1024;
          return file.size <= maxSize;
        },
        {
          message: 'File is too large (max 2MB)',
        }
      ),

    country: z.string().nonempty('Please select a country'),
  })
  .refine((data) => data.password1 === data.password2, {
    path: ['password2'],
    message: 'Passwords must match',
  });
