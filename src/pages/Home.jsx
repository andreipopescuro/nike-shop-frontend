import { useEffect, useState } from "react";
import Category from "../components/HomeCategories";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Products from "../components/HomeProducts";
import Slider from "../components/HomeSlider";
import axios from "axios";
import { useSelector } from "react-redux";

const Home = () => {
  const user = useSelector((state) => state.user?.currentUser);
  const [currentCategory, setCurrentCategory] = useState("man");
  const [temp, setTemp] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/categories`
        );
        const data = await response.data;
        setTemp(data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, [currentCategory]);

  const onChangeCategory = (cat) => {
    setCurrentCategory(cat);
  };
  return (
    <div>
      <Navbar />
      <Slider categories={temp} onCh={onChangeCategory} />
      <Category categories={temp} current={currentCategory} />
      <Products current={currentCategory} />
      {!user && <Newsletter />}
      <Footer />
    </div>
  );
};

export default Home;
