import { Button, Flex } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import { useUserNameMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import InputField from './InputField';
import Wrapper from './Wrapper';

interface UsernameProps {}

const Username: React.FC<UsernameProps> = ({}) => {
  const router = useRouter();
  const [, user] = useUserNameMutation();
  return (
    <Wrapper>
      <Formik
        // initialValues={{ username: '' }}
        initialValues={{ userName: '' }}
        onSubmit={async (values, { setErrors }) => {
          // const response = await user(values); if using this can't see errors
          const response = await user({ input: values});
          if (response.data?.user.errors) {
            setErrors(toErrorMap(response.data.user.errors));
          } else if (response.data?.user.user) {
            router.push('/');
          }
          return response;
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Flex>
              <InputField name='userName' placeholder='Username' />
              <Button isLoading={isSubmitting} ml='10px' mt='8px' type='submit'>
                ➜
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Username;
