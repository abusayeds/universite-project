import { z } from "zod";


const userValidationSchema = z.object({
body: z.object({
    
  password: z.string({
    invalid_type_error: 'Password should be string '
    
  })
  .max(20,{message: 'Password can not be more then 20 '})
  .optional()

})
});

export const userValidation = {
    userValidationSchema
};
