import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  helloMessage: Scalars['String'];
  allMessages: Array<Message>;
  helloUser: Scalars['String'];
};

export type Message = {
  __typename?: 'Message';
  id: Scalars['ID'];
  message: Scalars['String'];
  userName: Scalars['String'];
  createdAt: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  message: MessageResponse;
  user: UserResponse;
  exit: Scalars['Boolean'];
};


export type MutationMessageArgs = {
  input: MessageInput;
};


export type MutationUserArgs = {
  input: UserNameInput;
};

export type MessageResponse = {
  __typename?: 'MessageResponse';
  errors?: Maybe<Array<MessageFieldError>>;
  message?: Maybe<Message>;
};

export type MessageFieldError = {
  __typename?: 'MessageFieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type MessageInput = {
  message: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<UserFieldError>>;
  user?: Maybe<User>;
};

export type UserFieldError = {
  __typename?: 'UserFieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  userName: Scalars['String'];
  createdAt: Scalars['String'];
};

export type UserNameInput = {
  userName: Scalars['String'];
};

export type MessageFieldErrorFragment = (
  { __typename?: 'MessageFieldError' }
  & Pick<MessageFieldError, 'field' | 'message'>
);

export type RegularMessageFragment = (
  { __typename?: 'Message' }
  & Pick<Message, 'id' | 'message' | 'userName' | 'createdAt'>
);

export type RegularMessageResponseFragment = (
  { __typename?: 'MessageResponse' }
  & { errors?: Maybe<Array<(
    { __typename?: 'MessageFieldError' }
    & MessageFieldErrorFragment
  )>>, message?: Maybe<(
    { __typename?: 'Message' }
    & RegularMessageFragment
  )> }
);

export type RegularUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'userName'>
);

export type RegularUserResponseFragment = (
  { __typename?: 'UserResponse' }
  & { errors?: Maybe<Array<(
    { __typename?: 'UserFieldError' }
    & UserFieldErrorFragment
  )>>, user?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export type UserFieldErrorFragment = (
  { __typename?: 'UserFieldError' }
  & Pick<UserFieldError, 'field' | 'message'>
);

export type MessageMutationVariables = Exact<{
  input: MessageInput;
}>;


export type MessageMutation = (
  { __typename?: 'Mutation' }
  & { message: (
    { __typename?: 'MessageResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'MessageFieldError' }
      & Pick<MessageFieldError, 'field' | 'message'>
    )>>, message?: Maybe<(
      { __typename?: 'Message' }
      & Pick<Message, 'id' | 'message' | 'userName' | 'createdAt'>
    )> }
  ) }
);

export type UserNameMutationVariables = Exact<{
  input: UserNameInput;
}>;


export type UserNameMutation = (
  { __typename?: 'Mutation' }
  & { user: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'UserFieldError' }
      & Pick<UserFieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'userName'>
    )> }
  ) }
);

export type Unnamed_1_QueryVariables = Exact<{ [key: string]: never; }>;


export type Unnamed_1_Query = (
  { __typename?: 'Query' }
  & { allMessages: Array<(
    { __typename?: 'Message' }
    & RegularMessageFragment
  )> }
);

export const MessageFieldErrorFragmentDoc = gql`
    fragment MessageFieldError on MessageFieldError {
  field
  message
}
    `;
export const RegularMessageFragmentDoc = gql`
    fragment RegularMessage on Message {
  id
  message
  userName
  createdAt
}
    `;
export const RegularMessageResponseFragmentDoc = gql`
    fragment RegularMessageResponse on MessageResponse {
  errors {
    ...MessageFieldError
  }
  message {
    ...RegularMessage
  }
}
    ${MessageFieldErrorFragmentDoc}
${RegularMessageFragmentDoc}`;
export const UserFieldErrorFragmentDoc = gql`
    fragment UserFieldError on UserFieldError {
  field
  message
}
    `;
export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  userName
}
    `;
export const RegularUserResponseFragmentDoc = gql`
    fragment RegularUserResponse on UserResponse {
  errors {
    ...UserFieldError
  }
  user {
    ...RegularUser
  }
}
    ${UserFieldErrorFragmentDoc}
${RegularUserFragmentDoc}`;
export const MessageDocument = gql`
    mutation message($input: MessageInput!) {
  message(input: $input) {
    errors {
      field
      message
    }
    message {
      id
      message
      userName
      createdAt
    }
  }
}
    `;

export function useMessageMutation() {
  return Urql.useMutation<MessageMutation, MessageMutationVariables>(MessageDocument);
};
export const UserNameDocument = gql`
    mutation UserName($input: UserNameInput!) {
  user(input: $input) {
    errors {
      field
      message
    }
    user {
      id
      userName
    }
  }
}
    `;

export function useUserNameMutation() {
  return Urql.useMutation<UserNameMutation, UserNameMutationVariables>(UserNameDocument);
};
export const Document = gql`
    {
  allMessages {
    ...RegularMessage
  }
}
    ${RegularMessageFragmentDoc}`;

export function useQuery(options: Omit<Urql.UseQueryArgs<QueryVariables>, 'query'> = {}) {
  return Urql.useQuery<Query>({ query: Document, ...options });
};