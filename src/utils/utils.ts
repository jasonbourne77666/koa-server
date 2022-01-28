import { ValidationError } from 'class-validator';
export const getErrorMsg = (obj: ValidationError) => {
  let msg: string = '';
  const info = obj.constraints;

  if (info) {
    msg = Object.values(info)[0] || '';
  }
  return msg;
};
