import React, { useState } from "react";
import { HiMail } from "react-icons/hi";
import { BsLinkedin, BsTwitter, BsYoutube, BsFacebook } from "react-icons/bs";
import Link from "next/link";

const Footer = () => {
  const [inputData, setInputData] = useState({
    name: "",
    email: "",
    desc: "",
  });
  const onChangeHandler = (e) => {
    setInputData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <footer
      id="footer"
      className="footer bottom-0 relative w-[80%] mx-auto mb-4 mt-12"
    >
      <div className="flex flex-col md:flex-row justify-center md:justify-between gap-4 border-lightBrown py-6 border-t-[1px] border-b-[1px]">
        <section className="w-full shadow-sm">
          <div className="text-[12px] md:text-[15px] lg:text-[20px] font-bold">
            Logo
          </div>
          <p className="text-[8px] md:text-[12px] lg:text-[15px] text-black opacity-50 my-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
            laboriosam consequuntur laborum repellat maxime, quisquam earum
            facilis odio ducimus reiciendis temporibus. Minima eaque obcaecati
          </p>
          <div className="flex gap-4 text-lightBrown">
            <BsFacebook size={20} />
            <BsLinkedin size={20} />
            <BsYoutube size={20} />
            <BsTwitter size={20} />
            <HiMail size={20} />
          </div>
        </section>
        <section className="flex flex-col min-w-[25%] shadow-sm gap-1">
          <h3 className="font-playfair font-bold text-[12px] md:text-[15px] lg:text-[20px] mb-1 md:mb-4">
            Quick Links
          </h3>
          <Link
            className="cursor-pointer text-[12px] md:text-[15px] lg:text-[20px] w-[40%]"
            href="/"
          >
            Home
          </Link>
          <Link
            className="cursor-pointer text-[12px] md:text-[15px] lg:text-[20px] w-[40%]"
            href="/"
          >
            About me
          </Link>
          <Link
            className="cursor-pointer text-[12px] md:text-[15px] lg:text-[20px] w-[40%]"
            href="/"
          >
            Blogs
          </Link>
          <Link
            className="cursor-pointer text-[12px] md:text-[15px] lg:text-[20px] w-[40%]"
            href="/"
          >
            Contact
          </Link>
        </section>
        <section className="shadow-sm">
          <h3 className="font-playfair font-bold text-[12px] md:text-[15px] lg:text-[20px] mb-4">
            Subscribe To Newsletter
          </h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              console.log(inputData);
            }}
            className="text-[8px] md:text-[12px] lg:text-[15px]"
          >
            <label htmlFor="description">
              <input
                type="text"
                name="desc"
                value={inputData.desc}
                className="mb-2 outline-none border-[1px] w-full px-2 md:px-4 py-1 md:py-3 rounded"
                placeholder="What Kind Of Content Do You Want To See?"
                onChange={(e) => onChangeHandler(e)}
              />
            </label>
            <label htmlFor="name">
              <input
                type="text"
                name="name"
                value={inputData.name}
                className="mb-2 outline-none border-[1px] w-full px-2 md:px-4 py-1 md:py-3  rounded"
                placeholder="Your Name"
                onChange={(e) => onChangeHandler(e)}
              />
            </label>
            <label htmlFor="email">
              <input
                type="email"
                name="email"
                value={inputData.email}
                className="mb-2 outline-none border-[1px] w-full px-2 md:px-4 py-1 md:py-3 rounded"
                placeholder="your Email"
                onChange={(e) => onChangeHandler(e)}
              />
            </label>
            <button
              type="submit"
              className="w-full text-white py-2 text-[12px] md:text-[15px] bg-lightBrown rounded"
            >
              SUBSCRIBE NOW
            </button>
          </form>
        </section>
      </div>
      <div className="md:flex text-center justify-between my-2 text-[8px] md:text-[12px] lg:text-[15px]">
        <p>Terms &#38; Conditions</p>
        <p>copyright&#169;2023 Hunting Codders All Rigths Reserved</p>
        <p>Privacy Policy</p>
      </div>
    </footer>
  );
};

export default Footer;
