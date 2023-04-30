import Head from "next/head";
import HeroBanner from "@/components/HeroBanner";
import VerticalCarousel from "@/components/carousel/VerticalCarousel";
import HorizontalCarousel from "@/components/carousel/HorizontalCarousel";
import RecentPost from "@/components/RecentPost";
import AboutMe from "@/components/AboutMe";
import Axios from "axios";

export default function Home({ verticalBlogs, horizontalBlogs }) {
  return (
    <>
      <Head>
        <title>Codding Hunters</title>
        <meta name="description" content="Codeing Hunters for coders " />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main>
        <HeroBanner />
        <VerticalCarousel
          data={verticalBlogs?.categoryBlog}
          title="All About JavaScript"
        />
        <HorizontalCarousel
          data={horizontalBlogs?.categoryBlog}
          title="Coding Tricks Collection"
        />
        <div className="flex justify-center items-center flex-col md:flex-row md:w-[80%] mx-auto gap-6 md:gap-12">
          <div className="left w-[90%] mx-auto md:w-[45vw]">
            <RecentPost data={horizontalBlogs?.categoryBlog} />
          </div>
          <div className="right w-[90%] mx-auto md:w-[45vw]">
            <AboutMe />
          </div>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps(context) {
  const vertical = {
    page: 1,
    limit: 3,
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
