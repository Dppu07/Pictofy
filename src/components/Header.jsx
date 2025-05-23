import React ,{useContext} from "react";
import { assets } from "../assets/assets";
import { motion } from "motion/react";
import { AppContext } from "../context/AppContext"
import { useNavigate } from "react-router-dom";


const Header = () => {

  const{user,setShowLogin} = useContext(AppContext)
  const navigate = useNavigate()
  const handleClick = ()=> {
    if(user){
      navigate("/result")
    }else{
      setShowLogin(true)
    }
  }
  return (
    <motion.div
      className="flex flex-col justify-center items-center text-center my-20"
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <motion.div
        className="text-stone-500 inline-flex text-center px-6 py-1 border bg-white gap-2 rounded-full border-neutral-500"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <p>Best text to image generator</p>
        <img src={assets.star_icon} alt="star" />
      </motion.div>
      <motion.h1 className="text-4xl max-w-[300px] sm:text-7xl sm:max-w-[590px] mx-auto mt-10 text-center">
        Turn text into{" "}
        <span
          className="text-blue-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 2 }}
        >
          images
        </span>
        ,in seconds
      </motion.h1>

      <motion.p className="text-center max-w-xl mx-auto mt-5" 
        initial={{ opacity: 0, y:20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}>
        Unleash the power of AI to create stunning images with just a few
        clicks. Our cutting-edge technology allows you to turn your imagination
        into visual art in seconds.
      </motion.p>
      <motion.button onClick= {handleClick} className="sm:text-lg bg-black text-white px-12 py-2.5 mt-8 items-center text-white w-auto flex gap-2 rounded-full" 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y:20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ default:{duration:0.5}, opacity:{ delay: 0.8, duration: 1}}}
        >
        Generate Now <img className="h-6" src={assets.star_group} alt="arrow" />
      </motion.button>

      <motion.div 
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ delay: 1, duration: 1 }}
        className="flex flex-wrap justify-center mt-14 gap-2">
        {Array(6)
          .fill("")
          .map((item, index) => (
            <motion.img 
              whileHover={{ scale:1.05 , duration: 0.1}}
              className="rounded hover:scale-105 transition-all duration-300 cursor-pointer max-sm:w-10"
              src={index % 2 === 0 ? assets.sample_img_2 : assets.sample_img_1}
              alt=""
              key={index}
              width={70}
            />
          ))}
      </motion.div>
      <motion.p 
        initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ delay: 1.2 , duration: 0.8}}
        className="text-center mt-2 text-neutral-500">
        Generated Images From Imagify
      </motion.p>
    </motion.div>
  );
};
export default Header;
