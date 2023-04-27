import React from "react";
import HomeSidebar from "../components/HomeSidebar";
import "../stylesheets/Home.css";

const Home = () => {
  return (
    <main className="home-main-div">
      <section className="home-img-div">
        <img src={require("../assets/homepage.png")} alt="homepage-img" />
      </section>
      <section className="home-form-div">
        <HomeSidebar />
      </section>
    </main>
  );
};

export default Home;
