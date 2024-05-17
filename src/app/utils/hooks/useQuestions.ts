import { GetRequestType } from "../../../../types/getRequest";

export const useQuestions = () => {
  const getQuestions = async ({ limit = 10, page = 0 }: GetRequestType) =>
    await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/questions?limit=${limit}&page=${page}`
    );
  const getQuestion = (id: string) =>
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/questions/${id}`);
  const createQuestion = () =>
    fetch(`${process.env.NEXT_PUBLIC_BASE}/questions`, {
      method: "POST",
    });
  const editQuestion = (id: string) =>
    fetch(`${process.env.NEXT_PUBLIC_BASE}/questions/${id}`, {
      method: "PUT",
    });
  const deleteQuestion = (id: string) =>
    fetch(`${process.env.NEXT_PUBLIC_BASE}/questions/${id}`, {
      method: "DELETE",
    });
  const getPopularQuestions = async () =>
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/popular`);
  return {
    getQuestions,
    getQuestion,
    createQuestion,
    editQuestion,
    deleteQuestion,
    getPopularQuestions,
  };
};
