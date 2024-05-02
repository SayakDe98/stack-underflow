import { GetRequestType } from "../../../../types/getRequest";

export const useTopics = () => {
  const getTopics = ({ limit, page }: GetRequestType) =>
    fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/topics?limit=${limit}&page=${page}`
    );
  const getTopic = (id: string) =>
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/topics/${id}`);
  const createTopic = () =>
    fetch(`${process.env.NEXT_PUBLIC_BASE}/topics`, {
      method: "POST",
    });
  const editTopic = (id: string) =>
    fetch(`${process.env.NEXT_PUBLIC_BASE}/topics/${id}`, {
      method: "PUT",
    });
  const deleteTopic = (id: string) =>
    fetch(`${process.env.NEXT_PUBLIC_BASE}/topics/${id}`, {
      method: "DELETE",
    });
  return {
    getTopics,
    getTopic,
    createTopic,
    editTopic,
    deleteTopic,
  };
};
