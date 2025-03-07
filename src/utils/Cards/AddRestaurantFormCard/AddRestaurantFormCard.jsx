import {useState} from 'react'
import { Link } from 'react-router-dom'

import { Formik, Field, Form, ErrorMessage } from 'formik';

import TextUtil from '../../FormUtils/TextUtil/TextUtil'
import TelUtil from '../../FormUtils/TelUtil/TelUtil'
import TextAreaUtil from '../../FormUtils/TextAreaUtil/TextAreaUtil'

import css from './AddRestaurantFormCard.module.css';

let AddRestaurantFormCard = () => {

    let [initialValues, setInitialValues] = useState({ 
        restName: '',
        location: '',
        phone: '',
        message: '' 
    })

    let validate = (values) => {
        const errors = {};
        if (!values.restName) {
            errors.restName = 'Required';
        } else if (values.restName.length < 5) {
            errors.restName = 'Minimum 5 characters required';
        } else if (values.restName.length > 15) {
            errors.restName = 'Must be less than 15 characters';
        }
        if (!values.location) {
            errors.location = 'Required';
        }
        return errors;
    }

    let submitForm = (values, { setSubmitting }) => {
        console.log(values, "submited");
    }

    return <div className={css.outerDiv}>
        <div className={css.innerDiv}>
            <Formik
                initialValues={initialValues}
                validate={validate}
                onSubmit={submitForm}
                className={css.formikForm}
            >
                <Form className={css.form}>
                    <TextUtil name="restName" placeholder="Restaurant name*"/>
                    <TextUtil name="location" placeholder="Restaurant location*"/>
                    <TelUtil name="phone" placeholder="Restaurant contact number"/>
                    <TextAreaUtil name="message" placeholder="What do you like about the Restaurant?" />
                    <button type='submit' className={css.btn}>Submit</button>
                </Form>
            </Formik>
            <div className={css.tag}>Restaurant owners can <Link to='' className={css.link}>add restaurant from here</Link></div>
        </div>
    </div>
}

export default AddRestaurantFormCard;