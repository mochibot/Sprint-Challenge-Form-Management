import React from 'react';
import { withFormik, Form, Field } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';


const Register = ({ errors, touched, isSubmitting }) => {
  return (
    <div>
      {isSubmitting && <div>Submitting</div>}
      <Form className='login-form'>
        <div className='login-field'>
          <label>Username: </label>
          <Field name='username'></Field>
          {touched.username && errors.username && <p className='login-error'>{errors.username}</p>}
        </div>
        <div className='login-field'>
          <label>Password: </label>
          <Field type='password' name='password'></Field>
          {touched.password && errors.password && <p className='login-error'>{errors.password}</p>}
        </div>
        <div className='login-field'>
          <label>Confirm password: </label>
          <Field type='password' name='passwordConfirmation'></Field>
          {touched.passwordConfirmation && errors.passwordConfirmation && <p className='login-error'>{errors.passwordConfirmation}</p>}
        </div>
        <button disabled={isSubmitting}>Submit</button>
      </Form>
    </div>
  )
}

export default withFormik({
  mapPropsToValues: ({ username, password, passwordConfirmation }) => {
    return {
      username: username || '',
      password: password || '',
      passwordConfirmation: passwordConfirmation || ''
    }
  },
  
  validationSchema: Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().min(8, 'Password must contain at least 8 characters').matches(/(\d{1,})|([A-Z]{1,})/, 'Must contain at least 1 number or 1 uppercase').required('Password is required'),
    passwordConfirmation: Yup.string().oneOf([Yup.ref('password')], 'Passwords are not the same!')
    .required('Password confirm is required!')
  }),

  handleSubmit(values, { resetForm, setErrors, setSubmitting, props }) {
    console.log('login: ', values);
    setSubmitting(true);
    axios.post('http://localhost:5000/api/register', values)
      .then(response => {
        setSubmitting(false);
        console.log(response);
        if (response.data.error) {
          setErrors({
            username: response.data.message          
          })
        } else {
          props.setToken(response.data.token);
          props.setIsLoggedIn(true);
          props.history.push('/content');
          resetForm()
        }
      })
      .catch(error => {
        console.log(error.message);
        setErrors({
          username: 'Username or Password incorrect'
        })
        setSubmitting(false);
      })
  }
})(Register);