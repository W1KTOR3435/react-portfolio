import Header from "./components/Header";
import Banner from "./components/Banner";
import About from "./components/About";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Certificates from "./components/Certificates";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: "ease-out",
      offset: 80,
      once: false,
      mirror: true,
    });
    AOS.refresh();
  }, []);

  return (
    <div className="container">
      <Header />
      <Banner />
      <About />
      <Experience />
      <Skills />
      <Certificates />
    </div>
  );
}

export default App;
