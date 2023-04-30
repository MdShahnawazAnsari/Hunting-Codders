// http://localhost:3000/api/user/adduser

import connectDb from "@/middleware/mongodb";
import User from "@/models/User";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";

const handler = async (req, res) => {
  try {
    if (req.method === "POST") {
      // check the already exist or not
      let getUser = await User.findOne({ email: req.body.email });
      // if user not foundt
      if (getUser === null) {
        // verifying the new user Secret
        if (req.body.secret !== process.env.MY_SECRET_FOR_NEW_USER)
          return res
            .status(200)
            .json({ error: "You Are Not Allowed to Create An Account" });

        // encrypting user password from crypto js
        const cryptoPassword = CryptoJS.AES.encrypt(
          req.body.password,
          process.env.CRYPTO_JS_SECRET
        ).toString();

        //  adding new user in the database
        let newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: cryptoPassword,
        });

        const data = {
          user: {
            _id: newUser._id,
          },
        };
        // generating the jwt token with user id
        const token = jwt.sign({ data }, process.env.JWT_SECRET);

        await newUser.save();
        // sending the user and token
        res.status(200).json({ newUser, token });
      } else {
        res.status(200).json({ message: "this email already exist" });
      }
    } else {
      // for api call is other then post
      res.status(400).json({ error: "this method is Not Allowed" });
    }
  } catch (error) {
    console.log(error);
    // for other error
    res.status(400).json({ error });
  }
};

export default connectDb(handler);
