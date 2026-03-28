import Navbar from "../components/layout/Navbar";
import Banner from "../components/home/Banner";
import BeforeAfter from "../components/home/BeforeAfter";
import Renovations from "../components/home/Renovations";

function Home() {
  return (
    <>
      <Navbar/>
      <main>
        <Banner/>
        <BeforeAfter/>
        <Renovations/>
      </main>
    </>
  );
}

export default Home;