import React from 'react'
import { commonConstants } from '@/app/utils/constants';

const Banner = () => {
    const  { APP_NAME } = commonConstants;
    return (
      <div className="bg-blue-500 shadow-bannerCustomBoxShadow">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-white text-[3.5rem] drop-shadow-[bannerDropShadow]">
            <b>{APP_NAME}</b>
          </h1>
          <p className="text-white mb-[1rem]">A solution to all your coding problems!</p>
        </div>
      </div>
    );
}

export default Banner