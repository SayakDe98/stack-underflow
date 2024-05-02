import { TopicType } from "./topic";

export interface PostType {
    title: string;
    message?: string;
    attachments?: AttachmentType[];
    topics?: TopicType[];
    comments?: CommentType[];
    upVotes?: number;
    downVotes?: number;
}