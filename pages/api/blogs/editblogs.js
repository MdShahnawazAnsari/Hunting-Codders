// http://localhost:3000/api/blogs/editblogs

import connectDb from "@/middleware/mongodb";
import Blog from "@/models/Blog";
import jwt from "jsonwebtoken";

const handler = async (req, res) => {
  if (req.method === "POST") {
    // geting the token from headers
    const token = req.headers["auth-token"];

    // if token is not present then sending NO Authentication token present
    if (!token) {
      return res.status(401).json({ error: "NO Authentication token present" });
    } else {
      try {
        // desutructuring the data from jwt token and authenticating
        const { data } = jwt.verify(token, process.env.JWT_SECRET);

        // seting the old user id into the users id whose trying to update
        req.body.user = data.user._id;

        // updating the blog
        let updatedBlog = await Blog.findByIdAndUpdate(req.body._id, req.body, {
          new: true,
        });

        // sending the updated blog
        res.status(200).json({ updatedBlog });
      } catch (error) {
        // if authentication fails
        res.status(401).json({ error });
      }
    }
  } else {
    res.status(400).json({ error: "this method is Not Allowed" });
  }
};

export default connectDb(handler);
