import Image from "next/image";
import React from "react";
import { AiOutlineCalendar } from "react-icons/ai";
import { formatDate } from "@/utils/helper";
import Link from "next/link";

const RecentPost = ({ data }) => {
  return (
    <section>
      <div className="my-6 ml-4">
        <p className="opacity-80  text-[8px] md:text-[12px]">
          Codding Huntters
        </p>
        <h2 className="font-playfair text-[15px] md:text-[19px] lg:text-[23px] font-bold">
          Reacent Posts
        </h2>
      </div>
      <div>
        {data.map((item) => (
          <div
            key={item?._id}
            className="flex gap-3 mb-14 justify-between items-center"
          >
            <Link href={`/blogposts/${item?.slug}`}>
              <Image
                src={item?.img}
                alt={item?.title}
                width={150}
                height={100}
                className="object-cover h-[18vh] md:h-[23vh] aspect-square
               rounded"
              />
            </Link>
            <div className="w-[75%]">
              <p className="opacity-80 mb-1 text-[8px] md:text-[12px]">
                Featured Post
              </p>
              <h3 className="font-playfair font-semibold my-1  text-[12px] md:text-[15px] lg:text-[18px]">
                {item?.title}
              </h3>
              <div className="flex gap-3 mt-3 mb-2 items-center text-[8px] md:text-[12px] justify-start">
                <span className="opacity-70">
                  <AiOutlineCalendar size={12} />
                </span>
                On {" " + formatDate(item?.updatedAt)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentPost;
