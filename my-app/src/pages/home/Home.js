import HeroSection from "../../components/HeroSection";
import Services from "../../components/Services";
import FeatureProduct from "../../components/FeatureProduct";
// import Fertilizer from "../../components/Fertilizer"; // Make sure to use the correct component name

const Home = () => {
  const data = {
    name: "Fertilizer store",
  };

  return (
    <>
      <HeroSection myData={data} />
      <FeatureProduct />
      <Services />
    </>
  );
};

export default Home;
