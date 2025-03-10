import { useState } from 'react';
import { Link } from 'react-router-dom'
import React from 'react';
import Navbar from '../../Navbars/NavigationBar/NavigationBar'
import AddRestaurantMobileNavbar from '../../Navbars/AddRestaurantMobileNavbar/AddRestaurantMobileNavbar';

import css from './AddRestaurantHeader.module.css'

import banner from '/images/addressbackground.jpg'

let AddRestaurantHeader = () => {
    let [toogleMenu, setToggleMenu] = useState(true);
    console.log('Rendering AddRestaurantHeader, toogleMenu:', toogleMenu);

    return (
        <div className={css.banner}>
            <Navbar setToggleMenu={setToggleMenu} toogleMenu={toogleMenu} page="add-restaurant" />
            {toogleMenu ? (
                <div className={css.bannerInner}>
                    <img src={banner} alt="banner" className={css.bannerImg} />
                    <div className={css.bannerTxt}>
                        <div className={css.title}>Register your restaurant on Zomato</div>
                        <div className={css.tag}>for free and get more customers!</div>
                        <div className={css.btns}>
                            <Link to='/' className={css.btn}>Register your restaurant</Link>
                            <Link to='/' className={css.btn}>Restaurant already listed? Claim now</Link>
                        </div>
                    </div>
                </div>
            ) : (
                <AddRestaurantMobileNavbar setToggleMenu={setToggleMenu} toogleMenu={toogleMenu} />
            )}
        </div>
    );
}

export default AddRestaurantHeader;