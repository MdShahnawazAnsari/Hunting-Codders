import VerticalCarousel from "@/components/carousel/VerticalCarousel";
import Image from "next/image";
import React, { useState } from "react";
import Axios from "axios";

const Contact = ({ verticalBlogs }) => {
  const [inputData, setInputData] = useState({
    name: "",
    email: "",
    subject: "",
    desc: "",
  });
  const onChangeHandler = (e) => {
    setInputData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <>
      <main>
        <section className="flex flex-col md:flex-row w-[80%] mx-auto justify-center items-center gap-4 md:justify-between">
          <Image
            src="/profile.webp"
            className="rounded-lg aspect-[9/16] h-[60vh]"
            width={350}
            height={100}
            alt="profile picture"
          />
          <div className="w-[50%]">
            <p className="opacity-60 text-[13px]">Codding Huntters</p>
            <h1 className="font-playfair mb-4 text-[23px] font-bold">
              Contact Me
            </h1>
            <p className="text-[15px] mb-8">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Temporibus accusantium optio quae repudiandae ratione quia sunt
              veniam vel quibusdam voluptatibus eaque, alias quod eius harum
              ipsa amet provident commodi tempora laborum? Debitis fugiat porro
              iste, culpa provident reprehenderit! Doloremque necessitatibus
              illo voluptatem ex, non fugiat?
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
              className="w-[90%] text-[8px] md:text-[12px] lg:text-[15px] "
            >
              <label htmlFor="name">
                <input
                  type="text"
                  name="name"
                  value={inputData.name}
                  className="mb-2 outline-none border-[1px] w-full px-4 py-3 rounded"
                  placeholder="Your Name"
                  onChange={(e) => onChangeHandler(e)}
                />
              </label>
              <label htmlFor="email">
                <input
                  type="email"
                  name="email"
                  value={inputData.email}
                  className="mb-2 outline-none border-[1px] w-full px-4 py-3 rounded"
                  placeholder="your Email"
                  onChange={(e) => onChangeHandler(e)}
                />
              </label>
              <label htmlFor="description">
                <input
                  type="text"
                  name="subject"
                  value={inputData.subject}
                  className="mb-2 outline-none border-[1px] w-full px-4 py-3 rounded"
                  placeholder="Subject"
                  onChange={(e) => onChangeHandler(e)}
                />
              </label>
              <label htmlFor="message">
                <textarea
                  type="text"
                  name="desc"
                  value={inputData.desc}
                  className="mb-2 outline-none border-[1px] w-full px-4 py-3 rounded"
                  placeholder="Message"
                  onChange={(e) => onChangeHandler(e)}
                />
              </label>
              <button
                type="submit"
                className="text-white px-4 py-1 text-[10px] md:text-[12px] lg:text-[15px] bg-lightBrown rounded"
              >
                SUBMIT
              </button>
            </form>
          </div>
        </section>
        {/* <section>
          <VerticalCarousel
            data={verticalBlogs.categoryBlog}
            title="Latest Updates"
          />
        </section> */}
      </main>
    </>
  );
};

export default Contact;

export async function getServerSideProps(context) {
  const vertical = {
    page: 1,
    limit: 6,
    category: "vertical",
  };

  let verticalBlogs = await Axios.post(
    `${process.env.NEXT_PUBLIC_DEV_URL}/api/blogs/getsinglecategoryblogs?category=${vertical.category}&page=${vertical.page}&limit=${vertical.limit}`
  );
  // Remove the headers property from the blogs object
  verticalBlogs = JSON.parse(JSON.stringify(verticalBlogs.data));

  return {
    props: { verticalBlogs }, // will be passed to the page component as props
  };
}
