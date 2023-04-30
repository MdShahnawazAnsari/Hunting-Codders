// // http://localhost:3000/api/blog?slug=how-to-create-nextjs

// import fs from "fs/promises";

// export default async function handler(req, res) {
//   try {
//     const { slug } = req.query;
//     if (!slug) throw new Error("Missing required parameter 'slug'");

//     const data = await fs.readFile(`blogsdata/${slug}.json`, "utf-8");
//     const blog = JSON.parse(data);

//     res.status(200).json(blog);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to retrieve blog post" });
//   }
// }

// http://localhost:3000/api/blogs/getsingleblog

import connectDb from "@/middleware/mongodb";
import Blog from "@/models/Blog";

const handler = async (req, res) => {
  try {
    const { slug } = req.query;
    if (!slug) throw new Error("Missing required parameter 'slug'");
    let singleBlog = await Blog.findOne({ slug: slug });
    if (singleBlog) res.status(200).json({ singleBlog });
    else {
      res.status(200).json({ error: "No blog Found" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default connectDb(handler);
