import { Box, Button, Flex } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import { useUserNameMutation } from '../generated/graphql';
import { toUserErrorMap } from '../utils/toUserErrorMap';
import InputField from './InputField';
interface UsernameProps {}

const Username: React.FC<UsernameProps> = ({}) => {
  const router = useRouter();
  const [, user] = useUserNameMutation();
  return (
    <Formik
      // initialValues={{ username: '' }}
      initialValues={{ userName: '' }}
      onSubmit={async (values, { setErrors }) => {
        // const response = await user(values); if using this can't see errors
        const response = await user({ input: values });
        if (response.data?.user.errors) {
          setErrors(toUserErrorMap(response.data.user.errors));
        } else if (response.data?.user.user) {
          router.push('/board');
          //hello
        }
        return response;
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Box w='50vw' mt='30vh'>
            <Flex>
              <InputField name='userName' placeholder='Username' />
              <Button isLoading={isSubmitting} ml='10px' mt='8px' type='submit'>
                ➜
              </Button>
            </Flex>
          </Box>
        </Form>
      )}
    </Formik>
    // </Flex>
  );
};

export default Username;
