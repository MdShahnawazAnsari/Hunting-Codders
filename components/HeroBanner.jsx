import React from "react";
const HeroBanner = () => {
  return (
    <div className="bg-blend-multiply flex justify-center items-center bg-[url('/heroBanner.webp')] brightness-90 bg-cover h-[50vh] md:h-[80vh] text-white">
      <div className="z-10 ">
        <p className="text-center">Hunting Coders</p>
        <h2 className="text-[16px] md:text-[24px] lg:text-[32px] w-[80%] md:max-w-[40vw] mx-auto font-playfair">
          How To Make funcitons more consice and more readable
        </h2>
        <div className="flex justify-center gap-12 mt-4 max-w-[50vw] text-[8px] md:text-[240x] lg:text-[12px] mx-auto">
          <p>januarry 2023</p>
          <p className="text">2 Min read</p>
        </div>
        <div className="flex justify-center">
          <button className="mx-auto my-5 md:my-10 px-6 md:px-12 py-1 md:py-2 text-[10px] md:text-[12px] lg:text-[16px] bg-lightBrown rounded">
            READ NOW
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
