"use client";
import React, { useState, useEffect } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
// import { Playfair } from "next/font/google";
// import { Roboto } from "next/font/google";
// const playfair = Playfair({
//   subsets: ["latin"],
//   weight: ["400", "700"],
// });
// import s1 from "../../assets/slider1.jpg";
// const roboto = Roboto({
//   subsets: ["latin"],
//   weight: ["400", "700"],
// });
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

  const [currentIndex, setCurrentIndex] = useState(0);
  const [textVisible, setTextVisible] = useState(true);

  const changeSlide = (newIndex) => {
    if (newIndex === currentIndex) return;

    setTextVisible(false);
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setTimeout(() => setTextVisible(true), 200);
    }, 300);
  };

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    changeSlide(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    changeSlide(newIndex);
  };

  const goToSlide = (index) => {
    changeSlide(index);
  };

  React.useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className=" h-[700px] w-full m-auto  relative group">
      <div
        style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
        className="w-full h-full bg-center bg-cover duration-500 ease-in-out "
      >
        <div className="w-full h-full justify-center items-center text-center flex flex-col bg-black/20  rounded-2xl">
          <h1
            // ${playfair.className} 
            className={`
              transition-opacity duration-1000 ease-in-out text-[50px] md:text-[80px]  text-white mb-4 ${textVisible ? "opacity-100" : "opacity-0"
              }`}
          >
            {slides[currentIndex].title}
          </h1>
          <h2
            //${roboto.className }
            className={` transition-opacity duration-1000 ease-in-out text-[20px] md:text-[30px] text-white ${textVisible ? "opacity-100" : "opacity-0"
              }`}
          >
            {slides[currentIndex].text}
          </h2>
        </div>
      </div>
      <div className="hidden md:block group-hover:block duration-300 absolute top-1/2 left-5 transform -translate-y-1/2 -translate-x-0 rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <BsChevronCompactLeft onClick={prevSlide} size={30} />
      </div>
      <div className="hidden md:block group-hover:block duration-300 absolute top-1/2 right-5 transform -translate-y-1/2 -translate-x-0 rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <BsChevronCompactRight onClick={nextSlide} size={30} />
      </div>
      <div className="absolute bottom-4 left-0 right-0 flex justify-center">
        {slides.map((slide, slideIndex) => (
          <div
            className="text-2xl cursor-pointer mx-1"
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
          >
            <RxDotFilled
              size={20}
              className={
                slideIndex === currentIndex ? "text-black" : "text-white"
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
