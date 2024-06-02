
import { TErrorSoureces, TGenericErrorResponse } from "../intarface/error";

const handleDuplicateError = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  err: any): TGenericErrorResponse => {
    
  const match = err.message.match(/"([^"]*)"/);
  const extractedMessage = match && match[1];
  const errorSources: TErrorSoureces = [
    {
        path: '',
        message: `${extractedMessage} is already exists`,
    }
  ];

  const statusCode = 400;
  return {
    statusCode,
    message: " value alreday exists  ",
    errorSources,
  };
};
export default handleDuplicateError ;
