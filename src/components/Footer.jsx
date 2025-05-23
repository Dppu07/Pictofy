import React from 'react';
import {assets} from '../assets/assets';

const Footer = () =>{
  return(
    <div className='flex items-center justify-between mt-20 py-3 gap-4'>
    <img src = {assets.logo} alt = "logo" className='w-150'/>

      <p className='flex-1 border-l border-gray-400 pl-4 text-gray-500 text-sm max-sm:hidden'> 
        Copyright © Imagify-Darpan | All rights reserved.</p>
        <div className='flex gap-2.5'>
        <img src = {assets.facebook_icon} alt = "" className='h-35'/>
          <img src = {assets.twitter_icon} alt = "" className='h-35'/>
          <img src = {assets.instagram_icon} alt = "" className='h-35'/>
        </div>
    </div>
    )
  }
      
export default Footer;