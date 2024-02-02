import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './styles.css';

const FormContainer = ({ formData, successMessage, formResult, handleFieldClick, addToHistory }) => (
  <div className="form-container">
    <h2 className='formTitle'>Validatin Form</h2>
    <Formik
      initialValues={{
        country: '',
        state: '',
        district: '',
        city: ''
      }}
      validationSchema={Yup.object({
        country: Yup.string().required('Country is required*'),
        state: Yup.string().required('State is required*'),
        district: Yup.string().required('District is required*'),
        city: Yup.string().required('City is required*')
      })}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setTimeout(() => {
          const result = values;
          addToHistory(result);
          setSubmitting(false);
          resetForm();
        }, 400);
      }}
    >
      {({ isSubmitting }) => (
        <Form className='validForm'>
        <div className="form-group" onClick={handleFieldClick}>
          <label htmlFor="country">Country</label>
          <div className="custom-dropdown">
            <Field as="select" name="country">
              <option value="" hidden>Select Country</option>
              {formData.countries.map((country, index) => (
                <option key={index} value={country}>{country}</option>
              ))}
            </Field>
          </div>
          <ErrorMessage name="country" component="div" className="error" />
        </div>
      
        <div className="form-group" onClick={handleFieldClick}>
          <label htmlFor="state">State</label>
          <div className="custom-dropdown">
            <Field as="select" name="state">
              <option value="" hidden>Select State</option>
              {formData.states.map((state, index) => (
                <option key={index} value={state}>{state}</option>
              ))}
            </Field>
          </div>
          <ErrorMessage name="state" component="div" className="error" />
        </div>
      
        <div className="form-group" onClick={handleFieldClick}>
          <label htmlFor="district">District</label>
          <div className="custom-dropdown">
            <Field as="select" name="district">
              <option value="" hidden>Select District</option>
              {formData.districts.map((district, index) => (
                <option key={index} value={district}>{district}</option>
              ))}
            </Field>
          </div>
          <ErrorMessage name="district" component="div" className="error" />
        </div>
      
        <div className="form-group" onClick={handleFieldClick}>
          <label htmlFor="city">City</label>
          <div className="custom-dropdown">
            <Field as="select" name="city">
              <option value="" hidden>Select City</option>
              {formData.cities.map((city, index) => (
                <option key={index} value={city}>{city}</option>
              ))}
            </Field>
          </div>
          <ErrorMessage name="city" component="div" className="error" />
        </div>
      
        <button type="submit" disabled={isSubmitting} className="custom-button">Submit</button>
        {successMessage && <div className="success-message">{successMessage}</div>}
      </Form>
      )}
    </Formik>
  </div>
);

export default FormContainer;
