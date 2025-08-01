import React from "react";
import Header from "../components/Header";
import SpecialityMenu from "../components/SpecialityMenu";
import TopDoctors from "../components/TopDoctors";
import Banner from "../components/Banner";
import Notice from "../components/Notice";
import DelayedNotification from "../components/DelayedNotification";

const Home = () => {
  return (
    <div>
      <DelayedNotification/>
      <Notice/>
      <Header />
      <SpecialityMenu />
      <TopDoctors />
      <Banner />
    </div>
  );
};

export default Home;
