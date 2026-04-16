import Navbar from "../components/layout/Navbar";
import Banner from "../components/home/Banner";
import BeforeAfter from "../components/home/BeforeAfter";
import Renovations from "../components/home/Renovations";
import About from "../components/home/About";
import Reviews from "../components/home/Reviews";

function Home() {
  return (
    <>
      <Navbar/>
      <main>
        <Banner/>
        <BeforeAfter/>
        <Renovations/>
        <About/>
        <Reviews/>
      </main>
    </>
  );
}

export default Home;