import mongoose from "mongoose";
const BlogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    img: { type: String, required: true },
    category: { type: String, required: true },
    author: { type: String, default: "Hunting Codders" },
    desc: { type: String, required: true },
  },
  { timestamps: true }
);
mongoose.models = {};
export default mongoose.model("Blog", BlogSchema);
