import { MessageInput } from '../resolver/Inputs/MessageInput';

export const validateMessageInput = (input: MessageInput) => {
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
