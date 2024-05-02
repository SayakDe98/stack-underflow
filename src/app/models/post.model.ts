import mongoose from "mongoose";
import { postValidator } from "../utils/validators/post.validator";
import { PostType } from "../../../types/post";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: false,
  },
  attachments: {
    type: mongoose.Schema.Types.Mixed,
    required: false
  },
  topics: {
    type: mongoose.Schema.Types.Mixed,
    ref: 'topics',
    required: true
  },
  upVotes: {
    type: Number,
    required: false
  },
  downVotes: {
    type: Number,
    required: false
  },
  comments: {
    type: mongoose.Schema.Types.Mixed,
    ref: 'comments',
    required: false
  }
});

const Post = mongoose.models.posts || mongoose.model("posts", postSchema);

const validatePost = (post: PostType) => postValidator.parse(post);

export default {
  Post,
  validatePost
};
