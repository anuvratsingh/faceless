import { Box, Button, Flex } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React from 'react';
import InputField from '../components/InputField';
import ToggleColor from '../components/ToggleColor';
import { useMessageMutation } from '../generated/graphql';

interface BoardProps {}

const Board: React.FC<BoardProps> = ({}) => {
  // const router = useRouter();
  const [, message] = useMessageMutation();

  return (
    <Box maxH='90vh' maxW='70vw' margin='auto'>
      <ToggleColor />
      <Flex justifyContent='center' align='center'>
        <Formik
          initialValues={{ message: '' }}
          onSubmit={async (values) => {
            const response = await message({ input: values });
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
  );
};

export default Board;
