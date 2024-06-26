import { z } from 'zod';

const loginValidationSchema = z.object({
  body: z.object({
    id: z.string({ required_error: 'Id is required.' }),
    password: z.string({ required_error: 'Password is required' }),
  }),
});

const changePaswordValidationSchema = z.object({
    body: z.object({
        oldPassword: z.string({
            required_error: 'old password is required'
        }),
        newPassword: z.string({
            required_error: ' new password is required'
        })
         
    })
    });

export const AuthValidation = {
    loginValidationSchema,
    changePaswordValidationSchema
  };