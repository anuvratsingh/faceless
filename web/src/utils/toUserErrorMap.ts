import { UserFieldError } from '../generated/graphql';

export const toUserErrorMap = (errors: UserFieldError[]) => {
  const errorMap: Record<string, string> = {};
  errors.forEach(({ field, message }) => {
    errorMap[field] = message;
  });

  return errorMap;
};
