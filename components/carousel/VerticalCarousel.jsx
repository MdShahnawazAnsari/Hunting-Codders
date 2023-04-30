import { formatDate } from "@/utils/helper";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiOutlineCalendar } from "react-icons/ai";

const VerticalCarousel = ({ data, title }) => {
  return (
    <div className="my-12 w-full md:w-[80%] mx-auto">
      <p className="text-center text-[13px] opacity-75">Hunting Coders</p>
      <h2 className="text-center font-bold text-xl mb-2 font-playfair">
        {title}
      </h2>
      <div className="flex justify-center md:justify-around flex-wrap gap-4 md:gap-0 w-[90%] mx-auto">
        {data?.map((item) => (
          <div
            key={item?._id}
            className="w-[40vw] md:w-[20vw] lg:w-[20vw] my-4 flex justify-center items-center flex-col shadow-md"
          >
            <div className="w-32 lg:w-64">
              <Image
                src={item?.img}
                width={300}
                height={100}
                className="object-covert aspect-[12/16]"
                alt={item?.title}
              />
            </div>
            <div className="flex justify-center items-center flex-col md:w-[80%]">
              <p className="text-[8px] md:text-[15px] opacity-75 mt-3">
                {item?.category}
              </p>
              <h3 className="font-semibold text-center w-[80%] min-h-[30px] text-[10px] md:text-[15px] lg:text-[20px] font-playfair">
                {item?.title.slice(0, 35)}...
              </h3>
              <p className="flex items-center justify-center w-full my-2 text-[6px] md:text-[13px] opacity-75">
                <span className="mr-2 md:mr-4 text-[6px] md:text-[12px]">
                  <AiOutlineCalendar />
                </span>
                On {formatDate(item?.updatedAt)}
              </p>
              <Link
                href={`/blogposts/${item?.slug}`}
                className="my-1 border text-white px-2 md:px-8 py-2 text-[6px] md:text-[11px] bg-lightBrown rounded"
              >
                READ NOW
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerticalCarousel;
