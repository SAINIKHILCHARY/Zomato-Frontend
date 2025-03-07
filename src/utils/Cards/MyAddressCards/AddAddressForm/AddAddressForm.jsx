import {Formik, Form, ErrorMessage} from 'formik'

import css from './AddAddressForm.module.css'

import closeIcon from '/icons/close.png'
import checkMarkIcon from '/icons/check-mark.png'

import RadioUtil from '../../../FormUtils/RadioUtil/RadioUtil'
import TextUtil from '../../../FormUtils/TextUtil/TextUtil'
import TextUtilWithCancel from '../../../FormUtils/TextUtilWithCancel/TextUtilWithCancel'

const AddAddressForm = ({setPage, setAddressModal, setSearchComp}) => {
   
    let initialValues = {
        completeAddress: "",
        floor: "",
        nearBy: "",
        addressType: "",
        addressTypeOther:""
    }

    let validate = (values) => {
        const errors = {};
        if (!values.completeAddress) {
            errors.completeAddress = "Required";
        } else if (values.completeAddress.length < 5) {
            errors.completeAddress = "Minimum 5 characters needed!";
        }
        if (values.floor && values.floor.length < 5) {
            errors.floor = "Minimum 5 characters needed!";
        }
        if (values.nearBy && values.nearBy.length < 5) {
            errors.nearBy = "Minimum 5 characters needed!";
        }
        if (!values.addressType) {
            errors.addressType = "Required";
        }
        if (values.addressTypeOther && values.addressTypeOther.length < 3) {
            errors.addressTypeOther = "Minimum 3 characters required!";
        }
        return errors;
    }

    let submitForm = (values) => {
        console.log(values, 'form values');
        setAddressModal(false);
    }

    const changeFieldValues = (formik) => {
        formik.setFieldValue("addressType", "");
        formik.setFieldValue("addressTypeOther", "");
    }

  return <div className={css.outerDiv}>
        <div className={css.innerDiv}>
        <div className={css.header}>
            <div className={css.ttl}>Add Address</div>
            <div className={css.imgBox} onClick={() => setPage(1)}><img className={css.closeIcon} src={closeIcon} /></div>
        </div>
        <div className={css.bdy}>
            <div className={css.labelTxt}>DELIVERY AREA</div>
            <div className={css.addBox}>
                <div className={css.addressBx}>
                    <div className={css.addIcon}><img className={css.rightArrIcon} src={checkMarkIcon} /></div>
                    <div className={css.address}>Malkajgiri, Mir Alam Mandi, Pathar Gatti</div>
                </div>
                <div className={css.chgTxt} onClick={()=> setSearchComp(true)}>CHANGE</div>
            </div>
        </div>
        <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={submitForm}
            >
            {(formik) => {
                return <Form>
                    <TextUtil name="completeAddress" placeholder="Complete address*" />
                    <TextUtil name="floor" placeholder="Floor (Optional)" />
                    <TextUtil name="nearBy" placeholder="Nearby landmark (Optional)" />
                    <div className={css.radioBtns}>
                        {formik.values.addressType !== "other" ? 
                        <>
                            <RadioUtil label="Home" name="addressType" value="home" />
                            <RadioUtil label="Work" name="addressType" value="work" />
                            <RadioUtil label="Other" name="addressType" value="other" />
                        </> : 
                        <div className={css.otherRadio}>
                            <RadioUtil label="Other" name="addressType" value="other" />
                            <div className={css.txtCancelField}>
                                <TextUtilWithCancel txt="CANCEL" name="addressTypeOther" placeholder="Add tag" formik={formik} changeHandler={changeFieldValues} />
                            </div>
                        </div>
                        }
                    </div>
                    <ErrorMessage name="addressType">
                        {msg => <div className={css.errorMessage}>{msg}</div>}
                    </ErrorMessage>
                    <div className={css.ftr}>
                        <button type='submit' className={css.btn}>
                            Save And Proceed
                        </button>
                    </div>
                </Form>
            }}
        </Formik>
        </div>
  </div>
}

export default AddAddressForm 