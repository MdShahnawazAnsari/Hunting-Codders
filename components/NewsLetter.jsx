import React, { useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";

const NewsLetter = () => {
  const [inputData, setInputData] = useState({
    name: "",
    email: "",
  });
  const onChangeHandler = (e) => {
    setInputData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <div
      id="news_letter"
      className="bg-[url('/news-letter.jpg')] flex items-center bg-cover px-4 py-10 md:py-12 lg:py-14 mb-12 brightness-90 w-[80%] mx-auto"
    >
      <div className="mx-auto relative text-white z-10">
        <section className="w-[80%] mx-auto">
          <h2 className="text-[8px] md:text-[17px] lg:text-[25px] font-semibold font-playfair">
            Subscribe To Our Newsletter For Daily Updates For New Technology
          </h2>
          <p className="opacity-80 text-[6px] md:text-[10px] lg:text-[12px]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
            saepe ad voluptas ab reprehenderit repellat consectetur accusantium
            sint reiciendis earum.
          </p>
        </section>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log(inputData);
          }}
          className="flex justify-evenly items-center gap-2"
        >
          <label className="text-[8px] md:text-[12px] lg:text-[15px]">
            <span className="relative top-[9px] md:top-[14px] lg:top-[20px] left-1 text-black opacity-50">
              <BsPerson />
            </span>
            <input
              type="text"
              name="name"
              value={inputData.name}
              className="outline-none rounded pl-4 lg:py-1 md:pl-6 text-black"
              placeholder="Name"
              onChange={(e) => onChangeHandler(e)}
            />
          </label>
          <label className="text-[8px] md:text-[12px] lg:text-[15px]">
            <span className="relative top-[9px] md:top-[14px] lg:top-[22px] left-1 text-black opacity-50">
              <AiOutlineMail />
            </span>
            <input
              type="email"
              name="email"
              value={inputData.email}
              className="outline-none rounded pl-4 lg:py-1 md:pl-6 text-black"
              placeholder="Email"
              onChange={(e) => onChangeHandler(e)}
            />
          </label>
          <button
            className="text-[8px] md:text-[12px] lg:text-[15px] mt-2 lg:mt-4 bg-lightBrown px-2 md:px-4 py-0 lg:py-1 hover:opacity-75 rounded"
            type="submit"
          >
            Submit Now
          </button>
        </form>
      </div>
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-70" />
    </div>
  );
};

export default NewsLetter;
