import { UserNameInput } from '../resolver/Inputs/UserNameInput';

export const validateUserNameInput = (input: UserNameInput) => {
  if (input.userName.length <= 2) {
    return [
      {
        field: 'userName',
        message: 'Username should ge greater than 2',
      },
    ];
  }

  if (input.userName.length >= 50) {
    return [
      {
        field: 'userName',
        message: 'Username length should ge smaller than 50',
      },
    ];
  }

  return null;
};
