// http://localhost:3000/api/user/getuser

import connectDb from "@/middleware/mongodb";
import User from "@/models/User";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";

const handler = async (req, res) => {
  try {
    // get the user from the database
    let getUser = await User.findOne({ email: req.body.email });

    // if user not foundt
    if (getUser == null) res.status(400).json({ error: "invalid Credentials" });
    else {
      // decrypting the password
      let bytes = CryptoJS.AES.decrypt(
        getUser.password,
        process.env.CRYPTO_JS_SECRET
      );
      let decryptedData = bytes.toString(CryptoJS.enc.Utf8);

      // if the password matches
      if (decryptedData == req.body.password) {
        const data = {
          user: {
            _id: getUser._id,
          },
        };

        // generating the jwt token with user id
        const token = jwt.sign({ data }, process.env.JWT_SECRET);

        // sending the jwt token
        res.status(200).json({ success: "LogIn Successfull", getUser, token });
      }
      // if password dosen't match
      else res.status(200).json({ error: "invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

export default connectDb(handler);
