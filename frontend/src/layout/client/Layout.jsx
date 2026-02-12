import React from "react";
import Navbar from "../../components/client/Navbar";
import Hero from "../../components/client/Hero";
import About from "../../components/client/About";
import Projects from "../../components/client/Projects";
import Skills from "../../components/client/Skills";
import Footer from "../../components/client/Footer";
import Contact from "../../components/client/Contact";
import Services from "../../components/client/Services";

const Layout = () => {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main className="">
        <Hero />
        <About />
        <Services />
        <Projects />
        <Skills />
        <Contact />
        <Footer />
      </main>
      <footer></footer>
    </div>
  );
};

export default Layout;
