import mongoose from "mongoose";
import { questionModelValidator } from "../utils/validators/question.validator";
import { QuestionType } from "../../../types/question";

const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  thingsDoneAndExpectations: {
    type: String,
    required: false,
  },
  attachments: {
    type: mongoose.Schema.Types.Mixed,
    required: false,
  },
  topics: [
    {
      type: mongoose.Schema.Types.Mixed,
      ref: "topics",
      required: false,
    },
  ],
  upVotes: [
    {
      user: {
        type: mongoose.Schema.Types.Mixed,
        ref: "users",
        required: true,
      },
    },
  ],
  downVotes: [
    {
      user: { type: mongoose.Schema.Types.Mixed, ref: "users", required: true },
    },
  ],
  answers: [
    {
      user: {
        type: mongoose.Schema.Types.Mixed,
        ref: "users",
        required: true,
      },
      timestamp: {
        type: Date,
        default: Date.now(),
      },
      message: {
        type: String,
        required: true,
      },
      attachments: {
        type: mongoose.Schema.Types.Mixed,
        required: false,
      },
      comments: [
        {
          user: {
            type: mongoose.Schema.Types.Mixed,
            ref: "users",
            required: false,
          },
          timestamp: {
            type: Date,
            default: Date.now(),
          },
          message: {
            type: String,
            required: false,
          }
        },
      ],
    },
  ],
});

const Question =
  mongoose.models.questions || mongoose.model("questions", questionSchema);

const validateQuestion = (question: QuestionType) =>
  questionModelValidator.parse(question);

export default {
  Question,
  validateQuestion,
};
