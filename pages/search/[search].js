import React from "react";
import Axios from "axios";
import HorizontalCarousel from "@/components/carousel/HorizontalCarousel";
import VerticalCarousel from "@/components/carousel/VerticalCarousel";

const Search = ({ searchResults, horizontalBlogs, search }) => {
  return (
    <main className="">
      <VerticalCarousel
        data={searchResults.searchResult}
        title={`Your Search Results of "${search}"`}
      />
      <HorizontalCarousel
        data={horizontalBlogs?.categoryBlog}
        title="Recent Post"
      />
    </main>
  );
};

export default Search;

export async function getServerSideProps(context) {
  const { search } = context.query;
  const horizontal = {
    page: 1,
    limit: 8,
    category: "horizontal",
  };
  let searchResults = await Axios.post(
    `${process.env.NEXT_PUBLIC_DEV_URL}/api/blogs/searchblogs?search=${search}&page=1&limit=5`
  );
  // Remove the headers property from the blogs object
  searchResults = JSON.parse(JSON.stringify(searchResults.data));
  let horizontalBlogs = await Axios.post(
    `${process.env.NEXT_PUBLIC_DEV_URL}/api/blogs/getsinglecategoryblogs?category=${horizontal.category}&page=${horizontal.page}&limit=${horizontal.limit}`
  );
  // Remove the headers property from the blogs object
  horizontalBlogs = JSON.parse(JSON.stringify(horizontalBlogs.data));
  return {
    props: { searchResults, horizontalBlogs, search }, // will be passed to the page component as props
  };
}
