import { MessageInput } from '../resolver/Inputs/MessageInput';
import { Context } from './types';

export const validateMessageInput = (
  input: MessageInput,
  request: Context['req']
) => {
  if (!request.session.userName) {
    return [
      {
        field: 'message',
        message: 'Go get an alias first',
      },
    ];
  }
  if (input.message.length <= 1) {
    return [
      {
        field: 'message',
        message: 'Please enter a message',
      },
    ];
  }

  if (input.message.length >= 100) {
    return [
      {
        field: 'message',
        message: "Using paragraphs doesn't make you evil",
      },
    ];
  }

  return null;
};
