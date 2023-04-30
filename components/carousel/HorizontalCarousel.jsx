import React from "react";
import Image from "next/image";
import { AiOutlineCalendar } from "react-icons/ai";
import Link from "next/link";
import { formatDate } from "@/utils/helper";

const categoryData = [
  "Technology",
  "Codding",
  "tricks",
  "Get Updated",
  "JavaScript",
  "React",
];
const HorizontalCarousel = ({ data, title }) => {
  return (
    <div className="my-12 w-full md:w-[80%] mx-auto">
      <p className="text-center text-[13px] opacity-75">Hunting Coders</p>
      <h2 className="text-center font-bold text-lg md:text-xl mb-6 font-playfair">
        {title}
      </h2>
      <div className="flex justify-around mb-6 text-[12px] md:text-[15px] lg:text-[20px] border-black border-b-[1px] py-2 border-t-[1px] w-[90%] mx-auto">
        {categoryData.map((item) => (
          <div className="hover:text-lightBrown" key={item}>
            {item}
          </div>
        ))}
      </div>
      <div className="flex justify-center md:justify-between flex-wrap gap-4 w-[90%] mx-auto">
        {data?.map((item) => (
          <div
            key={item?._id}
            className="w-[25vw] md:w-[20vw] lg:w-[15vw] my-4 flex justify-center items-center flex-col shadow-md"
          >
            <Image
              src={item?.img}
              width={220}
              height={180}
              className="object-cover aspect-square"
              alt={item?.title}
            />
            <div className="flex justify-center items-center flex-col w-[80%]">
              <p className="text-[8px] md:text-[12px] opacity-75 mt-3">
                {item?.category}
              </p>
              <h3 className="font-semibold mb-1 text-center text-[10px] md:text-[15px] lg:text-[17px] font-playfair">
                {item.title.slice(0, 35)}...
              </h3>
              <p className="flex items-center justify-center w-full my-2 text-[6px] md:text-[11px] opacity-75">
                <span className="mr-2 md:mr-4 text-[6px] md:text-[12px]">
                  <AiOutlineCalendar size={12} />
                </span>
                On {formatDate(item?.updatedAt)}
              </p>
              <button className="my-1 border text-white px-2 md:px-6 py-2 text-[6px] md:text-[9px] bg-lightBrown rounded">
                <Link href={`/blogposts/${item?.slug}`}>READ NOW</Link>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HorizontalCarousel;
