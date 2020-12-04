import { MessageFieldError } from '../generated/graphql';

export const toMessageErrorMap = (errors: MessageFieldError[]) => {
  const errorMap: Record<string, string> = {};
  errors.forEach(({ field, message }) => {
    errorMap[field] = message;
  });

  return errorMap;
};
