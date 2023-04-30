// http://localhost:3000/api/blogs/searchblogs?search=intel

import connectDb from "@/middleware/mongodb";
import Blog from "@/models/Blog";

const handler = async (req, res) => {
  const meta = {};
  try {
    const { search } = req.query;
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    if (startIndex > 0) {
      meta.previous = {
        page: page - 1,
      };
    }

    if (
      endIndex <
      (await Blog.find({
        title: { $regex: search, $options: "i" },
      }).countDocuments())
    ) {
      meta.next = {
        page: page + 1,
      };
    }

    meta.results = {
      result: limit,
      totalResults: await Blog.find({
        title: { $regex: search, $options: "i" },
      }).countDocuments(),
    };

    if (!search)
      return res
        .status(400)
        .json({ message: "Missing required parameter 'category'" });

    let searchResult = await Blog.find({
      title: { $regex: search, $options: "i" },
    })
      .limit(limit)
      .skip(startIndex);
    if (searchResult) res.status(200).json({ searchResult, meta });
    else {
      res.status(200).json({ error: "No blog Found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export default connectDb(handler);
