// import mongoose from "mongoose";

// const connectDb = (handler) => async (req, res) => {
//   if (mongoose.connection[0].readyState) {
//     return handler(req, res);
//   }
//   await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_ATLAS_URI);
//   console.log("db connected");
//   return handler(req, res);
// }

// export default connectDb;

import mongoose from "mongoose";

const connectDb = (handler) => async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_ATLAS_URI);
    }
    console.log("db connected");
    return handler(req, res);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default connectDb;
