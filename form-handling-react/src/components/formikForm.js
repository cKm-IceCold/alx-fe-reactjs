import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// --- 1. Define the Validation Schema using Yup ---
const ValidationSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters long')
    .max(20, 'Username cannot be more than 20 characters long')
    .required('Username is required'),
  
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters long')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .required('Password is required'),
});

// --- 2. Define Initial Values ---
const initialValues = {
  username: '',
  email: '',
  password: '',
};

function FormikForm() {
  
  // --- 3. Define the Submission Handler ---
  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    // values object contains all form data (username, email, password)
    console.log('Form Submitted (Formik):', values);
    
    // Simulate an API call delay
    setTimeout(() => {
      alert(`Registration successful for: ${values.username}`);
      setSubmitting(false); // Enable the submit button
      resetForm(); // Reset all fields after successful submission
    }, 400);
  };
  
  return (
    <div>
      <h2>Formik Registration</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={ValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          // --- 4. Render the Form using Formik components ---
          <Form>
            
            {/* Username Field */}
            <div>
              <label htmlFor="username">Username</label>
              <Field 
                name="username" 
                type="text" 
                placeholder="Enter username" 
              />
              {/* ErrorMessage shows the error if the field is touched and invalid */}
              <ErrorMessage 
                name="username" 
                component="div" 
                className="error-message"
              />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email">Email</label>
              <Field 
                name="email" 
                type="email" 
                placeholder="Enter email" 
              />
              <ErrorMessage 
                name="email" 
                component="div" 
                className="error-message"
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password">Password</label>
              <Field 
                name="password" 
                type="password" 
                placeholder="Enter password" 
              />
              <ErrorMessage 
                name="password" 
                component="div" 
                className="error-message"
              />
            </div>
            
            <button 
              type="submit" 
              disabled={isSubmitting} // Disable button during submission
            >
              {isSubmitting ? 'Submitting...' : 'Register'}
            </button>
            
          </Form>
        )}
      </Formik>

      <style jsx="true">{`
        .error-message {
          color: red;
          font-size: 0.8em;
          margin-top: 4px;
        }
        form div {
          margin-bottom: 15px;
        }
        label {
          display: block;
          margin-bottom: 5px;
          font-weight: bold;
        }
        input {
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 4px;
          width: 250px;
        }
        button {
          padding: 10px 15px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        button:disabled {
          background-color: #a0c9f8;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}

export default FormikForm;