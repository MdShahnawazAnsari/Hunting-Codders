// // http://localhost:3000/api/blogs/getallblogs?page=1&limit=10

import connectDb from "@/middleware/mongodb";
import Blog from "@/models/Blog";

const handler = async (req, res) => {
  const meta = {};
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    if (startIndex > 0) {
      meta.previous = {
        page: page - 1,
      };
    }
    if (endIndex < (await Blog.countDocuments())) {
      meta.next = {
        page: page + 1,
      };
    }

    meta.results = { result: limit, totalResults: await Blog.countDocuments() };

    let allBlogs = await Blog.find().limit(limit).skip(startIndex);
    res.status(200).json({ allBlogs, meta });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default connectDb(handler);
