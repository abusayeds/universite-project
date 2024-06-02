import { ZodError, ZodIssue } from "zod";
import { TErrorSoureces, TGenericErrorResponse } from "../intarface/error";

const hendelzodError = (err : ZodError):TGenericErrorResponse => {
    const errorSources: TErrorSoureces = err.issues.map((issue:ZodIssue) => {
       return {
         path : issue?.path[issue.path.length-1] ,
         message: issue.message
       }
    })
     
     const statusCode = 400;
      return {
         statusCode,
         message: 'Zod Validation error',
         errorSources
      }
   };
   export default hendelzodError