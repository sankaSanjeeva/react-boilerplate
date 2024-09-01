import { z } from 'zod';

export const createUserSchema = z.object({
  image: z
    .instanceof(File)
    .refine((file) => {
      return !file || file.size <= 1024 * 1024 * 2;
    }, 'File size must be less than 2MB')
    .refine((file) => {
      return file?.type.startsWith('image');
    }, 'File must be an image')
    .optional(),
  imageUrl: z.string().optional(),
  firstName: z.string().min(2, 'First name must be at least 2 characters.'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters.'),
  email: z.string().email('Email must be a valid email address'),
  phone: z.string({ required_error: 'Phone number is required' }),
  dob: z.date({ message: 'Birthday must be a valid date' }),
  country: z.string({ required_error: 'Country is required' }),
  city: z.string({ required_error: 'City is required' }),
  postalCode: z.coerce
    .number({
      required_error: 'Postal Code is required',
      invalid_type_error: 'Postal Code must be a number',
    })
    .refine((val) => `${val}`.length === 5, 'Postal Code must be 5 digit long'),
});

export type CreateUser = z.infer<typeof createUserSchema>;
