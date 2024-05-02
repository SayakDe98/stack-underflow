import mongoose from "mongoose";
import { CommentType } from "../../../types/comment";
import { commentValidator } from "../utils/validators/comment.validator";

const commentSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  attachments: {
    type: mongoose.Schema.Types.Mixed,
    required: false,
  },
  upVotes: {
    type: Number,
    required: false,
  },
  downVotes: {
    type: Number,
    required: false,
  },
  replies: {
    type: mongoose.Schema.Types.Mixed,
    ref: 'comments',
    required: false,
  }
});

const Comment = mongoose.models.comments || mongoose.model("comments", commentSchema);

const validateComment = (comment: CommentType) => commentValidator.parse(comment);

export default {
  Comment,
  validateComment,
};
