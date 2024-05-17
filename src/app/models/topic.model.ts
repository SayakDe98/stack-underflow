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
  },
});

const Topic = mongoose.models.topics || mongoose.model("topics", topicSchema);

const validateTopic = (topic: TopicType) => topicValidator.parse(topic);

export default {
  Topic,
  validateTopic,
};
