import React from "react";  // ✅ Add this line
import { useEffect, useState } from "react";
import HomePageBanner from "./components/HomeComponents/HomePageBanner/HomePageBanner";
import SmallCard from "./utils/Cards/card1/SmallCard";
import Collections from "./components/HomeComponents/Collections/Collections";
import PopularPlaces from "./components/HomeComponents/PopularPlaces/PopularPlaces";
import GetTheApp from "./components/HomeComponents/GetTheApp/GetTheApp";
import ExploreOptionsNearMe from "./components/HomeComponents/ExploreOptionsNearMe/ExploreOptionsNearMe";
import Footer from "./components/Footer/Footer";

import orderOnlineImg from "/images/orderonline.jpg";
import diningoutImg from "/images/diningout.jpg";
import proandproplusImg from "/images/proandproplus.jpg";
import nightlifeandclubsImg from "/images/nightlifeandclubs.jpg";

import css from "./App.module.css";
import { orderOnlinePage, diningOutPage, proAndProPlusPage, nightLifePage } from "./helpers/constants";

function App() {
  const [message, setMessage] = useState("Loading...");
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    checkbox: false
  });
  const [error, setError] = useState('');

  useEffect(() => {
    fetch("https://zomato-backend-ygx.vercel.app/")
      .then((response) => response.text())
      .then((data) => setMessage(data))
      .catch((error) => {
        console.error("Error fetching API:", error);
        setMessage("");
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.password.trim()) {
      setError('Please enter your password');
      return;
    }
    // Handle form submission
  };

  return (
    <>
      <HomePageBanner />
      <h2 className={css.apiMessage}>{message}</h2> {/* Display API message */}
      <div className={css.bodySize}>
        <div className={css.chooseTypeCards}>
          <SmallCard imgSrc={orderOnlineImg} text="Order Online" link={`/show-case?page=${orderOnlinePage}`} />
          <SmallCard imgSrc={diningoutImg} text="Dining Out" link={`/show-case?page=${diningOutPage}`} />
          <SmallCard imgSrc={proandproplusImg} text="Pro and Pro Plus" link={`/show-case?page=${proAndProPlusPage}`} />
          <SmallCard imgSrc={nightlifeandclubsImg} text="Night Life and Clubs" link={`/show-case?page=${nightLifePage}`} />
        </div>
        <Collections />
        <PopularPlaces />
      </div>
      <GetTheApp />
      <ExploreOptionsNearMe />
      <Footer />
    </>
  );
}

export default App;
