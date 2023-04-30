// http://localhost:3000/api/blogs/deleteblogs

import connectDb from "@/middleware/mongodb";
import Blog from "@/models/Blog";
import jwt from "jsonwebtoken";
import Axios from "axios";
import { v2 as cloudinary } from "cloudinary";

const handler = async (req, res) => {
  if (req.method === "DELETE") {
    // geting the token from headers
    const token = req.headers["auth-token"];
    // if token is not present then sending NO Authentication token present
    if (!token) {
      return res.status(401).json({ error: "NO Authentication token present" });
    } else {
      try {
        // desutructuring the data from jwt token and authenticating
        const { data } = jwt.verify(token, process.env.JWT_SECRET);

        // deleting the image
        const timestamp = Math.round(new Date().getTime() / 1000);
        const signature = cloudinary.utils.api_sign_request(
          {
            timestamp: timestamp,
            public_id: req.body.public_id,
          },
          process.env.CLOUDINARY_API_SECRET
        );
        let option = {
          api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
          cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
          public_id: req.body.public_id,
          timestamp,
          signature,
        };
        let response = await cloudinary.uploader.destroy(
          req.body.public_id,
          option
        );

        // finding by id and deleting the blog
        await Blog.findByIdAndDelete(req.body._id);

        // sending the message blog deleted
        res.status(200).json({ success: "Blog deleted", response });
      } catch (error) {
        // if authentication fails
        res.status(400).json({ error });
        console.log(error);
      }
    }
  } else {
    res.status(400).json({ error: "this method is Not Allowed" });
  }
};

export default connectDb(handler);
