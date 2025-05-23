import React from 'react';
import { assets } from '../assets/assets';
import { motion } from 'motion/react';
const Description = () => {
  return(
    <motion.div 
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className ='flex flex-col items-center justify-center my-24 p-6 md:px-28 '>
      
      <h1 className ='text-3xl sm:text-4xl font-semibold mb-2'>Create AI Images</h1>
      
      <p className ='text-gray-500 mb-8'>Turn your imagination into visuals</p>
     
      <div className='flex flex-col gap-5 md:gap-14 md:flex-row'>
      <img src ={assets.sample_img_1} alt ='' className ='w-70 xl:w-96 rounded-lg ' />
     
        <div>
     <h2 className ='text-3xl font-medium max-w-lg mb-4'>Introducing the AI-Powered Text To Image Generator</h2>
       <p className='text-gray-500 mb-4'>Easily bring your ides into life with our cutting-edge technology. Generate stunning images with our AI-powered text to image generator. Unleash the power of AI to create stunning images with just a few clicks
         </p>
       <p className='text-gray-500'>Simply type in your prompt and let our AI generate the image for you.From product visuals to business cards, our AI-powered text to image generator is your go-to solution for creating stunning images.Powered by the latest AI technology, our text to image generator is designed to deliver high-quality images that reflect your brand's identity and message.
       </p>
     </div>
      </div>
    </motion.div>
    )
}
export default Description;