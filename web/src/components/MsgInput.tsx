import { Button} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import { useMessageMutation } from '../generated/graphql';
import { toMessageErrorMap } from '../utils/toMessageErrorMap';
import InputField from './InputField';

interface MsgInputProps {}

const MsgInput: React.FC<MsgInputProps> = ({}) => {
  const router = useRouter();
  const [, message] = useMessageMutation();

  return (
    <>
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
          values.message = '';
          return response;
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="messageInput-main">
                <InputField name='message' placeholder='Type a message' />
                <Button
                  isLoading={isSubmitting}
                  ml='10px'
                  mt='8px'
                  type='submit'
                >
                  ➜
                </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default MsgInput;
