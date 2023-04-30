import Image from "next/image";
import React from "react";
import { HiMail } from "react-icons/hi";
import { BsLinkedin, BsTwitter, BsYoutube, BsFacebook } from "react-icons/bs";

const categoryData = [
  {
    title: "Technology",
    id: 1,
    imgUrl: "/category/technology.webp",
  },
  {
    title: "Codding",
    id: 2,
    imgUrl: "/category/codding.webp",
  },
  {
    title: "tricks",
    id: 3,
    imgUrl: "/category/tricks.webp",
  },
  {
    title: "Get Updated",
    id: 4,
    imgUrl: "/category/update.webp",
  },
  {
    title: "JavaScript",
    id: 5,
    imgUrl: "/category/javascript.webp",
  },
  {
    title: "React",
    id: 6,
    imgUrl: "/category/react.webp",
  },
];

const AboutMe = () => {
  return (
    <section className="md:pl-12">
      <div className="my-6">
        <p className="opacity-80 text-[8px] md:text-[12px]">Codding Huntters</p>
        <h2 className="font-playfair text-[15px] md:text-[19px] lg:text-[23px] font-bold">
          About Me
        </h2>
      </div>
      <Image
        src="/profile.webp"
        width={150}
        height={100}
        className="object-cover h-[20vh] md:h-[27vh] aspect-square rounded-[49%]"
        alt="Profile Image"
      />
      <h3 className="font-playfair font-bold  text-[12px] md:text-[15px] lg:text-[18px] mt-8">
        Hi There
      </h3>
      <p className="text-[12px] md:text-[15px] opacity-90 w-[90%] leading-7">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sint, laborum
        quas animi, dolore natus consequuntur nobis expedita maiores, aut dolor
        similique quidem! Ducimus quam exercitationem delectus consectetur modi
        <br />
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque nesciunt
        rem eaque pariatur molestias quis optio ipsam! Ipsum inventore veniam
        delectus quidem numquam, molestiae neque assumenda quae quos! Fugiat,
      </p>
      <div className="flex justify-between mt-16">
        <div className="flex justify-around mb-6 border-black border-b-[1px] py-2 border-t-[1px] w-full mr-8 text-[10px] mx-auto">
          <h3 className="font-semibold text-[12px] md:text-[15px] lg:text-[18px]">
            GET IN TOUCH
          </h3>
          <div className="flex gap-2 text-[12px] md:text-[18px]">
            <BsFacebook className="hover:text-lightBrown" />
            <BsLinkedin className="hover:text-lightBrown" />
            <BsYoutube className="hover:text-lightBrown" />
            <BsTwitter className="hover:text-lightBrown" />
            <HiMail className="hover:text-lightBrown" />
          </div>
        </div>
      </div>
      <div className="border-b-[2px] flex flex-col border-lightBrown mr-6 mb-8">
        <h2 className="mb-4 ml-4 font-semibold mr-12 text-right">Categories</h2>
        {categoryData.map((item) => (
          <div
            key={item.id}
            className="flex gap-2 md:gap-4 justify-end items-center mb-4 md:mb-8"
          >
            <h3 className="font-semibold text-[12px] md:text-[15px] lg:text-[18px] uppercase font-playfair hover:text-lightBrown">
              {item.title}
            </h3>
            <Image
              src={item.imgUrl}
              width={50}
              height={30}
              className="object-cover rounded-[49%]"
              alt={item.title}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutMe;
