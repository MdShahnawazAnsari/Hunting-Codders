import HorizontalCarousel from "@/components/carousel/HorizontalCarousel";
import VerticalCarousel from "@/components/carousel/VerticalCarousel";
import Link from "next/link";
import Axios from "axios";

import React, { useEffect } from "react";

const Blogs = ({ horizontalBlogs, verticalBlogs }) => {
  // useEffect(() => {
  //   console.log(allBlogs);
  // }, []);
  return (
    <main>
      <HorizontalCarousel data={horizontalBlogs.categoryBlog} title="Blogs" />
      <VerticalCarousel
        data={verticalBlogs.categoryBlog}
        title="Latest Updates"
      />
      {/* {allBlogs?.map((item) => (
        <Link key={item.slug} href={`/blogposts/${item.slug}`}>
          <div className="max-w-lg mx-4">
            <h3 className="text-center">{item.tittle}</h3>
            <p>{item.description.substr(0, 100)}...</p>
            <h3 className="text-right">--{item.author}</h3>
          </div>
        </Link>
      ))} */}
    </main>
  );
};

export default Blogs;

export async function getServerSideProps(context) {
  const vertical = {
    page: 1,
    limit: 6,
    category: "vertical",
  };
  const horizontal = {
    page: 1,
    limit: 8,
    category: "horizontal",
  };

  let verticalBlogs = await Axios.post(
    `${process.env.NEXT_PUBLIC_DEV_URL}/api/blogs/getsinglecategoryblogs?category=${vertical.category}&page=${vertical.page}&limit=${vertical.limit}`
  );
  // Remove the headers property from the blogs object
  verticalBlogs = JSON.parse(JSON.stringify(verticalBlogs.data));

  let horizontalBlogs = await Axios.post(
    `${process.env.NEXT_PUBLIC_DEV_URL}/api/blogs/getsinglecategoryblogs?category=${horizontal.category}&page=${horizontal.page}&limit=${horizontal.limit}`
  );
  // Remove the headers property from the blogs object
  horizontalBlogs = JSON.parse(JSON.stringify(horizontalBlogs.data));
  return {
    props: { horizontalBlogs, verticalBlogs }, // will be passed to the page component as props
  };
}
