export interface CommentType {
  message: string;
  attachments?: AttachmentType[];
  comments?: CommentType[];
  upVotes?: number;
  downVotes?: number;
}
