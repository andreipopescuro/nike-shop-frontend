import Product from "./HomeProduct";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { useAnimation } from "framer-motion";
const ProductsEffect = ({ products }) => {
  const { ref, inView } = useInView();
  const [viewd, setViewd] = useState(false);
  const animation = useAnimation();
  useEffect(() => {
    if (inView) {
      animation.start({
        x: 0,
        transition: {
          type: "spring",
          duration: 2,
          bounce: 0.3,
        },
      });
      setViewd(false);
    }
    if (!inView) {
      animation.start({
        x: "100vh",
      });
    }
  }, [products, inView, animation, viewd]);

  return (
    <motion.div animate={animation} className="animation-container">
      <div ref={ref} className="products-wrapper">
        {products &&
          products.map((product) => (
            <Product product={product} key={product._id} />
          ))}
      </div>
    </motion.div>
  );
};

export default ProductsEffect;
