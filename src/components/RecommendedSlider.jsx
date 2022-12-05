import { Navigation, Pagination, Scrollbar, A11y } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Link } from "react-router-dom";
const RS = ({ recommended }) => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      loop
      className="s-container"
    >
      {recommended[0]?.articole?.map((article) => (
        <SwiperSlide key={article._id} className="s-item">
          <div className="image-wrapper">
            <Link to={`/product/${article._id}`}>
              <img src={article.img} alt="" className="article-img" />
            </Link>
          </div>
          <div className="article-info">
            <div className="article-title">{article.title}</div>
            <div className="article-price">$ {article.price}</div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
export default RS;
