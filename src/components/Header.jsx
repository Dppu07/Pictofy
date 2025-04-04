import React from "react";
import { assets } from "../assets/assets";

const Header = () => {
  return (
    <div className="flex flex-col justify-center items-center text-center my-20">
      <div className="text-stone-500 inline-flex text-center px-6 py-1 border bg-white gap-2 rounded-full border-neutral-500">
        <p>Best text to image generator</p>
        <img src={assets.star_icon} alt="star" />
      </div>
      <h1 className="text-4xl max-w-[300px] sm:text-7xl sm:max-w-[590px] mx-auto mt-10 text-center">
        Turn text into <span className="text-blue-600">images</span>,in seconds
      </h1>

      <p className="text-center max-w-xl mx-auto mt-5">
        {" "}
        Unleash the power of AI to create stunning images with just a few
        clicks. Our cutting-edge technology allows you to turn your imagination
        into visual art in seconds.
      </p>
      <button className="sm:text-lg bg-black text-white px-12 py-2.5 mt-8 items-center text-white w-auto flex gap-2 rounded-full">
        Generate Now <img className="h-6" src={assets.star_group} alt="arrow" />
      </button>

      <div>
        {Array(6).fill('').map((item, index) =>(
          <img src={assets.sample_img_1} alt="" key={index} width={70} />
      ))}
      </div>
    </div>
  );
};
export default Header;
