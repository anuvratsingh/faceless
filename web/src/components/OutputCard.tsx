import React from 'react';

type OutputCardProps = React.InputHTMLAttributes<HTMLInputElement> & {
  userName: string;
  createdAt: string;
  id: string;
  message: string;
};

const OutputCard: React.FC<OutputCardProps> = ({
  userName,
  createdAt,
  message,
  id,
}) => {
  return (
    <div id={id}>
      <h4>{userName}</h4>
      <h4>{createdAt}</h4>
      <p>{message}</p>
    </div>
  );
};

export default OutputCard;
