import mongoose from "mongoose";
import { topicValidator } from "../utils/validators/topic.validator";
import { TopicType } from "../../../types/topic";

const topicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: false,
  }
  // visits: {
  //   type: Number,
  //   required: false,
  //   min: 0,
  //   default: 0,
  // },
  // dailyVisits: {
  //   type: Number,
  //   required: false,
  //   min: 0,
  //   default: 0,
  // },
  // weeklyVisits: {
  //   type: Number,
  //   required: false,
  //   min: 0,
  //   default: 0,
  // },
  // monthlyVisits: {
  //   type: Number,
  //   required: false,
  //   min: 0,
  //   default: 0,
  // },
});

const Topic = mongoose.models.topics || mongoose.model('topics', topicSchema);

const validateTopic = (topic: TopicType) => topicValidator.parse(topic);

export default {
    Topic,
    validateTopic
}