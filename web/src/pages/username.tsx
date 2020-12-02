import {
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import React from 'react';

interface usernameProps {}

const Username: React.FC<usernameProps> = ({}) => {
  return (
    <Formik
      initialValues={{ username: '' }}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ values, handleChange }) => (
        <Form>
          <FormControl>
            <FormLabel htmlFor='username'>Username</FormLabel>
            <Input
              value={values.username}
              onChange={handleChange}
              id='username'
              placeholder='Username'
            />
            {/* <FormErrorMessage>{form.errors.name}</FormErrorMessage> */}
          </FormControl>
        </Form>
      )}
    </Formik>
  );
};

export default Username;
