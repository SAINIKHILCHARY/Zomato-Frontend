import { useState } from 'react';
import { createPortal } from 'react-dom'
import React from 'react'

import { Formik, Field, Form, ErrorMessage } from 'formik';

import css from './EditProfileModal.module.css'

import closeBtn from '/images/closeBtn.jpg';
import cameraIcon from '/icons/photo-camera.png';
import bgImg from '/images/profilebanner.jpg'
import profilePic from '/images/profilepic.jpg'

import RedBtnHov from '../../utils/Buttons/RedBtnHov/RedBtnHov' 
import WhiteBtnHov from '../../utils/Buttons/WhiteBtnHov/WhiteBtnHov' 
import TextUtil from '../../utils/FormUtils/TextUtil/TextUtil'
import TextUtilWithCancel from '../../utils/FormUtils/TextUtilWithCancel/TextUtilWithCancel'
import EnterOTP from '../../components/Auth/EnterOTP/EnterOTP'

const EditProfileModal = ({setModal}) => {

    let [dropdown, setDropDown] = useState(false);
    let [changeMailModal, setChangeMailModal] = useState(false);
    let [initialValues, setInitialValues] = useState({ 
        fullName: '',
        phone: '',
        email: '',
        address: '',
        description: "",
        handle:"",
        website:""
    })

    let validate = (values) => {
        const errors = {};
        if (values.fullName && values.fullName.length < 3) {
            errors.fullName = "Minimum 3 characters required!";
        }
        if (values.phone && (values.phone.length < 10 || values.phone.length > 10)) {
            errors.phone = "Enter valid phone number!";
        }
        if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = "Enter correct email address!";
        }
        if (values.address && values.address.length < 5) {
            errors.address = "Minimum 5 characters required!";
        }
        if (values.description && (values.description.length < 5 || values.description.length > 150)) {
            errors.description = values.description.length < 5 ? "Minimum 5 characters required!" : "Maximum 150 characters only!";
        }
        if (values.handle && values.handle.length < 5) {
            errors.handle = "Minimum 5 characters required!";
        }
        if (values.website && !/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(values.website)) {
            errors.website = "Provide correct URL!";
        }
        return errors;
    }

    let submitForm = (values, { setSubmitting }) => {
        console.log(values, "submited");
    }

    const updateUser = () => {
        console.log("Update User");
        setModal(val => !val);
    }

    const mailCahngeHandler = () => {
        setChangeMailModal(val => !val);
    }

  const domObj = <><div className={css.outerDiv}>
        <div className={css.innerDiv}>
            <div className={css.header}>
                <div className={css.headerLeft}>
                    <div className={css.title}>Edit Profile</div>
                </div>
                <span className={css.closeBtn} onClick={() => setModal(val => !val)}>
                    <img className={css.closeBtnImg} src={closeBtn} alt="close button" />
                </span>
            </div>
            <div className={css.banner}>
                <div className={css.BGImgBox}>
                    <img src={bgImg} className={css.bgImg} />
                </div>
                <div className={css.overlayImg}>
                    <div className={css.profilePicBox}>
                        <img src={profilePic} className={css.profilePic} />
                    </div>
                    <div className={css.cameraIconBox}>
                        <div className={css.bgCssImg} onClick={() => setDropDown(val => !val)}>
                            <img src={cameraIcon} className={css.cameraIcon} />
                        </div>
                        {dropdown ? <div className={css.dropdownCam}>
                            <div className={css.opt}>Change Photo</div>
                            <div className={css.opt} onClick="">Delete Photo</div>
                        </div> : "" }
                    </div>
                    <div className={css.cameraIconBox2}>
                        <div className={css.bgCssImg}>
                            <img src={cameraIcon} className={css.cameraIcon} />
                        </div>
                    </div>
                </div>
            </div>
            <div className={css.bdy}>
                <Formik
                    initialValues={initialValues}
                    validate={validate}
                    onSubmit={submitForm}
                    className={css.formikForm}
                >{(formik) => {
                    return <Form className={css.form}>
                        <TextUtil name="fullName" placeholder="Enter name"/>
                        <TextUtil name="phone" placeholder="Enter phone number" disabled/>
                        <span className={css.formTxt}>You can update your phone number using the Zomato app</span>
                        <TextUtilWithCancel txt="Change" name="email" placeholder="sample@sample.com" formik="" changeHandler={mailCahngeHandler} disabled/>
                        <TextUtil name="address" placeholder="Enter address"/>
                        <TextUtil name="description" placeholder="Description"/>
                        <span className={css.formTxt}>Tell us something about yourself ({150 -formik.values.description.length} characters remaining)</span>
                        <TextUtil name="handle" placeholder="Handle"/>
                        <span className={css.formTxt}>You can only change your handle once</span>
                        <TextUtil name="website" placeholder="Website"/>
                        <div className={css.btns}>
                            <WhiteBtnHov txt="Cancel" onClick={() => setModal(val => !val)} />
                            <RedBtnHov txt="Update" onClick={updateUser}/>
                        </div>
                    </Form>
                }}
                </Formik>
            </div>
        </div>
    </div>
    {changeMailModal ? <EnterOTP setModal={setChangeMailModal} /> : "" }
    </>

  return createPortal(domObj, document.getElementById('modal'));
}

export default EditProfileModal