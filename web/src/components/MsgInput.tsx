import { Box, Button, Flex } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import { useMessageMutation } from '../generated/graphql';
import { toMessageErrorMap } from '../utils/toMessageErrorMap';
import InputField from './InputField';
import ToggleColor from './ToggleColor';

interface MsgInputProps {}

const MsgInput: React.FC<MsgInputProps> = ({}) => {
  const router = useRouter();
  const [, message] = useMessageMutation();

  return (
    <>
      <Box maxH='90vh' maxW='70vw' margin='auto'>
        <ToggleColor />
        <Flex justifyContent='center' align='center'>
          <Formik
            initialValues={{ message: '' }}
            onSubmit={async (values, { setErrors }) => {
              const response = await message({ input: values });
              if (response.data?.message.errors) {
                setErrors(toMessageErrorMap(response.data.message.errors));
                console.log(response.data.message.errors);
                if (
                  response.data.message.errors[0].message ===
                  'Go get an alias first'
                ) {
                  router.push('/');
                }
              }

              return response;
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Box w='50vw' mt='30vh'>
                  <Flex>
                    <InputField name='message' placeholder='Type a message' />
                    <Button
                      isLoading={isSubmitting}
                      ml='10px'
                      mt='8px'
                      type='submit'
                    >
                      ➜
                    </Button>
                  </Flex>
                </Box>
              </Form>
            )}
          </Formik>
        </Flex>
      </Box>
    </>
  );
};

export default MsgInput;
