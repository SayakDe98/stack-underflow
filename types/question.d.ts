import { TopicType } from "./topic";

export interface Vote {
  user: any
}

export interface QuestionType {
  _id?: string;
  title: string;
  description?: string;
  thingsDoneAndExpectations?: string;
  attachments?: AttachmentType[];
  topics?: TopicType[];
  answers?: AnswerType[];
  upVotes?: Vote[];
  downVotes?: Vote[];
}