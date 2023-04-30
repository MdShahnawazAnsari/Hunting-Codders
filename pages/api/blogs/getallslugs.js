// http://localhost:3000/api/blogs/getallslugs

import connectDb from "@/middleware/mongodb";
import Blog from "@/models/Blog";
import jwt from "jsonwebtoken";

const handler = async (req, res) => {
  try {
    // geting the token from headers
    const token = req.headers["auth-token"];

    // if token is not present then sending NO Authentication token present
    if (!token) {
      return res.status(401).json({ error: "NO Authentication token present" });
    } else {
      try {
        // desutructuring the data from jwt token and authenticating
        const { data } = jwt.verify(token, process.env.JWT_SECRET);

        // getting all slugs
        let allSlugs = await Blog.find({}, { slug: 1 });

        // sending all slugs
        res.status(200).json({ allSlugs });
      } catch (error) {
        // if authentication fails
        res.status(401).json({ error });
      }
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export default connectDb(handler);
