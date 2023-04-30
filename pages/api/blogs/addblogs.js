// http://localhost:3000/api/blogs/addblogs

import connectDb from "@/middleware/mongodb";
import Blog from "@/models/Blog";
import jwt from "jsonwebtoken";

const handler = async (req, res) => {
  try {
    if (req.method === "POST") {
      // geting the token from headers
      const token = req.headers["auth-token"];

      // if token is not present then sending NO Authentication token present
      if (!token) {
        return res
          .status(401)
          .json({ error: "NO Authentication token present" });
      } else {
        try {
          // desutructuring the data from jwt token
          const { data } = jwt.verify(token, process.env.JWT_SECRET);

          // destructuring the required fields from req.body
          const { title, desc, category, slug, author, img } = req.body;

          // creating new blog
          let blog = new Blog({
            user: data.user._id,
            title,
            desc,
            category,
            slug,
            img,
            author,
          });

          await blog.save();

          // sendign the new Blog
          res.status(200).json({ blog });
        } catch (error) {
          // if authentication fails
          res.status(401).json({ error });
        }
      }
    } else {
      // if the method is not post
      res.status(400).json({ error: "this method is Not Allowed" });
    }
  } catch (error) {
    // internal server error
    res.status(500).json({ error });
  }
};

export default connectDb(handler);
