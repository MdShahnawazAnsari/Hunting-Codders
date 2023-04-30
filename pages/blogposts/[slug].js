import React, { useEffect } from "react";
import Axios from "axios";
import AboutMe from "@/components/AboutMe";
import VerticalCarousel from "@/components/carousel/VerticalCarousel";
import RenderHtml from "@/components/RenderHtml";
import Image from "next/image";
import { AiOutlineCalendar } from "react-icons/ai";
import { formatDate } from "@/utils/helper";

const Blogs = ({ blog, verticalBlogs }) => {
  return (
    <>
      <main>
        <div className="flex flex-col md:flex-row justify-center items-center w-[80%] mx-auto">
          <section className="w-full  md:w-[65%]">
            {blog?.singleBlog && (
              <>
                <p className="text-[13px] opacity-75">Hunting Coders</p>
                <h2 className="font-bold text-lg md:text-xl lg:text-2xl mb-2 md:mb-4 lg:mb-6 font-playfair">
                  {blog?.singleBlog?.title}
                </h2>
                <div className="flex justify-center items-center gap-4 my-8">
                  <Image
                    src="/profile.webp"
                    width={50}
                    height={50}
                    className="rounded-[50%] aspect-square object-cover"
                    alt="profile picture"
                  />
                  <p className="text-[13px] opacity-75">
                    BY {blog?.singleBlog?.author}
                  </p>
                  <p className="flex items-center text-[11px] opacity-75">
                    <span className="mr-4">
                      <AiOutlineCalendar
                        size={15}
                        className="relative bottom-[2px]"
                      />
                    </span>
                    On {formatDate(blog?.singleBlog?.updatedAt)}
                  </p>
                </div>
                <Image
                  src={blog?.singleBlog?.img}
                  alt={blog?.singleBlog?.title}
                  width={600}
                  height={500}
                  className="aspect-[18/12] rounded my-16"
                />
                <RenderHtml content={blog?.singleBlog?.desc} />
              </>
            )}
          </section>
          <section className="w-full md:w-[35%]">
            <AboutMe />
          </section>
        </div>
        <VerticalCarousel
          data={verticalBlogs?.categoryBlog}
          title="Latest Updates"
        />
      </main>
    </>
  );
};

export async function getServerSideProps(context) {
  const vertical = {
    page: 1,
    limit: 3,
    category: "vertical",
  };
  let blog = await Axios.post(
    `${process.env.NEXT_PUBLIC_DEV_URL}/api/blogs/getsingleblog?slug=${context.query.slug}`
  );
  // Remove the headers property from the blogs object
  blog = JSON.parse(JSON.stringify(blog.data));
  let verticalBlogs = await Axios.post(
    `${process.env.NEXT_PUBLIC_DEV_URL}/api/blogs/getsinglecategoryblogs?category=${vertical.category}&page=${vertical.page}&limit=${vertical.limit}`
  );
  // Remove the headers property from the blogs object
  verticalBlogs = JSON.parse(JSON.stringify(verticalBlogs.data));
  return {
    props: { blog, verticalBlogs }, // will be passed to the page component as props
  };
}

export default Blogs;
