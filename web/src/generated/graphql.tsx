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
  helloUser: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  message: MessageResponse;
  user: UserResponse;
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

export type Message = {
  __typename?: 'Message';
  id: Scalars['ID'];
  message: Scalars['String'];
  userName: Scalars['String'];
  createdAt: Scalars['String'];
};

export type MessageInput = {
  message: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type FieldError = {
  __typename?: 'FieldError';
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

export type RegularErrorFragment = (
  { __typename?: 'FieldError' }
  & Pick<FieldError, 'field' | 'message'>
);

export type RegularUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'userName'>
);

export type RegularUserResponseFragment = (
  { __typename?: 'UserResponse' }
  & { errors?: Maybe<Array<(
    { __typename?: 'FieldError' }
    & RegularErrorFragment
  )>>, user?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export type UserNameMutationVariables = Exact<{
  input: UserNameInput;
}>;


export type UserNameMutation = (
  { __typename?: 'Mutation' }
  & { user: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export const RegularErrorFragmentDoc = gql`
    fragment RegularError on FieldError {
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
    ...RegularError
  }
  user {
    ...RegularUser
  }
}
    ${RegularErrorFragmentDoc}
${RegularUserFragmentDoc}`;
export const UserNameDocument = gql`
    mutation UserName($input: UserNameInput!) {
  user(input: $input) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useUserNameMutation() {
  return Urql.useMutation<UserNameMutation, UserNameMutationVariables>(UserNameDocument);
};