import Image from "next/image";
import React from "react";
import { HiMail } from "react-icons/hi";
import { BsLinkedin, BsTwitter, BsYoutube, BsFacebook } from "react-icons/bs";
import VerticalCarousel from "@/components/carousel/VerticalCarousel";
import Axios from "axios";

const About = ({ verticalBlogs }) => {
  return (
    <main>
      <section className="flex flex-col-reverse md:flex-row w-full md:w-[80%] mx-auto justify-end items-center gap-8 px-10">
        <div className="md:w-[50%]">
          <p className="opacity-60 text-center text-[13px]">Codding Huntters</p>
          <h1 className="font-playfair text-center mb-4 text-[23px] font-bold">
            About Me
          </h1>
          <p className="text-[10px] md:text-[12px] lg:text-[15px] my-4">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laboriosam
            assumenda reiciendis totam fugiat, odit vel eveniet quis? Sint
            molestias quibusdam eos id, beatae fugiat unde debitis velit vero
            facilis repellat distinctio vel, laborum quas, expedita placeat
            possimus? Hic nostrum nam facilis delectus, quis veritatis ut, non
            incidunt error tempora beatae!
            <br />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus,
            maiores! Necessitatibus, hic dicta maxime ducimus illo quae
            inventore atque distinctio architecto repudiandae soluta at officia,
            placeat unde? Ullam sequi veritatis tempora a neque, voluptas,
            dolorem soluta odio ducimus aliquid eum vero quibusdam repellendus
            minima architecto?
          </p>
          <div className="flex justify-around mt-8 md:mt-12 border-black border-b-[1px] py-2 border-t-[1px] text-[10px] mx-auto">
            <h5 className="font-semibold text-[12px] md:text-[15px] hover:text-lightBrown">
              GET IN TOUCH
            </h5>
            <BsFacebook className="hover:text-lightBrown" size={17} />
            <BsLinkedin className="hover:text-lightBrown" size={17} />
            <BsYoutube className="hover:text-lightBrown" size={17} />
            <BsTwitter className="hover:text-lightBrown" size={17} />
            <HiMail className="hover:text-lightBrown" size={17} />
          </div>
        </div>
        <Image
          src="/profile.webp"
          className="rounded-xl mx-auto lg:w-[300px] lg:h-[350px] mb-8"
          width={200}
          height={200}
          alt="profile picture"
        />
      </section>
      <section>
        <VerticalCarousel
          data={verticalBlogs.categoryBlog}
          title="Latest Updates"
        />
      </section>
    </main>
  );
};

export default About;
export async function getServerSideProps(context) {
  const vertical = {
    page: 1,
    limit: 3,
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
