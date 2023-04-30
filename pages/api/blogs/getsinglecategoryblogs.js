// http://localhost:3000/api/blogs/getsinglecategoryblogs?category=vertical

import connectDb from "@/middleware/mongodb";
import Blog from "@/models/Blog";

const handler = async (req, res) => {
  const meta = {};
  try {
    const { category } = req.query;
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    if (startIndex > 0) {
      meta.previous = {
        page: page - 1,
      };
    }

    if (endIndex < (await Blog.find({ category: category }).countDocuments())) {
      meta.next = {
        page: page + 1,
      };
    }

    meta.results = {
      result: limit,
      totalResults: await Blog.find({ category: category }).countDocuments(),
    };

    if (!category)
      return res
        .status(400)
        .json({ message: "Missing required parameter 'category'" });
    let categoryBlog = await Blog.find({ category: category })
      .limit(limit)
      .skip(startIndex);
    if (categoryBlog) res.status(200).json({ categoryBlog, meta });
    else {
      res.status(404).json({ error: "No blog Found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export default connectDb(handler);
