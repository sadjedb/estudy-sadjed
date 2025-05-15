"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Slider = () => {
  const slides = [
    {
      url: "https://eng.univ-setif.dz/images/Banni%C3%A8re.jpg",
      title: "Welcome to Our University",
      text: "Explore our diverse programs and vibrant campus life",
    },
    {
      url: "https://ancien-eng.univ-setif.dz/assets/ufas-5945f6222070cb63c96ea4bf865576be985301069a10f2736cc027068e727627.jpg",
      title: "Academic Excellence",
      text: "Join a community of scholars and pursue your academic passions",
    },
    {
      url: "https://iceeac23.univ-setif.dz/images/base/slide/212076-campus-el-bez.jpg",
      title: "Innovative Research",
      text: "Engage in groundbreaking research and make a difference",
    },
  ];

  return (
    <div className="relative h-[700px] w-full bg-black">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        pagination={{ clickable: true }}
        loop={true}
        speed={1000}
        preloadImages={true}
        className="h-full w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full w-full bg-black">
              <Image
                src={slide.url}
                alt={slide.title}
                fill
                className="object-cover object-center"
                priority={index < 2}
                sizes="100vw"
                quality={80}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center p-4">
                <AnimatePresence mode="wait">
                  <motion.h1
                    key={`title-${index}`}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-4xl md:text-6xl lg:text-7xl text-white mb-4 md:mb-6 font-playfair"
                  >
                    {slide.title}
                  </motion.h1>
                </AnimatePresence>

                <AnimatePresence mode="wait">
                  <motion.p
                    key={`text-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="text-lg md:text-xl lg:text-2xl text-white max-w-2xl mx-auto font-roboto"
                  >
                    {slide.text}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
          </SwiperSlide>
        ))}

        <div className="swiper-button-prev !text-white !w-12 !h-12 after:!text-3xl hover:!opacity-80 transition-opacity" />
        <div className="swiper-button-next !text-white !w-12 !h-12 after:!text-3xl hover:!opacity-80 transition-opacity" />
      </Swiper>

      <style jsx global>{`
        .swiper-wrapper {
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }

        .swiper-pagination-bullet {
          background: #fff !important;
          opacity: 0.8 !important;
          width: 12px !important;
          height: 12px !important;
          transition: all 0.3s ease !important;
        }

        .swiper-pagination-bullet-active {
          background: #000 !important;
          opacity: 1 !important;
          transform: scale(1.2) !important;
        }
      `}</style>
    </div>
  );
};

export default Slider;
