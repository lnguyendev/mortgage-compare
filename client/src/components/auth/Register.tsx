import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { Formik, Form, Field, FormikHelpers } from 'formik';
import { TextField } from 'formik-mui';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

import { User } from '../../state/interface/auth-interface';
import { loginUser } from '../../state/action-creators/auth-actions';
import { useAppDispatch, useAppSelector } from '../../hooks/appStateHooks';
import { validateAuthForms } from '../../utils/auth';

const fields = [
  'firstname',
  'lastname',
  'email',
  'password',
  'passwordconfirm',
];

interface FormValues {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  passwordconfirm: string;
}

const Register = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const [generalErrors, setGeneralErrors] = useState<string[]>([]);

  useEffect(() => {
    if (user) history.replace('/dashboard');
  }, [user, history]);

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting, setFieldError }: FormikHelpers<FormValues>
  ) => {
    setGeneralErrors([]);

    try {
      const {
        data,
      }: {
        data: User;
      } = await axios.post('/api/user/signup', values);

      dispatch(loginUser(data));
      setSubmitting(false);
    } catch (e: any) {
      const { errors } = e.response.data;
      const generalErrors: string[] = [];

      errors.forEach((error: any) => {
        if (error.field) {
          setFieldError(error.field, error.message);
        } else {
          generalErrors.push(error.message);
        }
      });

      setGeneralErrors(generalErrors);
      setSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography
        variant="h5"
        component="h5"
        gutterBottom
        color="primary.main"
        fontWeight="fontWeightMedium"
        mb="20px"
      >
        Mortgage Compare
      </Typography>
      <Box
        sx={{
          backgroundColor: 'common.white',
          border: 'solid 1px',
          borderColor: 'grey.300',
          borderRadius: '5px',
          padding: '20px',
          color: 'text.primary',
          width: '350px',
        }}
      >
        <Typography variant="h6" component="h6" gutterBottom mb="20px">
          Register
        </Typography>
        <Formik
          initialValues={{
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            passwordconfirm: '',
          }}
          validate={(values: FormValues) =>
            validateAuthForms<FormValues>(fields, values)
          }
          onSubmit={handleSubmit}
        >
          {({ submitForm, isSubmitting }) => (
            <Form>
              <Field
                component={TextField}
                required
                id="firstname"
                name="firstname"
                label="First Name"
                type="text"
                variant="standard"
                fullWidth
                sx={{ marginBottom: '10px' }}
              />
              <Field
                component={TextField}
                required
                id="lastname"
                name="lastname"
                label="Last Name"
                type="text"
                variant="standard"
                fullWidth
                sx={{ marginBottom: '10px' }}
              />
              <Field
                component={TextField}
                required
                id="email"
                name="email"
                label="Email Address"
                type="email"
                variant="standard"
                fullWidth
                sx={{ marginBottom: '10px' }}
              />
              <Field
                component={TextField}
                required
                id="password"
                name="password"
                label="Password"
                type="password"
                autoComplete="current-password"
                variant="standard"
                fullWidth
              />
              <Field
                component={TextField}
                required
                id="passwordconfirm"
                name="passwordconfirm"
                label="Confirm Password"
                type="password"
                autoComplete="current-password"
                variant="standard"
                fullWidth
              />
              {generalErrors.length > 0 && (
                <Stack sx={{ width: '100%', marginTop: '20px' }} spacing={1}>
                  {generalErrors.map((error: string, index) => (
                    <Alert key={index} severity="error">
                      {error}
                    </Alert>
                  ))}
                </Stack>
              )}
              <Button
                variant="contained"
                size="small"
                disableElevation
                fullWidth
                sx={{ marginTop: '20px' }}
                disabled={isSubmitting}
                onClick={submitForm}
              >
                Register
              </Button>
            </Form>
          )}
        </Formik>
        <Typography variant="body2" gutterBottom mt={2} textAlign="center">
          Already have an account?{' '}
          <Link component={RouterLink} to="/" underline="none">
            Login
          </Link>{' '}
          here!
        </Typography>
      </Box>
    </Box>
  );
};

export default Register;
