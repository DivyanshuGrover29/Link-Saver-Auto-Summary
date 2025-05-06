import mongoose from "mongoose";

const LinkSchema = new mongoose.Schema({
     
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    url: String,
    title: String,
    favicon: String,
    summary: String,
    createdAt: { type: Date, default: Date.now }
});

export const Link = mongoose.model("Link", LinkSchema);