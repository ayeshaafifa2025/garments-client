
import React, { useContext } from "react";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import FeedBackCard from "./FeedBackCard";

import "swiper/css";
import "swiper/css/pagination";
import { ThemeContext } from "../../contexts/ThemeProvider";

const feedbacksData = [
  {
    userName: "Ayesha Afifa",
    testimonial: "This system made tracking garment orders so easy!",
    user_photoURL: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    userName: "Rahim Hossain",
    testimonial: "I love how I can see the production progress in real-time.",
    user_photoURL: "https://randomuser.me/api/portraits/men/34.jpg",
  },
  {
    userName: "Sadia Islam",
    testimonial: "Highly recommend for small and medium garment factories.",
    user_photoURL: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    userName: "Karim Ahmed",
    testimonial: "Very user-friendly and smooth experience for buyers.",
    user_photoURL: "https://randomuser.me/api/portraits/men/22.jpg",
  },
  {
    userName: "Fatima Rahman",
    testimonial: "Efficient and transparent order tracking. Loved it!",
    user_photoURL: "https://randomuser.me/api/portraits/women/12.jpg",
  },
  {
    userName: "Jahid Hasan",
    testimonial: "Makes managing multiple orders simple and easy.",
    user_photoURL: "https://randomuser.me/api/portraits/men/50.jpg",
  },
];

const FeedBacks = () => {
   const{theme,toggleTheme}= useContext(ThemeContext)
  return (
    <section className={`py-20 mb-5 ${theme === "light" ? " bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50" : "bg-gray-600 "} `}>
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Customer Feedback
        </h2>

        <Swiper
          loop={true}
          spaceBetween={40}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          modules={[Autoplay, Pagination]}
        >
          {feedbacksData.map((feedback, idx) => (
            <SwiperSlide key={idx}>
              <FeedBackCard feedback={feedback} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default FeedBacks;
